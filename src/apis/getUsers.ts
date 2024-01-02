import axiosConfig from "./axiosConfig";
import { UserType } from "../types";

export default async function getAllUsers(): Promise<UserType[]> {
  const result = await axiosConfig.get("/users");

  return result.data;
}
