<script setup lang="ts">
const user = ref({
  username: "",
  email: "",
  phone: "",
  address: "",
});

function onSubmit() {
  // request to the server
}
</script>
<template>
  <form @submit.prevent="onSubmit" class="w-full mt-5 space-y-3">
    <input
      type="text"
      v-model="user.username"
      name="username"
      placeholder="Username"
      class="input input-bordered w-full"
    />
    <input
      type="email"
      v-model="user.email"
      name="email"
      placeholder="Email"
      class="input input-bordered w-full"
    />
    <input
      type="tel"
      v-model="user.phone"
      name="phone"
      placeholder="Phone"
      class="input input-bordered w-full"
    />
    <textarea
      name="address"
      v-model="user.address"
      class="textarea w-full textarea-bordered"
      placeholder="Address"
    ></textarea>
    <button type="submit" class="btn btn-success">Create</button>
  </form>
</template>
