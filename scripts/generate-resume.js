import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'pt',
  format: 'a4'
});

// Dimensions for A4: 595.28 x 841.89 pt
const margin = 40;
let y = margin + 10;

// Header
doc.setFont('helvetica', 'bold');
doc.setFontSize(22);
doc.setTextColor(15, 23, 42); // slate-900
doc.text('Uttam Kumar Mahto', 595.28 / 2, y, { align: 'center' });
y += 18;

doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(2, 132, 199); // cyan-600
doc.text('Full Stack & Backend Systems Engineer', 595.28 / 2, y, { align: 'center' });
y += 16;

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(71, 85, 105); // slate-600
const contactText = 'Bangalore, India • mahtouttamkumar01@gmail.com • +91-8147747120 • github.com/chiku97';
doc.text(contactText, 595.28 / 2, y, { align: 'center' });
y += 14;

// Divider
doc.setDrawColor(203, 213, 225);
doc.setLineWidth(1);
doc.line(margin, y, 595.28 - margin, y);
y += 16;

// Helper section header
function addSectionHeader(title) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(title.toUpperCase(), margin, y);
  y += 4;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.8);
  doc.line(margin, y, 595.28 - margin, y);
  y += 12;
}

// Professional Summary
addSectionHeader('Professional Summary');
doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(51, 65, 85);
const summary = 'Backend-Focused Full Stack Engineer with 3+ years of experience designing and developing scalable, high-performance web applications across Healthcare, EdTech, and RetailTech domains. Strong expertise in Node.js, Express.js, React.js, Go, Ruby on Rails, PostgreSQL, MySQL, Redis, Elasticsearch, Docker, AWS, and CI/CD. Hands-on experience building multi-tenant architectures, high-concurrency assessment platforms, and production RAG pipelines with pgvector, Elasticsearch hybrid search, and OpenAI/Gemini LLMs.';
const splitSummary = doc.splitTextToSize(summary, 595.28 - margin * 2);
doc.text(splitSummary, margin, y);
y += splitSummary.length * 12 + 10;

// Technical Skills
addSectionHeader('Technical Skills');
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(51, 65, 85);

const skills = [
  { label: 'Languages', val: 'JavaScript (ES6+), TypeScript, Go (Golang), Ruby, SQL' },
  { label: 'Backend & APIs', val: 'Node.js, Express.js, Go, Ruby on Rails, REST APIs, Microservices, RBAC' },
  { label: 'Databases & AI', val: 'PostgreSQL, pgvector, Elasticsearch, Redis Cluster, MySQL, Vector Embeddings' },
  { label: 'Frontend', val: 'React 19, Vite, Three.js WebGL, Next.js, Redux Toolkit, Tailwind CSS, HTML5' },
  { label: 'Cloud & DevOps', val: 'Docker, AWS (EC2, S3, RDS), Kubernetes, Drone CI, Jenkins, Nginx, CI/CD' },
  { label: 'Testing & Tools', val: 'Cypress E2E, Jest, Mocha, Chai, Postman, Grafana, Git' }
];

skills.forEach(s => {
  doc.setFont('helvetica', 'bold');
  doc.text(`${s.label}: `, margin, y);
  const labelWidth = doc.getTextWidth(`${s.label}: `);
  doc.setFont('helvetica', 'normal');
  doc.text(s.val, margin + labelWidth, y);
  y += 12;
});
y += 8;

// Experience
addSectionHeader('Professional Experience');

function addExperience(role, company, date, bullets) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(`${role} — ${company}`, margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(date, 595.28 - margin, y, { align: 'right' });
  y += 12;

  bullets.forEach(b => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const splitB = doc.splitTextToSize(`•  ${b}`, 595.28 - margin * 2 - 10);
    doc.text(splitB, margin + 5, y);
    y += splitB.length * 11 + 2;
  });
  y += 6;
}

addExperience(
  'Full Stack Developer (1 Mo Notice)',
  'SnapBizz CloudTech Pvt. Ltd. (Bangalore)',
  'Feb 2026 – Present',
  [
    'Architected and built the IRCTC Catering Billing and Management Dashboard, managing high-frequency transactions and multi-tenant inventory reconciliation.',
    'Engineered production Hybrid RAG & Vector search pipeline fusing Elasticsearch BM25 and PostgreSQL pgvector (RRF) with sub-20ms latency across 100,000+ SKUs.',
    'Designed and developed scalable Node.js & Express.js backend services handling multi-warehouse transfers and high-frequency stock reconciliation.',
    'Implemented multi-tenant architectures with isolated tenant schemas and RBAC, ensuring enterprise clients like IRCTC and Axis Bank never leak cross-tenant data.'
  ]
);

addExperience(
  'Full Stack Engineer',
  'INCANUS Technologies Pvt. Ltd.',
  'Nov 2023 – Jan 2026',
  [
    'Engineered high-concurrency online examination platform handling 1,000+ simultaneous test-takers with zero session drops.',
    'Implemented real-time code evaluation engine with Docker container sandboxing to safely execute untrusted Python, Java, and C++ code.',
    'Cut test submission latency by 45% using Redis caching for session tokens and question state, decoupling write-heavy progress syncs.',
    'Refactored legacy monolith into RESTful microservices, reducing CI/CD pipeline deployment times from 25 minutes down to 4 minutes.'
  ]
);

addExperience(
  'Associate Software Engineer',
  'Cerner Healthcare Solutions India (Oracle)',
  'Feb 2022 – Oct 2023',
  [
    'Built patient data ingestion pipelines conforming to FHIR and HL7 healthcare standards for enterprise hospital platforms.',
    'Collaborated with US-based clinical teams to build React dashboards visualizing longitudinal patient health metrics.',
    'Achieved 90%+ unit test coverage using Mocha, Chai, and Jest, establishing automated linting and security audit checks.'
  ]
);

// Education
addSectionHeader('Education');
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(15, 23, 42);
doc.text('Master of Computer Applications (MCA) — Reva University, Bangalore', margin, y);
doc.setFont('helvetica', 'normal');
doc.setTextColor(100, 116, 139);
doc.text('2020 – 2022', 595.28 - margin, y, { align: 'right' });
y += 13;

doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(15, 23, 42);
doc.text('Bachelor of Science in Information Technology (B.Sc IT) — Ranchi University', margin, y);
doc.setFont('helvetica', 'normal');
doc.setTextColor(100, 116, 139);
doc.text('2016 – 2019', 595.28 - margin, y, { align: 'right' });

// Output PDF to public/
const outputDir = path.resolve('public');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
const outputPath = path.join(outputDir, 'Uttam_Kumar_Mahto_Resume.pdf');
const pdfBytes = doc.output('arraybuffer');
fs.writeFileSync(outputPath, Buffer.from(pdfBytes));
console.log('✅ Generated official PDF at:', outputPath);
