export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors });
    try {
      const { images, currency = 'ZAR', market = 'South Africa, Gauteng second-hand market' } = await request.json();
      if (!Array.isArray(images) || !images.length) {
        return Response.json({ error: 'Add at least one photo.' }, { status: 400, headers: cors });
      }
      const content = [
        { type: 'text', text: `Analyse these photos as one second-hand household item for a moving sale in ${market}. Identify only what is visible. Do not invent brands, sizes, or features. Assess visible condition honestly. Suggest a conservative asking-price range in ${currency}. Reply ONLY with compact JSON: {"title":"max 60 chars","desc":"1-2 factual sentences","cat":"Furniture|Appliances|Electronics|Kitchen|Décor|Baby & kids|Tools & DIY|Sport & outdoors|Books & media|Clothing|Garden|Other","cond":"Brand new|Excellent|Good|Fair|Needs fixing","min":integer,"max":integer,"suggested":integer,"reason":"one short sentence"}` }
      ];
      for (const image of images.slice(0, 4)) {
        content.push({ type: 'image_url', image_url: { url: image } });
      }
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content }],
          response_format: { type: 'json_object' },
          max_tokens: 500
        })
      });
      const result = await response.json();
      if (!response.ok) {
        return Response.json({ error: result.error?.message || 'OpenAI request failed' }, { status: response.status, headers: cors });
      }
      const data = JSON.parse(result.choices[0].message.content);
      return Response.json({ data }, { headers: cors });
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500, headers: cors });
    }
  }
};
