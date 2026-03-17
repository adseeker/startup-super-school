---
title: "How to Build a RAG Pipeline"
description: "A step-by-step guide to building a Retrieval-Augmented Generation system: chunking, embeddings, vector databases, retrieval, and evaluation."
locale: "en"
category: "ai"
tags: ["ai", "technology", "architecture", "product"]
difficulty: "advanced"
publishedDate: 2026-03-17
readingTime: 14
primaryKeyword: "how to build a rag pipeline"
seoKeywords: ["build rag pipeline", "retrieval augmented generation", "rag architecture", "vector database rag"]
steps:
  - name: "Prepare and chunk your documents"
    text: "Clean your source documents and split them into chunks of 256–512 tokens using a strategy matched to your document structure. Chunking strategy is the highest-leverage decision in RAG - most pipeline failures trace back to poor chunk boundaries rather than model selection."
  - name: "Generate embeddings"
    text: "Embed each chunk using a text embedding model. Choose between OpenAI text-embedding-3-large for highest quality, or an open-source model like BGE-M3 or E5-large for cost efficiency or data privacy. Regenerate all embeddings when you switch models - embeddings from different models are not compatible."
  - name: "Store in a vector database"
    text: "Load your embeddings into a vector database alongside the original chunk text and metadata. Select your vector DB based on your scale, hosting requirements, and whether you need hybrid (keyword + semantic) search."
  - name: "Build the retrieval layer"
    text: "Write the query pipeline: embed the user query, retrieve the top-k most similar chunks, apply metadata filters if needed, and re-rank results. The retrieval layer determines what context your LLM receives - retrieval quality sets the ceiling on generation quality."
  - name: "Connect to your LLM"
    text: "Construct a prompt that injects retrieved chunks as context and instructs the model to answer only from that context. Implement citation tracking so you can trace every claim in the output back to a source chunk - this is critical for debugging hallucinations."
  - name: "Evaluate and iterate"
    text: "Measure your pipeline on retrieval metrics (recall@k, MRR) and generation metrics (faithfulness, answer relevance) using a labeled evaluation set. Most RAG failures are retrieval failures, not generation failures - fix retrieval before tuning the prompt."
faqs:
  - question: "What is RAG and why use it instead of fine-tuning?"
    answer: "Retrieval-Augmented Generation (RAG) is a technique where a language model's answer is grounded in documents retrieved at query time, rather than relying on knowledge baked into model weights. Use RAG when your knowledge base changes frequently (fine-tuning a new model takes days; updating a vector index takes minutes), when you need citations or source traceability, or when the knowledge base is too large to fit in a context window. Fine-tuning is better when you need the model to adopt a specific style, format, or reasoning pattern that cannot be conveyed through a prompt."
  - question: "What chunk size should you use for RAG?"
    answer: "For most text documents, 256–512 tokens per chunk with a 10–20% overlap is a reliable starting point. Smaller chunks (128 tokens) improve retrieval precision but reduce the context available to the model once a chunk is retrieved. Larger chunks (1,024+ tokens) provide more context per chunk but dilute the embedding signal, making similarity search less accurate. The right chunk size depends on your document structure: use sentence-level chunking for FAQs, paragraph-level for prose, and section-level for technical documentation."
  - question: "Which vector database should you use for RAG?"
    answer: "For a startup just starting out, Supabase (pgvector) or a managed service like Pinecone is the fastest path to production. Pinecone offers a fully managed service with a generous free tier and strong hybrid search. pgvector works inside your existing Postgres database, which reduces infrastructure complexity for small-to-medium corpora (<10M vectors). Weaviate and Qdrant are strong open-source options if you need self-hosted deployments or advanced filtering. For large-scale production (100M+ vectors), Weaviate, Qdrant, or Milvus offer better performance than pgvector."
  - question: "How do you evaluate RAG pipeline quality?"
    answer: "Evaluate RAG on two dimensions separately: retrieval quality and generation quality. For retrieval, measure recall@k (what fraction of the time is the relevant chunk in the top-k results?) and MRR (mean reciprocal rank). For generation, measure faithfulness (does the answer stay within the retrieved context?) and answer relevance (does the answer actually address the question?). Frameworks like RAGAS automate these metrics. Most RAG pipelines that produce wrong answers are failing at retrieval, not generation - fix recall@k before tuning prompts."
  - question: "What are the most common RAG pipeline failure modes?"
    answer: "The five most common RAG failures are: (1) poor chunking that splits semantically related content across chunk boundaries, causing irrelevant retrievals; (2) low recall because the query phrasing does not match the document vocabulary (fix with hybrid search or query expansion); (3) context window overflow when too many chunks are retrieved and the LLM ignores information at the middle of the prompt; (4) answer hallucination where the model adds information not present in the retrieved chunks; and (5) stale index where documents are updated but embeddings are not regenerated."
---

## Prepare and Chunk Your Documents

Document chunking is the most consequential decision in a RAG pipeline. The model can only answer well if the retrieval step surfaces the right chunks - and retrieval quality depends almost entirely on how you split your documents.

**Why chunking matters**: An embedding model converts a chunk of text into a single vector. If a chunk contains two unrelated topics, the vector is a noisy average of both - it will retrieve poorly for queries about either topic. If chunks are too small, the retrieved context lacks the surrounding information the model needs to answer fully.

**Chunking strategies**:

| Strategy | Best for | Chunk size | Trade-off |
|----------|----------|------------|-----------|
| Fixed-size | Simple prose, mixed documents | 256–512 tokens | Fast; may split sentences mid-thought |
| Sentence-level | FAQs, Q&A pairs, structured lists | 1–3 sentences | High precision; very short context |
| Paragraph-level | Articles, reports, documentation | 150–400 tokens | Natural boundaries; variable size |
| Section-level | Technical docs, book chapters | 500–1,500 tokens | Rich context; diluted embedding signal |
| Recursive | Any structured document | Configurable | Best general-purpose; used by LangChain default |

**Chunk overlap**: Add 10–20% overlap between adjacent chunks (e.g., last 50 tokens of chunk N become the first 50 tokens of chunk N+1). This preserves context at boundaries and is critical for documents where a sentence at the end of one chunk provides essential context for the beginning of the next.

**Metadata enrichment**: Store metadata alongside each chunk - document title, section heading, page number, URL, last updated date. This enables metadata filtering during retrieval ("only return chunks from documents updated in the last 90 days") and provides source citations in the model's answer.

**Document cleaning**: Strip HTML tags, headers/footers, page numbers, and boilerplate before chunking. Noise in the input text degrades embedding quality for the entire chunk.

## Generate Embeddings

An embedding model converts text into a dense vector (typically 768–3,072 dimensions) that encodes semantic meaning. Texts with similar meanings produce vectors that are close together in this high-dimensional space - this is what enables similarity search.

**Embedding model options**:

| Model | Dimensions | Context | Cost | Best for |
|-------|-----------|---------|------|----------|
| OpenAI text-embedding-3-large | 3,072 | 8,191 tokens | $0.13/1M tokens | Highest quality; general purpose |
| OpenAI text-embedding-3-small | 1,536 | 8,191 tokens | $0.02/1M tokens | 90% of large quality at 15% cost |
| Cohere Embed v3 | 1,024 | 512 tokens | $0.10/1M tokens | Strong multilingual support |
| BGE-M3 (open-source) | 1,024 | 8,192 tokens | Free (self-hosted) | Best open-source; multilingual |
| E5-large-v2 (open-source) | 1,024 | 512 tokens | Free (self-hosted) | Strong on retrieval tasks |

**Embedding cost calculation**: For 1 million chunks at an average of 400 tokens each, that is 400 million tokens to embed. At OpenAI text-embedding-3-small pricing ($0.02/1M tokens), the full indexing cost is $8.00. Re-embedding after a document update costs only the tokens in the changed documents.

**Critical rule**: Never mix embeddings from different models in the same index. Vectors from different models live in incompatible spaces - similarity scores between them are meaningless. If you switch embedding models, you must regenerate all embeddings from scratch.

## Store in a Vector Database

A vector database stores your embeddings and enables approximate nearest-neighbor (ANN) search - finding the k most similar vectors to a query vector in milliseconds, even across millions of records.

**Vector database comparison**:

| Database | Hosting | Scale | Hybrid search | Best for |
|----------|---------|-------|---------------|----------|
| Pinecone | Managed only | 100M+ vectors | Yes (sparse+dense) | Fastest path to production |
| pgvector (Supabase/RDS) | Managed or self-hosted | <10M vectors | Limited | Existing Postgres users |
| Weaviate | Managed or self-hosted | 100M+ vectors | Yes | Complex filtering, multi-tenancy |
| Qdrant | Managed or self-hosted | 100M+ vectors | Yes | Open-source, advanced filtering |
| Chroma | Self-hosted | <1M vectors | No | Local development, prototyping |
| Milvus | Self-hosted | Billions | Yes | Enterprise scale |

**Recommended path for a startup**:
- **Prototype** (0–100K chunks): Chroma locally, or pgvector on Supabase (free tier)
- **Early production** (100K–5M chunks): Pinecone Starter or pgvector on Supabase Pro
- **Scaled production** (5M+ chunks): Pinecone, Weaviate, or Qdrant

**Schema design**: Each record in the vector index should contain:
- `id`: unique identifier for the chunk
- `embedding`: the vector (float array)
- `text`: the original chunk text (for passing to the LLM as context)
- `metadata`: source document ID, title, URL, section, page, last updated date

## Build the Retrieval Layer

The retrieval layer takes a user query, converts it to an embedding, and returns the most relevant chunks. This is where most RAG pipelines fail - not at the LLM step.

**Basic retrieval pipeline**:
1. Embed the user query using the same model used to embed documents
2. Run ANN search against the vector index for top-k results (k=5–20 is typical)
3. Apply metadata filters if relevant (e.g., restrict to a specific document set or date range)
4. Return chunks with their text and source metadata

**Beyond basic retrieval - improving recall**:

| Technique | What it does | When to use |
|-----------|-------------|-------------|
| Hybrid search | Combines dense (semantic) + sparse (BM25 keyword) retrieval | Queries with specific terms, names, codes |
| Query expansion | LLM generates 3–5 related queries; results are union of all | Short or ambiguous user queries |
| HyDE (Hypothetical Document Embeddings) | LLM generates a hypothetical answer; embed that for retrieval | When query phrasing differs from document phrasing |
| Re-ranking | Cross-encoder model re-scores top-k results for relevance | When precision matters more than speed |
| Parent-child chunking | Retrieve small child chunks; return larger parent chunk as context | Balances embedding precision with context richness |

**Retrieval parameters**:
- **k (top-k)**: Start with k=5. Increase to k=10–20 if recall@k is low but watch for context window limits.
- **Similarity threshold**: Filter out chunks with similarity score below ~0.75 to avoid retrieving loosely related noise.
- **MMR (Maximal Marginal Relevance)**: Penalizes redundant chunks - useful when multiple chunks say the same thing and take up context window space.

## Connect to Your LLM

Once you have retrieved the relevant chunks, construct a prompt that grounds the model's answer in those chunks and prevents hallucination by instructing it not to answer outside the retrieved context.

**Standard RAG prompt structure**:

```
System: You are a helpful assistant. Answer the user's question using only
the provided context. If the context does not contain enough information
to answer the question, say "I don't have enough information to answer that."
Do not use any knowledge outside the provided context.

Context:
[CHUNK 1] Source: {source_1} | {chunk_text_1}
[CHUNK 2] Source: {source_2} | {chunk_text_2}
...

User: {user_query}
```

**Citation tracking**: Assign a reference ID to each retrieved chunk and instruct the model to cite sources in its answer (e.g., "[1]", "[2]"). Parse the citations from the response and map them back to source documents. This enables:
- Debugging: trace any hallucination to the exact retrieval failure that caused it
- User trust: show users where each claim comes from
- Quality monitoring: measure what fraction of claims are actually grounded in retrieved chunks

**Context window management**: If your retrieved chunks exceed the model's context window, apply a truncation strategy:
- Prioritize by similarity score (keep the highest-scoring chunks)
- Summarize lower-priority chunks to fit more sources in the window
- Use a model with a larger context window for document-heavy queries

## Evaluate and Iterate

RAG pipeline evaluation requires measuring retrieval quality and generation quality separately. Mixing them into a single end-to-end accuracy score makes it impossible to identify which component is failing.

**Retrieval metrics**:

| Metric | Formula | Target |
|--------|---------|--------|
| Recall@k | % of queries where the relevant chunk appears in top-k | >85% at k=5 |
| Precision@k | % of top-k results that are actually relevant | >60% at k=5 |
| MRR (Mean Reciprocal Rank) | Average of 1/rank of first relevant result | >0.7 |

**Generation metrics**:

| Metric | What it measures | Target |
|--------|-----------------|--------|
| Faithfulness | % of claims in answer that are grounded in retrieved context | >90% |
| Answer relevance | Does the answer actually address the question? | >85% |
| Context utilization | % of retrieved chunks actually used in the answer | >50% |

**Evaluation frameworks**: RAGAS (open-source) automates all of these metrics using an LLM-as-judge approach. It requires a test set of (query, relevant document, expected answer) triples - start with 50–100 manually labeled examples.

**Iteration priority**:
1. If recall@k < 80%: fix chunking, add hybrid search, or try query expansion
2. If faithfulness < 85%: tighten the system prompt, reduce k, or add a grounding check step
3. If answer relevance is low: improve query understanding (classify intent, expand ambiguous queries)
4. If latency is high: reduce k, cache frequent queries, or switch to a faster embedding model

## Key Takeaway

A RAG pipeline is not a single model choice - it is a system with six components, each of which can independently cause failures. The highest-leverage investment is chunking strategy and retrieval quality: if the wrong chunks are retrieved, no amount of prompt engineering will produce a correct answer. Start with a simple pipeline (fixed-size chunking, OpenAI embeddings, pgvector, top-5 retrieval), measure recall@k and faithfulness on a labeled test set before shipping, and add complexity - hybrid search, re-ranking, query expansion - only where the metrics show a specific gap.
