import { UPLOAD_FILES_API } from "../APIs";
import apiClient from "../services/api-client";
import imageCompression from "browser-image-compression";

export const devmap = true;

// export const uploadFile = async (
//   e: React.ChangeEvent<HTMLInputElement>,
//   category: string,
// ) => {
//   const file = e.target.files?.[0];
//   if (!file) return;

//   try {
//     const options = {
//       maxSizeMB: 0.5,
//       maxWidthOrHeight: 1024,
//       initialQuality: 0.5,
//       useWebWorker: true,
//     };

//     const compressedFile = await imageCompression(file, options);

//     console.log(file, "file");
//     console.log(compressedFile, "compreswed");

//     console.log("Original size:", file.size / 1024, "KB");
//     console.log("Compressed size:", compressedFile.size / 1024, "KB");

//     const formData = new FormData();
//     formData.append("file", compressedFile);
//     formData.append("category", category);

//     for (let pair of formData.entries()) {
//       console.log(pair[0], pair[1]);
//     }

//     const response = await apiClient.post(
//       `${UPLOAD_FILES_API}/upload-file`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       },
//     );

//     return response.data;
//   } catch (err) {
//     console.error("Upload failed:", err);
//   }
// };

export const compressImage = async (file: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1280,
    useWebWorker: true,
    initialQuality: 0.3,
  };

  try {
    console.log("Original Size (bytes):", file.size);
    console.log("Original Size (MB):", (file.size / 1024 / 1024).toFixed(2));

    const compressedBlob = await imageCompression(file, options);

    console.log(compressedBlob, "compressedBlob");

    const compressedFile = new File([compressedBlob], file.name, {
      type: file.type,
      lastModified: Date.now(),
    });

    console.log(compressedFile, "compressesfile");

    console.log("Compressed Size (bytes):", compressedFile.size);
    console.log(
      "Compressed Size (MB):",
      (compressedFile.size / 1024 / 1024).toFixed(2),
    );

    return compressedFile;
  } catch (error) {
    console.error("Image compression error:", error);
    return file;
  }
};

export const uploadFile = async (
  e: React.ChangeEvent<HTMLInputElement>,
  category: string,
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  let finalFile = file;

  console.log(finalFile, "finalFile");

  if (file.type.startsWith("image/")) {
    finalFile = await compressImage(file);
  }

  const formData = new FormData();
  formData.append("file", finalFile);
  formData.append("category", category);

  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  try {
    const response = await apiClient.post(
      `${UPLOAD_FILES_API}/upload-file`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  } catch (err) {
    console.error("Upload failed:", err);
  }
};

export const uploadVideoFile = async (
  e: React.ChangeEvent<HTMLInputElement>,
  category: string,
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  let finalFile = file;

  console.log(finalFile, "finalFile");

  const formData = new FormData();
  formData.append("file", finalFile);
  formData.append("category", category);

  try {
    const response = await apiClient.post(
      `${UPLOAD_FILES_API}/upload-feedback-video`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  } catch (err) {
    console.error("Upload failed:", err);
  }
};

// export const uploadFile = async (
//   e: React.ChangeEvent<HTMLInputElement>,
//   category: string,
// ) => {
//   const file = e.target.files?.[0];
//   if (!file) return;

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("category", category);

//   try {
//     const response = await apiClient.post(
//       `${UPLOAD_FILES_API}/upload-file`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       },
//     );

//     console.log("API Response:", response);
//     return response.data;
//   } catch (err) {
//     console.error("Upload failed:", err);
//   }
// };

export const uploadMultipleFiles = async (
  e: React.ChangeEvent<HTMLInputElement>,
  category: string,
) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  console.log(files, "files");

  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append("files", file);
  });
  formData.append("category", category);

  try {
    const response = await apiClient.post(
      `${UPLOAD_FILES_API}/upload-multiple-files`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    console.log("API Response:", response.data);

    return response.data?.data?.files || [];
  } catch (err) {
    console.error("Upload failed:", err);
    return [];
  }
};
