import { ref } from "vue";

export function useCreatePayroll() {
  const loading = ref(false);
  const error = ref("");
  const token = localStorage.getItem('token');

  const createPayroll = async (payrollData ) => {
    loading.value = true;
    error.value = "";

    try {
      const response = await fetch(
        "https://my-flask-9.vercel.app/payroll/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`

          },
          body: JSON.stringify(payrollData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || "Failed to create payroll" };
      } else {
        return { success: true, error: null };
      }

    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
    } finally {
      loading.value = false;
    }
  }

  return { loading, error, createPayroll };
}
