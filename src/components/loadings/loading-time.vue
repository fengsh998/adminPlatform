<template>
  <!-- Loading 容器 -->
  <div class="loading-spinner" :style="spinnerStyle">
    <span
        v-for="index in 12"
        :key="index"
        class="loading-bar"
        :style="getBarStyle(index)"
    ></span>
  </div>
</template>

<script setup>
import { computed } from 'vue';
// Props to allow external size setting
const props = defineProps({
  size: {
    type: Number,
    default: 50 // 默认大小为 50px
  }
});

// 计算属性，根据大小计算样式
const spinnerStyle = computed(() => {
  const mwh = Math.max(10,props.size)
  return {
    width: `${mwh}px`,
    height: `${mwh}px`
  };
});

const getBarStyle = (index) => {
  const totalBars = 12;
  const angle = (360 / totalBars) * index; // 每个点的角度
  const mwh = Math.max(10,props.size)
  const half = mwh / 2
  const radius = Math.min(20,half / 2) // 根据大小计算半径，减去长条长度的一半
  //单根的长宽设置：最小宽为1px，高为4px
  //W:1~4
  const bar_w = Math.min(4, Math.max(1,half * 0.1))
  //H:5~15
  const bar_h = Math.min(15, Math.max(5,radius * 0.8))
  return {
    width: `${bar_w}px`,
    height: `${bar_h}px`,
    opacity: 0,
    transform: `rotate(${angle}deg) translate(0, -${radius}px)`, // 旋转并向外平移
    animation: `fade ${totalBars * 0.1}s linear infinite`,
    animationDelay: `${index * 0.1}s`, // 动画延迟
  };
};
</script>

//使用代码生成style后对于fade要设置全局作用域
<style>
/* 动画关键帧 */
@keyframes fade {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* Loading 容器样式 */
.loading-spinner {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 单个长条样式 */
.loading-bar {
  position: absolute;
  background-color: #fff; /* 长条颜色 */
  border-radius: 2px; /* 圆角 */

  /* 下面放到代码中后，要把scoped 作用域设为全局*/
  /* opacity: 0;  初始透明度 */
  /* animation: fade 1.2s linear infinite;  动画效果 */
}


</style>
