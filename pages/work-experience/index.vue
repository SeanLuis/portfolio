<template>
  <main class="min-h-screen">
    <AppHeader class="mb-16" title="Work Experience" :description="description" />
    <ul class="space-y-16">
      <li v-for="(experience, id) in experiences" :key="id">
        <AppExperienceCard :experience="experience" />
      </li>
    </ul>
  </main>
</template>

<script setup>
const description =
  "Reverse-chronological experience: founder products (Evercore, Pointerly, A-REX, Imóveis Bridge, Berea AI), senior engineering at AgTrace, backend roles in Madrid and Barcelona, and earlier freelance full-stack work. Node.js / TypeScript / React emphasis with product ownership.";
useSeoMeta({
  title: "Work Experience | Sean Luis Guada Rodríguez",
  description,
});

const { data: experiences } = await useAsyncData("all-work-experience", () =>
  queryContent("/work-experience").sort({ order: 1 }).find()
);
</script>
