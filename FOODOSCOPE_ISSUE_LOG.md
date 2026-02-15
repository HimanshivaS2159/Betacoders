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

---

## 📊 Statistics

- **Total Issues Logged:** 3
- **Critical Issues:** 0
- **High Priority:** 1  
- **Medium Priority:** 2  
- **Low Priority:** 0
- **Resolved Issues:** 2
- **Open Issues:** 1

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
