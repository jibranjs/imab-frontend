import router from "@/router";
import { ref } from "vue";

export function useAuth() {
  const loading = ref(false);
  const error = ref("");
  const token = ref("");

  const login = async (username, password) => {
    loading.value = true;
    error.value = "";
    token.value = "";

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

      const getAuth = await response.json();

      if (!response.ok) {
        return { success: false, error: getAuth.message || "Login failed" };
      } else {
        token.value = getAuth.data.token;
        localStorage.setItem("token", token.value);
        router.push("/employees");
        return { success: true, error: false };
      }

    } catch (error) {
      console.log(error.message);
      return { success: false, error: error.message || "Network error" };
    } finally {
      loading.value = false;
    }
  };
  return { loading, error, token, login };
}

