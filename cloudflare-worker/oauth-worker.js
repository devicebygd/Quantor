/**
 * Quantor - GitHub OAuth Proxy for Decap CMS
 * Deploy this as a Cloudflare Worker
 *
 * QURAŞDIRMA:
 * 1. GitHub OAuth App yaradın: https://github.com/settings/developers
 *    - Application name: Quantor CMS
 *    - Homepage URL: https://quantor.az
 *    - Authorization callback URL: https://oauth.quantor.az/callback
 *
 * 2. Cloudflare Workers-ə deploy edin:
 *    - Workers & Pages → Create → Create Worker
 *    - Bu kodu yapışdırın
 *    - Settings → Variables → Environment Variables:
 *      GITHUB_CLIENT_ID = <GitHub OAuth App-dan Client ID>
 *      GITHUB_CLIENT_SECRET = <GitHub OAuth App-dan Client Secret>
 *
 * 3. Custom Domain əlavə edin:
 *    - Worker Settings → Triggers → Custom Domains
 *    - oauth.quantor.az əlavə edin
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Step 1: Redirect to GitHub OAuth
    if (url.pathname === '/auth') {
      const params = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID,
        redirect_uri: `${url.origin}/callback`,
        scope: 'repo,user',
        state: crypto.randomUUID(),
      });
      return Response.redirect(
        `https://github.com/login/oauth/authorize?${params}`,
        302
      );
    }

    // Step 2: Handle OAuth callback
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');

      if (!code) {
        return new Response('Missing code parameter', { status: 400 });
      }

      // Exchange code for access token
      const tokenResponse = await fetch(
        'https://github.com/login/oauth/access_token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code: code,
          }),
        }
      );

      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        return new Response(`OAuth error: ${tokenData.error_description}`, {
          status: 400,
        });
      }

      // Return token to Decap CMS via postMessage
      const html = `<!DOCTYPE html>
<html>
<head><title>OAuth Callback</title></head>
<body>
<script>
(function() {
  function sendMessage(provider, token) {
    var message = "authorization:" + provider + ":success:" + JSON.stringify({ token: token, provider: provider });
    window.opener.postMessage(message, "*");
    window.close();
  }
  sendMessage("github", "${tokenData.access_token}");
})();
</script>
</body>
</html>`;

      return new Response(html, {
        headers: { 'Content-Type': 'text/html', ...corsHeaders },
      });
    }

    // Default response
    return new Response('Quantor OAuth Proxy', {
      headers: { 'Content-Type': 'text/plain', ...corsHeaders },
    });
  },
};
