<script setup lang="ts">
import { ref } from 'vue';
import {
  ToolOutlined,
  TagsOutlined,
  SearchOutlined,
} from '@ant-design/icons-vue';
const selectedKeys2 = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);
</script>

<template>
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            v-model:selectedKeys="selectedKeys2"
            v-model:openKeys="openKeys"
            mode="inline"
            style="height: 100%"
          >
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
                  分类
                </span>
              </template>
              <a-menu-item key="5">漫画分类</a-menu-item>
              <a-menu-item key="6">游戏分类</a-menu-item>
              <a-menu-item key="7">图片分类</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <template #title>
                <span>
                  <SearchOutlined />
                  识别
                </span>
              </template>
              <a-menu-item key="9">漫画识别</a-menu-item>
              <a-menu-item key="10">游戏识别</a-menu-item>
              <a-menu-item key="11">图片识别</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
          <a-typography-title :level="2">识别设置</a-typography-title>
      <a-typography-text type="secondary">以下设置用来在分析本地文件夹时，对每一个文件夹进行自动分类的设置。分类时将按照以下的条件将文件夹分为漫画、游戏、视频三类</a-typography-text>
      <a-divider />
      <a-typography-title :level="3">漫画分类</a-typography-title>
      <a-typography-text type="secondary">以下为将一个文件夹判定为包含漫画的文件夹的自定义条件</a-typography-text>
        </a-layout-content>
      </a-layout>
</template>
