<template>
  <v-container overflow: hidden>
    <Header />
    <v-main>
      <template>
        <v-app>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
            <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          </v-btn>
          <v-calendar
            :calendar="calendar"
            :events="calendarEvents"
            :height="300"
            :width="600"
          />
        </v-app>
      </template>
    </v-main>
  </v-container>
</template>
<script>
import Header from "@/components/Header";
import axios from "axios";
import { vCalendar } from "vuetify/lib";

export default {
  name: "MyCalendar",
  components: {
    vCalendar,
    Header,
  },
  data() {
    return {
      calendar: new Date(),
      calendarEvents: [],
    };
  },
  
  methods: {
    async getAllRecipes() {
      // レシピデータを取得
      const response = await axios.get("/api/recipe/all");
      let recipes = response.data;

      // レシピデータを日付順に並び替える
      recipes = recipes.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      // レシピデータを元にカレンダーに表示するイベントを作成
      recipes.forEach((recipe) => {
        // レシピの登録日を取得
        const recipeDate = new Date(recipe.registration_date);

        // イベントオブジェクトを作成
        const event = {
          start: recipeDate,
          end: recipeDate,
          name: recipe.name,
        };
        // イベントオブジェクトをカレンダーに表示するための配列に追加
        this.calendarEvents.push(event);
      });
    },
    prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
  },

  mounted() {
    this.getAllRecipes();
    console.log(this.getAllRecipes);
  },
};
</script>
