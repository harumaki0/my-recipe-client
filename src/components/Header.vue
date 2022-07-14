<template>
  <v-app-bar absolute color="#FF9600" dark app>
    <template v-slot:img="{ props }">
      <v-img v-bind="props"></v-img>
    </template>

    <v-app-bar-title><h2>My recipe</h2></v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <router-link class="link" to="/favorite">
        <v-icon>mdi-heart</v-icon>
      </router-link>
    </v-btn>

    <v-label><router-link to="/login">ログアウト</router-link></v-label>

    <template v-slot:extension>
      <v-tabs align-with-title>
        <v-tab to="/">一覧</v-tab>
        <v-tab to="/recipe">登録</v-tab>
        <v-tab to="/calendar">カレンダー</v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>
<style>
.link {
  text-decoration: none;
}

.v-application a {
  color: #ffffff !important;
}
</style>
