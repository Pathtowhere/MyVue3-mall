import {defineStore} from "pinia";

export const useCartStore = defineStore(
    'cart',
    ()=>{
        const cartList = ref([]);
        //addCart方法,goods参数
        const addCart = (goods) => {
            //判断购物车是否存在该商品
            const findItem =cartList.value.find(item =>goods.skuId === item.skuId);
            if(findItem){
                findItem.count += goods.count;
            }else{
                cartList.value.push(goods)
            }
        }
        //清空购物车
        const clearCart = (skuId) => {
            const index = cartList.value.findIndex(item => item.skuId === skuId);
            cartList.value.splice(index,1);
        }

        //计算总数量
        const allCount = computed(() => cartList.value.reduce((pre, cur) => pre + cur.count, 0)); 
        //计算总价格   
        const allPrice = computed(() => cartList.value.reduce((pre, cur) => pre + cur.price * cur.count, 0)); 
        return {
            cartList,
            addCart,
            clearCart,
            allCount,
            allPrice
        }
    },
    {
      persist:true  
    }
)