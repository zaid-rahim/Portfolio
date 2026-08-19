/* =====================================================================
   Portfolio content model — single source of truth.
   Every fact here is drawn from Zaid Rahim's latest resume, project
   READMEs, and public GitHub metadata. Update this file to update the
   site; the UI in main.js renders from these structures.
   ===================================================================== */

const PORTFOLIO = {
  /* ---------- Identity ---------- */
  identity: {
    name: "Zaid Rahim",
    role: "AI / ML Engineer",
    tagline: "LLMs · RAG · Fine-Tuning",
    location: "Lahore, Pakistan",
    email: "zaidrahim162@gmail.com",
    phone: "+92 343 9863954",
    status: "Open to AI/ML engineering roles",
    resume: "assets/Zaid_Rahim_Resume.pdf",
    links: {
      github: "https://github.com/zaid-rahim",
      linkedin: "https://www.linkedin.com/in/zaid-rahim-zaid",
      huggingface: "https://huggingface.co/zaidrahim162",
    },
  },

  /* ---------- Hero ---------- */
  hero: {
    // Rendered line-by-line with a mask reveal.
    headlineLines: [
      "I build LLM systems",
      "that reason over",
      "real-world data.",
    ],
    intro:
      "AI/ML engineer focused on production RAG pipelines, LLM fine-tuning, and the Python backends that serve them — from attention math written by hand to models shipped behind a FastAPI endpoint.",
    stats: [
      { value: "5,000+", label: "documents in production RAG" },
      { value: "10.8M", label: "parameter GPT, built from scratch" },
      { value: "Qwen2.5-3B", label: "fine-tuned with QLoRA" },
      { value: "96%+", label: "accuracy, network from scratch" },
    ],
  },

  /* ---------- Technical focus / areas of expertise ---------- */
  focus: [
    {
      no: "01",
      title: "Large Language Models",
      viz: "attention",
      body:
        "Transformer internals down to the matrix math — multi-head self-attention, positional encoding, and residual streams implemented by hand in PyTorch.",
      tags: ["Transformers", "Attention", "Decoder-only GPT", "Tokenization"],
    },
    {
      no: "02",
      title: "RAG & AI Agents",
      viz: "rag",
      body:
        "Retrieval-augmented pipelines that ground answers in source text — vector search over embeddings, knowledge-graph context, and multi-step agentic workflows.",
      tags: ["LangChain", "LangGraph", "FAISS", "Neo4j"],
    },
    {
      no: "03",
      title: "LLM Fine-Tuning",
      viz: "finetune",
      body:
        "Parameter-efficient domain adaptation with LoRA / QLoRA — 4-bit quantization, adapter training on a single GPU, and checkpointing tuned to smoothed loss.",
      tags: ["QLoRA", "PEFT", "TRL", "BitsAndBytes"],
    },
    {
      no: "04",
      title: "NLP & Semantic Search",
      viz: "embed",
      body:
        "Dense sentence embeddings and cosine similarity for intent-based retrieval — semantic search engines built over thousands of documents.",
      tags: ["Sentence Transformers", "Embeddings", "Cosine Similarity", "NumPy"],
    },
    {
      no: "05",
      title: "Deep Learning",
      viz: "neural",
      body:
        "Networks written from the ground up — manual forward passes, chain-rule backpropagation, and gradient descent, then verified against PyTorch autograd.",
      tags: ["PyTorch", "Backpropagation", "CNNs", "Model Evaluation"],
    },
    {
      no: "06",
      title: "AI Backends & APIs",
      viz: "pipeline",
      body:
        "Serving models in production — FastAPI inference services, async REST APIs, authentication, and usage limits, documented for clean team handoffs.",
      tags: ["FastAPI", "REST", "Async", "Docker"],
    },
  ],

  /* ---------- Featured projects (case studies) ---------- */
  projects: [
    {
      no: "01",
      name: "AI-Powered Legal Research Assistant",
      year: "2025 — 2026",
      category: "RAG · Knowledge Graph · Final Year Project",
      featured: true,
      summary:
        "A retrieval-augmented research tool that lets lawyers, researchers, and students search and understand Pakistani case law in natural language — grounded in retrieved judgments rather than the model's memory.",
      problem:
        "Legal research means reading thousands of court judgments to find the few that matter. Keyword search misses context, and general LLMs hallucinate case law that does not exist.",
      built: [
        "Engineered an end-to-end RAG pipeline over 5,000+ court judgments using FAISS vector embeddings and semantic retrieval for grounded question answering.",
        "Built a Neo4j knowledge graph linking cases to judges, parties, statute sections, and decisions for structured queries and visual exploration.",
        "Designed multi-step agentic workflows with LangGraph and integrated OpenAI / Gemini APIs with engineered prompts for entity extraction, summarization, and legal reasoning.",
        "Kept inference local-first with Llama 3.1 (8B) via Ollama, so no case data leaves the machine, and shipped it behind an authenticated FastAPI / Flask backend with JWT and per-session usage limits.",
      ],
      stack: ["Python", "LangChain", "LangGraph", "FAISS", "Neo4j", "FastAPI", "Ollama / Llama 3.1", "OpenAI", "Gemini", "JWT"],
      links: { code: "https://github.com/zaid-rahim/AI-Powered-Legal-Research-Assistant" },
    },
    {
      no: "02",
      name: "QLoRA Fine-Tuning — Islamic Finance Assistant",
      year: "2026",
      category: "LLM Fine-Tuning",
      featured: true,
      summary:
        "A domain-adapted conversational model for Islamic finance in Pakistan — Qwen2.5-3B-Instruct fine-tuned on a custom Q&A corpus using QLoRA, trained end-to-end on a single free-tier GPU.",
      problem:
        "General LLMs lack grounding in Pakistan's Islamic banking ecosystem, SBP regulations, and Shariah standards — and full fine-tuning of a 3B model is far outside a free-tier GPU budget.",
      built: [
        "Fine-tuned Qwen2.5-3B-Instruct with 4-bit BitsAndBytes NF4 quantization and LoRA adapters (PEFT, rank 16, alpha 32), training only 29.9M parameters — 0.96% of the model.",
        "Built a custom TRL SFTTrainer pipeline with a 5-step rolling-average checkpointing strategy that selects adapter weights by smoothed training loss rather than final epoch.",
        "Curated 1,412 structured conversation pairs with Qwen chat templates at a 512-token max sequence length, all on a Kaggle Tesla T4.",
        "Published the merged model, the QLoRA adapter, and the dataset to the Hugging Face Hub, with a Gradio chat interface for the demo.",
      ],
      stack: ["PyTorch", "Hugging Face", "QLoRA", "PEFT", "TRL", "BitsAndBytes", "Gradio", "Kaggle"],
      links: {
        code: "https://github.com/zaid-rahim/Islamic-finance-ai",
        model: "https://huggingface.co/zaidrahim162/qwen2.5-3b-islamic-finance",
      },
    },
    {
      no: "03",
      name: "urdu-mini-gpt",
      year: "2026",
      category: "Generative AI · From Scratch",
      featured: true,
      summary:
        "A character-level, decoder-only GPT built from scratch in PyTorch — no pretrained weights, no tokenizer libraries — trained to generate Urdu poetry from a Rekhta corpus.",
      problem:
        "Understanding how a language model actually works means building one: implementing attention, transformer blocks, and the training loop yourself instead of calling a library.",
      built: [
        "Implemented self-attention, multi-head attention, transformer blocks, and the full training loop from the ground up in PyTorch.",
        "Trained a ~10.8M-parameter model (384-dim embeddings, 6 heads, 6 blocks, 256-token context, character-level vocab of 59) with AdamW over 3,000 iterations.",
        "Drove validation loss from 4.21 to ~1.53, producing coherent Urdu verse from a single start token.",
      ],
      stack: ["PyTorch", "Transformers", "Self-Attention", "AdamW"],
      links: { code: "https://github.com/zaid-rahim/urdu-mini-gpt" },
    },
    {
      no: "04",
      name: "Transformer From Scratch",
      year: "2026",
      category: "Deep Learning · From Scratch",
      featured: true,
      summary:
        "A complete implementation of the original “Attention Is All You Need” architecture in PyTorch — every component built as a standalone nn.Module with the math behind each design decision.",
      problem:
        "The Transformer is the foundation of modern AI, but calling nn.Transformer teaches you nothing about why it works.",
      built: [
        "Coded all eleven building blocks step by step: input embeddings scaled by √d_model, sinusoidal positional encoding, custom LayerNorm with learnable parameters, position-wise feed-forward networks, and scaled dot-product multi-head attention.",
        "Assembled pre-norm residual connections, stacked encoder and decoder blocks, and the final projection layer into a full encoder-decoder Transformer.",
        "Documented the intuition and math for each module so the repository doubles as a teaching reference.",
      ],
      stack: ["PyTorch", "Multi-Head Attention", "Positional Encoding", "LayerNorm"],
      links: { code: "https://github.com/zaid-rahim/Transformer-From-Scratch-in-Pytorch" },
    },
    {
      no: "05",
      name: "LexisSearch",
      year: "2025",
      category: "NLP · Semantic Search",
      featured: false,
      summary:
        "A semantic search engine that replaces keyword matching with true intent-based discovery across 1,800+ documents, deployed as a single-page app on Streamlit Cloud.",
      problem:
        "Keyword search fails when the words differ but the meaning matches — legal and news corpora need retrieval by intent, not string overlap.",
      built: [
        "Built dense retrieval on all-mpnet-base-v2 (768-dim embeddings) with cosine similarity implemented from scratch in NumPy.",
        "Precomputed document embeddings with FAISS for fast lookup across 1,800+ documents.",
        "Deployed the end-to-end application on Streamlit Cloud as an optimized single-page product.",
      ],
      stack: ["Python", "Sentence Transformers", "FAISS", "NumPy", "Streamlit"],
      links: { code: "https://github.com/zaid-rahim/LexisSearch" },
    },
    {
      no: "06",
      name: "Neural Network From Scratch — NumPy vs PyTorch",
      year: "2025 — 2026",
      category: "Deep Learning · Fundamentals",
      featured: false,
      summary:
        "A 2-layer neural network (4 → 16 → 3) trained on the Iris dataset, implemented twice — once in raw NumPy and once in PyTorch — reaching the same accuracy on identical data.",
      problem:
        "Frameworks hide backpropagation behind autograd. Writing the gradients by hand is the only way to know they are correct.",
      built: [
        "Implemented the manual forward pass, chain-rule backpropagation, and gradient descent entirely in NumPy.",
        "Replicated the same architecture in PyTorch with autograd, nn.Module, and built-in optimizers.",
        "Verified both implementations reach ~95–96%+ test accuracy on identical data and architecture.",
      ],
      stack: ["NumPy", "PyTorch", "Backpropagation", "Gradient Descent"],
      links: { code: "https://github.com/zaid-rahim/Neural-Network-from-Scratch-NumPy-vs-PyTorch" },
    },
  ],

  /* ---------- GitHub / engineering activity ---------- */
  github: {
    profile: "https://github.com/zaid-rahim",
    // Grouped by domain from actual public repositories — no fabricated
    // stars, forks, or byte-percentages (that data was not in the export).
    domains: [
      { label: "LLM & Generative AI", count: 4 },
      { label: "Deep Learning", count: 3 },
      { label: "NLP & Search", count: 2 },
      { label: "Backend & Systems", count: 3 },
    ],
    // Additional public repos beyond the featured case studies.
    more: [
      {
        name: "prompt-benchmark-dashboard",
        lang: "Python",
        desc: "A dashboard for benchmarking and comparing prompt-engineering strategies across models.",
        url: "https://github.com/zaid-rahim/prompt-benchmark-dashboard",
      },
      {
        name: "Hand-Written-Digit-Recognition",
        lang: "Python",
        desc: "Handwritten-digit recognition on MNIST with TensorFlow and an interactive Tkinter GUI.",
        url: "https://github.com/zaid-rahim/Hand-Written-Digit-Recognition",
      },
      {
        name: "Pharmacy-Management-system",
        lang: "PHP · MySQL",
        desc: "Full CRUD pharmacy system — admin/customer auth, inventory, invoices, stock alerts, and reports.",
        url: "https://github.com/zaid-rahim/Pharmacy-Management-system",
      },
      {
        name: "university-student-course-management-system",
        lang: "C++",
        desc: "Console-based university management — enrollment, course registration, marks, and attendance.",
        url: "https://github.com/zaid-rahim/university-student-course-management-system",
      },
    ],
  },

  /* ---------- Experience ---------- */
  experience: [
    {
      role: "Backend Engineer Intern",
      org: "Medic Patron LLP",
      place: "Islamabad, Pakistan",
      period: "Jun 2023 — Aug 2023",
      points: [
        "Designed backend architecture, database schemas, and REST API integrations for a medical portal in Python and FastAPI.",
        "Delivered features across the full software development lifecycle while collaborating with cross-functional teams.",
        "Authored technical documentation for system architecture and API interactions to support reproducibility and handoffs.",
      ],
    },
    {
      role: "Teaching Assistant — Operating Systems & Intro to CS",
      org: "FAST National University (NUCES)",
      place: "Islamabad, Pakistan",
      period: "Feb 2024 — Jun 2024",
      points: [
        "Guided 30+ undergraduates through systems programming, debugging, and algorithmic problem-solving.",
        "Evaluated programming assignments and led exam-preparation sessions, communicating technical concepts clearly.",
        "Coordinated with faculty to manage student workflows and course activities.",
      ],
    },
  ],

  /* ---------- Education ---------- */
  education: [
    {
      degree: "B.S. Computer Science",
      org: "FAST National University of Computer & Emerging Sciences",
      place: "Islamabad, Pakistan",
      period: "Sep 2022 — Jun 2026",
    },
  ],

  /* ---------- Certifications & leadership ---------- */
  credentials: {
    certifications: [
      "Hugging Face — Fundamentals of LLMs (2026)",
      "Hugging Face — Fine-tuning Language Models (2026)",
    ],
    leadership:
      "Led AI and software engineering teams of up to 10 through requirement analysis, task delegation, milestone tracking, code reviews, and stakeholder presentations.",
  },

  /* ---------- Skills (categorized) ---------- */
  skills: [
    {
      group: "LLMs & Generative AI",
      items: ["Hugging Face Transformers", "LoRA / QLoRA", "PEFT", "TRL", "Prompt Engineering", "OpenAI API", "Gemini API", "Claude API"],
    },
    {
      group: "RAG & AI Agents",
      items: ["RAG Pipelines", "LangChain", "LangGraph", "Agentic Workflows", "Semantic Search", "FAISS", "Sentence Transformers", "Knowledge Graphs (Neo4j)"],
    },
    {
      group: "ML & Deep Learning",
      items: ["PyTorch", "NumPy", "Pandas", "scikit-learn", "Neural Networks", "CNNs", "Transformer Architecture", "Model Training & Evaluation"],
    },
    {
      group: "Backend & APIs",
      items: ["Python", "FastAPI", "Flask", "REST APIs", "Async Programming", "OOP", "API Integration"],
    },
    {
      group: "Databases",
      items: ["PostgreSQL", "MySQL", "MongoDB", "Oracle"],
    },
    {
      group: "Tools & Deployment",
      items: ["Git", "Docker", "Linux (Ubuntu)", "Streamlit", "Gradio", "Kaggle GPU", "Hugging Face Hub", "Postman"],
    },
  ],

  /* ---------- About ---------- */
  about: {
    lead:
      "I got into AI by refusing to treat it as a black box.",
    paragraphs: [
      "I’m a final-year Computer Science student at FAST NUCES, and most of what I know about machine learning I learned by rebuilding it. Before I trusted PyTorch’s autograd, I wrote backpropagation by hand in NumPy. Before I called a Transformer, I implemented attention, positional encoding, and residual streams one module at a time. That habit — build it to understand it — is how I work.",
      "These days I build systems people can actually use: a RAG assistant that grounds legal answers in 5,000+ real judgments, a 3B model fine-tuned with QLoRA on a single free GPU, semantic search over thousands of documents. I care about the parts that make AI trustworthy — retrieval that cites its sources, inference that can run locally and privately, and backends that are documented well enough for someone else to pick up.",
      "I’ve also taught operating systems to 30+ students and led engineering teams of up to ten, which taught me that the clearest explanation usually wins. I’m looking for AI/ML engineering work where I can keep shipping real systems.",
    ],
  },

  /* ---------- Contact ---------- */
  contact: {
    heading: "Let’s build something",
    body:
      "I’m open to AI/ML engineering roles and interesting collaborations. The fastest way to reach me is email — or send a note below.",
    emailjs: {
      publicKey: "hPZ0zLbpc9VezXdmP",
      serviceId: "service_q2qje4a",
      templateId: "template_e5ypa79",
    },
  },
};

if (typeof window !== "undefined") window.PORTFOLIO = PORTFOLIO;
