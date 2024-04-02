import { onBeforeRouteUpdate, useRoute } from "vue-router"; // 导入路由对象
import { getTopCategoryAPI } from "@/apis/category"; // 导入获取分类数据的API
export function useCategory() {
  // []对象集合，{}对象，()函数
  const categoryData = ref({});
  const route = useRoute(); // 获取路由对象
  // 获取分类数据，异步
  const getCategory = async (id) => {
    /*this.$route.params.id // 获取路由参数
    const res = await getTopCategoryAPI(id);*/
    const { result } = await getTopCategoryAPI(id); // 解构赋值
    categoryData.value = result; // 赋值给categoryData
  };

  onMounted(() => {
    getCategory(route.params.id); // 页面加载时获取分类数据
  });
  onBeforeRouteUpdate((to, from) => {
    getCategory(to.params.id); // 路由发生变化时获取分类数据
  });
  return {
    categoryData,
  }
}
