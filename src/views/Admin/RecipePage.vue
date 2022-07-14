<template>
  <div>
    <h1>{{ recipe.name }}</h1>
    <vue-html-editor v-model="recipe.name"></vue-html-editor>
  </div>
</template>

<script>
import axiosBase from "axios";
import vueHtmlEditor from "vue-html-editor";
const axios = axiosBase.create({
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  responseType: "json",
});

export default {
  components: {
    vueHtmlEditor,
  },
  data() {
    return {
      recipe: {},
    };
  },
  async mounted() {
    const response = await axios.get("/api/recipe/" + this.$route.params.id);
    this.recipe = response.data;
  },
};
</script>
