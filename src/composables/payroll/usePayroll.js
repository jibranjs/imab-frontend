import { ref } from "vue";

export function usePayroll() {
  const payroll = ref([]);
  const loading = ref(false);
  const error = ref("");

  const fetchPayroll = async () => {
    loading.value = true;
    error.value = "";

    try {
      const response = await fetch(
        "https://my-flask-9.vercel.app/payroll/all",
        {
          method: "GET",
          type: "application/json"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        error.value = "Failed to load employees.";
        loading.value = false;
        return;
      }

      // Ensure payroll.value is always an array
      payroll.value = Array.isArray(data) ? data : [];

    } catch (error) {
      console.log(error);
      error.value = error.message;
      loading.value = false;
      return error.value;
    }

    loading.value = false;
  };

  return { payroll, loading, error, fetchPayroll };
}
