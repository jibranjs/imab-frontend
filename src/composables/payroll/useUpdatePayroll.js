import { ref } from 'vue';

export const useUpdatePayroll = () => {
  const loading = ref(false);
  const error = ref(null);

  const updatePayroll = async (data) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch('https://panlogical-presemilunar-beulah.ngrok-free.dev/payroll/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      await response.json();

      if (!response.ok) {
        return { success: false, error: response.error?.message || 'Failed to update payroll' };
      } else {
        return { success: true, error: null };
      }
    } catch (err) {
      return { success: false, error: err.message || 'Network error' };
    } finally {
      loading.value = false;
    }
  };
  return { updatePayroll, loading, error };
};
