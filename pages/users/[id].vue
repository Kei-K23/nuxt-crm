<script setup lang="ts">
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const userId = route.params.id;
await userStore.fetchUser(userId as string);

useHead({
  title: userStore.user?.username,
  meta: [
    {
      name: "description",
      content: `this is a detail page for user ${userStore.user?.username}`,
    },
  ],
});

const onDelete = async () => {
  await userStore.delete(userId as string);
  router.push("/");
};

const onBan = async () => {
  await userStore.update(userId as string, {
    isBanned: !userStore.user?.isBanned!,
  });
};
</script>
<template>
  <div class="mt-4 mb-10 px-4 mx-auto w-full md:w-[80%]">
    <h1 class="text-center text-2xl font-bold">
      Name : "{{ userStore.user?.username }}"
    </h1>
    <h3
      v-if="userStore.user?.isBanned"
      class="mt-2 text-center text-yellow-500"
    >
      This user is banned
    </h3>
    <EditForm :user="userStore.user!" />
    <div class="mt-5">
      <h2 class="mb-3">Actions</h2>
      <div class="flex items-center gap-4">
        <button @click="onDelete" class="btn btn-error btn-sm">
          <Icon name="uil:trash-alt" size="1.5rem" /> Delete
        </button>
        <button @click="onBan" class="btn btn-warning btn-sm">
          <Icon name="uil:ban" size="1.5rem" />
          {{ userStore.user?.isBanned ? "UnBan" : "Ban" }}
        </button>
      </div>
    </div>
  </div>
</template>
