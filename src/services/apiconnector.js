import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = async (method, url, bodyData, params) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data: bodyData || null,
      params: params || null,
      // Pass headers directly in the config object
      headers: {
        // Add any default headers here if needed
        // Authorization: `Bearer ${token}`,
        ...bodyData.headers, // Include headers from bodyData if provided
      },
    });

    return response;
  } catch (error) {
    // Log the error for debugging
    console.error("API Connector Error:", error);

    // Throw the error again to be caught by the calling function
    throw error;
  }
};
