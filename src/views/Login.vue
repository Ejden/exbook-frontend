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
                v-model="form.username"
                label="Nazwa użytkownika"
                autocomplete="username"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.password"
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
import { Component, Vue } from 'vue-property-decorator';
// eslint-disable-next-line no-unused-vars
import { LoginUserForm } from "@/api/UserApi";
import { UserModule } from "@/store/modules/user-store/user-store";

interface LoginForm {
  username: string;
  password: string;
}

@Component
export default class Login extends Vue {
  private rememberPassword: boolean = false;
  private form: LoginForm = {
    username: '',
    password: ''
  }
  private showError: boolean = false;

  submit() {
    UserModule.login(this.form as LoginUserForm)
      .then(() => {
        this.showError = false;
        this.$router.push('/');
      })
      .catch(() => this.showError = true);
  }
}
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  label {
    padding: 12px 12px 12px 0px;
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