<template>
  <NuxtLink :to="experience._path" class="group">
    <article>
      <time
        class="relative z-10 order-first mb-3 flex items-center text-sm text-gray-400 dark:text-gray-500 pl-3.5"
        datetime="2022-09-05"
        ><span
          class="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
          ><span
            class="h-4 w-0.5 rounded-full bg-gray-200 dark:bg-gray-500"
          ></span
        ></span>
        {{ experience.date }}
      </time>
      <h2
        class="text-base font-semibold font-display tracking-tight text-gray-800 dark:text-gray-100 group-hover:text-primary-600"
      >
        {{ experience.title }}
      </h2>
      <p class="relative z-10 mt-2 text-sm text-gray-600 dark:text-gray-400">
        {{ experience.description }}
      </p>
      <ul
        v-if="skills.length"
        class="relative z-10 mt-3 flex flex-wrap gap-1.5"
        aria-label="Skills"
      >
        <li
          v-for="skill in skills"
          :key="skill"
          class="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium leading-none text-gray-500 bg-gray-100 dark:bg-gray-800/80 dark:text-gray-400"
        >
          {{ skill }}
        </li>
      </ul>
    </article>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  experience: {
    type: Object,
    required: true,
  },
});

const skills = computed(() => {
  const value = props.experience.skills || [];
  return Array.isArray(value) ? value : [];
});
</script>
