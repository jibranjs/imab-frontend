import { ref } from "vue";

export function useRoaster() {
  const roaster = ref([]);
  const loading = ref(false);
  const error = ref("");

  const fetchRoaster = async () => {
    loading.value = true;
    error.value = "";

    try {
      const token = sessionStorage.getItem("idToken");

      if (!token) {
        error.value = "You are not logged in.";
        loading.value = false;
        return;
      }

      const response = await fetch(
        "https://core-api-pv3ymi55wa-uc.a.run.app/view-roster/roster-data/0/0/2025-11-24/2025-11-24",
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        error.value = "Failed to load employees.";
        loading.value = false;
        return;
      }

      roaster.value = data;

    } catch (error) {
      console.log(error);
      error.value = error.message;
      loading.value = false;
      return error.value;
    }

    loading.value = false;
  };

  return { roaster, loading, error, fetchRoaster };
}
