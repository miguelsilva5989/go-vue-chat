<template>
  <div>
    <Header />

    <v-container class="ma-0" fluid>
      <v-row>
        <v-col cols="12">
          <v-row class="ma-0" align="center" justify="center">
            <v-col cols="6" md="5">
              <ChatArea :chatId="1" />
            </v-col>

            <v-col cols="6" md="5">
              <ChatArea :chatId="2" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import ChatArea from "@/components/ChatArea.vue";

export default {
  name: "Home",
  components: {
    Header,
    ChatArea
  }
};
</script>
