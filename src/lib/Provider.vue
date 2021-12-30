<script setup lang="ts">
import { provide, reactive, defineProps } from "vue";
import code from "../assets/code";
provide(
  "state",
  reactive({
    code: "",
    type: "options",
  })
);
</script>

<template>
  <slot name="coder"></slot>
  <slot name="viewer"></slot>
</template>
