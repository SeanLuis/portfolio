<template>
  <main class="min-h-screen">
    <AppHeader
      class="mb-12"
      title="Tecnologias que uso"
    />
    <div class="space-y-24">
      <ul class="space-y-8">
        <AppUsesHeader title="Front-end" />
        <AppUsesItem v-for="(item, id) in frontend" :key="id" :item="item" />
      </ul>
      <ul class="space-y-8">
        <AppUsesHeader title="Back-end" />
        <AppUsesItem v-for="(item, id) in backend" :key="id" :item="item" />
      </ul>
      <ul class="space-y-8">
        <AppUsesHeader title="Blockchain" />
        <AppUsesItem v-for="(item, id) in blockchain" :key="id" :item="item" />
      </ul>
      <ul class="space-y-8">
        <AppUsesHeader title="Others" />
        <AppUsesItem v-for="(item, id) in others" :key="id" :item="item" />
      </ul>
    </div>
  </main>
</template>

<script setup>
const description =
  "Softwares que eu uso";
useSeoMeta({
  title: "Coisas que eu uso | Sean Rodriguez",
  description,
});
const { data: items } = await useAsyncData("uses", () =>
  queryContent("/uses").find()
);
const frontend = items.value.filter((item) => item.category === "frontend");
const backend = items.value.filter((item) => item.category === "backend");
const blockchain = items.value.filter((item) => item.category === "blockchain");
const others = items.value.filter((item) => item.category === "others");
</script>
