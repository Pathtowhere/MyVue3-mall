<script setup>
import { useCategoryStore } from "@/stores/categoryStore";
const categoryStore = useCategoryStore();
</script>

<template>
  <div class="home-category">
    <ul class="menu">
      <!--使用了哪里面的数据,一定要看对应的拼写是否正确-->
      <li v-for="item in categoryStore.categoryList" :key="item.id">
        <RouterLink to="/">{{ item.name }}</RouterLink>
        <RouterLink v-for="i in item.children.slice(0, 2)" :key="i.id" to="/">{{
          i.name
        }}</RouterLink>
        <!-- 弹层layer -->

        <div class="layer">
          <h4>分类推荐<small>根据您的购物偏好，为您精选推荐</small></h4>
          <ul>
            <li v-for="i in item.goods" :key="i.id">
              <RouterLink to="/">
                <img alt="" :src="i.picture" />
                <div class="info">
                  <p class="name ellipsis-2">{{ i.name }}</p>
                  <p class="desc ellipsis">{{ i.desc }}</p>
                  <p class="price"><i>￥</i>{{ i.price }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.5);
  position: relative;
  margin-left: -100px;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;
      &:hover {
        background: $xtxColor;
        /*鼠标放在上面的时候背景颜色*/
      }
      a {
        margin-right: 4px;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }
      .layer {
        width: 1240px;
        height: 500px;
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        left: 250px;
        top: 0;
        display: none;
        padding: 0 15px;
        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;
          small {
            font-size: 16px;
            color: #666;
          }
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 350px;
            height: 120px;
            margin-right: 40px;
            margin-left: 10px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;
            &:nth-child(3n) {
              margin-right: 0;
            }
            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;
              margin-left: -20px;
              &:hover {
                background: #e3f9f4;
              }
              img {
                width: 95px;
                height: 95px;
              }
              .info {
                padding-left: 10px;
                line-height: 24px;
                overflow: hidden;
              }
              .name {
                font-size: 16px;
                color: #666;
              }
              .desc {
                color: #999;
              }
              .price {
                font-size: 22px;
                color: $priceColor;
                i {
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
      /*关键样式  hover状态下的layer盒子变成block*/
      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
</style>
