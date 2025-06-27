<script setup>
import { useRouter, RouterView } from 'vue-router'
import DarkModeToggle from './components/DarkModeToggle.vue'
const router = useRouter()
function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-background dark:bg-gray-900 font-sans">
    <header class="flex items-center p-6 md:p-10 md:h-28 bg-white dark:bg-gray-950">
      <img src="/jobbis_logo_fin.png" alt="JOBBIS 로고" class="h-20 w-40 cursor-pointer hover:scale-105 transition-transform duration-200" @click="goHome" />
    </header>
    <main class="w-full flex justify-center">
      <div class="max-w-6xl w-full px-4">
        <RouterView />
      </div>
    </main>
    <div class="fixed top-4 right-4 z-50">
      <DarkModeToggle />
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
.font-sans {
  font-family: 'Noto Sans KR', 'Pretendard', 'Apple SD Gothic Neo', Arial, sans-serif;
}
</style>
