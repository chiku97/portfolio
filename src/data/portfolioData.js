export const personalInfo = {
  name: "Uttam Kumar Mahto",
  role: "Full Stack & Backend Systems Engineer",
  location: "Bangalore, Karnataka, India",
  email: "mahtouttamkumar01@gmail.com",
  phone: "+91-8147747120",
  linkedin: "https://www.linkedin.com/in/uttam-kumar-mahto-b160bb197/",
  github: "https://github.com/chiku97",
  status: {
    honest: "⚡ Currently at SnapBizz CloudTech (1 Month Notice Period) — open for high-impact backend & full-stack roles in Bangalore or remote",
    pro: "● Currently at SnapBizz CloudTech • 1 Month Notice Period • Open to Full-Time Roles (Bangalore / Remote)"
  },
  bio: {
    honest: "Full Stack Engineer currently at SnapBizz CloudTech (1 month notice) with 3+ years of turning espresso into pull requests, untangling 4,000-line legacy Node.js files, and diplomatically explaining why 'just asking ChatGPT' won't solve multi-tenant race conditions. I specialize in backend architectures that survive real human chaos, unindexed 10-million-row queries, and that one developer who pushes directly to main because 'it worked fine on my MacBook'.",
    pro: "Backend-Focused Full Stack Engineer with 3+ years of experience designing and developing scalable, high-performance web applications across Healthcare, EdTech, and RetailTech domains. Strong expertise in Node.js, Express.js, React.js, Go, Ruby on Rails, PostgreSQL, MySQL, Redis, Elasticsearch, Docker, AWS, and CI/CD. Currently at SnapBizz CloudTech architecting the IRCTC Catering Billing and Management Dashboard and a production Hybrid RAG search engine (BM25 + pgvector + RRF) running sub-20ms across 100,000+ SKUs."
  },
  engineeringTruth: {
    honest: "Every modern distributed system is basically two rubber bands, a Redis cache praying for dear life, and a cron job that nobody remembers who wrote. 95% of production downtime isn't complex algorithms — it's someone pushing at 4:59 PM on Friday because 'it's just a one-line config change'.",
    pro: "Production systems require intentional architecture: strict tenant isolation, defensive database indexing, comprehensive observability, and automated CI/CD regression gates."
  },
  stats: [
    { label: "Production Experience", value: "3+ Years", detail: "RetailTech, EdTech & Healthcare" },
    { label: "Concurrent Examinees Handled", value: "1,000+", detail: "Real-time evaluation sandboxes" },
    { label: "Search & Database Response", value: "Sub-20ms", detail: "Elasticsearch BM25 + pgvector (RRF) across 100k+ SKUs" },
    { label: "Production RAG Pipelines", value: "Hybrid RRF", detail: "Elasticsearch BM25 + PostgreSQL pgvector" }
  ]
};

export const experiences = [
  {
    id: "snapbizz",
    company: "SnapBizz CloudTech Pvt. Ltd.",
    role: "Full Stack Developer",
    period: "Feb 2026 – Present",
    location: "Bangalore, Karnataka",
    badge: "Current (1 Mo Notice)",
    platform: "IRCTC Catering Billing Dashboard & Retail Platform",
    overview: {
      honest: "Currently at SnapBizz CloudTech with a 1-month notice period. Architected the IRCTC Catering Billing and Management Dashboard, multi-tenant inventory reconciliation microservices, and a production Hybrid RAG search engine (BM25 + pgvector + RRF) delivering sub-20ms latency across 100,000+ SKUs.",
      pro: "Architecting the IRCTC Catering Billing & Management Dashboard alongside retail warehouse microservices. Engineered a production Hybrid RAG and Vector search pipeline fusing Elasticsearch BM25 and PostgreSQL pgvector (RRF) with sub-20ms latency across 100,000+ SKUs."
    },
    bulletPoints: [
      {
        honest: "Architected and built the IRCTC Catering Billing and Management Dashboard, handling high-frequency transactions and billing flows without race conditions.",
        pro: "Architected and built the IRCTC Catering Billing and Management Dashboard, managing high-frequency transactions, billing automation, and multi-tenant inventory reconciliation."
      },
      {
        honest: "Engineered production Hybrid RAG search combining Elasticsearch BM25 (typo tolerance) with PostgreSQL pgvector (semantic search) via Reciprocal Rank Fusion (RRF) — sub-20ms across 100,000+ SKUs.",
        pro: "Engineered a production Hybrid RAG (Retrieval Augmented Generation) and Vector search pipeline fusing Elasticsearch BM25 for typo tolerance with PostgreSQL pgvector for semantic search, utilizing Reciprocal Rank Fusion (RRF) to achieve sub-20ms latency across 100,000+ SKUs."
      },
      {
        honest: "Wrote Node.js backend microservices capable of surviving erratic warehouse WiFi that drops packets whenever someone turns on a microwave.",
        pro: "Designed and developed scalable Node.js and Express.js backend services handling inventory tracking, multi-warehouse transfers, and high-frequency stock reconciliation."
      },
      {
        honest: "Prevented multi-tenant database catastrophes: IRCTC and Axis Bank data are strictly partitioned at the schema layer, meaning 0.00% chance of an Indian Railways cashier accidentally booking Axis Bank credit margins.",
        pro: "Implemented strict multi-tenant architecture with isolated tenant schemas and Role-Based Access Control (RBAC) ensuring enterprise clients like IRCTC and Axis Bank never leak cross-tenant data."
      },
      {
        honest: "Inserted Redis between our API and MySQL so our database doesn't spontaneously combust every time nationwide flash deals or mass stock reconciliations trigger.",
        pro: "Built a Redis caching layer for hot inventory tables and catalog lookups, cutting repeated MySQL database queries and sustaining peak transactional traffic."
      },
      {
        honest: "Banished the sacred developer excuse 'well, it worked fine on my machine' by wrapping everything in Docker and deploying cleanly to AWS.",
        pro: "Containerized services via Docker and managed zero-downtime rolling AWS deployments."
      }
    ],
    techStack: [
      "Node.js", "Express.js", "PostgreSQL", "pgvector", "MySQL",
      "Elasticsearch", "Redis", "React.js", "Vue.js", "Docker", "AWS", "LLM APIs"
    ]
  },
  {
    id: "incanus",
    company: "INCANUS Technologies Pvt. Ltd.",
    role: "Full Stack Developer",
    period: "Nov 2024 – Jan 2026",
    location: "Bangalore, Karnataka",
    badge: "1.2 Years",
    platform: "Online Examination & Automated Code Evaluation Platform",
    overview: {
      honest: "Built the examination engine where 10,000 panicking students hit 'Submit' at the exact same millisecond while trying to run infinite while-loops, fork bombs, and crypto miners inside our code runner.",
      pro: "Engineered high-concurrency exam backend architectures supporting nationwide recruitment drives with integrated browser-based coding sandboxes."
    },
    bulletPoints: [
      {
        honest: "Armored our REST APIs against the 10:00:00 AM DDoS disguised as an engineering entrance exam. Not a single dropped session or fried EC2 instance.",
        pro: "Engineered backend REST APIs supporting thousands of concurrent examinees submitting answers and code solutions simultaneously during peak assessment windows."
      },
      {
        honest: "Jailed student code execution in isolated Docker sandboxes so curious candidates couldn't run 'rm -rf /*' or try to inspect our evaluation server passwords.",
        pro: "Integrated an in-browser VS Code / Monaco coding playground with sandboxed Docker evaluation runners to safely execute untrusted candidate code without security escapes."
      },
      {
        honest: "Hunted down and eradicated N+1 queries like they owed me money. Saved our MySQL database CPU from reaching thermonuclear temperatures.",
        pro: "Eliminated critical N+1 queries and optimized complex evaluation queries in MySQL, achieving a 40% reduction in API response times under high concurrency."
      },
      {
        honest: "Automated tests so ruthlessly with Cypress and Mocha that broken code died in CI before it could embarrass us in front of the clients.",
        pro: "Automated CI/CD pipelines using Drone CI and Docker, accompanied by end-to-end Cypress test suites and Mocha/Chai backend unit tests."
      }
    ],
    techStack: [
      "Node.js", "Express.js", "React.js", "Vue.js", "MySQL",
      "Docker", "AWS EC2", "Drone CI", "Cypress", "Mocha", "Chai"
    ]
  },
  {
    id: "cerner",
    company: "Cerner Healthcare Solutions (Oracle)",
    role: "Software Engineer",
    period: "Feb 2022 – Aug 2023",
    location: "Bangalore, Karnataka",
    badge: "1.5 Years",
    platform: "HealtheIntent Enterprise Healthcare Platform",
    overview: {
      honest: "Wrote enterprise healthcare software where a null pointer exception isn't just an alert in Slack — it's an existential crisis. If you like high-stakes backend pressure, this is it.",
      pro: "Developed mission-critical medication management services and HIPAA-compliant activity audit logs using Ruby on Rails and React.js."
    },
    bulletPoints: [
      {
        honest: "Engineered clinician audit logs so tamper-proof that they could testify in a federal court hearing without needing a lawyer.",
        pro: "Owned and developed backend modules for clinician Activity Logs and Medication Workflow services using Ruby on Rails and PostgreSQL."
      },
      {
        honest: "Built clinician React UI that rendered instantly, because doctors dealing with medical emergencies don't appreciate aesthetic loading spinners.",
        pro: "Built high-performance, responsive React.js components for clinician dashboards, focusing on render speed and fast patient record retrieval."
      },
      {
        honest: "Monitored Grafana & New Relic like a hawk to catch latency regressions before the hospital on-call pager could give me heart palpitations.",
        pro: "Set up observability alerts and tracing using Grafana and New Relic to detect query latency regressions before impacting hospital clinicians."
      }
    ],
    techStack: [
      "Ruby on Rails", "Node.js", "React.js", "PostgreSQL",
      "Redis", "Docker", "Jenkins", "Grafana", "New Relic"
    ]
  }
];

export const projects = [
  {
    id: "rag-analytics-chatbot",
    title: "Production Hybrid RAG & Vector Search Pipeline",
    subtitle: "Elasticsearch BM25 + PostgreSQL pgvector via Reciprocal Rank Fusion (RRF)",
    category: "AI & Search",
    featured: true,
    summary: {
      honest: "Engineered at SnapBizz CloudTech. Fuses Elasticsearch BM25 for typo tolerance with PostgreSQL pgvector for semantic search using Reciprocal Rank Fusion (RRF) to achieve sub-20ms latency across 100,000+ SKUs.",
      pro: "Engineered a production Hybrid RAG (Retrieval Augmented Generation) and Vector search pipeline at SnapBizz CloudTech. Fused Elasticsearch BM25 for typo tolerance with PostgreSQL pgvector for semantic search, utilizing Reciprocal Rank Fusion (RRF) to achieve sub-20ms latency across 100,000+ SKUs."
    },
    problemStatement: "Pure LLMs hallucinate numbers and have strict token context limits. Pure vector search misses exact SKU codes and misspelled brand names. Pure keyword search fails on conceptual questions like 'which items have had high return trends?'.",
    architectureSteps: [
      { step: "Query Normalization", detail: "Tokenizes incoming user query and extracts temporal/tenant filters (e.g., date ranges, retailer ID)." },
      { step: "Dual-Path Retrieval", detail: "Dispatches query in parallel to Elasticsearch (BM25 + fuzziness: AUTO) and PostgreSQL pgvector (1536-dim cosine similarity)." },
      { step: "Reciprocal Rank Fusion (RRF)", detail: "Normalizes and fuses both ranking lists into a single deduplicated candidate context." },
      { step: "Grounded Synthesis", detail: "Injects verified invoice rows and SKU facts into the LLM system prompt with strict schema enforcement." }
    ],
    metrics: "Sub-20ms latency across 100,000+ SKUs, Reciprocal Rank Fusion (RRF), zero hallucinations.",
    techStack: ["Node.js", "Express.js", "PostgreSQL", "pgvector", "Elasticsearch", "Redis", "OpenAI / Gemini API", "Docker"],
    githubUrl: "https://github.com/chiku97"
  },
  {
    id: "coding-assessment-platform",
    title: "Real-Time Coding Assessment & Sandboxed Runner",
    subtitle: "High-Concurrency Online Code Evaluation Engine",
    category: "Distributed Systems",
    featured: true,
    summary: {
      honest: "A platform built to evaluate thousands of candidate submissions while thwarting creative attempts to escape Docker containers, allocate all system RAM, or run fork bombs.",
      pro: "Engineered the backend evaluation engine for online programming assessments handling 1,000+ simultaneous students. Sandboxes untrusted code execution inside ephemeral Docker containers with CPU/RAM throttles."
    },
    problemStatement: "Running untrusted user code on web servers is dangerous (fork bombs, memory hogging, file deletion). The system required sub-second evaluation feedback without risking server compromise.",
    architectureSteps: [
      { step: "Job Queue Ingestion", detail: "Assessment submissions placed in a Redis-backed queue with priority scheduling." },
      { step: "Container Sandboxing", detail: "Worker threads spawn isolated, unprivileged Docker containers with 128MB RAM caps and no network access." },
      { step: "Test Runner Diffing", detail: "Code compiled, executed against hidden/public test vectors, and outputs diffed with strict timeouts." },
      { step: "Telemetry & Anti-Cheat", detail: "Candidate keystroke telemetry and focus loss events recorded and summarized for proctors." }
    ],
    metrics: "10k+ concurrent users, sub-2s execution feedback, zero container escapes.",
    techStack: ["React.js", "Node.js", "Express.js", "Docker", "MySQL", "Redis", "Cypress"],
    githubUrl: "https://github.com/chiku97"
  },
  {
    id: "multi-tenant-retail-engine",
    title: "IRCTC Catering Billing & Multi-Tenant Retail Engine",
    subtitle: "High-Frequency Catering Billing & Order Lifecycle Core (IRCTC & Axis Bank)",
    category: "Backend Architecture",
    featured: true,
    summary: {
      honest: "Architected the IRCTC Catering Billing and Management Dashboard and multi-tenant retail engine. Guarantees real-time billing and inventory dispatch while keeping Indian Railways data strictly isolated.",
      pro: "Architected and built the IRCTC Catering Billing and Management Dashboard and multi-tenant transactional core. Implemented row-level security and strict tenant isolation for high-volume enterprise operations."
    },
    problemStatement: "Supporting multiple enterprise brands in a shared infrastructure requires absolute data isolation, zero cross-tenant query leaks, and race-condition-free stock reservations during high-volume purchasing.",
    architectureSteps: [
      { step: "Tenant Resolution Middleware", detail: "JWT claims validate retailer identity and inject scoped database session filters." },
      { step: "Transactional Stock Locks", detail: "MySQL row-level locks prevent inventory overselling during simultaneous checkout attempts." },
      { step: "Redis Layer for Fast Reads", detail: "Frequently queried product catalogs and live shelf availability cached with smart invalidation." },
      { step: "External Webhooks Dispatch", detail: "Asynchronous webhook delivery for banking and shipping partner status updates." }
    ],
    metrics: "<50ms query responses, strict multi-tenant boundary compliance.",
    techStack: ["Node.js", "Express.js", "MySQL", "Redis", "Elasticsearch", "Prisma ORM", "AWS"],
    githubUrl: "https://github.com/chiku97"
  },
  {
    id: "jwt-auth-session-service",
    title: "Distributed JWT Auth & Session Management Service",
    subtitle: "Zero-Trust RBAC & Cryptographic Token Rotation",
    category: "Security",
    featured: false,
    summary: {
      honest: "Built so people stop storing plaintext passwords or trusting whatever client sends in the request header without checking.",
      pro: "Microservice handling user registration, authentication, RBAC permission checks, and refresh token rotation with immediate Redis blacklist revocation on logout."
    },
    problemStatement: "Stateless JWTs cannot be invalidated before expiration without a database lookup. Built a hybrid token architecture that stays fast while allowing instant session revocation.",
    architectureSteps: [
      { step: "Token Issuance", detail: "Issues short-lived JWT access tokens (15m) and cryptographically signed refresh tokens (7d)." },
      { step: "Refresh Rotation", detail: "Refresh tokens are one-time use; reuse detection triggers automatic invalidation of all descendant sessions." },
      { step: "Redis Blacklist", detail: "Logged-out token fingerprints cached in Redis memory until expiration for sub-5ms auth middleware checks." }
    ],
    metrics: "100% test coverage with Mocha, Chai, and Supertest.",
    techStack: ["Node.js", "Express.js", "JWT", "Redis", "MySQL", "Mocha", "Chai"],
    githubUrl: "https://github.com/chiku97"
  }
];

export const skillGroups = [
  {
    group: "AI & Search",
    skills: ["RAG Architecture", "pgvector", "Vector Embeddings", "Elasticsearch (BM25, Fuzzy)", "Semantic Search", "Prompt Engineering", "OpenAI API", "Gemini API"]
  },
  {
    group: "Backend & Systems",
    skills: ["Node.js", "Express.js", "Ruby on Rails", "RESTful APIs", "Multi-Tenant Architecture", "RBAC & Auth", "Microservices", "Event-Driven Queues"]
  },
  {
    group: "Databases & Storage",
    skills: ["PostgreSQL", "MySQL", "Redis (Cache & Locks)", "MongoDB", "Prisma ORM", "SQL Query Optimization"]
  },
  {
    group: "Frontend",
    skills: ["React.js", "Next.js", "Vue.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "Redux", "React Query"]
  },
  {
    group: "DevOps & Cloud",
    skills: ["Docker", "AWS (EC2, S3)", "Jenkins", "Drone CI", "Nginx", "CI/CD Pipelines", "Linux / Bash"]
  },
  {
    group: "Testing & Observability",
    skills: ["Cypress (E2E)", "Jest", "Mocha & Chai", "Postman", "Grafana", "New Relic"]
  }
];

export const educationList = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Reva University",
    location: "Bangalore, Karnataka",
    year: "2022",
    focus: "Advanced software engineering, distributed systems, algorithms, and database design."
  },
  {
    degree: "Bachelor of Science in Information Technology (B.Sc IT)",
    institution: "Marwari College",
    location: "Ranchi, Jharkhand",
    year: "2019",
    focus: "Core computer science fundamentals, data structures, networking, and programming."
  }
];
