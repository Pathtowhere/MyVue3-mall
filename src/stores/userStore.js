
import { loginAPI } from '@/apis/user';

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({});
  const getUserInfo = async (user) => {
    const res = await loginAPI(user);
    userInfo.value = res.result;//res不是ref,这里就算写ref也不是上边的ref
  }

  const clearUserInfo = () => {
    userInfo.value = {};
  }

  return { 
    userInfo, 
    getUserInfo,
    clearUserInfo
   }
},
{
 persist: true, // 持久化
})
