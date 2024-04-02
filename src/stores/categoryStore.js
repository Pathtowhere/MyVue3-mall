
import { getCategoryAPI } from "@/apis/layout";

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([]);
  const getCategory = async () => {
    const res = await getCategoryAPI();
    categoryList.value = res.result;//res不是ref,这里就算写ref也不是上边的ref
  }

  

  onMounted(() => {
    getCategory();
  })

  return { 
    categoryList, 
    getCategory
   }
})
