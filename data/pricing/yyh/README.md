# YYH Pricing Files

Create one file per set using this naming pattern:
- `<set-slug>-pricing.json`
- Example: `gateway-pricing.json`, `ghost-files-pricing.json`

## Supported fields per item
- `name` (required)
- `variant` (optional, defaults to `Standard`)
- `id` (optional)
- `priceUsd` (number or string like `$12.50`)
- `compsCount` (number)
- `status` (`Unpriced`, `Priced`, `Needs Review`)
- `notes` (optional)

## Example item
```json
{
  "name": "Genkai, The Young",
  "variant": "Standard",
  "priceUsd": 18.5,
  "compsCount": 6,
  "status": "Priced",
  "notes": "Median of recent sold listings"
}
```

## Workflow
1. Export one set from Excel.
2. Populate the matching set pricing file.
3. Reload inventory and filter to that set.
4. Use `Price Status` filter and `Price` sort options.
