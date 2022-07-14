<template>
  <v-container>
    <Header />
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-text-field
              label="料理名検索"
              placeholder="ハンバーグ"
              outlined
              dense
              v-model="text"
            ></v-text-field>
            <v-btn @click="submitClick">検索</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <table>
            <!-- <div id="app">
              {{ info }}
            </div> -->
            <tr v-for="recipe in recipesDisplay" :key="recipe.id">
              <td>
                <router-link :to="to(recipe)">{{ recipe.name }}</router-link>
              </td>
            </tr>
          </table>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-container>
</template>
<script>
import Header from "@/components/Header";
import axiosBase from "axios";

const PAGE_SIZE = 5;
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
      // info: null,
    };
  },
  computed: {
    recipesDisplay() {
      const display = [];
      if (!this.recipes) {
        return display;
      }
      for (let i = 0; i < PAGE_SIZE; ++i) {
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
    async submitClick(event) {
      event.preventDefault();
      const response = await axios.get("/api/");
      console.log(response.data);
      this.recipes = response.data.filter((data) => {
        return this.text.match(data.name);
      });
    },
  },
  async mounted() {
    // await axios.get("/api/").then((response) => (this.info = response));
    // console.log(this.data);

    const response = await axios.get("/api/");
    this.recipes = response.data.name((a, b) => {
      console.log(a.name, b.name);
      if (a.name < b.name) {
        return;
      }
    });
  },
};
</script>

<style>
.title h1 {
  font-size: 48px;
  color: #192e46;
}
</style>
