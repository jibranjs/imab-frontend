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
        "https://myimab-2dccmz7le-siyabdevs-projects.vercel.app/payroll/all",
        {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Received non-JSON response:', text);
        error.value = `Server error: ${response.status} ${response.statusText}`;
        loading.value = false;
        return;
      }

      if (!response.ok) {
        error.value = "Failed to fetch payroll";
        loading.value = false;
        return;
      }

      payroll.value = data;

    } catch (err) {
      console.error(err);
      error.value = err.message;
      loading.value = false;
      return error.value;
    } finally {
      loading.value = false;
    }
  };

  return { payroll, loading, error, fetchPayroll };
}
