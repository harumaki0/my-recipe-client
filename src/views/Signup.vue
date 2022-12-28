<template>
  <v-container>
    <v-main>
      <v-container>
        <v-col>
          <h3>サインアップ</h3>
        </v-col>
        <v-col>
          すでにアカウントをお持ちの方は<router-link to="/login">
            <a>こちら </a></router-link
          >からログインしてください。
        </v-col>
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
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            solo
            dense
            hide-details
            v-model="passwordConfirmation"
            label="パスワード確認"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show2 ? 'text' : 'password'"
            name="input-10-1"
            counter
            @click:append="show2 = !show2"
          ></v-text-field>
        </v-col>
        <template>
          <p class="red--text">{{ message }}</p>
          <v-btn color="#ff5252" @click="registration"> 登録 </v-btn>
        </template>

        <v-card v-if="isModal" elevation="7" max-width="344" class="card">
          <v-card-title class="modal"> 登録が完了しました。</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="isModal = false">
              閉じる
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-dialog v-model="showModal" persistent max-width="300px">
          <v-card>
            <v-card-title>{{ errorMessage }}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="showModal = false">閉じる</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-container>
</template>

<script>
import axiosBase from "axios";

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
      valid: false,
      mail_address: "",
      password: "",
      passwordConfirmation: "",
      message: "",
      isModal: false,
      show1: false,
      show2: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
      errorMessage: false,
      showModal: false,
    };
  },
  methods: {
    async registration() {
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

        const myObj = {
          mail_address: this.mail_address,
          password: this.password,
        };
        const myObjStr = JSON.stringify(myObj);

        try {
          const response = await axios.post("/api/user/signup", myObjStr);

          if (response.data.message) {
            this.message = response.data.message;
          } else {
            this.isModal = true;
          }
        } catch (error) {
          this.errorMessage = "サーバーエラーが発生しました。";
          this.showModal = true; // モーダルを表示する
        }
      }
    },
  },
};
</script>

<style>
.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
