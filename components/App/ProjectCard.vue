<template>
  <component
    :is="hasUrl ? 'a' : 'div'"
    class="flex items-end gap-4 p-2 -m-2 rounded-lg"
    :class="hasUrl ? 'group' : ''"
    v-bind="linkAttrs"
  >
    <div class="max-w-sm min-w-0">
      <div class="flex items-center gap-2 flex-wrap">
        <h3
          class="text-sm font-medium"
          :class="hasUrl ? 'group-hover:text-primary-600' : ''"
        >
          {{ project.name }}
        </h3>
        <span
          v-if="project.role"
          class="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium leading-none text-gray-500 bg-gray-100 dark:bg-gray-800/80 dark:text-gray-400"
        >
          {{ project.role }}
        </span>
        <span
          v-if="project.status"
          class="inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium leading-none"
          :class="statusClass"
        >
          {{ project.status }}
        </span>
      </div>
      <p class="text-gray-400 text-sm">{{ project.description }}</p>
      <ul
        v-if="stack.length"
        class="mt-2 flex flex-wrap gap-1.5"
        aria-label="Tech stack"
      >
        <li
          v-for="tech in stack"
          :key="tech"
          class="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium leading-none text-gray-500 bg-gray-100 dark:bg-gray-800/80 dark:text-gray-400"
        >
          {{ tech }}
        </li>
      </ul>
    </div>
    <div
      class="flex-1 border-b border-dashed border-gray-300 dark:border-gray-800"
      :class="hasUrl ? 'group-hover:border-gray-700' : ''"
    ></div>
    <UAvatar
      :src="thumbnail"
      :ui="{ rounded: 'rounded z-10 relative' }"
      size="md"
      :alt="project.name"
    />
  </component>
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const hasUrl = computed(() => Boolean(props.project?.url));

const linkAttrs = computed(() =>
  hasUrl.value
    ? {
        href: props.project.url,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {}
);

const stack = computed(() => {
  const value = props.project.stack || props.project.technologies || [];
  return Array.isArray(value) ? value : [];
});

const thumbnail = computed(() => {
  if (props.project.thumbnail) return props.project.thumbnail;
  if (!props.project.url) return undefined;
  try {
    const host = new URL(props.project.url).hostname.replace(/^www\./, "");
    return `https://www.google.com/s2/favicons?domain=${host}&sz=128`;
  } catch {
    return undefined;
  }
});

const statusClass = computed(() => {
  const status = (props.project.status || "").toLowerCase();
  if (status.includes("coming soon") || status.includes("launching")) {
    return "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400";
  }
  if (status === "final" || status === "published") {
    return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400";
  }
  if (status === "draft" || status === "wip") {
    return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
  }
  return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
});
</script>
