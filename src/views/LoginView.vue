<template>
  <v-layout fill-height>
    <v-container
      class="align-self-center"
    >
      <v-card
        class="mx-auto"
        max-width="500"
        elevation="0"
      >
        <v-card-title>
          <span>{{ $t('loginPage.title') }}</span>
        </v-card-title>
        <v-window>
          <v-window-item>
            <v-card-text>
              <v-text-field
                autofocus
                v-model="loginForm.username"
                :label="$t('loginPage.username')"
                autocomplete="username"
                required
              ></v-text-field>
              <v-text-field
                v-model="loginForm.password"
                :label="$t('loginPage.password')"
                autocomplete="current-password"
                required
                type="password"
              ></v-text-field>

              <div class="low-container">
                <span v-if="showErrorMsg" class="unauthorized-msg-text">{{ $t('loginPage.unauthorizedMsg') }}</span>
                <span>
                  <router-link to="password-reset">{{ $t('loginPage.forgotPassword') }}</router-link>
                </span>
              </div>

              <v-layout
                justify-space-between
                align-center
              >
                <v-checkbox
                  v-model="rememberPassword"
                  :label="$t('loginPage.rememberMe')"
                ></v-checkbox>
                <v-btn
                  class="mr-4"
                  color="primary"
                  elevation="0"
                  @click="submit"
                >{{ $t('loginPage.login') }}</v-btn>
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
import { LoginUserForm } from '@/api/UserApi';

export default defineComponent({
  setup(_, { root }) {
    const rememberPassword = ref<boolean>(false);
    const loginForm = ref<LoginUserForm>({
      username: '',
      password: ''
    });
    const showErrorMsg = ref(false);

    const submit = () => root.$store.dispatch('login', loginForm.value)
        .then(() => {
          showErrorMsg.value = false;
          root.$router.push('/');
        })
        .catch(() => showErrorMsg.value = true)

    return {
      rememberPassword,
      loginForm,
      showErrorMsg,
      submit
    }
  }
});
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

.low-container {
  display: flex;
  flex-direction: column;
}

.unauthorized-msg-text {
  color: red;
}
</style>
