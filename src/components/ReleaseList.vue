<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <table>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Download Count</th>
        <th>Last Updated</th>
      </tr>
      <tr v-for="item in items" :key="item.id">
        <td>
          <a :href="item.download_url">{{ item.name }}</a>
        </td>
        <td>{{ item.download_count }}</td>
        <td>{{ item.updated_at }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
