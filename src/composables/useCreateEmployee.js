import { ref } from "vue";

export function useCreateEmployee() {
  const loading = ref(false);
  const error = ref("");
  const token = localStorage.getItem('token');

  const createEmployee = async (employeeData) => {
    loading.value = true;
    error.value = "";

    try {
      const request = await fetch(
        "https://my-flask-9.vercel.app/employee/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(employeeData)
        }
      );

     const response = await request.json();

      if (!request.ok) {
        return { success: false, error: response.message };
      } else {
        return { success: true, error: null };
      }

    } catch (error) {
      console.log(error);
      return { success: false, error: error };
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, createEmployee };
}
