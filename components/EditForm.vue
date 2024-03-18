<script setup lang="ts">
import type { InsertUser } from "~/db/schema";

const props = defineProps({
  user: {
    type: Object as PropType<InsertUser>,
    required: true,
  },
});

const user = ref(props.user);

// ref the button to close daisyui modal
const btnRef = ref<HTMLButtonElement | null>(null);
const userStore = useUserStore();
const { data: roles } = useFetch("/api/roles");

async function onSubmit() {
  const data = await userStore.update(user.value.id, {
    username: user.value.username,
    email: user.value.email,
    roleId: user.value.roleId,
    phone: user.value.phone,
    address: user.value.address,
  });

  if (data) {
    if (data.success) {
      // refetch the user data
      userStore.fetch();
      btnRef.value?.click();
      user.value = data.user[0];
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
      <option
        :selected="role.id === user.roleId"
        v-for="role in roles"
        :key="role.id"
        :value="role.id"
      >
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
    <button type="submit" class="btn btn-success">Save</button>
  </form>
</template>
