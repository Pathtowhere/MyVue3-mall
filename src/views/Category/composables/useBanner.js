import { getBannerAPI } from "@/apis/home";
export function useBanner() {
  //轮播图
  const bannerList = ref([]);
  const getBanner = async () => {
    const res = await getBannerAPI("2"); //二级分类下的轮播图
    bannerList.value = res.result;
  };
  onMounted(() => {
    getBanner();
  });
  return {
    bannerList,
  };
}
