---
title: "Token (AI)"
description: "A token is the basic unit of text an LLM processes - roughly 3–4 characters or 0.75 words - used to measure input length, output length, and API cost."
locale: "en"
category: "ai"
tags: ["ai", "llm", "inference", "pricing"]
difficulty: "beginner"
publishedDate: 2026-03-17
relatedTerms: ["llm", "context-window", "inference"]
primaryKeyword: "AI token LLM"
seoKeywords: ["AI token LLM", "what is a token in AI", "how many tokens per word", "LLM token pricing explained"]
faqs:
  - question: "What is a token in AI and LLMs?"
    answer: "A token is the smallest unit of text that a large language model reads and generates. Tokens are not exactly words or characters - they are subword fragments produced by a tokenization algorithm. On average, one token equals roughly 3–4 characters or 0.75 words in English. The word 'startup' is one token; 'entrepreneurship' might be two or three. LLMs measure all inputs, outputs, context limits, and API pricing in tokens, not words or characters."
  - question: "How many tokens is 1,000 words?"
    answer: "Approximately 1,333 tokens for typical English text, based on the 0.75 words-per-token rule of thumb. A 10-page business document (~5,000 words) is roughly 6,600 tokens. Code and languages with long compound words (German, Finnish) tend to use more tokens per word; short-word languages (Mandarin with BPE tokenization) may use fewer. For precise counts, use OpenAI's free Tokenizer tool at platform.openai.com/tokenizer."
  - question: "How does token pricing work for LLM APIs?"
    answer: "LLM APIs charge separately for input tokens (the prompt you send) and output tokens (the response the model generates). Output tokens typically cost 3–5x more than input tokens because generation is more compute-intensive than reading. For example, GPT-4o charges ~$2.50 per million input tokens and ~$10 per million output tokens. A single query with a 1,000-token system prompt, 200-token user message, and 500-token response costs roughly $0.008 - about a cent."
  - question: "What is a context window in terms of tokens?"
    answer: "A context window is the maximum number of tokens an LLM can process in a single request - both input and output combined. GPT-4o has a 128,000-token context window; Gemini 1.5 Pro supports up to 1 million tokens. Exceeding the context window causes an error or forces truncation. In practice, the context window limits how much conversation history, document content, or instruction detail you can provide to the model at once."
  - question: "Why do different languages use different numbers of tokens?"
    answer: "LLM tokenizers are trained primarily on English text, so English is the most token-efficient language. Non-Latin scripts (Arabic, Chinese, Korean) and languages with long compound words often require more tokens per semantic unit. A 1,000-word English document might use 1,300 tokens; the same content in a non-English language could use 2,000–4,000 tokens. This has direct cost implications for multilingual AI products - a product serving non-English users at scale should budget 1.5–3x higher token costs than an English-only equivalent."
---

## What Is a Token (AI)?

A token is the fundamental unit of text that a large language model reads, processes, and generates. Rather than operating on individual characters or whole words, LLMs use a **tokenization** algorithm to split text into subword fragments - pieces that balance vocabulary size with coverage of the full language. In English, one token averages roughly 3–4 characters, or about 0.75 words. A short common word like "is" or "the" is one token; a longer or rarer word like "entrepreneurship" might be split into two or three tokens ("entre", "pren", "eur", "ship"). Every LLM metric that matters - context windows, API pricing, throughput, latency - is measured in tokens.

## How Tokenization Works

Modern LLMs use **Byte Pair Encoding (BPE)** or similar subword tokenization algorithms. BPE starts with individual characters and iteratively merges the most frequent character pairs into tokens, building a vocabulary of typically 50,000–100,000 token types. The result: common short words get single tokens; rarer or compound words are split into fragments.

Examples using GPT-4o's tokenizer:

| Text | Tokens | Count |
|------|--------|-------|
| "startup" | ["startup"] | 1 |
| "pre-money valuation" | ["pre", "-money", " val", "uation"] | 4 |
| "Hello, world!" | ["Hello", ",", " world", "!"] | 4 |
| "GPT-4o" | ["G", "PT", "-", "4", "o"] | 5 |
| "😀" | [emoji byte fragments] | 3 |

Spaces are typically included as part of the following token (a leading space is a token boundary marker), which is why the same word can tokenize differently depending on its position in a sentence.

## Tokens in Context: The Three Numbers That Matter

### 1. Context window
The maximum number of tokens the model can "see" in a single request - including the system prompt, conversation history, any retrieved documents, and the model's own output. Once exceeded, the model either errors out or the oldest content is truncated.

| Model | Context window |
|-------|---------------|
| GPT-4o | 128,000 tokens (~96,000 words) |
| Claude 3.5 Sonnet | 200,000 tokens (~150,000 words) |
| Gemini 1.5 Pro | 1,000,000 tokens (~750,000 words) |
| Llama 3 70B | 8,000 tokens (~6,000 words) |
| GPT-4o mini | 128,000 tokens |

A 200,000-token context window can hold approximately 150 pages of text - enough for a full book, a long legal contract, or several months of customer conversation history in a single prompt.

### 2. Input vs. output tokens
APIs charge separately because the compute costs differ. Reading input tokens (processing the prompt) is cheaper; generating output tokens (sampling from the model) is more expensive.

| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|-------|----------------------|------------------------|
| GPT-4o | $2.50 | $10.00 |
| Claude 3.5 Sonnet | $3.00 | $15.00 |
| GPT-4o mini | $0.15 | $0.60 |
| Gemini 1.5 Flash | $0.075 | $0.30 |

### 3. Throughput (tokens per second)
How fast the model generates output, measured in tokens per second. GPT-4o generates roughly 80–120 tokens/second; Groq's Llama 3 70B generates 300+ tokens/second. For a 500-token response, that's the difference between ~4 seconds and ~1.5 seconds.

## Practical Cost Calculations

**Basic query (customer support bot)**:
- System prompt: 500 tokens
- User message: 100 tokens
- Response: 300 tokens
- Total cost on GPT-4o: (600 × $0.0000025) + (300 × $0.00001) = $0.0015 per query
- At 10,000 queries/day: **$15/day → ~$450/month**

**Document analysis (contract review)**:
- System prompt: 1,000 tokens
- Document (20-page contract): 15,000 tokens
- Response: 500 tokens
- Total cost on GPT-4o: (16,000 × $0.0000025) + (500 × $0.00001) = $0.045 per contract
- At 500 contracts/day: **$22.50/day → ~$675/month**

## Optimizing Token Usage

**Compress system prompts**: Every token in the system prompt costs money on every call. A 500-token system prompt vs. 1,000 tokens saves $0.00125 per call - $1,250/month at 1 million daily calls.

**Cache repeated context**: OpenAI and Anthropic offer prompt caching for system prompts longer than 1,024 tokens, reducing the cost of repeated long prompts by up to 90%.

**Limit output length**: Instruct the model to be concise where verbosity isn't needed. `max_tokens` parameter hard-limits output length, preventing runaway token generation.

**Choose the right model**: GPT-4o mini at $0.15/M input tokens is 17x cheaper than GPT-4o for tasks that don't require frontier reasoning.

## Key Takeaway

Tokens are the currency of the LLM economy - they determine what you can fit in a prompt, how much you pay per request, and how fast responses arrive. Developing an intuition for token counts (roughly 750 English words = 1,000 tokens) lets you estimate costs, design efficient prompts, and make informed model-selection decisions. For any AI product at scale, token optimization is one of the highest-leverage cost-reduction levers available.
