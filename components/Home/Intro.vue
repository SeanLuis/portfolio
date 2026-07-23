<template>
  <div class="space-y-6">
    <NuxtImg src="/avatar.jpeg" alt="Sean Rodriguez"
      class="ring-2 border ring-gray-200 border-gray-300 dark:ring-white/10 dark:border-gray-800 hover:ring-4 transition-all duration-300 bg-gray-200 dark:bg-gray-900 rounded-full h-12 w-12 sm:h-16 sm:w-16"
      sizes="48px sm:64px" placeholder format="webp" />
    <h1 class="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
      Hello!
    </h1>
    <p class="text-gray-900 dark:text-gray-400">
      I'm Sean Luis Guada Rodríguez — founder and software engineer based in Florianópolis.
      I build products at the intersection of
      <strong>agentic AI</strong>, <strong>verifiable trust</strong>, and
      <strong>full-stack platforms</strong>.
      Today I lead
      <strong>
        <a class="underline text-[#0284c7]" href="https://evercore.sh">
          <UTooltip text="evercore.sh">
            Evercore.sh
          </UTooltip>
        </a>
      </strong>
      (a regulated evidence layer with compliance agents on Arweave, Hedera, and IPFS),
      <strong>
        <a class="underline text-[#0284c7]" href="https://pointerly.io">
          <UTooltip text="pointerly.io">
            Pointerly.io
          </UTooltip>
        </a>
      </strong>
      (Affiliate Operations Platform for creators and brands) and
      <strong>
        <a class="underline text-[#0284c7]" href="https://berea.app">
          <UTooltip text="Coming Soon · berea.app">
            Berea AI
          </UTooltip>
        </a>
      </strong>
      <span class="text-amber-600 dark:text-amber-400 text-sm font-medium">(Coming Soon)</span>
      — knowledge agents with RAG, citations, and safe tool calling.
    </p>
    <p class="text-gray-900 dark:text-gray-400">
      I also work as Sr. Frontend Engineer at
      <strong>
        <a class="underline text-[#0284c7]" href="https://agtrace.ag">
          <UTooltip text="agtrace.ag">
            AgTrace
          </UTooltip>
        </a>
      </strong>,
      shipping agricultural traceability DApps (Vue.js/Nuxt, Solidity, Polygon, Hedera).
      Author of
      <strong>
        <a class="underline text-[#0284c7]" href="https://eips.ethereum.org/EIPS/eip-7893">
          <UTooltip text="eips.ethereum.org/EIPS/eip-7893">
            ERC-7893
          </UTooltip>
        </a>
      </strong>
      (DeFi Protocol Solvency Proof) and contributor to
      <strong>
        <a class="underline text-[#0284c7]" href="https://github.com/aspect-evp/evp-js">
          <UTooltip text="github.com/aspect-evp/evp-js">
            aspect-evp/evp-js
          </UTooltip>
        </a>
      </strong>
      (Email Verification Protocol).
      Earlier experience at
      <strong>
        <a class="underline text-[#0284c7]" href="https://qa-bit.com/en/">Qa-Bit</a>,
        <a class="underline text-[#0284c7]" href="https://www.syntonize.com/en/home-en/">Syntonize</a>,
        <a class="underline text-[#0284c7]" href="https://www.abrapa.com.br/">Abrapa</a>,
        <a class="underline text-[#0284c7]" href="https://www.3tentos.com.br/">3Tentos</a>
      </strong>
      and freelance projects (CubaMax, Toma1, Alacasa).
    </p>
    <p class="text-gray-900 dark:text-gray-400">
      Core stack: TypeScript, Vue/Nuxt, React, Node/NestJS, Python/FastAPI,
      Solidity/Hardhat, Arweave, Hedera, IPFS, AWS, and Docker. Clean code,
      auditable evidence, and products regulated teams can actually ship.
    </p>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Sean Rodriguez",
  description:
    "Founder at Evercore.sh, Pointerly.io and Berea AI (Coming Soon). Sr. Frontend Engineer at AgTrace. Author of ERC-7893. Full-stack, blockchain and agentic AI engineer based in Florianópolis.",
});
</script>
