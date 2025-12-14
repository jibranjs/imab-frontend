import { ref } from "vue";

export function useAuth() {
  const loading = ref(false);
  const auth = ref("");

  const login = async (username, password) => {
    loading.value = true;
    auth.value = "";

    try {
      const response = await fetch(
        "https://my-flask-9.vercel.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, password })
        }
      );

      auth.value = await response.json();

      if (!response.ok) {
        return { success: false, error: auth.value.message || "Login failed" };
      } else {
        localStorage.setItem("token", auth.value.data.token);
        return { success: true, error: null };
      }

    } catch (error) {
      console.log(error.message);
      return { success: false, error: error.message || "Network error" };
    } finally {
      loading.value = false;
    }
  };
  return { auth, loading, login};
}

