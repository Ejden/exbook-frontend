<template>
  <v-layout fill-height>
    <v-container
        fluid
        class="align-self-center"
    >
      <v-card
          class="mx-auto"
          max-width="500"
          elevation="0"
      >
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>{{ $t('registerPage.title') }}</span>
        </v-card-title>

        <v-card-text>
          <v-text-field
              :label="$t('registerPage.firstname')"
              v-model="registerForm.firstName"
          />

          <v-text-field
              :label="$t('registerPage.lastname')"
              v-model="registerForm.lastName"
          />

          <v-text-field
              :label="$t('registerPage.username')"
              v-model="registerForm.username"
          />

          <v-text-field
              :label="$t('registerPage.email')"
              v-model="registerForm.email"
          ></v-text-field>

          <v-text-field
              :label="$t('registerPage.password')"
              type="password"
              v-model="registerForm.password"
          ></v-text-field>

          <v-text-field
              :label="$t('registerPage.confirmPassword')"
              type="password"
              v-model="registerForm.reenteredPassword"
          ></v-text-field>

          <span
              v-if="showError"
              class="error-msg"
          >Nie udało się utworzyć konta. Pamiętaj aby użyć złożonego hasła.</span>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          <v-btn
              @click="submit"
              block
              elevation="0"
              color="primary"
          >{{ $t('registerPage.register') }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { RegisterUserForm } from '@/api/UserApi';
import router from '@/router';

interface RegisterForm extends RegisterUserForm {
  reenteredPassword: string;
}

export default defineComponent({
  setup(_, { root }) {
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
        root.$store.dispatch('register', registerForm.value as RegisterUserForm)
            .then(() => showError.value = false)
            .then(() => router.push({ name: 'AccountRegisterComplete' }))
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
  border-radius: 30px;
}

button[type=submit]:hover {
  background-color: #45a049;
}

input {
  margin: 5px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  padding: 10px;
  border-radius: 30px;
}

.error-msg {
  color: red;
}
</style>
