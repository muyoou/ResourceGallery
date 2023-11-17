<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';

const typeList = ['无类型', '漫画','游戏','图片']

// 是否正在拖动文件
const isDraging = ref(false)
// 是否显示弹出框
const isPopBox = ref(false)
// 上传文件树
const showFileList = ref([]) as Ref<{ name: string, level: number, isDir: boolean, isOpen: boolean, prev: number, isDisplay: boolean, type: number,isBtn: boolean }[]>
const api = window.api as { openFile: (files: string[]) => Promise<any>; }

// 打开某个文件夹
function openFolder(index) {
  showFileList.value[index].isOpen = !showFileList.value[index].isOpen
  let folder = showFileList.value[index]
  if (folder.isOpen) {
    for (let i = index + 1; i < showFileList.value.length; i++)
      if (showFileList.value[i].level == folder.level + 1)
        showFileList.value[i].isDisplay = true
      else if (showFileList.value[i].level <= folder.level) break
  } else {
    for (let i = index + 1; i < showFileList.value.length; i++)
      if (showFileList.value[i].level > folder.level) {
        showFileList.value[i].isDisplay = false
        showFileList.value[i].isOpen = false
      } else break
  }
}

// 更改文件夹类型
function changeFolderType(index, type){
  showFileList.value[index].type = type
  showFileList.value[index].isBtn = false
}
onMounted(() => {
  let dragDiv = document.getElementById('drag-div')
  dragDiv?.addEventListener('dragenter', (e) => {
    e.stopPropagation()
    isDraging.value = true
  })
  dragDiv?.addEventListener('dragleave', (e) => {
    e.stopPropagation()
    isDraging.value = false
  })
  dragDiv?.addEventListener('drop', (e) => {
    e.stopPropagation()
    isPopBox.value = true
    let fileList = [] as string[]
    for (let index in e.dataTransfer?.files) {
      fileList.push(e.dataTransfer?.files[index].path)
    }
    api.openFile(fileList).then((value) => {
      showFileList.value = value
    })
  })
  dragDiv?.addEventListener('dragover', (e) => {
    e.preventDefault()
  })
})

</script>

<template>
  <!---->
  <div class="card" id="pop-box" v-if="isPopBox">
    <h5 class="card-title">手动分类</h5>
    <div class="card-body">
      <div class="list-group">

        <template v-for="(file, index) in showFileList">

          <a class="list-group-item list-group-item-action file-list" v-if="file.isDir && file.isDisplay"
            :style="{ paddingLeft: 20 + 20 * file.level + 'px' }" @click="openFolder(index)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder"
              viewBox="0 0 16 16" style="margin-right: 10px;">
              <path v-if="file.isOpen"
                d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z" />
              <path v-else
                d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
            </svg>{{ file.name }}
            <span class="badge bg-primary rounded-pill">{{ typeList[file.type] }}</span>
            <button type="button" class="btn btn-light list-btn" @click.stop="file.isBtn = !file.isBtn">更改</button><br>
            <div class="btn-group" role="group" aria-label="Basic mixed styles example" v-if="file.isBtn">
              更改为：
              <button type="button" class="btn btn-outline-primary" v-for="(item, type) in typeList" @click.stop="changeFolderType(index, type)">{{item}}</button>
            </div>
          </a>
        </template>
      </div>
    </div>
    <div class="card-footer">
      <a href="#" class="btn btn-light">返回</a>
      <a href="#" class="btn btn-primary">确定</a>
    </div>
  </div>
</template>
