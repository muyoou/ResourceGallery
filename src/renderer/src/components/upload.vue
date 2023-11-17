<script setup lang="ts">
import type { CSSProperties, Ref } from 'vue';
import { ref } from 'vue';
const expandedKeys = ref<string[]>(['0-0-0']);
const selectedKeys = ref<string[]>([]);
const props = defineProps(["filePath"])
const showFileList = ref([]) as Ref<{ name: string, level: number, isDir: boolean, isOpen: boolean, prev: number, isDisplay: boolean, type: number, isBtn: boolean }[]>
const api = window.api as { openFile: (files: string[]) => Promise<any>; }
api.openFile(props.filePath).then((value) => {
  showFileList.value = value
})
const headerStyle: CSSProperties = {
  textAlign: 'center',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: 'white'
};

const contentStyle: CSSProperties = {
  backgroundColor: 'white',
  padding: '20px'
};

const footerStyle: CSSProperties = {
  backgroundColor: 'white'
};
const onContextMenuClick = (treeKey: string, menuKey: string | number) => {
  console.log(`treeKey: ${treeKey}, menuKey: ${menuKey}`);
};
</script>

<template>
  <a-layout>
    <a-layout-header :style="headerStyle">
      <a-steps :current="1" size="small" :items="[
        {
          title: '分析内容',
        },
        {
          title: '手动调整类型',
        },
        {
          title: '调整分类',
        },
      ]">
      </a-steps>
      <a-typography-text type="secondary">您可以点击文件或文件夹，在右边的简介中选择新的分类；也可以直接在文件或文件夹上右键选择新的分类。</a-typography-text>
    </a-layout-header>
    <a-layout-content :style="contentStyle">
      <a-row>
        <a-col flex="auto">
          <a-tree v-model:expandedKeys="expandedKeys" v-model:selectedKeys="selectedKeys" show-line
            :tree-data="showFileList">
            <template #title="{ key: treeKey, title }">
              <a-dropdown :trigger="['contextmenu']">
                <span>{{ title }}</span>
                <template #overlay>
                  <a-menu @click="({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)">
                    <a-menu-item key="1">1st menu item</a-menu-item>
                    <a-menu-item key="2">2nd menu item</a-menu-item>
                    <a-menu-item key="3">3rd menu item</a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </template>
          </a-tree>
        </a-col>
        <a-col flex="300px">
          <div class="components-page-header-demo-content">
    <a-page-header
      title="Title"
      class="site-page-header"
      sub-title="单个文件"
    >
      <template #tags>
        <a-tag color="blue">Running</a-tag>
      </template>
      <div>{{ selectedKeys }}
        <p>
          Ant Design interprets the color system into two levels: a system-level color system and
          a product-level color system.
        </p>
      </div>
    </a-page-header>
  </div>

        </a-col>
      </a-row>

    </a-layout-content>
    <a-layout-footer :style="footerStyle"></a-layout-footer>
  </a-layout>
</template>
