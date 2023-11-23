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
const props = defineProps({
  resourceName:{
    type: String,
    default:''
  },
  resourceID:{
    type:Number,
    default: 0
  }
})
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
  <a-button type="primary" @click="showModal" :icon="h(PlusOutlined as FunctionalComponent)">创建为新资源</a-button>
  <a-modal v-model:open="open" title="创建新资源" @ok="handleOk">
    <a-form :model="formState" name="basic" :label-col="{ style: { width: '150px' } }" :wrapper-col="{ span: 16 }"
      autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="资源名称" name="name" :rules="[{ required: true }]">
        <a-input v-model:value="props.resourceName" />
      </a-form-item>
      <a-form-item label="资源ID" name="id" :rules="[{ required: true }]">
        <a-input-number id="inputNumber" v-model:value="props.resourceID" :min="0" :max="10" />
      </a-form-item>
      <a-form-item label="资源类型" name="region" :rules="[{ required: true }]">
        <a-select v-model:value="formState.region" placeholder="请选择资源类型">
          <a-select-option value="shanghai">漫画</a-select-option>
          <a-select-option value="beijing">游戏</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>