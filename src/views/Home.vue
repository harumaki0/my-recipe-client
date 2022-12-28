<template>
  <v-container>
    <Header />
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="7" xs="4" md="4" lg="4" xl="4">
            <v-text-field
              label="料理名検索"
              placeholder="ハンバーグ"
              outlined
              dense
              v-model="text"
            ></v-text-field>
            <v-btn color="#ff5252" @click="submitClick">検索</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="ma-10 list title"
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
        </v-row>
        <template>
          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="pagenationLength"
              @input="getPage"
            ></v-pagination>
          </div>
        </template>
      </v-container>
    </v-main>
    <Footer />
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
      recipes: undefined,
      offset: 0,
      text: "",
      page: 1,
      lists: [],
      displayLists: [],
      pageSize: 10,
      pagenationLength: 0,
    };
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
  methods: {
    to(recipe) {
      return `/recipe/${recipe.id}`;
    },
    async getPage(number) {
      console.log(number);
      const response = await axios.get("/api/recipe/list", {
        params: { page: number, user_id: this.$cookie.get("user_id") },
      });
      this.recipes = response.data.recipes;
      console.log(response);
    },
    async submitClick(event) {
      if (this.text == "") {
        //何もしない
      } else {
        console.log("false");
        event.preventDefault();
        const response = await axios.get("/api/recipe/list", {
          params: { page: 1 },
        });
        // console.log(this.text);
        // console.log(response.data);
        this.recipes = response.data.recipes.filter((data) => {
          // return this.text.match(data.name);
          return data.name.indexOf(this.text) > -1;
        });
        // console.log(this.recipes);
      }
    },
  },
  async mounted() {
    const response = await axios.get("/api/recipe/list", {
      params: { page: 1, user_id: this.$cookie.get("user_id") },
    });
    this.recipes = response.data.recipes;
    const count = response.data.count;
    this.pagenationLength = Math.ceil(count / 6);
    console.log(response);
  },
};
</script>

<style>
/* .theme--light.v-btn {
  color: #fff;
} */

img {
  position: relative;
  max-height: 200px;
}

.title a {
  font-weight: bold;
}

.list {
  position: relative;
  left: -5vw;
}
</style>
