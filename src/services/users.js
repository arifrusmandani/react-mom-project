import axios from "axios"

const ROOT_API_MOM = process.env.REACT_APP_API_MOM

const axiosInstance = axios.create({
  baseURL: ROOT_API_MOM
});

export async function authLoginApi(data) {
  const url = '/user/auth';
  const response = await axiosInstance.post(url, data).catch((err) => err.response);
  const axiosResponse = response?.data;
  axiosResponse["code"] = response.status
  return axiosResponse;
}

export async function getUsers() {
    const url = '/user/';
    const response = await axiosInstance.get(url).catch((err) => err.response);
    const axiosResponse = response?.data;
    return axiosResponse;
}

export async function createUserApi(data) {
  const url = '/user/';
  const response = await axiosInstance.post(url, data).catch((err) => err.response);
  const axiosResponse = response?.data;
  return axiosResponse;
}

export async function updateUserApi(id, data) {
  const url = `/user/${id}`;
  const response = await axiosInstance.put(url, data).catch((err) => err.response);
  const axiosResponse = response?.data;
  return axiosResponse;
}

export async function deleteUser(id) {
  const url = `/user/${id}`;
  const response = await axiosInstance.delete(url).catch((err) => err.response);
  const axiosResponse = response?.data;
  return axiosResponse;
}

