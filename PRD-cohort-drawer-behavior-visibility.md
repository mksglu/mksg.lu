# Countly Cohort Drawer — Behavior Segmentation & Visibility (Focused PRD)

> **Scope**: Two sections of the Countly cohort drawer — (1) User Behavior Segmentation with Event Type Selector, and (2) Visibility Radio Cards.
> **Source**: Live extraction via CDP `CSS.getComputedStyleForNode` + `DOM.getOuterHTML` + Playwright accessibility snapshots
> **Date**: 2026-02-27 | Instance: `http://mert.count.ly` (Enterprise v25.03)
> **Extraction method**: CDP protocol for computed styles; Playwright snapshots for structure and data-test-ids; manual interaction for tab behavior verification.

---

## Part 1: User Behavior Segmentation — Event Type Selector

### 1.1 Component Overview

The Event Type Selector is a dropdown component inside each behavior segmentation row. It is triggered by clicking the event name pseudo-input (e.g. "Sessions") and renders as a body-level popper containing a horizontal tab bar and, for multi-item tabs, a searchable list of events.

The selector lives inside the `cly-event-select` wrapper and uses Element UI's `el-select` with a custom pseudo-input trigger (`el-input__inner--auto-resize`). The dropdown panel is appended to `<body>` (not inline) and positioned via `[x-placement]`.

### 1.2 Tab Categories & Content

| Tab # | Tab Name | Type | Items | Internal Event Key |
|-------|----------|------|-------|--------------------|
| 0 | Sessions | Single (auto-select) | — | `[CLY]_session` |
| 1 | Events | Multi-item list | Comment Added, Feature Used, File Uploaded, Integration Connected, Project Archived, Project Created, Task Completed, Task Created, Task Updated | Custom events |
| 2 | View | Single (auto-select) | — | `[CLY]_view` |
| 3 | Feedback | Multi-item list | Ratings, NPS, Surveys | Feedback events |
| 4 | LLM Observability | Multi-item list | LLM Interaction, LLM Interaction Feedback, LLM Tool Used, LLM Tool Usage Parameter | LLM events |
| 5 | Consent | Single (auto-select) | — | Consent event |
| 6 | Crash | Single (auto-select) | — | Crash event |
| 7 | Push Actioned | Single (auto-select) | — | `[CLY]_push_action` |
| 8 | Journey | Multi-item list | Journey Started, Journey Ended, Content Views, Content Interactions | Journey events |

### 1.3 Tab Behavior Types

There are two distinct behavior modes for tabs:

**Single (auto-select)** — Tabs 0, 2, 5, 6, 7
- Clicking the tab immediately selects the corresponding event.
- The dropdown closes automatically after selection.
- No search input or list is rendered.
- The pseudo-input label updates to the tab name (e.g. "Sessions", "View").

**Multi-item list** — Tabs 1, 3, 4, 8
- Clicking the tab reveals a panel with:
  - A search input at the top (with magnifying glass prefix icon).
  - A scrollable list of events below the search input.
- The user must click a specific event item to select it.
- The dropdown closes only after an item is clicked.
- The pseudo-input label updates to the selected item name (e.g. "Task Created", "NPS").
- Search filters the list in real-time (case-insensitive substring match).

### 1.4 Behavior Row HTML Structure

```html
<div class="cly-vue-cohort-seg-step">
  <div>
    <div class="text-medium">Users who</div>
    <div class="cly-vue-qb-seg__row">
      <!-- 1. Behavior type select (performed/didn't perform) -->
      <div data-test-id="cohorts-drawer-seg-step-0-behavior-type-el-select" class="el-select">
        <input class="el-input__inner" value="performed">
      </div>

      <!-- 2. Event type selector -->
      <div class="cly-event-select has-tooltip">
        <div data-test-id="cohorts-drawer-seg-step-0-event-type-dropdown-el-select" class="cly-vue-dropdown el-select cly-vue-select-x">
          <span data-test-id="cohorts-drawer-seg-step-0-event-type-pseudo-input-label" class="el-input__inner el-input__inner--auto-resize">
            Sessions
          </span>
        </div>
      </div>

      <!-- 3. Frequency trigger -->
      <div data-test-id="cohorts-drawer-seg-step-0-event-times-dropdown">
        <input class="el-input__inner el-input__inner--auto-resize" value="at least 1 time">
      </div>

      <!-- 4. Time range trigger -->
      <div data-test-id="cohorts-drawer-seg-step-0-event-period-dropdown">
        <input class="el-input__inner" value="All time">
      </div>

      <!-- 5. Delete button -->
      <div class="cly-vue-qb-icon cly-icon-button--gray">×</div>
    </div>

    <div class="text-medium">which has</div>
  </div>
  <div>
    <span class="cly-text-button">+ Add property</span>
  </div>
</div>
```

### 1.5 Per-Element Computed CSS

#### 1.5.1 Dropdown Panel (body-level popper)

**Selector**: `[x-placement] .el-select-dropdown.el-popper` (contains event-type data-test-id)

```css
.event-type-dropdown-panel {
  position: fixed;
  background-color: rgb(255, 255, 255);   /* #FFFFFF */
  width: 823px;                            /* full drawer width */
  height: 282px;                           /* auto, varies by content */
  z-index: 2009;
  margin-top: 6px;
  border: 1px solid #A7AEB8;
  border-radius: 4px;
}
```

> **Note**: The dropdown is appended to `<body>` via Element UI's popper mechanism. It is NOT a child of the drawer DOM tree. The `z-index: 2009` ensures it floats above the drawer overlay (`z-index: 2001`).

#### 1.5.2 Active Tab Button (checked state)

**Selector**: `[data-test-id="cohorts-drawer-seg-step-0-event-type-tab-{tabIndex}"] .el-radio-button__inner`

```css
.event-tab--active .el-radio-button__inner {
  background-color: rgb(1, 102, 214);      /* #0166D6 */
  color: rgb(255, 255, 255);               /* white */
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  height: 32px;
  cursor: pointer;
  box-shadow: rgb(1, 102, 214) -1px 0px 0px 0px;
  padding: 8px 12px;
}
```

#### 1.5.3 Inactive Tab Button

**Selector**: `[data-test-id="cohorts-drawer-seg-step-0-event-type-tab-{tabIndex}"] .el-radio-button__inner`

```css
.event-tab--inactive .el-radio-button__inner {
  background-color: rgb(255, 255, 255);    /* white */
  color: rgb(51, 60, 72);                  /* #333C48 */
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  height: 32px;
  cursor: pointer;
  box-shadow: none;
  border: 1px solid #E2E4E8;
  padding: 8px 12px;
}
```

#### 1.5.4 Tab Button Border-Radius Pattern

```css
/* First tab (Sessions, tab-0) */
.event-tab:first-child .el-radio-button__inner {
  border-radius: 4px 0 0 4px;
}

/* Middle tabs (tab-1 through tab-7) */
.event-tab:not(:first-child):not(:last-child) .el-radio-button__inner {
  border-radius: 0;
}

/* Last tab (Journey, tab-8) */
.event-tab:last-child .el-radio-button__inner {
  border-radius: 0 4px 4px 0;
}
```

> **Implementation note**: Element UI `el-radio-button` groups handle this automatically. When implementing from scratch, the border-radius pattern must be applied manually. The active tab uses `box-shadow: #0166D6 -1px 0px 0px 0px` to cover the left border gap between adjacent tabs.

#### 1.5.5 Event Pseudo-Input Trigger (closed state)

**Selector**: `[data-test-id="cohorts-drawer-seg-step-0-event-type-pseudo-input-label"]`
**Element**: `<span class="el-input__inner el-input__inner--auto-resize">`

```css
.event-pseudo-input {
  background-color: rgb(255, 255, 255);    /* #FFFFFF */
  color: rgb(51, 60, 72);                  /* #333C48 */
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  height: 32px;
  line-height: 32px;
  min-width: 100px;
  max-width: 120px;
  text-overflow: ellipsis;
  cursor: pointer;
  border: 1px solid #CFD6E4;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);  /* container shadow */
}
```

#### 1.5.6 Dropdown Search Input (inside multi-item panels)

**Selector**: `.cly-vue-dropdown__pop .el-input__inner`

```css
.event-search-input {
  background-color: rgb(255, 255, 255);    /* #FFFFFF */
  color: rgb(51, 60, 72);                  /* #333C48 */
  font-family: Inter;
  font-size: 14px;
  height: 32px;
  padding-left: 30px;                      /* space for prefix search icon */
  width: 100%;
  border: 1px solid #CFD6E4;
  border-radius: 4px;
}

.event-search-input:focus {
  background-color: rgb(246, 246, 246);    /* #F6F6F6 */
  border-color: #0166D6;
  box-shadow: 0 0 0 3px #E1EFFF;
}
```

#### 1.5.7 List Item

**Selector**: `.cly-vue-listbox__item`

```css
.event-list-item {
  color: rgb(51, 60, 72);                  /* #333C48 */
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  padding: 8px;
  margin: 8px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.event-list-item:hover {
  background: #F6F6F6;
}

.event-list-item--selected {
  background: #0166D6;
  color: #FFFFFF;
}
```

#### 1.5.8 "which has" Text

```css
.which-has-text {
  color: rgb(51, 60, 72);                  /* #333C48 */
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  padding: 4px;
}
```

#### 1.5.9 "+ Add property" Link

```css
.add-property-link {
  color: rgb(1, 102, 214);                /* #0166D6 */
  font-family: Inter;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}
```

### 1.6 data-test-id Patterns

All behavior segmentation elements follow a predictable naming convention with `{stepIndex}` as the zero-based step number:

```
cohorts-drawer-seg-step-{stepIndex}-behavior-type-el-select
cohorts-drawer-seg-step-{stepIndex}-event-type-dropdown-el-select
cohorts-drawer-seg-step-{stepIndex}-event-type-pseudo-input-label
cohorts-drawer-seg-step-{stepIndex}-event-type-pseudo-input
cohorts-drawer-seg-step-{stepIndex}-event-type-tab-{tabIndex}
cohorts-drawer-seg-step-{stepIndex}-event-type-el-tab-{tabKey}
cohorts-drawer-seg-step-{stepIndex}-event-type-item-{eventKey}
cohorts-drawer-seg-step-{stepIndex}-event-times-dropdown
cohorts-drawer-seg-step-{stepIndex}-event-period-dropdown
```

**Usage examples**:
- First step, Sessions tab: `cohorts-drawer-seg-step-0-event-type-tab-0`
- First step, Journey tab: `cohorts-drawer-seg-step-0-event-type-tab-8`
- Second step, event item: `cohorts-drawer-seg-step-1-event-type-item-TaskCreated`

### 1.7 Screenshot Index

| Screenshot | Description |
|-----------|-------------|
| `prd-assets/event-selector-sessions-tab.png` | Sessions tab (default, empty — single auto-select) |
| `prd-assets/event-selector-events-tab.png` | Events tab with custom events list (multi-item) |
| `prd-assets/event-selector-feedback-tab.png` | Feedback tab: Ratings, NPS, Surveys (multi-item) |
| `prd-assets/event-selector-llm-tab.png` | LLM Observability tab: 4 LLM events (multi-item) |
| `prd-assets/event-selector-journey-tab.png` | Journey tab: 4 journey events (multi-item) |

---

## Part 2: Visibility Radio Cards

### 2.1 Complete HTML Structure

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

### 2.2 Component Hierarchy

```
div.flex.flex-wrap.gap-3          <- Parent container (802x68px)
+-- label (selected)              <- Global card (361x68px, flex-1)
|   +-- input[type="radio"]       <- Native radio (16x16px)
|   +-- div                       <- Text wrapper
|       +-- div.text-sm           <- Title: "Global"
|       +-- div.text-xs           <- Description text
+-- label (unselected)            <- Private card (361x68px, flex-1)
    +-- input[type="radio"]       <- Native radio (16x16px)
    +-- div                       <- Text wrapper
        +-- div.text-sm           <- Title: "Private"
        +-- div.text-xs           <- Description text
```

### 2.3 Design Tokens Used

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

### 2.4 Per-Element Computed CSS

#### 2.4.1 Parent Container

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

#### 2.4.2 Radio Card — Selected State (Global)

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
  width: 361px;                   /* (802 - 12 gap - 2x2 border) / 2 ~ 361 */
  height: 68px;
}
```

#### 2.4.3 Radio Card — Unselected State (Private)

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

#### 2.4.4 Native Radio Input

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

#### 2.4.5 Title Text ("Global" / "Private")

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

#### 2.4.6 Description Text

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

#### 2.4.7 Text Wrapper

```css
div.radio-text-wrapper {
  display: block;                 /* default div */
  /* No explicit classes -- just a plain wrapper div */
  /* Width: fills remaining space after 16px radio + 10px gap */
}
```

### 2.5 State Transitions

#### Click on unselected card -> becomes selected

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

#### Transition animation

```css
transition: border-color 150ms, background-color 150ms;
/* duration-150 = 150ms */
/* No easing specified = default (ease) */
```

### 2.6 Differences from Original Countly Drawer

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

### 2.7 Implementation Checklist

To make the Cee AI visibility section match the original drawer pixel-perfectly, fix these:

- [ ] **Border color selected**: Change from `#21B566` -> `#0166D6`
- [ ] **Background selected**: Remove `bg-brand-green-50` (#EBF8F1) -> keep `#FFFFFF`
- [ ] **Border color unselected**: Change from `#ECEBED` -> `#CFD6E4`
- [ ] **Radio accent**: Change from `accent-brand-green-700` -> blue accent or custom Element UI radio
- [ ] **Card padding**: Change `py-3.5 px-4` (14px 16px) -> `p-4` (16px all)
- [ ] **Title font**: Change `font-primary` (Plus Jakarta Sans) -> Inter
- [ ] **Title weight**: Change `font-semibold` (600) -> `font-medium` (500)
- [ ] **Description color**: Change `text-dark-500` (#646F7F) -> `#7A7A7A`
- [ ] **Title color**: Change `text-dark-900` (#151515) -> `#333C48`
- [ ] **Container width**: Adjust form width from 802px -> 668px (or match drawer context)
- [ ] **Component type**: Consider replacing native radio with Element UI `el-radio.is-bordered` for consistency

### 2.8 Section Header: "Visibility"

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

---

## Part 3: Implementation Notes

### 3.1 Selector Specificity with Element UI

Element UI components generate deeply nested DOM structures with internal class names (e.g. `.el-radio-button__inner`, `.el-input__inner`, `.el-select-dropdown__item`). When overriding styles:

- **Avoid `:has()` selectors** for Element UI components — they are unreliable because Element UI dynamically modifies class lists and attributes.
- **Prefer direct selectors** using `data-test-id` attributes, which are stable across re-renders.
- **Use `!important` sparingly** — Element UI injects inline styles for some properties (e.g. `width` on dropdowns). When overriding, use a more specific selector chain rather than `!important`.
- **Scoped vs global CSS**: Element UI popper elements are appended to `<body>`, so scoped component styles will NOT reach them. Use global CSS or `:global()` in Vue SFCs for popper styling.

### 3.2 Body-Level Poppers Pattern

Multiple dropdown elements in the cohort drawer are rendered as body-level poppers:

| Component | z-index | Width |
|-----------|---------|-------|
| Drawer overlay | 2001 | viewport |
| Drawer panel | 2001 | 823px |
| Event type dropdown | 2009 | 823px (full drawer width) |
| Behavior type dropdown | 2009 | auto |
| Frequency dropdown | 2009 | auto |
| Time range dropdown | 2009 | auto |

**Key constraint**: All popper dropdowns must have `z-index >= 2009` to appear above the drawer. If a custom dropdown is implemented inline (not as a popper), it will be clipped by the drawer's `overflow` settings.

### 3.3 Tab Border-Radius Pattern

The 9-tab radio button group uses a connected button strip pattern where:

1. Only the first tab has `border-radius` on the left side (`4px 0 0 4px`).
2. Only the last tab has `border-radius` on the right side (`0 4px 4px 0`).
3. All middle tabs have `border-radius: 0`.
4. The active tab's `box-shadow: #0166D6 -1px 0px 0px 0px` covers the left border seam, creating a visually seamless highlight.
5. Adjacent inactive tabs share borders — Element UI handles this by collapsing borders with negative margins or `border-collapse`-like behavior on the button group.

### 3.4 Color System Summary

| Context | Primary Blue | Text Dark | Text Medium | Border Default | Border Active | Background Hover |
|---------|-------------|-----------|-------------|----------------|---------------|-----------------|
| Behavior section | `#0166D6` | `#333C48` | `#333C48` | `#CFD6E4` | `#0166D6` | `#F6F6F6` |
| Visibility (Original) | `#0166D6` | `#333C48` | `#7A7A7A` | `#CFD6E4` | `#0166D6` | — |
| Visibility (Cee AI) | `#21B566` | `#151515` | `#646F7F` | `#ECEBED` | `#21B566` | — |

### 3.5 Font System

| Context | Font Family | Sizes Used |
|---------|------------|------------|
| Behavior section (Original Drawer) | Inter | 13px, 14px |
| Visibility (Original Drawer) | Inter | 12px, 14px, 16px |
| Visibility (Cee AI Form) | Plus Jakarta Sans | 12px, 14px, 15px |
