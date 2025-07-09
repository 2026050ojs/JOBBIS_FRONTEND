<template>
  <div class="min-h-[80vh] flex items-center justify-center bg-background font-sans dark:bg-gray-900 dark:text-gray-100">
    <div class="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 animate-fade-in">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          JOBBIS 백엔드 연결 상태
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          백엔드 서버와의 연결 상태를 확인하고 관리합니다.
        </p>
      </div>
      
      <BackendStatus />
      
      <div class="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          연결 정보
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span class="font-medium text-gray-600 dark:text-gray-400">프론트엔드 URL:</span>
            <span class="ml-2 text-gray-800 dark:text-gray-200">http://localhost:5173</span>
          </div>
          <div>
            <span class="font-medium text-gray-600 dark:text-gray-400">백엔드 URL:</span>
            <span class="ml-2 text-gray-800 dark:text-gray-200">http://localhost:9910</span>
          </div>
          <div>
            <span class="font-medium text-gray-600 dark:text-gray-400">프록시 설정:</span>
            <span class="ml-2 text-gray-800 dark:text-gray-200">/api → http://localhost:9910</span>
          </div>
          <div>
            <span class="font-medium text-gray-600 dark:text-gray-400">데이터베이스:</span>
            <span class="ml-2 text-gray-800 dark:text-gray-200">MySQL 8.0.41</span>
          </div>
        </div>
      </div>
      
      <div class="mt-6 flex justify-center">
        <button @click="goHome" class="btn-primary">
          홈으로 돌아가기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BackendStatus from '../components/BackendStatus.vue'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<style scoped>
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}
</style> 