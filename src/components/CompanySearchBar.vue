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
        <span class="example-label">최근 검색:</span>
        <template v-if="recentSearches.length > 0">
          <span v-for="(item, idx) in recentSearches" :key="item" class="recent-tag-wrapper">
            <button @click="searchQuery = item" class="example-tag">{{ item }}</button>
            <button @click="removeSearch(idx)" class="remove-tag" aria-label="삭제">
              ×
            </button>
          </span>
        </template>
        <template v-else>
          <span class="no-history">검색 기록이 없습니다.</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const searchQuery = ref('')
const recentSearches = ref([])
const STORAGE_KEY = 'jobbis_recent_searches'

// 기록 불러오기
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      recentSearches.value = JSON.parse(saved)
    } catch {}
  }
})

// 기록 저장
watch(recentSearches, (val) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
}, { deep: true })

const handleSearch = () => {
  const query = searchQuery.value.trim()
  if (!query) return

  // 기록에 추가 (중복 제거, 최신순)
  recentSearches.value = [query, ...recentSearches.value.filter(item => item !== query)].slice(0, 10)

  // 실제 기업 정보 사이트로 이동
  const encodedQuery = encodeURIComponent(query)
  const searchUrl = `https://www.jobkorea.co.kr/Search/?stext=${encodedQuery}`
  window.open(searchUrl, '_blank')
}

const removeSearch = (idx) => {
  recentSearches.value.splice(idx, 1)
}
</script>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20vh;
  padding: 2rem;
}

.search-box {
  width: 100%;
  max-width: 800px;
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
  min-width: 600px;
  padding: 20px 24px;
  border: none;
  outline: none;
  font-size: 16px;
  background: transparent;
  color: #222;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}

.search-input::placeholder {
  color: #222;
  font-size: 14px;
}

.search-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-left: 4px solid #667eea;
  padding: 20px 28px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
}

.search-button:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  border-left: 4px solid #5a6fd8;
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

.recent-tag-wrapper {
  display: inline-flex;
  align-items: center;
  margin-right: 6px;
  margin-bottom: 6px;
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

.remove-tag {
  background: transparent;
  border: none;
  color: #888;
  font-size: 18px;
  margin-left: 2px;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
  transition: color 0.2s;
}
.remove-tag:hover {
  color: #e53e3e;
}

.no-history {
  color: #aaa;
  font-size: 13px;
  margin-left: 8px;
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