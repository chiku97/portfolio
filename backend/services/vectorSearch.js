// backend/services/vectorSearch.js
// In-Memory Vector Search Engine for Uttam Kumar Mahto's Resume (Zero Database)
// Computes high-dimensional vector representations & Cosine Similarity in pure JavaScript memory (<1ms).

/**
 * 14 High-Fidelity Semantic Resume Chunks
 */
export const RESUME_CHUNKS = [
  {
    id: "candidate_status_availability",
    title: "Current Employment & 1-Month Notice Period",
    section: "Logistics & Status",
    text: "Uttam Kumar Mahto is currently working as a Full Stack Developer at SnapBizz CloudTech Pvt. Ltd. in Bangalore. He has a standard 1-month notice period and is actively seeking full-time backend or full-stack software engineering roles in Bangalore or Remote. Email: mahtouttamkumar01, Phone: +91-8147747120, GitHub: github.com/chiku97.",
    keywords: [
      "currently", "working", "current", "company", "snapbizz", "cloudtech", "notice", "period", "1", "month",
      "immediate", "available", "availability", "join", "relocate", "remote", "bangalore", "role", "full", "stack",
      "backend", "engineer", "hire", "contact", "email", "phone", "job", "status"
    ]
  },
  {
    id: "snapbizz_irctc_dashboard",
    title: "SnapBizz: IRCTC Catering Billing & Management Dashboard",
    section: "Work Experience - SnapBizz",
    text: "At SnapBizz CloudTech, Uttam architected and built the IRCTC Catering Billing and Management Dashboard. It orchestrates high-frequency billing transactions, inventory tracking, order reconciliation, and multi-tenant schema isolation ensuring Indian Railways data never collides with third-party vendors under strict enterprise SLAs.",
    keywords: [
      "irctc", "catering", "billing", "management", "dashboard", "snapbizz", "indian", "railways", "orders",
      "reconciliation", "high", "frequency", "multi-tenant", "schema", "partitioning", "isolation", "transactions",
      "pos", "invoices", "enterprise"
    ]
  },
  {
    id: "snapbizz_hybrid_rag",
    title: "SnapBizz: Production Hybrid RAG & Vector Search (sub-20ms, 100k+ SKUs)",
    section: "Work Experience - SnapBizz",
    text: "Uttam engineered a production Hybrid RAG (Retrieval Augmented Generation) and Vector search pipeline at SnapBizz CloudTech. Fused Elasticsearch BM25 for typo tolerance with PostgreSQL pgvector for semantic search, utilizing Reciprocal Rank Fusion (RRF). Achieved sub-20ms latency across 100,000+ SKUs with zero hallucinations and verified audit trails.",
    keywords: [
      "rag", "hybrid", "vector", "search", "elasticsearch", "bm25", "postgresql", "pgvector", "rrf", "reciprocal",
      "rank", "fusion", "sub-20ms", "latency", "100000", "100k", "skus", "embeddings", "cosine", "similarity",
      "typo", "tolerance", "fuzziness", "retrieval", "hallucination"
    ]
  },
  {
    id: "snapbizz_microservices_redis",
    title: "SnapBizz: Retail Microservices & Redis Caching Layer",
    section: "Work Experience - SnapBizz",
    text: "At SnapBizz CloudTech, Uttam architected Node.js and Express.js backend microservices handling multi-warehouse transfers and live stock reconciliation across nationwide retail networks. Built a Redis caching layer for hot inventory tables and catalog lookups, sustaining peak nationwide flash transactions without database degradation.",
    keywords: [
      "snapbizz", "microservices", "redis", "caching", "hot", "inventory", "tables", "nationwide", "flash",
      "deals", "warehouse", "transfers", "mysql", "stock", "reconciliation", "nodejs", "express", "aws", "docker"
    ]
  },
  {
    id: "incanus_eval_engine",
    title: "INCANUS: High-Concurrency Assessment Engine (10,000+ Students)",
    section: "Work Experience - INCANUS",
    text: "At INCANUS Technologies, Uttam engineered the high-concurrency online evaluation engine for coding assessments handling 10,000+ simultaneous test-taking students with zero session drops. Handled nationwide engineering recruitment drives without downtime.",
    keywords: [
      "incanus", "examination", "assessment", "high", "concurrency", "10000", "concurrent", "students",
      "examinees", "test", "takers", "zero", "session", "drops", "evaluation", "engine", "scale", "recruitment"
    ]
  },
  {
    id: "incanus_docker_sandbox",
    title: "INCANUS: Sandboxed Docker Code Execution Runners",
    section: "Work Experience - INCANUS",
    text: "At INCANUS Technologies, Uttam sandboxed untrusted candidate code execution (Python, Java, C++, JS) inside ephemeral Docker containers with CPU/RAM throttles (128MB caps), disabled network access, and zero container escapes.",
    keywords: [
      "docker", "sandbox", "sandboxed", "containers", "untrusted", "candidate", "code", "runner", "isolation",
      "cpu", "ram", "throttles", "security", "escapes", "python", "java", "c++", "incanus", "ephemeral"
    ]
  },
  {
    id: "incanus_queues_cicd",
    title: "INCANUS: Redis Priority Queues & Automated CI/CD",
    section: "Work Experience - INCANUS",
    text: "At INCANUS Technologies, Uttam engineered Redis priority job queues and real-time evaluation telemetry with sub-2s feedback. Eliminated critical N+1 MySQL queries, reducing API response times by 40%. Automated CI/CD using Drone CI and Docker, cutting deployment time from 25 minutes down to 4 minutes with end-to-end Cypress test suites.",
    keywords: [
      "redis", "priority", "queues", "telemetry", "n+1", "queries", "mysql", "optimization", "drone", "ci",
      "cicd", "automated", "testing", "cypress", "mocha", "chai", "deployment", "4", "minutes", "incanus"
    ]
  },
  {
    id: "cerner_healthcare_interop",
    title: "Cerner Healthcare: HIPAA Interoperability (HL7 / FHIR)",
    section: "Work Experience - Cerner",
    text: "At Cerner Healthcare Solutions (Oracle), Uttam engineered clinical healthcare data interoperability pipelines adhering to HIPAA compliance. Developed backend modules for clinician Activity Logs and Medication Workflow conforming to HL7 and FHIR clinical data exchange standards.",
    keywords: [
      "cerner", "oracle", "healthcare", "hipaa", "hl7", "fhir", "clinical", "data", "interoperability",
      "medication", "workflow", "activity", "logs", "hospital", "compliance", "ruby", "rails", "patient"
    ]
  },
  {
    id: "cerner_react_observability",
    title: "Cerner Healthcare: React Dashboards & Observability",
    section: "Work Experience - Cerner",
    text: "At Cerner Healthcare Solutions, Uttam developed high-performance, responsive React.js components for clinician dashboards, focusing on render speed and fast patient record retrieval. Set up observability alerts and tracing using Grafana and New Relic with 90%+ unit test coverage (Mocha, Chai, Jest).",
    keywords: [
      "cerner", "react", "clinician", "dashboards", "grafana", "new", "relic", "observability", "tracing",
      "metrics", "unit", "test", "coverage", "mocha", "chai", "jest", "latency", "regressions"
    ]
  },
  {
    id: "education_degrees",
    title: "Education: Master of Computer Applications (MCA) & B.Sc IT",
    section: "Education",
    text: "Uttam holds a Master of Computer Applications (MCA) from Reva University, Bangalore (2020–2022) with focus on advanced software engineering, distributed systems, and database design. He holds a Bachelor of Science in Information Technology (B.Sc IT) from Marwari College, Ranchi University (2016–2019).",
    keywords: [
      "education", "degree", "degrees", "university", "college", "mca", "master", "computer", "applications",
      "reva", "bangalore", "b.sc", "bachelor", "science", "information", "technology", "marwari", "ranchi",
      "study", "studied", "graduated", "school", "academics"
    ]
  },
  {
    id: "core_tech_stack",
    title: "Core Technical Stack & Engineering Strengths",
    section: "Technical Skills",
    text: "Uttam's primary production stack: Node.js, Express.js, Go (Golang), PostgreSQL, pgvector, Redis Cluster, Elasticsearch, Docker, AWS (EC2, S3, RDS), React 19, JavaScript (ES6+), TypeScript, Microservices, and REST APIs.",
    keywords: [
      "tech", "stack", "skills", "languages", "tools", "arsenal", "nodejs", "express", "golang", "go",
      "postgresql", "pgvector", "redis", "elasticsearch", "docker", "aws", "react", "typescript", "javascript",
      "backend", "apis", "kafka", "rest"
    ]
  },
  {
    id: "negative_skills_guardrail",
    title: "Technologies Not Specialized in Production (Boundary Guardrails)",
    section: "Skill Boundaries",
    text: "Uttam does NOT specialize in Spring Boot / Enterprise Java, C# / .NET, PHP / WordPress, native mobile apps (iOS Swift, Android Kotlin, Flutter), or Rust in production. His core verified production strength is Node.js, Go, PostgreSQL, Redis, Elasticsearch, and React.",
    keywords: [
      "spring", "boot", "java", "enterprise", ".net", "c#", "php", "wordpress", "rust", "swift", "kotlin",
      "flutter", "ios", "android", "mobile", "apps", "negative", "non", "specialized", "know"
    ]
  },
  {
    id: "database_tuning_indexes",
    title: "Database Performance Tuning & Indexing Benchmarks",
    section: "Database Engineering",
    text: "PostgreSQL composite covering B-Tree indexes with INCLUDE clauses enabling Index-Only Scans, reducing sequential scans from 1,800ms down to 3.2ms. PostgreSQL EXPLAIN ANALYZE query planning, partition pruning on time-series retail tables, and Redis Redlock distributed locking to prevent multi-tenant race conditions.",
    keywords: [
      "database", "sql", "optimization", "indexing", "covering", "index", "b-tree", "include", "index-only",
      "scans", "explain", "analyze", "sequential", "scan", "1800ms", "3.2ms", "redis", "redlock", "distributed",
      "locks", "partition", "pruning"
    ]
  },
  {
    id: "contact_social_links",
    title: "Direct Contact & Social Profiles",
    section: "Contact",
    text: "Uttam Kumar Mahto can be contacted directly at mahtouttamkumar01 or by phone at +91-8147747120. LinkedIn: https://www.linkedin.com/in/uttam-kumar-mahto-b160bb197/ | GitHub: https://github.com/chiku97. Located in Bangalore, India.",
    keywords: [
      "contact", "email", "phone", "call", "reach", "talk", "interview", "hire", "linkedin", "github",
      "uttam", "kumar", "mahto", "bangalore", "profile", "portfolio", "connect", "message"
    ]
  }
];

// Build global vocabulary for in-memory TF-IDF vectorization
const VOCABULARY = Array.from(new Set(
  RESUME_CHUNKS.flatMap(c => c.keywords)
)).sort();

const VOCAB_MAP = new Map(VOCABULARY.map((word, idx) => [word, idx]));
const TOTAL_DOCS = RESUME_CHUNKS.length;

// Compute Inverse Document Frequency (IDF) for all vocabulary terms
const IDF = new Float32Array(VOCABULARY.length);
for (let i = 0; i < VOCABULARY.length; i++) {
  const term = VOCABULARY[i];
  const docCount = RESUME_CHUNKS.filter(c => c.keywords.includes(term)).length;
  // Standard smoothed IDF: ln((N + 1) / (df + 1)) + 1
  IDF[i] = Math.log((TOTAL_DOCS + 1) / (docCount + 1)) + 1.0;
}

/**
 * Convert a list of words/text into a normalized in-memory vector
 */
export function vectorizeText(textOrTokens) {
  const tokens = Array.isArray(textOrTokens)
    ? textOrTokens
    : textOrTokens.toLowerCase().split(/[\s,.;:!?()\[\]{}'"]+/).filter(Boolean);

  const vec = new Float32Array(VOCABULARY.length);
  const termCounts = new Map();

  for (const token of tokens) {
    termCounts.set(token, (termCounts.get(token) || 0) + 1);
  }

  let squaredNorm = 0;
  termCounts.forEach((count, token) => {
    const idx = VOCAB_MAP.get(token);
    if (idx !== undefined) {
      const tf = Math.sqrt(count); // Sublinear term frequency
      const tfidf = tf * IDF[idx];
      vec[idx] = tfidf;
      squaredNorm += tfidf * tfidf;
    }
  });

  // L2 Normalization (so dot product equals cosine similarity)
  if (squaredNorm > 0) {
    const norm = Math.sqrt(squaredNorm);
    for (let i = 0; i < vec.length; i++) {
      vec[i] /= norm;
    }
  }

  return vec;
}

// Pre-compute normalized vectors for all 14 chunks in memory at boot
export const CHUNK_VECTORS = RESUME_CHUNKS.map(chunk => ({
  chunk,
  vector: vectorizeText([...chunk.keywords, ...chunk.text.toLowerCase().split(/\s+/)])
}));

/**
 * Pure In-Memory Cosine Similarity Calculation
 * @param {Float32Array} vecA
 * @param {Float32Array} vecB
 * @returns {number} Value in [0.0, 1.0]
 */
export function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
  }
  return Math.max(0, Math.min(1, dotProduct));
}

/**
 * Perform high-speed In-Memory Vector Search
 * @param {string} query User query
 * @param {number} topK Number of top chunks to retrieve (default: 3)
 * @returns {Object} Matches, scores, and telemetry
 */
export function inMemoryVectorSearch({ query, topK = 3 }) {
  const startTime = performance.now();
  const queryVec = vectorizeText(query);

  const scoredMatches = CHUNK_VECTORS.map(({ chunk, vector }) => {
    const score = cosineSimilarity(queryVec, vector);
    return {
      id: chunk.id,
      title: chunk.title,
      section: chunk.section,
      text: chunk.text,
      similarityScore: Number(score.toFixed(4))
    };
  });

  // Rank descending by similarity score
  scoredMatches.sort((a, b) => b.similarityScore - a.similarityScore);

  const topMatches = scoredMatches.slice(0, topK);
  const latencyMs = Number((performance.now() - startTime).toFixed(3));

  return {
    matches: topMatches,
    topScore: topMatches[0]?.similarityScore || 0,
    topMatch: topMatches[0] || null,
    latencyMs,
    dimensions: VOCABULARY.length,
    algorithm: "In-Memory Vector Cosine Similarity (Zero Database)",
    totalChunksScanned: RESUME_CHUNKS.length
  };
}
