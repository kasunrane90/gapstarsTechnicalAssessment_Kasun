import PostHandler from '@/components/PostHandler.vue';
import PostLists from '@/components/PostLists.vue';
import PostHistory from '@/components/PostHistory.vue';
import { shallowMount } from '@vue/test-utils'
describe('PostHandler.vue', () => {
    let wrapper;

    beforeEach((done) => {
        wrapper = shallowMount(PostHandler);
        wrapper.vm.postListArray = [{
            "userId": 1,
            "id": 1,
            "title": "Post 1",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et"
        },
        {
            "userId": 1,
            "id": 2,
            "title": "Post 2",
            "body": "est rerum tempore vitae\nsequi sint nihil"
        },
        {
            "userId": 1,
            "id": 3,
            "title": "Post 3",
            "body": "et iusto sed quo iure\nvoluptatem occaecati omnis"
        },
        {
            "userId": 1,
            "id": 4,
            "title": "Post 4",
            "body": "ullam et saepe reiciendis voluptatem adipisci\nsit"
        },
        {
            "userId": 1,
            "id": 5,
            "title": "Post 5",
            "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat"
        }]
        done();
    })

    describe("Posts.vue", () => {

        it("check for PostLists component exist", () => {
            const postList = wrapper.findComponent(PostLists);
            expect(postList.exists()).toBe(true);
        });

        it("check for PostHistory component exist", () => {
            const postHistory = wrapper.findComponent(PostHistory);
            expect(postHistory.exists()).toBe(true);
        });

        it("Up button (valid) => post should move to one index up when the position of the post is not 0th index in the array list and an entry should be added to postHistory arrays", () => {

            wrapper.vm.movePost({ index: 4, postTitle: 'Post 5', id: 5, moveType: 'up' })
            expect(wrapper.vm.postListArray[3].id).toBe(5) // new moved position check
            expect(wrapper.vm.postHistory.length).toBe(1) // added entry check
        });

        it("Up button(invalid) => post should not move to one index up when the position of the post is 0th index in the array list and an entry should not be added to postHistory arrays", () => {

            wrapper.vm.movePost({ index: 0, postTitle: 'Post 1', id: 1, moveType: 'up' })
            expect(wrapper.vm.postListArray[0].id).toBe(1) //new moved position check (it will remain same as the condition fails)
            expect(wrapper.vm.postHistory.length).toBe(0) // added entry check (entry will not be added as condition fails)
        });

        it("Down button (valid) => post should move to one index down when the position of the post is not at 4th index(last) in the array list and an entry should be added to postHistory arrays", () => {

            wrapper.vm.movePost({ index: 0, postTitle: 'Post 1', id: 1, moveType: 'down' }) 
            expect(wrapper.vm.postListArray[1].id).toBe(1) // new moved position check
            expect(wrapper.vm.postHistory.length).toBe(1) // added entry check
        });

        it("Down button (invalid) => post should not move to one index down when the position of the post is at 4th index(last) in the array list and an entry should not be added to postHistory arrays", () => {

            wrapper.vm.movePost({ index: 4, postTitle: 'Post 5', id: 5, moveType: 'down' })
            expect(wrapper.vm.postListArray[4].id).toBe(5) //new moved position check (it will remain same as the condition fails)
            expect(wrapper.vm.postHistory.length).toBe(0) // added entry check (entry will not be added as condition fails)
        });

        it("Time Travel button => selected post action and above actions of particular posts will be removed from postHistory array and it will be added to selected moved position(oldIndex in postHistory) in post list", () => {

            wrapper.vm.movePost({ index: 4, postTitle: 'Post 5', id: 5, moveType: 'up' }) //new position will be at 3th index
            wrapper.vm.movePost({ index: 3, postTitle: 'Post 5', id: 5, moveType: 'up' }) //new position will be at 2th index
            wrapper.vm.movePost({ index: 2, postTitle: 'Post 5', id: 5, moveType: 'up' }) //new position will be at 1th index
            wrapper.vm.timeTravel({ index: 1, oldIndex: 3, postId: 5 }) //selected post is at 1st index of postHistory array.Hence 1st and 0th elements will be removed in postHistory array.
            expect(wrapper.vm.postListArray[3].id).toBe(5) // it will move to 3rd index of post list as it's the oldIndex of selected action.
            expect(wrapper.vm.postHistory.length).toBe(1) // since only 2 element removed from above 3 actions, postHistory array length will be 1.
        });

        it("arrayMove mixing function test => array element should move to new index from old index", () => {

            wrapper.vm.arrayMove(wrapper.vm.postListArray,4, 3) //move 'Post 5' to 3rd index
            expect(wrapper.vm.postListArray[3].id).toBe(5) //new index position of 'Post 5' will be 3
           
        });

        afterEach(done => {
            done();
          })

    });
 
})
