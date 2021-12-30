<script setup lang="ts">
import {
  inject,
  ref,
  watch,
  defineComponent,
  reactive,
  watchEffect,
} from "vue";
import * as Vue from "vue";
import { createApp } from "vue/dist/vue.esm-browser";
const state: any = inject("state");
const err = ref("");
const viewerRef = ref(null);
const scriptRegex = /<script.*>([\s\S]*)<\/script>/;
const templateRegex = /<template.*>([\s\S]*)<\/template>/;
const styleRegex = /<style.*>([\s\S]*)<\/style>/;
const analysisCode = (code: string) => {
  const script = scriptRegex.exec(code);
  const template = templateRegex.exec(code);
  const style = styleRegex.exec(code);
  let styleFragument = document.createElement("style");
  // 添加样式
  if (style) {
    const isExist: any = document.getElementById("viewer-style");
    if (isExist) {
      // 已存在则修改内容
      styleFragument = isExist;
    }
    styleFragument.id = "viewer-style";
    styleFragument.innerHTML = style[1];
    document.getElementsByTagName("head")[0].appendChild(styleFragument);
  }
  return {
    script: script ? script[1] : null,
    template: template ? template[1] : template,
    style: style ? style[1] : style,
  };
};
const handleFunctionCode = (code: string) => {
  const { script, template, style } = analysisCode(code);
  if (!script) {
    throw Error("<script> block not found");
  }
  const functionRegex =
    /defineComponent\(function [\d\w]* *\(.*\) *{([\s\S]*)}\)/;
  const res = functionRegex.exec(script);
  if (!res) {
    throw Error("function not found");
  }
  let functionStr = res[1];
  const setupFunction = new Function(functionStr);
  return { option: setupFunction, template };
};
const handleOptionsCode = (code: string) => {
  const { script, template, style } = analysisCode(code);
  const optionsRegex = /defineComponent\((\{[\s\S]*\})\)/;
  if (script) {
    const res = optionsRegex.exec(script);
    if (res === null) {
      throw Error("defineComponent options not found");
    }
    let groupRes = res[1];
    groupRes = groupRes.replace(/\n/g, "");
    const option = eval(`()=> {return ${groupRes}}`)();
    return { option, template };
  } else {
    throw Error("<script> block not found");
  }
};
watchEffect(() => {
  try {
    let codeRes;
    if (state.type === "options") {
      codeRes = handleOptionsCode(state.code);
    } else if (state.type === "function") {
      codeRes = handleFunctionCode(state.code);
    }
    const component = defineComponent(codeRes?.option);
    if (codeRes?.template) {
      component.template = codeRes.template;
    }
    createApp(component).mount(viewerRef.value);
    err.value = "";
  } catch (e: any) {
    err.value = e;
  }
});
</script>

<template>
  <div id="tt" ref="viewerRef" class="container"></div>
  <p class="error">{{ err }}</p>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.error {
  color: red;
}
</style>
