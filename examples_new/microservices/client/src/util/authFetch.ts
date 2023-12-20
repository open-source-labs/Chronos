import axios from 'axios';

const customFetch = (port: number) => {
  const customFetchInstance = axios.create({
    baseURL: `http://localhost:${port}/api/`,
    withCredentials: true,
  });

  customFetchInstance.interceptors.response.use(
    response => {
      return response;
    },
    err => {
      // console.log(err.response)
      console.log(err);
      if (err.response.status === 401) {
        // logoutUser()
      }
      return Promise.reject(err);
    }
  );

  return customFetchInstance;
};

export { customFetch };
