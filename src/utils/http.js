import  axios  from "axios";//不带花括号

const http = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});
// 请求拦截器
// 一般会进行token身份验证等
http.interceptors.request.use(//request拼写错误
  (config) => {
    return config;
  },
  (e) => Promise.reject(e)
);

// 响应拦截器
// 一般进行错误的统一提示，token失效的处理等
http.interceptors.response.use(
  (res) => res.data,
  (e) => {
    return Promise.reject(e);
  }
);

export default http;
