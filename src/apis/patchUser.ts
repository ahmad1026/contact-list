import { UserType } from "../types";
import axiosConfig from "./axiosConfig";

interface IResponse {
  fullName: string;
  userName: string;
  phone: string;
  id: number;
}

const EditUserApi = async (data: {
  fullName?: string;
  userName?: string;
  phone?: string;
  id?: number;
}): Promise<IResponse> => {
  console.log(data);

  const result = await axiosConfig.patch(`/users/${data.id}`, data);

  return result.data;
};

export default EditUserApi;
