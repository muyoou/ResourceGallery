<script setup lang="ts">
import { onMounted, ref } from 'vue';
import 'bootstrap';
import './assets/css/bootstrap.min.css'
// import Versions from './components/Versions.vue'
const inde = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
const classification = ref(['视频','漫画','图片'])
// 是否正在拖动文件
const isDraging = ref(false)
onMounted(()=>{
  let dragDiv = document.getElementById('drag-div')
  dragDiv?.addEventListener('dragenter',(e)=>{
    e.stopPropagation()
    isDraging.value = true
    console.log(e)
  })
  dragDiv?.addEventListener('dragleave',(e)=>{
    e.stopPropagation()
    isDraging.value = false
    console.log(e)
  })
  dragDiv?.addEventListener('drop',(e)=>{
    e.stopPropagation()
    isDraging.value = false
    console.log(e)
  })
  dragDiv?.addEventListener('dragover',(e)=>{
    e.preventDefault()
  })
})
</script>

<template>
  <nav id='side-nav'>
    <div class="icon-text" style="margin-bottom: 60px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-list"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
      </svg>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="item in classification">{{item}}</li>
    </ul>
  </nav>
  <article class="right-box">
    <ul class="nav nav-pills content-nav">
      <li class="nav-item dropdown" style="margin-left: auto;">
        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
          aria-expanded="false">按时间排序</a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">按名称排序</a></li>
          <li><a class="dropdown-item" href="#">按时间排序</a></li>
          <li><a class="dropdown-item" href="#">按大小排序</a></li>
        </ul>
      </li>
      
      <li class="nav-item">
        <a class="nav-link" href="#">从旧到新</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
          aria-expanded="false">全部盘符</a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">C:/</a></li>
          <li><a class="dropdown-item" href="#">D:/</a></li>
        </ul>
      </li>
      <li class="nav-item">
        <a class="nav-link">管理</a>
      </li>
    </ul>
    <div id="content">
      <div class="card" v-for="item in inde">
        <img src="./assets/upload/cover/demo.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <p class="card-text">{{ item }}- 流浪地球</p>
        </div>
      </div>
    </div>
    <div aria-label="Page navigation example" class=" content-page">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </div>
  </article>
  <div id="drag-div" :style="{opacity:isDraging?0.7:0}">拖动文件或文件夹到此处</div>
</template>


<style lang="less">
@import './assets/css/styles.less';
</style>
