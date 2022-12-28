<template>
  <v-container>
    <v-main>
      <v-container>
        <h3>ログイン</h3>
      </v-container>
      <v-col>
        <router-link to="/signup">サインアップ</router-link>
      </v-col>
      <v-container>
        <v-col cols="4">
          <v-text-field
            label="メールアドレス"
            solo
            dense
            hide-details
            v-model="mailAddress"
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
        <v-col>
          <p class="red--text">{{ message }}</p>
          <v-btn color="#ff5252" @click="sendClick()">ログイン</v-btn>
        </v-col>
        <v-col>
          <v-dialog v-model="showModal" persistent max-width="300px">
            <v-card>
              <v-card-title>{{ errorMessage }}</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="showModal = false">閉じる</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
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
  data: () => ({
    mailAddress: "",
    password: "",
    show1: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    errorMessage: "",
    showModal: false,
  }),

  methods: {
    async sendClick() {
      try {
        const myObj = {
          mail_address: this.mailAddress,
          password: this.password,
        };
        const myObjStr = JSON.stringify(myObj);
        console.log(myObjStr);
        const response = await axios.post("/api/user/login", myObjStr);
        console.log(response.data);
        if (response.data?.id) {
          this.$cookie.set("user_id", response.data.id, 1);
          this.$router.push("/");
        } else {
          this.errorMessage =
            "メールアドレスまたはパスワードが間違っています。";
        }
      } catch (error) {
        this.errorMessage = "サーバーエラーが発生しました。";
        this.showModal = true; // モーダルを表示する
      }
    },
  },
};
</script>
