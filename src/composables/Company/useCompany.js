import { ref } from "vue";

export function useCompany() {
  const company = ref([]);
  const loading = ref(false);
  const token = localStorage.getItem('token');

  const fetchCompany = async () => {
    loading.value = true;

    try {
      const request = await fetch(
        "https://myimab.vercel.app/company/all",
        {
          method: "GET",
          type: "application/json",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

     const response =  await request.json();

      if (!request.ok) {
        loading.value = false;
        return { success: false, error: response.message || "Failed to load employees." };
      }else{
        company.value = response
        return { success: true, error: null };
      }

    } catch (error) {
      return { success: false, error: error.message || "Unknown error." };
    } finally {
      loading.value = false;
    }
  };

  return { company, loading, fetchCompany };
}
