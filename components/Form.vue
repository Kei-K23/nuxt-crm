<script setup lang="ts">
import { v4 as uuid4 } from "uuid";

const user = ref({
  id: "",
  username: "",
  email: "",
  phone: "",
  address: "",
  roleId: "",
});

// ref the button to close daisyui modal
const btnRef = ref<HTMLButtonElement | null>(null);
const userStore = useUserStore();
const { data: roles } = useFetch("/api/roles");

function onSubmit() {
  const id = uuid4().toString();
  user.value.id = id;
  // request to the server
  const { data } = useFetch("/api/users", {
    method: "post",
    body: JSON.stringify(user.value),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (data) {
    // refetch the user data
    userStore.fetch();
    btnRef.value?.click();
  }
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
    <select v-model="user.roleId" class="select select-bordered w-full">
      <option disabled value="">Assign role</option>
      <option v-for="role in roles" :key="role.id" :value="role.id">
        {{ role.role }}
      </option>
    </select>
    <textarea
      name="address"
      v-model="user.address"
      class="textarea w-full textarea-bordered"
      placeholder="Address"
    ></textarea>
    <form method="dialog">
      <button ref="btnRef" class="hidden">close</button>
    </form>
    <button type="submit" class="btn btn-success">Create</button>
  </form>
</template>
