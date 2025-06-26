<template>
  <div class="flex items-center gap-4">
    <label class="flex items-center cursor-pointer">
      <input type="radio" name="theme" value="light" v-model="theme" @change="setTheme('light')" class="hidden" />
      <span :class="['px-4 py-2 rounded-xl font-bold', theme==='light' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700']">라이트</span>
    </label>
    <label class="flex items-center cursor-pointer">
      <input type="radio" name="theme" value="dark" v-model="theme" @change="setTheme('dark')" class="hidden" />
      <span :class="['px-4 py-2 rounded-xl font-bold', theme==='dark' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700']">다크</span>
    </label>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const theme = ref('light')
function setTheme(val) {
  theme.value = val
  if (val === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('theme', val)
}
onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) setTheme(saved)
})
</script> 