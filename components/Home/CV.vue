<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">CURRICULUM VITAE</h2>
    <div class="space-y-5">
      <!-- CV options with preview & download -->
      <div v-for="(cv, index) in cvOptions" :key="index" class="flex items-end gap-4 group">
        <span class="text-sm">{{ cv.name }}</span>
        <div class="flex-1 border-b border-dashed border-gray-300 dark:border-gray-800 group-hover:border-gray-700"></div>
        <div class="flex">
          <!-- Botón de previsualización con tooltip -->
          <UTooltip text="Visualizar CV" :ui="{ popper: { strategy: 'absolute' } }">
            <a 
              @click.prevent="previewCV(cv)"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-9 px-3 hover:bg-gray-100 text-gray-500 dark:hover:bg-gray-800 cursor-pointer"
              :aria-label="`Visualizar CV em ${cv.name}`"
            >
              <div class="i-heroicons-eye h-4 w-4"></div>
            </a>
          </UTooltip>
          
          <!-- Botón de descarga con tooltip -->
          <UTooltip text="Baixar CV" :ui="{ popper: { strategy: 'absolute' } }">
            <a 
              :href="cv.pdfUrl" 
              :download="cv.pdfFilename"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-9 px-3 hover:bg-gray-100 text-gray-500 dark:hover:bg-gray-800"
              :aria-label="`Baixar CV em ${cv.name}`"
            >
              <div class="i-heroicons-arrow-down-tray h-4 w-4"></div>
            </a>
          </UTooltip>
          
          <!-- Botón de carta de presentación con tooltip -->
          <UTooltip text="Carta de Apresentação" :ui="{ popper: { strategy: 'absolute' } }">
            <a 
              @click.prevent="openCoverLetterForm(cv)"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-9 px-3 hover:bg-gray-100 text-gray-500 dark:hover:bg-gray-800 cursor-pointer"
              :aria-label="`Carta de Apresentação em ${cv.name}`"
            >
              <div class="i-heroicons-envelope h-4 w-4"></div>
            </a>
          </UTooltip>
        </div>
      </div>
    </div>

    <!-- Modal para previsualización del CV -->
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
              label="Fechar"
              color="gray"
              @click="isPreviewOpen = false"
            />
            <a 
              v-if="selectedCV"
              :href="selectedCV.pdfUrl" 
              :download="selectedCV.pdfFilename"
              class="inline-flex items-center gap-2 rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
            >
              <div class="i-heroicons-document-arrow-down h-4 w-4"></div>
              Baixar PDF
            </a>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Nuevo modal para carta de presentación -->
    <UModal v-model="isCoverLetterOpen" :ui="{ width: 'w-full sm:max-w-3xl' }">
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold">Carta de Apresentação ({{ selectedCV?.name }})</h3>
            <UButton
              icon="i-heroicons-x-mark"
              color="gray"
              variant="ghost"
              @click="isCoverLetterOpen = false"
            />
          </div>
        </template>

        <div class="space-y-4 p-2">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Complete os dados da empresa para gerar uma carta de apresentação personalizada.
          </p>
          
          <!-- Formulario de carta de presentación -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Fecha -->
            <UFormGroup label="Data">
              <UInput v-model="coverLetterData.date" placeholder="ex. 15 de janeiro de 2023" />
            </UFormGroup>

            <!-- Nombre del destinatario -->
            <UFormGroup label="Nome do destinatário">
              <UInput v-model="coverLetterData.recipientName" placeholder="ex. João Silva" />
            </UFormGroup>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Cargo -->
            <UFormGroup label="Cargo">
              <UInput v-model="coverLetterData.recipientPosition" placeholder="ex. Diretor de RH" />
            </UFormGroup>

            <!-- Empresa -->
            <UFormGroup label="Empresa">
              <UInput v-model="coverLetterData.companyName" placeholder="ex. Empresa ABC" required />
            </UFormGroup>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Dirección -->
            <UFormGroup label="Endereço">
              <UInput v-model="coverLetterData.address" placeholder="ex. Av. Principal 123" />
            </UFormGroup>

            <!-- Ciudad, Estado, CP -->
            <UFormGroup label="Cidade, Estado, CEP">
              <UInput v-model="coverLetterData.cityStateZip" placeholder="ex. São Paulo, SP, 01000-000" />
            </UFormGroup>
          </div>

          <!-- Puesto -->
          <UFormGroup label="Cargo ao qual você se candidata">
            <UInput v-model="coverLetterData.jobPosition" placeholder="ex. Desenvolvedor Frontend Sênior" />
          </UFormGroup>
        </div>

        <template #footer>
          <div class="flex justify-between">
            <UButton
              label="Fechar"
              color="gray"
              @click="isCoverLetterOpen = false"
            />
            <UButton
              label="Gerar PDF"
              color="primary"
              icon="i-heroicons-document-arrow-down"
              @click="generateCoverLetterPDF"
              :loading="isGenerating"
              :disabled="!coverLetterData.companyName"
            />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface CVOption {
  name: string;
  url: string;
  pdfUrl: string;
  pdfFilename: string;
  icon: string;
  languageCode: string;
}

interface CoverLetterData {
  date: string;
  recipientName: string;
  recipientPosition: string;
  companyName: string;
  address: string;
  cityStateZip: string;
  jobPosition: string;
}

const isPreviewOpen = ref(false);
const isCoverLetterOpen = ref(false);
const isGenerating = ref(false);
const selectedCV = ref<CVOption | null>(null);

const coverLetterData = ref<CoverLetterData>({
  date: new Date().toLocaleDateString(),
  recipientName: '',
  recipientPosition: '',
  companyName: '',
  address: '',
  cityStateZip: '',
  jobPosition: 'Desarrollador Frontend Senior'
});

const coverLetterTemplates = {
  es: `# CARTA DE PRESENTACIÓN

Sean Luis Guada Rodriguez  
Florianópolis, Santa Catarina, Brasil  
seanluis47@gmail.com  
[LinkedIn](https://www.linkedin.com/in/sean-luisguada-rodriguez-4360a5bb)

[Fecha]

[Nombre del Destinatario]  
[Cargo]  
[Empresa]  
[Dirección]  
[Ciudad, Estado, Código Postal]

Estimado/a [Nombre del Destinatario]:

Me dirijo a usted con interés en formar parte de su equipo como [Puesto]. Con experiencia comprobada en tecnologías modernas como Vue.js (Nuxt.js, Pinia, Router), Node.js (NestJS, Express) y desarrollo blockchain (Solidity, Hardhat, Polygon zkEVM, Hedera Hashgraph), estoy convencido de que puedo aportar valor significativo a [Empresa].

Actualmente, como Frontend Engineer en AgTrace, lidero el desarrollo de aplicaciones descentralizadas (DApps) para el sector agrícola, implementando interfaces intuitivas con Vue.js y optimizando contratos inteligentes en Solidity que han mejorado significativamente el rendimiento y reducido los costos de transacción. Además, he colaborado en un proyecto de trazabilidad con empresas líderes como Abrapa, Reserva, C&A y Renner, proporcionando transparencia total en la cadena de suministro mediante códigos QR.

Mi experiencia previa incluye roles como Desarrollador Backend en QA-Bit, donde implementé APIs RESTful y sistemas de mensajería en tiempo real con NestJS y TypeScript, y como desarrollador freelance, creando soluciones fullstack e integrando tecnologías AWS (EC2, Route 53, Lambda, S3, CloudFront). Esta combinación de habilidades me permite abordar proyectos desde múltiples perspectivas y entregar soluciones completas y robustas.

Entre mis proyectos destacados se encuentran GitHub Open Source Explorer (una aplicación web moderna desarrollada con Nuxt 3 y Tailwind CSS) y una propuesta de estándar para verificación de solvencia en protocolos DeFi utilizando pruebas de conocimiento cero (zk). Mi enfoque en la optimización y las buenas prácticas ha sido constante en todos estos proyectos.

Además de mis habilidades técnicas, aporto una mentalidad orientada a la resolución de problemas, capacidad para trabajar en equipos multidisciplinarios y un genuino entusiasmo por las tecnologías emergentes. Mi formación incluye un Programa Especializado en Blockchain por la University at Buffalo, que complementa mi experiencia práctica en el desarrollo de aplicaciones descentralizadas.

Me entusiasma la posibilidad de contribuir al éxito de [Empresa] y discutir cómo mi experiencia y habilidades pueden apoyar sus objetivos tecnológicos. Puede encontrar más detalles sobre mis proyectos en mi portafolio: sean-rodriguez.vercel.app.

Quedo a su disposición para una entrevista en el momento que considere oportuno.

Atentamente,

Sean Luis Guada Rodriguez`,

  pt: `# CARTA DE APRESENTAÇÃO

Sean Luis Guada Rodriguez  
Florianópolis, Santa Catarina, Brasil  
seanluis47@gmail.com  
[LinkedIn](https://www.linkedin.com/in/sean-luisguada-rodriguez-4360a5bb)

[Data]

[Nome do Destinatário]  
[Cargo]  
[Nome da Empresa]  
[Endereço]  
[Cidade, Estado, CEP]

Prezado(a) [Nome do Destinatário],

Venho por meio desta manifestar meu interesse em fazer parte da sua equipe como [Puesto]. Com experiência comprovada em tecnologias modernas como Vue.js (Nuxt.js, Pinia, Router), Node.js (NestJS, Express) e desenvolvimento blockchain (Solidity, Hardhat, Polygon zkEVM, Hedera Hashgraph), estou convencido de que posso agregar valor significativo à [Nome da Empresa].

Atualmente, como Engenheiro Frontend na AgTrace, lidero o desenvolvimento de aplicações descentralizadas (DApps) para o setor agrícola, implementando interfaces intuitivas com Vue.js e otimizando contratos inteligentes em Solidity que melhoraram significativamente o desempenho e reduziram os custos de transação. Além disso, colaborei em um projeto de rastreabilidade com empresas líderes como Abrapa, Reserva, C&A e Renner, proporcionando transparência total na cadeia de suprimentos através de códigos QR.

Minha experiência anterior inclui funções como Desenvolvedor Backend na QA-Bit, onde implementei APIs RESTful e sistemas de mensageria em tempo real com NestJS e TypeScript, e como desenvolvedor freelance, criando soluções fullstack e integrando tecnologias AWS (EC2, Route 53, Lambda, S3, CloudFront). Esta combinação de habilidades me permite abordar projetos de múltiplas perspectivas e entregar soluções completas e robustas.

Entre meus projetos destacados estão o GitHub Open Source Explorer (uma aplicação web moderna desenvolvida com Nuxt 3 e Tailwind CSS) e uma proposta de padrão para verificação de solvência em protocolos DeFi utilizando provas de conhecimento zero (zk). Meu foco na otimização e boas práticas tem sido constante em todos esses projetos.

Além das minhas habilidades técnicas, trago uma mentalidade orientada à resolução de problemas, capacidade para trabalhar em equipes multidisciplinares e um genuíno entusiasmo por tecnologias emergentes. Minha formação inclui um Programa Especializado em Blockchain pela University at Buffalo, que complementa minha experiência prática no desenvolvimento de aplicações descentralizadas.

Estou entusiasmado com a possibilidade de contribuir para o sucesso da [Nome da Empresa] e discutir como minha experiência e habilidades podem apoiar seus objetivos tecnológicos. Você pode encontrar mais detalhes sobre meus projetos em meu portfólio: sean-rodriguez.vercel.app.

Fico à disposição para uma entrevista no momento que considerar oportuno.

Atenciosamente,

Sean Luis Guada Rodriguez`
};

const cvOptions: CVOption[] = [
  {
    name: "Español",
    url: "/cv/es.html",
    pdfUrl: "/cv/SEAN%20LUIS%20GUADA%20RODRIGUEZ_ES.pdf",
    pdfFilename: "SEAN_LUIS_GUADA_RODRIGUEZ_ES.pdf",
    icon: "mdi:spain",
    languageCode: "es"
  },
  {
    name: "Português",
    url: "/cv/pt.html",
    pdfUrl: "/cv/SEAN%20LUIS%20GUADA%20RODRIGUEZ_PT.pdf",
    pdfFilename: "SEAN_LUIS_GUADA_RODRIGUEZ_PT.pdf",
    icon: "mdi:brazil",
    languageCode: "pt"
  }
];

function previewCV(cv: CVOption): void {
  selectedCV.value = cv;
  isPreviewOpen.value = true;
}

function openCoverLetterForm(cv: CVOption): void {
  selectedCV.value = cv;
  isCoverLetterOpen.value = true;
  
  coverLetterData.value = {
    date: new Date().toLocaleDateString(),
    recipientName: '',
    recipientPosition: '',
    companyName: '',
    address: '',
    cityStateZip: '',
    jobPosition: 'Desarrollador Frontend Senior'
  };
}

function processTemplate(template: string, data: CoverLetterData): string {
  return template
    .replace(/\[Data\]|\[Fecha\]/g, data.date || '[Fecha]')
    .replace(/\[Nome do Destinatário\]|\[Nombre del Destinatario\]/g, 
      data.recipientName || '[Nombre del Destinatario]')
    .replace(/\[Cargo\]/g, data.recipientPosition || '[Cargo]')
    .replace(/\[Empresa\]|\[Nome da Empresa\]|\[Nombre de la Empresa\]/g, 
      data.companyName || '[Empresa]')
    .replace(/\[Endereço\]|\[Dirección\]/g, data.address || '[Dirección]')
    .replace(/\[Cidade, Estado, CEP\]|\[Ciudad, Estado, Código Postal\]/g, 
      data.cityStateZip || '[Ciudad, Estado, Código Postal]')
    .replace(/\[Puesto\]/g, data.jobPosition || 'Desarrollador Frontend Senior');
}

async function generateCoverLetterPDF() {
  if (!selectedCV.value || !coverLetterData.value.companyName) return;
  
  isGenerating.value = true;
  try {
    const { jsPDF } = await import('jspdf');
    
    const template = coverLetterTemplates[selectedCV.value.languageCode as keyof typeof coverLetterTemplates];
    if (!template) throw new Error(`No hay plantilla disponible para idioma: ${selectedCV.value.languageCode}`);
    
    const isSpa = selectedCV.value.languageCode === 'es';
    const greeting = isSpa ? 'Estimado/a' : 'Prezado(a)';
    const closing = isSpa ? 'Atentamente,' : 'Atenciosamente';
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    pdf.setFont('times', 'normal');
    pdf.setFontSize(11);
    
    const margin = 20;
    const pageWidth = pdf.internal.pageSize.width;
    const textWidth = pageWidth - (margin * 2);
    
    let yPos = margin;
    const lineHeight = 5;
    
    pdf.setFont('times', 'bold');
    pdf.text('Sean Luis Guada Rodriguez', margin, yPos);
    pdf.setFont('times', 'normal');

    const dateText = coverLetterData.value.date || '[Fecha]';
    pdf.text(dateText, pageWidth - margin - pdf.getTextWidth(dateText), yPos);
    
    yPos += lineHeight;
    pdf.text('Florianópolis, Santa Catarina, Brasil', margin, yPos);
    yPos += lineHeight;
    pdf.text('seanluis47@gmail.com', margin, yPos);
    yPos += lineHeight;
    
    pdf.text('LinkedIn: sean-luisguada-rodriguez-4360a5bb', margin, yPos);
    yPos += lineHeight * 2;
    
    pdf.setFont('times', 'bold');
    pdf.text(coverLetterData.value.recipientName || '[Nombre del Destinatario]', margin, yPos);
    pdf.setFont('times', 'normal');
    yPos += lineHeight;
    
    pdf.text(coverLetterData.value.recipientPosition || '[Cargo]', margin, yPos);
    yPos += lineHeight;
    
    pdf.text(coverLetterData.value.companyName || '[Empresa]', margin, yPos);
    yPos += lineHeight;
    
    pdf.text(coverLetterData.value.address || '[Dirección]', margin, yPos);
    yPos += lineHeight;
    
    pdf.text(coverLetterData.value.cityStateZip || '[Ciudad, Estado, Código Postal]', margin, yPos);
    yPos += lineHeight * 1.5;
    
    pdf.text(`${greeting} ${coverLetterData.value.recipientName || '[Nombre del Destinatario]'}:`, margin, yPos);
    yPos += lineHeight * 1.5;
    
    const bodyParagraphs = template
      .split('\n\n')
      .filter(p => p.trim())
      .filter(p => !p.startsWith('# '))
      .filter(p => !/^Sean Luis Guada Rodriguez/.test(p))
      .filter(p => !/^\[Fecha\]|\[Data\]/.test(p))
      .filter(p => !/^\[Nombre del Destinatario\]|\[Nome do Destinatário\]/.test(p))
      .filter(p => !/^Estimado|^Prezado/.test(p))
      .filter(p => !/^Atentamente|^Atenciosamente/.test(p))
      .map(p => p.replace(/\[Empresa\]|\[Nome da Empresa\]/g, coverLetterData.value.companyName || '[Empresa]')
               .replace(/\[Puesto\]/g, coverLetterData.value.jobPosition || 'Desarrollador Frontend Senior'));
    
    for (let paragraph of bodyParagraphs) {
      const lines = pdf.splitTextToSize(paragraph, textWidth);
      
      if (yPos + (lines.length * lineHeight) > pdf.internal.pageSize.height - margin) {
        pdf.addPage();
        yPos = margin;
      }
      
      pdf.text(lines, margin, yPos, { align: 'justify', maxWidth: textWidth });
      yPos += lines.length * lineHeight + 2;
    }
    
    yPos += 3;
    pdf.text(closing, margin, yPos);
    yPos += lineHeight * 2;
    
    pdf.setFont('times', 'bold');
    pdf.text('Sean Luis Guada Rodriguez', margin, yPos);
    
    const safeCompanyName = coverLetterData.value.companyName
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/gi, '')
      .substring(0, 20);
    
    const filename = `Carta-${selectedCV.value.languageCode.toUpperCase()}-${safeCompanyName}.pdf`;
    pdf.save(filename);
    
    setTimeout(() => {
      isCoverLetterOpen.value = false;
    }, 500);
    
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    alert('Error al generar el PDF. Por favor, inténtalo de nuevo.');
  } finally {
    isGenerating.value = false;
  }
}

onMounted(() => {
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

<style scoped>
.prose {
  font-size: 1rem;
  line-height: 1.6;
}
</style>
