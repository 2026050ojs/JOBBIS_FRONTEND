<template>
  <div class="min-h-screen flex flex-col bg-background font-sans">
    <header class="flex justify-end items-center p-8 md:h-24 w-full">
      <span class="text-primary text-3xl font-bold tracking-tight select-none mr-4 animate-bounce">JOBBIS</span>
      <img src="/favicon.ico" alt="로고" class="h-16 cursor-pointer" @click="goHome" />
    </header>
    <main class="flex flex-1 flex-col items-center justify-center w-full">
      <div class="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-8 md:p-16 flex flex-col md:flex-row gap-8 md:gap-16 items-center transition-all duration-500">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="result" class="rounded-2xl w-[240px] md:w-[360px] h-[240px] md:h-[360px] object-cover hidden md:block" />
        <div class="flex-1 flex flex-col items-center">
          <h2 class="text-4xl md:text-5xl font-bold text-primary mb-10 text-center animate-fade-in">검사 결과</h2>
          <div v-if="user">
            <div class="mb-4 text-2xl text-gray-700 text-center">{{ user.name || '사용자' }}님의 검사 유형은 <span class="font-semibold text-primary">{{ resultType }}</span> 입니다.</div>
          </div>
          <div class="mb-8 text-xl text-gray-600 text-center">{{ resultDesc }}</div>
          <canvas ref="chartRef" class="my-8 max-w-xs w-full" height="220"></canvas>
          <div class="w-full flex flex-col gap-4 mb-8">
            <div v-for="(desc, type) in typeDescriptions" :key="type" class="p-4 rounded-xl border bg-gray-50 shadow hover:scale-105 transition">
              <span class="font-bold text-primary">{{ type }}</span>: {{ desc }}<span v-if="typeScores[type]"> (점수: {{ typeScores[type] }})</span>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-primary mb-4">추천 기업</h3>
          <div v-for="(corp, idx) in companies" :key="corp.name" class="mb-4 w-full">
            <button @click="toggle(idx)" class="w-full text-left px-6 py-4 bg-primary text-white rounded-t-xl text-xl font-bold hover:bg-primary-light transition">
              {{ corp.name }}
            </button>
            <div v-if="openIdx === idx" class="border border-t-0 rounded-b-xl bg-gray-50 px-6 py-4 text-lg animate-fade-in">
              <div><b>업종:</b> {{ corp.type }}</div>
              <div><b>설명:</b> {{ corp.desc }}</div>
              <div><b>위치:</b> {{ corp.location }}</div>
            </div>
          </div>
          <div class="flex flex-col md:flex-row gap-4 mt-10 w-full justify-center items-center">
            <button @click="shareResult" class="px-10 py-4 bg-primary text-white rounded-xl text-2xl font-bold hover:bg-primary-light transition">공유하기</button>
            <form @submit.prevent="sendEmail" class="flex gap-2 items-center">
              <input v-model="email" type="email" required placeholder="이메일 입력" class="border rounded-xl px-4 py-3 text-xl focus:outline-none focus:ring-2 focus:ring-primary-light" />
              <button type="submit" class="bg-primary text-white py-3 px-6 rounded-xl text-xl font-bold hover:bg-primary-light transition">이메일로 받기</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Chart from 'chart.js/auto'
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
const user = ref({})
const answers = ref([])
const typeScores = ref({ 분석형: 0, 창의형: 0, 리더형: 0, 실무형: 0 })
const typeDescriptions = {
  분석형: '분석형은 논리적이고 체계적인 업무에 강점을 보입니다.',
  창의형: '창의형은 새로운 아이디어와 혁신을 추구합니다.',
  리더형: '리더형은 팀을 이끌고 조율하는 데 능숙합니다.',
  실무형: '실무형은 실행력과 실질적 성과에 집중합니다.'
}
const companies = ref([
  { name: '삼성전자', type: 'IT/전자', desc: '글로벌 전자기업', location: '수원' },
  { name: '네이버', type: 'IT/인터넷', desc: '국내 최대 포털', location: '성남' },
  { name: '현대자동차', type: '제조/자동차', desc: '글로벌 자동차 기업', location: '서울' },
])
const openIdx = ref(null)
const email = ref('')
const resultType = ref('')
const resultDesc = ref('')
const chartRef = ref(null)
let chartInstance = null
function toggle(idx) {
  openIdx.value = openIdx.value === idx ? null : idx
}
function shareResult() {
  if (navigator.share) {
    navigator.share({
      title: 'JOBBIS 검사 결과',
      text: '나의 JOBBIS 검사 결과를 확인해보세요!',
      url: window.location.href
    })
  } else {
    alert('공유 기능을 지원하지 않는 브라우저입니다.')
  }
}
function sendEmail() {
  window.location.href = `mailto:${email.value}?subject=JOBBIS 검사 결과&body=아래는 나의 JOBBIS 검사 결과입니다.\n유형: ${resultType.value}\n설명: ${resultDesc.value}`
}
function loadPrev() {
  const prev = localStorage.getItem('user')
  const prevAns = localStorage.getItem('answers')
  const prevScores = localStorage.getItem('typeScores')
  if (prev && prevAns && prevScores) {
    user.value = simpleDecrypt(prev)
    answers.value = JSON.parse(prevAns)
    typeScores.value = JSON.parse(prevScores)
    // 결과 유형 계산
    const maxType = Object.keys(typeScores.value).reduce((a, b) => typeScores.value[a] > typeScores.value[b] ? a : b)
    resultType.value = maxType
    resultDesc.value = typeDescriptions[maxType]
  }
}
onMounted(() => {
  loadPrev()
  // 파이 차트 그리기
  if (chartRef.value && typeScores.value) {
    if (chartInstance) chartInstance.destroy()
    chartInstance = new Chart(chartRef.value, {
      type: 'pie',
      data: {
        labels: Object.keys(typeScores.value),
        datasets: [{
          data: Object.values(typeScores.value),
          backgroundColor: [
            '#60a5fa', // 분석형
            '#fbbf24', // 창의형
            '#34d399', // 리더형
            '#f87171', // 실무형
          ],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: { font: { size: 18 } }
          }
        },
        animation: { animateScale: true }
      }
    })
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=SUIT:wght@400;700;900&family=Noto+Sans+KR:wght@400;700&display=swap');
.font-sans {
  font-family: 'SUIT', 'Noto Sans KR', 'Pretendard', 'Apple SD Gothic Neo', Arial, sans-serif;
}
</style> 