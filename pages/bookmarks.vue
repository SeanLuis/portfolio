<template>
  <main class="min-h-screen">
    <AppHeader class="mb-8" title="Bookmarks" :description="description" />
    <ul class="space-y-2">
      <li v-for="bookmark in bookmarks" :key="bookmark.id">
        <a
          :href="bookmark.url"
          target="_blank"
          class="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-white/10 p-2 rounded-lg -m-2 text-sm min-w-0"
        >
          <UAvatar
            :src="getThumbnail(bookmark.url)"
            :alt="bookmark.label"
            :ui="{ rounded: 'rounded-md' }"
          />
          <p class="truncate text-gray-700 dark:text-gray-200">
            {{ bookmark.label }}
          </p>
          <span class="flex-1"></span>
          <span class="text-xs font-medium text-gray-400 dark:text-gray-600">
            {{ getHost(bookmark.url) }}
          </span>
        </a>
      </li>
    </ul>
  </main>
</template>

<script setup>
const description =
  "Coisas incríveis que encontrei na internet. Esta página ainda é WIP, quero adicionar pesquisa como bmrks.com";
useSeoMeta({
  title: "Bookmarks | Sean Rodriguez",
  description,
});

const bookmarks = [
  {
    id: 1,
    label: "Adam Wathan - Tailwind CSS Best Practice Patterns",
    url: "https://www.youtube.com/watch?v=J_7_mnFSLDg",
  },
  {
    id: 2,
    label: "Dicebear Awesome avatars",
    url: "https://www.dicebear.com/",
  },
  {
    id: 3,
    label: "Circuit design stock image",
    url: "https://images.unsplash.com/photo-1592659762303-90081d34b277?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2873&q=80",
  },
  {
    id: 4,
    label: "Beautiful Gradient Generator",
    url: "https://www.joshwcomeau.com/gradient-generator/",
  },
  {
    id: 5,
    label: "3D device mockups",
    url: "https://deviceframes.com/",
  },
  {
    id: 6,
    label: "Box shadow examples",
    url: "https://getcssscan.com/css-box-shadow-examples",
  },
  {
    id: 7,
    label: "Octupos Illustration",
    url: "https://refine.new/",
  },
  {
    id: 8,
    label: "Metalab agency",
    url: "https://www.metalab.com/",
  },
  {
    id: 9,
    label: "Tines - Beautiful landing page",
    url: "https://www.tines.com/product",
  },
  {
    id: 10,
    label: "SVG Spinners",
    url: "https://github.com/n3r4zzurr0/svg-spinners",
  },
  {
    id: 11,
    label: "ASCII Flow - Text based image drawing",
    url: "https://asciiflow.com/#/",
  },
  {
    id: 12,
    label: "REQRES Mock apis for testing",
    url: "https://reqres.in/",
  },
  {
    id: 13,
    label: "Haikie - SVG background generator",
    url: "https://app.haikei.app/",
  },
  {
    id: 14,
    label: "IP API",
    url: "https://ipapi.is/",
  },
  {
    id: 15,
    label: "Rakko Tools",
    url: "https://en.rakko.tools/",
  },
  {
    id: 16,
    label: "Spline Web Animations",
    url: "https://spline.design/examples",
  },
  {
    id: 17,
    label: "Learn SQL - Mouredev",
    url: "https://github.com/mouredev/hello-sql",
  },
  {
    id: 18,
    label: "Termino.js - Integrated terminal for web",
    url: "https://github.com/MarketingPipeline/Termino.js",
  },
  {
    id: 19,
    label: "Typebot is a powerful chatbot builder that you can self-host.",
    url: "https://typebot.io/",
  },
  {
    id: 20,
    label: "Awesome CSS Frameworks",
    url: "https://github.com/troxler/awesome-css-frameworks"
  },
  {
    id: 21,
    label: "JSON Server",
    url: "https://github.com/typicode/json-server"
  },
  {
    id: 22,
    label: "Excalidraw",
    url: "https://excalidraw.com/"
  },
  {
    id: 23,
    label: "Public APIs",
    url: "https://public-apis.xyz/"
  },
  {
    id: 24,
    label: "CSS.gg",
    url: "https://css.gg/"
  },
  {
    id: 25,
    label: "Tiny Helpers",
    url: "https://tiny-helpers.dev/"
  },
  {
    id: 26,
    label: "Observable",
    url: "https://observablehq.com/"
  },
  {
    id: 27,
    label: "Figma Linux",
    url: "https://github.com/Figma-Linux/figma-linux"
  },
  {
    id: 28,
    label: "Netlify CMS",
    url: "https://www.netlifycms.org/"
  },
  {
    id: 29,
    label: "Vercel",
    url: "https://vercel.com/"
  },
  {
    id: 30,
    label: "Effect",
    url: "https://effect.website/"
  },
  {
    id: 31,
    label: "Brands Logos",
    url: "https://brandslogos.com/"
  },
  {
    id: 32,
    label: "Codefy Ai",
    url: "https://www.codefy.ai/"
  },
  {
    id: 33,
    label: "Code Wars",
    url: "https://www.codewars.com/"
  },
  {
    id: 34,
    label: "FreeCodeCamp",
    url: "https://www.freecodecamp.org/"
  },
  {
    id: 35,
    label: "CSS Tricks",
    url: "https://css-tricks.com/"
  },
  {
    id: 36,
    label: "Tailwind CSS",
    url: "https://tailwindcss.com/"
  },
  {
    id: 37,
    label: "Tailwind UI",
    url: "https://tailwindui.com/"
  },
  {
    id: 38,
    label: "Tailwind Toolbox",
    url: "https://www.tailwindtoolbox.com/"
  },
  {
    id: 39,
    label: "Gradii",
    url: "https://www.gradii.fun/"
  },
  {
    id: 40,
    label: "Tailwind CSS Cheat Sheet",
    url: "https://nerdcave.com/tailwind-cheat-sheet"
  },
  {
    id: 41,
    label: "Tailwind CSS Play",
    url: "https://play.tailwindcss.com/"
  },
  {
    id: 42,
    label: "Tailwind CSS Components",
    url: "https://tailwindcomponents.com/"
  },
  {
    id: 43,
    label: "The Algorithms",
    url: "https://the-algorithms.com/"
  },
];

function getHost(url) {
  const parsedUrl = new URL(url);
  let host = parsedUrl.host;
  if (host.startsWith("www.")) {
    host = host.substring(4);
  }
  return host;
}

function getThumbnail(url) {
  const host = getHost(url);
  return `https://logo.clearbit.com/${host}`;
}
</script>
