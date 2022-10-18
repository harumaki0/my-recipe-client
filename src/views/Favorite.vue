<template>
  <!-- <Header /> -->
  <v-container>
    <Header />
    <v-main>
      <v-col>
        <v-btn>
          <router-link to="/">もどる</router-link>
        </v-btn>
      </v-col>
      <v-col
            class="ma-10 list"
            cols="4"
            xs="3"
            md="2"
            lg="3"
            xl="3"
            v-for="recipe in recipesDisplay"
            :key="recipe.id"
          >
            <router-link :to="to(recipe)">{{ recipe.name }}</router-link>
            <img :src="recipe.image" />
      </v-col>
    </v-main>
  </v-container>
</template>

<script>
import Header from "@/components/Header";
import axiosBase from "axios";

const axios = axiosBase.create({
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  responseType: "json",
});

export default {
  components: {
    Header,
  },
  data() {
    return {
      recipe: {},
      dialog: false,
      buttonState: false,
      recipes: undefined,
      offset: 0,
      text: "",
      page: 1,
      lists: [],
      displayLists: [],
      pageSize: 10,
    };
  },
  methods: {
    to(recipe) {
      return `/recipe/${recipe.id}`;
    },
  },
  computed: {
    recipesDisplay() {
      const display = [];
      if (!this.recipes) {
        return display;
      }
      for (let i = 0; i < this.recipes.length; ++i) {
        const recipe = this.recipes[i + this.offset];
        if (recipe) {
          display.push(recipe);
        }
      }
      return display;
    },
  },

  async mounted() {
     
    const response = await axios.get("/api/recipe/", {
      params: { page: 1 },
    });
    //  if(this.recipe.favorite == "1"){
    this.recipes = response.data;
    console.log(response);
    //   }
    
  },
};
</script>

