<template>
  <div class="chat">
    <v-btn class="mb-3" small color="primary" @click="connectWs" v-if="!connected">Connect</v-btn>
    <v-btn class="mb-3" small color="red" @click="disconnectWs" v-if="connected">Disconnect</v-btn>

    <v-text-field
      :disabled="connected"
      label="Username"
      v-model="username"
      filled
      shaped
      :counter="maxUserLength"
    ></v-text-field>

    <v-card elevation="16" class="mx-auto">
      <v-card-text>
        <v-list :id="'messages' + chatId">
          <template v-for="message in connected ? getMessages : []">
            <v-subheader :key="message.id">{{ message.data }}</v-subheader>
          </template>
        </v-list>
      </v-card-text>
    </v-card>

    <v-text-field
      :disabled="!connected"
      v-model="messageInput"
      filled
      @keydown.enter="sendMsg"
      :counter="maxLength"
      :placeholder="connected ? 'Write a message...' : 'You need to connect before sending a message'"
      :rules="[messageRules.max]"
    ></v-text-field>
  </div>
</template>

<script>
import ws from "../api";
import { mapGetters } from "vuex";

export default {
  name: "ChatArea",
  props: {
    chatId: Number
  },
  data: () => ({
    benched: 1, // The number of items outside the user view that are rendered (even if they are not viewable); to help prevent empty white space when scrolling fast
    connected: false,
    maxLength: 40,
    maxUserLength: 20,
    messageInput: "",
    messageRules: {
      max: v => v.length <= 40 || "Max 40 characters"
    },
    username: ""
  }),
  mounted() {
    // ws.message(msg => {
    //   console.log("New Message");
    //   this.messages.push(msg);
    //   console.log(this.messages);
    // });
    this.$options.sockets.onmessage = data => {
      console.log(data);
      var messageDivId = "messages" + this.chatId;
      var messagesDiv = document.getElementById(messageDivId);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };
  },
  methods: {
    connectWs() {
      ws.connect(msg => {
        console.log(msg);
      });
      this.connected = !this.connected;
    },
    disconnectWs() {
      ws.disconnect(msg => {
        console.log(msg);
      });
      this.connected = !this.connected;
    },
    sendMsg() {
      if (
        this.messageInput.length <= this.maxLength &&
        this.messageInput.length > 0
      ) {
        this.$store.dispatch("sendMessage", this.messageInput);
        this.messageInput = "";
      }
    }
  },
  computed: {
    ...mapGetters(["getMessages"])
  }
};
</script>

<style scoped>
.chat {
  height: 100%;
}

#messages1 {
  height: 550px;
  overflow: auto;
}
#messages2 {
  height: 550px;
  overflow: auto;
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
