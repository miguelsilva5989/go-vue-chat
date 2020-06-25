<template>
  <div>
    <v-app-bar dense>
      <v-toolbar-title>Go Vuejs Chat App</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-icon>mdi-wechat</v-icon>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Header",

  data: () => ({
    unread_messages: false
  })
};
</script>
