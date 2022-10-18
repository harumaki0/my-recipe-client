<template>
  <v-container>
    <v-main>
      <v-container>
        <h3>ログイン</h3>
      </v-container>
      <v-container>
        <v-col cols="4">
          <v-text-field
            label="メールアドレス"
            solo
            dense
            hide-details
            v-model="mail_address"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="パスワード"
            solo
            dense
            hide-details
            v-model="password"
            :rules="passRules"
          ></v-text-field>
        </v-col>
        <v-col>
          <p class="red--text">{{ message }}</p>
          <v-btn @click="registration">ログイン</v-btn>
        </v-col>
      </v-container>
    </v-main>
  </v-container>
</template>

<script></script>
