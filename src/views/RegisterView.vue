<template>
  <v-layout fill-height>
    <v-container
      fluid
      class="align-self-center"
    >
      <v-card
        class="mx-auto"
        max-width="500"
      >
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>Formularz rejestracyjny</span>
        </v-card-title>

        <v-card-text>
          <v-text-field
              label="Imię"
              v-model="registerForm.firstName"
          />

          <v-text-field
              label="Nazwisko"
              v-model="registerForm.lastName"
          />

          <v-text-field
            label="Nazwa użytkownika"
            v-model="registerForm.login"
          />

          <v-text-field
            label="Email"
            v-model="registerForm.email"
          ></v-text-field>

          <v-text-field
              label="Hasło"
              type="password"
              v-model="registerForm.password"
          ></v-text-field>

          <v-text-field
              label="Potwierdź hasło"
              type="password"
              v-model="registerForm.reenteredPassword"
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          <v-btn
            @click="submit"
            block
            color="accent"
          >Zarejestruj</v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { RegisterUserForm } from '@/api/UserApi';
import { userModuleStore } from '@/utils/store-accessor';

interface RegisterForm extends RegisterUserForm {
  reenteredPassword: string;
}

export default defineComponent({
  setup() {
    const registerForm = ref<RegisterForm | undefined>({
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      reenteredPassword: ''
    });
    const showError = ref<boolean>(false);
    const submit = () => {
      if (registerForm.value?.password === registerForm.value?.reenteredPassword) {
        userModuleStore.register(registerForm.value as RegisterUserForm)
          .then(() => showError.value = false)
          .catch(() => showError.value = true);
      } else {
        console.log('Password validation failed')
      }
    }

    return {
      registerForm,
      showError,
      submit
    }
  }
})
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  label {
    padding: 12px 12px 12px 0;
    display: inline-block;
  }
  button[type=submit] {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    cursor: pointer;
    border-radius:30px;
  }
  button[type=submit]:hover {
    background-color: #45a049;
  }
  input {
    margin: 5px;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    padding:10px;
    border-radius:30px;
  }
</style>
