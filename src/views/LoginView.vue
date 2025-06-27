<template>
  <div class="min-h-screen flex flex-col bg-background">
    <header class="flex items-center p-6 md:p-10 md:h-28">
      <img src="/jobbis_logo_fin.png" alt="JOBBIS 로고" class="h-40 w-40 cursor-pointer hover:scale-105 transition-transform duration-200" @click="goHome" />
    </header>
    <main class="flex flex-1 flex-col items-center justify-center">
      <div class="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 class="text-2xl font-bold text-primary mb-6 text-center">로그인</h1>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-gray-700">이름</label>
            <input v-model="name" type="text" required class="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light" />
          </div>
          <div>
            <label class="block text-gray-700">전화번호</label>
            <input v-model="phone" type="tel" required class="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light" />
          </div>
          <button type="submit" class="w-full bg-primary text-white py-2 rounded hover:bg-primary-light transition">로그인</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// 간단한 암호화 예시 (실제 서비스에서는 더 강력한 암호화 필요)
function simpleEncrypt(str) {
  return btoa(unescape(encodeURIComponent(str)))
}
const name = ref('')
const phone = ref('')
const router = useRouter()
function goHome() {
  router.push('/')
}
function handleLogin() {
  // 개인정보 암호화 후 localStorage에 저장
  const encrypted = simpleEncrypt(JSON.stringify({ name: name.value, phone: phone.value }))
  localStorage.setItem('user', encrypted)
  router.push('/questions')
}
</script> 