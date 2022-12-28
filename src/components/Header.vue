<template>
  <v-app-bar absolute color="#ADD8E6" dark app>
    <template v-slot:img="{ props }">
      <v-img v-bind="props"></v-img>
    </template>
    <v-app-bar-title><h2>My recipe</h2></v-app-bar-title>
    <v-spacer></v-spacer>
    <v-col sm="1" class="text">
      <v-btn icon style="white-space: nowrap">
        <router-link class="link" to="/favorite">
          <v-icon>mdi-heart</v-icon>
        </router-link>
      </v-btn>
    </v-col>

    <v-col sm="1" class="text">
      <v-label
        style="white-space: nowrap; overflow-wrap: break-word; max-width: 100%"
      >
        <router-link to="/login">ログイン</router-link>
      </v-label>
    </v-col>

    <v-col sm="2" class="text">
      <v-label><router-link to="/signup">サインアップ</router-link></v-label>
    </v-col>

    <template v-slot:extension>
      <v-tabs class="text" align-with-title>
        <v-tab to="/">一覧</v-tab>
        <v-tab to="/recipe">新規登録</v-tab>
        <v-tab to="/calendar">登録日</v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<style scoped>
.text a {
  color: #808080;
  text-decoration: none;
}

.v-app-bar .v-btn .v-icon {
  color: #808080;
}
.v-btn a {
  text-decoration: none;
}
</style>
