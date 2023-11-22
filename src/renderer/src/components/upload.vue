<script setup lang="ts">
import type { CSSProperties, FunctionalComponent } from 'vue';
import {Ref, computed, ref, h } from 'vue'
import { MFileSet, MFile, MFolder } from '../object'
import newResource from './manage/newResource.vue'
import {
  ExclamationCircleOutlined,
  NodeCollapseOutlined
} from '@ant-design/icons-vue';



const expandedKeys = ref<string[]>(['0-0-0']);
const selectedKeys = ref<string[]>([]);
const props = defineProps(["filePath"])
const showFileList = ref(new MFileSet()) as Ref<MFileSet>
const api = window.api as { openFile: (files: string[]) => Promise<MFileSet>; }
api.openFile(props.filePath).then((value: MFileSet) => {
  showFileList.value.setChildren(value.children)
  showFileList.value.initChildren()
})
const headerStyle: CSSProperties = {
  textAlign: 'center',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: 'white'
};

const selectedFile = computed(() => showFileList.value.findFileByKey(selectedKeys.value[0]))

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
      <a-typography-text type="secondary">您可以点击文件或文件夹，在右边的简介中新建或添加到已有的资源；也可以直接在文件树上右键操作。</a-typography-text>
    </a-layout-header>
    <a-layout-content :style="contentStyle">
      <a-row>
        <a-col flex="1">
          <a-tree v-model:expandedKeys="expandedKeys" v-model:selectedKeys="selectedKeys" show-line
            :tree-data="showFileList.children">
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
        <a-col flex="1" style="border-left: 1px solid lightgrey;padding-left: 30px;">
          <div class="components-page-header-demo-content"
            v-if="selectedKeys.length > 0 && (selectedFile instanceof MFile)">
            <a-page-header :title="selectedFile.title" class="site-page-header" sub-title="单个文件">
              <template #tags>
                <a-tag color="blue">未分类</a-tag>
              </template>

            </a-page-header>
            <div class="file-desc">
              <p>创建时间: {{ selectedFile.getBirthtime() }}</p>
              <p>修改时间: {{ selectedFile.getMtime() }}</p>
              <p>文件大小: {{ selectedFile.size }}</p>
            </div>
            <a-typography-text strong>归属于资源：</a-typography-text>
            <a-card size="small" style="width: 300px">
              <p>
                <ExclamationCircleOutlined />暂未分类到资源
              </p>
            </a-card>
            <a-typography-text strong>操作：</a-typography-text><br><a-space>
              <newResource></newResource>
              <a-button type="primary" :icon="h(NodeCollapseOutlined as FunctionalComponent)">添加到已有资源</a-button>
            </a-space>
          </div>
          <div class="components-page-header-demo-content"
            v-if="selectedKeys.length > 0 && (selectedFile instanceof MFolder)">
            <a-page-header :title="selectedFile.title" class="site-page-header" sub-title="文件夹">
              <template #tags>
                <a-tag color="blue">未分类</a-tag>
              </template>
            </a-page-header>
            <div class="file-desc">
              <p>创建时间: {{ selectedFile.getBirthtime() }}</p>
              <p>修改时间: {{ selectedFile.getMtime() }}</p>
            </div>
            <a-typography-text strong>归属于资源：</a-typography-text>
            <a-card size="small" style="width: 300px">
              <p>暂未分类到资源</p>
            </a-card>
            <a-typography-text strong>操作：</a-typography-text>
          </div>
        </a-col>
      </a-row>

    </a-layout-content>
    <a-layout-footer :style="footerStyle"></a-layout-footer>
  </a-layout>
</template>
