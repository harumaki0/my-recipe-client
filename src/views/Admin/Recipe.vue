<template>
  <div>
    ブログ編集
    <div>
      <button>新規</button>
      <table>
        <tr v-for="recipe in recipesDisplay" :key="recipe.id">
          <td>
            <router-link :to="to(recipe)">{{ recipe.name }}</router-link>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
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
  data() {
    return {
      recipes: undefined,
      offset: 0,
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
      return `/admin/recipe/${recipe.id}`;
    },
  },
  async mounted() {
    const response = await axios.get("/api/");
    this.recipes = response.data;
  },
};
</script>

<style scoped></style>
