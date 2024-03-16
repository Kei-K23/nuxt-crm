<script setup lang="ts">
const route = useRoute();
definePageMeta({
  validate: async (route) => {
    return (
      typeof route.params.id === "string" && /^[A-Za-z]+$/.test(route.params.id)
    );
  },
});
</script>

<template>
  <div>
    <h2>{{ route.params.id }}</h2>
  </div>
</template>
