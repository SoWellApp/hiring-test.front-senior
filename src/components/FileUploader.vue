<template>
  File uploader
  <div class="file-uploader" @dragover.prevent @drop.prevent="handleDrop" @click="openFileDialog">
    <input type="file" ref="fileInput" @change="handleFileChange" hidden />
    <div v-if="modelValue">
      <Check :size="40" />
      <div class="uploaded-file">
        <span>{{ fileName }}</span>
        <button @click.stop="removeFile">
          <X :size="20" />
        </button>
      </div>
    </div>
    <div v-else class="upload-prompt">
      <ArrowUpFromLine :size="40" />
      <p>{{ label }}</p>
    </div>
    <q-banner v-if="errorMessage" inline-actions class="text-white bg-red">
      {{ errorMessage }}
    </q-banner>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { Check, ArrowUpFromLine, X } from 'lucide-vue-next'

const props = defineProps({
  label: String,
  modelValue: String,
  allowedTypes: {
    type: Array as () => string[],
    default: () => ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
  },
  maxFileSize: {
    type: Number,
    default: 5 // Default to 5 MB
  }
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref<HTMLInputElement | null>(null)
const fileName = ref<String>('')
const errorMessage = ref<string | null>(null)

const openFileDialog = () => {
  fileInput.value?.click()
}

const handleFileChange = async (event: any) => {
  await handleFile(event.target.files[0])
}

const handleDrop = async (event: DragEvent) => {
  if (!event.dataTransfer) return
  await handleFile(event.dataTransfer.files[0])
}

const handleFile = async (file: File | null) => {
  errorMessage.value = null
  if (!file) return
  if (!isValidFile(file)) {
    return
  }
  try {
    const base64file = await convertToBase64(file)
    fileName.value = file.name
    emit('update:modelValue', base64file)
  } catch (error) {
    errorMessage.value = 'Error converting file to base64'
  }
}

const isValidFile = (file: File): boolean => {
  // Check file type first
  if (!props.allowedTypes.includes(file.type)) {
    errorMessage.value = 'File type not allowed, only image and pdf.'
    return false
  }
  // Check file size
  if (file.size > props.maxFileSize * 1024 * 1024) {
    errorMessage.value = `File size exceeds ${props.maxFileSize} MB.`
    return false
  }

  return true
}

const removeFile = () => {
  emit('update:modelValue', '')
  fileName.value = ''
}

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}
</script>

<style scoped>
.file-uploader {
  border: 4px dashed #ccc;
  margin: 40px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  position: relative;
  width: 50%;
}

.uploaded-file {
  display: flex;
  margin: 5px 10px;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f5bc;
  border-radius: 4px;
  text-align: center;
}

.uploaded-file span {
  margin: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: auto;
}

.uploaded-file button {
  display: flex;
  cursor: pointer;
  border: none;
  background: none;
}

.upload-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-prompt p {
  margin: 5px 10px;
}

.error-message {
  background-color: #f5f5f5bc;
  border-radius: 4px;
  padding: 5px;
}
</style>
