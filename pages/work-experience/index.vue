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
  "Founder of Evercore.sh, Pointerly.io, and Berea AI (Coming Soon); Sr. Frontend Engineer at AgTrace; author of ERC-7893. Path across full-stack, blockchain, verifiable trust, and agentic AI — from own products to open-source contributions and Ethereum standards.";
useSeoMeta({
  title: "Work Experience | Sean Rodriguez",
  description,
});

const { data: experiences } = await useAsyncData("all-work-experience", () =>
  queryContent("/work-experience").sort({ published: -1 }).find()
);
</script>
