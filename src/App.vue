<script setup>
import { ref } from 'vue';

import ReleaseList from './components/ReleaseList.vue';

const account = ref('franklai');
const repository = ref('synologylyric');
const releaseItems = ref([]);

async function fetchReleases() {
  const url = `https://api.github.com/repos/${account.value}/${repository.value}/releases`;
  const resp = await fetch(url);
  const json = await resp.json();

  const items = [];
  json.forEach((release) => {
    release.assets.forEach((asset) => {
      items.push({
        id: asset.id,
        name: asset.name,
        download_url: asset.browser_download_url,
        updated_at: asset.updated_at,
        download_count: asset.download_count,
      });
    });
  });

  releaseItems.value = items;
}

</script>

<template>
  <div className="App">
    <label>Account:</label>
    <input
      type="text"
      name="account"
      :value="account"
      @input="(event) => (account = event.target.value)"
    />
    <br />
    <label>Repository:</label>
    <input type="text" name="repository" v-model="repository" />
    <br />
    <button @click="fetchReleases">Show Download Count</button>
    <ReleaseList :items="releaseItems" />
  </div>
</template>

<style scoped></style>
