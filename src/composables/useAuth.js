import { ref } from "vue";

export function useAuth() {
  const loading = ref(false);
  const error = ref("");

  const apiKey = "AIzaSyCJn3h5MELpX5UQS3MlWmWVTCgkp_FfDnk";

  const login = async (email, password) => {
    loading.value = true;
    error.value = "";

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        error.value = data.error?.message || "Login failed.";
        loading.value = false;
        return null;
      }

      // Save token in sessionStorage (your preferred choice)
      sessionStorage.setItem("idToken", data.idToken);
      sessionStorage.setItem("email", data.email);

      loading.value = false;
      return data; // success
    } catch (error) {
      console.log(error);
      error.value = error.message;
      loading.value = false;
      return error.value;
    }
  };

  return { login, loading, error };
}
