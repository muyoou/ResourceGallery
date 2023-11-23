<script setup lang="ts">
import { ref,reactive,h, FunctionalComponent } from 'vue';
import {
  PlusOutlined,
} from '@ant-design/icons-vue';
interface FormState {
  name: string;
  id: number
  region: undefined;
}

const open = ref<boolean>(false);
const showModal = () => {
  open.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};
const formState = reactive<FormState>({
  name: '',
  id: 0,
  region: undefined,
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<template>
  <a-button type="primary" @click="showModal" :icon="h(PlusOutlined as FunctionalComponent)">新增条件</a-button>
  <a-modal v-model:open="open" title="新增条件" @ok="handleOk">
    <a-form :model="formState" name="basic" :label-col="{ style: { width: '150px' } }" :wrapper-col="{ span: 16 }"
      autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="基础条件" name="region" :rules="[{ required: true }]">
        <a-select v-model:value="formState.region" placeholder="请选择应用的基础条件">
          <a-select-option value="name">通过文件名称筛选</a-select-option>
          <a-select-option value="size">通过文件大小筛选</a-select-option>
          <a-select-option value="suffix">通过文件后缀筛选</a-select-option>
          <a-select-option value="CreationDate">通过文件创建日期筛选</a-select-option>
          <a-select-option value="beijing">通过文件修改日期筛选</a-select-option>
          <a-select-option value="beijing">同级文件中某条件的达成数</a-select-option>
          <a-select-option value="beijing">表达式筛选</a-select-option>
          <a-select-option value="beijing">脚本筛选</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>