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
  "I've worked on many small projects over the years, but these are the ones I'm most proud of. Many are open source — if something catches your interest, check out the code and contribute if you have ideas for how it can be improved.";
useSeoMeta({
  title: "Projects | Sean Rodriguez",
  description,
});

const { data: projects } = await useAsyncData("projects-all", () =>
  queryContent("/projects").find()
);
</script>
