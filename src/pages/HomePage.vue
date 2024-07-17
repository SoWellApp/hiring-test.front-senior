<template>
  <q-page padding>
    <div data-testid="home.title" class="text-h4">File upload page</div>
    <!-- TODO: add useful classes and CSS to match the desired look -->
    <sw-file-uploader v-model="base64File" label="Importer un fichier"></sw-file-uploader>
  </q-page>
</template>
<script setup lang="ts">
import SwFileUploader from '@/components/FileUploader.vue'
import { ref } from 'vue'

defineOptions({
  name: 'HomePage'
})
const base64File = ref('')
</script>
