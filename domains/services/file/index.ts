import axiosInstance from "@/configs/axios.config";

export const FileService = {
  post: {
    upload: async (file: File) => {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axiosInstance.post(
          "/tshirts/upload/image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    uploadZip: async (file: File) => {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axiosInstance.post(
          "/tshirts/upload/zip",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
};
