import { ref } from 'vue';

export const useDeletePayroll = () => {
  const loading = ref(false);
  const error = ref(null);
  const token = localStorage.getItem('token');

  const deletePayroll = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch('https://myimab-2dccmz7le-siyabdevs-projects.vercel.app/payroll/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          batch: data.batch,
          employee_id: data.employee_id
        })
      });
      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || data.message || "Failed to delete payroll" };
      } else {
        return { success: true, error: null };
      }
    } catch (err) {
      console.log(err);
      return { success: false, error: err.message || "Unknown error" };
    } finally {
      loading.value = false;
    }
  };

  return { deletePayroll,loading,error};
};
