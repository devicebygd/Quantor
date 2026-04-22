/**
 * Quantor - GitHub OAuth Proxy for Decap CMS
 * Deploy this as a Cloudflare Worker
 *
 * ═══════════════════════════════════════════════════════════
 *  QURAŞDIRMA TƏLİMATI (bir dəfəlik)
 * ═══════════════════════════════════════════════════════════
 *
 * ADDIM 1: GitHub OAuth App yaradın
 *   URL: https://github.com/settings/developers
 *   "OAuth Apps" tabına keçin → "New OAuth App" basın
 *
 *   ⚠️  DİQQƏT: "GitHub Apps" YOX, "OAuth Apps" seçin!
 *       Soldakı menyuda "OAuth Apps" olmalıdır.
 *
 *   Application name:          Quantor CMS
 *   Homepage URL:              https://quantor.az
 *   Authorization callback URL: https://oauth.quantor.az/callback
 *
 *   Yaradıldıqdan sonra "Generate a new client secret" basın.
 *   Client ID və Client Secret-i kopyalayın.
 *
 * ADDIM 2: Cloudflare Worker-ə deploy edin
 *   Cloudflare Dashboard → Workers & Pages → Create → Create Worker
 *   Bu kodu yapışdırın → Save and Deploy
 *
 * ADDIM 3: Environment Variables əlavə edin
 *   Worker → Settings → Variables and Secrets
 *   GITHUB_CLIENT_ID     = (GitHub OAuth App-dan Client ID)
 *   GITHUB_CLIENT_SECRET = (GitHub OAuth App-dan Client Secret)
 *   → Save and Deploy
 *
 * ADDIM 4: Custom Domain əlavə edin
 *   Worker → Settings → Domains & Routes → Add → Custom Domain
 *   oauth.quantor.az → Add
 *
 * YOXLAMA: https://oauth.quantor.az/status açın.
 *   Yaşıl ✅ görürsünüzsə — hər şey düzgündür.
 *   Qırmızı ❌ görürsünüzsə — problemi göstərəcək.
 *
 * ═══════════════════════════════════════════════════════════
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    // ── Diaqnostika səhifəsi ──────────────────────────────
    if (path === '/' || path === '/status') {
      return handleStatus(env, url, headers);
    }

    // ── OAuth: GitHub-a yönləndir ─────────────────────────
    if (path === '/auth') {
      return handleAuth(env, url, headers);
    }

    // ── OAuth: Callback (token al) ────────────────────────
    if (path === '/callback') {
      return handleCallback(request, env, url, headers);
    }

    return new Response('Not Found', { status: 404, headers });
  },
};

// ═══════════════════════════════════════════════════════════
// Diaqnostika: /status
// ═══════════════════════════════════════════════════════════
async function handleStatus(env, url, headers) {
  const clientId = env.GITHUB_CLIENT_ID || '';
  const clientSecret = env.GITHUB_CLIENT_SECRET || '';

  const checks = [];
  let allOk = true;

  // 1. GITHUB_CLIENT_ID mövcuddur?
  if (!clientId) {
    checks.push('❌ GITHUB_CLIENT_ID təyin edilməyib. Worker Settings → Variables-ə əlavə edin.');
    allOk = false;
  } else if (clientId.startsWith('Ov23li') || clientId.startsWith('Iv23li')) {
    checks.push('❌ GITHUB_CLIENT_ID GitHub App ID-sidir (Ov23li... ilə başlayır). Bu SƏHV-dir!');
    checks.push('   → "OAuth Apps" yaradın, "GitHub Apps" yox.');
    checks.push('   → https://github.com/settings/developers → OAuth Apps → New OAuth App');
    checks.push('   Hal-hazırki ID: ' + clientId);
    allOk = false;
  } else {
    checks.push('✅ GITHUB_CLIENT_ID təyin edilib: ' + clientId.substring(0, 6) + '...');
  }

  // 2. GITHUB_CLIENT_SECRET mövcuddur?
  if (!clientSecret) {
    checks.push('❌ GITHUB_CLIENT_SECRET təyin edilməyib. Worker Settings → Variables-ə əlavə edin.');
    allOk = false;
  } else {
    checks.push('✅ GITHUB_CLIENT_SECRET təyin edilib (' + clientSecret.length + ' simvol)');
  }

  // 3. GitHub API ilə yoxla (client_id-nin düzgünlüyü)
  if (clientId && clientSecret && allOk) {
    try {
      const testRes = await fetch('https://api.github.com/applications/' + clientId, {
        headers: {
          'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
          'User-Agent': 'Quantor-OAuth-Proxy',
          'Accept': 'application/vnd.github.v3+json',
        },
      });
      if (testRes.ok) {
        const appData = await testRes.json();
        checks.push('✅ GitHub OAuth App tapıldı: "' + appData.name + '"');
        const expectedCallback = url.origin + '/callback';
        if (appData.callback_url === expectedCallback) {
          checks.push('✅ Callback URL düzgündür: ' + appData.callback_url);
        } else {
          checks.push('❌ Callback URL SƏHV-dir!');
          checks.push('   Hal-hazırki: ' + (appData.callback_url || '(boş)'));
          checks.push('   Olmalıdır:   ' + expectedCallback);
          checks.push('   → GitHub OAuth App settings-dən düzəldin');
          allOk = false;
        }
      } else if (testRes.status === 404) {
        checks.push('❌ Bu Client ID ilə OAuth App tapılmadı. ID-ni yoxlayın.');
        allOk = false;
      } else if (testRes.status === 401) {
        checks.push('❌ Client Secret səhvdir. Yeni secret generate edin.');
        allOk = false;
      } else {
        checks.push('⚠️ GitHub API cavabı: ' + testRes.status + ' (əl ilə yoxlayın)');
      }
    } catch (e) {
      checks.push('⚠️ GitHub API yoxlanışı uğursuz: ' + e.message);
    }
  }

  // Nəticə
  const statusEmoji = allOk ? '✅' : '❌';
  const statusText = allOk ? 'Hər şey düzgündür! CMS login işləməlidir.' : 'Problemlər tapıldı. Aşağıdakıları düzəldin.';

  const html = `<!DOCTYPE html>
<html lang="az">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quantor OAuth Status</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f0f2f5; padding: 2rem; }
    .card { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 2rem; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
    h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    .status { font-size: 1.1rem; padding: 0.75rem 1rem; border-radius: 8px; margin: 1rem 0; }
    .status.ok { background: #d4edda; color: #155724; }
    .status.err { background: #f8d7da; color: #721c24; }
    pre { background: #f8f9fa; padding: 1rem; border-radius: 8px; font-size: 0.85rem; white-space: pre-wrap; word-break: break-all; line-height: 1.6; overflow-x: auto; }
    .footer { margin-top: 1.5rem; font-size: 0.8rem; color: #888; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Quantor OAuth Proxy</h1>
    <div class="status ${allOk ? 'ok' : 'err'}">${statusEmoji} ${statusText}</div>
    <pre>${checks.join('\n')}</pre>
    <div class="footer">oauth.quantor.az — Decap CMS üçün GitHub OAuth Proxy</div>
  </div>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', ...headers },
  });
}

// ═══════════════════════════════════════════════════════════
// OAuth Step 1: GitHub-a yönləndir
// ═══════════════════════════════════════════════════════════
function handleAuth(env, url, headers) {
  if (!env.GITHUB_CLIENT_ID) {
    return new Response('GITHUB_CLIENT_ID təyin edilməyib. /status səhifəsinə baxın.', {
      status: 500, headers,
    });
  }

  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: url.origin + '/callback',
    scope: 'repo,user',
    state: crypto.randomUUID(),
  });

  return Response.redirect(
    'https://github.com/login/oauth/authorize?' + params.toString(),
    302
  );
}

// ═══════════════════════════════════════════════════════════
// OAuth Step 2: Callback — token al və CMS-ə qaytar
// ═══════════════════════════════════════════════════════════
async function handleCallback(request, env, url, headers) {
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  // GitHub error qaytardı?
  if (error) {
    const desc = url.searchParams.get('error_description') || error;
    return errorPage('GitHub xətası: ' + desc, headers);
  }

  if (!code) {
    return errorPage('GitHub authorization code tapılmadı.', headers);
  }

  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return errorPage('Worker environment variables təyin edilməyib. /status yoxlayın.', headers);
  }

  // Code-u token-ə dəyiş
  let tokenData;
  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code: code,
      }),
    });
    tokenData = await tokenRes.json();
  } catch (e) {
    return errorPage('GitHub ilə əlaqə qurula bilmədi: ' + e.message, headers);
  }

  if (tokenData.error) {
    return errorPage('Token xətası: ' + (tokenData.error_description || tokenData.error), headers);
  }

  if (!tokenData.access_token) {
    return errorPage('GitHub access_token qaytarmadı. OAuth App credentials-i yoxlayın.', headers);
  }

  // Uğurlu! Token-i CMS popup pəncərəsinə göndər
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Avtorizasiya uğurlu</title></head>
<body>
<p style="font-family:sans-serif;text-align:center;padding:2rem;">Avtorizasiya uğurlu. Pəncərə bağlanır...</p>
<script>
(function() {
  var token = ${JSON.stringify(tokenData.access_token)};
  var message = "authorization:github:success:" + JSON.stringify({token: token, provider: "github"});

  if (window.opener) {
    window.opener.postMessage(message, "*");
    setTimeout(function() { window.close(); }, 500);
  } else {
    document.body.innerHTML = '<p style="font-family:sans-serif;text-align:center;padding:2rem;color:green;">✅ Avtorizasiya uğurlu! Bu pəncərəni bağlayıb admin panelə qayıdın.</p>';
  }
})();
</script>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', ...headers },
  });
}

// ═══════════════════════════════════════════════════════════
// Error səhifəsi
// ═══════════════════════════════════════════════════════════
function errorPage(message, headers) {
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>OAuth Xətası</title></head>
<body style="font-family:sans-serif;max-width:500px;margin:2rem auto;padding:1rem;">
  <h2 style="color:#dc3545;">❌ Xəta</h2>
  <p style="background:#f8d7da;padding:1rem;border-radius:8px;color:#721c24;">${message}</p>
  <p style="margin-top:1rem;"><a href="/status">→ Diaqnostika səhifəsinə keçin</a></p>
  <p><a href="javascript:window.close()">Pəncərəni bağla</a></p>
</body>
</html>`;

  return new Response(html, {
    status: 400,
    headers: { 'Content-Type': 'text/html; charset=utf-8', ...headers },
  });
}
