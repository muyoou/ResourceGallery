<script setup lang="ts">
import { onMounted, ref } from 'vue';
import 'bootstrap';
import './assets/css/bootstrap.min.css'
import sideNav from './components/sideNav.vue'
import content from './components/content.vue'


// 是否正在拖动文件
const isDraging = ref(false)
const isPopBox  = ref(false)
const api = window.api as {openFile: (files: string[]) => Promise<any>;}
onMounted(()=>{
  let dragDiv = document.getElementById('drag-div')
  dragDiv?.addEventListener('dragenter',(e)=>{
    e.stopPropagation()
    isDraging.value = true
  })
  dragDiv?.addEventListener('dragleave',(e)=>{
    e.stopPropagation()
    isDraging.value = false
  })
  dragDiv?.addEventListener('drop',(e)=>{
    e.stopPropagation()
    isPopBox.value = true
    let fileList = [] as string[]
    for(let index in e.dataTransfer?.files){
      fileList.push(e.dataTransfer?.files[index].path)
    }
    console.log(api.openFile(fileList))
  })
  dragDiv?.addEventListener('dragover',(e)=>{
    e.preventDefault()
  })
})
</script>

<template>
  <sideNav></sideNav>
  <content></content>  
  
  <div id="drag-div" :style="{opacity:isDraging?0.7:0}">拖动文件或文件夹到此处</div>
  <div class="card" id="pop-box" v-if="isPopBox">
  
  <div class="card-body">
    <h5 class="card-title">手动分类</h5>
    
    
  </div>
  <div class="card-footer">
      <a href="#" class="btn btn-light">返回</a>
      <a href="#" class="btn btn-primary">确定</a>
    </div>
</div>
</template>


<style lang="less">
@import './assets/css/styles.less';
</style>
