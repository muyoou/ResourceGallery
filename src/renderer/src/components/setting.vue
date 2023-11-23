<script setup lang="ts">
import { ref } from 'vue';
import {
  ToolOutlined,
  TagsOutlined,
  SearchOutlined,
} from '@ant-design/icons-vue';
import FileCC from './manage/FileCC.vue'
const selectedKeys2 = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);
</script>

<template>
  <a-layout style="padding: 24px 0; background: #fff">
    <a-layout-sider width="200" style="background: #fff">
      <a-menu v-model:selectedKeys="selectedKeys2" v-model:openKeys="openKeys" mode="inline" style="height: 100%">
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <ToolOutlined />
              常规
            </span>
          </template>
          <a-menu-item key="1">option1</a-menu-item>
          <a-menu-item key="2">option2</a-menu-item>
          <a-menu-item key="3">option3</a-menu-item>
          <a-menu-item key="4">option4</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <TagsOutlined />
              文件
            </span>
          </template>
          <a-menu-item key="5">单一文件分类</a-menu-item>
          <a-menu-item key="6">文件关键字</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <template #title>
            <span>
              <SearchOutlined />
              资源
            </span>
          </template>
          <a-menu-item key="9">文件类型识别</a-menu-item>
          <a-menu-item key="10">资源类型识别</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
      <a-typography-title :level="2">文件</a-typography-title>
      <a-typography-text type="secondary">文件指在本地储存中的单个文件，通过将单个文件进行分类以进行后续的文件夹分类和资源识别。</a-typography-text>
      <a-divider />
      <a-typography-title :level="3">分类条件</a-typography-title>
      <a-typography-text type="secondary">创建一些自定义的条件以筛选所有的文件，并对符合条件的文件做进一步操作。</a-typography-text>
      <FileCC></FileCC>
      <a-typography-title :level="3">文件分类</a-typography-title>
      <a-typography-text type="secondary">通过一些文件自身的属性，例如文件后缀等，将单个文件分为自定义的多种类别。</a-typography-text>
      
    </a-layout-content>
  </a-layout>
</template>
