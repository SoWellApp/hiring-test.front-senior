<template>
  <sw-drop-zone @event:file-dropped="handleFileDrop" @event:click="selectFile" class="dropzone">

    <input type="file" class="hidden" ref="inputFile" @change="handleFileChange" :multiple="multiple" />

    <q-icon class="icon" size="md" color="blue" :name="files.length > 0 ? 'check' : 'upload_2'" />

    <div class="file-list-container">
      <div v-if="files.length > 0" class="file-list">
        <div v-for="(file, index) in files" :key="index" class="file-item">
          <div class="file-name" :title="file.name"> {{ file.name }} </div>
          <q-btn flat icon="close" @click.stop="hanldeFileRemove(index)" />
        </div>
      </div>
      <div v-else class="label">{{ label || "Importer un fichier" }}</div>
    </div>

  </sw-drop-zone>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Notify } from 'quasar'
import SwDropZone from "@/components/DropZone.vue";

const emits = defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<{
  multiple: boolean;
  label?: string;
  modelValue?: string | string[]
}>(), {
  multiple: false
})

const inputFile = ref<HTMLInputElement | null>(null);
const files = ref<File[]>([]);

const selectFile = () => {
  if (!inputFile.value) return;
  inputFile.value.click();
}

const handleFileChange = (event: any) => {
  const files = event.target.files;
  if (!files.length) return
  setFiles(files);
}

const handleFileDrop = (event: any) => {
  const files = event.dataTransfer.files;
  if (!files.length) return
  if (files.length > 1 && !props.multiple) {
    Notify.create({
      message: "You can upload only one (1) file",
      color: "warning"
    })
    return;
  }
  setFiles(files);
};

const hanldeFileRemove = (index: number) => {
  files.value.splice(index, 1);
  updateModelValue();
}

const setFiles = async (selectedFiles: File[]) => {
  try {
    files.value.push(...selectedFiles);
    await updateModelValue();
  } catch (error) {
    Notify.create({
      message: "Error occured when uploading file!",
      color: "red"
    })
  }
}

const updateModelValue = async () => {
  const base64Items = await Promise.all(files.value.map(file => toBase64(file)));
  if (props.multiple) {
    emits("update:modelValue", base64Items);
  } else {
    emits("update:modelValue", base64Items[0])
  }
}

const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

</script>

<style lang="scss" scoped>
.dropzone {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 350px;

  .icon {
    display: inline
  }

  .file-list-container {
    padding: 0 10px;
    width: 100%;

    .file-list {
      display: flex;
      flex-direction: column;
      align-items: center;

      .file-item {
        max-width: 100%;
        margin: 5px 0;
        display: flex;
        align-items: center;
        background: #cfcece7c;

        .file-name {
          padding: 0 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

    }

    .label {
      text-align: center;
    }
  }
}
</style>