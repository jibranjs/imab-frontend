import { ref } from "vue";

export function useUpdateEmployee() {
  const loading = ref(false);
  const error = ref("");

  const updateEmployee = async (employeeData) => {
    loading.value = true;
    error.value = "";

    try {
      const response = await fetch(
        "https://my-flask-9.vercel.app/employee/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(employeeData)
        }
      );

      await response.json();

      if (!response.ok) {
        error.value = "Failed to update employee.";
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

  return { loading, error, updateEmployee };
}
