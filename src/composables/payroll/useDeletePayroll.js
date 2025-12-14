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
      await response.json();

      if (!response.ok) {
        return { success: false, error: response.error };
      } else {
        return { success: true, error: null };
      }
    } catch (err) {
      console.log(err);
      return { success: false, error: err };
    } finally {
      loading.value = false;
    }
  };

  return { deletePayroll,loading,error};
};
