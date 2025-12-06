import { ref } from 'vue';

export const useUpdatePayroll = () => {
  const loading = ref(false);
  const error = ref(null);

  const updatePayroll = async (data) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch('https://my-flask-9.vercel.app/payroll/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Read response body
      const text = await response.text();

      if (!response.ok) {
        const message = `HTTP ${response.status} - ${text}`;
        error.value = message;
        throw new Error(message);
      }

      return text ? JSON.parse(text) : null;
    } catch (err) {
      error.value = err.message || String(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { updatePayroll, loading, error };
};
