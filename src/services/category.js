import axios from "axios"

const ROOT_API_MOM = process.env.REACT_APP_API_MOM

const axiosInstance = axios.create({
  baseURL: ROOT_API_MOM
});

export async function getCategoryApi() {
    const url = '/category/';
    const response = await axiosInstance.get(url).catch((err) => err.response);
    const axiosResponse = response?.data;
    return axiosResponse;
}

export async function createCategoryApi(data) {
  const url = '/category/';
  const response = await axiosInstance.post(url, data).catch((err) => err.response);
  const axiosResponse = response?.data;
  console.log("response", axiosResponse)
  return axiosResponse;
}

export async function updateCategoryApi(id, data) {
  const url = `/category/${id}`;
  const response = await axiosInstance.put(url, data).catch((err) => err.response);
  const axiosResponse = response?.data;
  console.log("response", axiosResponse)
  return axiosResponse;
}

export async function deleteCategoryApi(id) {
  const url = `/category/${id}`;
  const response = await axiosInstance.delete(url).catch((err) => err.response);
  const axiosResponse = response?.data;
  return axiosResponse;
}
