import { ref } from 'vue';

export const useDeletePayroll = () => {
  const loading = ref(false);
  const error = ref(null);

  const deletePayroll = async (data) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch('https://my-flask-9.vercel.app/payroll/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          batch: data.batch,
          employee_id: data.employee_id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to delete payroll');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    deletePayroll,
    loading,
    error
  };
};
