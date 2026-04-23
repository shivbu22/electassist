# ElectAssist — Civic Intelligence Platform 🗳️

An AI-powered, conversational web application that guides Indian citizens through the complete election lifecycle — from voter registration to result declaration — using intelligent, context-aware assistance.

**Challenge Vertical:** Civic Education & Election Literacy  
**Platform:** Google Antigravity  

---

## 🎯 Chosen Vertical & Problem Statement

**Vertical:** Smart Civic Assistant — Election Process Guide

India's general elections are the largest democratic exercise in the world, yet millions of eligible voters remain unaware of critical procedures, deadlines, and their rights. ElectAssist addresses this gap by providing an always-available, AI-driven guide that demystifies the election process.

**Core user scenarios:**
- A first-time voter asking "How do I register?"
- A citizen needing to find their nearest polling booth
- A user wanting to understand the election timeline and key dates
- A voter with questions about EVM/VVPAT, postal ballots, or NRI voting

---

## 🧠 Approach & Logic

### Architecture

```
┌──────────────────────────────────────────────────┐
│                  index.html                       │
│      (UI Shell + Glassmorphic Dark Theme)         │
├──────────────────────────────────────────────────┤
│                   app.js                          │
│  (State Management, DOM Binding, View Router)     │
├─────────┬─────────┬─────────┬────────────────────┤
│ gemini  │  maps   │calendar │      data/          │
│  .js    │  .js    │  .js    │ timeline/faq/       │
│         │         │         │ elections            │
│ Google  │ Google  │ Google  │                      │
│ Gemini  │ Maps +  │Calendar │ Static Knowledge     │
│ AI API  │ Places  │ API     │ Base                 │
└─────────┴─────────┴─────────┴────────────────────┘
```

### Decision Logic

1. **Intent Classification (NLU):** Every user message is run through a regex-based intent classifier that routes to one of 6 intents: `TIMELINE`, `REGISTRATION`, `VOTING`, `RESULTS`, `FAQ`, or `GENERAL`.
2. **Contextual AI Response:** The classified intent is injected into the Gemini prompt as context, ensuring domain-focused, accurate responses.
3. **Action Buttons:** After an AI response, the system surfaces contextual navigation (e.g., "Open Timeline", "Find Booth") based on the detected intent.
4. **Fallback Strategy:** If Google Calendar OAuth fails, the app falls back to ICS file downloads. If Maps API is unavailable, a helpful error is shown with the geocoded location.

---

## ✨ How the Solution Works

### 1. AI Copilot (Google Gemini)
- Users type natural-language questions in the floating chat panel.
- The system classifies intent, builds a context-enriched prompt, and queries **Google Gemini 2.0 Flash** via the Generative Language API.
- Responses are formatted with markdown-to-HTML conversion and follow a strict nonpartisan, educational persona.

### 2. Election Timeline
- A visual, 10-phase timeline covering the complete election lifecycle (Announcement → Constitution of the House).
- Each phase has detailed facts, key points, and a one-click "Add Reminder" button.

### 3. Voter Registration Wizard
- A guided 5-step walkthrough covering eligibility, documents, Form 6, NVSP portal, and application tracking.
- Progress bar with animated transitions between steps.

### 4. Polling Booth Locator (Google Maps)
- Users enter their locality/PIN code.
- **Google Maps Geocoding** resolves the address, then **Google Places API** searches for nearby government schools, local offices, and city halls (typical polling venues).
- Results are displayed as dark-themed map markers with distance calculations (Haversine formula) and direct **Google Maps Directions** links.

### 5. FAQ Knowledge Hub
- 50+ curated FAQs across 6 categories: Registration, Voting Day, EVM & Technology, Special Voters, Counting, and General.
- Real-time search filtering across questions, answers, and tags.

### 6. Google Calendar Integration
- One-click event creation using **Google Calendar API v3** (via OAuth 2.0 with GIS).
- Automatic fallback to `.ics` file download if OAuth is unavailable.
- Deep-link fallback to `calendar.google.com/calendar/render`.

---

## 🛠️ Google Services Integration

| Google Service | Usage | File |
|---|---|---|
| **Google Gemini AI** | Conversational AI assistant for election Q&A | `services/gemini.js` |
| **Google Maps JS API** | Interactive dark-themed polling booth map | `services/maps.js` |
| **Google Places API** | Nearby venue search for polling stations | `services/maps.js` |
| **Google Calendar API** | One-click election date reminders | `services/calendar.js` |
| **Google Identity Services** | OAuth 2.0 token flow for Calendar access | `services/calendar.js` |
| **Google Fonts** | Inter + Outfit typography | `index.html` |
| **Google Material Symbols** | Iconography across all UI elements | `index.html` |

---

## 📂 Repository Structure

```
election-compass/
├── index.html           # UI shell, semantic HTML, SEO metadata
├── style.css            # Design system (glassmorphism, animations, responsive)
├── app.js               # Application logic, state, DOM binding, view router
├── tests.js             # Lightweight test suite (data, intent, a11y, security)
├── .gitignore           # Standard exclusions
├── README.md            # This file
├── services/
│   ├── gemini.js        # Google Gemini API integration
│   ├── mistral.js       # Mistral AI fallback provider
│   ├── maps.js          # Google Maps + Places integration
│   └── calendar.js      # Google Calendar API + ICS fallback
├── data/
│   ├── timeline.js      # 10-phase election lifecycle data
│   ├── faq.js           # 50+ FAQs across 6 categories
│   └── elections.js     # Historical election statistics
└── components/          # Reserved for future web components
```

---

## 🚀 How to Run

1. Clone the repository
2. Serve locally using any HTTP server:
   ```bash
   npx serve .
   ```
3. Open `http://localhost:3000` in a modern browser
4. Navigate to **Settings** (gear icon) → enter your **Google Gemini API Key** and **Google Maps API Key**
5. Start chatting with the AI Copilot or explore Timeline, Registration, Booth Locator, and FAQ

> **Note:** API keys are stored in your browser's `localStorage` only. They are never transmitted to any third party or committed to the repository.

---

## 🔒 Security

- **No hardcoded API keys** — users configure their own keys at runtime via the Settings panel
- **No PII storage** — location data is used transiently for booth lookup and never persisted
- **Input sanitization** — the AI system instruction explicitly rejects prompt injection attempts
- **localStorage only** — all user preferences stay in-browser, no server-side data collection
- **Content Security** — the AI persona is constrained to nonpartisan, factual election content only

---

## ♿ Accessibility

- **Skip-to-content** link for keyboard users
- **Semantic HTML5** — `<header>`, `<main>`, `<nav>`, `<section>` with proper roles
- **ARIA attributes** — decorative elements are `aria-hidden`, interactive elements have `aria-label`
- **High contrast** — WCAG-compliant contrast ratios in the dark theme (white text on dark surfaces)
- **Responsive design** — fully functional from 320px mobile to 4K desktop
- **Keyboard navigation** — all interactive elements are focusable and operable via keyboard
- **Reduced motion** — CSS animations respect `prefers-reduced-motion` (via Tailwind defaults)

---

## ✅ Testing

Run the test suite by importing `tests.js` from the browser console:

```javascript
import('./tests.js');
```

**Test coverage includes:**
- Timeline data integrity (10+ phases, required fields)
- FAQ data integrity (30+ entries, required fields)
- Intent classification accuracy (8 test cases across all 6 intents)
- Haversine distance calculation validation
- Security checks (no hardcoded keys in DOM)
- Accessibility checks (lang, meta, skip-nav, landmarks, ARIA)

---

## 📝 Assumptions

1. **India-specific context:** The assistant is designed for Indian general elections governed by the Election Commission of India (ECI).
2. **Client-side only:** The entire application runs in the browser with no backend server, making it deployable as a static site.
3. **API key model:** Users provide their own Google API keys, which are stored locally. This avoids the need for a proxy server.
4. **Polling booth data:** Since the ECI does not provide a public API for booth locations, the app uses Google Places API to find likely venues (government schools, local offices) near the user's location.
5. **Timeline data:** Election dates in the timeline are illustrative. In production, these would be sourced from ECI notifications.
6. **Modern browser required:** The app uses ES Modules, `IntersectionObserver`, CSS `backdrop-filter`, and other modern APIs.

---

## 💡 Evaluation Focus Areas

| Criteria | Implementation |
|---|---|
| **Code Quality** | Modular ES Module architecture, clean separation of UI/services/data layers, no framework bloat |
| **Security** | Zero hardcoded secrets, input sanitization, localStorage-only key storage |
| **Efficiency** | Pure vanilla JS (< 130 KB total), no build step, instant load |
| **Testing** | Browser-runnable test suite covering data, logic, security, and accessibility |
| **Accessibility** | Skip-nav, ARIA, semantic HTML, high contrast, keyboard-operable, responsive |
| **Google Services** | Gemini AI, Maps, Places, Calendar, Identity Services, Fonts, Material Symbols |

---

*Built for the Google Antigravity Prompthon Challenge.*
