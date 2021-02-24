<template>
  <div class="login">
    <div>
      <form @submit.prevent="submit">
        <div>
          <label for="username">Username:</label>
          <input type="text" name="username" id="username" v-model="form.username" autocomplete="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" name="password" id="password" v-model="form.password" autocomplete="current-password" required>
        </div>
        <button type="submit">Submit</button>
      </form>
      <p v-if="showError" id="error">Username or Password is incorrect</p>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "Login",
  components: {

  },
  data() {
    return {
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