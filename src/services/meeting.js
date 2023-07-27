import axios from "axios"

const ROOT_API_MOM = process.env.REACT_APP_API_MOM

const axiosInstance = axios.create({
  baseURL: ROOT_API_MOM
});

export async function getMeetingApi() {
    const url = '/meeting/';
    const response = await axiosInstance.get(url).catch((err) => err.response);
    const axiosResponse = response?.data;
    return axiosResponse;
}

export async function deleteMeetingApi(id) {
  const url = `/meeting/${id}`;
  const response = await axiosInstance.delete(url).catch((err) => err.response);
  const axiosResponse = response?.data;
  return axiosResponse;
}

export async function getDetailMeetingApi(id) {
  const url = `/meeting/${id}`;
  const response = await axiosInstance.get(url).catch((err) => err.response);
  const axiosResponse = response?.data;
  return axiosResponse;
}

export async function createMeetingApi(data) {
  const url = '/meeting/';
  const response = await axiosInstance.post(url, data).catch((err) => err.response);
  const axiosResponse = response?.data;
  return axiosResponse;
}