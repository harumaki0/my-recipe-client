<template>
  <v-container>
    <Header />
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-text-field label="料理名" solo dense hide-details></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn>画像選択</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex" cols="4">
            <v-select
              :items="items"
              label="参照サイト"
              dense
              solo
              hide-details
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="5">
            <v-textarea
              solo
              name="input-7-4"
              label="メモ"
              hide-details
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col justify="center">
            <v-btn>登録</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-container>
</template>

<script>
import Header from "@/components/Header";

export default {
  components: {
    Header,
  },
  data: () => ({
    items: ["クラシル", "クックパッド", "Derish kitchen", " YouTube"],
  }),
};
</script>
