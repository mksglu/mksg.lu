# PRD: Countly "Filtering Rules" (Block) Plugin Drawer

**Feature:** Create New Filtering Rule
**Plugin:** `block` / Filtering Rules
**Route:** `/manage/blocks`
**Drawer Type:** `cly-vue-drawer` half-screen
**Source:** `block-raw.html`
**Date:** 2026-02-27

---

## 1. Scope & Context

### Purpose
The Filtering Rules drawer allows Countly administrators to define rules that block or filter incoming SDK data before it is stored. Rules target specific request types (all, sessions, events) and can operate in two modes: full block or conditional filter.

### Entry Point
- URL: `http://mert.count.ly/dashboard#/<app_id>/manage/blocks`
- Triggered by: "Create New Filtering Rule" button on the `/manage/blocks` management page.

### Drawer Behaviour
- Opens as a half-screen overlay (right-side panel).
- Single-step form (no multi-step wizard).
- Component ID: `cly-cmp-3087-blocks-drawer` (dynamically generated, prefix pattern `cly-cmp-{n}-blocks-drawer`).
- On save: creates a new filtering rule.
- On cancel: dismisses drawer with no changes.

---

## 2. Component Hierarchy

```
cly-vue-drawer (root)
└── cly-vue-drawer__sidecars-view
    └── cly-vue-drawer__steps-view
        └── cly-vue-drawer__steps-wrapper
            ├── cly-vue-drawer__header
            │   └── cly-vue-drawer__title
            │       └── cly-vue-drawer__title-container
            │           ├── h3.cly-vue-drawer__title-header  [data-test-id: drawer-test-id-header-title]
            │           └── div.cly-vue-drawer__close-button  [data-test-id: drawer-test-id-close-button]
            │               └── i.ion-ios-close-empty
            ├── cly-vue-drawer__steps-container
            │   └── scroll-shadow-container
            │       └── bu-columns (body layout)
            │           └── bu-column.bu-is-12
            │               └── cly-vue-content  [id: cly-cmp-3087-blocks-drawer]
            │                   └── span > div
            │                       └── cly-vue-drawer-step__section.cly-vue-block-drawer
            │                           ├── Section 1: "Filtering rules for" (request type)
            │                           │   └── el-radio-group (3 radios: all, session, event)
            │                           └── Section 2: "Targeting" (action type)
            │                               └── el-radio-group.bu-is-flex (2 radios: block, add)
            └── cly-vue-drawer__footer
                └── cly-vue-drawer__controls-left-pc
                    └── cly-vue-drawer__buttons.is-single-step
                        ├── el-button--secondary  [data-test-id: drawer-test-id-cancel-button]  "Cancel"
                        └── el-button--success    [data-test-id: drawer-test-id-save-button]    "Create"
```

---

## 3. HTML Structure & Class Names

### 3.1 Root Drawer Element

```html
<div
  tabindex="0"
  class="cly-vue-drawer is-mounted is-open cly-vue-drawer--half-screen cly-vue-drawer--half-screen-6"
>
```

| Attribute | Value | Notes |
|-----------|-------|-------|
| `tabindex` | `0` | Focusable for keyboard navigation |
| `class` | `cly-vue-drawer` | Base drawer component class |
| `class` | `is-mounted` | Vue lifecycle: component has mounted |
| `class` | `is-open` | Drawer visibility state |
| `class` | `cly-vue-drawer--half-screen` | Layout modifier: half-screen width |
| `class` | `cly-vue-drawer--half-screen-6` | Bulma grid size variant (6 columns wide) |

### 3.2 Drawer Shell Layers

```html
<div class="cly-vue-drawer__sidecars-view">
  <div class="cly-vue-drawer__steps-view">
    <div class="cly-vue-drawer__steps-wrapper">
```

These three nested divs form the structural shell of the drawer. No interactive attributes. They control layout and scrolling context.

### 3.3 Header

```html
<div class="cly-vue-drawer__header">
  <div class="cly-vue-drawer__title">
    <div class="cly-vue-drawer__title-container bu-is-flex bu-is-justify-content-space-between bu-is-align-items-center">
      <h3 data-test-id="drawer-test-id-header-title" class="cly-vue-drawer__title-header">
        Create New Filtering Rule
      </h3>
      <div data-test-id="drawer-test-id-close-button" class="cly-vue-drawer__close-button">
        <i class="ion-ios-close-empty"></i>
      </div>
    </div>
  </div>
</div>
```

| Element | Class / Attribute | Value |
|---------|-------------------|-------|
| `h3` | `data-test-id` | `drawer-test-id-header-title` |
| `h3` | text content | `Create New Filtering Rule` |
| close `div` | `data-test-id` | `drawer-test-id-close-button` |
| close icon | `class` | `ion-ios-close-empty` (Ionicons v2) |

Title container uses Bulma flexbox utilities: `bu-is-flex bu-is-justify-content-space-between bu-is-align-items-center`.

### 3.4 Body Container

```html
<div class="cly-vue-drawer__steps-container">
  <div class="scroll-shadow-container">
    <div class="bu-columns bu-is-gapless bu-is-mobile cly-vue-drawer__body-container bu-pb-5 bu-pt-4 bu-mb-2 bu-mt-1">
      <div class="bu-column bu-is-12">
        <div id="cly-cmp-3087-blocks-drawer" class="cly-vue-content">
          <span>
            <div>
              <div class="cly-vue-drawer-step__section cly-vue-block-drawer">
```

| Class | Purpose |
|-------|---------|
| `scroll-shadow-container` | Adds top/bottom scroll shadow indicators |
| `cly-vue-drawer__body-container` | Main body flex container |
| `bu-columns bu-is-gapless bu-is-mobile` | Bulma grid: no gap, mobile-first |
| `bu-pb-5 bu-pt-4 bu-mb-2 bu-mt-1` | Bulma spacing utilities |
| `bu-column bu-is-12` | Full-width Bulma column |
| `cly-vue-content` | Countly generic content wrapper |
| `cly-vue-drawer-step__section` | Step section container |
| `cly-vue-block-drawer` | Plugin-specific block class (BEM block) |

### 3.5 Section 1: Filtering Rules For (Request Type)

```html
<div class="bu-pb-3">
  <div class="text-big font-weight-bold bu-mb-2">
    Filtering rules for
  </div>
  <div class="bu-pt-2">
    <div role="radiogroup" class="el-radio-group">
      <!-- Radio: All requests (value="all", default selected) -->
      <!-- Radio: Sessions (value="session") -->
      <!-- Radio: Events (value="event") -->
    </div>
  </div>
</div>
```

Section heading classes: `text-big font-weight-bold bu-mb-2`

### 3.6 Section 2: Targeting (Action Type)

```html
<div class="bu-pt-3 bu-pb-4">
  <div class="text-big font-weight-bold bu-mb-2">
    Targeting
  </div>
  <div class="bu-pt-2">
    <div role="radiogroup" class="el-radio-group bu-is-flex">
      <!-- Radio: Block (value="block", default selected) -->
      <!-- Radio: Add filters (value="add") -->
    </div>
  </div>
</div>
```

The `el-radio-group` here adds `bu-is-flex` to display radios side-by-side.

### 3.7 Footer

```html
<div class="cly-vue-drawer__footer">
  <div class="cly-vue-drawer__controls-left-pc">
    <div class="cly-vue-drawer__buttons is-single-step is-single-step bu-is-justify-content-flex-end bu-is-flex">
      <button type="button" class="el-button el-button--secondary el-button--small" data-test-id="drawer-test-id-cancel-button">
        <span>Cancel</span>
      </button>
      <button type="button" class="el-button el-button--success el-button--small" data-test-id="drawer-test-id-save-button">
        <span>Create</span>
      </button>
    </div>
  </div>
</div>
```

Note: `is-single-step` class appears twice on `.cly-vue-drawer__buttons` (redundant duplicate in source HTML).

---

## 4. Design Tokens

### 4.1 Spacing (Bulma utilities, `bu-` prefixed)

| Token | Equivalent | Used on |
|-------|-----------|---------|
| `bu-pb-3` | padding-bottom: 0.75rem | Section 1 wrapper |
| `bu-pb-4` | padding-bottom: 1rem | Section 2 wrapper |
| `bu-pb-5` | padding-bottom: 1.25rem | Body container |
| `bu-pt-2` | padding-top: 0.5rem | Radio group wrapper (both sections) |
| `bu-pt-3` | padding-top: 0.75rem | Section 2 wrapper |
| `bu-pt-4` | padding-top: 1rem | Body container |
| `bu-mb-2` | margin-bottom: 0.5rem | Section headings, radio labels |
| `bu-mt-1` | margin-top: 0.25rem | Body container |
| `bu-ml-0` | margin-left: 0 | Radio items (Section 1) |

### 4.2 Typography

| Class | Usage |
|-------|-------|
| `text-big` | Section headings ("Filtering rules for", "Targeting") |
| `text-small` | Targeting description text under radio options |
| `text-smallish` | Sublabel text inside radio labels |
| `font-weight-bold` | Section headings |

### 4.3 Color Tokens

| Token | Usage |
|-------|-------|
| `color-cool-gray-50` | Description text under "Block All requests" and "Add filters" radios |

### 4.4 Layout

| Class | Usage |
|-------|-------|
| `bu-is-flex` | Footer buttons container, Section 2 radio group |
| `bu-is-justify-content-space-between` | Header title container |
| `bu-is-justify-content-flex-end` | Footer buttons (right-aligned) |
| `bu-is-align-items-center` | Header title container (vertical centering) |
| `bu-is-gapless` | Body columns grid |
| `bu-is-mobile` | Body columns grid (mobile breakpoint) |

---

## 5. Form Fields

### 5.1 Field Group 1: "Filtering rules for" (Request Type Selector)

**Control type:** `el-radio-group` (vertical stacked list)
**Default value:** `all`

| # | Label | Input `value` | State | Classes |
|---|-------|--------------|-------|---------|
| 1 | All requests | `all` | **Selected (default)** | `is-checked`, `is-bordered`, `is-autosized` |
| 2 | Sessions | `session` | Unselected | `is-bordered`, `is-autosized` |
| 3 | Events | `event` | Unselected | `is-bordered`, `is-autosized` |

Each radio item uses class `bu-mb-2 bu-ml-0` for spacing within the group.

**Radio item structure per option:**
```html
<label
  data-test-id="el-radio-test-id-el-radio-wrapper"
  role="radio"
  aria-checked="true|false"
  tabindex="0|-1"
  class="el-radio is-autosized bu-mb-2 bu-ml-0 is-bordered [is-checked]"
>
  <span data-test-id="el-radio-test-id-el-radio" class="el-radio__input [is-checked]">
    <span class="el-radio__inner"></span>
    <input
      data-test-id="el-radio-test-id-el-radio-button"
      type="radio"
      aria-hidden="true"
      tabindex="-1"
      class="el-radio__original"
      value="all|session|event"
    >
  </span>
  <span data-test-id="el-radio-test-id-el-radio-label" class="el-radio__label">
    All requests|Sessions|Events
    <div class="text-smallish"><!-- sublabel text if any --></div>
  </span>
</label>
```

### 5.2 Field Group 2: "Targeting" (Action Type Selector)

**Control type:** `el-radio-group` with `bu-is-flex` (horizontal layout)
**Default value:** `block`

| # | Label | Input `value` | State | Description text |
|---|-------|--------------|-------|-----------------|
| 1 | Block All requests | `block` | **Selected (default)** | (no description in default state) |
| 2 | Add filters | `add` | Unselected | "Add filtering to define more accurate blocking" |

Radio items use classes: `is-autosized is-multiline is-bordered [is-checked]` (no `bu-mb-2 bu-ml-0` unlike group 1).

The description text under each radio option uses: `class="color-cool-gray-50 text-small cly-vue-block-drawer__targeting-decription"`.

Note: `cly-vue-block-drawer__targeting-decription` is a typo in the source (missing 's' in "description") — must be preserved exactly.

**Full radio item structure for "block" (selected):**
```html
<label
  data-test-id="el-radio-test-id-el-radio-wrapper"
  role="radio"
  aria-checked="true"
  tabindex="0"
  class="el-radio is-autosized is-multiline is-bordered is-checked"
>
  <span data-test-id="el-radio-test-id-el-radio" class="el-radio__input is-checked">
    <span class="el-radio__inner"></span>
    <input
      data-test-id="el-radio-test-id-el-radio-button"
      type="radio"
      aria-hidden="true"
      tabindex="-1"
      class="el-radio__original"
      value="block"
    >
  </span>
  <span data-test-id="el-radio-test-id-el-radio-label" class="el-radio__label">
    Block All requests
    <div class="text-smallish">Block All requests</div>
    <div class="color-cool-gray-50 text-small cly-vue-block-drawer__targeting-decription"></div>
  </span>
</label>
```

**Full radio item structure for "add" (unselected):**
```html
<label
  data-test-id="el-radio-test-id-el-radio-wrapper"
  role="radio"
  tabindex="-1"
  class="el-radio is-autosized is-multiline is-bordered"
>
  <span data-test-id="el-radio-test-id-el-radio" class="el-radio__input">
    <span class="el-radio__inner"></span>
    <input
      data-test-id="el-radio-test-id-el-radio-button"
      type="radio"
      aria-hidden="true"
      tabindex="-1"
      class="el-radio__original"
      value="add"
    >
  </span>
  <span data-test-id="el-radio-test-id-el-radio-label" class="el-radio__label">
    Add filters
    <div class="text-smallish">Add filters</div>
    <div class="color-cool-gray-50 text-small  cly-vue-block-drawer__targeting-decription">
      Add filtering to define more accurate blocking
    </div>
  </span>
</label>
```

Note: the "add" radio description div has a double space before `cly-vue-block-drawer__targeting-decription` (`class="color-cool-gray-50 text-small  cly-vue-block-drawer__targeting-decription"`) — preserve exactly.

---

## 6. State Transitions

### 6.1 Drawer Open/Close States

| State class | Applied to | Meaning |
|-------------|-----------|---------|
| `is-mounted` | `.cly-vue-drawer` | Vue component has been mounted into DOM |
| `is-open` | `.cly-vue-drawer` | Drawer is visible/expanded |

To close: remove `is-open`. The close button (`drawer-test-id-close-button`) and Cancel button (`drawer-test-id-cancel-button`) both trigger close.

### 6.2 Radio Button States

| State class | Applied to | Meaning |
|-------------|-----------|---------|
| `is-checked` | `label.el-radio` | This radio option is selected |
| `is-checked` | `span.el-radio__input` | Inner span mirrors selected state |
| `aria-checked="true"` | `label[role=radio]` | ARIA selected state |
| `tabindex="0"` | `label[role=radio]` | Selected item is keyboard-focusable |
| `tabindex="-1"` | `label[role=radio]` | Non-selected items are removed from tab order |

### 6.3 Section 1 → Section 2 Dependency

The "Targeting" section (Section 2) label text in the `block` radio reads "Block All requests" — this dynamically reflects the Section 1 selection. When Section 1 is set to `session`, the "block" targeting option should read "Block Sessions". When set to `event`, it should read "Block Events". This is a computed label dependent on the request type selection.

### 6.4 "Add filters" Expansion (Expected, Not in Snapshot)

When the `add` targeting mode is selected, the drawer is expected to expand to reveal filter criteria fields (app version, device, country, custom properties). The current HTML snapshot represents the initial/default state only (`block` mode selected, no filter rows shown).

### 6.5 Footer Button States

| Button | `data-test-id` | Condition |
|--------|---------------|-----------|
| Cancel | `drawer-test-id-cancel-button` | Always active; closes drawer |
| Create | `drawer-test-id-save-button` | Submits form; likely disabled until valid |

---

## 7. Element UI Components

### 7.1 `el-radio-group`

- Element UI v2 radio group wrapper.
- `role="radiogroup"` applied to the container div.
- Section 1: no extra classes — vertical stack.
- Section 2: adds `bu-is-flex` — horizontal flex row.

### 7.2 `el-radio`

Full anatomy of an Element UI radio button as implemented:

```
label.el-radio [role="radio"]
  ├── span.el-radio__input        ← visual radio container
  │   ├── span.el-radio__inner   ← the circle/dot graphic
  │   └── input[type=radio]      ← native hidden input (aria-hidden)
  └── span.el-radio__label       ← label text + sublabel
      ├── div.text-smallish      ← sublabel / short description
      └── div.cly-vue-block-drawer__targeting-decription  ← long description (Section 2 only)
```

**Modifier classes on `label.el-radio`:**

| Modifier | Applied to | Meaning |
|----------|-----------|---------|
| `is-autosized` | Both groups | Radio auto-sizes to label content |
| `is-bordered` | Both groups | Renders card/bordered radio style |
| `is-checked` | Selected item | Active selection state |
| `is-multiline` | Section 2 only | Allows label to wrap to multiple lines |
| `bu-mb-2` | Section 1 only | 0.5rem bottom margin between items |
| `bu-ml-0` | Section 1 only | Resets left margin |

### 7.3 `el-button`

| Attribute | Cancel | Create |
|-----------|--------|--------|
| `type` | `button` | `button` |
| base class | `el-button` | `el-button` |
| variant | `el-button--secondary` | `el-button--success` |
| size | `el-button--small` | `el-button--small` |
| `data-test-id` | `drawer-test-id-cancel-button` | `drawer-test-id-save-button` |
| text | `Cancel` | `Create` |

Both buttons wrap text in `<span>` tags per Element UI convention.

---

## 8. Countly Custom Components

### 8.1 `cly-vue-drawer`

Top-level Countly drawer component. Provides:
- Half-screen overlay layout via `cly-vue-drawer--half-screen` and `cly-vue-drawer--half-screen-6`.
- Internal structure: sidecars-view → steps-view → steps-wrapper.
- State management via `is-mounted` / `is-open` classes.
- Scroll shadow on body via `scroll-shadow-container`.

### 8.2 `cly-vue-drawer-step__section`

Container for a single step's content. In this drawer, there is exactly one step (no pagination).

### 8.3 `cly-vue-content`

Generic Countly content wrapper. ID: `cly-cmp-3087-blocks-drawer`. The `cly-cmp-{n}` prefix is a runtime-generated component ID.

### 8.4 `cly-vue-block-drawer`

Plugin-specific BEM block class applied to the main section container. Serves as the namespace for:
- `cly-vue-block-drawer__targeting-decription` — description text modifier (BEM element, typo in source).

### 8.5 Icon: `ion-ios-close-empty`

Ionicons v2 icon class used for the drawer close button. Applied to an `<i>` element inside the close button div.

---

## 9. Implementation Notes

### 9.1 Data Test ID Inventory (Complete)

| `data-test-id` value | Element | Purpose |
|----------------------|---------|---------|
| `drawer-test-id-header-title` | `h3` | Drawer title text |
| `drawer-test-id-close-button` | `div` | X close button in header |
| `el-radio-test-id-el-radio-wrapper` | `label` | Radio item wrapper (×5 total) |
| `el-radio-test-id-el-radio` | `span.el-radio__input` | Radio input container (×5 total) |
| `el-radio-test-id-el-radio-button` | `input[type=radio]` | Native radio input (×5 total) |
| `el-radio-test-id-el-radio-label` | `span.el-radio__label` | Radio label (×5 total) |
| `drawer-test-id-cancel-button` | `button` | Cancel / dismiss action |
| `drawer-test-id-save-button` | `button` | Create / submit action |

All five radio buttons share identical `data-test-id` values (no per-option uniqueness). Tests must disambiguate by index or by parent context.

### 9.2 Complete Class Reference (All 54 unique classes)

```
bu-column                    bu-columns
bu-is-12                     bu-is-align-items-center
bu-is-flex                   bu-is-gapless
bu-is-justify-content-flex-end   bu-is-justify-content-space-between
bu-is-mobile                 bu-mb-2
bu-ml-0                      bu-mt-1
bu-pb-3                      bu-pb-4
bu-pb-5                      bu-pt-2
bu-pt-3                      bu-pt-4
cly-vue-block-drawer         cly-vue-block-drawer__targeting-decription
cly-vue-content              cly-vue-drawer
cly-vue-drawer--half-screen  cly-vue-drawer--half-screen-6
cly-vue-drawer-step__section cly-vue-drawer__body-container
cly-vue-drawer__buttons      cly-vue-drawer__close-button
cly-vue-drawer__controls-left-pc  cly-vue-drawer__footer
cly-vue-drawer__header       cly-vue-drawer__sidecars-view
cly-vue-drawer__steps-container   cly-vue-drawer__steps-view
cly-vue-drawer__steps-wrapper     cly-vue-drawer__title
cly-vue-drawer__title-container   cly-vue-drawer__title-header
color-cool-gray-50           el-button
el-button--secondary         el-button--small
el-button--success           el-radio
el-radio-group               el-radio__inner
el-radio__input              el-radio__label
el-radio__original           font-weight-bold
ion-ios-close-empty          is-autosized
is-bordered                  is-checked
is-mounted                   is-multiline
is-open                      is-single-step
scroll-shadow-container      text-big
text-small                   text-smallish
```

### 9.3 Typos & Quirks to Preserve

| Issue | Location | Notes |
|-------|----------|-------|
| `cly-vue-block-drawer__targeting-decription` | Both Section 2 radio descriptions | Missing 's' in "description" — must be reproduced exactly to match existing CSS/JS selectors |
| Double space in class attribute | `add` radio description div | `class="color-cool-gray-50 text-small  cly-vue-block-drawer__targeting-decription"` — double space before last class |
| `is-single-step` duplicated | `.cly-vue-drawer__buttons` | Appears twice: `class="cly-vue-drawer__buttons is-single-step is-single-step bu-is-justify-content-flex-end bu-is-flex"` |

### 9.4 Accessibility

- Drawer root has `tabindex="0"` for focus management.
- Radio groups use `role="radiogroup"` on the container.
- Individual radios use `role="radio"` with `aria-checked` mirroring `is-checked` state.
- Selected radio has `tabindex="0"`; others have `tabindex="-1"` (roving tabindex pattern).
- Native `input[type=radio]` elements are `aria-hidden="true"` — interaction is via the styled `label` element.

### 9.5 Layout Architecture

The drawer uses a two-level layout system:
1. **Countly layout**: `cly-vue-drawer`, `cly-vue-drawer__*` for the drawer shell, header, body, footer structure.
2. **Bulma layout**: `bu-columns`, `bu-column`, `bu-is-*`, `bu-pb-*`, `bu-pt-*`, `bu-mb-*`, `bu-mt-*`, `bu-ml-*` for internal spacing and flex alignment.

### 9.6 Vue Component Mounting

- Component mounts with `is-mounted` class immediately.
- `is-open` is added when the drawer should be visible.
- The DOM ID `cly-cmp-3087-blocks-drawer` follows a runtime counter pattern; do not hardcode this ID in selectors.

### 9.7 Expected Dynamic Behavior (Inferred)

When `value="add"` is selected in the Targeting section, the drawer is expected to render additional filter configuration rows. These likely include:
- App version selector
- Device type selector
- Country selector
- Custom properties key/value fields

These are not present in the captured HTML snapshot (which shows the default `block` state) and would need to be documented from a snapshot taken with `add` selected.

### 9.8 Section 2 Label Dynamic Text

The sublabel inside the `block` radio (`div.text-smallish`) reads "Block All requests", which mirrors the Section 1 selection. This is reactive: changing the Section 1 value from `all` → `session` → `event` should update this text to "Block Sessions" / "Block Events". This implies a computed property binding in the Vue component.

---

*End of PRD — Filtering Rules (Block) Plugin Drawer*
