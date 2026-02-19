import { UPLOAD_FILES_API } from "../APIs";
import apiClient from "../services/api-client";

export const devmap = true;

export const uploadFile = async (
  e: React.ChangeEvent<HTMLInputElement>,
  category: string,
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("category", category);

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

    console.log("API Response:", response);
    return response.data;
  } catch (err) {
    console.error("Upload failed:", err);
  }
};
