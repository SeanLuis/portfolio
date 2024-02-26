<template>
  <main class="min-h-screen">
    <AppHeader class="mb-16" title="Experiência Profissional" :description="description" />
    <ul class="space-y-16">
      <li v-for="(experience, id) in experiences" :key="id">
        <AppExperienceCard :experience="experience" />
      </li>
    </ul>
  </main>
</template>

<script setup>
const description =
  "Com uma sólida carreira como Desenvolvedor Back-end e Blockchain, trago uma profunda experiência técnica e um histórico comprovado de inovação e liderança em projetos de tecnologia avançada. Minha trajetória profissional inclui contribuições significativas em desenvolvimento de sistemas, otimização de processos e implementação de soluções blockchain, refletindo meu compromisso com a excelência, aprendizado contínuo e trabalho em equipe. Aqui, compartilho reflexões e aprendizados adquiridos ao longo de minha jornada profissional, abrangendo desde programação e design de interfaces até inovações em blockchain, todos coletados em ordem cronológica.";
useSeoMeta({
  title: "Experiência Profissional | Sean Rodriguez",
  description,
});

const { data: experiences } = await useAsyncData("all-work-experience", () =>
  queryContent("/work-experience").sort({ published: -1 }).find()
);
</script>
