<script setup>
import { resolveComponent } from "vue";
defineProps({
  //element 的Icon图标
  elementIconName: {
    type: String,
    required: false,
    default: 'Message'
  },
  //外部图标
  iconUrl: {
    type: String,
    required: false,
    default: ''
  },
  // 提示内容
  content: {
    type: String,
    required: true,
  },
  iconSize: {
    type: Number,
    required: false,
    default: 20
  },
  //弹窗方向 top left bottom right
  popDirection: {
    type: String,
    default:'bottom'
  }
});
</script>

<template>
  <div class="icon">
    <el-tooltip
      effect="dark"
      :content="content"
      :placement="popDirection"
    >
      <el-image :style="{width: iconSize + 'px',height:iconSize + 'px'}" v-if="iconUrl !== '' " :src="iconUrl" />
      <el-icon v-else :size="iconSize"><component :is="resolveComponent(elementIconName)" /></el-icon>
    </el-tooltip>
  </div>
</template>

<style scoped>
.icon {
  display: flex;
  flex-direction: row;
}
</style>