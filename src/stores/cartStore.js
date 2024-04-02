import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import { findNewCartListAPI, insertCartAPI } from "@/apis/cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cartList = ref([]);
    const userStore = useUserStore();
    const isLogin = computed(()=>userStore.userInfo.token)

    // 获取登录后最新购物车列表action
    const updateLoginCartList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }

    //addCart方法,goods参数
    const addCart = async (goods)=>{
        if(isLogin.value){
            //登录之后加入购物车逻辑
            await insertCartAPI(goods)
            updateLoginCartList()
        }else {
            //判断商品是否在购物车
            const findItem = cartList.value.find(item => goods.skuId === item.skuId);
            if (findItem) {
                item.count += goods.count
            } else {
                cartList.value.push(goods)
            }
        }
    }
    //清空购物车
    const clearCart = (skuId) => {
      const index = cartList.value.findIndex((item) => item.skuId === skuId);
      cartList.value.splice(index, 1);
    };

    // 全选功能
    const checkAll = (selected) => {
      // 把cartList中的每一项的selected都设置为当前的全选框状态
      cartList.value.forEach((item) => (item.selected = selected));
    };

    //计算总数量
    const allCount = computed(() =>
      cartList.value.reduce((pre, cur) => pre + cur.count, 0)
    );
    //计算总价格
    const allPrice = computed(() =>
      cartList.value.reduce((pre, cur) => pre + cur.price * cur.count, 0)
    );
    // 是否全选计算属性
    const isAll = computed(() => cartList.value.every((item) => item.selected));
    // 4. 已选择数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count, 0)
    );
    // 5. 已选择商品价钱合计
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0)
    );
    
    return {
      cartList,
      addCart,
      clearCart,
      allCount,
      allPrice,
      checkAll,
      isAll,
      selectedCount,
      selectedPrice,
      updateLoginCartList
    };
  },
  {
    persist: true,
  }
);
