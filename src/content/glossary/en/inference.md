---
title: "Inference"
description: "Inference is the process of running a trained AI model on new inputs to generate predictions or outputs, as opposed to training the model on data."
locale: "en"
category: "ai"
tags: ["ai", "llm", "infrastructure", "machine-learning"]
difficulty: "intermediate"
publishedDate: 2026-03-17
relatedTerms: ["llm", "foundation-model", "fine-tuning"]
primaryKeyword: "AI inference startup"
seoKeywords: ["AI inference startup", "what is AI inference", "inference vs training AI", "LLM inference cost"]
faqs:
  - question: "What is inference in AI?"
    answer: "Inference is the process of running a trained AI model on a new input to produce an output — a text response, image classification, translation, or prediction. It is the 'production' mode of AI, as opposed to training, which is the process of teaching the model using data. Every time a user submits a prompt to ChatGPT or an AI feature generates a response in your app, that is inference."
  - question: "What is the difference between AI training and inference?"
    answer: "Training is a one-time (or periodic) process that adjusts a model's weights using large datasets — it is computationally intensive, slow, and expensive, but happens infrequently. Inference is the ongoing process of using the trained model to generate outputs for new inputs — it is faster and cheaper per operation, but happens millions or billions of times in production. For most startups, inference costs dwarf training costs because inference runs continuously at scale."
  - question: "What is the difference between inference latency and throughput?"
    answer: "Latency is the time from when a request is submitted to when the first token (or full response) is returned — typically measured in milliseconds for time-to-first-token (TTFT) and seconds for complete response time. Throughput is the number of requests a system can process per second. High-latency, high-throughput configurations (batch processing) and low-latency, lower-throughput configurations (real-time chat) require different infrastructure optimizations. Most user-facing AI features require latency under 2–3 seconds for a good user experience."
  - question: "How much does LLM inference cost?"
    answer: "Inference is priced per token via APIs. As of early 2026: GPT-4o costs roughly $2.50 per million input tokens and $10 per million output tokens; Claude 3.5 Sonnet is ~$3/$15; GPT-4o mini is ~$0.15/$0.60. A startup processing 100,000 user queries per day, each averaging 500 input tokens and 300 output tokens, would spend approximately $4,000–$16,000 per month depending on model choice. Self-hosting open-source models on dedicated GPUs can reduce this by 50–90% at sufficient scale."
  - question: "What is speculative decoding and why does it speed up inference?"
    answer: "Speculative decoding is an inference optimization where a small, fast 'draft' model generates several candidate tokens, and the large target model verifies them in parallel rather than generating tokens one by one. Because the large model can accept correct draft tokens without full computation, the effective output speed increases 2–3x with no loss in quality. It is used in production by inference providers like Together AI and Groq to serve faster responses at lower cost."
---

## What Is Inference?

Inference is the process of running a trained AI model on a new input to generate a prediction or output. It is the operational, production mode of AI: when a user submits a prompt to an LLM and receives a response, that exchange is inference. Training — the process of teaching the model using large datasets — happens once (or periodically), while inference happens continuously, at scale, every time the model is used. For startups building AI products, inference is the primary ongoing cost driver and the system component most directly tied to user experience through latency and reliability.

## Training vs. Inference: Two Different Problems

| Dimension | Training | Inference |
|-----------|----------|-----------|
| When it happens | Once (or periodically) | Continuously, on every request |
| Compute required | Massive (thousands of GPUs, weeks) | Moderate (scales with request volume) |
| Cost structure | Fixed, large upfront cost | Variable, per-request |
| Who does it | Foundation model labs (mostly) | Every startup deploying AI |
| Optimization goal | Minimize training loss | Minimize latency + cost per token |

For early-stage startups, training from scratch is irrelevant — inference is the only compute cost that matters. Even fine-tuning is a minor training cost relative to months of production inference at scale.

## Key Inference Metrics

### Time-to-first-token (TTFT)
The time between submitting a request and receiving the first token of the response. Critical for streaming interfaces where the user sees text appear word by word. Users perceive responses as "fast" when TTFT is under 400ms; over 2 seconds feels slow.

### Tokens per second (TPS) / throughput
How fast the model generates output tokens once generation starts. GPT-4o generates roughly 80–120 tokens per second; smaller models can exceed 200 TPS. Higher throughput means shorter total response times for long outputs.

### Requests per second (RPS) / concurrent users
How many simultaneous inference requests the system can handle. This is a function of GPU memory, batching efficiency, and model size. Production inference systems use dynamic batching — grouping multiple requests together — to maximize GPU utilization.

### Cost per million tokens
The unit economics of inference. Lower is better, but usually trades off against capability. GPT-4o mini at $0.15/M input tokens processes 17x cheaper than GPT-4o at $2.50/M, but with lower capability on complex tasks.

## Inference Architecture Options for Startups

### API providers (managed inference)
The default for most startups. OpenAI, Anthropic, Google, Cohere, and aggregators like Together AI, Fireworks, and Groq provide inference as a service. No infrastructure to manage; pay per token.

**Best for**: Products under ~500,000 requests/day, teams without ML infrastructure expertise.

### Dedicated GPU instances (self-hosted)
Rent GPU instances (A100s, H100s) from AWS, GCP, Azure, or Lambda Labs and run inference on open-source models (Llama 3, Mistral) using serving frameworks like vLLM or TGI (Text Generation Inference).

**Best for**: High-volume products where API costs exceed $10,000–$30,000/month, or products with strict data residency requirements.

**Example cost**: An A100 80GB instance on Lambda Labs costs ~$2/hour. Running Llama 3 70B, it can handle ~100 tokens/second. At sustained 50% utilization, monthly cost is ~$720 — equivalent to processing roughly 100M tokens via GPT-4o mini API. Above that volume, self-hosting wins on cost.

### Inference-optimized providers
Groq (custom LPU hardware), Cerebras, and Fireworks AI offer extremely low latency (often 10–30x faster than OpenAI) for open-source models. Groq's LPU can serve Llama 3 70B at over 300 tokens/second — faster than most humans can read.

**Best for**: Latency-sensitive applications like real-time voice, code completion, or gaming.

## Inference Optimization Techniques

**Quantization**: Reducing model weight precision from 32-bit floats to 8-bit or 4-bit integers. Reduces memory by 4–8x with minimal quality loss, enabling larger models to run on smaller hardware.

**KV cache**: Foundation models cache the attention computations for the prompt so only new tokens require full computation. Long system prompts can be cached, reducing latency and cost for subsequent requests.

**Speculative decoding**: A small draft model proposes candidate tokens; the large model verifies them in parallel. Produces 2–3x speedup with no quality loss.

**Batching**: Combining multiple user requests into a single GPU forward pass. Inference providers handle this automatically; self-hosted deployments must implement dynamic batching explicitly.

## Key Takeaway

Inference is the operational heartbeat of every AI product — it runs on every user interaction and determines both user experience (through latency) and unit economics (through cost per token). For startups, the optimal inference strategy evolves: start with managed API providers to move fast, measure actual costs at scale, and migrate to self-hosted open-source models when the economics justify the infrastructure investment. The break-even point is typically reached between $10,000 and $50,000/month in API spend.
