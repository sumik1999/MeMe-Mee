# MemeRasa — Controllable Multilingual Meme Generation

<p align="center">
  <strong>Turn Hindi, Hinglish, and English thoughts into culturally relevant memes with controllable emotion.</strong>
</p>

MemeRasa is an interactive prototype for affect-controlled meme generation. Users provide a situation or thought, select a language, and tune continuous affect dimensions such as humour, sarcasm, romance, absurdity, and wholesomeness. The application then selects a visual template, produces a matching caption, scores its affect alignment, and renders a downloadable meme.

## Highlights

- **Multilingual input:** Hindi, Roman Hindi/Hinglish, and English modes
- **Continuous affect controls:** Fine-grained sliders instead of fixed style labels
- **Template retrieval experience:** Culturally relevant template selection and remixing
- **Caption workflow:** Generate, edit, copy, share, and regenerate captions
- **Rasa-match score:** Visual feedback for requested-versus-generated affect alignment
- **Client-side rendering:** Export generated memes as PNG files
- **Responsive interface:** Optimized for desktop, tablet, and mobile layouts

## Technical Concept

The full system is designed as a multimodal retrieval-and-generation pipeline:

```text
User text + affect vector
          │
          ▼
Language identification and Hindi/Hinglish normalization
          │
          ▼
Multilingual semantic and affect encoding
          │
          ▼
CLIP/SigLIP image–text template retrieval
          │
          ▼
Affect-conditioned LLM caption generation
          │
          ▼
Semantic, affect, and image–text compatibility ranking
          │
          ▼
Typography-aware meme rendering
```

### NLP pipeline

The planned NLP layer performs language identification, transliteration normalization, code-mixed text processing, multilingual sentence embedding, intent extraction, and affect-conditioned caption generation. Candidate captions can be ranked using semantic similarity, language naturalness, cultural relevance, and distance from the requested affect vector.

### Computer vision pipeline

Template images can be preprocessed into CLIP or SigLIP embeddings and stored in a vector index such as FAISS or Qdrant. At inference time, semantic text embeddings and affect metadata retrieve candidate templates, followed by image–text compatibility ranking and contrast-aware caption rendering.

> **Implementation status:** This repository currently contains the functional React frontend prototype with local generation logic. Model inference, vector retrieval, and a persistent backend are the next integration stage.

## Tech Stack

| Layer | Current | Planned ML integration |
|---|---|---|
| Frontend | React, Vite, JavaScript | — |
| UI and icons | Custom CSS, Lucide React | — |
| NLP | Rule-based prototype logic | Indic language models, Sentence Transformers, LLM |
| Vision | Curated image templates | CLIP/SigLIP, FAISS/Qdrant |
| Rendering | Browser Canvas API | Pillow/OpenCV service |
| Backend | — | FastAPI, PostgreSQL |

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer

### Installation

```bash
git clone https://github.com/sumik1999/MeMe-Mee.git
cd MeMe-Mee
npm install
npm run dev
```

Open the local URL displayed by Vite, normally `http://localhost:5173`.

### Production build

```bash
npm run build
npm run preview
```

## Project Structure

```text
MeMe-Mee/
├── src/
│   ├── main.jsx       # Application components and generation workflow
│   └── styles.css     # Responsive design system and component styling
├── index.html         # Vite entry document
├── package.json       # Dependencies and scripts
└── README.md
```

## Usage

1. Enter a thought or situation in Hindi, Hinglish, or English.
2. Select the desired output language.
3. Adjust the affect controls to define the meme's tone.
4. Generate a caption and review its Rasa-match score.
5. Remix the template or edit the caption if required.
6. Download the final meme as a PNG.

## Roadmap

- [ ] FastAPI inference service and typed API contract
- [ ] Hindi/Hinglish language detection and transliteration normalization
- [ ] CLIP/SigLIP template embedding pipeline
- [ ] FAISS or Qdrant similarity search
- [ ] LLM-based multi-candidate caption generation
- [ ] Affect encoder and candidate-ranking model
- [ ] Automated caption wrapping and placement detection
- [ ] Evaluation using affect-control error, CLIP score, and human ratings
- [ ] User authentication and generated-meme history

## Evaluation Strategy

The research-oriented version will evaluate:

- **Affect Control Error (ACE):** Distance between requested and predicted affect vectors
- **Semantic relevance:** Multilingual embedding similarity between input and caption
- **Image–text compatibility:** CLIP/SigLIP similarity score
- **Language naturalness:** Human and model-based evaluation for Hindi/Hinglish output
- **Human preference:** Humour, creativity, cultural relevance, and overall quality ratings

## Contributing

Contributions are welcome. Create a feature branch, make focused changes, and open a pull request with a clear description and validation steps.

## License

No license has been assigned yet. All rights are reserved by the repository owner.
