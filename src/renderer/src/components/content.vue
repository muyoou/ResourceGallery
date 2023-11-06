<script setup lang="ts">
import { ref } from 'vue';

const inde = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
</script>

<template>
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
        <img src="../assets/upload/cover/demo.jpg" class="card-img-top" alt="...">
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
</template>
