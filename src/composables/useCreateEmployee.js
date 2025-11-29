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
        error.value = "Failed to create employee.";
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

  return { loading, error, createEmployee };
}
