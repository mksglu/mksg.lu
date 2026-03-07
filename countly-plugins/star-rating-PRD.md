# PRD: Countly Star Rating Plugin Drawer

**Document type:** UI Component Specification
**Source file:** `star-rating-raw.html`
**Date:** 2026-02-27

---

## 1. Scope & Context

The Star Rating drawer is a Countly plugin UI for creating **rating widgets** — embeddable feedback popups that appear on customer-facing pages. The widget collects user sentiment via one of three rating symbol types:

- **Emojis** — five emoji reaction icons (emoji1 through emoji5)
- **Thumbs** — thumbs up/down style rating
- **Stars** — classic 1–5 star rating

The drawer follows the same `cly-vue-drawer--half-screen` pattern used across Countly survey plugins (NPS, Surveys, A/B Testing). It occupies half the screen width with a live sidecar preview on the left and a 3-step wizard form on the right.

---

## 2. Drawer Layout

### Root Classes
```
cly-vue-drawer is-mounted is-open has-sidecars cly-vue-drawer--half-screen cly-vue-drawer--half-screen-6
```

### Structure
```
cly-vue-drawer
├── cly-vue-drawer__sidecars-view        ← left panel: live preview
│   └── cly-vue-content
│       └── ratings-drawer__sidecar widget-preview cly-vue-ratings-preview
│           ├── preview-stage (Ratings Popup)
│           └── preview-stage (Thank you Message)
└── cly-vue-drawer__steps-view           ← right panel: wizard form
    └── cly-vue-drawer__steps-wrapper
        ├── cly-vue-drawer__header       ← title + close + step nav
        ├── step 1: Settings
        ├── step 2: Widget appearance
        ├── step 3: Devices & Targeting
        └── cly-vue-drawer__footer       ← Cancel / Save buttons
```

### Header
- Title (`h3`): **"Add new widget"**
  - `t="ratings-drawer-header-title"`
- Close button: `t="ratings-drawer-close-button"`, icon: `ion-ios-close-empty`

### Step Navigation Header
`t="ratings-drawer-steps-header-container"`

| Step | Label | Test ID |
|------|-------|---------|
| 1 | Settings | `ratings-drawer-step-1-label`, `ratings-drawer-settings-label` |
| — | Separator | `ratings-drawer-seperator-0` _(note: misspelled)_ |
| 2 | Widget appearance | `ratings-drawer-step-2-label`, `ratings-drawer-widget-appearance-label` |
| — | Separator | `ratings-drawer-seperator-1` |
| 3 | Devices & Targeting | `ratings-drawer-step-3-label`, `ratings-drawer-devices-targeting-label` |

Each step label contains:
- `cly-vue-drawer__step-sign` with step index span (`ratings-drawer-current-step-index-{n}`)
- Step title div
- Active step receives class `is-active`; locked steps receive `is-locked`

---

## 3. Sidecar Preview Panel

The preview sidecar (`ratings-drawer__sidecar widget-preview cly-vue-ratings-preview`) renders two preview stages stacked vertically, always visible regardless of the current wizard step.

### 3.1 Ratings Popup Preview

**Container:** `ratings-drawer__ratings-popup`
**Stage label:** "Ratings Popup" — `t="ratings-drawer-ratingspopup-label"`

| Element | Test ID | Notes |
|---------|---------|-------|
| Question text | `ratings-drawer-ratingspopup-question` | Default: "What's your opinion about this page?" |
| Emoji 1 | `ratings-drawer-ratingspopup-emoji1` | CSS class: `ratings-drawer__rp-ratings-item__emoji1 has-tooltip` |
| Emoji 2 | `ratings-drawer-ratingspopup-emoji2` | |
| Emoji 3 | `ratings-drawer-ratingspopup-emoji3` | |
| Emoji 4 | `ratings-drawer-ratingspopup-emoji4` | |
| Emoji 5 | `ratings-drawer-ratingspopup-emoji5` | |
| "Add comment" checkbox | `ratings-drawer-ratingspopup-comment-checkbox-el-checkbox-button` | `el-checkbox` |
| Comment label | `ratings-drawer-ratingspopup-comment-label` | |
| "Contact me via e-mail" checkbox | `ratings-drawer-ratingspopup-contact-checkbox-el-checkbox-button` | `el-checkbox` |
| Contact label | `ratings-drawer-ratingspopup-contact-label` | |
| Submit button | `ratings-drawer-ratingspopup-submit-button` | |
| Powered-by footer | `ratings-drawer-ratingspopup-poweredby-label` | Countly branding image |

### 3.2 Thank You Popup Preview

**Stage label:** "Thank you Message" — `t="ratings-drawer-thankyoupopup-label"`

| Element | Test ID | Notes |
|---------|---------|-------|
| Icon | `ratings-drawer-thankyoupopup-icon` | |
| Colored icon | `ratings-drawer-thankyoupopup-color-icon` | |
| Message text | `ratings-drawer-thankyoupopup-message-text` | CSS: `text-weight-medium ratings-drawer__tp-thanks-message bu-is-size-4`; Default: "Thanks for your feedback!" |
| Powered-by footer | `ratings-drawer-thankyoupopup-poweredby-label` | `<img>` (Countly branding) |

---

## 4. Step 1: Settings

**Container class:** `cly-vue-drawer-step` / step panel ID pattern
All test IDs prefixed with `ratings-drawer-settings-`

### 4.1 Internal Name

| Element | Test ID | Component | Notes |
|---------|---------|-----------|-------|
| Section label | `ratings-drawer-settings-widget-name-label` | div | "Internal Name" |
| Description | `ratings-drawer-settings-widget-name-desc` | div | "This name is internal and will not be shown to your end user." |
| Input | `ratings-drawer-settings-ratings-widget-name-input` | `el-input` | Text input |

### 4.2 Question

| Element | Test ID | Component |
|---------|---------|-----------|
| Label | `ratings-drawer-settings-question-label` | div — "Question" |
| Input | `ratings-drawer-settings-question-input` | `el-input` |

### 4.3 Rating Texts (5 inputs)

Section label: `ratings-drawer-settings-ratings-label` — "Ratings"

| Rating | Test ID |
|--------|---------|
| Rating 1 text | `ratings-drawer-settings-ratings-emoji1-text-input` |
| Rating 2 text | `ratings-drawer-settings-ratings-emoji2-text-input` |
| Rating 3 text | `ratings-drawer-settings-ratings-emoji3-text-input` |
| Rating 4 text | `ratings-drawer-settings-ratings-emoji4-text-input` |
| Rating 5 text | `ratings-drawer-settings-ratings-emoji5-text-input` |

All use `el-input` text inputs. These labels are the tooltip/hover text displayed per rating symbol.

### 4.4 Optional Feature Checkboxes

| Checkbox | Test ID (input) | Label Test ID | Display Label |
|----------|-----------------|---------------|---------------|
| Comment | `ratings-drawer-settings-comment-checkbox-el-checkbox-button` | `ratings-drawer-settings-comment-label` | Use "Add comment" option |
| Contact | `ratings-drawer-settings-contact-checkbox-el-checkbox-button` | `ratings-drawer-settings-contact-label` | Use "Contact me via e-mail" option |
| Consent | `ratings-drawer-settings-add-user-consent-el-checkbox-button` | — | Add user consent |

All use `el-checkbox` component (`tp="checkbox"`).

### 4.5 Button Callout

| Element | Test ID | Component |
|---------|---------|-----------|
| Label | `ratings-drawer-settings-button-callout-label` | div — "Button Callout" |
| Input | `ratings-drawer-settings-button-callout-input` | `el-input` |

### 4.6 Thank You Message

| Element | Test ID | Component |
|---------|---------|-----------|
| Label | `ratings-drawer-settings-thanks-label` | div — "Thank you Message" |
| Input | `ratings-drawer-settings-thanks-input` | `el-input` |

---

## 5. Step 2: Widget Appearance

All test IDs prefixed with `ratings-drawer-appearance-`

### 5.1 Rating Symbol

| Element | Test ID | Component | Notes |
|---------|---------|-----------|-------|
| Section label | `ratings-drawer-appearance-rating-symbol-label` | div — "Rating Symbol" | |
| Dropdown | `ratings-drawer-select-input` | `el-select` | |
| Option: Emojis | `el-option-test-id-emojis-el-options` | `el-option` | |
| Option: Thumbs | `el-option-test-id-thumbs-el-options` | `el-option` | |
| Option: Stars | `el-option-test-id-stars-el-options` | `el-option` | |

### 5.2 Logo

| Element | Test ID | Component | Notes |
|---------|---------|-----------|-------|
| Section label | `ratings-drawer-appearance-logo-label` | div — "Logo" | |
| Tooltip | `ratings-drawer-appearance-logo-tooltip` | | Info icon |
| Default radio | `ratings-drawer-default-el-radio-wrapper` / `ratings-drawer-default-el-radio-button` | `el-radio` (bordered) | Label: "Use default logo" — `ratings-drawer-default-el-radio-label` |
| Custom radio | `ratings-drawer-custom-el-radio-wrapper` / `ratings-drawer-custom-el-radio-button` | `el-radio` (bordered) | Label: "Upload a custom logo" — `ratings-drawer-custom-el-radio-label` |
| None radio | `ratings-drawer-none-el-radio-wrapper` / `ratings-drawer-none-el-radio-button` | `el-radio` (bordered) | Label: "Don't use a logo" — `ratings-drawer-none-el-radio-label` |

### 5.3 Color Pickers

| Field | Label Test ID | Picker Test ID | Component |
|-------|---------------|----------------|-----------|
| Main Color | `ratings-drawer-appearance-main-color-label` | `ratings-drawer-appearance-main-color-dropdown` | `cly-vue-color-picker` |
| Font Color | `ratings-drawer-appearance-font-color-label` | `ratings-drawer-appearance-font-color-dropdown` | `cly-vue-color-picker` |

### 5.4 Trigger Button Size

Section label: `ratings-drawer-appearance-trigger-button-size-label` — "Trigger Button Size"

| Size | Wrapper Test ID | Label Test ID | Display |
|------|-----------------|---------------|---------|
| S | `ratings-drawer-s-el-radio-wrapper` | `ratings-drawer-s-el-radio-label` | Small |
| M | `ratings-drawer-m-el-radio-wrapper` | `ratings-drawer-m-el-radio-label` | Medium |
| L | `ratings-drawer-l-el-radio-wrapper` | `ratings-drawer-l-el-radio-label` | Large |

Uses `el-radio` (bordered/button style).

### 5.5 Position on the Page

Section label: `ratings-drawer-appearance-position-on-the-page-label` — "Position on the page"

Four radio options laid out as visual position selectors:

| Position | Wrapper Test ID | Logo Test ID | Label Test ID | Display |
|----------|-----------------|--------------|---------------|---------|
| Center Left | `ratings-drawer-position-on-the-page-mleft-el-radio-wrapper` | `ratings-drawer-mleft-logo` | `ratings-drawer-mleft-label` | Center left |
| Center Right | `ratings-drawer-position-on-the-page-mright-el-radio-wrapper` | `ratings-drawer-mright-logo` | `ratings-drawer-mright-label` | Center right |
| Bottom Left | `ratings-drawer-position-on-the-page-bleft-el-radio-wrapper` | `ratings-drawer-bleft-logo` | `ratings-drawer-bleft-label` | Bottom left |
| Bottom Right | `ratings-drawer-position-on-the-page-bright-el-radio-wrapper` | `ratings-drawer-bright-logo` | `ratings-drawer-bright-label` | Bottom right |

Each option contains an icon/logo image and a text label. Uses `el-radio` with bordered style.

### 5.6 Trigger Text

| Element | Test ID | Component |
|---------|---------|-----------|
| Label | `ratings-drawer-appearance-trigger-text-label` | div — "Trigger text" |
| Input | `ratings-drawer-appearance-trigger-text-input` | `el-input` |

### 5.7 Visibility

| Element | Test ID | Component | Notes |
|---------|---------|-----------|-------|
| Section label | `ratings-drawer-appearance-visibility-label` | div — "Visibility" | |
| Tooltip | `ratings-drawer-appearance-visibility-tooltip` | | Info icon |
| Checkbox | `ratings-drawer-appearance-hide-sticker-checkbox-el-checkbox-button` | `el-checkbox` | `tp="checkbox"` |
| Label | `ratings-drawer-appearance-hide-sticker-label` | span | "Hide sticker" |

---

## 6. Step 3: Devices & Targeting

Section label: `ratings-drawer-devices-segmentation-label` — "Segmentation"

Step 3 content covers audience targeting configuration. Based on the identified test ID `ratings-drawer-devices-segmentation-label`, the step encompasses:

- **Segmentation** — user/session property filters to target specific audience segments
- **Target pages** — URL patterns or page rules to restrict widget display
- **Target devices** — device type filters (desktop, mobile, tablet)

These follow the same targeting pattern used in Countly NPS and Survey drawers, where `cly-vue-drawer-step__section` groups contain condition builders for page targeting and device selection.

---

## 7. Element UI Components Reference

| Component | Usage in Drawer | Notes |
|-----------|----------------|-------|
| `el-input` | Widget name, question, rating texts (x5), button callout, thank you message, trigger text | Standard text input; `el-input__inner` inner element |
| `el-checkbox` | Comment, contact, consent toggles (Step 1); hide sticker (Step 2) | `tp="checkbox"` on inner `<input>`; `el-checkbox-button` variant for test IDs |
| `el-radio` (bordered) | Logo selector (default/custom/none), trigger size (S/M/L), position (4 options) | Wrapper + button + label pattern, each with separate test IDs |
| `el-select` / `el-option` | Rating symbol dropdown (Emojis/Thumbs/Stars) | Options use `el-option-test-id-{value}-el-options` convention |
| `cly-vue-color-picker` | Main color, font color | Rendered as dropdown trigger — `ratings-drawer-appearance-*-color-dropdown` |

---

## 8. Footer Buttons

Located in `cly-vue-drawer__footer`.

| Button | Test ID | Class | Behavior |
|--------|---------|-------|----------|
| Cancel | `ratings-drawer-cancel-button` | `el-button--secondary el-button--small` | Closes drawer, discards changes |
| Save | `ratings-drawer-save-button` | `el-button--success el-button--small` | Saves and closes; may be `is-disabled` until required fields are filled |

Multi-step navigation (Next/Previous) buttons are rendered inside the footer per step:
- Step 1 active: shows **Next** button to advance to Step 2
- Step 2 active: shows **Previous** and **Next** buttons
- Step 3 active: shows **Previous** button and **Save**
- Cancel is always present

---

## 9. Implementation Notes

### Test ID Naming Convention

All test IDs in this drawer follow the pattern:
```
ratings-drawer-{section}-{field}-{element-type}
```

Examples:
- `ratings-drawer-settings-ratings-emoji1-text-input`
- `ratings-drawer-appearance-position-on-the-page-mleft-el-radio-wrapper`
- `ratings-drawer-ratingspopup-comment-checkbox-el-checkbox-button`

### Known Typo

The step separator test IDs use the misspelled word "seperator" (missing the first 'a'):
- `ratings-drawer-seperator-0` (between steps 1 and 2)
- `ratings-drawer-seperator-1` (between steps 2 and 3)

This matches the same typo found in the Survey drawer (`drawer-test-id-seperator-*`) — it is consistent across plugins and should **not** be corrected in test selectors to avoid breaking existing test suites.

### HTML Compact Notation

The source HTML uses a compact attribute shorthand:
- `c` → `class`
- `t` → `data-test-id`
- `tp` → `type`
- `ph` → `placeholder`
- `r` → `role`

### Step Lock State

Steps that haven't been reached yet carry the `is-locked` class on their step label. Steps in progress or completed carry `is-active`. The step sign container (`cly-vue-drawer__step-sign`) transitions from showing the index number to a checkmark icon upon completion.

### Sidecar Preview Always Visible

Unlike some drawers where the sidecar is conditional, the ratings preview sidecar (`cly-vue-ratings-preview`) is always rendered and always shows both the **Ratings Popup** and **Thank you Message** preview simultaneously, providing a persistent live preview of the widget as configuration changes.

### Radio Button Test ID Pattern

Radio buttons in this drawer use a three-part test ID structure per option:
- `ratings-drawer-{value}-el-radio-wrapper` — the outer wrapper
- `ratings-drawer-{value}-el-radio-button` — the actual `<input type="radio">`
- `ratings-drawer-{value}-el-radio-label` — the visible label

This differs from `el-checkbox` which uses a single `el-checkbox-button` suffix.

---

## 10. Complete Test ID Index

```
Sidecar Preview:
  ratings-drawer-ratingspopup-label
  ratings-drawer-ratingspopup-question
  ratings-drawer-ratingspopup-emoji1
  ratings-drawer-ratingspopup-emoji2
  ratings-drawer-ratingspopup-emoji3
  ratings-drawer-ratingspopup-emoji4
  ratings-drawer-ratingspopup-emoji5
  ratings-drawer-ratingspopup-comment-checkbox-el-checkbox-button
  ratings-drawer-ratingspopup-comment-label
  ratings-drawer-ratingspopup-contact-checkbox-el-checkbox-button
  ratings-drawer-ratingspopup-contact-label
  ratings-drawer-ratingspopup-submit-button
  ratings-drawer-ratingspopup-poweredby-label
  ratings-drawer-thankyoupopup-label
  ratings-drawer-thankyoupopup-icon
  ratings-drawer-thankyoupopup-color-icon
  ratings-drawer-thankyoupopup-message-text
  ratings-drawer-thankyoupopup-poweredby-label

Header & Navigation:
  ratings-drawer-header-title
  ratings-drawer-close-button
  ratings-drawer-steps-header-container
  ratings-drawer-step-1-label
  ratings-drawer-step-sign
  ratings-drawer-current-step-index-1
  ratings-drawer-settings-label
  ratings-drawer-seperator-0
  ratings-drawer-step-2-label
  ratings-drawer-current-step-index-2
  ratings-drawer-widget-appearance-label
  ratings-drawer-seperator-1
  ratings-drawer-step-3-label
  ratings-drawer-current-step-index-3
  ratings-drawer-devices-targeting-label

Step 1 - Settings:
  ratings-drawer-settings-widget-name-label
  ratings-drawer-settings-widget-name-desc
  ratings-drawer-settings-ratings-widget-name-input
  ratings-drawer-settings-question-label
  ratings-drawer-settings-question-input
  ratings-drawer-settings-ratings-label
  ratings-drawer-settings-ratings-emoji1-text-input
  ratings-drawer-settings-ratings-emoji2-text-input
  ratings-drawer-settings-ratings-emoji3-text-input
  ratings-drawer-settings-ratings-emoji4-text-input
  ratings-drawer-settings-ratings-emoji5-text-input
  ratings-drawer-settings-comment-checkbox-el-checkbox-button
  ratings-drawer-settings-comment-label
  ratings-drawer-settings-contact-checkbox-el-checkbox-button
  ratings-drawer-settings-contact-label
  ratings-drawer-settings-add-user-consent-el-checkbox-button
  ratings-drawer-settings-button-callout-label
  ratings-drawer-settings-button-callout-input
  ratings-drawer-settings-thanks-label
  ratings-drawer-settings-thanks-input

Step 2 - Widget Appearance:
  ratings-drawer-appearance-rating-symbol-label
  ratings-drawer-select-input
  el-option-test-id-emojis-el-options
  el-option-test-id-thumbs-el-options
  el-option-test-id-stars-el-options
  ratings-drawer-appearance-logo-label
  ratings-drawer-appearance-logo-tooltip
  ratings-drawer-default-el-radio-wrapper
  ratings-drawer-default-el-radio-button
  ratings-drawer-default-el-radio-label
  ratings-drawer-custom-el-radio-wrapper
  ratings-drawer-custom-el-radio-button
  ratings-drawer-custom-el-radio-label
  ratings-drawer-none-el-radio-wrapper
  ratings-drawer-none-el-radio-button
  ratings-drawer-none-el-radio-label
  ratings-drawer-appearance-main-color-label
  ratings-drawer-appearance-main-color-dropdown
  ratings-drawer-appearance-font-color-label
  ratings-drawer-appearance-font-color-dropdown
  ratings-drawer-appearance-trigger-button-size-label
  ratings-drawer-s-el-radio-wrapper
  ratings-drawer-s-el-radio-label
  ratings-drawer-m-el-radio-wrapper
  ratings-drawer-m-el-radio-label
  ratings-drawer-l-el-radio-wrapper
  ratings-drawer-l-el-radio-label
  ratings-drawer-appearance-position-on-the-page-label
  ratings-drawer-position-on-the-page-mleft-el-radio-wrapper
  ratings-drawer-mleft-logo
  ratings-drawer-mleft-label
  ratings-drawer-position-on-the-page-mright-el-radio-wrapper
  ratings-drawer-mright-logo
  ratings-drawer-mright-label
  ratings-drawer-position-on-the-page-bleft-el-radio-wrapper
  ratings-drawer-bleft-logo
  ratings-drawer-bleft-label
  ratings-drawer-position-on-the-page-bright-el-radio-wrapper
  ratings-drawer-bright-logo
  ratings-drawer-bright-label
  ratings-drawer-appearance-trigger-text-label
  ratings-drawer-appearance-trigger-text-input
  ratings-drawer-appearance-visibility-label
  ratings-drawer-appearance-visibility-tooltip
  ratings-drawer-appearance-hide-sticker-checkbox-el-checkbox-button
  ratings-drawer-appearance-hide-sticker-label

Step 3 - Devices & Targeting:
  ratings-drawer-devices-segmentation-label

Footer:
  ratings-drawer-cancel-button
  ratings-drawer-save-button
```
