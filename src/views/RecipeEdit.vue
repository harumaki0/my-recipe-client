<template>
  <v-container>
    <Header />
    <v-main>
      aaa
      <v-container>
        <v-row>
          <v-btn v-bind:to="`/recipe/${recipe.id}`"> もどる </v-btn>

          <v-btn color="#ff5252" @click="updateRecipe(recipe)">更新</v-btn>
        </v-row>

        <v-modal sm v-if="updateCompleted">
          <v-card>
            <v-card-title>更新完了</v-card-title>
            <v-card-text>レシピが更新されました。</v-card-text>
            <v-card-actions>
              <v-btn color="#ff5252" @click="updateCompleted = false"
                >閉じる</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-modal>

        <v-row>
          <!-- <v-col v-for="recipe in recipesDisplay" :key="recipe.id"> -->
          <v-col cols="12" md="6" lg="4">
            <v-text-field
              label="レシピ名"
              v-model="recipe.name"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <img :src="recipe.image" />
          <v-col cols="12" md="6" lg="4">
            <v-text-field
              label="参照サイト"
              v-model="recipe.reference"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" lg="4">
            <v-textarea
              label="メモ"
              outlined
              counter
              maxlength="120"
              v-model="recipe.memo"
            ></v-textarea>
          </v-col>
          <!-- </v-col> -->
        </v-row>
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
      updateCompleted: false,

      recipe: {
        user_id: "",
        name: "",
        reference: "",
        memo: "",
      },
    };
  },
  methods: {
    updateRecipe(recipe) {
      if (!recipe) {
        // recipeオブジェクトが定義されていない場合の処理
      } else {
        // recipeオブジェクトが定義されている場合の処理
        axios
          .post("/api/recipe/update", {
            id: recipe.id,
            name: recipe.name,
            reference: recipe.reference,
            memo: recipe.memo,
            registration_date: recipe.registration_date,
            favorite: recipe.favorite,
          })
          .then(() => {
            // 更新完了時にモーダルを表示
            this.updateCompleted = true;
          })
          .catch(() => {
            // 失敗した場合の処理
          });
      }
    },
  },

  async mounted() {
    console.log(`raaaaa`);

    try {
      // API エンドポイントからレシピの情報を取得
      const response = await axios.get("/api/recipe/edit", {
        params: { id: this.$route.query.id },
      });

      // API へのリクエストとレスポンスをログに出力
      console.log(`request: ${response.request}`);
      console.log(`response: ${response.data}`);

      this.recipe = response.data;

      // 取得したデータをログに出力
      console.log(this.recipe);
    } catch (error) {
      // エラーが発生した場合は、エラー内容をログに出力
      console.error(error);
    }
  },
};
</script>
