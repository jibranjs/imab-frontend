import { ref } from 'vue'

export function useSearch() {
  const results = ref([])
  const loading = ref(false)
  const error = ref('')

  // Search for an employee by username
  const searchEmployees = async (username) => {
    loading.value = true
    error.value = ''

    console.log('Searching for employee:', username)

    try {
      const response = await fetch(
        'https://my-flask-9.vercel.app/employee/get',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
       Error(data?.message || 'Search failed')
      }

      if (Array.isArray(data)) {
        results.value = data
      } else if (data && typeof data === 'object') {
        results.value = [data]
      } else {
        results.value = []
      }
    } catch (err) {
      error.value = err.message
      results.value = []
    } finally {
      loading.value = false
    }
  }

  return { results, loading, error, searchEmployees}
}
