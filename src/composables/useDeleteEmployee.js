import { ref } from 'vue'

export function useDeleteEmployee() {
  const loading = ref(false)
  const error = ref('')
  const token = localStorage.getItem('token');

  const deleteEmployee = async (username) => {
    loading.value = true
    error.value = ''

    try {
      const request = await fetch('https://my-flask-9.vercel.app/employee/delete', {
        method: 'DELETE',
        headers:
        { 'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
         },
        body: JSON.stringify({ username })
      });

      const response = await request.json()

      if (!request.ok) {
       return { success:false, error: response.message };
      } else {
        return { success: true, error: null };
      }
    } catch (error) {
      return { success:false, error: error.message || "Failed to delete employee" };
    } finally {
      loading.value = false
    }
  };

  return { loading, error, deleteEmployee }
}
