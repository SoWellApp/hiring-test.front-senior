<template>
    <div class="dropzone" :class="{ 'drag-over': isDragover }" @drop.prevent="handleFileDrop"
        @dragover.prevent="isDragover = true" @dragleave.prevent="isDragover = false" @click="emits('event:click')">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emits = defineEmits(["event:fileDropped", "event:click"]);
const isDragover = ref(false);

const handleFileDrop = (event: any) => {
    isDragover.value = false;
    emits("event:fileDropped", event);
};

</script>

<style lang="scss" scoped>
.dropzone {
    border: 2px dashed #757575;
    min-height: 150px;
    cursor: pointer;
    transition: all 0.3s ease;

    &.drag-over {
        background: #cfcece7c;
        border: 2px dashed #2196f3;
    }
}
</style>