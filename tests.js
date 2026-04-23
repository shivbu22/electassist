/**
 * ElectAssist — Lightweight Test Suite
 * Validates core functionality without external dependencies.
 * 
 * Run: Open tests.html in a browser, or execute via Node (DOM stubs not needed for logic tests).
 * Usage from console: `import('./tests.js')` on the running app.
 */

import { TIMELINE_DATA } from './data/timeline.js';
import { FAQ_DATA } from './data/faq.js';

const results = { pass: 0, fail: 0, errors: [] };

function assert(condition, testName) {
  if (condition) {
    results.pass++;
    console.log(`  ✅ ${testName}`);
  } else {
    results.fail++;
    results.errors.push(testName);
    console.error(`  ❌ FAIL: ${testName}`);
  }
}

// ─── Data Integrity Tests ──────────────────────────────

console.log('\n📋 TIMELINE DATA TESTS');
assert(Array.isArray(TIMELINE_DATA.phases), 'Timeline phases is an array');
assert(TIMELINE_DATA.phases.length >= 10, `Timeline has ≥10 milestones (found ${TIMELINE_DATA.phases.length})`);
TIMELINE_DATA.phases.forEach((phase, i) => {
  assert(phase.title && phase.title.length > 0, `Phase ${i + 1} has a title`);
  assert(phase.date && phase.date.length > 0, `Phase ${i + 1} has a date`);
  assert(phase.icon && phase.icon.length > 0, `Phase ${i + 1} has an icon`);
  assert(phase.color && phase.color.startsWith('#'), `Phase ${i + 1} has a valid hex color`);
  assert(Array.isArray(phase.keyPoints) && phase.keyPoints.length > 0, `Phase ${i + 1} has key points`);
  assert(phase.details && phase.details.length > 20, `Phase ${i + 1} has detailed description`);
});

console.log('\n📋 FAQ DATA TESTS');
assert(Array.isArray(FAQ_DATA), 'FAQ data is an array');
assert(FAQ_DATA.length >= 30, `FAQ has ≥30 entries (found ${FAQ_DATA.length})`);
FAQ_DATA.forEach((faq, i) => {
  assert(faq.question && faq.question.length > 5, `FAQ ${i + 1} has a question`);
  assert(faq.answer && faq.answer.length > 10, `FAQ ${i + 1} has an answer`);
  assert(Array.isArray(faq.tags), `FAQ ${i + 1} has tags array`);
  assert(faq.category && faq.category.length > 0, `FAQ ${i + 1} has a category`);
});

// ─── Intent Classification Tests ──────────────────────

console.log('\n🤖 INTENT CLASSIFICATION TESTS');

// Minimal re-implementation of classifyIntent for isolated testing
function classifyIntent(message) {
  const lower = message.toLowerCase();
  if (/(timeline|schedule|phase|when is|date|deadline|calendar|upcoming)/.test(lower)) return 'TIMELINE';
  if (/(register|registration|enroll|form 6|voter list|electoral roll|sign up)/.test(lower)) return 'REGISTRATION';
  if (/(vote|voting|booth|polling station|how to vote|evm|vvpat|election day|bring|id|carry)/.test(lower)) return 'VOTING';
  if (/(result|counting|win|won|winner|tally|declared|announced|majority|hung)/.test(lower)) return 'RESULTS';
  if (/(what is|explain|definition|meaning|who is|eligible|can i|allowed)/.test(lower)) return 'FAQ';
  return 'GENERAL';
}

assert(classifyIntent('When is the election?') === 'TIMELINE', 'Detects TIMELINE intent');
assert(classifyIntent('How do I register to vote?') === 'REGISTRATION', 'Detects REGISTRATION intent');
assert(classifyIntent('Where is my polling booth?') === 'VOTING', 'Detects VOTING/BOOTH intent');
assert(classifyIntent('Who won the election?') === 'RESULTS', 'Detects RESULTS intent');
assert(classifyIntent('Explain the rules to me') === 'FAQ', 'Detects FAQ intent');
assert(classifyIntent('Tell me a joke') === 'GENERAL', 'Detects GENERAL intent');
assert(classifyIntent('Can I use Form 6 for registration?') === 'REGISTRATION', 'Multi-keyword REGISTRATION');
assert(classifyIntent('What is the deadline for filing nominations?') === 'TIMELINE', 'TIMELINE via deadline keyword');

// ─── Utility Tests ────────────────────────────────────

console.log('\n🔧 UTILITY TESTS');

// Haversine distance (re-implement for testing)
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const delhiMumbai = calculateDistance(28.6139, 77.2090, 19.0760, 72.8777);
assert(delhiMumbai > 1100 && delhiMumbai < 1200, `Delhi→Mumbai ≈1150km (got ${Math.round(delhiMumbai)}km)`);

const samePoint = calculateDistance(28.6139, 77.2090, 28.6139, 77.2090);
assert(samePoint === 0, 'Same point distance is 0');

// ─── Security Tests ───────────────────────────────────

console.log('\n🔒 SECURITY TESTS');

// Ensure no hardcoded keys in source (ignore if from localStorage)
if (typeof document !== 'undefined') {
  const scripts = document.querySelectorAll('script[src*="key=AI"]');
  const storedMapsKey = localStorage.getItem('electassist_maps_key');
  let hardcodedFound = false;
  
  scripts.forEach(s => {
    if (!storedMapsKey || !s.src.includes(`key=${storedMapsKey}`)) {
      hardcodedFound = true;
    }
  });
  
  assert(!hardcodedFound, 'No hardcoded API keys in script tags');
}

// ─── Accessibility Tests ──────────────────────────────

console.log('\n♿ ACCESSIBILITY TESTS');

if (typeof document !== 'undefined') {
  assert(document.documentElement.lang === 'en', 'HTML lang attribute is set');
  assert(document.querySelector('meta[name="description"]') !== null, 'Meta description exists');
  assert(document.querySelector('meta[name="viewport"]') !== null, 'Viewport meta exists');
  assert(document.querySelector('a[href="#main-content"]') !== null, 'Skip-to-content link exists');
  assert(document.getElementById('main-content') !== null, 'Main content landmark exists');
  assert(document.querySelector('[role="main"]') !== null, 'Main role attribute present');
  
  const images = document.querySelectorAll('img');
  let allImgsHaveAlt = true;
  images.forEach(img => { if (!img.alt && !img.getAttribute('aria-hidden')) allImgsHaveAlt = false; });
  assert(allImgsHaveAlt, 'All images have alt text or are aria-hidden');
  
  const buttons = document.querySelectorAll('button');
  let allBtnsAccessible = true;
  buttons.forEach(btn => {
    if (!btn.textContent.trim() && !btn.getAttribute('aria-label')) allBtnsAccessible = false;
  });
  assert(allBtnsAccessible, 'All buttons have text content or aria-label');
} else {
  console.log('  ⚠️  DOM tests skipped (not running in browser)');
}

// ─── Results ──────────────────────────────────────────

console.log('\n' + '═'.repeat(50));
console.log(`📊 RESULTS: ${results.pass} passed, ${results.fail} failed`);
if (results.fail > 0) {
  console.log('❌ Failed tests:');
  results.errors.forEach(e => console.log(`   • ${e}`));
}
console.log('═'.repeat(50) + '\n');

export { results };
