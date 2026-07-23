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
          <UTooltip text="Preview CV" :ui="{ popper: { strategy: 'absolute' } }">
            <a 
              @click.prevent="previewCV(cv)"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-9 px-3 hover:bg-gray-100 text-gray-500 dark:hover:bg-gray-800 cursor-pointer"
              :aria-label="`Preview CV in ${cv.name}`"
            >
              <div class="i-heroicons-eye h-4 w-4"></div>
            </a>
          </UTooltip>
          
          <!-- Download button with tooltip -->
          <UTooltip text="Download CV" :ui="{ popper: { strategy: 'absolute' } }">
            <a 
              :href="cv.pdfUrl" 
              :download="cv.pdfFilename"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-9 px-3 hover:bg-gray-100 text-gray-500 dark:hover:bg-gray-800"
              :aria-label="`Download CV in ${cv.name}`"
            >
              <div class="i-heroicons-arrow-down-tray h-4 w-4"></div>
            </a>
          </UTooltip>
          
          <!-- Cover letter button with tooltip -->
          <UTooltip text="Cover letter" :ui="{ popper: { strategy: 'absolute' } }">
            <a 
              @click.prevent="openCoverLetterForm(cv)"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-9 px-3 hover:bg-gray-100 text-gray-500 dark:hover:bg-gray-800 cursor-pointer"
              :aria-label="`Cover letter in ${cv.name}`"
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
              label="Close"
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
              Download PDF
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
            <h3 class="text-lg font-bold">Cover Letter ({{ selectedCV?.name }})</h3>
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
            Fill in the company details to generate a personalized cover letter.
          </p>
          
          <!-- Cover letter form -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Date -->
            <UFormGroup label="Date">
              <UInput v-model="coverLetterData.date" placeholder="e.g. January 15, 2026" />
            </UFormGroup>

            <!-- Recipient name -->
            <UFormGroup label="Recipient name">
              <UInput v-model="coverLetterData.recipientName" placeholder="e.g. Jane Smith" />
            </UFormGroup>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Title -->
            <UFormGroup label="Title">
              <USelect
                v-model="coverLetterData.recipientPosition"
                :options="jobPositions"
                searchable
                placeholder="Select a title"
              />
            </UFormGroup>

            <!-- Company -->
            <UFormGroup label="Company">
              <UInput v-model="coverLetterData.companyName" placeholder="e.g. Acme Inc." required />
            </UFormGroup>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Address -->
            <UFormGroup label="Address">
              <UInput v-model="coverLetterData.address" placeholder="e.g. 123 Main St" />
            </UFormGroup>

            <!-- City, State, ZIP -->
            <UFormGroup label="City, State, ZIP">
              <UInput v-model="coverLetterData.cityStateZip" placeholder="e.g. San Francisco, CA 94105" />
            </UFormGroup>
          </div>

          <!-- Role applied for -->
          <UFormGroup label="Role you are applying for">
            <UInput
              v-model="coverLetterData.jobPosition"
              placeholder="e.g. Senior Frontend Engineer"
            />
          </UFormGroup>
        </div>

        <template #footer>
          <div class="flex justify-between">
            <UButton
              label="Close"
              color="gray"
              @click="isCoverLetterOpen = false"
            />
            <UButton
              label="Generate PDF"
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

// Add this interface for job positions
interface JobPosition {
  label: string;
  value: string;
}

const isPreviewOpen = ref(false);
const isCoverLetterOpen = ref(false);
const isGenerating = ref(false);
const selectedCV = ref<CVOption | null>(null);

// Fix the typing for jobPositions
const jobPositions = ref<JobPosition[]>([]);

const coverLetterData = ref<CoverLetterData>({
  date: new Date().toLocaleDateString(),
  recipientName: '',
  recipientPosition: '',
  companyName: '',
  address: '',
  cityStateZip: '',
  jobPosition: 'Senior Frontend Engineer'
});

const coverLetterTemplates = {
  en: `# COVER LETTER

Sean Luis Guada Rodriguez  
Florianópolis, Santa Catarina, Brazil  
seanluis47@gmail.com  
[LinkedIn](https://www.linkedin.com/in/sean-luis-guada-rodriguez-4360a5bb)

[Date]

[Recipient Name]  
[Position]  
[Company]  
[Address]  
[City, State, Zip Code]

Dear [Recipient Name],

I am writing to apply for the [Position] role. I am a founder and software engineer with hands-on experience in TypeScript (Vue/Nuxt, NestJS, React), Python/FastAPI, and blockchain (Solidity, Hedera, Arweave).

As Founder & CEO of Evercore.sh, I lead a regulated trust layer for encrypted permanent evidence, governed workflows, and agent-assisted compliance on Arweave, Hedera HCS, and IPFS. I also founded Pointerly.io (affiliate operations for creators and brands) and Berea AI (coming soon: multi-tenant knowledge agents with citations and approved tool calling). In parallel, as Sr. Frontend Engineer at AgTrace, I ship agricultural traceability DApps with Vue.js and Solidity alongside partners such as Abrapa, Reserva, C&A, and Renner.

I am the author of ERC-7893 (DeFi Protocol Solvency Proof, Final Standards Track) and contribute to aspect-evp/evp-js. Earlier roles include backend work at Syntonize and QA-Bit, plus years of freelance fullstack delivery.

I would welcome a conversation about how this mix of product leadership, standards work, and day-to-day engineering can help [Company]. More at sean-rodriguez.vercel.app.

Sincerely,

Sean Luis Guada Rodriguez`,

  es: `# CARTA DE PRESENTACIÓN

Sean Luis Guada Rodriguez  
Florianópolis, Santa Catarina, Brasil  
seanluis47@gmail.com  
[LinkedIn](https://www.linkedin.com/in/sean-luis-guada-rodriguez-4360a5bb)

[Fecha]

[Nombre del Destinatario]  
[Cargo]  
[Empresa]  
[Dirección]  
[Ciudad, Estado, Código Postal]

Estimado/a [Nombre del Destinatario]:

Me postulo al puesto de [Puesto]. Soy fundador e ingeniero de software con experiencia práctica en TypeScript (Vue/Nuxt, NestJS, React), Python/FastAPI y blockchain (Solidity, Hedera, Arweave).

Como Founder & CEO de Evercore.sh lidero una capa de confianza regulada para evidencia permanente cifrada, flujos gobernados y compliance asistido por agentes sobre Arweave, Hedera HCS e IPFS. También fundé Pointerly.io (operaciones de afiliados) y Berea AI (próximamente: agentes de conocimiento con citas y tool calling aprobado). En paralelo, como Sr. Frontend Engineer en AgTrace, construyo DApps de trazabilidad agrícola con Vue.js y Solidity junto a partners como Abrapa, Reserva, C&A y Renner.

Soy autor de ERC-7893 (DeFi Protocol Solvency Proof, Final Standards Track) y contribuyo a aspect-evp/evp-js. Antes trabajé en backend en Syntonize y QA-Bit, además de varios años como freelance fullstack.

Me gustaría conversar sobre cómo esta mezcla de liderazgo de producto, estándares e ingeniería puede aportar a [Empresa]. Más en sean-rodriguez.vercel.app.

Atentamente,

Sean Luis Guada Rodriguez`,

  pt: `# CARTA DE APRESENTAÇÃO

Sean Luis Guada Rodriguez  
Florianópolis, Santa Catarina, Brasil  
seanluis47@gmail.com  
[LinkedIn](https://www.linkedin.com/in/sean-luis-guada-rodriguez-4360a5bb)

[Data]

[Nome do Destinatário]  
[Cargo]  
[Nome da Empresa]  
[Endereço]  
[Cidade, Estado, CEP]

Prezado(a) [Nome do Destinatário],

Candidatei-me à vaga de [Puesto]. Sou fundador e engenheiro de software com experiência prática em TypeScript (Vue/Nuxt, NestJS, React), Python/FastAPI e blockchain (Solidity, Hedera, Arweave).

Como Founder & CEO da Evercore.sh lidero uma camada de confiança regulada para evidência permanente criptografada, fluxos governados e compliance assistido por agentes sobre Arweave, Hedera HCS e IPFS. Também fundei a Pointerly.io (operações de afiliados) e a Berea AI (em breve: agentes de conhecimento com citações e tool calling aprovado). Em paralelo, como Sr. Frontend Engineer na AgTrace, construo DApps de rastreabilidade agrícola com Vue.js e Solidity junto a parceiros como Abrapa, Reserva, C&A e Renner.

Sou autor do ERC-7893 (DeFi Protocol Solvency Proof, Final Standards Track) e contribuo para aspect-evp/evp-js. Antes atuei em backend na Syntonize e na QA-Bit, além de anos como freelance fullstack.

Gostaria de conversar sobre como essa combinação de liderança de produto, padrões e engenharia pode apoiar a [Nome da Empresa]. Mais em sean-rodriguez.vercel.app.

Atenciosamente,

Sean Luis Guada Rodriguez`
};

const cvOptions: CVOption[] = [
  {
    name: "English",
    url: "/cv/en.html",
    pdfUrl: "/cv/SEAN%20LUIS%20GUADA%20RODRIGUEZ_EN.pdf",
    pdfFilename: "SEAN_LUIS_GUADA_RODRIGUEZ_EN.pdf",
    icon: "mdi:united-kingdom",
    languageCode: "en"
  },
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

// Define job positions for each language
const jobPositionsMap = {
  en: [
    { label: "Senior Frontend Developer", value: "Senior Frontend Developer" },
    { label: "Senior Blockchain Developer", value: "Senior Blockchain Developer" },
    { label: "Fullstack Developer", value: "Fullstack Developer" },
    { label: "Smart Contract Engineer", value: "Smart Contract Engineer" },
    { label: "DApp Developer", value: "DApp Developer" },
    { label: "Web3 Developer", value: "Web3 Developer" },
    { label: "Frontend Engineer", value: "Frontend Engineer" },
    { label: "Blockchain Engineer", value: "Blockchain Engineer" }
  ],
  es: [
    { label: "Desarrollador Frontend Senior", value: "Desarrollador Frontend Senior" },
    { label: "Desarrollador Blockchain Senior", value: "Desarrollador Blockchain Senior" },
    { label: "Desarrollador Fullstack", value: "Desarrollador Fullstack" },
    { label: "Ingeniero de Contratos Inteligentes", value: "Ingeniero de Contratos Inteligentes" },
    { label: "Desarrollador de DApps", value: "Desarrollador de DApps" },
    { label: "Desarrollador Web3", value: "Desarrollador Web3" },
    { label: "Ingeniero Frontend", value: "Ingeniero Frontend" },
    { label: "Ingeniero Blockchain", value: "Ingeniero Blockchain" }
  ],
  pt: [
    { label: "Desenvolvedor Frontend Sênior", value: "Desenvolvedor Frontend Sênior" },
    { label: "Desenvolvedor Blockchain Sênior", value: "Desenvolvedor Blockchain Sênior" },
    { label: "Desenvolvedor Fullstack", value: "Desenvolvedor Fullstack" },
    { label: "Engenheiro de Contratos Inteligentes", value: "Engenheiro de Contratos Inteligentes" },
    { label: "Desenvolvedor de DApps", value: "Desenvolvedor de DApps" },
    { label: "Desenvolvedor Web3", value: "Desenvolvedor Web3" },
    { label: "Engenheiro Frontend", value: "Engenheiro Frontend" },
    { label: "Engenheiro Blockchain", value: "Engenheiro Blockchain" }
  ]
};

const jobPositionByLanguage = {
  en: "Senior Frontend Developer",
  es: "Desarrollador Frontend Senior",
  pt: "Desenvolvedor Frontend Sênior"
};

// Add language-specific text
const languageTexts = {
  en: {
    greeting: "Dear",
    closing: "Sincerely,",
    placeholders: {
      date: "January 15, 2024",
      recipient: "Hiring Manager",
      position: "HR Manager",
      company: "Company Name",
      address: "Company Address",
      cityStateZip: "City, State, ZIP"
    }
  },
  es: {
    greeting: "Estimado/a",
    closing: "Atentamente,",
    placeholders: {
      date: "15 de enero de 2024",
      recipient: "Responsable de Contratación",
      position: "Gerente de RRHH",
      company: "Nombre de la Empresa",
      address: "Dirección de la Empresa",
      cityStateZip: "Ciudad, Estado, Código Postal"
    }
  },
  pt: {
    greeting: "Prezado(a)",
    closing: "Atenciosamente,",
    placeholders: {
      date: "15 de janeiro de 2024",
      recipient: "Responsável pela Contratação",
      position: "Gerente de RH",
      company: "Nome da Empresa",
      address: "Endereço da Empresa",
      cityStateZip: "Cidade, Estado, CEP"
    }
  }
};

function previewCV(cv: CVOption): void {
  selectedCV.value = cv;
  isPreviewOpen.value = true;
}

function openCoverLetterForm(cv: CVOption): void {
  selectedCV.value = cv;
  isCoverLetterOpen.value = true;
  
  // Set job position options based on selected language
  const languageCode = cv.languageCode as keyof typeof jobPositionsMap;
  jobPositions.value = jobPositionsMap[languageCode] || jobPositionsMap.en;
  
  const defaultJobPosition = jobPositionByLanguage[languageCode] || 
                           "Senior Frontend Developer";
  
  coverLetterData.value = {
    date: new Date().toLocaleDateString(),
    recipientName: '',
    recipientPosition: '',
    companyName: '',
    address: '',
    cityStateZip: '',
    jobPosition: defaultJobPosition
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
    
    const languageCode = selectedCV.value.languageCode as keyof typeof languageTexts;
    const texts = languageTexts[languageCode];
    
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
    
    // Header with name and date
    pdf.setFont('times', 'bold');
    pdf.text('Sean Luis Guada Rodriguez', margin, yPos);
    pdf.setFont('times', 'normal');

    const dateText = coverLetterData.value.date || new Date().toLocaleDateString();
    pdf.text(dateText, pageWidth - margin - pdf.getTextWidth(dateText), yPos);
    
    yPos += lineHeight;
    pdf.text('Florianópolis, Santa Catarina, Brasil', margin, yPos);
    yPos += lineHeight;
    pdf.text('seanluis47@gmail.com', margin, yPos);
    yPos += lineHeight;
    pdf.text('LinkedIn: sean-luis-guada-rodriguez-4360a5bb', margin, yPos);
    yPos += lineHeight * 2;
    
    // Recipient info (only if provided)
    if (coverLetterData.value.recipientName) {
      pdf.setFont('times', 'bold');
      pdf.text(coverLetterData.value.recipientName, margin, yPos);
      pdf.setFont('times', 'normal');
      yPos += lineHeight;
    }
    
    if (coverLetterData.value.recipientPosition) {
      pdf.text(coverLetterData.value.recipientPosition, margin, yPos);
      yPos += lineHeight;
    }
    
    pdf.text(coverLetterData.value.companyName, margin, yPos);
    yPos += lineHeight;
    
    if (coverLetterData.value.address) {
      pdf.text(coverLetterData.value.address, margin, yPos);
      yPos += lineHeight;
    }
    
    if (coverLetterData.value.cityStateZip) {
      pdf.text(coverLetterData.value.cityStateZip, margin, yPos);
      yPos += lineHeight;
    }
    
    yPos += lineHeight * 1.5;
    
    // Greeting
    const recipientName = coverLetterData.value.recipientName || texts.placeholders.recipient;
    pdf.text(`${texts.greeting} ${recipientName}:`, margin, yPos);
    yPos += lineHeight * 1.5;
    
    // Body paragraphs - get from template and process
    const template = coverLetterTemplates[languageCode];
    let processedContent = template
      .replace(/\[Company\]|\[Empresa\]|\[Nome da Empresa\]/g, coverLetterData.value.companyName)
      .replace(/\[Position\]|\[Puesto\]/g, coverLetterData.value.jobPosition || jobPositionByLanguage[languageCode]);
    
    const bodyParagraphs = processedContent
      .split('\n\n')
      .filter(p => p.trim())
      .filter(p => !p.startsWith('# '))
      .filter(p => !/^Sean Luis Guada Rodriguez/.test(p))
      .filter(p => !/^\[/.test(p))
      .filter(p => !/^Dear|^Estimado|^Prezado/.test(p))
      .filter(p => !/^Sincerely|^Atentamente|^Atenciosamente/.test(p));
    
    for (let paragraph of bodyParagraphs) {
      const lines = pdf.splitTextToSize(paragraph, textWidth);
      
      if (yPos + (lines.length * lineHeight) > pdf.internal.pageSize.height - margin) {
        pdf.addPage();
        yPos = margin;
      }
      
      pdf.text(lines, margin, yPos, { align: 'justify', maxWidth: textWidth });
      yPos += lines.length * lineHeight + 3;
    }
    
    yPos += 5;
    pdf.text(texts.closing, margin, yPos);
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
    alert('Error generating the PDF. Please try again.');
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
