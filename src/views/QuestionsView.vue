<template>
  <div class="min-h-[80vh] flex items-center justify-center bg-background font-sans dark:bg-gray-900 dark:text-gray-100 relative">
    <div class="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 animate-fade-in">
      <div class="flex flex-col md:flex-row items-start gap-6">
        <img 
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80" 
          alt="question" 
          class="w-36 h-36 object-cover rounded-xl shadow-lg hidden md:block" 
        />
        <div class="flex-1">
          <h2 class="title-primary mb-6 text-center md:text-left">적성검사</h2>
          <div v-if="currentQuestion" class="animate-slide-up">
            <div class="title-secondary text-center md:text-left mb-6">
              <span class="text-blue-600 dark:text-blue-400 font-bold">Q{{ currentIndex + 1 }}.</span> {{ currentQuestion.text }}
            </div>
            <div v-if="currentQuestion.type === 'choice'" class="space-y-3">
              <button 
                v-for="(opt, idx) in currentQuestion.options" 
                :key="idx" 
                @click="selectAnswer(idx)"
                :class="[
                  'btn-option',
                  answers[currentIndex] === idx ? 'btn-option-selected' : ''
                ]"
              >
                {{ opt.text }}
              </button>
            </div>
            <div v-else>
              <input v-model="answers[currentIndex]" type="text" class="input-field" placeholder="답변을 입력해주세요" />
            </div>
            <div v-if="showWarning" class="text-red-600 text-lg mt-4 text-center font-bold animate-bounce">한 개 이상 선택 또는 입력해 주세요.</div>
          </div>
          <div class="flex justify-between mt-8 gap-4">
            <button @click="prev" :disabled="currentIndex === 0" class="btn-secondary flex-1">이전</button>
            <button @click="next" class="btn-primary flex-1">{{ currentIndex === questions.length - 1 ? '제출' : '다음' }}</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Apple 스타일 진행 상황 바 -->
    <div class="fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
      <div class="max-w-6xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
            진행률: {{ Math.round((currentIndex + 1) / questions.length * 100) }}%
          </span>
          <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
            {{ currentIndex + 1 }} / {{ questions.length }}
          </span>
        </div>
        
        <!-- 진행 바 컨테이너 -->
        <div class="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <!-- 배경 그라데이션 -->
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-full"></div>
          
          <!-- 진행 바 -->
          <div 
            class="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out shadow-lg"
            :style="{ width: `${(currentIndex + 1) / questions.length * 100}%` }"
          >
            <!-- 빛나는 효과 -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
          
          <!-- 진행 바 끝부분 하이라이트 -->
          <div 
            class="absolute top-0 right-0 h-full w-1 bg-white/60 rounded-full shadow-lg"
            :style="{ right: `${100 - (currentIndex + 1) / questions.length * 100}%` }"
          ></div>
        </div>
        
        <!-- 질문 번호 표시 -->
        <div class="flex justify-between mt-2">
          <span class="text-xs text-gray-500 dark:text-gray-400">시작</span>
          <span class="text-xs text-blue-600 dark:text-blue-400 font-medium">Q{{ currentIndex + 1 }}</span>
          <span class="text-xs text-gray-500 dark:text-gray-400">완료</span>
        </div>
      </div>
    </div>
    
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="card p-10 flex flex-col items-center animate-fade-in">
        <svg class="animate-spin h-16 w-16 text-blue-600 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
        <div class="title-secondary text-blue-600">적성 판단 중...</div>
      </div>
    </div>
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
  {
    text: '문제가 발생했을 때 어떻게 해결하나요?',
    type: 'choice',
    options: [
      { text: '직접 해결', scores: { 분석형: 1, 창의형: 0, 리더형: 1, 실무형: 2 } },
      { text: '팀원과 상의', scores: { 분석형: 0, 창의형: 1, 리더형: 2, 실무형: 0 } },
      { text: '외부 도움 요청', scores: { 분석형: 0, 창의형: 2, 리더형: 0, 실무형: 1 } },
      { text: '문제 분석 후 해결', scores: { 분석형: 2, 창의형: 0, 리더형: 0, 실무형: 1 } },
    ]
  },
  { text: '가장 자신 있는 역량은 무엇인가요?', type: 'text' },
  {
    text: '업무에서 가장 중요하게 생각하는 가치는?',
    type: 'choice',
    options: [
      { text: '창의성', scores: { 분석형: 0, 창의형: 2, 리더형: 1, 실무형: 0 } },
      { text: '효율성', scores: { 분석형: 2, 창의형: 0, 리더형: 0, 실무형: 1 } },
      { text: '협업', scores: { 분석형: 0, 창의형: 1, 리더형: 2, 실무형: 0 } },
      { text: '정확성', scores: { 분석형: 2, 창의형: 0, 리더형: 0, 실무형: 1 } },
    ]
  },
  {
    text: '스트레스를 받을 때 주로 어떻게 해소하나요?',
    type: 'choice',
    options: [
      { text: '운동', scores: { 분석형: 0, 창의형: 1, 리더형: 0, 실무형: 2 } },
      { text: '휴식', scores: { 분석형: 1, 창의형: 0, 리더형: 1, 실무형: 1 } },
      { text: '대화', scores: { 분석형: 0, 창의형: 2, 리더형: 1, 실무형: 0 } },
      { text: '취미 활동', scores: { 분석형: 1, 창의형: 2, 리더형: 0, 실무형: 0 } },
    ]
  },
  {
    text: '기술 변화에 빠르게 적응하는 편인가요?',
    type: 'choice',
    options: [
      { text: '매우 그렇다', scores: { 분석형: 1, 창의형: 2, 리더형: 0, 실무형: 1 } },
      { text: '보통이다', scores: { 분석형: 1, 창의형: 1, 리더형: 1, 실무형: 1 } },
      { text: '그렇지 않다', scores: { 분석형: 0, 창의형: 0, 리더형: 1, 실무형: 2 } },
    ]
  },
  { text: '업무 중 가장 어려웠던 경험은?', type: 'text' },
  {
    text: '협업 시 가장 중요하게 생각하는 것은?',
    type: 'choice',
    options: [
      { text: '의사소통', scores: { 분석형: 0, 창의형: 1, 리더형: 2, 실무형: 0 } },
      { text: '책임감', scores: { 분석형: 1, 창의형: 0, 리더형: 1, 실무형: 1 } },
      { text: '유연성', scores: { 분석형: 0, 창의형: 2, 리더형: 0, 실무형: 1 } },
      { text: '리더십', scores: { 분석형: 0, 창의형: 0, 리더형: 2, 실무형: 1 } },
    ]
  },
  { text: '목표를 달성하기 위해 주로 사용하는 전략은?', type: 'text' },
  {
    text: '업무에서 동기부여가 되는 요소는?',
    type: 'choice',
    options: [
      { text: '보상', scores: { 분석형: 0, 창의형: 1, 리더형: 0, 실무형: 2 } },
      { text: '성장', scores: { 분석형: 1, 창의형: 2, 리더형: 0, 실무형: 1 } },
      { text: '인정', scores: { 분석형: 0, 창의형: 2, 리더형: 1, 실무형: 0 } },
      { text: '안정', scores: { 분석형: 2, 창의형: 0, 리더형: 0, 실무형: 1 } },
    ]
  },
  {
    text: '실패를 경험했을 때 어떻게 대처하나요?',
    type: 'choice',
    options: [
      { text: '분석 후 재도전', scores: { 분석형: 2, 창의형: 0, 리더형: 0, 실무형: 1 } },
      { text: '팀과 공유', scores: { 분석형: 0, 창의형: 1, 리더형: 2, 실무형: 0 } },
      { text: '새로운 방법 모색', scores: { 분석형: 0, 창의형: 2, 리더형: 0, 실무형: 1 } },
      { text: '포기', scores: { 분석형: 0, 창의형: 0, 리더형: 0, 실무형: 0 } },
    ]
  },
  { text: '자신의 장단점을 한 가지씩 말해보세요.', type: 'text' },
  { text: '미래에 이루고 싶은 목표는?', type: 'text' },
  { text: '업무 중 가장 즐거웠던 순간은?', type: 'text' },
  {
    text: '새로운 아이디어가 떠오를 때 어떻게 행동하나요?',
    type: 'choice',
    options: [
      { text: '바로 실행', scores: { 분석형: 1, 창의형: 2, 리더형: 0, 실무형: 1 } },
      { text: '팀과 공유', scores: { 분석형: 0, 창의형: 1, 리더형: 2, 실무형: 0 } },
      { text: '기록 후 검토', scores: { 분석형: 2, 창의형: 0, 리더형: 0, 실무형: 1 } },
      { text: '아이디어만 저장', scores: { 분석형: 0, 창의형: 2, 리더형: 0, 실무형: 1 } },
    ]
  },
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
function selectAnswer(idx) {
  answers.value[currentIndex.value] = idx
  showWarning.value = false
}
function next() {
  if (answers.value[currentIndex.value] === undefined || answers.value[currentIndex.value] === null || answers.value[currentIndex.value].toString().trim() === '') {
    showWarning.value = true
    return
  }
  // 유형별 점수 누적
  const q = questions[currentIndex.value]
  if (q.type === 'choice' && typeof answers.value[currentIndex.value] === 'number') {
    const opt = q.options[answers.value[currentIndex.value]]
    for (const t of types) {
      typeScores.value[t] += opt.scores[t] || 0
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

/* 빛나는 효과 애니메이션 */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
</style> 