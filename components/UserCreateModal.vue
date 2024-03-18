<script setup lang="ts"></script>
<template>
  <div>
    <button class="btn" onclick="my_modal_3.showModal()">
      <Icon name="uil:user-plus" size="2rem" class="text-emerald-500" />
    </button>
    <dialog id="my_modal_3" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 class="font-bold text-lg">Create new user</h3>
        <CreateForm />
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>
