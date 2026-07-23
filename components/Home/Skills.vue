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
    label: "Frontend",
    items: [
      "Vue.js",
      "Nuxt.js",
      "React",
      "Pinia",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    label: "Backend",
    items: ["Node.js", "NestJS", "Express", "Python", "FastAPI"],
  },
  {
    label: "AI",
    items: ["RAG", "embeddings", "tool calling", "MCP", "agent workflows"],
  },
  {
    label: "Blockchain / Trust",
    items: [
      "Solidity",
      "Hardhat",
      "Polygon",
      "Hedera",
      "Arweave",
      "IPFS",
      "Viem",
    ],
  },
  {
    label: "Data & Cloud",
    items: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Qdrant",
      "Redis",
      "AWS",
      "Docker",
    ],
  },
];
</script>
