<template>
  <div class="chat">
    <v-btn
      class="mb-3"
      small
      color="primary"
      @click="connectWs"
      v-if="!connected"
      :disabled="usernameInvalid"
    >Connect</v-btn>
    <v-btn class="mb-3" small color="red" @click="disconnectWs" v-if="connected">Disconnect</v-btn>

    <v-text-field
      :disabled="connected"
      label="Username"
      v-model="username"
      filled
      dense
      shaped
      :counter="maxUserLength"
      @input="validateUsernameLength"
      color="primary"
    ></v-text-field>

    <v-card elevation="16" class="mx-auto">
      <v-card-text>
        <v-list :id="'messages' + chatId">
          <template
            v-for="(message, index) in connected ? getMessages : [{id: 0, data: 'You need to connect before checking messages', username: ''}]"
          >
            <!-- current user -->
            <ChatMessage
              v-if="connected && message.username == username"
              :key="message.id"
              color="#3366ff"
              :message="message"
              :messageIndex="index"
              :justify="getMarginTopBot('justify-end', message, index)"
            />
            <!-- other users -->
            <ChatMessage
              v-if="connected && message.username != username"
              :key="message.id"
              color="grey darken-3"
              :message="message"
              :messageIndex="index"
              :justify="getMarginTopBot('justify-start', message, index)"
            />

            <!-- if not connected -->
            <v-list-item v-else-if="!connected" :key="message.id">{{ message.data }}</v-list-item>
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
import ChatMessage from "@/components/ChatMessage.vue";

export default {
  name: "ChatArea",
  props: {
    chatId: Number
  },
  components: { ChatMessage },
  data: () => ({
    benched: 1, // The number of items outside the user view that are rendered (even if they are not viewable); to help prevent empty white space when scrolling fast
    connected: false,
    maxLength: 40,
    maxUserLength: 20,
    messageInput: "",
    messageRules: {
      max: v => v.length <= 40 || "Max 40 characters"
    },
    username: "",
    usernameInvalid: true
  }),
  mounted() {
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
        var payload = { message: this.messageInput, username: this.username };
        this.$store.dispatch("sendMessage", payload);
        this.messageInput = "";
      }
    },
    validateUsernameLength() {
      if (
        this.username.length > 0 &&
        this.username.length <= this.maxUserLength
      ) {
        this.usernameInvalid = false;
      } else {
        this.usernameInvalid = true;
      }
    },
    getMarginTopBot(justify, message, messageIndex) {
      // if previous username is different than current username create top margin
      if (
        (this.getMessages[messageIndex - 1] &&
          this.getMessages[messageIndex - 1].username != message.username) ||
        !this.getMessages[messageIndex - 1]
      ) {
        return justify.concat(" mt-4");
      } else {
        return justify;
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
