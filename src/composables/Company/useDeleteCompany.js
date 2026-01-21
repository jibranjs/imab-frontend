import { ref } from "vue";

export function useDeleteCompany() {
  const loading = ref(false);
  const error = ref("");
  const token = localStorage.getItem('token');

  const deleteCompany = async (id) => {
    loading.value = true;
    error.value = "";

    try {
      const request = await fetch(
        `https://myimab.vercel.app/company/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            body: JSON.stringify({
              id: id
              })
          }
        }
      );

     const response = await request.json();

      if (!request.ok) {
        return { success: false, error: response.message || "Failed to delete Company"};
      } else {
        return { success: true, error: null };
      }

    } catch (error) {
      return { success: false, error: error.message || "Unknown error" };
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, deleteCompany };
}
