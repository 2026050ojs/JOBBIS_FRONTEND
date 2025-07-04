<template>
  <div class="min-h-[80vh] flex items-center justify-center bg-background font-sans dark:bg-gray-900 dark:text-gray-100">
    <div class="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 animate-fade-in">
      <div class="flex flex-col md:flex-row items-start gap-6">
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" 
          alt="result" 
          class="w-36 h-36 object-cover rounded-xl shadow-lg hidden md:block" 
        />
        <div class="flex-1">
          <h2 class="title-primary mb-6 text-center md:text-left">검사 결과</h2>
          <div v-if="user" class="animate-slide-up">
            <div class="text-body text-center md:text-left mb-4">
              {{ user.name || '사용자' }}님의 검사 유형은 <span class="font-semibold text-blue-600 dark:text-blue-400">{{ resultType }}</span> 입니다.
            </div>
          </div>
          <div class="text-body text-center md:text-left mb-6">{{ resultDesc }}</div>
          <canvas ref="chartRef" class="my-6 max-w-xs w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg mx-auto md:mx-0" height="200"></canvas>
          <div class="space-y-3 mb-6">
            <div v-for="(desc, type) in typeDescriptions" :key="type" class="card p-4 hover:scale-105 transition-transform duration-300">
              <span class="font-bold text-blue-600 dark:text-blue-400">{{ type }}</span>: {{ desc }}<span v-if="typeScores[type]"> (점수: {{ typeScores[type] }})</span>
            </div>
          </div>
          <h3 class="title-secondary mb-4">추천 기업</h3>
          <div v-for="(corp, idx) in companies" :key="corp.name" class="mb-3">
            <button @click="toggle(idx)" class="w-full text-left px-4 py-3 bg-blue-600 text-white rounded-t-xl text-lg font-bold hover:bg-blue-700 transition">
              {{ corp.name }}
            </button>
            <div v-if="openIdx === idx" class="border border-t-0 rounded-b-xl bg-gray-50 dark:bg-gray-700 px-4 py-3 text-base animate-slide-up">
              <div><b>업종:</b> {{ corp.type }}</div>
              <div><b>설명:</b> {{ corp.desc }}</div>
              <div><b>위치:</b> {{ corp.location }}</div>
            </div>
          </div>
          <div class="flex flex-col md:flex-row gap-3 mt-8">
            <button @click="shareResult" class="btn-primary">공유하기</button>
            <form @submit.prevent="sendEmail" class="flex gap-2 items-center w-full md:w-auto">
              <input v-model="email" type="email" required placeholder="이메일 입력" class="input-field flex-1 md:w-64" />
              <button type="submit" class="btn-secondary whitespace-nowrap">이메일로 받기</button>
            </form>
          </div>
        </div>
      </div>
    </div>
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
  setTimeout(() => {
    if (chartRef.value && typeScores.value && Object.values(typeScores.value).some(v => v > 0)) {
      if (chartInstance) chartInstance.destroy()
      chartInstance = new Chart(chartRef.value, {
        type: 'pie',
        data: {
          labels: Object.keys(typeScores.value),
          datasets: [{
            data: Object.values(typeScores.value),
            backgroundColor: [
              '#3b82f6', // 분석형
              '#f59e0b', // 창의형
              '#10b981', // 리더형
              '#ef4444', // 실무형
            ],
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: { font: { size: 16, color: '#222' } }
            }
          },
          animation: { animateScale: true }
        }
      })
    }
  }, 300)
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=SUIT:wght@400;700;900&family=Noto+Sans+KR:wght@400;700&display=swap');
.font-sans {
  font-family: 'SUIT', 'Noto Sans KR', 'Pretendard', 'Apple SD Gothic Neo', Arial, sans-serif;
}
</style> 