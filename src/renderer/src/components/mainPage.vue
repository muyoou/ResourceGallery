<script setup lang="ts">
import sideNav from './sideNav.vue'
import setting from './setting.vue'

import { ref } from 'vue';
const collapsed = ref<boolean>(false);

</script>

<template>
    <a-layout style="min-height: 100vh">
      <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <sideNav></sideNav>
      </a-layout-sider>
      <a-layout>
        <setting></setting>
      </a-layout>
    </a-layout>
  </template>