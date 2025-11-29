import { ref } from "vue";

export function useEmployee() {
  const employee = ref([]);
  const loading = ref(false);
  const error = ref("");

  const fetchemployees = async () => {
    loading.value = true;
    error.value = "";

    try {
      const response = await fetch(
        "https://my-flask-9.vercel.app/employee/all",
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

      employee.value = data;

    } catch (error) {
      console.log(error);
      error.value = error.message;
      loading.value = false;
      return error.value;
    }

    loading.value = false;
  };

  return { employee, loading, error, fetchemployees };
}
