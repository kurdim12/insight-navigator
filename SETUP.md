# DevSEO Frontend Setup Guide

**Built with:** React + Vite + TypeScript + shadcn/ui + Lovable
**Backend:** https://github.com/kurdim12/DEV-SEO.git

---

## 🚀 Quick Start (5 Minutes)

### 1. Prerequisites

- Node.js 18+ installed
- Backend running on http://localhost:8000
- Clerk account (get free at https://clerk.com)

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create `.env.local` file:

```bash
# Backend API
VITE_API_URL=http://localhost:8000

# Clerk Auth (Get from https://dashboard.clerk.com)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
```

**Get Clerk Key:**
1. Go to https://dashboard.clerk.com
2. Create project or select existing
3. Go to API Keys
4. Copy "Publishable Key"
5. Paste into `.env.local`

### 4. Start Development Server

```bash
npm run dev
```

Frontend will open at **http://localhost:5173**

---

## ✅ Verify Backend Connection

Open browser console on http://localhost:5173:

```javascript
// Test health endpoint
fetch('http://localhost:8000/health')
  .then(r => r.json())
  .then(console.log)

// Should see: { status: "healthy", timestamp: "...", version: "1.0.0" }
```

**If CORS error:**
1. Check backend is running
2. Restart backend
3. Check backend CORS config includes `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/        # Dashboard-specific components
│   ├── layout/          # Layout components (Sidebar, etc.)
│   └── ui/              # shadcn/ui components
├── hooks/
│   ├── useWebsites.ts   # Website API hooks
│   ├── useScans.ts      # Scan API hooks
│   └── use-toast.ts     # Toast notifications
├── lib/
│   ├── api.ts           # Backend API client
│   ├── types.ts         # TypeScript interfaces
│   └── utils.ts         # Utility functions
├── pages/
│   ├── Dashboard.tsx
│   ├── Websites.tsx
│   ├── WebsiteDetails.tsx
│   ├── ScanReport.tsx
│   ├── ContentOptimizer.tsx
│   ├── Billing.tsx
│   └── Settings.tsx
└── App.tsx              # Main app with routing
```

---

## 🔌 API Integration

### Available Hooks

**Websites:**
```typescript
import { useWebsites, useCreateWebsite, useDeleteWebsite } from '@/hooks/useWebsites';

// In component
const { data: websites, isLoading } = useWebsites();
const createWebsite = useCreateWebsite();
const deleteWebsite = useDeleteWebsite();

// Usage
createWebsite.mutate('https://example.com');
deleteWebsite.mutate(websiteId);
```

**Scans:**
```typescript
import { useScans, useScan, useStartScan } from '@/hooks/useScans';

// List scans
const { data: scans } = useScans();

// Get scan report (auto-polls if running)
const { data: scan } = useScan(scanId);

// Start new scan
const startScan = useStartScan();
startScan.mutate({ websiteId, maxPages: 100 });
```

### API Client

Direct API access (if needed):

```typescript
import { websiteApi, scanApi, contentApi } from '@/lib/api';

// Websites
const websites = await websiteApi.list();
const website = await websiteApi.get(id);
await websiteApi.create({ url: 'https://example.com' });

// Scans
const scans = await scanApi.list();
const report = await scanApi.get(scanId);
await scanApi.start(websiteId, 100);

// Content Optimizer
const result = await contentApi.optimize({
  text: 'Your content...',
  target_keyword: 'SEO'
});
```

---

## 🎨 UI Components (shadcn/ui)

All components available in `src/components/ui/`:

```typescript
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
// ... and many more
```

---

## 🧪 Testing Backend Integration

### Test 1: Health Check
```bash
curl http://localhost:8000/health
```

### Test 2: List Websites (needs auth)
In browser console after logging in:
```javascript
const token = await window.Clerk.session.getToken();
fetch('http://localhost:8000/api/v1/websites', {
  headers: { 'Authorization': `Bearer ${token}` }
})
  .then(r => r.json())
  .then(console.log);
```

### Test 3: Create Website
Use the UI or console:
```javascript
// Will automatically include auth from Clerk
import { websiteApi } from '@/lib/api';
await websiteApi.create({ url: 'https://example.com' });
```

---

## 🚨 Troubleshooting

### Issue: "Failed to fetch"
**Solution:** Backend not running
```bash
cd ../devseo/backend
venv\Scripts\activate  # or source venv/bin/activate on Mac/Linux
python -m app.main
```

### Issue: CORS Error
**Solution:** Restart backend after CORS config changes
```bash
# In backend terminal
Ctrl+C
python -m app.main
```

### Issue: 401 Unauthorized
**Solution:** Check Clerk configuration
1. Verify VITE_CLERK_PUBLISHABLE_KEY in `.env.local`
2. Verify CLERK_SECRET_KEY in backend `.env`
3. Restart both frontend and backend

### Issue: Types Error
**Solution:** Reinstall dependencies
```bash
rm -rf node_modules
npm install
```

---

## 📦 Build for Production

```bash
# Build
npm run build

# Preview build
npm run preview

# Deploy to Lovable
# Just push to GitHub - Lovable auto-deploys
```

---

## 🔄 Sync with Lovable

Any changes you make here will sync to Lovable automatically if:
1. Changes are committed to GitHub
2. Lovable project is connected to this repo

Lovable can also make changes that will appear here when you pull:
```bash
git pull origin main
```

---

## 🎯 Next Steps

1. **Start Backend** (if not running)
   ```bash
   cd ../devseo/backend
   python -m app.main
   ```

2. **Start Frontend**
   ```bash
   npm run dev
   ```

3. **Sign Up**
   - Go to http://localhost:5173
   - Click "Sign Up"
   - Create account with Clerk

4. **Test Features**
   - Add a website
   - Start a scan
   - View results
   - Try content optimizer

---

## 📞 Get Help

**Frontend Issues:**
- Check browser console (F12)
- Check Network tab for API calls
- Verify .env.local file exists

**Backend Issues:**
- Check backend console for errors
- Visit http://localhost:8000/docs
- Check database is running

**Integration Issues:**
- Follow checklist in backend repo: `INTEGRATION_CHECKLIST.md`
- Verify both services running
- Test endpoints individually

---

## 🔗 Useful Links

- **Backend Repo:** https://github.com/kurdim12/DEV-SEO.git
- **API Documentation:** http://localhost:8000/docs
- **Clerk Dashboard:** https://dashboard.clerk.com
- **shadcn/ui Docs:** https://ui.shadcn.com
- **React Query Docs:** https://tanstack.com/query/latest

---

## ✨ Features

**Implemented:**
- ✅ Complete routing (7 pages)
- ✅ Backend API integration
- ✅ React Query data fetching
- ✅ Clerk authentication ready
- ✅ shadcn/ui components
- ✅ TypeScript type safety
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Error handling

**Ready to Implement:**
- 🔄 Dashboard with real data
- 🔄 Website management UI
- 🔄 Scan report viewing
- 🔄 Content optimizer UI
- 🔄 Domain verification wizard
- 🔄 Arabic language support
- 🔄 Plain English toggle
- 🔄 Billing integration

---

**Last Updated:** February 11, 2026
**Status:** Backend Integration Complete - Ready for UI Implementation
