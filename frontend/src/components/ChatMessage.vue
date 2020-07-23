<template>
  <v-list-item :class="justify">
    <v-card width="300" :color="color">
      <!-- only display if previous username is different than current username -->
      <v-card-subtitle
        v-if="(getMessages[messageIndex - 1] && getMessages[messageIndex - 1].username != message.username) || !getMessages[messageIndex - 1]"
        class="font-italic"
      >{{ message.username }}</v-card-subtitle>

      <v-card-text class="text--primary text-right">{{ message.data }}</v-card-text>
    </v-card>
  </v-list-item>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ChatMessage",
  props: {
    color: String,
    message: Object,
    messageIndex: Number,
    justify: String,
  },
  data: () => ({}),
  computed: {
    ...mapGetters(["getMessages"]),
  },
};
</script>
