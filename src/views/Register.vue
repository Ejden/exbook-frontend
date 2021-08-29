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
          <span>{{ title }}</span>
        </v-card-title>

        <v-card-text>
          <v-text-field
              label="Imię"
              v-model="form.firstName"
          />

          <v-text-field
              label="Nazwisko"
              v-model="form.lastName"
          />

          <v-text-field
            label="Nazwa użytkownika"
            v-model="form.login"
          />

          <v-text-field
            label="Email"
            v-model="form.email"
          ></v-text-field>

          <v-text-field
              label="Hasło"
              type="password"
              v-model="form.password"
          ></v-text-field>

          <v-text-field
              label="Potwierdź hasło"
              type="password"
              v-model="form.reenteredPassword"
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

<script>
import {mapActions} from 'vuex'

export default {
  name: "Register",
  components: {

  },
  data() {
    return {
      title: 'Formularz rejestracyjny',
      form: {
        firstName: '',
        lastName: '',
        login: '',
        email: '',
        password: '',
        reenteredPassword: ''
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(["register"]),
    async submit() {
      try {
        if (this.form?.password === this.form?.reenteredPassword) {
          await this.register(this.form);
          this.showError = false
        } else {
          console.log('Password validation failed')
        }
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