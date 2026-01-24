import { ref } from 'vue';

export const useUpdatePayroll = () => {
  const loading = ref(false);
  const error = ref(null);
  const token = localStorage.getItem('token');

  const updatePayroll = async (payrollData) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch('https://myimab.vercel.app/payroll/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({payrollData}),
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
