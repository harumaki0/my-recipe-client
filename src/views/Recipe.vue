<template>
  <v-container>
    <Header />
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-text-field
              label="料理名"
              solo
              dense
              hide-details
              v-model="name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <input type="file" id="file" @change="onFileChange" />
        </v-row>
        <v-row>
          <v-col class="d-flex" cols="4">
            <v-select
              :items="items"
              label="参照サイト"
              dense
              solo
              hide-details
              v-model="reference"
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
              v-model="memo"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col justify="center">
            <p class="red--text">{{ message }}</p>
            <v-btn color="#ff5252" @click="sendClick()">登録</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-dialog v-model="modal" max-width="500">
            <v-card>
              <v-card-title>
                <span class="headline">{{ message2 }}</span>
              </v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="modal = false"
                  >閉じる</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-container>
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
  data: () => ({
    items: ["クラシル", "クックパッド", "Derish kitchen", "YouTube", "その他"],
    name: "",
    message: "",
    imageFile: [],
    reference: "",
    memo: "",
    favorite: "0",
    user_id: "",
    modal: false,
    message2: "",
  }),
  methods: {
    async sendClick() {
      console.log(this.items);
      if (!this.name) {
        console.log(1);
        //料理名が空の場合エラー表示
        this.message = "※料理名を入力してください。";
        console.log(this.message);
      } else if (!this.reference) {
        console.log(2);
        //参照サイトが空の場合エラー表示
        this.message = "※参照サイトを選択してください。";
        console.log(this.message);
      } else {
        console.log(3);
        let now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const today = year + "-" + month + "-" + day;

        // const id = response.user.id;
        const formData = new FormData();
        formData.append("file", this.imageFile[0]);
        formData.append("name", this.name);
        formData.append("reference", this.reference);
        formData.append("memo", this.memo);
        formData.append("favorite", this.favorite);
        formData.append("registration_date", today);
        formData.append("user_id", this.user_id);
        const response = await axios.post("/api/recipe", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        console.log(response.data);
        this.modal = true;
        this.message2 = "登録が完了しました。";
      }
    },
    onFileChange(event) {
      this.imageFile = event.target.files || event.dataTransfer.files;
    },
  },
  async mounted() {
    this.user_id = this.$cookie.get("user_id");
    console.log(this.user_id);
  },
};
</script>
