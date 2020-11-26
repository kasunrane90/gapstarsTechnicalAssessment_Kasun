<template>
	<div class="post-history-wrapper-inner bg-gray-200 shadow-lg flex-row rounded-md relative mb-16">
		<div class="py-4 px-4 bg-white rounded-t">
			<h2 class="text-2xl">List of actions commited</h2>
		</div>
		<div class="px-4 py-6 w-full h-full overflow-y-auto history-card-inner">
			<div v-if="postHistory.length > 0">
				<!-- display action list by itterating postHistory array -->
				<div class="card-item bg-white shadow-md flex p-3 justify-between items-center border-t border-b" v-for="(history, index) of postHistory" v-bind:key="history.id" v-bind:class="{ 'rounded-tr rounded-tl border-white': index == 0, 'rounded-br rounded-bl border-white': index == postHistory.length - 1 }">
					<p class="w-9/12">Moved <b>{{ history.title }}</b> from index {{ history.oldIndex }} to index {{ history.newIndex }}</p>
					<button class="py-2 px-4 rounded shadow-md text-white bg-green-500 hover:bg-green-700 w-40 w-3/12" @click="timeTravel(index, history.oldIndex, history.postId)">Time Travel</button>
				</div>
			</div>
			<!-- if there is no action performed shows below message -->
			<div class="no-items-wrapper" v-if="postHistory.length == 0">
				<p>There are no any actions commited to show here..</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		props: ["postHistory"],
		methods: {
			// time travel button handler
			timeTravel(index, oldIndex, postId) {
				this.$emit("time-travel", {
					index,
					oldIndex,
					postId,
				});
			},
		},
	});
</script>