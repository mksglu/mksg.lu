# Cee AI Cohort Form — Visibility Radio Cards (Focused PRD)

> **Scope**: Only the "Visibility" section of the Cee AI-generated cohort form.
> **Source**: Live extraction via CDP `CSS.getComputedStyleForNode` + `DOM.getOuterHTML`
> **Date**: 2026-02-27 | Instance: `http://mert.count.ly` (Enterprise v25.03)
> **Why this PRD exists**: The initial `:has()` selector extraction failed. This document contains corrected data using direct selectors.

---

## 1. Complete HTML Structure

```html
<!-- Parent container -->
<div class="flex flex-wrap gap-3">

  <!-- SELECTED card (Global) -->
  <label class="flex items-start gap-2.5 px-4 py-3.5 border rounded-button cursor-pointer transition-[border-color,background-color] duration-150 flex-1 border-brand-green-700 bg-brand-green-50">
    <input
      type="radio"
      name="cohort_visibility"
      checked
      class="w-4 h-4 accent-brand-green-700 m-0 cursor-pointer mt-0.5 shrink-0"
      value="global"
    >
    <div>
      <div class="text-sm font-semibold text-dark-900 font-primary">Global</div>
      <div class="text-xs text-dark-500 font-primary mt-0.5">Make this cohort visible to all users</div>
    </div>
  </label>

  <!-- UNSELECTED card (Private) -->
  <label class="flex items-start gap-2.5 px-4 py-3.5 border border-line-600 rounded-button cursor-pointer transition-[border-color,background-color] duration-150 bg-light-0 flex-1">
    <input
      type="radio"
      name="cohort_visibility"
      class="w-4 h-4 accent-brand-green-700 m-0 cursor-pointer mt-0.5 shrink-0"
      value="private"
    >
    <div>
      <div class="text-sm font-semibold text-dark-900 font-primary">Private</div>
      <div class="text-xs text-dark-500 font-primary mt-0.5">Make this cohort visible only to me</div>
    </div>
  </label>

</div>
```

---

## 2. Component Hierarchy

```
div.flex.flex-wrap.gap-3          ← Parent container (802×68px)
├── label (selected)              ← Global card (361×68px, flex-1)
│   ├── input[type="radio"]       ← Native radio (16×16px)
│   └── div                       ← Text wrapper
│       ├── div.text-sm           ← Title: "Global"
│       └── div.text-xs           ← Description text
└── label (unselected)            ← Private card (361×68px, flex-1)
    ├── input[type="radio"]       ← Native radio (16×16px)
    └── div                       ← Text wrapper
        ├── div.text-sm           ← Title: "Private"
        └── div.text-xs           ← Description text
```

---

## 3. Design Tokens Used

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|-------|
| `--brand-green-700` | `#21B566` / `rgb(33, 181, 102)` | `border-brand-green-700`, `accent-brand-green-700` | Selected card border, radio accent |
| `--brand-green-50` | `#EBF8F1` / `rgb(235, 248, 241)` | `bg-brand-green-50` | Selected card background |
| `--light-0` | `#FFFFFF` / `rgb(255, 255, 255)` | `bg-light-0` | Unselected card background |
| `--line-600` | `#ECEBED` / `rgb(236, 235, 237)` | `border-line-600` | Unselected card border |
| `--dark-900` | `#151515` / `rgb(21, 21, 21)` | `text-dark-900` | Title text color |
| `--dark-500` | `#646F7F` / `rgb(100, 111, 127)` | `text-dark-500` | Description text color |
| `font-primary` | `"Plus Jakarta Sans", Arial, sans-serif` | `font-primary` | Both title and description |
| `rounded-button` | Tailwind config value | `rounded-button` | Card border-radius |

---

## 4. Per-Element Computed CSS

### 4.1 Parent Container

**Selector**: `div.flex.flex-wrap.gap-3` (direct parent of the two `<label>` cards)

```css
div.visibility-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;                       /* gap-3 = 0.75rem = 12px */
  width: 802px;                    /* full form width */
  height: 68px;                    /* computed from children */
}
```

### 4.2 Radio Card — Selected State (Global)

**Tailwind classes**: `flex items-start gap-2.5 px-4 py-3.5 border rounded-button cursor-pointer transition-[border-color,background-color] duration-150 flex-1 border-brand-green-700 bg-brand-green-50`

```css
label.radio-card--selected {
  display: flex;
  align-items: flex-start;
  gap: 10px;                       /* gap-2.5 = 0.625rem = 10px */
  padding: 14px 16px;             /* py-3.5=14px, px-4=16px */
  border: 1px solid #21B566;      /* border-brand-green-700 */
  border-radius: var(--rounded-button); /* rounded-button from tailwind config */
  background-color: #EBF8F1;     /* bg-brand-green-50 */
  cursor: pointer;
  flex: 1;                        /* flex-1 */
  transition: border-color 150ms, background-color 150ms;

  /* Computed dimensions */
  width: 361px;                   /* (802 - 12 gap - 2×2 border) / 2 ≈ 361 */
  height: 68px;
}
```

### 4.3 Radio Card — Unselected State (Private)

**Tailwind classes**: `flex items-start gap-2.5 px-4 py-3.5 border border-line-600 rounded-button cursor-pointer transition-[border-color,background-color] duration-150 bg-light-0 flex-1`

```css
label.radio-card--unselected {
  display: flex;
  align-items: flex-start;
  gap: 10px;                       /* gap-2.5 */
  padding: 14px 16px;             /* py-3.5, px-4 */
  border: 1px solid #ECEBED;     /* border-line-600 */
  border-radius: var(--rounded-button);
  background-color: #FFFFFF;      /* bg-light-0 */
  cursor: pointer;
  flex: 1;
  transition: border-color 150ms, background-color 150ms;

  /* Computed dimensions */
  width: 361px;
  height: 68px;
}
```

### 4.4 Native Radio Input

**Tailwind classes**: `w-4 h-4 accent-brand-green-700 m-0 cursor-pointer mt-0.5 shrink-0`

```css
input[type="radio"][name="cohort_visibility"] {
  width: 16px;                    /* w-4 */
  height: 16px;                   /* h-4 */
  accent-color: #21B566;         /* accent-brand-green-700 */
  margin: 0;                     /* m-0 */
  margin-top: 2px;               /* mt-0.5 = 0.125rem = 2px */
  cursor: pointer;
  flex-shrink: 0;                /* shrink-0 */

  /* Browser native rendering */
  appearance: auto;              /* uses native radio with accent-color */
  border-radius: 50%;
}
```

### 4.5 Title Text ("Global" / "Private")

**Tailwind classes**: `text-sm font-semibold text-dark-900 font-primary`

```css
div.radio-title {
  font-family: "Plus Jakarta Sans", Arial, sans-serif; /* font-primary */
  font-size: 14px;               /* text-sm */
  font-weight: 600;              /* font-semibold */
  line-height: 20px;             /* text-sm default line-height */
  color: #151515;                /* text-dark-900 */
}
```

### 4.6 Description Text

**Tailwind classes**: `text-xs text-dark-500 font-primary mt-0.5`

```css
div.radio-description {
  font-family: "Plus Jakarta Sans", Arial, sans-serif; /* font-primary */
  font-size: 12px;               /* text-xs */
  font-weight: 400;              /* default */
  line-height: 16px;             /* text-xs default line-height */
  color: #646F7F;                /* text-dark-500 */
  margin-top: 2px;               /* mt-0.5 = 0.125rem = 2px */
}
```

### 4.7 Text Wrapper (div between radio and text)

```css
div.radio-text-wrapper {
  display: block;                 /* default div */
  /* No explicit classes — just a plain wrapper div */
  /* Width: fills remaining space after 16px radio + 10px gap */
}
```

---

## 5. State Transitions

### Click on unselected card → becomes selected

| Property | Before (Private) | After (Private clicked) |
|----------|-------------------|------------------------|
| **Private label** `border` | `1px solid #ECEBED` | `1px solid #21B566` |
| **Private label** `background-color` | `#FFFFFF` | `#EBF8F1` |
| **Private label** Tailwind class add | — | `border-brand-green-700 bg-brand-green-50` |
| **Private label** Tailwind class remove | `border-line-600 bg-light-0` | — |
| **Private radio** `checked` | `false` | `true` |
| **Global label** `border` | `1px solid #21B566` | `1px solid #ECEBED` |
| **Global label** `background-color` | `#EBF8F1` | `#FFFFFF` |
| **Global label** Tailwind class add | — | `border-line-600 bg-light-0` |
| **Global label** Tailwind class remove | `border-brand-green-700 bg-brand-green-50` | — |
| **Global radio** `checked` | `true` | `false` |

### Transition animation

```css
transition: border-color 150ms, background-color 150ms;
/* duration-150 = 150ms */
/* No easing specified = default (ease) */
```

---

## 6. Differences from Original Countly Drawer

| Aspect | Original Drawer | Cee AI Form |
|--------|----------------|-------------|
| **Component** | Element UI `el-radio.is-bordered.is-autosized` | Native `<label>` + `<input type="radio">` |
| **Framework** | Element UI + custom CSS overrides | Tailwind CSS utility classes |
| **Selected border color** | `#0166D6` (blue) | `#21B566` (green) |
| **Selected bg** | `#FFFFFF` (white, no bg change) | `#EBF8F1` (light green) |
| **Unselected border** | `#CFD6E4` | `#ECEBED` |
| **Radio style** | Element UI custom radio circle (16px, `#0166D6` fill) | Native HTML radio with `accent-color: #21B566` |
| **Card padding** | `16px` all sides | `14px 16px` (py-3.5 px-4) |
| **Card width** | `329px` (50% of 668px container) | `361px` (flex-1 of 802px container, minus gap) |
| **Container width** | `668px` | `802px` |
| **Title font** | Inter, 14px, weight 500 | Plus Jakarta Sans, 14px, weight 600 |
| **Description font** | Inter, 12px, weight 400 | Plus Jakarta Sans, 12px, weight 400 |
| **Description color** | `#7A7A7A` | `#646F7F` |
| **Title color** | `#333C48` | `#151515` |
| **Gap between cards** | implicit (flex layout) | `12px` (gap-3) |
| **Transition** | None documented | `border-color, background-color 150ms` |

---

## 7. Implementation Checklist

To make the Cee AI visibility section match the original drawer pixel-perfectly, fix these:

- [ ] **Border color selected**: Change from `#21B566` → `#0166D6`
- [ ] **Background selected**: Remove `bg-brand-green-50` (#EBF8F1) → keep `#FFFFFF`
- [ ] **Border color unselected**: Change from `#ECEBED` → `#CFD6E4`
- [ ] **Radio accent**: Change from `accent-brand-green-700` → blue accent or custom Element UI radio
- [ ] **Card padding**: Change `py-3.5 px-4` (14px 16px) → `p-4` (16px all)
- [ ] **Title font**: Change `font-primary` (Plus Jakarta Sans) → Inter
- [ ] **Title weight**: Change `font-semibold` (600) → `font-medium` (500)
- [ ] **Description color**: Change `text-dark-500` (#646F7F) → `#7A7A7A`
- [ ] **Title color**: Change `text-dark-900` (#151515) → `#333C48`
- [ ] **Container width**: Adjust form width from 802px → 668px (or match drawer context)
- [ ] **Component type**: Consider replacing native radio with Element UI `el-radio.is-bordered` for consistency

---

## 8. Section Header: "Visibility"

The section header above the radio cards:

```css
/* class="text-[15px] font-semibold text-dark-900 mb-3 font-primary flex items-center gap-1.5" */
div.visibility-header {
  font-family: "Plus Jakarta Sans", Arial, sans-serif;
  font-size: 15px;
  font-weight: 600;
  line-height: normal;
  color: #151515;                  /* text-dark-900 */
  display: flex;
  align-items: center;
  gap: 6px;                       /* gap-1.5 */
  margin-bottom: 12px;            /* mb-3 */
}
```

**Original drawer equivalent**:
```css
.text-big.text-heading {
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #333C48;
  margin-bottom: 16px;
}
```

| Aspect | Original | Cee AI |
|--------|----------|--------|
| Font family | Inter | Plus Jakarta Sans |
| Font size | 16px | 15px |
| Font weight | 500 | 600 |
| Color | #333C48 | #151515 |
| Margin bottom | 16px | 12px |
