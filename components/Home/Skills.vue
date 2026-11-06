<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">
      Skills
    </h2>
    <ul class="space-y-4">
      <li v-for="group in groups" :key="group.label" class="text-sm">
        <span class="font-medium text-gray-800 dark:text-gray-200">
          {{ group.label }}:
        </span>
        <span class="text-gray-500 dark:text-gray-400">
          {{ group.items.join(", ") }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const groups = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript (ES6+)", "Python", "Solidity", "SQL"],
  },
  {
    label: "Backend",
    items: ["Node.js", "NestJS", "Express", "REST APIs", "FastAPI"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Vue.js", "Nuxt.js", "Pinia", "Tailwind CSS"],
  },
  {
    label: "Data & Cloud",
    items: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Redis",
      "AWS",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    label: "AI tooling",
    items: ["RAG", "embeddings", "tool calling", "MCP", "agent workflows"],
  },
  {
    label: "Trust / Web3",
    items: ["Hardhat", "Polygon", "Hedera", "Arweave", "IPFS", "Viem"],
  },
  {
    label: "Spoken languages",
    items: ["English (basic)", "Spanish", "Portuguese"],
  },
];
</script>
