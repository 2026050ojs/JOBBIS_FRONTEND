<template>
  <div class="flex items-center gap-3">
    <!-- 라이트모드 아이콘 -->
    <svg 
      class="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors duration-200" 
      fill="currentColor" 
      viewBox="0 0 20 20"
    >
      <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
    </svg>
    
    <!-- 스위치 버튼 -->
    <button 
      @click="toggleTheme"
      class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      :class="theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'"
      role="switch"
      :aria-checked="theme === 'dark'"
    >
      <!-- 스위치 핸들 -->
      <span 
        class="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300"
        :class="theme === 'dark' ? 'translate-x-6' : 'translate-x-1'"
      >
        <!-- 다크모드일 때 달 아이콘 -->
        <svg 
          v-if="theme === 'dark'"
          class="h-3 w-3 text-blue-600 ml-0.5 mt-0.5" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
        <!-- 라이트모드일 때 태양 아이콘 -->
        <svg 
          v-else
          class="h-3 w-3 text-gray-400 ml-0.5 mt-0.5" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
        </svg>
      </span>
    </button>
    
    <!-- 다크모드 아이콘 -->
    <svg 
      class="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors duration-200" 
      fill="currentColor" 
      viewBox="0 0 20 20"
    >
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const theme = ref('light')

function toggleTheme() {
  const newTheme = theme.value === 'light' ? 'dark' : 'light'
  setTheme(newTheme)
}

function setTheme(val) {
  theme.value = val
  if (val === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('theme', val)
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) {
    setTheme(saved)
  } else {
    // 기본값 설정 (시스템 설정 확인)
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
})
</script>

<style scoped>
/* 스위치 호버 효과 */
button:hover {
  transform: scale(1.05);
}

/* 스위치 클릭 효과 */
button:active {
  transform: scale(0.95);
}

/* 접근성 개선 */
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style> 