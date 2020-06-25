<template>
  <div class="chat">
    <v-btn class="mb-3" small color="primary">Connect</v-btn>

    <v-card elevation="16" max-width="600" class="mx-auto">
      <v-virtual-scroll
        :bench="benched"
        :items="items"
        max-height="800"
        height="500"
        item-height="64"
      >
        <template v-slot="{ item }">
          <v-list-item :key="item">
            <v-list-item-action>
              <v-btn fab small depressed color="primary">{{ user_id }}</v-btn>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>User Database Record</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon small>mdi-trash-can</v-icon>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
        </template>
      </v-virtual-scroll>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ChatArea",
  props: {
    user_id: Number
  },
  data: () => ({
    benched: 1 // The number of items outside the user view that are rendered (even if they are not viewable); to help prevent empty white space when scrolling fast.
  }),
  computed: {
    items() {
      return Array.from({ length: this.length }, (k, v) => v + 1);
    },
    length() {
      return 7000;
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
