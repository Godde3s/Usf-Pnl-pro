// Cloudflare Worker - CORS Proxy
// Deploy: https://dash.cloudflare.com/workers/ > Create Worker > Paste this > Deploy
// Then copy the worker URL (e.g. https://your-worker.your-subdomain.workers.dev)
// and paste it in the Usf-Pnl Pro "Proxy URL" field.

export default {
  async fetch(request) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Max-Age': '86400',
        }
      });
    }

    // Read target URL from ?url= parameter
    const url = new URL(request.url);
    const target = url.searchParams.get('url');
    if (!target) {
      return new Response(JSON.stringify({ error: 'Missing ?url= parameter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // Build the proxied request
    const headers = new Headers(request.headers);
    headers.delete('host');
    headers.delete('referer');
    headers.delete('origin');
    headers.set('User-Agent', 'Mozilla/5.0 (compatible; DeployProxy/1.0)');

    try {
      const resp = await fetch(target, {
        method: request.method,
        headers: headers,
        body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
      });

      // Return response with CORS headers
      const respHeaders = new Headers(resp.headers);
      respHeaders.set('Access-Control-Allow-Origin', '*');
      respHeaders.set('Access-Control-Expose-Headers', '*');

      return new Response(resp.body, {
        status: resp.status,
        statusText: resp.statusText,
        headers: respHeaders,
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
  }
};