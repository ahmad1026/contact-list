import axiosConfig from "./axiosConfig";

interface IResponse {
  fullName: string;
  userName: string;
  phoneNumber: string;
  id: string;
}

const DeleteUserApi = async (userId: number): Promise<IResponse> => {
  const result = await axiosConfig.delete(`/users/${userId}`);

  return result.data;
};

export default DeleteUserApi;
