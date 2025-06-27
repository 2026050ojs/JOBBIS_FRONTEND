<template>
  <div class="search-container">
    <div class="search-box">
      <div class="search-input-wrapper">
        <input
          v-model="searchQuery"
          @keyup.enter="handleSearch"
          type="text"
          placeholder="직업유형, 회사이름, 지역을 입력하세요 (예: 개발자, 삼성전자, 서울)"
          class="search-input"
        />
        <button @click="handleSearch" class="search-button">
          <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
      
      <div class="search-examples">
        <span class="example-label">검색 예시:</span>
        <button 
          v-for="example in searchExamples" 
          :key="example"
          @click="searchQuery = example"
          class="example-tag"
        >
          {{ example }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const searchExamples = [
  '개발자',
  '마케팅',
  '삼성전자',
  '네이버',
  '서울',
  '부산',
  'IT업계',
  '금융업'
]

const handleSearch = () => {
  if (!searchQuery.value.trim()) return
  
  // 실제 기업 정보 사이트로 이동
  // 여기서는 예시로 잡코리아 검색 페이지로 이동
  const encodedQuery = encodeURIComponent(searchQuery.value)
  const searchUrl = `https://www.jobkorea.co.kr/Search/?stext=${encodedQuery}`
  
  window.open(searchUrl, '_blank')
}
</script>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  padding: 2rem;
}

.search-box {
  width: 100%;
  max-width: 600px;
  text-align: center;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: all 0.3s ease;
}

.search-input-wrapper:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  transform: translateY(-3px);
}

.search-input {
  flex: 1;
  padding: 20px 24px;
  border: none;
  outline: none;
  font-size: 16px;
  background: transparent;
  color: #222;
}

.search-input::placeholder {
  color: #222;
  font-size: 14px;
}

.search-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  padding: 20px 28px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  transform: scale(1.05);
}

.search-icon {
  width: 22px;
  height: 22px;
  color: white;
}

.search-examples {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  align-items: center;
}

.example-label {
  color: #222;
  font-size: 14px;
  margin-right: 12px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.example-tag {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid #888;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 13px;
  color: #222;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  backdrop-filter: blur(10px);
}

.example-tag:hover {
  background: rgba(136, 136, 136, 0.08);
  border-color: #222;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .search-container {
    padding: 1rem;
    min-height: 30vh;
  }
  
  .search-input {
    font-size: 14px;
    padding: 18px 20px;
  }
  
  .search-input::placeholder {
    font-size: 12px;
  }
  
  .search-examples {
    flex-direction: column;
    align-items: center;
  }
  
  .example-label {
    margin-right: 0;
    margin-bottom: 12px;
  }
}
</style> 