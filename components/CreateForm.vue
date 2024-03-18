<script setup lang="ts">
import { v4 as uuid4 } from "uuid";

const router = useRouter();
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

async function onSubmit() {
  const id = uuid4().toString();
  user.value.id = id;
  // request to the server
  const { data, status } = await useFetch("/api/users", {
    method: "post",
    body: JSON.stringify(user.value),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (data) {
    if (data.value?.success) {
      // refetch the user data
      userStore.fetch();
      btnRef.value?.click();
      user.value = {
        id: "",
        username: "",
        email: "",
        phone: "",
        address: "",
        roleId: "",
      };
      router.push(`/users/${data.value.user[0].id}`);
    }
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
