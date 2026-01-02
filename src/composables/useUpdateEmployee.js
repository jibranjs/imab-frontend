import { ref } from "vue";

export function useUpdateEmployee() {
  const loading = ref(false);
  const error = ref("");
  const token = localStorage.getItem('token');

  const updateEmployee = async (employeeData) => {
    loading.value = true;
    error.value = "";

    try {
      const request = await fetch(
        "https://my-flask-9.vercel.app/employee/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(employeeData)
        }
      );

      const response = await request.json();

      if (!request.ok) {
        return { success: false, error: response.error };
      } else {
        return { success: true, error: null };
      }

    } catch (error) {
      return { success: false, error: error.message || "Failed to update employee" };
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, updateEmployee };
}
