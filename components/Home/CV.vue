<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">CURRICULUM VITAE</h2>
    <div class="space-y-5">
      <!-- HTML versions for preview -->
      <div v-for="(cv, index) in cvOptions" :key="index" class="flex items-end gap-4 group">
        <span class="text-sm">{{ cv.name }}</span>
        <div class="flex-1 border-b border-dashed border-gray-300 dark:border-gray-800 group-hover:border-gray-700"></div>
        <div class="flex">
          <a 
            @click.prevent="previewCV(cv)"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-9 px-3 hover:bg-gray-100 text-gray-500 dark:hover:bg-gray-800 cursor-pointer"
            :aria-label="`Previsualizar CV en ${cv.name}`"
          >
            <div class="i-heroicons-eye h-4 w-4"></div>
          </a>
          <!-- Enlace directo para descargar PDF -->
          <a 
            :href="cv.pdfUrl" 
            :download="cv.pdfFilename"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-9 px-3 hover:bg-gray-100 text-gray-500 dark:hover:bg-gray-800"
            :aria-label="`Descargar CV en ${cv.name}`"
          >
            <div class="i-heroicons-arrow-down-tray h-4 w-4"></div>
          </a>
        </div>
      </div>
    </div>

    <UModal v-model="isPreviewOpen" :ui="{ width: 'w-full sm:max-w-4xl' }">
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold">Curriculum Vitae ({{ selectedCV?.name }})</h3>
            <UButton
              icon="i-heroicons-x-mark"
              color="gray"
              variant="ghost"
              @click="isPreviewOpen = false"
            />
          </div>
        </template>
        <div class="bg-white p-4 rounded max-h-[80vh] overflow-y-auto">
          <iframe
            v-if="selectedCV"
            :src="selectedCV.url"
            class="w-full h-[70vh] border-0"
            title="CV Preview"
          ></iframe>
        </div>
        <template #footer>
          <div class="flex justify-between">
            <UButton
              label="Cerrar"
              color="gray"
              @click="isPreviewOpen = false"
            />
            <!-- Enlace directo para descargar PDF -->
            <a 
              v-if="selectedCV"
              :href="selectedCV.pdfUrl" 
              :download="selectedCV.pdfFilename"
              class="inline-flex items-center gap-2 rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
            >
              <div class="i-heroicons-document-arrow-down h-4 w-4"></div>
              Descargar PDF
            </a>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
// Definición de la interfaz para las opciones de CV
interface CVOption {
  name: string;
  url: string;
  pdfUrl: string;
  pdfFilename: string;
  icon: string;
}

const isPreviewOpen = ref(false);
const selectedCV = ref<CVOption | null>(null);

// URLs con nombres de archivo codificados para descargas correctas
const cvOptions: CVOption[] = [
  {
    name: "Espanhol",
    url: "/cv/es.html",
    pdfUrl: "/cv/SEAN%20LUIS%20GUADA%20RODRIGUEZ_ES.pdf",
    pdfFilename: "SEAN_LUIS_GUADA_RODRIGUEZ_ES.pdf",
    icon: "mdi:spain"
  },
  {
    name: "Português",
    url: "/cv/pt.html",
    pdfUrl: "/cv/SEAN%20LUIS%20GUADA%20RODRIGUEZ_PT.pdf",
    pdfFilename: "SEAN_LUIS_GUADA_RODRIGUEZ_PT.pdf",
    icon: "mdi:brazil"
  }
];

function previewCV(cv: CVOption): void {
  selectedCV.value = cv;
  isPreviewOpen.value = true;
}

// Asegurarse de que los PDFs existan antes de mostrar los botones
onMounted(() => {
  // Opcional: Verificar existencia de archivos con fetch
  cvOptions.forEach(cv => {
    fetch(cv.pdfUrl, { method: 'HEAD' })
      .then(response => {
        if (!response.ok) {
          console.warn(`El archivo PDF ${cv.pdfUrl} no fue encontrado.`);
        }
      })
      .catch(error => {
        console.error(`Error al verificar PDF ${cv.pdfUrl}:`, error);
      });
  });
});
</script>
