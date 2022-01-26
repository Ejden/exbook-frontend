<template>
  <v-container class="body mt-10 glass rounded">
    <div>
      <h1 class="not-found-text">404</h1>
    </div>

    <div class="message-text">
      <h2>Wygląda na to, że się zgubiłeś...</h2>

      <span>Nie mogliśmy znaleźć żądanej strony</span>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped>
  .body {
    text-align: center;
    height: 50vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .not-found-text {
    font-size: 180pt;
    color: rgba(255, 84, 84, 0.8);
  }

  .message-text {
    font-size: 15pt;
  }
</style>