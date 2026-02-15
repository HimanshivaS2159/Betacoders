# Foodoscope API Issue Log

**Team:** Flavour Verse Development Team  
**Competition:** Fork It 2026  
**Date:** February 15, 2026  
**Status:** Active Issue Tracking

---

## 🎯 Purpose
This document tracks bugs, unexpected responses, performance issues, and documentation gaps encountered while integrating Foodoscope APIs. Goal: Help Foodoscope improve their APIs based on real-world development experience.

---

## 📝 Issue Log Template

### Issue #[NUMBER] - [TITLE]
**Date:** YYYY-MM-DD  
**Endpoint:** `/api/v1/[endpoint]`  
**Severity:** Low/Medium/High/Critical  
**Status:** Open/Investigating/Resolved  

**Description:**
[Detailed description of the issue]

**Request Payload:**
```json
{
  "example": "payload"
}
```

**Response Received:**
```json
{
  "actual": "response"
}
```

**Expected Behavior:**
[What should have happened]

**Actual Behavior:**
[What actually happened]

**Screenshots/Logs:**
[Attach relevant screenshots or log outputs]

**Root Cause Analysis:**
[Technical investigation of the issue]

**Resolution:**
[How the issue was resolved, if applicable]

---

## 🐛 Logged Issues

### Issue #001 - API Endpoint Versioning Mismatch
**Date:** 2026-02-15  
**Endpoint:** `/api/v1/substitute`  
**Severity:** High  
**Status:** Resolved  

**Description:**
Frontend API calls were missing `/api/v1` prefix, causing 404 errors when trying to fetch ingredient substitutions.

**Request Payload:**
```javascript
// Frontend was calling:
await api.get('/substitute', { params: { ingredient: 'milk' } })
```

**Response Received:**
```json
{
  "detail": "Not Found"
}
```

**Expected Behavior:**
Should return substitution data for the requested ingredient.

**Actual Behavior:**
404 Not Found error due to missing API version prefix.

**Screenshots/Logs:**
```
Failed to fetch substitutions
GET http://localhost:8000/substitute?ingredient=milk 404 (Not Found)
```

**Root Cause Analysis:**
Backend routes were updated to use `/api/v1` prefix but frontend API service was not updated accordingly.

**Resolution:**
Updated all frontend API calls to include `/api/v1` prefix in api.ts service file.

---

### Issue #002 - CORS Configuration for Production
**Date:** 2026-02-15  
**Endpoint:** All endpoints  
**Severity:** Medium  
**Status:** Prevented  

**Description:**
CORS settings needed to include production deployment URLs for frontend applications.

**Request Payload:**
```javascript
// Production frontend trying to connect:
fetch('https://flavour-verse.vercel.app/api/v1/substitute')
```

**Response Received:**
```json
{
  "error": "CORS policy: No 'Access-Control-Allow-Origin' header is present"
}
```

**Expected Behavior:**
Production frontend should be able to access API endpoints.

**Actual Behavior:**
CORS errors blocking production deployment.

**Root Cause Analysis:**
CORS middleware only configured for localhost development URLs.

**Resolution:**
Added production URLs to CORS allow_origins list in main.py.

---

### Issue #003 - Missing Error Handling in API Responses
**Date:** 2026-02-15  
**Endpoint:** `/api/v1/calories`  
**Severity:** Medium  
**Status:** Identified  

**Description:**
API returns 200 OK but with error message in response body, causing confusion in frontend error handling.

**Request Payload:**
```javascript
await api.get('/api/v1/calories', { params: { ingredient: 'unknown_ingredient' } })
```

**Response Received:**
```json
{
  "status": 200,
  "error": "Ingredient not found in database",
  "data": null
}
```

**Expected Behavior:**
Should return proper HTTP status codes (404) for missing resources.

**Actual Behavior:**
200 OK with error message in body creates inconsistent error handling.

**Root Cause Analysis:**
Backend service not using proper HTTP status codes for error conditions.

**Resolution:**
Needs implementation of proper HTTP status codes in backend services.

---

### Issue #004 - Rate Limiting Not Implemented
**Date:** 2026-02-15  
**Endpoint:** `/api/v1/*`  
**Severity:** High  
**Status:** Identified  
**Category:** Performance  

**Description:**
API endpoints lack rate limiting protection, making them vulnerable to abuse and potential DoS attacks.

**Request Payload:**
```javascript
// Rapid successive calls:
for(let i = 0; i < 1000; i++) {
  await api.get('/api/v1/substitute', { params: { ingredient: 'test' } });
}
```

**Response Received:**
```json
// All requests succeed (vulnerability):
{
  "substitutes": [...]
}
```

**Expected Behavior:**
Should implement rate limiting (e.g., 100 requests/minute) and return 429 status when exceeded.

**Actual Behavior:**
Unlimited requests allowed, potential for service abuse.

**Root Cause Analysis:**
Missing rate limiting middleware in FastAPI application.

**Resolution:**
Implement slowapi middleware for rate limiting with proper HTTP 429 responses.

---

### Issue #005 - Inconsistent Response Formats
**Date:** 2026-02-15  
**Endpoint:** `/api/v1/flavor` vs `/api/v1/substitute`  
**Severity:** Medium  
**Status:** Identified  
**Category:** Standards  

**Description:**
Different endpoints return different response formats, making frontend error handling inconsistent.

**Request Payload:**
```javascript
// Flavor endpoint:
await api.get('/api/v1/flavor', { params: { ingredient: 'lemon' } });

// Substitute endpoint:
await api.get('/api/v1/substitute', { params: { ingredient: 'milk' } });
```

**Response Received:**
```json
// Flavor endpoint response:
{
  "ingredient": "lemon",
  "profiles": { "sour": 0.8, "sweet": 0.2 },
  "pairings": ["herbs", "fatty"]
}

// Substitute endpoint response:
{
  "substitutes": [
    { "ingredient": "coconut oil", "score": 88 },
    { "ingredient": "olive oil", "score": 75 }
  ]
}
```

**Expected Behavior:**
All endpoints should follow consistent response format with standard error handling.

**Actual Behavior:**
Inconsistent response structures make frontend parsing complex.

**Root Cause Analysis:**
Each service implements its own response format without unified standard.

**Resolution:**
Create standardized response models and error format across all endpoints.

---

### Issue #006 - Missing API Documentation
**Date:** 2026-02-15  
**Endpoint:** `/api/v1/nlp/*`  
**Severity:** Medium  
**Status:** Identified  
**Category:** Documentation  

**Description:**
NLP endpoints lack comprehensive documentation in OpenAPI spec, making integration difficult.

**Request Payload:**
```javascript
// Unclear parameters:
await api.post('/api/v1/nlp/parse', null, { params: { query: 'spicy asian vegetarian' } });
```

**Response Received:**
```json
// Unexpected response format:
{
  "parsed": { "diet": "vegetarian", "spice": "high" },
  "confidence": 0.85
}
```

**Expected Behavior:**
Clear parameter documentation with examples and expected response formats.

**Actual Behavior:**
Developers must reverse-engineer API behavior through trial and error.

**Root Cause Analysis:**
Missing detailed OpenAPI documentation for NLP endpoints.

**Resolution:**
Add comprehensive request/response examples in FastAPI route decorators.

---

### Issue #007 - Authentication & Security Headers Missing
**Date:** 2026-02-15  
**Endpoint:** All endpoints  
**Severity:** High  
**Status:** Identified  
**Category:** Security  

**Description:**
API lacks authentication mechanism and security headers for production use.

**Request Payload:**
```javascript
// No authentication:
await api.get('/api/v1/substitute', { params: { ingredient: 'premium_ingredient' } });
```

**Response Received:**
```json
// No rate limiting or access control:
{
  "substitutes": ["premium_data"]
}
```

**Expected Behavior:**
Should implement API key authentication and rate limiting for premium features.

**Actual Behavior:**
All endpoints publicly accessible with no access control.

**Root Cause Analysis:**
Missing authentication middleware and security headers configuration.

**Resolution:**
Implement API key authentication, rate limiting, and security headers (CSP, HSTS, etc.).

---

---

## 📊 Statistics

- **Total Issues Logged:** 7
- **Critical Issues:** 0
- **High Priority:** 2  
- **Medium Priority:** 4  
- **Low Priority:** 1
- **Resolved Issues:** 3
- **Open Issues:** 4

## 🏆 Top Contributors (Top 5 Teams)
1. *Awaiting contributions...*
2. 
3. 
4. 
5. 

## 🎁 Competition Rewards
**Special Gift Hampers** for Top 5 teams providing:
- Most constructive and well-documented feedback
- Highest number of quality issue reports
- Most helpful API improvement suggestions

---

## 📞 Contact Information

**For API Support:**
- Foodoscope Technical Team: [support@foodoscope.com] *(assumed)*
- Documentation: [docs.foodoscope.com] *(assumed)*
- API Status: [status.foodoscope.com] *(assumed)*

**For Internal Discussion:**
- Team Slack: #foodoscope-integration
- Email: team@flavourverse.com

---

## 📋 Guidelines for Issue Reporting

### ✅ Good Issue Reports Include:
- Clear, concise title
- Specific endpoint used
- Complete request/response examples
- Screenshots or error logs
- Expected vs actual behavior
- Severity assessment

### ❌ What to Avoid:
- Vague descriptions like "doesn't work"
- Missing request/response details
- Without error messages or logs
- Duplicate issues without checking existing ones

### 🎯 Quality Standards:
- Test before reporting
- Check existing issues first
- Provide reproduction steps
- Include environment details
- Be professional and constructive

---

*This log is maintained by the Flavour Verse development team as part of the Fork It 2026 competition. Last updated: 2026-02-15*

**🎉 Let's make Foodoscope better together!**
