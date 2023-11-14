<script setup lang="ts">
import 'bootstrap';
import './assets/css/bootstrap.min.css'
import sideNav from './components/sideNav.vue'
import content from './components/content.vue'
import popBox from './components/popBox.vue'
</script>

<template>
  <sideNav></sideNav>
  <content></content>
  <popBox></popBox>
</template>


<style lang="less">
@import './assets/css/styles.less';
</style>
