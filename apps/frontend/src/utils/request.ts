import { initHttp, http, authPlugin } from "@wfynbzlx666/sdk-http";

initHttp({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  plugins: [
    authPlugin({
      getToken: async () => {
        const token = localStorage.getItem("token");
        return token;
      },
    }),
  ],
  // retry: {
  //   retries: 0,
  // }

});

export { http };