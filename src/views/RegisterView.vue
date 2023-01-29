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
              :rules="[rules.required]"
          />

          <v-text-field
              :label="$t('registerPage.lastname')"
              v-model="registerForm.lastName"
              :rules="[rules.required]"
          />

          <v-text-field
              :label="$t('registerPage.username')"
              v-model="registerForm.username"
              :rules="[rules.required]"
          />

          <v-text-field
              :label="$t('registerPage.email')"
              v-model="registerForm.email"
              :rules="[rules.required]"
          ></v-text-field>

          <v-text-field
              :label="$t('registerPage.password')"
              type="password"
              v-model="registerForm.password"
              :rules="[rules.required]"
          ></v-text-field>

          <v-text-field
              :label="$t('registerPage.confirmPassword')"
              type="password"
              v-model="registerForm.reenteredPassword"
              :rules="[rules.required]"
          ></v-text-field>

          <span
              v-if="showError"
              class="error-msg"
          >Nie udało się utworzyć konta. Sprawdź poprawność pól.</span>
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
import { i18n } from '@/main';

interface RegisterForm extends RegisterUserForm {
  reenteredPassword: string;
}

interface Rules {
  required: any;
  counter: any;
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
    const rules = ref<Rules>({
      required: (value: string) => !!value || i18n.t('newOfferForm.required'),
      counter: (value: string, max: number) => {
        if (value == null) return true;
        return value.length <= max || 'Max ' + max + ' characters';
      }
    });
    const showError = ref<boolean>(false);
    const formCorrect = (): boolean => {
      if (registerForm.value?.email.trim() == '') return false;
      if (registerForm.value?.username.trim() == '') return false;
      if (registerForm.value?.firstName.trim() == '') return false;
      if (registerForm.value?.lastName.trim() == '') return false;
      if (registerForm.value?.password.trim() == '') return false;
      if (registerForm.value?.reenteredPassword.trim() == '') return false;
      return true;
    };
    const submit = () => {
      if (formCorrect()) {
        root.$store.dispatch('register', registerForm.value as RegisterUserForm)
            .then(() => {
              showError.value = false;
              router.push({ name: 'AccountRegisterComplete' });
            })
            .catch(() => showError.value = true);
      } else {
        showError.value = true;
      }
    }

    return {
      registerForm,
      showError,
      submit,
      rules
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
