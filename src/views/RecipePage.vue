<template>
  <!-- <Header /> -->
  <v-container>
    <Header />
    <v-main>
      <v-col>
        <v-btn>
          <router-link to="/" v-if="!isFavorite">もどる</router-link>
          <router-link to="/favorite" v-if="isFavorite">もどる</router-link>
        </v-btn>
      </v-col>
      <v-col>
        <template>
          <v-btn color="#528fff" @click="selectRecipe(recipe)"> 編集 </v-btn>
        </template>
        <v-dialog v-model="dialog" width="400">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#ff5252" class="ml-3" v-bind="attrs" v-on="on">
              削除
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              このレシピを削除してもよろしいですか？
            </v-card-title>
            <v-card-actions>
              <v-btn color="primary" text @click="clear()"> 削除 </v-btn>
              <v-btn color="primary" text @click="dialog = false">
                キャンセル
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <span @click="changeFavorite()">
          <v-btn icon :class="{ buttoncolor: buttonState }">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </span>
      </v-col>
      <h1>{{ recipe.name }}</h1>
      <img :src="recipe.image" />
      <p>参照サイト：{{ recipe.reference }}</p>
      <p>メモ：{{ recipe.memo }}</p>
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
      id: "",
      isFavorite: false,
      color: "red",
      recipes: [],
    };
  },
  methods: {
    selectRecipe(recipe) {
      // 選択した recipe.id をクエリパラメータとして渡す
      this.$router.push({
        path: `/recipeEdit/${recipe.id}`,
        query: { id: recipe.id },
      });
    },
    async changeFavorite() {
      try {
        this.buttonState = !this.buttonState;
        //更新したfavoriteをDBに送る
        const favorite = this.recipe.favorite == "0" ? "1" : "0";
        // const favorite = this.recipe.favorite == false ? true : false;
        const request = await axios.post("/api/recipe/update", {
          ...this.recipe,
          favorite,
        });
        console.log(this.recipe);
        console.log(request.data);
        this.recipe.favorite = favorite;
      } catch (error) {
        // console.error(error);
      }
    },
    async clear() {
      console.log(this.recipe.name);
      //JSON変換
      const myObj = {
        id: this.recipe.id,
      };
      //レシピ削除
      const myObjStr = JSON.stringify(myObj);
      console.log(myObjStr);
      const response = await axios.post("/api/recipe/delete", myObjStr);
      console.log(response.data);
      this.dialog = false;
    },
  },
  async mounted() {
    console.log(this.$route.path);
    if (this.$route.path.match(/favorite/) !== null) {
      this.isFavorite = true;
    }
    const response = await axios.get("/api/recipe/", {
      params: { id: this.$route.params.id },
    });
    this.recipe = response.data;
    if (this.recipe.favorite == 1) {
      this.buttonState = true;
    }
  },
};
</script>

<style>
.red {
  color: red;
}

.buttoncolor i {
  color: rgb(255, 46, 74) !important;
}

.false {
  color: none;
}
.now {
  color: blue;
}
</style>
