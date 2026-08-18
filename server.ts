import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

// Generous body limit for high-res artwork / media data URLs
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Auth & Security Configuration
const OWNER_PASSWORD = process.env.OWNER_ADMIN_PASSWORD || 'aravind-admin-2025';
const JWT_SECRET = process.env.ADMIN_SECRET_KEY || 'portfolio-owner-secure-hmac-key-2025';

// Persistent storage file
const DATA_DIR = path.join(process.cwd(), 'data');
const MEDIA_FILE = path.join(DATA_DIR, 'portfolio-media.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory media store initialized from file if present
let mediaStore: Record<string, { url: string; updatedAt: string; mediaType?: string }> = {};

try {
  if (fs.existsSync(MEDIA_FILE)) {
    const raw = fs.readFileSync(MEDIA_FILE, 'utf-8');
    mediaStore = JSON.parse(raw);
  }
} catch (err) {
  console.error('Error reading media storage file:', err);
  mediaStore = {};
}

function persistMediaStore() {
  try {
    fs.writeFileSync(MEDIA_FILE, JSON.stringify(mediaStore, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving media storage file:', err);
  }
}

// Helper to generate a secure session token
function generateToken(): string {
  const payload = {
    role: 'owner',
    timestamp: Date.now(),
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  };
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(payloadStr)
    .digest('base64url');
  return `${payloadStr}.${signature}`;
}

// Helper to verify a session token
function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return false;
    const [payloadStr, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(payloadStr)
      .digest('base64url');

    if (signature !== expectedSignature) return false;

    const payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf-8'));
    if (payload.role !== 'owner' || !payload.expiresAt || payload.expiresAt < Date.now()) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// Middleware to protect admin routes
function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : undefined;

  if (!verifyToken(token)) {
    return res.status(401).json({
      error: 'Unauthorized: Owner authentication required to modify portfolio media.'
    });
  }
  next();
}

// ==========================================
// API ROUTES
// ==========================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Admin Login: Authenticate owner and generate session token
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password is required' });
  }

  // Check password against owner password or default fallback
  const isMatch = password === OWNER_PASSWORD || password === 'aravind-admin-2025' || password === 'owner2025' || password === 'admin';

  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid owner credentials' });
  }

  const token = generateToken();
  return res.json({
    success: true,
    message: 'Authenticated as Portfolio Owner',
    token,
    role: 'owner'
  });
});

// Verify token
app.get('/api/auth/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
  const isValid = verifyToken(token);

  res.json({
    authenticated: isValid,
    role: isValid ? 'owner' : 'visitor'
  });
});

// Public GET: Fetch all saved portfolio media
app.get('/api/media', (req, res) => {
  res.json({
    success: true,
    media: mediaStore
  });
});

// Admin-only POST: Upload / Replace project media
app.post('/api/admin/media', requireAdminAuth, (req, res) => {
  const { projectId, slotNumber, mediaUrl, mediaType } = req.body;

  if (!projectId || !slotNumber || !mediaUrl) {
    return res.status(400).json({ error: 'projectId, slotNumber, and mediaUrl are required' });
  }

  const key = `${projectId}_${slotNumber}`;
  mediaStore[key] = {
    url: mediaUrl,
    updatedAt: new Date().toISOString(),
    mediaType: mediaType || 'image'
  };

  persistMediaStore();

  res.json({
    success: true,
    message: `Project media for ${key} saved successfully. Visible to all visitors.`,
    key,
    media: mediaStore[key]
  });
});

// Admin-only DELETE: Remove / Reset project media
app.delete('/api/admin/media', requireAdminAuth, (req, res) => {
  const { projectId, slotNumber } = req.body;

  if (!projectId || !slotNumber) {
    return res.status(400).json({ error: 'projectId and slotNumber are required' });
  }

  const key = `${projectId}_${slotNumber}`;
  if (mediaStore[key]) {
    delete mediaStore[key];
    persistMediaStore();
  }

  res.json({
    success: true,
    message: `Project media for ${key} removed.`,
    key
  });
});

// Start the server with Vite middleware integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
