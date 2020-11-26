import { defineComponent } from "vue";
export default defineComponent({
    methods: {
      arrayMove(arr: string[], oldIndex: number, newIndex: number) {
        if (newIndex >= arr.length) {
          let k = newIndex - arr.length + 1;
          while (k--) {
            arr.push(undefined);
          }
        }
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
        return arr;
      }
    }
});