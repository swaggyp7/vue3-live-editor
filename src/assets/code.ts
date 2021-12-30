export default {
  options: `<template>
	<div class="text">
  		{{text}}
      <button @click="change">Change Text</button>
  	</div>
</template>

<script>
	export default defineComponent({
    	data() {
        	return {text: "Hello World!"}
        },
      	methods: {
        	change() {
            	this.text = "Hello Vue!"
            }
        }
    })
</script>

<style>
	.text {
      	color: green
  	}
</style>`,
  function: "",
} as any;
