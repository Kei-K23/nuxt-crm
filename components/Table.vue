<script setup lang="ts">
import type { InsertUser } from "~/db/schema";

const deleteUserArray = ref<Array<string>>([]);
const banUserArray = ref<Array<{ id: string; isBanned: boolean }>>([]);
const checkRef = ref<HTMLInputElement | null>(null);
const userStore = useUserStore();
await userStore.fetch();

const bulkDelete = async () => {
  await userStore.bulkDelete(deleteUserArray.value);
  deleteUserArray.value = [];
  checkRef.value = null;
};

const bulkBan = async () => {
  await userStore.bulkUpdate(banUserArray.value);
  banUserArray.value = banUserArray.value.map((bu) => ({
    ...bu,
    isBanned: !bu.isBanned,
  }));
};

const onChange = () => {
  if (checkRef.value?.checked) {
    deleteUserArray.value = userStore.users.map((u) => u.id);
    banUserArray.value = userStore.users.map((u) => ({
      id: u.id,
      isBanned: u.isBanned!,
    }));
  } else {
    deleteUserArray.value = [];
  }
};

const onBanUserAdd = (u: InsertUser) => {
  const isBanned = banUserArray.value.some((b) => b.id === u.id);
  if (isBanned) {
    banUserArray.value = banUserArray.value.filter((b) => b.id !== u.id);
  } else {
    banUserArray.value.push({ id: u.id, isBanned: u.isBanned! });
  }
};
</script>
<template>
  <div class="mt-4 mb-10 px-4 mx-auto overflow-x-auto w-full md:w-[80%]">
    <div class="mb-2 flex items-center gap-3">
      <button
        @click="bulkDelete"
        :disabled="deleteUserArray.length <= 0"
        class="btn btn-error btn-sm"
      >
        Delete All
      </button>
      <button
        @click="bulkBan"
        :disabled="deleteUserArray.length <= 0"
        class="btn btn-warning btn-sm"
      >
        Ban All
      </button>
    </div>
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
                @change="onBanUserAdd(user)"
                type="checkbox"
                :value="user.id"
                v-model="deleteUserArray"
                class="checkbox"
              />
            </label>
          </th>
          <th>
            <div class="font-bold" :class="user.isBanned && 'text-yellow-500'">
              {{ user.username }}
            </div>
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
