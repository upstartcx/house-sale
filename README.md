# Moving House Sale

A simple GitHub Pages catalogue for selling household items during a move. Buyers browse items and contact you through WhatsApp.

## Add an item

1. Add compressed photos to the `images/` folder. Use names such as `grey-sofa-1.jpg`.
2. Open `data/items.json`.
3. Add an object inside `"items": []`:

```json
{
  "id": "grey-sofa",
  "title": "Grey 3-seater sofa",
  "desc": "Comfortable fabric sofa from a smoke-free home. Light marks on one armrest.",
  "cat": "Furniture",
  "cond": "Good",
  "price": 2500,
  "pmode": "fixed",
  "status": "available",
  "photos": ["images/grey-sofa-1.jpg"],
  "created": "2026-10-28"
}
```

Use one of these values for `pmode`:

- `fixed` — normal fixed price
- `onco` — Or Nearest Cash Offer
- `offers` — open to offers

Use one of these values for `status`:

- `available`
- `sold`

## Mark an item as sold

Change:

```json
"status": "available"
```

to:

```json
"status": "sold"
```

Then commit and push the change.

## Publish changes

From the repository folder:

```bash
git add .
git commit -m "Add new items"
git push origin github-catalog
```

GitHub Pages will update shortly afterwards.

## Important

Do not add your exact home address, ID number, or banking details to this public repository. Use only a general collection area, your WhatsApp number, and item information.
