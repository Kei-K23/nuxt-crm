<script setup lang="ts">
const userStore = useUserStore();
userStore.fetch();
</script>
<template>
  <div class="mt-4 mb-10 px-4 mx-auto overflow-x-auto w-full md:w-[80%]">
    <table class="table">
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
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
              <input type="checkbox" class="checkbox" />
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
            <button class="btn btn-ghost btn-xs">details</button>
            <button class="btn btn-info btn-xs">
              <Icon name="uil:edit" />
            </button>
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
