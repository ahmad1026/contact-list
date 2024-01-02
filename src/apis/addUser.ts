import { UserType } from "../types";
import axiosConfig from "./axiosConfig";

interface IResponse {
  fullName: string;
  userName: string;
  phoneNumber: string;
  id: string;
}

const AddUserApi = async (data: {
  fullName: string;
  userName: string;
  phone: string;
}): Promise<IResponse> => {
  console.log(data);

  const result = await axiosConfig.post("/users", data);

  return result.data;
};

export default AddUserApi;
