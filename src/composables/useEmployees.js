import { ref } from "vue";

export function useEmployee() {
  const employee = ref([]);
  const loading = ref(false);

  const token = localStorage.getItem('token');

  const fetchemployees = async () => {
    loading.value = true;
    employee.value = [];

    try {
      const response = await fetch(
        "https://my-flask-9.vercel.app/employee/all",
        {
          method: "GET",
          type: "application/json",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      employee.value = await response.json();

      if (!response.ok) {
        loading.value = false;
        return { success: false, error: employee.value.message || "Failed to load employees." };
      }else{
        return { success: true, error: null };
      }

    } catch (error) {
      console.log(error);
      return { success: false, error: error.message || "Unknown error." };
    } finally {
      loading.value = false;
    }
  };

  return { employee, loading, fetchemployees };
}
