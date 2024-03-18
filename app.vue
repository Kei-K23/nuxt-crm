<script setup lang="ts">
useSeoMeta({
  titleTemplate: "%s | CRM",
  ogTitle: "CRM - Nuxt app",
  description: "This is customer relationship management system using Nuxt",
  ogDescription: "This is customer relationship management system using Nuxt",
  author: "Kei-K23",
});
</script>

<template>
  <NuxtLoadingIndicator />
  <div>
    <Header />
    <NuxtPage />
  </div>
</template>
