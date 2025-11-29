import { ref } from 'vue';

export function useDeleteEmployee() {
  const loading = ref(false);
  const error = ref('');

  // Delete by username using DELETE method with JSON body
  const deleteEmployee = async (username) => {
    loading.value = true;
    error.value = '';

    try {
      // DELETE to /employee/delete with JSON body { username }
      const url = 'https://my-flask-9.vercel.app/employee/delete';
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        // ignore parse errors
      }

      if (!response.ok) {
        error.value = (data && data.message) || `Failed to delete employee (status ${response.status})`;
        loading.value = false;
        return { success: false, error: error.value };
      }

      loading.value = false;
      return { success: true };
    } catch (err) {
      console.error(err);
      error.value = err.message || 'Unknown error';
      loading.value = false;
      return { success: false, error: error.value };
    }
  };

  return { loading, error, deleteEmployee };
}
