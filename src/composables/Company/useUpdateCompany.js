import { ref } from "vue";

export function useUpdateCompany() {
  const loading = ref(false);
  const error = ref("");
  const token = localStorage.getItem('token');

  const updateCompany = async (companyData) => {
    loading.value = true;
    error.value = "";

    try {
      const request = await fetch(
        `https://panlogical-presemilunar-beulah.ngrok-free.dev/company/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(companyData),
        }
      );

     const response = await request.json();
         console.log(companyData)
      if (!request.ok) {
        return { success: false, error: response.message || "Failed to Update Company"};

      } else {
        return { success: true, error: null };
      }

    } catch (error) {
      return { success: false, error: error.message || "Unknown error" };
    } finally {
      loading.value = false;
      console.log(companyData)
    }
  };

  return { loading, error, updateCompany };
}
