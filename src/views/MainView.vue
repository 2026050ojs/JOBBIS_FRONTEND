<template>
  <div class="min-h-screen flex flex-col bg-background font-sans">
    <header class="flex justify-end items-center p-8 md:h-24 w-full">
      <span class="text-primary text-3xl font-bold tracking-tight select-none mr-4">JOBBIS</span>
      <img src="/favicon.ico" alt="로고" class="h-16 cursor-pointer" @click="goHome" />
    </header>
    <main class="flex flex-1 flex-col items-center justify-center w-full">
      <div class="w-full max-w-6xl bg-white rounded-2xl shadow-2xl p-16 flex flex-col md:flex-row gap-16 items-center">
        <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80" alt="main" class="rounded-2xl w-[420px] h-[420px] object-cover" />
        <div class="flex-1 flex flex-col items-center">
          <h1 class="text-5xl md:text-6xl font-extrabold text-primary mb-12 text-center">나에게 꼭 맞는 기업, <span class="text-primary-light">JOBBIS</span>에서 찾아보세요!</h1>
          <button @click="startTest" class="mt-8 px-16 py-8 bg-primary text-white rounded-2xl text-4xl font-bold hover:bg-primary-light transition shadow-lg">적성검사 시작</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goHome() {
  router.push('/')
}
function startTest() {
  router.push('/questions')
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=SUIT:wght@400;700;900&family=Noto+Sans+KR:wght@400;700&display=swap');
.font-sans {
  font-family: 'SUIT', 'Noto Sans KR', 'Pretendard', 'Apple SD Gothic Neo', Arial, sans-serif;
}
</style> 