<template>
<!--  <div class="login">-->
<!--    <div>-->
<!--      <form @submit.prevent="submit">-->
<!--        <div>-->
<!--          <label for="username">Username:</label>-->
<!--          <input type="text" name="username" id="username" v-model="form.username" autocomplete="username" required>-->
<!--        </div>-->
<!--        <div>-->
<!--          <label for="password">Password:</label>-->
<!--          <input type="password" name="password" id="password" v-model="form.password" autocomplete="current-password" required>-->
<!--        </div>-->
<!--        <button type="submit">Submit</button>-->
<!--      </form>-->
<!--      <p v-if="showError" id="error">Username or Password is incorrect</p>-->
<!--    </div>-->
<!--  </div>-->
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
                :error-messages="nameErrors"
                :rules="nameRules"
                label="Nazwa użytkownika"
                autocomplete="username"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                label="Hasło"
                autocomplete="current-password"
                required
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
                >Zaloguj</v-btn>
              </v-layout>
            </v-card-text>
          </v-window-item>
        </v-window>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "Login",
  components: {

  },
  data() {
    return {
      rememberPassword: false,
      valid: false,
      form: {
        username: '',
        password: ''
      },
      showError: false
    }
  },
  methods: {
    ...mapActions(['login']),
    async submit() {
      const user = {
        login: this.form.username,
        password: this.form.password
      }
      try {
        await this.login(user)
        this.showError = false
      } catch (error) {
        this.showError = true
      }
    }
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

    :hover {
      background-color: #45A049;
    }
  }

  input {
    margin: 5px;
    box-shadow: 0 0 15px 4px rgba(0,0,0,0.06);
    padding: 10px;
    border-radius: 30px;
  }

  #error {
    color: red;
  }
</style>