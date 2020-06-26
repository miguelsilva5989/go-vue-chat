<template>
  <div class="chat">
    <v-btn class="mb-3" small color="primary" @click="connectWs" :disabled="connected">Connect</v-btn>

    <v-card elevation="16" class="mx-auto">
      <v-virtual-scroll :bench="benched" :items="items" height="510" item-height="64">
        <template v-slot="{ item }">
          <v-list-item :key="item">
            <v-list-item-action>
              <v-avatar color="primary" size="30" rounded>
                <span class="white--text headline">{{ user_id }}</span>
              </v-avatar>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>message...</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon>mdi-trash-can</v-icon>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
        </template>
      </v-virtual-scroll>

      <v-text-field
        v-model="messageInput"
        filled
        @keydown.enter="sendMsg"
        :counter="maxLength"
        placeholder="Write a message..."
        :rules="[messageRules.required, messageRules.max]"
      ></v-text-field>
    </v-card>
  </div>
</template>

<script>
import ws from "../api";

export default {
  name: "ChatArea",
  props: {
    user_id: Number
  },
  data: () => ({
    benched: 1, // The number of items outside the user view that are rendered (even if they are not viewable); to help prevent empty white space when scrolling fast
    connected: false,
    maxLength: 40,
    messageInput: "",
    messageRules: {
      required: value => !!value || "Required.",
      max: v => v.length <= 40 || "Max 40 characters"
    }
  }),
  methods: {
    connectWs() {
      ws.connect(msg => {
        console.log(msg);
      });
      this.connected = !this.connected;
    },
    sendMsg() {
      if (this.messageInput.length <= this.maxLength) {
        console.log(this.messageInput);
        this.messageInput = "";
      }
    }
  },
  computed: {
    items() {
      return Array.from({ length: this.length }, (k, v) => v + 1);
    },
    length() {
      return 30;
    }
  }
};
</script>

<style scoped>
.chat {
  height: 100%;
}

::-webkit-scrollbar {
  width: 15px;
}

::-webkit-scrollbar-track {
  background: #3c3c3c;
  border-left: 1px solid #202020;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb {
  background: #767676;
  border: solid 3px #3c3c3c;
  border-radius: 7px;
}

::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>
