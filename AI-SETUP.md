# AI Listing Assistant Setup

This project uses a Cloudflare Worker as a secure proxy between `admin.html` and OpenAI. Your OpenAI API key is stored only as a Cloudflare secret; it is never added to GitHub or the public website.

## 1. Create the Worker

1. Go to https://dash.cloudflare.com
2. Choose **Workers & Pages**.
3. Click **Create** → **Create Worker**.
4. Name it something like `house-sale-ai`.
5. Click **Deploy**.
6. Choose **Edit code**.
7. Delete the sample code.
8. Paste the contents of `cloudflare-worker/worker.js` from this repository.
9. Click **Deploy**.

## 2. Add your OpenAI key

1. In the Worker, open **Settings** → **Variables and Secrets**.
2. Click **Add**.
3. Choose **Secret**.
4. Set the name to:

```text
OPENAI_API_KEY
```

5. Paste your OpenAI API key as the value.
6. Save and deploy.

## 3. Get the Worker URL

Your Worker URL will look like:

```text
https://house-sale-ai.your-subdomain.workers.dev
```

The admin page expects the analysis endpoint:

```text
https://house-sale-ai.your-subdomain.workers.dev/analyse
```

## 4. Connect admin.html

1. Open:

```text
https://upstartcx.github.io/house-sale/admin.html
```

2. In **Catalogue settings**, paste your Worker URL into **AI Worker URL**.
3. Add `/analyse` to the end if it is not already there.
4. The URL is saved only in your browser.

## 5. Add an item with AI

1. Click **Add item**.
2. Upload one to four clear photos.
3. Click **Analyse with AI**.
4. Review the generated title, description, category, condition, and suggested price.
5. Edit anything that needs correction.
6. Click **Save item**.
7. Download `items.json`.
8. Upload the resized photos to `images/` in GitHub.
9. Replace `data/items.json` with the downloaded file.
10. Commit and push both changes.

## Security

- Never paste your OpenAI API key into `admin.html`, `items.json`, or any public GitHub file.
- Keep the key only in Cloudflare as `OPENAI_API_KEY`.
- If a key is ever exposed, revoke it immediately in the OpenAI dashboard and create a new one.
