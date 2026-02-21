import { ImageUploadIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge, Flex, Text } from "@radix-ui/themes";
import { ReactNode, useRef } from "react";

interface Props {
  isLoading?: boolean;
  label?: string;
  selfieUrl?: string;
  description?: string;
  buttonLabel?: string;
  icon?: ReactNode;
  message?: string;
  accept?: string; // NEW
  multiple?: boolean; // NEW
  type?: "image" | "video"; // NEW
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadImagesForm = ({
  label = "Upload",
  description = "Upload File",
  selfieUrl = "",
  icon = (
    <Badge className="p-3! rounded-[10px]! shadow-[0px_0px_0px_1.24px_#CBD5E1]/50!">
      <HugeiconsIcon
        icon={ImageUploadIcon}
        size={30}
        className="text-slate-gray!"
      />
    </Badge>
  ),
  message = "JPG, PNG ",
  accept = "image/png, image/jpeg, image/jpg",
  multiple = false,
  type = "image",
  onChange,
  isLoading = false,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="border border-dashed border-[#CBD5E1] p-4 rounded-4xl cursor-pointer"
      onClick={handleClick}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        ref={fileInputRef}
        className="hidden"
        onChange={onChange}
      />
      {isLoading && (
        <Flex justify="center" className="mb-4">
          <Text size="2" color="green">
            Uploading...
          </Text>
        </Flex>
      )}

      <Flex justify="center" className="mb-4">
        {selfieUrl ? (
          type === "video" ? (
            <video
              src={selfieUrl}
              controls
              className="w-24 h-24 object-cover rounded-md"
            />
          ) : (
            <img
              src={selfieUrl}
              alt="Uploaded Preview"
              className="w-20 h-20 object-cover rounded-md"
            />
          )
        ) : (
          icon
        )}
      </Flex>

      <Flex align="center" direction="column" className="gap-1.75!">
        <Text weight="bold" color="green" size="2">
          {label}
        </Text>

        <Text size="2" className="text-slate-gray">
          {description}
        </Text>

        <Text weight="medium" size="1" className="text-slate-gray!">
          {message}
        </Text>
      </Flex>
    </div>
  );
};

export default UploadImagesForm;
