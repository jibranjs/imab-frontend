import { ref } from 'vue'

export function useDeleteEmployee() {
  const loading = ref(false)
  const error = ref('')
  const token = localStorage.getItem('token');

  const deleteEmployee = async (username) => {
    loading.value = true
    error.value = ''

    try {
      const response = await fetch('https://my-flask-9.vercel.app/employee/delete', {
        method: 'DELETE',
        headers:
        { 'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
         },
        body: JSON.stringify({ username })
      });

       await response.json()

      if (!response.ok) {
       return { success:false, error: response.error };
      } else {
        return { success: true, error: null };
      }
    } catch (error) {
      return { success:false, error: error.error };
    } finally {
      loading.value = false
    }
  };

  return { loading, error, deleteEmployee }
}
