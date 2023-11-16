<script setup lang="ts">
import sideNav from './components/sideNav.vue'
import setting from './components/setting.vue'
import popBox from './components/popBox.vue'
import {
  HomeOutlined,
  ReadOutlined,
  LaptopOutlined,
  PictureOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import { ref } from 'vue';
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
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
          <PictureOutlined />
          <span>图片</span>
        </a-menu-item>
        <a-menu-item key="5">
          <SettingOutlined />
          <span>设置</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <setting></setting>
    </a-layout>
  </a-layout>
</template>
<style lang="less">
@import './assets/css/styles.less';
</style>
