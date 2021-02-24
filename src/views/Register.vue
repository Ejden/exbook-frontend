<template>
<!--  <div class="register">-->
<!--    <div>-->
<!--      <form @submit.prevent="submit">-->
<!--        <div class="mb-3">-->
<!--          <label for="username">Username:</label>-->
<!--          <input type="text" name="username" id="username" class="form-control" v-model="form.username">-->
<!--        </div>-->
<!--        <div>-->
<!--          <label for="email">Email:</label>-->
<!--          <input type="email" name="email" id="email" v-model="form.email">-->
<!--        </div>-->
<!--        <div>-->
<!--          <label for="password">Password:</label>-->
<!--          <input type="password" name="password" id="password" v-model="form.password">-->
<!--        </div>-->
<!--      </form>-->
<!--    </div>-->
<!--  </div>-->
  <v-layout fill-height>
  <v-container
    fluid
    class="align-center"
  >
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>{{title}}</span>
      <v-avatar
        color="primary lighten-2"
        class="subheading white--text"
        size="24"
        v-text="registrationStep"
        ></v-avatar>
    </v-card-title>

    <v-window v-model="registrationStep">
      <v-window-item :value="1">
        <v-card-text>
          <v-text-field
            label="Email"
              value=""
            ></v-text-field>
            <span class="caption grey--text text--darken-1">
              Wprowadź adres e-mail pod którym będziemy mogli się z tobą kontaktować!
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-text-field
              label="Hasło"
              type="password"
            ></v-text-field>
            <v-text-field
              label="Potwierdź hasło"
              type="password"
            ></v-text-field>
            <span class="caption grey--text text--darken-1">
              Utwórz hasło dla twojego konta
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <div class="pa-4 text-center">
            <v-img
              class="mb-4"
              contain
              height="128"
              src="https://cdn.vuetifyjs.com/images/logos/v.svg"
            ></v-img>
            <h3 class="title font-weight-light mb-2">
              Witamy w Exbook
            </h3>
            <span class="caption grey--text">
              Dziękujemy za utworzenie konta!
            </span>
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          :disabled="registrationStep ===1"
          text
          @click="registrationStep--"
        >Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="registrationStep === 3"
          color="primary"
          depressed
          @click="registrationStep++"
        >Next</v-btn>
      </v-card-actions>
    </v-card>
    </v-container>
  </v-layout>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "Register",
  components: {

  },
  data() {
    return {
      registrationStep: 1,
      title: 'Formularz rejestracyjny',
      form: {
        username: '',
        email: '',
        password: ''
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(["register"]),
    async submit() {
      try {
        await this.register(this.form);
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
  #error {
    color: red;
  }
</style>