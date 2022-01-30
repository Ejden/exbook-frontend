<template>
  <v-layout fill-height>
    <v-container
      class="align-self-center"
    >
      <v-card
        class="mx-auto"
        max-width="500"
      >
        <v-card-title>
          <span>Zaloguj się</span>
        </v-card-title>
        <v-window>
          <v-window-item>
            <v-card-text>
              <v-text-field
                autofocus
                v-model="loginForm.username"
                label="Nazwa użytkownika"
                autocomplete="username"
                required
              ></v-text-field>
              <v-text-field
                v-model="loginForm.password"
                label="Hasło"
                autocomplete="current-password"
                required
                type="password"
              ></v-text-field>
              <span>
                <router-link to="password-reset">Zapomniałeś hasła?</router-link>
              </span>
              <v-layout
                justify-space-between
                align-center
              >
                <v-checkbox
                  v-model="rememberPassword"
                  label="Zapamiętaj mnie"
                ></v-checkbox>
                <v-btn
                  class="mr-4"
                  @click="submit"
                >Zaloguj</v-btn>
              </v-layout>
            </v-card-text>
          </v-window-item>
        </v-window>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { userModuleStore } from '@/utils/store-accessor';
import { LoginUserForm } from '@/api/UserApi';

export default defineComponent({
  setup(_, { root }) {
    const rememberPassword = ref<boolean>(false);
    const loginForm = ref<LoginUserForm>({
      username: '',
      password: ''
    });

    const submit = () => userModuleStore.login(loginForm.value)
      .then(() => root.$router.push('/'));

    return {
      rememberPassword,
      loginForm,
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
    background-color: #45A049;
  }

  input {
    margin: 5px;
    box-shadow: 0 0 15px 4px rgba(0,0,0,0.06);
    padding: 10px;
    border-radius: 30px;
  }
</style>
