<template>
  <!-- <Header /> -->
  <v-container>
    <v-col>
      <v-btn>
        <router-link to="/">もどる</router-link>
      </v-btn>
    </v-col>
    <v-col>
      <v-btn>編集</v-btn>
      <v-btn>削除</v-btn>
      <v-btn icon color="red" @click="isActive = !isActive">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-col>
    <h1>{{ recipe.name }}</h1>
    <div v-html="recipe.name"></div>
  </v-container>
</template>

<script>
// import Header from "@/components/Header";
import axiosBase from "axios";

const axios = axiosBase.create({
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  responseType: "json",
});

export default {
  // components: {
  //   Header,
  // },
  data() {
    return {
      recipe: {},
      isActive: "#ffff",
    };
  },
  // computed: {
  //   classColorSet() {
  //     return {
  //       red: this.isActive,
  //     };
  //   },
  // },

  async mounted() {
    const response = await axios.get("/api/recipe/" + this.$route.params.id);
    this.recipe = response.data;
  },
};
</script>

<style>
.red {
  color: red;
}
</style>
