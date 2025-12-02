import { ref } from "vue";

export function useCreatePayroll() {
  const loading = ref(false);
  const error = ref("");

  const createPayroll = async (payrollData ) => {
    loading.value = true;
    error.value = "";

    try {
      const response = await fetch(
        "https://my-flask-9.vercel.app/payroll/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payrollData)
        }
      );

      await response.json();

      if (!response.ok) {
        error.value = "Failed to create Payroll.";
        loading.value = false;
        return;
      }

    } catch (error) {
      console.log(error);
      error.value = error.message;
      loading.value = false;
      return error.value;
    }

    loading.value = false;
  };

  return { loading, error, createPayroll };
}
