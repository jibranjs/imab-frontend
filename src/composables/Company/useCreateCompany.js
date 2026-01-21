import { ref } from "vue";

export function useCreateCompany() {
  const loading = ref(false);
  const error = ref("");
  const token = localStorage.getItem('token');

  const createCompany = async (companyData) => {
    loading.value = true;
    error.value = "";

    try {
      const request = await fetch(
        "https://myimab.vercel.app/company/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(companyData)
        }
      );

     const response = await request.json();

      if (!request.ok) {
        return { success: false, error: response.message || "Failed to create Company"};
      } else {
        return { success: true, error: null };
      }

    } catch (error) {
      return { success: false, error: error.message || "Unknown error" };
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, createCompany };
}
