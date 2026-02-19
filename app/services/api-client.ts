import axios, { AxiosError, CanceledError } from "axios";

export interface ErrorResponse {
  responseCode: number;
  responseMessage: string;
}

export default axios.create({
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export { AxiosError, CanceledError };
