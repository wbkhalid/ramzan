"use client";

import { UPLOAD_FILES_API } from "@/app/APIs";
import apiClient from "@/app/services/api-client";
import { Download01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

export interface UploadedFile {
  fileUrl: string;
  fileName: string;
  message: string;
}

interface UploadResponse {
  message: string;
  files: UploadedFile[];
}

interface ApiResponse {
  responseCode: number;
  responseMessage: string;
  data: UploadResponse;
}

interface UploadImagesFormProps {
  onUploadedFilesChange?: (files: UploadedFile[]) => void;
  maxFiles?: number;
  currentFileCount?: number;
}

export interface UploadImagesFormHandle {
  getUploadedFiles: () => UploadedFile[];
  clearUploadedFiles: () => void; // ✅ Add this method
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

const UploadImagesForm = forwardRef<
  UploadImagesFormHandle,
  UploadImagesFormProps
>(({ onUploadedFilesChange, maxFiles = 5, currentFileCount = 0 }, ref) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const remainingSlots = maxFiles - currentFileCount;

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File size exceeds 5MB limit: ${file.name}`,
      };
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: `Invalid file type: ${file.name}. Only JPG, PNG, WebP allowed.`,
      };
    }

    const fileName = file.name.toLowerCase();
    const hasValidExtension = ALLOWED_EXTENSIONS.some((ext) =>
      fileName.endsWith(ext),
    );

    if (!hasValidExtension) {
      return { valid: false, error: `Invalid file extension: ${file.name}` };
    }

    return { valid: true };
  };

  // /**
  //  * Upload a single file
  //  */
  // const uploadSingleFile = useCallback(
  //   async (file: File): Promise<UploadedFile | null> => {
  //     if (remainingSlots === 0) return null;
  //     const fileKey = `${file.name}-${file.size}`;
  //     setUploadingFiles((prev) => new Set(prev).add(fileKey));

  //     try {
  //       const formData = new FormData();
  //       formData.append("Category", "photo");
  //       formData.append("Files", file);

  //       const response = await apiClient.post<ApiResponse>(
  //         `${UPLOAD_FILES_API}/upload-multiple-files`,
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         },
  //       );

  //       if (
  //         response.data.responseCode === 200 &&
  //         response.data.data.files.length > 0
  //       ) {
  //         const uploadedFile = response.data.data.files[0];
  //         toast.success(`${file.name} uploaded successfully`);
  //         return uploadedFile;
  //       } else {
  //         toast.error(`Failed to upload ${file.name}`);
  //         return null;
  //       }
  //     } catch (error) {
  //       const axiosError = error as AxiosError<ApiResponse>;
  //       const errorMessage =
  //         axiosError.response?.data?.responseMessage ||
  //         axiosError.message ||
  //         `Failed to upload ${file.name}`;

  //       console.error("Upload error:", error);
  //       toast.error(errorMessage);
  //       return null;
  //     } finally {
  //       setUploadingFiles((prev) => {
  //         const newSet = new Set(prev);
  //         newSet.delete(fileKey);
  //         return newSet;
  //       });
  //     }
  //   },
  //   [],
  // );

  /**
   * Handle file selection and auto-upload
   */
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files) return;

    const existingCount = uploadedFiles.length;
    const availableSlots = maxFiles - existingCount;

    if (availableSlots <= 0) {
      toast.error("Maximum 5 files allowed!");
      return;
    }

    const validFiles: File[] = [];

    for (const file of Array.from(files)) {
      if (validFiles.length >= availableSlots) break;

      const validation = validateFile(file);
      if (!validation.valid) {
        toast.error(validation.error);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    // HARD STOP extra files
    if (files.length > availableSlots) {
      toast.warning(`Only ${availableSlots} images were added`, {
        position: "top-center",
      });
    }

    try {
      const formData = new FormData();
      formData.append("Category", "photo");

      validFiles.forEach((file) => {
        formData.append("Files", file);
      });

      const response = await apiClient.post<ApiResponse>(
        `${UPLOAD_FILES_API}/upload-multiple-files`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      if (response.data.responseCode === 200) {
        const newUploaded = response.data.data.files;

        setUploadedFiles((prev) =>
          [...prev, ...newUploaded].slice(0, maxFiles),
        );

        toast.success("Images uploaded successfully");
      }
    } catch (error) {
      toast.error("Failed to upload images");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    onUploadedFilesChange?.(uploadedFiles);
  }, [uploadedFiles, onUploadedFilesChange]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (!files) return;

    // Simulate file input change
    const event = {
      target: { files },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    handleFileChange(event);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  /**
   * Remove file and delete from uploaded list
   */
  const removeFile = (index: number) => {
    const newUploadedFiles = uploadedFiles.filter((_, i) => i !== index);
    const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);

    setUploadedFiles(newUploadedFiles);
    setSelectedFiles(newSelectedFiles);

    toast.success("File removed");
  };

  // ✅ Expose both methods via ref
  useImperativeHandle(ref, () => ({
    getUploadedFiles: () => uploadedFiles,
    clearUploadedFiles: () => {
      // Reset all file states
      setUploadedFiles([]);
      setSelectedFiles([]);
      setUploadingFiles(new Set());

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Notify parent component
      onUploadedFilesChange?.([]);
    },
  }));

  return (
    <div>
      {/* Upload Drop Zone */}
      <div
        className="p-4 rounded-[15px] bg-[rgba(244,244,244,0.2)] border border-dashed border-[#CBD5E1] mb-5 transition-colors cursor-pointer hover:bg-[rgba(244,244,244,0.3)]"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
          disabled={uploadedFiles.length >= maxFiles}
          accept={ALLOWED_EXTENSIONS.join(",")}
        />

        <Flex direction="column" justify="center" align="center" gap="4">
          <Text size="2" weight="bold" className="text-white">
            Upload Site Pictures <Text color="red">*</Text>
          </Text>

          <Text size="1" className="text-[#CBD5E1] text-center">
            Drag and drop or click to select images (JPG, PNG, WebP - Max 5MB
            each)
          </Text>

          <Button
            type="button"
            color="green"
            disabled={uploadedFiles.length >= 5}
            className="w-full bg-(--green)! font-bold text-sm py-2.5 px-2.5 h-auto rounded-[10px] shadow-[0px_0px_0px_1px_rgba(203,213,225,0.4)] gap-2.5 disabled:opacity-50"
          >
            <Flex align="center" gap="2">
              <HugeiconsIcon size={20} icon={Download01Icon} />
              <Text weight="medium" size="2">
                {uploadedFiles.length >= 5
                  ? `Maximum 5 images reached`
                  : `Select Images (${uploadedFiles.length}/5)`}
              </Text>
            </Flex>
          </Button>
        </Flex>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mb-5 p-4 rounded-[15px] bg-[rgba(244,244,244,0.1)] border border-[#CBD5E1]">
          <Text weight="bold" size="2" className="text-white mb-3 block">
            Uploaded Files ({uploadedFiles.length})
          </Text>

          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <Flex
                key={`${file.fileName}-${index}`}
                align="center"
                justify="between"
                className="p-3 bg-[rgba(244,244,244,0.05)] rounded-lg"
              >
                <Link href={file.fileUrl} target="_blank">
                  <Image
                    src={file.fileUrl}
                    alt={file.fileName}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-md"
                  />
                </Link>
                {/* <Flex direction="column" gap="1">
                  <Text size="2" weight="medium" className="text-white">
                    {file.fileName}
                  </Text>
                  <Text size="1" className="text-[#CBD5E1]">
                    {file.fileUrl}
                  </Text>
                </Flex> */}

                <Button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="bg-red-600/20 text-red-400 hover:bg-red-600/40"
                >
                  Remove
                </Button>
              </Flex>
            ))}
          </div>
        </div>
      )}

      {/* Uploading Files List */}
      {uploadingFiles.size > 0 && (
        <div className="mb-5 p-4 rounded-[15px] bg-[rgba(244,244,244,0.1)] border border-[#CBD5E1]">
          <Text weight="bold" size="2" className="text-white mb-3 block">
            Uploading... ({uploadingFiles.size})
          </Text>
          <div className="space-y-2">
            {Array.from(uploadingFiles).map((fileKey) => (
              <Flex key={fileKey} align="center" gap="3">
                <div className="w-full h-2 bg-[rgba(203,213,225,0.2)] rounded-full overflow-hidden flex-1">
                  <div
                    className="h-full bg-[#063A6A] animate-pulse"
                    style={{ width: "60%" }}
                  />
                </div>
                <Text size="1" className="text-[#CBD5E1]">
                  {fileKey}
                </Text>
              </Flex>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

UploadImagesForm.displayName = "UploadImagesForm";

export default UploadImagesForm;
