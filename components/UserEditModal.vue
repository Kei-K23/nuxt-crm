<script setup lang="ts">
import type { InsertUser } from "~/db/schema";

const props = defineProps({
  user: {
    type: Object as PropType<InsertUser>,
    required: true,
  },
});
const dialogRef = ref<HTMLDialogElement | null>(null);

const onDialogShow = () => {
  dialogRef.value?.showModal();
};
</script>
<template>
  <div>
    <button @click="onDialogShow" class="btn btn-info btn-xs">
      <Icon name="uil:edit" />
    </button>

    <dialog ref="dialogRef" :id="user.id" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 class="font-bold text-lg">Edit the user</h3>
        <EditForm :user="user" />
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>
