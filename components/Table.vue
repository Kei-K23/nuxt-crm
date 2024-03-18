<script setup lang="ts">
const deleteUserArray = ref<Array<string>>([]);
const checkRef = ref<HTMLInputElement | null>(null);
const userStore = useUserStore();
await userStore.fetch();

const bulkDelete = async () => {
  await userStore.bulkDelete(deleteUserArray.value);
  deleteUserArray.value = [];
  checkRef.value = null;
};

const onChange = () => {
  if (checkRef.value?.checked) {
    deleteUserArray.value = userStore.users.map((u) => u.id);
  } else {
    deleteUserArray.value = [];
  }
};
</script>
<template>
  <div class="mt-4 mb-10 px-4 mx-auto overflow-x-auto w-full md:w-[80%]">
    <button
      @click="bulkDelete"
      :disabled="deleteUserArray.length <= 0"
      class="btn btn-error btn-sm mb-2"
    >
      Delete All
    </button>
    <table class="table">
      <thead>
        <tr>
          <th>
            <label>
              <input
                ref="checkRef"
                @change="onChange"
                type="checkbox"
                class="checkbox"
              />
            </label>
          </th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userStore.users" :key="user.id">
          <th>
            <label>
              <input
                type="checkbox"
                :value="user.id"
                v-model="deleteUserArray"
                class="checkbox"
              />
            </label>
          </th>
          <th>
            <div class="font-bold">{{ user.username }}</div>
          </th>
          <th>
            <div class="font-bold">{{ user.email }}</div>
          </th>
          <th>
            <div class="font-bold">{{ user.phone }}</div>
          </th>
          <th>
            <div class="font-bold">{{ user.address }}</div>
          </th>
          <th class="flex items-center gap-x-2">
            <NuxtLink :to="'/users/' + user.id">
              <button class="btn btn-ghost btn-xs">details</button>
            </NuxtLink>
            <UserEditModal :user="user" />
            <button
              @click="userStore.delete(user.id)"
              class="btn btn-error btn-xs"
            >
              <Icon name="uil:trash-alt" />
            </button>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
