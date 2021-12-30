<script setup lang="ts">
import CodeMirror from "codemirror-editor-vue3";
import "codemirror/theme/dracula.css";
import "codemirror/mode/vue/vue.js";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint";
import { reactive, defineProps, inject, watch } from "vue";
import code from "../assets/code";
const globalState: any = inject("state");
const props = defineProps({
  mode: {
    type: String,
    default: "javascript",
  },
});
const state = reactive({
  code: "",
  options: {
    mode: props.mode, // Language mode
    theme: "dracula", // Theme
    lineNumbers: true, // Show line number
    smartIndent: true, // Smart indent
    indentUnit: 2, // The smart indent unit is 2 spaces in length
    foldGutter: true, // Code folding
    // styleActiveLine: true, // Display the style of the selected row
    extraKeys: { "Ctrl-1": "autocomplete" },
  },
});
watch(
  () => globalState.type,
  (newVal: string) => {
    globalState.code = code[newVal];
  },
  { immediate: true }
);
</script>

<template>
  <select v-model="globalState.type">
    <option value="options">options</option>
    <option value="function">function</option>
  </select>
  <code-mirror
    v-model:value="globalState.code"
    :options="state.options"
    border
    :height="300"
  ></code-mirror>
</template>
