<template>
  <main class="min-h-screen">
    <AppHeader class="mb-16" title="Artigos" :description="description" />
    <ul class="space-y-16">
      <li v-for="(article, id) in articles" :key="id">
        <AppArticleCard :article="article" />
      </li>
    </ul>
  </main>
</template>

<script setup>
const description =
  "Alguns dos meus artigos, onde compartilho meu ponto de vista sobre novas tecnologias.";
useSeoMeta({
  title: "Artigos | Sean Rodriguez",
  description,
});

const { data: articles } = await useAsyncData("all-articles", () =>
  queryContent("/articles").sort({ published: -1 }).find()
);
</script>
