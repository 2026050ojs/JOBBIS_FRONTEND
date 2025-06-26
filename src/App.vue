<script setup>
import { useRouter, RouterView } from 'vue-router'
const router = useRouter()
function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-background font-sans">
    <header class="flex items-center p-4 md:p-8 md:h-24">
      <img src="/favicon.ico" alt="로고" class="h-12 md:h-16 cursor-pointer" @click="goHome" />
      <span class="ml-2 text-primary text-2xl md:text-3xl font-bold tracking-tight select-none">JOBBIS</span>
    </header>
    <main class="flex justify-center items-start md:items-center w-full min-h-[80vh]">
      <div class="w-full max-w-2xl px-2 md:px-0">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
.font-sans {
  font-family: 'Noto Sans KR', 'Pretendard', 'Apple SD Gothic Neo', Arial, sans-serif;
}
</style>
