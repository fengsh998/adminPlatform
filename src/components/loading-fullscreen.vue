<script setup>
/**
 * 使用
 * import LoadingFullscreen from '@/components/loading-fullscreen.vue'
 * <LoadingFullscreen :visible="true"/>
 */
defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div v-if="visible" class="loading-overlay">
    <div class="loading-spinner"></div>
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.loading-spinner-style-a {
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

.loading-spinner {
  border: 4px solid transparent; /* 无边框 */
  border-left: 4px solid white; /* 左侧白色边框 */
  border-right: 4px solid white; /* 右侧白色边框 */
  border-radius: 50%;
  width: 50px; /* 缩小宽度 */
  height: 50px; /* 缩小高度 */
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>