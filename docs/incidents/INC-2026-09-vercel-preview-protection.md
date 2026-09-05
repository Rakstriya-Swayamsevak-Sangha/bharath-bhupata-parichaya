# Incident Report: Vercel Preview Deployment Protection / SSO Interception

**Incident ID**: `INC-2026-09-vercel-preview-protection`  
**Date**: September 4, 2026  
**Status**: **CLOSED — NOT AN APPLICATION DEFECT**  
**Severity**: Informational / Operational (Environment Mismatch)  
**Project**: Bharata Bhupata Parichaya (`akhand-bharat-darshana`)  
**Production Domain**: `https://bharat-darshana.vercel.app`  

---

## 1. Executive Summary

Browser console errors (CORS preflight failures, Next.js RSC stream failures, GeoJSON data load failures, and Vercel Analytics `401 Unauthorized`) were observed during QA testing on a Git branch deployment URL:
`https://bharath-b-git-be34d0-rakstriyaswayamsevakasangha-3911s-projects.vercel.app`

Rigorous testing and root-cause analysis determined that:
1. **The failures occurred exclusively on the Vercel Preview Deployment** due to Vercel Deployment Protection (Vercel Authentication / SSO redirect).
2. **The public Production deployment (`https://bharat-darshana.vercel.app`) is healthy**, fully public, returns direct HTTP `200` responses with zero redirects, has a clean console, and passes all functional/PWA checks.
3. **No application code changes were required or permitted** to resolve these symptoms. Speculative fixes (such as adding `Access-Control-Allow-Origin: *`, disabling Service Worker caching, or altering Next.js RSC routing) were explicitly prevented.

---

## 2. Technical Root Cause

### Vercel Deployment Protection Interception
On Vercel Team accounts, **Deployment Protection (Standard Protection / Vercel Authentication)** is enabled by default for Preview Deployments.

When an unauthenticated client or browser context (e.g., standard browser fetch, XHR, or background Service Worker) makes requests for same-origin resources to a protected preview URL:
1. Vercel's edge network intercepts the incoming request before it reaches Next.js or static file handlers.
2. Vercel returns an HTTP `302 Found` response with:
   ```http
   Location: https://vercel.com/sso-api?url=...
   ```
3. Browsers disallow cross-origin redirects on CORS preflight requests (`OPTIONS`) and streaming RSC fetch requests.
4. The browser logs:
   ```text
   CORS policy: Response to preflight request doesn't pass access control check:
   Redirect is not allowed for a preflight request.
   ```
5. `POST /_vercel/insights/view` returns `401 Unauthorized` because telemetry beacons sent by `@vercel/analytics` do not carry Vercel SSO authentication tokens.

---

## 3. Empirical Evidence & Environment Comparison

Requests were tested using anonymous, unauthenticated HTTP requests (simulating clean browser sessions):

| Resource | Protected Preview (`*-git-*.vercel.app`) | Public Production (`bharat-darshana.vercel.app`) | Root Cause Diagnosis |
|---|---|---|---|
| `/` | `302 Found` ➔ `vercel.com/sso-api` | `200 OK` (Direct, `text/html`) | Preview auth gate |
| `/bharatvarsha` | `302 Found` ➔ `vercel.com/sso-api` | `200 OK` (Direct, `text/html`) | Preview auth gate |
| `/manifest.json` | `302 Found` ➔ `vercel.com/sso-api` | `200 OK` (Direct, `application/json`) | Preview auth gate |
| `/countries.geojson` | `302 Found` ➔ `vercel.com/sso-api` | `200 OK` (Direct, `application/geo+json`) | Preview auth gate |
| `/india_states.geojson` | `302 Found` ➔ `vercel.com/sso-api` | `200 OK` (Direct, `application/geo+json`) | Preview auth gate |
| `/data/rivers.json` | `302 Found` ➔ `vercel.com/sso-api` | `200 OK` (Direct, `application/json`) | Preview auth gate |
| `/data/mountains.json` | `302 Found` ➔ `vercel.com/sso-api` | `200 OK` (Direct, `application/json`) | Preview auth gate |
| `/data/internal_borders.json`| `302 Found` ➔ `vercel.com/sso-api` | `200 OK` (Direct, `application/json`) | Preview auth gate |
| `/data/external_borders.json`| `302 Found` ➔ `vercel.com/sso-api` | `200 OK` (Direct, `application/json`) | Preview auth gate |
| `__next.bharatvarsha.txt` (RSC)| `302 Found` ➔ `vercel.com/sso-api` | `200 OK` (Direct, `text/plain`) | Preview auth gate |
| `POST /_vercel/insights/view`| `401 Unauthorized` | `200 / 204 OK` | Preview auth gate |

---

## 4. Release Management & Environmental Distinction

It is critical to maintain the distinction between:
- **Current Production Deployment**: Fully healthy, publicly accessible, and production-ready.
- **`feature/mahapurusha-chanakya` Branch**: Validated locally with clean builds and asset integrity verified, but **not production-proven until merged into `main` and validated via the post-merge production gate.**

---

## 5. Post-Merge Mandatory Production Gate

Before declaring the new feature release complete after merging `feature/mahapurusha-chanakya` (incorporating commit `66e04fe` for asset casing normalization) into `main`:

1. **Production Deployment Trigger**: Confirm Vercel production build completes with exit code `0`.
2. **Anonymous Browser Testing**: Open `https://bharat-darshana.vercel.app/bharatvarsha` in an incognito window without an active Vercel session.
3. **Asset Verification**: Confirm all 49 assets (including `godavari.jpg`, `mahanadi.jpg`, `narmada.jpg`, `kanchi.jpg`, and new Mahapurusha images) return HTTP `200 OK`.
4. **Zero SSO Redirects**: Verify that no same-origin resource requests yield `302 -> vercel.com/sso-api`.
5. **Zero CORS Errors**: Verify that browser DevTools console has zero CORS preflight errors.
6. **Service Worker Integrity**:
   - `[SW:PRECACHE]` completes with `0 failed`.
   - `[SW:VERIFY]` reports `isComplete: true` for all shell, data, and asset tiers.
7. **Offline Mode Validation**: Toggle DevTools to Offline and verify full map and archival drawer interactivity from cache.
8. **Realme Mobile Device QA**: Validate on physical Realme device Chrome browser.

---

## 6. Guardrails & Anti-Patterns (For Future Developers)

> [!WARNING]
> **DO NOT ATTEMPT TO FIX PREVIEW SSO REDIRECTS IN APPLICATION CODE.**

If preview deployment URLs exhibit CORS or redirect issues in the future:
1. **Never add `Access-Control-Allow-Origin: *`** or custom CORS middleware to "fix" Vercel SSO redirects. The browser is legitimately rejecting cross-origin auth redirects on preflight requests.
2. **Never weaken or disable the Service Worker** or alter verification count thresholds to mask missing or redirected resources.
3. **Never proxy static assets** through secondary origins.
4. **Never expose Vercel Protection Bypass Secrets** in client-side code or JavaScript bundles.
5. **Always test public production availability** on the authoritative domain (`https://bharat-darshana.vercel.app`) from a clean/incognito session.
