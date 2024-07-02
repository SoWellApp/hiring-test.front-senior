<template>
  <q-page padding>
    <div data-testid="home.title" class="text-h4">File upload page</div>
    <!-- TODO: add useful classes and CSS to match the desired look -->
    <sw-file-uploader></sw-file-uploader>
  </q-page>
</template>
<script setup lang="ts">
import SwFileUploader from '@/components/FileUploader.vue'
defineOptions({
  name: 'HomePage'
})
</script>
