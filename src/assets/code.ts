export default {
  options: `<template>
	<div class="text">
  		{{text}}
      <button @click="change">Change Text</button>
  	</div>
</template>

<script>
	export default defineComponent({
        name: "HelloWorld",
    	data() {
        	return {text: "Hello World!"}
        },
      	methods: {
        	change() {
            	this.text = "Hello Vue3!"
            }
        }
    })
</script>

<style>
	.text {
      	color: green
  	}
</style>`,
  function: `<template>
  <div class="text">
        {{text}}
    <button @click="change">Change Text</button>
    </div>
</template>

<script>
  export default defineComponent(function HelloWorld() {
      const text = ref("Hello World!")
      const change = () => {
          text.value = "Hello Vue3"
      }
      return {
          text,
          change
      }
  })
</script>

<style>
  .text {
        color: green
    }
</style>`,
} as any;
