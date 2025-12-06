import { ref } from "vue";

export function useCreateEmployee() {
  const loading = ref(false);
  const error = ref("");
  const createEmployee = async (employeeData) => {
    loading.value = true;
    error.value = "";

    try {
      const response = await fetch(
        "https://my-flask-9.vercel.app/employee/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(employeeData)
        }
      );

      await response.json();

      if (!response.ok) {
        return { success: false, error: response.error };
      } else {
        return { success: true, error: null };
      }

    } catch (error) {
      console.log(error);
      return { success: false, error: error.error };
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, createEmployee };
}
