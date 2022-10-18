<template>
  <v-container>
    <v-main>
      <v-container>
        <h3>サインアップ</h3>
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
        <v-col cols="4">
          <v-text-field
            solo
            dense
            hide-details
            v-model="passwordConfirmation"
            :rules="passRules"
            label="パスワード確認"
          ></v-text-field>
        </v-col>
        <v-col>
          <p class="red--text">{{ message }}</p>
          <v-btn @click="registration">登録</v-btn>
        </v-col>
      </v-container>
    </v-main>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      mail_address: "",
      password: "",
      passwordConfirmation: "",
      message: "",
    };
  },
  methods: {
    registration() {
      if (this.password != this.passwordConfirmation) {
        this.message = "※同じパスワードを入力してください。";
      } else if (!this.password || !this.passwordConfirmation) {
        this.message = "※パスワードを入力してください。";
      } else if (
        this.password.length < 8 ||
        this.passwordConfirmation.length < 8
      ) {
        this.message = "※パスワードは8文字以上で入力してください。";
      } else {
        this.message = "";
        console.log("ok");
      }
    },
  },
};
</script>
