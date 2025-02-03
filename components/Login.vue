<template>
  <div class="card-container" color="teal-darken-3">
    <v-card class="login-card" elevation="12">
      <v-row align="center" justify="center" class="mt-2">
        <v-img
          src="assets/img/icon.png"
          max-width="60"
          aspect-ratio="1"
          class="mr-4 logo-img"
        ></v-img>
        <div class="logo-title">Financial App</div>
      </v-row>
      <v-divider class="ma-6" />
      <v-card-title class="d-flex flex-column align-items-center text-center">
        <div class="mt-2 mb-2" elevation="8">Login</div>
      </v-card-title>

      <form @submit.prevent="login">
        <div>
          <v-text-field
            type="email"
            v-model="email"
            id="email"
            label="Email:"
            required
          />
        </div>
        <div>
          <v-text-field
            type="password"
            v-model="password"
            id="password"
            label="Senha:"
            required
          />
        </div>
      </form>
      <v-card-actions class="justify-center">
        <v-btn
          :loading="loading"
          color="teal-darken-3"
          variant="elevated"
          rounded="xl"
          @click="login"
          width="100%"
          >Enter</v-btn
        ></v-card-actions
      >
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const loading = ref(false);
const email = ref("");
const password = ref("");
const router = useRouter();
const { $axios } = useAxios();
const isClient = !import.meta.server;

const login = async () => {
  try {
    loading.value = true;
    const response = await $axios.post("/Auth/login", {
      userEmail: email.value,
      password: password.value,
    });

    if (response.status == 200 && isClient) {
      const token = response.data.token;
      localStorage.setItem("token", token);

      router.push("/DashBoard");
    }
  } catch (error) {
    console.error("Erro no login:", error);
    alert("Credenciais inválidas");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.card-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #00695c;
}

.login-card {
  width: 350px;
  padding: 20px;
  border-radius: 8px;
}

.logo-title {
  font-family: "Vorkurs", sans-serif;
  font-weight: 700;
  font-size: 30px;
}

.login-text {
  font-weight: 400;
}
</style>
