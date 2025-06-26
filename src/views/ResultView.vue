<template>
  <div class="min-h-screen flex flex-col bg-background">
    <header class="flex items-center p-4">
      <img src="/favicon.ico" alt="로고" class="h-12 cursor-pointer" @click="goHome" />
      <span class="ml-2 text-primary text-2xl font-bold">JOBBIS</span>
    </header>
    <main class="flex flex-1 flex-col items-center justify-center">
      <div class="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
        <h2 class="text-xl font-bold text-primary mb-4">검사 결과</h2>
        <div v-if="user">
          <div class="mb-2 text-gray-700">{{ user.name }}님, 검사 유형은 <span class="font-semibold text-primary">{{ resultType }}</span> 입니다.</div>
        </div>
        <div class="mb-6 text-gray-600">{{ resultDesc }}</div>
        <h3 class="text-lg font-bold text-primary mb-2">추천 기업</h3>
        <div v-for="(corp, idx) in companies" :key="corp.name" class="mb-2">
          <button @click="toggle(idx)" class="w-full text-left px-4 py-2 bg-primary text-white rounded-t hover:bg-primary-light">
            {{ corp.name }}
          </button>
          <div v-if="openIdx === idx" class="border border-t-0 rounded-b bg-gray-50 px-4 py-2">
            <div><b>업종:</b> {{ corp.type }}</div>
            <div><b>설명:</b> {{ corp.desc }}</div>
            <div><b>위치:</b> {{ corp.location }}</div>
          </div>
        </div>
        <button @click="loadPrev" class="mt-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">이전 검사 결과 불러오기</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
function simpleDecrypt(str) {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(str))))
  } catch {
    return null
  }
}
const router = useRouter()
function goHome() {
  router.push('/')
}
const user = ref(null)
const answers = ref([])
const resultType = ref('분석형')
const resultDesc = ref('분석형은 논리적이고 체계적인 업무에 강점을 보입니다.')
const companies = ref([
  { name: '삼성전자', type: 'IT/전자', desc: '글로벌 전자기업', location: '수원' },
  { name: '네이버', type: 'IT/인터넷', desc: '국내 최대 포털', location: '성남' },
  { name: '현대자동차', type: '제조/자동차', desc: '글로벌 자동차 기업', location: '서울' },
])
const openIdx = ref(null)
function toggle(idx) {
  openIdx.value = openIdx.value === idx ? null : idx
}
function loadPrev() {
  const prev = localStorage.getItem('user')
  const prevAns = localStorage.getItem('answers')
  if (prev && prevAns) {
    user.value = simpleDecrypt(prev)
    answers.value = JSON.parse(prevAns)
    // 실제로는 answers에 따라 resultType/resultDesc/companies를 동적으로 계산해야 함
  }
}
// 최초 진입 시 현재 검사 결과 불러오기
loadPrev()
</script> 