<script setup>
import CompanySearchBar from '../components/CompanySearchBar.vue'
</script>

<template>
  <main class="home-container">
    <div class="hero-section">
      <h1 class="main-title">기업 정보 검색</h1>
      <p class="subtitle">원하는 직업, 회사, 지역을 검색해보세요</p>
      <CompanySearchBar />
    </div>
  </main>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-section {
  text-align: center;
  color: white;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
}

.main-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .hero-section {
    padding: 1rem;
  }
}
</style>
