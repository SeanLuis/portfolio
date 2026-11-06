<template>
  <main class="min-h-screen">
    <AppHeader class="mb-12" title="Projects" :description="description" />
    <div class="space-y-4">
      <AppProjectCard
        v-for="(project, id) in projects"
        :key="id"
        :project="project"
      />
    </div>
  </main>
</template>

<script setup>
const description =
  "Founder products first (Evercore, Pointerly, A-REX, Imóveis Bridge), then standards and open-source work (ERC-7893, github-explorer, REST Data Validator, EVP-JS). Role, stack, and links included where available.";
useSeoMeta({
  title: "Projects | Sean Luis Guada Rodríguez",
  description,
});

const { data: projects } = await useAsyncData("projects-all", () =>
  queryContent("/projects").find()
);
</script>
