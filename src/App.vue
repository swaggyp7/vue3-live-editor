<script setup lang="ts">
import Coder from "./lib/Coder.vue";
import Provider from "./lib/Provider.vue";
import Viewer from "./lib/Viewer.vue";
</script>

<template>
  <provider>
    <template v-slot:coder>
      <coder mode="vue" />
    </template>
    <template v-slot:viewer>
      <viewer />
    </template>
  </provider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
