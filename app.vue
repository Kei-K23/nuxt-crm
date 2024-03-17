<script setup lang="ts">
const { data: users } = useFetch("/api/users");
</script>
<template>
  <div>
    <h1>hello</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.email }}
      </li>
    </ul>
  </div>
</template>
