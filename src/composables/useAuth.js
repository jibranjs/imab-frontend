import router from "@/router";
import { ref } from "vue";

export function useAuth() {
  const loading = ref(false);
  const error = ref("");

  const login = async (username, password) => {
    loading.value = true;
    error.value = "";

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

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || "Login failed" };
      } else {
        localStorage.setItem("token", data.token);
        router.push("/employees");
        return { success: true, token: data.token };
      }

    } catch (error) {
      console.log(error.message);
      return { success: false, error: error.message || "Network error" };
    } finally {
      loading.value = false;
    }
  };
  return { loading, error, login };
}

