<template>
	<div class="post-list-wrapper-inner">
		<h2 class="mb-5 text-2xl text-white">Sortable Post List</h2>
		<!-- display post list -->
		<div v-if="!errorMessage">
			<div class="bg-white rounded-md shadow-lg flex justify-between py-2 px-4 mb-4 h-24 max-h-24 items-center" v-for="(post, index) in postListArray" v-bind:key="post.id">
				<h4 class="text-lg text-gray w-11/12">{{ post.id }} {{ post.title }}</h4>
				<div class="btn-wrapper flex flex-col w-1/12 items-end">
					<button class="navigation-btn up mb-2 focus:outline-none" @click="movePost(index, post.title,post.id,'up')" v-if="index != 0"><i class="fas fa-chevron-up text-indigo-600"></i></button>
					<button class="navigation-btn down mt-2 focus:outline-none" @click="movePost(index, post.title,post.id,'down')" v-if="index != postListArray.length - 1"><i class="fas fa-chevron-down text-indigo-600"></i></button>
				</div>
			</div>
		</div>
		<div v-if="errorMessage" class="bg-red-600 rounded-md py-4 px-6">
			<p class="text-white">{{ errorMessage }}</p>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		props: ["postListArray", "errorMessage"],
		methods: {
			// post move up/down method
			movePost(index, postTitle,id,moveType) {
				this.$emit("move-post", { index, postTitle, id, moveType }); //sending data to parent component
			},
		},
	});
</script>
