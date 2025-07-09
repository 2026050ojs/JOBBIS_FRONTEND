<template>
  <div class="backend-status">
    <div class="status-card">
      <h3 class="status-title">백엔드 연결 상태</h3>
      
      <div class="status-indicator">
        <div 
          class="status-dot"
          :class="{ 'connected': isConnected, 'disconnected': !isConnected }"
        ></div>
        <span class="status-text">{{ statusMessage }}</span>
      </div>
      
      <div v-if="isConnected" class="status-details">
        <p class="success-message">✅ {{ statusMessage }}</p>
        <div v-if="backendData" class="data-preview">
          <h4>서버 정보:</h4>
          <pre>{{ JSON.stringify(backendData, null, 2) }}</pre>
        </div>
      </div>
      
      <div v-else class="error-details">
        <p class="error-message">❌ {{ statusMessage }}</p>
        <p v-if="errorDetails" class="error-details-text">{{ errorDetails }}</p>
        <div class="troubleshooting">
          <h4>문제 해결 방법:</h4>
          <ul>
            <li>백엔드 서버가 실행 중인지 확인하세요</li>
            <li>서버 주소가 올바른지 확인하세요 (기본: http://localhost:8080)</li>
            <li>방화벽이나 보안 소프트웨어를 확인하세요</li>
          </ul>
        </div>
      </div>
      
      <button @click="checkConnection" class="check-button" :disabled="isChecking">
        <span v-if="isChecking">확인 중...</span>
        <span v-else>연결 상태 확인</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { checkBackendConnection } from '../services/api.js'

const isConnected = ref(false)
const statusMessage = ref('확인 중...')
const errorDetails = ref('')
const backendData = ref(null)
const isChecking = ref(false)

async function checkConnection() {
  isChecking.value = true
  statusMessage.value = '연결 확인 중...'
  
  try {
    const result = await checkBackendConnection()
    isConnected.value = result.connected
    statusMessage.value = result.message
    errorDetails.value = result.error || ''
    backendData.value = result.data || null
  } catch (error) {
    isConnected.value = false
    statusMessage.value = '연결 확인 중 오류가 발생했습니다.'
    errorDetails.value = error.message
  } finally {
    isChecking.value = false
  }
}

onMounted(() => {
  checkConnection()
})
</script>

<style scoped>
.backend-status {
  padding: 1rem;
}

.status-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.status-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #374151;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.status-dot.connected {
  background-color: #10b981;
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
}

.status-dot.disconnected {
  background-color: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.2);
}

.status-text {
  font-weight: 500;
  color: #374151;
}

.status-details {
  margin-bottom: 1rem;
}

.success-message {
  color: #059669;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.error-message {
  color: #dc2626;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.error-details-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.data-preview {
  background: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
}

.data-preview h4 {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

.data-preview pre {
  font-size: 0.75rem;
  color: #6b7280;
  white-space: pre-wrap;
  word-break: break-all;
}

.troubleshooting {
  background: #fef3c7;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
}

.troubleshooting h4 {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #92400e;
}

.troubleshooting ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  font-size: 0.875rem;
  color: #92400e;
}

.troubleshooting li {
  margin-bottom: 0.25rem;
}

.check-button {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.check-button:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
}

.check-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}
</style> 