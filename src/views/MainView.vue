<template>
  <div class="min-h-[70vh] flex flex-col items-center justify-start bg-background font-sans dark:bg-gray-900 dark:text-gray-100 relative overflow-hidden pt-0">
    <!-- 검색바 추가 -->
    <div class="w-full flex justify-center mb-8 z-10">
      <CompanySearchBar />
    </div>
    <!-- 물결 애니메이션 오버레이 -->
    <div 
      v-if="showWaveAnimation" 
      class="fixed inset-0 z-50 pointer-events-none"
    >
      <!-- 물결 파도들 -->
      <div class="wave-container">
        <div class="wave wave-1 animate-wave-up-down"></div>
        <div class="wave wave-2 animate-wave-up-down" style="animation-delay: 0.2s;"></div>
        <div class="wave wave-3 animate-wave-up-down" style="animation-delay: 0.4s;"></div>
        <div class="wave wave-4 animate-wave-up-down" style="animation-delay: 0.6s;"></div>
      </div>
      
      <!-- 중앙 텍스트 -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center text-white z-10">
          <h2 class="text-3xl font-bold mb-4 animate-fade-in-up">적성검사 시작</h2>
          <p class="text-lg opacity-90 animate-fade-in-up-delay">잠시만 기다려주세요...</p>
        </div>
      </div>
    </div>

    <div class="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 animate-fade-in">
      <img
        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
        alt="intro"
        class="w-36 h-36 object-cover rounded-xl shadow-lg"
      />
      <div class="flex-1 text-center md:text-left">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 leading-snug">
          나에게 꼭 맞는 기업, <span class="text-blue-600 dark:text-blue-400">JOBBIS</span>에서 찾아보세요!
        </h1>
        <button 
          @click="startTest" 
          class="btn-primary w-full md:w-auto relative overflow-hidden"
          :disabled="isLoading || showWaveAnimation"
        >
          <span class="flex items-center justify-center gap-2 relative z-10">
            <span v-if="!isLoading && !showWaveAnimation">적성검사 시작</span>
            <span v-else-if="isLoading && !showWaveAnimation" class="flex items-center gap-2">
              <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              시작 중...
            </span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CompanySearchBar from '../components/CompanySearchBar.vue'

const router = useRouter()
const isLoading = ref(false)
const showWaveAnimation = ref(false)

function startTest() {
  if (isLoading.value || showWaveAnimation.value) return
  
  isLoading.value = true
  
  // 물결 애니메이션 시작
  setTimeout(() => {
    showWaveAnimation.value = true
    isLoading.value = false
  }, 300)
  
  // 물결 애니메이션 완료 후 페이지 전환 (위로 올라간 후 내려오는 시간 포함)
  setTimeout(() => {
    router.push('/questions')
  }, 4000) // 물결 애니메이션 시간 (위로 올라가는 2초 + 내려오는 2초)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=SUIT:wght@400;700;900&family=Noto+Sans+KR:wght@400;700&display=swap');

.font-sans {
  font-family: 'SUIT', 'Noto Sans KR', 'Pretendard', 'Apple SD Gothic Neo', Arial, sans-serif;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.15);
  transition: background 0.3s, transform 0.2s;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #60a5fa 0%, #1e40af 100%);
  transform: translateY(-2px) scale(1.04);
}

/* 물결 애니메이션 컨테이너 */
.wave-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
}

/* 물결 파도들 */
.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,120 C200,100 400,140 600,120 C800,100 1000,140 1200,120 L1200,0 L0,0 Z' fill='%23ffffff' opacity='0.3'/%3E%3Cpath d='M0,120 C150,80 300,120 450,100 C600,80 750,120 900,100 C1050,80 1200,120 1200,120 L1200,0 L0,0 Z' fill='%23ffffff' opacity='0.5'/%3E%3Cpath d='M0,120 C100,60 200,100 300,80 C400,60 500,100 600,80 C700,60 800,100 900,80 C1000,60 1100,100 1200,80 L1200,0 L0,0 Z' fill='%23ffffff' opacity='0.7'/%3E%3C/svg%3E");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center bottom;
}

.wave-1 {
  opacity: 0.8;
}

.wave-2 {
  opacity: 0.6;
}

.wave-3 {
  opacity: 0.4;
}

.wave-4 {
  opacity: 0.2;
}

/* 텍스트 애니메이션 */
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

.animate-fade-in-up-delay {
  animation: fadeInUp 0.8s ease-out 0.3s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 버튼 호버 시 테두리 애니메이션 */
button::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #3b82f6, #60a5fa, #93c5fd, #3b82f6);
  border-radius: 1rem;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

button:hover::before {
  opacity: 1;
  animation: borderGlow 2s linear infinite;
}

@keyframes borderGlow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 버튼 클릭 시 리플 효과 */
button:active {
  transform: scale(0.95);
}

/* 로딩 상태일 때 버튼 비활성화 */
button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
</style> 