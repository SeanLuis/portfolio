<template>
  <main class="min-h-screen">
    <AppHeader class="mb-12" title="Projetos" :description="description" />
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
  "Trabalhei em vários pequenos projetos ao longo dos anos, mas estes são os que mais me orgulham. Muitos deles são de código aberto, então se você encontrar algo que desperte seu interesse, confira o código e contribua se tiver ideias de como ele pode ser melhorado.";
useSeoMeta({
  title: "Projetos | Sean Rodriguez",
  description,
});

const { data: projects } = await useAsyncData("projects-all", () =>
  queryContent("/projects").find()
);
</script>
