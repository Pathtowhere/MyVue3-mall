import { useIntersectionObserver } from "@vueuse/core";
export const lazyPlugin = {
    install(app) {
        app.directive("img-lazy", {
            //el:指令绑定元素 img
            //binding:binding.value 指令=后面表达式的值 图片url
            mounted(el, binding) {
              //console.log(el, binding.value);
              const {stop} = useIntersectionObserver(
                  el,//target,
                ([{ isIntersecting }]) => {
                  //console.log(isIntersecting);//是否进入可视区域
                  if (isIntersecting) {
                    el.src = binding.value;
                    stop();//如果懒加载过一次，就停止监听
                  }
                }
              )
            },
          });
    }
}