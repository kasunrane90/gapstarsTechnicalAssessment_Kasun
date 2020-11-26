<template>
	<PostHandler/>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import PostHandler from './components/PostHandler.vue'

	export default defineComponent({
		name: 'App',
		components: {
			PostHandler
		}
	});
</script>

<style src="./assets/tailwind.css"></style>
<style lang="scss">
	body { background-color: #edf2f7; }
</style>
