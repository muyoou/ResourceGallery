<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Home from './components/mainPage.vue'
import Upload from './components/upload.vue'
const routes = {
  '/': Home,
  '/upload': Upload
}
// 是否正在拖动文件
const isDraging = ref(false)
// 当前path
const currentPath = ref(window.location.hash)
// hash改变路由
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || Home
})
// 上次文件列表
const fileList = [] as string[]
// 检测文件拖动
onMounted(() => {
  let enter = document.getElementById('comp')
  let dragDiv = document.getElementById('drag-div')
  enter?.addEventListener('dragenter', (e) => {
    e.stopPropagation()
    if(currentView.value == Home)
    isDraging.value = true
  })
  dragDiv?.addEventListener('dragleave', (e) => {
    e.stopPropagation()
    isDraging.value = false
  })
  dragDiv?.addEventListener('drop', (e) => {
    e.stopPropagation()
    isDraging.value = false
    for (let index in e.dataTransfer?.files) {
      if(e.dataTransfer?.files[index].path)
        fileList.push(e.dataTransfer?.files[index].path)
    }
    currentPath.value = '#/upload'
  })
  dragDiv?.addEventListener('dragover', (e) => {
    e.preventDefault()
  })
})

</script>

<template>
  
  <a href="#/">Home</a> |
  <a href="#/upload">Upload</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component id = "comp" :is="currentView" :filePath="fileList"/>
  <div id="drag-div" :style="{ display: isDraging ? 'inline' : 'none', zIndex:5, opacity: 0.7}">拖动文件或文件夹到此处</div>
</template>
<style lang="less">
@import './assets/css/styles.less';
</style>
