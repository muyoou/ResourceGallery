<script setup lang="ts">
import { ref } from 'vue';
import {
  HomeOutlined,
  ReadOutlined,
  LaptopOutlined,
  PlaySquareOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
const selectedKeys = ref<string[]>(['1']);
</script>

<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
    <a-menu-item key="1">
      <home-outlined />
      <span>主页</span>
    </a-menu-item>
    <a-menu-item key="2">
      <ReadOutlined />
      <span>漫画</span>
    </a-menu-item>
    <a-menu-item key="3">
      <LaptopOutlined />
      <span>游戏</span>
    </a-menu-item>
    <a-menu-item key="4">
      <PlaySquareOutlined />
      <span>视频</span>
    </a-menu-item>
    <a-menu-item key="5">
      <SettingOutlined />
      <span>设置</span>
    </a-menu-item>
  </a-menu>
</template>
