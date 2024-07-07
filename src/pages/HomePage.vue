<template>
  <q-page padding>
    <div data-testid="home.title" class="text-h4">File upload page</div>
    <sw-file-uploader multiple label="Importer vos fichiers"></sw-file-uploader>
  </q-page>
</template>
<script setup lang="ts">
import SwFileUploader from '@/components/FileUploader.vue'
defineOptions({
  name: 'HomePage'
})
</script>
