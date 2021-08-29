<template>
  <v-list-item @click="goToCategory" >
    <v-list-item-content>
      <v-list-item-title v-text="name"/>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "Category",
  props: {
    id: String,
    name: String,
    icon: Object
  },
  methods: {
    goToCategory: function () {
      this.$router.push({ name: 'CategoryDetailsView', params: { categoryName: this.name }})
    }
  }
}
</script>
