<template>
  <main class="min-h-screen">
    <AppHeader
      class="mb-12"
      title="Technologies I use"
    />
    <div class="space-y-24">
      <ul class="space-y-8">
        <AppUsesHeader title="Frontend" />
        <AppUsesItem v-for="(item, id) in frontend" :key="id" :item="item" />
      </ul>
      <ul class="space-y-8">
        <AppUsesHeader title="Backend" />
        <AppUsesItem v-for="(item, id) in backend" :key="id" :item="item" />
      </ul>
      <ul class="space-y-8">
        <AppUsesHeader title="AI" />
        <AppUsesItem v-for="(item, id) in ai" :key="id" :item="item" />
      </ul>
      <ul class="space-y-8">
        <AppUsesHeader title="Blockchain / Trust" />
        <AppUsesItem v-for="(item, id) in blockchain" :key="id" :item="item" />
      </ul>
      <ul class="space-y-8">
        <AppUsesHeader title="Data & Cloud" />
        <AppUsesItem v-for="(item, id) in dataCloud" :key="id" :item="item" />
      </ul>
      <ul v-if="others.length" class="space-y-8">
        <AppUsesHeader title="Others" />
        <AppUsesItem v-for="(item, id) in others" :key="id" :item="item" />
      </ul>
    </div>
  </main>
</template>

<script setup>
const description =
  "Curated stack across frontend, backend, AI, blockchain/trust, and data & cloud.";
useSeoMeta({
  title: "Technologies I use | Sean Rodriguez",
  description,
});
const { data: items } = await useAsyncData("uses", () =>
  queryContent("/uses").find()
);
const list = items.value || [];
const frontend = list.filter((item) => item.category === "frontend");
const backend = list.filter((item) => item.category === "backend");
const ai = list.filter((item) => item.category === "ai");
const blockchain = list.filter((item) => item.category === "blockchain");
const dataCloud = list.filter((item) => item.category === "data-cloud");
const others = list.filter((item) => item.category === "others");
</script>
