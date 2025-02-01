<script setup lang="ts">
const emit = defineEmits(['change-part'])

const changePart = (id: number) => {
  emit("change-part", id)
}
</script>

<template>

  <button @click="changePart(1)">Порфтолио</button>
  <button @click="changePart(2)">Обо мне</button>  
</template>
