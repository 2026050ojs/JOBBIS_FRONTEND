// 백엔드 API 연결 서비스
const API_BASE_URL = '/api'

// API 요청 헬퍼 함수
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API 요청 실패:', error)
    throw error
  }
}

// 백엔드 연결 상태 확인
export async function checkBackendConnection() {
  try {
    const response = await apiRequest('/api/info')
    return {
      connected: true,
      message: '백엔드 서버에 성공적으로 연결되었습니다.',
      data: response
    }
  } catch (error) {
    return {
      connected: false,
      message: '백엔드 서버에 연결할 수 없습니다.',
      error: error.message
    }
  }
}

// 회사 정보 조회
export async function getCompanies() {
  return await apiRequest('/companies')
}

// 회사 검색
export async function searchCompanies(query) {
  return await apiRequest(`/companies/search?q=${encodeURIComponent(query)}`)
}

// 사용자 정보 저장
export async function saveUser(userData) {
  return await apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  })
}

// 검사 결과 저장
export async function saveTestResult(resultData) {
  return await apiRequest('/test-results', {
    method: 'POST',
    body: JSON.stringify(resultData)
  })
}

// 검사 결과 조회
export async function getTestResults(userId) {
  return await apiRequest(`/test-results/${userId}`)
} 