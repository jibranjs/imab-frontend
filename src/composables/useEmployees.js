import { ref } from "vue";

export function useEmployee() {
  const employee = ref([]);
  const loading = ref(false);
  const token = localStorage.getItem('token');

  const fetchemployees = async () => {
    loading.value = true;

    try {
      const request = await fetch(
        "https://my-flask-9.vercel.app/employee/all",
        {
          method: "GET",
          type: "application/json",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

     const response =  await response.json();

      if (!request.ok) {
        loading.value = false;
        return { success: false, error: response.message || "Failed to load employees." };
      }else{
        return { success: true, error: null };
      }

    } catch (error) {
      return { success: false, error: error.message || "Unknown error." };
    } finally {
      loading.value = false;
    }
  };

  return { employee, loading, fetchemployees };
}
