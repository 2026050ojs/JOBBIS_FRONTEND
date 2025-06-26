<template>
  <div class="min-h-screen flex flex-col bg-background">
    <header class="flex items-center p-4">
      <img src="/favicon.ico" alt="로고" class="h-12 cursor-pointer" @click="goHome" />
      <span class="ml-2 text-primary text-2xl font-bold">JOBBIS</span>
    </header>
    <main class="flex flex-1 flex-col items-center justify-center">
      <div class="bg-white rounded-lg shadow-md p-8 w-full max-w-xl">
        <h2 class="text-xl font-bold text-primary mb-4">적성검사</h2>
        <div v-if="currentQuestion">
          <div class="mb-4">
            <span class="font-semibold">{{ currentIndex + 1 }}.</span> {{ currentQuestion.text }}
          </div>
          <div v-if="currentQuestion.type === 'choice'" class="space-y-2">
            <button v-for="(opt, idx) in currentQuestion.options" :key="idx" @click="selectAnswer(opt)"
              :class="['w-full py-2 rounded border', answers[currentIndex] === opt ? 'bg-primary text-white' : 'bg-gray-100']">
              {{ opt }}
            </button>
          </div>
          <div v-else>
            <input v-model="answers[currentIndex]" type="text" class="w-full border rounded px-3 py-2" />
          </div>
        </div>
        <div class="flex justify-between mt-6">
          <button @click="prev" :disabled="currentIndex === 0" class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">이전</button>
          <button @click="next" class="px-4 py-2 rounded bg-primary text-white hover:bg-primary-light">
            {{ currentIndex === questions.length - 1 ? '제출' : '다음' }}
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const questions = [
  { text: '어떤 업무 환경을 선호하시나요?', type: 'choice', options: ['조용한 환경', '활발한 환경', '유연한 환경'] },
  { text: '가장 자신 있는 역량은 무엇인가요?', type: 'text' },
  { text: '팀 프로젝트 경험이 있나요?', type: 'choice', options: ['있다', '없다'] },
]
const currentIndex = ref(0)
const answers = ref([])
const currentQuestion = computed(() => questions[currentIndex.value])
function goHome() {
  router.push('/')
}
function selectAnswer(opt) {
  answers.value[currentIndex.value] = opt
}
function next() {
  if (currentIndex.value < questions.length - 1) {
    currentIndex.value++
  } else {
    // 답변 저장 및 결과 페이지 이동
    localStorage.setItem('answers', JSON.stringify(answers.value))
    router.push('/result')
  }
}
function prev() {
  if (currentIndex.value > 0) currentIndex.value--
}
</script> 