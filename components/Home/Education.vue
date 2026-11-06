<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">
      Education
    </h2>
    <ul class="space-y-5">
      <li v-for="item in items" :key="item.title" class="text-sm">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <span class="font-medium text-gray-800 dark:text-gray-200">
            {{ item.title }}
          </span>
          <span class="text-gray-400 dark:text-gray-500 text-xs whitespace-nowrap">
            {{ item.date }}
          </span>
        </div>
        <p class="text-gray-500 dark:text-gray-400 mt-0.5">
          {{ item.school }}
        </p>
        <p v-if="item.detail" class="text-gray-400 dark:text-gray-500 mt-0.5 text-xs">
          {{ item.detail }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup>
const items = [
  {
    title: "Blockchain Specialization",
    school: "University at Buffalo / Coursera",
    date: "2022 — 2023",
    detail:
      "Blockchain Basics, Platforms, Smart Contracts, Decentralized Applications",
  },
  {
    title: "IT Technician",
    school:
      'Instituto Politécnico de Informática "Pablo de la Torriente Brau"',
    date: "2009 — 2012",
  },
];
</script>
