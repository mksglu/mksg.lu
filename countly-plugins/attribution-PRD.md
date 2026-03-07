# PRD: Attribution Plugin — "Create New Campaign" Drawer

**Plugin:** Attribution
**Component:** `cly-vue-drawer` (attribution-drawer)
**URL:** `http://mert.count.ly/dashboard#/6908ab02fece9ef06eca7285/attribution`
**Version:** Element UI v2.x, Bulma utilities (bu-*), Countly custom (cly-vue-*)

---

## 1. Scope & Context

### 1.1 Purpose
The Attribution "Create New Campaign" drawer allows users to configure attribution campaigns with tracking links for user acquisition. It provides all necessary inputs to generate a unique tracking URL and configure where users are sent after clicking the campaign link across multiple platforms.

### 1.2 Functional Goals
- Generate a unique campaign tracking link (read-only, auto-generated on save)
- Configure campaign metadata (name, type)
- Set redirect destinations per platform (iOS App Store, Android Play Store, custom schemes, Kindle, Windows Phone)
- Enable/disable digital fingerprinting for attribution accuracy
- Define campaign cost (amount + cost model type)
- Add postback URLs for server-to-server notification of conversions
- Reference substitution variable placeholders for postback construction

### 1.3 Scope Boundaries
- Single-step drawer (no multi-step wizard)
- Half-screen width mode (`cly-vue-drawer--half-screen`)
- No sidecar panels active in the captured state
- Campaign type is currently locked to "Web Campaign" (select is disabled in the captured state)

---

## 2. Component Hierarchy

```
cly-vue-drawer.attribution-drawer
├── cly-vue-drawer__sidecars-view                    (empty in this state)
└── cly-vue-drawer__steps-view
    └── cly-vue-drawer__steps-wrapper
        ├── cly-vue-drawer__header
        │   └── cly-vue-drawer__title
        │       └── cly-vue-drawer__title-container
        │           ├── h3.cly-vue-drawer__title-header     "Create New Campaign"
        │           └── div.cly-vue-drawer__close-button    (×)
        ├── cly-vue-drawer__steps-container
        │   ├── scroll-shadow-container
        │   └── bu-columns.bu-is-gapless.bu-is-mobile.cly-vue-drawer__body-container
        │       └── bu-column.bu-is-12
        │           ├── Section: Unique Track Link
        │           ├── Section: Campaign Name
        │           ├── Section: Campaign type
        │           ├── Section: Digital Fingerprint (checkbox)
        │           ├── Section: Cost (amount + type)
        │           ├── Section: Redirect Links
        │           │   ├── ios
        │           │   ├── android-custom-scheme
        │           │   ├── ios-custom-scheme
        │           │   ├── kindle
        │           │   └── windows-phone
        │           ├── Section: Postback URLs
        │           └── Section: Placeholders for postbacks (reference table)
        └── cly-vue-drawer__footer
            ├── cly-vue-drawer__controls-left-pc        (empty)
            └── cly-vue-drawer__buttons.is-single-step
                ├── el-button--secondary (Cancel)
                └── el-button--success   (Create)
```

---

## 3. HTML Structure & Class Names

### 3.1 Drawer Root

```html
<div
  tabindex="0"
  class="cly-vue-drawer attribution-drawer is-mounted is-open cly-vue-drawer--half-screen cly-vue-drawer--half-screen-6"
>
```

| Class | Description |
|---|---|
| `cly-vue-drawer` | Base drawer component class |
| `attribution-drawer` | Plugin-specific modifier scoping all attribution styles |
| `is-mounted` | Vue lifecycle: component has mounted into DOM |
| `is-open` | Drawer is currently visible/open |
| `cly-vue-drawer--half-screen` | Occupies half the viewport width |
| `cly-vue-drawer--half-screen-6` | Numeric variant; maps to 6 Bulma columns (50% grid) |

### 3.2 Header Region

```html
<div class="cly-vue-drawer__header">
  <div class="cly-vue-drawer__title">
    <div class="cly-vue-drawer__title-container bu-is-flex bu-is-justify-content-space-between bu-is-align-items-center">
      <h3 data-test-id="drawer-test-id-header-title" class="cly-vue-drawer__title-header">
        Create New Campaign
      </h3>
      <div data-test-id="drawer-test-id-close-button" class="cly-vue-drawer__close-button">
        <i class="ion-ios-close-empty"></i>
      </div>
    </div>
  </div>
</div>
```

### 3.3 Body Container

```html
<div class="cly-vue-drawer__steps-container is-scroll-shadow-at-top">
  <div class="scroll-shadow-container"></div>
  <div class="bu-columns bu-is-gapless bu-is-mobile cly-vue-drawer__body-container bu-pb-5 bu-pt-4 bu-mb-2 bu-mt-1">
    <div class="bu-column bu-is-12">
      <!-- form sections here -->
    </div>
  </div>
</div>
```

| Class | Description |
|---|---|
| `is-scroll-shadow-at-top` | JS-driven shadow when scrolled past top |
| `scroll-shadow-container` | Absolutely positioned overlay for scroll shadow effect |
| `cly-vue-drawer__body-container` | Content scroll area |
| `bu-pb-5 bu-pt-4 bu-mb-2 bu-mt-1` | Bulma spacing utilities (padding/margin) |

### 3.4 Section Pattern

Each form group uses a consistent structure:

```html
<div class="cly-vue-drawer-step__section">
  <div class="text-medium text-heading bu-mb-2">
    Field Label
  </div>
  <!-- input/select/checkbox -->
</div>
```

For sections with inline tooltips:

```html
<div class="cly-vue-drawer-step__section">
  <div class="text-medium-big text-heading bu-mb-2 bu-mt-1">
    Section Title
    <i class="bu-is-flex-grow-1 cly-vue-tooltip-icon ion ion-help-circled has-tooltip"
       data-original-title="null"></i>
  </div>
  <!-- content -->
</div>
```

### 3.5 Footer

```html
<div class="cly-vue-drawer__footer">
  <div class="cly-vue-drawer__controls-left-pc">
    <!-- empty / breadcrumb area -->
  </div>
  <div class="cly-vue-drawer__buttons is-single-step is-single-step bu-is-justify-content-flex-end bu-is-flex">
    <button type="button"
      class="el-button el-button--secondary el-button--small"
      data-test-id="drawer-test-id-cancel-button">
      <span>Cancel</span>
    </button>
    <button type="button"
      class="el-button el-button--success el-button--small"
      data-test-id="drawer-test-id-save-button">
      <span>Create</span>
    </button>
  </div>
</div>
```

Note: `is-single-step` appears duplicated (likely a rendering artifact — both class tokens are identical).

---

## 4. Design Tokens

### 4.1 Typography Classes

| Class | Usage |
|---|---|
| `text-medium` | Standard body/label text weight |
| `text-medium-big` | Slightly larger section heading weight |
| `text-heading` | Applies heading color token |
| `text-smallish` | Smaller text for checkbox labels |

### 4.2 Bulma Spacing Utilities

| Class | Value |
|---|---|
| `bu-mb-2` | margin-bottom: 0.5rem |
| `bu-mb-3` | margin-bottom: 0.75rem |
| `bu-mb-4` | margin-bottom: 1rem |
| `bu-mt-1` | margin-top: 0.25rem |
| `bu-pt-4` | padding-top: 1rem |
| `bu-pb-5` | padding-bottom: 1.25rem |

### 4.3 Bulma Layout Utilities

| Class | Description |
|---|---|
| `bu-is-flex` | `display: flex` |
| `bu-is-flex-grow-1` | `flex-grow: 1` |
| `bu-is-justify-content-space-between` | `justify-content: space-between` |
| `bu-is-justify-content-flex-end` | `justify-content: flex-end` |
| `bu-is-align-items-center` | `align-items: center` |
| `bu-is-gapless` | No column gap |
| `bu-is-mobile` | Forces mobile column widths |
| `bu-column bu-is-12` | Full-width 12-column Bulma column |

### 4.4 Ionicons

| Icon Class | Usage |
|---|---|
| `ion-ios-close-empty` | Header close (×) button |
| `ion-help-circled` | Tooltip info icon (inline) |
| `ion-arrow-up-b` | Dropdown caret (el-select suffix) |

---

## 5. Form Fields

### 5.1 Unique Track Link

**Section label:** "Unique Track Link"
**State:** Disabled (read-only, auto-generated)

```html
<div class="cly-vue-drawer-step__section">
  <div class="text-medium text-heading bu-mb-2">Unique Track Link</div>
  <span>
    <div class="el-input is-disabled">
      <input
        data-test-id="input-test-id"
        type="text"
        disabled="disabled"
        autocomplete="off"
        class="el-input__inner"
      >
    </div>
  </span>
</div>
```

- Field is always disabled; value is populated by the system after campaign creation or upon re-editing
- Acts as a display-only output showing the generated tracking URL

### 5.2 Campaign Name

**Section label:** "Campaign Name"
**Type:** Free-text input, required

```html
<div class="cly-vue-drawer-step__section">
  <div class="text-medium text-heading bu-mb-2">Campaign Name</div>
  <span>
    <div class="el-input">
      <input
        data-test-id="input-test-id"
        type="text"
        autocomplete="off"
        placeholder="Enter campaign name"
        class="el-input__inner"
      >
    </div>
  </span>
</div>
```

### 5.3 Campaign Type

**Section label:** "Campaign type"
**Type:** `el-select` dropdown
**State in captured HTML:** Disabled (select input is disabled), dropdown open showing options

```html
<div class="cly-vue-drawer-step__section">
  <div class="text-medium text-heading bu-mb-2">Campaign type</div>
  <div class="el-select" width="120">
    <div class="el-input is-disabled el-input--suffix is-arrow">
      <input
        data-test-id="select-test-id-select-input"
        type="text"
        disabled="disabled"
        readonly="readonly"
        autocomplete="chrome-off"
        placeholder="Select"
        min-width="-1"
        max-width="-1"
        class="el-input__inner"
      >
      <span class="el-input__suffix">
        <span class="el-input__suffix-inner">
          <i data-test-id="select-test-id-select-icon" class="el-select__caret ion-arrow-up-b"></i>
        </span>
      </span>
    </div>
    <div class="el-select-dropdown el-popper">
      <div class="el-scrollbar">
        <div class="el-select-dropdown__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
          <ul class="el-scrollbar__view el-select-dropdown__list">
            <li class="el-select-dropdown__item selected" data-original-title="null">
              <span data-test-id="el-option-test-id-web-campaign-el-options">Web Campaign</span>
            </li>
          </ul>
        </div>
        <div class="el-scrollbar__bar is-horizontal"><div class="el-scrollbar__thumb"></div></div>
        <div class="el-scrollbar__bar is-vertical"><div class="el-scrollbar__thumb"></div></div>
      </div>
    </div>
  </div>
</div>
```

**Option values:**

| `data-test-id` | Label |
|---|---|
| `el-option-test-id-web-campaign-el-options` | Web Campaign |

Note: Only "Web Campaign" is visible in the captured state; additional campaign types (e.g., mobile) may be conditionally available.

### 5.4 Digital Fingerprint (Checkbox)

**Type:** `el-checkbox`, checked by default in captured state
**No section label wrapper** — checkbox and tooltip are peers in the same `.cly-vue-drawer-step__section`

```html
<div class="cly-vue-drawer-step__section">
  <label class="el-checkbox is-checked">
    <span data-test-id="el-checkbox-test-id-el-checkbox-input" class="el-checkbox__input is-checked">
      <span class="el-checkbox__inner"></span>
      <input
        type="checkbox"
        data-test-id="el-checkbox-test-id-el-checkbox-button"
        aria-hidden="false"
        class="el-checkbox__original"
        value=""
      >
    </span>
    <span data-test-id="el-checkbox-test-id-el-checkbox-label" class="el-checkbox__label">
      <span class="text-smallish">Use digital fingerprint</span>
    </span>
  </label>
  <i class="bu-is-flex-grow-1 cly-vue-tooltip-icon ion ion-help-circled has-tooltip"
     data-original-title="null"></i>
</div>
```

- `is-checked` on both `.el-checkbox` and `.el-checkbox__input` indicates pre-checked state
- `bu-is-flex-grow-1` on the tooltip icon pushes it to the right of the checkbox label
- Tooltip content is lazily loaded (`data-original-title="null"` until hover)

### 5.5 Cost

**Section label:** "Cost" with tooltip
**Type:** Composite — numeric text input + cost-type dropdown, flex row

```html
<div class="cly-vue-drawer-step__section">
  <div class="text-medium-big text-heading bu-mb-2 bu-mt-1">
    Cost
    <i class="bu-is-flex-grow-1 cly-vue-tooltip-icon ion ion-help-circled has-tooltip"
       data-original-title="null"></i>
  </div>
  <span>
    <div class="bu-is-flex">
      <div class="attribution-drawer__cost el-input">
        <input
          data-test-id="input-test-id"
          type="text"
          autocomplete="off"
          class="el-input__inner"
        >
      </div>
      <div class="el-select attribution-drawer__cost-type" width="120">
        <!-- cost type dropdown (CPI / CPC / CPM etc.) -->
      </div>
    </div>
  </span>
</div>
```

| Class | Description |
|---|---|
| `attribution-drawer__cost` | Plugin-specific width/style for numeric amount input |
| `attribution-drawer__cost-type` | Plugin-specific width/style for cost model dropdown |

### 5.6 Redirect Links

**Section wrapper:** `.cly-vue-drawer-step__section` with nested `.cly-attribution-redirect-link-wrapper` per platform
**Pattern per platform:**

```html
<div class="bu-mt-1 cly-attribution-redirect-link-wrapper">
  <div class="text-medium text-heading bu-mb-2">
    [platform-name]
  </div>
  <div class="cly-attribution-redirect-input-wrapper">
    <div class="el-input">
      <input
        data-test-id="input-test-id"
        type="text"
        autocomplete="off"
        placeholder="[platform-specific placeholder URL]"
        class="el-input__inner"
      >
    </div>
  </div>
</div>
```

**All redirect link platforms (in order):**

| Platform Key | Placeholder |
|---|---|
| `ios` | `https://itunes.apple.com/us/app/app-name/app-id` |
| `android-custom-scheme` | `myapp://somedata` |
| `ios-custom-scheme` | `myapp://somedata` |
| `kindle` | `http://www.amazon.com/gp/product/product-code` |
| `windows-phone` | `http://windowsphone.com/s?appId=app-id` |

**Custom class inventory for redirect section:**

| Class | Role |
|---|---|
| `cly-attribution-redirect-link-wrapper` | Groups label + input for one platform row, `bu-mt-1` spacing |
| `cly-attribution-redirect-input-wrapper` | Inner wrapper for the `el-input` (may carry width constraints) |

### 5.7 Postback URLs

**Section label:** "Postback URLs" (plain text node, not in a sub-div)

```html
<div class="cly-vue-drawer-step__section bu-mt-1">
  Postback URLs
  <div class="bu-mt-1">
    <div class="el-input">
      <input
        data-test-id="input-test-id"
        type="text"
        autocomplete="off"
        placeholder="https://domain.com/postback?d={device_id}&amp;p={platform}"
        class="el-input__inner"
      >
    </div>
  </div>
  <div class="bu-mt-1">
    <button
      type="button"
      class="el-button bu-mb-4 cly-attribution-add-another-button el-button--text el-button--small"
    >
      <span> + Add Another</span>
    </button>
  </div>
</div>
```

| Class | Description |
|---|---|
| `cly-attribution-add-another-button` | Plugin-specific style for the text-style "add" button |
| `el-button--text` | Element UI text button variant (no border/background) |
| `el-button--small` | Small size variant |

### 5.8 Postback Placeholders Reference Table

**Section label:** "Placeholders for postbacks"
**Type:** Static read-only reference table

```html
<div class="cly-vue-drawer-step__section bu-mt-1">
  <div class="text-medium-big text-heading bu-mb-3 bu-mt-1">
    Placeholders for postbacks
  </div>
  <div class="bu-mt-1 cly-attribution-postback-wrapper">
    <table>
      <tr><td>{deviceID}</td>   <td>identification of device</td></tr>
      <tr><td>{platform}</td>   <td>platform of device</td></tr>
      <tr><td>{l}</td>          <td>Locale</td></tr>
      <tr><td>{b}</td>          <td>Campaign Browser</td></tr>
      <tr><td>{cnty}</td>       <td>Country</td></tr>
      <tr><td>{c}</td>          <td>Campaign ID</td></tr>
      <tr><td>{any_segment}</td><td>Any custom segment key you added to campaign url</td></tr>
    </table>
  </div>
</div>
```

| Class | Description |
|---|---|
| `cly-attribution-postback-wrapper` | Scoping wrapper for the reference table styles |

---

## 6. State Transitions

### 6.1 Drawer States

| State | Classes Present | Description |
|---|---|---|
| Hidden | `is-mounted` only | Drawer rendered but not visible; `is-open` absent |
| Open | `is-mounted is-open` | Drawer slides into view |
| Half-screen | `cly-vue-drawer--half-screen cly-vue-drawer--half-screen-6` | Occupies right half of viewport |

### 6.2 Scroll Shadow

- `.is-scroll-shadow-at-top` on the steps container activates when content is scrolled
- `.scroll-shadow-container` is a positioning anchor for the shadow overlay element
- Shadow indicates more content is above the current viewport position

### 6.3 Field States

| Field | Normal State | Disabled State |
|---|---|---|
| Unique Track Link | N/A | `el-input.is-disabled` + `input[disabled]` (always disabled) |
| Campaign Name | `el-input` (active) | — |
| Campaign Type | `el-select` | `el-input.is-disabled` + `input[disabled, readonly]` |
| Digital Fingerprint | `el-checkbox` | `el-checkbox.is-checked` (default checked) |
| Cost | `el-input` (active) | — |
| Redirect Links | `el-input` (active) | — |
| Postback URLs | `el-input` (active) | — |

### 6.4 Checkbox States

| State | Classes |
|---|---|
| Unchecked | `el-checkbox`, `el-checkbox__input` |
| Checked | `el-checkbox.is-checked`, `el-checkbox__input.is-checked` |
| Disabled-checked | `el-checkbox.is-disabled.is-checked`, `el-checkbox__input.is-disabled.is-checked` |

### 6.5 Dropdown States

| State | Classes |
|---|---|
| Closed | `el-select` (no popper visible) |
| Open | `el-select-dropdown.el-popper` rendered in DOM |
| Option selected | `el-select-dropdown__item.selected` |

---

## 7. Element UI Components

### 7.1 `el-input`

**Standard usage:**

```html
<div class="el-input">
  <input class="el-input__inner" type="text" autocomplete="off" placeholder="...">
</div>
```

**Disabled variant:**

```html
<div class="el-input is-disabled">
  <input class="el-input__inner" type="text" disabled="disabled" autocomplete="off">
</div>
```

**With suffix (dropdown trigger):**

```html
<div class="el-input el-input--suffix is-arrow">
  <input class="el-input__inner" ...>
  <span class="el-input__suffix">
    <span class="el-input__suffix-inner">
      <i class="el-select__caret ion-arrow-up-b"></i>
    </span>
  </span>
</div>
```

### 7.2 `el-select`

Root element: `<div class="el-select" width="120">`

Dropdown panel: `<div class="el-select-dropdown el-popper">`

Structure:
```
el-select
├── el-input.el-input--suffix.is-arrow (trigger)
│   └── el-input__suffix > el-select__caret.ion-arrow-up-b
└── el-select-dropdown.el-popper
    └── el-scrollbar
        ├── el-select-dropdown__wrap.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default
        │   └── ul.el-scrollbar__view.el-select-dropdown__list
        │       └── li.el-select-dropdown__item[.selected]
        ├── el-scrollbar__bar.is-horizontal > el-scrollbar__thumb
        └── el-scrollbar__bar.is-vertical > el-scrollbar__thumb
```

### 7.3 `el-checkbox`

```
label.el-checkbox[.is-checked]
├── span.el-checkbox__input[.is-checked]
│   ├── span.el-checkbox__inner          (visual box)
│   └── input[type=checkbox].el-checkbox__original (hidden native)
└── span.el-checkbox__label
    └── span.text-smallish               (label text)
```

### 7.4 `el-button`

| Variant | Classes |
|---|---|
| Cancel | `el-button el-button--secondary el-button--small` |
| Create/Save | `el-button el-button--success el-button--small` |
| Add Another | `el-button el-button--text el-button--small cly-attribution-add-another-button` |

### 7.5 `el-scrollbar`

Used inside dropdown panels:

| Class | Description |
|---|---|
| `el-scrollbar` | Container |
| `el-scrollbar__wrap` | Scrollable area |
| `el-scrollbar__wrap--hidden-default` | Hides native scrollbar |
| `el-scrollbar__view` | Content inside scroll area |
| `el-scrollbar__bar.is-horizontal` | Custom horizontal scrollbar track |
| `el-scrollbar__bar.is-vertical` | Custom vertical scrollbar track |
| `el-scrollbar__thumb` | Draggable scrollbar handle |

---

## 8. Countly Custom Components

### 8.1 `cly-vue-drawer`

**Root:** `<div class="cly-vue-drawer">`

**BEM child classes:**

| Class | Description |
|---|---|
| `cly-vue-drawer__sidecars-view` | Side panel area (empty in this state) |
| `cly-vue-drawer__steps-view` | Main content column |
| `cly-vue-drawer__steps-wrapper` | Inner flex column wrapper |
| `cly-vue-drawer__header` | Fixed header region |
| `cly-vue-drawer__title` | Title container |
| `cly-vue-drawer__title-container` | Flex row: title + close button |
| `cly-vue-drawer__title-header` | `<h3>` element with title text |
| `cly-vue-drawer__close-button` | Clickable close icon (×) |
| `cly-vue-drawer__steps-container` | Scrollable body area |
| `cly-vue-drawer__body-container` | Bulma columns grid inside step |
| `cly-vue-drawer__footer` | Fixed bottom footer |
| `cly-vue-drawer__controls-left-pc` | Left side of footer (breadcrumbs / empty) |
| `cly-vue-drawer__buttons` | Right side of footer (action buttons) |

**Modifier classes:**

| Modifier | Description |
|---|---|
| `is-mounted` | Component has mounted |
| `is-open` | Drawer visible |
| `cly-vue-drawer--half-screen` | 50% width layout |
| `cly-vue-drawer--half-screen-6` | Bulma column-6 width variant |
| `is-single-step` | Single-step (no step navigation) |
| `is-scroll-shadow-at-top` | Scroll shadow visible (scrolled past top) |

**data-test-id attributes on drawer shell:**

| `data-test-id` | Element |
|---|---|
| `drawer-test-id-header-title` | `<h3>` title |
| `drawer-test-id-close-button` | Close icon div |
| `drawer-test-id-cancel-button` | Cancel `<button>` |
| `drawer-test-id-save-button` | Create/Save `<button>` |

### 8.2 `cly-vue-drawer-step__section`

Section divider between form groups:

```html
<div class="cly-vue-drawer-step__section">
  <!-- label + input(s) -->
</div>
```

Used for every logical form group. Receives `bu-mt-1` modifier for sections needing extra top spacing (Postback URLs, Placeholders section).

### 8.3 `cly-vue-tooltip-icon`

Inline info icon pattern:

```html
<i class="bu-is-flex-grow-1 cly-vue-tooltip-icon ion ion-help-circled has-tooltip"
   data-original-title="null"></i>
```

- `has-tooltip` activates Countly's tooltip library (tippy.js or similar)
- `data-original-title` holds the tooltip content string; `"null"` indicates it is populated dynamically at runtime
- `bu-is-flex-grow-1` pushes the icon to the trailing end of the flex row

**Used on:**
- Cost section heading
- Digital fingerprint section (inline with checkbox, not in heading)

### 8.4 Attribution-Specific Classes

All prefixed with `attribution-drawer__` or `cly-attribution-`:

| Class | Location | Description |
|---|---|---|
| `attribution-drawer` | Root div | Plugin scoping modifier on `cly-vue-drawer` |
| `attribution-drawer__cost` | Cost amount input | Constrains width of numeric amount field |
| `attribution-drawer__cost-type` | Cost type `el-select` | Constrains width of cost model selector |
| `cly-attribution-redirect-link-wrapper` | Redirect section | Per-platform row: label + input |
| `cly-attribution-redirect-input-wrapper` | Redirect section | Wraps the `el-input` inside each platform row |
| `cly-attribution-add-another-button` | Postback section | Text-style "add" button styling |
| `cly-attribution-postback-wrapper` | Placeholders section | Scopes the reference `<table>` |

---

## 9. Implementation Notes

### 9.1 Drawer Layout Architecture

- The drawer uses a **fixed header + scrollable body + fixed footer** layout
- `cly-vue-drawer__steps-container` handles the scroll; the header and footer are outside this container
- The `scroll-shadow-container` + `is-scroll-shadow-at-top` pattern is a JavaScript-driven class toggle based on scroll position — implement with a `scroll` event listener on `cly-vue-drawer__steps-container`

### 9.2 Auto-Generated Track Link

- "Unique Track Link" field is always `disabled` in the form
- The value is populated by the server upon campaign creation and displayed when editing an existing campaign
- For new campaigns, this field should appear empty and disabled until the campaign is saved and the server returns the generated URL

### 9.3 Campaign Type Select Behavior

- In the captured state, the `el-select` for Campaign Type has `is-disabled` on the inner `el-input`, yet the dropdown panel (`el-select-dropdown el-popper`) is rendered in the DOM
- This suggests the select may be disabled during creation when only one option is available ("Web Campaign"), unlocking once additional campaign type plugins are installed
- The dropdown option uses `data-test-id="el-option-test-id-web-campaign-el-options"` — the pattern `el-option-test-id-[kebab-option-label]-el-options` should be applied consistently to all future options

### 9.4 Cost Field Composite Pattern

- The Cost section uses a flex row (`bu-is-flex`) containing:
  1. `attribution-drawer__cost` — `el-input` for numeric amount (no `type="number"`; uses `type="text"`)
  2. `attribution-drawer__cost-type` — `el-select` for cost model (CPI, CPC, CPM, or similar)
- These two elements share the same `.cly-vue-drawer-step__section` and are siblings inside a `<span>` wrapping a `bu-is-flex` div

### 9.5 Postback URL Dynamic List

- The "Postback URLs" section supports multiple entries via the "+ Add Another" button
- The initial state has one `el-input` visible
- Each additional click appends a new `el-input` row
- The "+ Add Another" button uses `el-button--text` (no background/border) with the custom `cly-attribution-add-another-button` class for any additional positioning or spacing rules

### 9.6 Redirect Links Order

Redirect link rows are rendered in DOM order:
1. `ios`
2. `android-custom-scheme`
3. `ios-custom-scheme`
4. `kindle`
5. `windows-phone`

Each row follows the pattern `.cly-attribution-redirect-link-wrapper > .text-medium.text-heading + .cly-attribution-redirect-input-wrapper > .el-input`.

### 9.7 Tooltip Initialization

- All tooltip icons use `data-original-title="null"` in the static HTML
- Tooltip content is injected by the Countly tooltip initialization logic (likely on component mount via `$tooltip` or a Vue directive like `v-tooltip`)
- Do not hardcode tooltip text in the static HTML; rely on i18n strings passed at runtime

### 9.8 `data-test-id` Inventory

| `data-test-id` | Element | Notes |
|---|---|---|
| `drawer-test-id-header-title` | `<h3>` title | Drawer shell |
| `drawer-test-id-close-button` | Close button div | Drawer shell |
| `drawer-test-id-cancel-button` | Cancel `<button>` | Footer |
| `drawer-test-id-save-button` | Create `<button>` | Footer |
| `input-test-id` | All `<input>` fields | Generic; shared across all inputs |
| `select-test-id-select-input` | Campaign type trigger input | Inside `el-select` |
| `select-test-id-select-icon` | Campaign type caret icon | Inside `el-input__suffix` |
| `el-option-test-id-web-campaign-el-options` | "Web Campaign" `<li>` | Dropdown option |
| `el-checkbox-test-id-el-checkbox-input` | Checkbox `<span>` wrapper | Digital fingerprint |
| `el-checkbox-test-id-el-checkbox-button` | Native `<input type="checkbox">` | Digital fingerprint |
| `el-checkbox-test-id-el-checkbox-label` | Checkbox label `<span>` | Digital fingerprint |

### 9.9 Autocomplete Attributes

- Standard text inputs: `autocomplete="off"`
- Select trigger inputs: `autocomplete="chrome-off"` (Element UI workaround to suppress Chrome autofill on read-only inputs)

### 9.10 min-width / max-width on Select Input

The `el-select` trigger input carries:

```html
min-width="-1" max-width="-1"
```

These are non-standard HTML attributes used by the Countly/Element UI select implementation to signal "no width constraint" — the component JavaScript reads these to decide whether to apply a fixed width to the input. A value of `-1` means unconstrained.

### 9.11 Single-Step Drawer vs Multi-Step

The footer contains:

```html
<div class="cly-vue-drawer__buttons is-single-step is-single-step bu-is-justify-content-flex-end bu-is-flex">
```

`is-single-step` on `cly-vue-drawer__buttons` hides step navigation controls (Previous/Next) and shows only Cancel + primary action. The duplicate class token is a template artifact and has no functional effect.

### 9.12 Structural Notes for New Campaign vs Edit Campaign

- In "Create New Campaign" mode, the Unique Track Link input is empty and disabled
- In "Edit Campaign" mode, the same drawer should populate the Unique Track Link with the existing URL and all fields with current values
- The save button label reads "Create" in new mode; it should change to "Save" or "Update" in edit mode (via `data-test-id="drawer-test-id-save-button"` dynamic text)
