<template>
	<div class="main-wrapper">
		<div class="bg-skew bg-indigo-600"></div>
		<div class="content-wrapper container mx-auto pt-16 flex justify-between">
			<!-- post list component goes here -->
			<div class="post-list-wrapper w-5/12">
				<PostLists @movePost="movePost($event)" :postListArray="postListArray" :errorMessage="errorMessage"/>
			</div>
			<!-- list of actions component goes here -->
			<div class="post-history-wrapper w-6/12">
				<PostHistory @timeTravel="timeTravel($event)" :postHistory="postHistory"/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import axios from "axios";
	import ArrayMove from "./Shared/ArrayMove";
	import PostLists from "./PostLists.vue";
	import PostHistory from "./PostHistory.vue";
	import {URL} from '../environments/URL'
	export default defineComponent({
		components: {
			PostLists,
			PostHistory,
		},
		data() {
			return {
			postListArray: [],
			postHistory: [],
			errorMessage:''
			};
		},
		mixins: [ArrayMove],
		methods: {
			// function for post up and down
			movePost(data) {
				const index = data.index;
				const postTitle = data.postTitle;
				let newIndex;
				const moveType = data.moveType;
				if (moveType === "up") {
					newIndex = index - 1;
					// when each time 'post up' button clicks, index will decrease by 1
				} else {
					newIndex = index + 1;
					// when each time 'post down' button clicks, index will increase by 1
				}
				this.postListArray = this.arrayMove(this.postListArray, index,newIndex);
				// array elemets moving from current index to new
				this.postHistory.push({
					id: "id" + new Date().getTime(),
					title: postTitle,
					oldIndex: index,
					newIndex: newIndex,
					date: new Date(),
					postId: data.id,
				});
				// display the newest item 1st in the action list, soring by date
				this.postHistory = this.postHistory.sort((d1, d2) => new Date(d2.date).getTime() - new Date(d1.date).getTime());
			},

			timeTravel(data) {
				const index = data.index;
				const oldIndex = data.oldIndex;
				const postId = data.postId;
				// find current index of selected post
				const currentIndex = this.postListArray.findIndex((val) => val.id == postId);
				// find all records where index of postHistory less than the selected post's index
				const duplicatePostsLogs = this.postHistory.filter((val, i) => val.postId == postId && i <= index);
				// remove them from postHistory in order to remove all above records from the selected one
				duplicatePostsLogs.forEach((value, i) => {
					const index = this.postHistory.findIndex(
					(val) => val.id == duplicatePostsLogs[i].id
					);

					this.postHistory.splice(index, 1);
				});
				// update post lists by moving the element from current position to selected oldIndex
				this.postListArray = this.arrayMove(this.postListArray, currentIndex, oldIndex);
			},
			// get post list function
			getPostList() {
				axios.get(URL.postsUrl).then((data) => {
					this.postListArray = data.data.slice(0, 5); //limiting posts list to 5 elements
				}).catch(()=>{
					this.errorMessage = 'Something went wrong, please try again later..';
				});
			}
		},
		created() {
			// get post lists
			this.getPostList();
		}
	});
</script>

<style lang="scss" scoped>
  .bg-skew { transform: skew(0deg, -10deg); padding: 200px 0; position: absolute; left: 0; right: 0; z-index: -1; top: -250px; }
</style>