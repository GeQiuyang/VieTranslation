# Chinese-Vietnamese Translation Web App — Design Spec

**Date:** 2026-06-04
**Status:** Approved

## Overview

A Vue 3 SPA that provides real-time Chinese-Vietnamese translation for the rotary drilling rig trade industry. Uses DeepSeek V4 Pro API for translation, with an industrial design system (Industrial Core) carried over from the existing prototype.

## Tech Stack

- **Framework:** Vue 3 (Composition API + `<script setup>`)
- **Build:** Vite
- **State:** Pinia
- **Router:** Vue Router (Hash mode)
- **Styling:** Tailwind CSS (custom theme from DESIGN.md)
- **Icons:** Material Symbols Outlined
- **Translation API:** DeepSeek V4 Pro (`api.deepseek.com`)
- **Font:** Inter (Google Fonts)

## Routes

| Path | View | Description |
|---|---|---|
| `/` | TranslationView | Main translation panel + feature cards |
| `/glossary` | GlossaryView | Full industry term glossary with search |
| `/inquiry` | InquiryView | Placeholder for inquiry management |
| `/profile` | ProfileView | User settings, API key config |

## Component Tree

```
App.vue
├── TopNavBar.vue (fixed header, exchange rate ticker, language btn, avatar)
├── SideNavBar.vue (nav links, "New Inquiry" CTA, common phrases)
├── <RouterView>
│   ├── TranslationView.vue
│   │   ├── LanguageToggle.vue (CN ⇄ VN direction switch)
│   │   ├── TranslationPanel.vue (input — textarea, char count, clear)
│   │   ├── TranslationPanel.vue (output — result, copy/speak/share)
│   │   ├── GlossaryCard.vue (sample terms with "Explore Full" link)
│   │   ├── ExchangeRateCard.vue (live CNY/VND, USD/VND rates)
│   │   └── TradeEcosystem.vue (feature highlights)
│   ├── GlossaryView.vue (search + filter + term table with pagination)
│   ├── InquiryView.vue (placeholder)
│   └── ProfileView.vue (API key input, preferences)
└── FooterBar.vue
```

## Pinia Stores

### translation store
- `sourceLang`, `targetLang` — 'zh' or 'vi', default zh→vi
- `inputText`, `outputText`, `isLoading`, `error`, `characterCount`
- `mode` — 'general' | 'technical' (system prompt changes)
- Actions: `translate()`, `swapLanguages()`, `clearInput()`

### glossary store
- `terms: { cn, vn, en, category }[]` — static seed data from code.html
- Actions: `search(query, category?)`, `addTerm(term)`

### exchangeRate store
- `cnyToVnd`, `usdToVnd`, `trend`, `lastUpdated`
- Static initial values from code.html (3450.25, 25410.00)

## DeepSeek API Integration

- **Endpoint:** `POST https://api.deepseek.com/v1/chat/completions`
- **Model:** `deepseek-chat`
- **Auth:** `Bearer {VITE_DEEPSEEK_API_KEY}` (env variable)
- **Translation call:** client-side fetch from `src/api/deepseek.js`
- **Debounce:** 500ms on input change for auto-translate, or manual trigger button

### System Prompts

**General mode:**
> "你是一名专业的中文-越南语翻译专家。请将以下内容准确翻译，保持原意和语气。"

**Technical mode:**
> "你是旋挖钻机行业的中越翻译专家。精通钻杆、钻头、动力头、液压系统、底盘、变幅机构等术语。请使用行业标准译法翻译以下内容，保留技术规格的数值精度。"

## Error Handling

| Scenario | UX Response |
|---|---|
| API timeout (>10s) | Toast: "翻译服务响应超时，请重试" + Retry button |
| API error (429/500/etc.) | Toast: specific error message |
| Network offline | Inline error: "网络连接失败" with retry |
| Empty input | Translate button disabled |
| Input >5000 chars | Truncate + inline warning |
| Missing API key | Inline prompt: "请先在设置中配置 API Key" |

## Responsive Breakpoints

- **Desktop (1024px+):** 12-col grid, sidebar persistent (w-64), panels side-by-side
- **Tablet (768-1023px):** 8-col grid, sidebar collapses to drawer (hamburger toggle)
- **Mobile (<768px):** 4-col, panels stacked vertically, cards replace tables

## Design System

Reuse all tokens from `DESIGN.md` mapped to Tailwind config:
- Colors: primary (#1e1e1e), secondary (#705d00), tertiary (#001f3d), surface/background greys
- Typography: Inter with display-lg, headline-lg, headline-md, body-lg, body-md, label-md, data-mono
- Shape: rounded-sm (2px), DEFAULT (4px), lg (8px), full (12px)
- Spacing: unit (4px), gutter (24px), margin (32px), container-max (1440px)

## Views Detail

### TranslationView (Home)
- Side-by-side CN→VN panels (2-col grid on desktop, stacked on mobile)
- Top: LanguageToggle with visual CN⇄VN switch button
- Input panel: textarea, mic button (visual only), history button (visual only), char count, clear
- Output panel: rendered result, copy/speak/share buttons, technical accuracy badge
- Below: Bento grid — GlossaryCard (sample terms + link to /glossary), ExchangeRateCard

### GlossaryView
- Search input at top
- Category filter tabs/chips (All, 钻杆, 钻头, 动力头, 液压系统)
- High-density table: CN | VN | EN | Category
- Zebra striping, header bg=primary with white text
- "Add term" button → modal form (saves to store + localStorage)

### InquiryView
- Placeholder card with icon + text: "询价管理功能开发中"

### ProfileView
- API Key input (masked, stored in localStorage)
- Source/target language preference (persisted)
- Dark mode toggle (visual only, functional when theme system added)

## Out of Scope

- Real voice input / speech recognition
- Real OCR / image translation (Visual Parts Identifier is display-only)
- Backend server or database
- User authentication
- Real-time exchange rate API (static data for now)

## Self-Review

- **Placeholders:** InquiryView and ProfileView are intentionally placeholder pages. Visual-only buttons (mic, history, voice) are noted as non-functional.
- **Consistency check:** Component tree matches routes. Store actions cover all data mutations. Error states enumerated.
- **Scope:** Single deliverable — one Vue SPA with all views. No decomposition needed.
- **Ambiguity:** None. API key sourcing is explicit (env var + user input in profile).
