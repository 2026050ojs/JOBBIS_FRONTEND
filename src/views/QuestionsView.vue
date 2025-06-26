<template>
  <div class="min-h-screen flex flex-col bg-background font-sans">
    <header class="flex justify-end items-center p-8 md:h-24 w-full">
      <span class="text-primary text-3xl font-bold tracking-tight select-none mr-4">JOBBIS</span>
      <img src="/favicon.ico" alt="로고" class="h-16 cursor-pointer" @click="goHome" />
    </header>
    <main class="flex flex-1 flex-col items-center justify-center w-full">
      <div class="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-16 flex flex-col md:flex-row gap-16 items-center">
        <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80" alt="question" class="rounded-2xl w-[360px] h-[360px] object-cover hidden md:block" />
        <div class="flex-1 flex flex-col items-center">
          <h2 class="text-4xl md:text-5xl font-bold text-primary mb-10 text-center">적성검사</h2>
          <div v-if="currentQuestion" class="w-full">
            <div class="mb-8 text-2xl md:text-3xl font-semibold text-gray-800 text-center">
              <span class="font-bold text-primary">Q{{ currentIndex + 1 }}.</span> {{ currentQuestion.text }}
            </div>
            <div v-if="currentQuestion.type === 'choice'" class="space-y-4 w-full">
              <button v-for="(opt, idx) in currentQuestion.options" :key="idx" @click="selectAnswer(opt)"
                :class="['w-full py-5 rounded-xl border text-2xl font-semibold', answers[currentIndex] === opt ? 'bg-primary text-white' : 'bg-gray-100']">
                {{ opt.text }}
              </button>
            </div>
            <div v-else>
              <input v-model="answers[currentIndex]" type="text" class="w-full border rounded-xl px-4 py-5 text-2xl" />
            </div>
            <div v-if="showWarning" class="text-red-600 text-lg mt-4 text-center font-bold">한 개 이상 선택 또는 입력해 주세요.</div>
          </div>
          <div class="flex justify-between mt-12 w-full">
            <button @click="prev" :disabled="currentIndex === 0" class="px-10 py-4 rounded-xl bg-gray-200 hover:bg-gray-300 text-2xl font-bold">이전</button>
            <button @click="next" class="px-10 py-4 rounded-xl bg-primary text-white hover:bg-primary-light text-2xl font-bold">
              {{ currentIndex === questions.length - 1 ? '제출' : '다음' }}
            </button>
          </div>
        </div>
      </div>
      <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-2xl shadow-2xl p-16 flex flex-col items-center">
          <svg class="animate-spin h-16 w-16 text-primary mb-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <div class="text-3xl font-bold text-primary">적성 판단 중...</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const types = ['분석형', '창의형', '리더형', '실무형']
const questions = [
  {
    text: '당신이 가장 선호하는 업무 환경은 무엇인가요?',
    type: 'choice',
    options: [
      { text: '조용한 환경', scores: { 분석형: 2, 창의형: 0, 리더형: 0, 실무형: 1 } },
      { text: '활발한 환경', scores: { 분석형: 0, 창의형: 1, 리더형: 2, 실무형: 0 } },
      { text: '유연한 환경', scores: { 분석형: 0, 창의형: 2, 리더형: 0, 실무형: 1 } },
      { text: '체계적인 환경', scores: { 분석형: 2, 창의형: 0, 리더형: 0, 실무형: 1 } },
    ]
  },
  {
    text: '새로운 기술이나 정보를 배우는 것을 즐기시나요?',
    type: 'choice',
    options: [
      { text: '매우 그렇다', scores: { 분석형: 1, 창의형: 2, 리더형: 0, 실무형: 1 } },
      { text: '보통이다', scores: { 분석형: 1, 창의형: 1, 리더형: 1, 실무형: 1 } },
      { text: '그렇지 않다', scores: { 분석형: 0, 창의형: 0, 리더형: 1, 실무형: 2 } },
    ]
  },
  {
    text: '팀 프로젝트에서 주로 맡는 역할은?',
    type: 'choice',
    options: [
      { text: '리더', scores: { 분석형: 0, 창의형: 0, 리더형: 2, 실무형: 1 } },
      { text: '서포터', scores: { 분석형: 1, 창의형: 0, 리더형: 0, 실무형: 2 } },
      { text: '아이디어 제안자', scores: { 분석형: 0, 창의형: 2, 리더형: 1, 실무형: 0 } },
      { text: '실행가', scores: { 분석형: 1, 창의형: 0, 리더형: 0, 실무형: 2 } },
    ]
  },
  { text: '문제가 발생했을 때 어떻게 해결하나요?', type: 'choice', options: ['직접 해결', '팀원과 상의', '외부 도움 요청', '문제 분석 후 해결'] },
  { text: '가장 자신 있는 역량은 무엇인가요?', type: 'text' },
  { text: '업무에서 가장 중요하게 생각하는 가치는?', type: 'choice', options: ['창의성', '효율성', '협업', '정확성'] },
  { text: '스트레스를 받을 때 주로 어떻게 해소하나요?', type: 'choice', options: ['운동', '휴식', '대화', '취미 활동'] },
  { text: '기술 변화에 빠르게 적응하는 편인가요?', type: 'choice', options: ['매우 그렇다', '보통이다', '그렇지 않다'] },
  { text: '업무 중 가장 어려웠던 경험은?', type: 'text' },
  { text: '협업 시 가장 중요하게 생각하는 것은?', type: 'choice', options: ['의사소통', '책임감', '유연성', '리더십'] },
  { text: '목표를 달성하기 위해 주로 사용하는 전략은?', type: 'text' },
  { text: '업무에서 동기부여가 되는 요소는?', type: 'choice', options: ['보상', '성장', '인정', '안정'] },
  { text: '실패를 경험했을 때 어떻게 대처하나요?', type: 'choice', options: ['분석 후 재도전', '팀과 공유', '새로운 방법 모색', '포기'] },
  { text: '자신의 장단점을 한 가지씩 말해보세요.', type: 'text' },
  { text: '미래에 이루고 싶은 목표는?', type: 'text' },
  { text: '업무 중 가장 즐거웠던 순간은?', type: 'text' },
  { text: '새로운 아이디어가 떠오를 때 어떻게 행동하나요?', type: 'choice', options: ['바로 실행', '팀과 공유', '기록 후 검토', '아이디어만 저장'] },
  { text: '리더십 경험이 있다면 어떤 경험이었나요?', type: 'text' },
  { text: '자신이 생각하는 이상적인 기업 문화는?', type: 'text' },
  { text: '마지막으로, 본인을 한 문장으로 표현한다면?', type: 'text' },
]
const currentIndex = ref(0)
const answers = ref([])
const typeScores = ref({ 분석형: 0, 창의형: 0, 리더형: 0, 실무형: 0 })
const showWarning = ref(false)
const loading = ref(false)
const currentQuestion = computed(() => questions[currentIndex.value])
function goHome() {
  router.push('/')
}
function selectAnswer(opt) {
  answers.value[currentIndex.value] = opt
  showWarning.value = false
}
function next() {
  if (!answers.value[currentIndex.value] || answers.value[currentIndex.value].toString().trim() === '') {
    showWarning.value = true
    return
  }
  // 유형별 점수 누적
  const q = questions[currentIndex.value]
  if (q.type === 'choice' && typeof answers.value[currentIndex.value] === 'object' && answers.value[currentIndex.value].scores) {
    for (const t of types) {
      typeScores.value[t] += answers.value[currentIndex.value].scores[t] || 0
    }
  }
  showWarning.value = false
  if (currentIndex.value < questions.length - 1) {
    currentIndex.value++
  } else {
    loading.value = true
    setTimeout(() => {
      localStorage.setItem('answers', JSON.stringify(answers.value))
      localStorage.setItem('typeScores', JSON.stringify(typeScores.value))
      loading.value = false
      router.push('/result')
    }, 2000)
  }
}
function prev() {
  if (currentIndex.value > 0) currentIndex.value--
  showWarning.value = false
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=SUIT:wght@400;700;900&family=Noto+Sans+KR:wght@400;700&display=swap');
.font-sans {
  font-family: 'SUIT', 'Noto Sans KR', 'Pretendard', 'Apple SD Gothic Neo', Arial, sans-serif;
}
</style> 