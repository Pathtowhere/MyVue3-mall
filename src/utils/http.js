import router from "@/router";
import { useUserStore } from "@/stores/userStore";
import  axios  from "axios";//不带花括号
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";

const http = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});
// 请求拦截器
// 一般会进行token身份验证等
http.interceptors.request.use(//request拼写错误
  (config) => {
    const userStore = useUserStore();
    const token = userStore.userInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => Promise.reject(e)
);

// 响应拦截器
// 一般进行错误的统一提示，token失效的处理等
http.interceptors.response.use((res) => res.data,(e) => {
  // 错误统一提示
    ElMessage({ type: "error", message: e.response.data.message });
    // token失效处理
    const userStore = useUserStore();
    if (e.response.status === 401) {
      userStore.clearUserInfo();
      router.push("/login");
    }
    return Promise.reject(e);
  }
);

export default http;
