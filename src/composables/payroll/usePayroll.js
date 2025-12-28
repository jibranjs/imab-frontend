import { ref } from "vue";

export function usePayroll() {
  const payroll = ref([]);
  const loading = ref(false);
  const error = ref("");
  const token = localStorage.getItem('token');

  const fetchPayroll = async () => {
    loading.value = true;
    error.value = "";

    try {
      const response = await fetch(
        "https://my-flask-9.vercel.app/payroll/all",
        {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

      const data = await response.json();

      if (!response.ok) {
        error.value = "Failed to fetch payroll";
        loading.value = false;
        return;
      }

      payroll.value = data;

    } catch (err) {
      console.log(err);
      error.value = err.message;
      loading.value = false;
      return error.value;
    } finally {
      loading.value = false;
    }
  };

  return { payroll, loading, error, fetchPayroll };
}
