import { ref } from "vue";

export function useEmployeeShort() {
  const employeeShort = ref([]);
  const loading = ref(false);

  const token = localStorage.getItem('token');

  const fetchEmployeesShort = async () => {
    loading.value = true;
    employeeShort.value = [];

    try {
      const response = await fetch(
        "https://my-flask-9.vercel.app/employee/short",
        {
          method: "GET",
          type: "application/json",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      employeeShort.value = await response.json();

      if (!response.ok) {
        loading.value = false;
        return { success: false, error: employeeShort.value.message || "Failed to load employees short." };
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

  return { employeeShort, loading, fetchEmployeesShort };
}
