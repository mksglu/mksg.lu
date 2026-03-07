# Countly NPS Plugin Drawer — Comprehensive PRD

## Table of Contents
1. [Scope & Context](#1-scope--context)
2. [Component Hierarchy](#2-component-hierarchy)
3. [HTML Structure & Class Names](#3-html-structure--class-names)
4. [Design Tokens](#4-design-tokens)
5. [Form Fields](#5-form-fields)
6. [State Transitions](#6-state-transitions)
7. [Element UI Components](#7-element-ui-components)
8. [Countly Custom Components](#8-countly-custom-components)
9. [Widget Preview](#9-widget-preview)
10. [Implementation Notes](#10-implementation-notes)

---

## 1. Scope & Context

### Plugin Identity
- **Plugin Name**: NPS (Net Promoter Score)
- **Feature**: New NPS Survey creation drawer
- **URL**: `http://mert.count.ly/dashboard#/6908ab02fece9ef06eca7285/nps`
- **Purpose**: Allows product teams to create NPS surveys that measure customer satisfaction and loyalty via a 0–10 rating scale presented as an in-app or web widget.

### Drawer Type
- **Component**: `cly-vue-drawer` (multi-step wizard)
- **Variant**: Half-screen drawer with 6 sidecars (`cly-vue-drawer--half-screen-6`)
- **Steps**: 2 primary steps — **Settings** (Step 1) and **Customization** (Step 2)
- **Has Sidecars**: Yes — the left panel is a live widget preview sidecar (`has-sidecars`)

### Business Logic Overview
NPS surveys present users with:
1. A **main question** ("How likely are you to recommend…") with a 0–10 score selector.
2. Optional **follow-up questions** segmented by score group: Promoters (9–10), Passives (7–8), Detractors (0–6).
3. A **Thank You message** after submission.
4. Optional **user consent** gate before showing the widget.

---

## 2. Component Hierarchy

```
cly-vue-drawer [is-mounted, is-open, has-sidecars, cly-vue-drawer--half-screen, cly-vue-drawer--half-screen-6]
│
├── cly-vue-drawer__sidecars-view
│   └── #cly-cmp-3620-mainSidecar  [cly-vue-content]
│       └── .countly-surveys-web.widget-preview.cly-vue-nps-preview
│           ├── Preview Panel: Main Question   [.preview-stage]
│           ├── Preview Panel: Follow-Ups      [.preview-stage]
│           └── Preview Panel: Thank You       [.preview-stage]
│
└── cly-vue-drawer__steps-view
    ├── cly-vue-drawer__title-container
    │   ├── cly-vue-drawer__title-header         (Drawer title: "New NPS Survey")
    │   └── cly-vue-drawer__close-button
    │
    ├── cly-vue-drawer__steps-header             (Step navigation bar)
    │   ├── Step 1: Settings   [cly-vue-drawer__step-label]
    │   │   ├── cly-vue-drawer__step-sign-container
    │   │   │   └── cly-vue-drawer__step-sign
    │   │   │       ├── .index.text-small.color-white   (step number "1")
    │   │   │       └── .done-icon.text-small.color-white.bu-pt-0  (checkmark)
    │   │   ├── cly-vue-drawer__step-title  (label "Settings")
    │   │   └── cly-vue-drawer__step-separator
    │   │
    │   └── Step 2: Customization  [cly-vue-drawer__step-label]
    │       ├── cly-vue-drawer__step-sign-container
    │       │   └── cly-vue-drawer__step-sign
    │       │       ├── .index.text-small  (step number "2")
    │       │       └── .done-icon.text-small.color-white.bu-pt-0  (checkmark)
    │       └── cly-vue-drawer__step-title  (label "Customization")
    │
    ├── cly-vue-drawer__body-container           (Scrollable step content)
    │   ├── #cly-cmp-3625-step1  [cly-vue-content]   → Step 1: Settings
    │   └── #cly-cmp-3625-step2  [cly-vue-content]   → Step 2: Customization
    │
    └── cly-vue-drawer__footer                   (Action buttons: Cancel / Save / Next)
```

---

## 3. HTML Structure & Class Names

### 3.1 Root Drawer Shell

```html
<div
  tabindex="0"
  class="cly-vue-drawer is-mounted is-open has-sidecars cly-vue-drawer--half-screen cly-vue-drawer--half-screen-6"
>
```

| Class | Purpose |
|---|---|
| `cly-vue-drawer` | Base drawer component class |
| `is-mounted` | Vue lifecycle: component has mounted |
| `is-open` | Drawer is visible/open state |
| `has-sidecars` | Layout mode: sidecar panels present on left |
| `cly-vue-drawer--half-screen` | Drawer occupies half the viewport width |
| `cly-vue-drawer--half-screen-6` | Variant index 6 (6-column grid or 6-sidecar variant) |

### 3.2 Sidecars View (Preview Panel)

```html
<div class="cly-vue-drawer__sidecars-view">
  <div id="cly-cmp-3620-mainSidecar" class="cly-vue-content">
    <div>
      <div class="countly-surveys-web widget-preview cly-vue-nps-preview">
```

| Class | Purpose |
|---|---|
| `cly-vue-drawer__sidecars-view` | Container for all sidecar panels |
| `cly-vue-content` | Generic Vue content wrapper |
| `countly-surveys-web` | Survey widget outer wrapper (shared with Surveys plugin) |
| `widget-preview` | Preview mode indicator |
| `cly-vue-nps-preview` | NPS-specific preview component class |

### 3.3 Steps Header Navigation

```html
<div class="cly-vue-drawer__steps-header">
  <!-- Step 1 -->
  <div data-test-id="nps-drawer-step-1-label" class="cly-vue-drawer__step-label is-active">
    <div data-test-id="nps-drawer-step-sign-container" class="bu-is-flex">
      <div data-test-id="nps-drawer-step-sign" class="cly-vue-drawer__step-sign">
        <span data-test-id="nps-drawer-current-step-index-1" class="index text-small color-white">1</span>
        <span data-test-id="nps-drawer-current-step-index-img-container1" class="done-icon text-small color-white bu-pt-0">
          <img data-test-id="nps-drawer-step-1" />
        </span>
      </div>
    </div>
    <div data-test-id="nps-drawer-settings-label" class="cly-vue-drawer__step-title text-small font-weight-bold color-cool-gray-40">
      Settings
    </div>
  </div>

  <div data-test-id="nps-drawer-seperator-1" class="cly-vue-drawer__step-separator"></div>

  <!-- Step 2 -->
  <div data-test-id="nps-drawer-step-2-label" class="cly-vue-drawer__step-label is-locked">
    <div data-test-id="nps-drawer-step-sign-container" class="bu-is-flex">
      <div data-test-id="nps-drawer-step-sign" class="cly-vue-drawer__step-sign">
        <span data-test-id="nps-drawer-current-step-index-2" class="index text-small">2</span>
        <span data-test-id="nps-drawer-current-step-index-img-container2" class="done-icon text-small color-white bu-pt-0">
          <img data-test-id="nps-drawer-step-2" />
        </span>
      </div>
    </div>
    <div class="cly-vue-drawer__step-title text-small font-weight-bold color-cool-gray-40">
      Customization
    </div>
  </div>
</div>
```

### 3.4 Drawer Title Header

```html
<div class="cly-vue-drawer__title-container">
  <h3 data-test-id="nps-drawer-header-title" class="cly-vue-drawer__title-header">
    New NPS Survey
  </h3>
  <div class="cly-vue-drawer__close-button"><!-- X icon --></div>
</div>
```

### 3.5 Step 1: Settings Content Container

```html
<div id="cly-cmp-3625-step1" class="cly-vue-content">
  <span>
    <div>
      <!-- Survey Name Field -->
      <!-- Main Question Field -->
      <!-- Follow-Up Question Radio Group -->
      <!-- Follow-Up Inputs (conditional) -->
      <!-- User Consent Checkbox -->
      <!-- Thank You Message Field -->
    </div>
  </span>
</div>
```

### 3.6 Step 2: Customization Content Container

```html
<div id="cly-cmp-3625-step2" class="cly-vue-content">
  <span>
    <div>
      <!-- Display Options: Visibility Dropdown -->
      <!-- Widget Main Color: Color Picker -->
      <!-- Logo: Radio Group (Default / Custom / None) -->
      <!-- Button Text Fields (Submit, Next, Previous) -->
      <!-- Placeholder Text Field (Follow-Up) -->
    </div>
  </span>
</div>
```

### 3.7 Section Wrappers

All form groups within steps use:

```html
<div class="cly-vue-drawer-step__section">
  <!-- Section heading (optional) -->
  <div class="text-medium-big cly-vue-surveys-drawer--font-weight-medium bu-pb-2">
    Section Heading
  </div>
  <!-- Field label -->
  <div class="text-medium text-heading">
    Field Label
    <i class="cly-vue-tooltip-icon ion-help-circled has-tooltip" data-original-title="null"></i>
  </div>
  <!-- Field control -->
</div>
```

---

## 4. Design Tokens

### 4.1 Typography Classes

| Class | Usage |
|---|---|
| `text-small` | Step index numbers, step titles in nav |
| `text-smallish` | Secondary small text |
| `text-medium` | Form field labels |
| `text-medium-big` | Section group headings (e.g., "Display options") |
| `text-heading` | Field labels with emphasis |
| `font-weight-bold` | Step title labels in nav |
| `cly-vue-surveys-drawer--font-weight-medium` | Medium weight override for section headings |

### 4.2 Color Classes

| Class | Usage |
|---|---|
| `color-white` | Step index text on active/completed step sign |
| `color-cool-gray-40` | Step title label text (inactive state) |

### 4.3 Spacing Utilities (Bulma-based `bu-` prefix)

| Class | Usage |
|---|---|
| `bu-mb-6` | Bottom margin on preview stage containers |
| `bu-pb-2` | Bottom padding on section headings |
| `bu-pb-4` | Bottom padding on preview stage labels |
| `bu-pb-5` | Bottom padding variant |
| `bu-pt-0` | Zero top padding (done-icon in step sign) |
| `bu-ml-2` | Left margin (inline elements) |
| `bu-is-flex` | Flex display |
| `bu-is-align-items-center` | Flex align center |

### 4.4 Layout Classes

| Class | Usage |
|---|---|
| `w-100` | Full width |
| `pt-0` | Top padding zero (widget horizontal line) |
| `center` | Center alignment (widget section-top) |
| `clear` | Float clear (rating labels) |
| `scroll-shadow-container` | Drawer body scroll with shadow effect |

### 4.5 Ionicon Classes

| Class | Usage |
|---|---|
| `ion-ios-close-empty` | Close button icon in widget preview popups |
| `ion-help-circled` | Tooltip trigger icon on field labels |
| `ion-arrow-up-b` | Dropdown arrow icon (el-select caret) |

---

## 5. Form Fields

### 5.1 Step 1 — Settings Fields

#### Survey Internal Name
- **Label text**: (Survey internal name section heading)
- **data-test-id (label)**: `nps-drawer-settings-survey-name-label`
- **data-test-id (input)**: `nps-drawer-settings-survey-name-input`
- **Element**: `<input type="text" autocomplete="off" class="el-input__inner">`
- **Placeholder**: `"Enter a survey internal name"`
- **Purpose**: Internal identifier for the survey, not shown to end users.

#### Main Question
- **data-test-id (label)**: `nps-drawer-settings-main-question-label`
- **data-test-id (input)**: `nps-drawer-settings-main-question-input`
- **Element**: `<input type="text" autocomplete="off" class="el-input__inner">`
- **Placeholder**: `"Enter a survey name"`
- **Purpose**: The primary question shown to users in the NPS widget (e.g., "How likely are you to recommend us?").

#### Follow-Up Question Mode (Radio Group)
Three mutually exclusive options controlling follow-up behavior:

| Option Label | Value | data-test-id (wrapper) | data-test-id (radio) | data-test-id (label) |
|---|---|---|---|---|
| Don't use follow-up question | `none` (implied) | — | `nps-drawer-follow-up-question-1-el-radio` | — |
| Use one follow-up question for all scores | — | — | — | — |
| Use and customize follow-up question by score | — | — | `nps-drawer-follow-up-question-2-el-radio-label` | `nps-drawer-follow-up-question-2-el-radio-label` |

**Radio input elements**:
```html
<!-- Option 1: Don't use follow-up question -->
<label class="el-radio">
  <span class="el-radio__input">
    <span class="el-radio__inner"></span>
    <input type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" value="">
  </span>
  <span class="el-radio__label">Don't use follow-up question</span>
</label>

<!-- Option 2: Use one follow-up question for all scores -->
<label class="el-radio">
  <span class="el-radio__input">
    <span class="el-radio__inner"></span>
    <input type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" value="">
  </span>
  <span class="el-radio__label">Use one follow-up question for all scores</span>
</label>

<!-- Option 3: Use and customize follow-up question by score -->
<label class="el-radio">
  <span class="el-radio__input">
    <span class="el-radio__inner"></span>
    <input type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" value="">
  </span>
  <span class="el-radio__label">Use and customize follow-up question by score</span>
</label>
```

#### Follow-Up Question Fields (Conditional — shown when "by score" selected)

| Segment | Label | data-test-id (label) | data-test-id (input) |
|---|---|---|---|
| Promoters (score 9–10) | (Promoter label) | `nps-drawer-settings-follow-up-question-for-promoter-label` | `nps-drawer-settings-follow-up-question-for-promoter-input` |
| Passives (score 7–8) | (Passive label) | `nps-drawer-settings-follow-up-question-for-passive-label` | `nps-drawer-settings-follow-up-question-for-passive-input` |
| Detractors (score 0–6) | (Detractor label) | `nps-drawer-settings-follow-up-question-for-detractor-label` | `nps-drawer-settings-follow-up-question-for-detractor-input` |

All three are `<input type="text" class="el-input__inner">` elements.

#### Add User Consent (Checkbox)

```html
<label class="el-checkbox">
  <span class="el-checkbox__input">
    <span class="el-checkbox__inner"></span>
    <input
      data-test-id="nps-drawer-settings-add-user-consent-el-checkbox-input"
      type="checkbox"
      aria-hidden="true"
      tabindex="-1"
      class="el-checkbox__original"
      value=""
    >
  </span>
  <span
    data-test-id="nps-drawer-settings-add-user-consent-el-checkbox-label"
    class="el-checkbox__label"
  >
    Add user consent
  </span>
</label>
```

- **data-test-id (input)**: `nps-drawer-settings-add-user-consent-el-checkbox-input`
- **data-test-id (button/span)**: `nps-drawer-settings-add-user-consent-el-checkbox-button`
- **data-test-id (label)**: `nps-drawer-settings-add-user-consent-el-checkbox-label`

#### Thank You Message
- **data-test-id (label)**: `nps-drawer-settings-thanks-label`
- **data-test-id (input)**: `nps-drawer-settings-thanks-input`
- **Element**: `<input type="text" autocomplete="off" class="el-input__inner">`
- **Label text**: "Thank you message"
- **Purpose**: Text displayed on the Thank You screen after the user submits their NPS score.

---

### 5.2 Step 2 — Customization Fields

#### Visibility (Dropdown / Select)
- **Section heading**: "Display options"
- **data-test-id (label)**: `nps-drawer-customization-visibility-label`
- **data-test-id (tooltip)**: `nps-drawer-customization-visibility-tooltip`
- **data-test-id (input)**: `nps-drawer-customization-visibility-dropdown-select-input`
- **data-test-id (caret icon)**: `nps-drawer-customization-visibility-dropdown-select-icon`
- **Element**: `<input type="text" readonly="readonly" placeholder="Select" class="el-input__inner">` wrapped in `el-select`
- **Label text**: "Visibility"
- **Tooltip**: Present (via `ion-help-circled` icon with `has-tooltip`)

**Dropdown Options** (rendered in `el-select-dropdown__list`):

| Option Label | data-test-id |
|---|---|
| Until they submit a score | `option-until-they-submit-a-score-el-options` |
| Until user closes or submits the widget | `option-until-user-closes-or-submits-the-widget-el-options` |
| Always visible | `option-always-visible-el-options` |

#### Widget Main Color (Color Picker)
- **data-test-id (label)**: `nps-drawer-customization-widget-main-color-label`
- **data-test-id (picker trigger)**: `nps-drawer-customization-main-color-dropdown`
- **data-test-id (image wrapper)**: `nps-drawer-customization-main-color-dropdown-cly-color-picker-img-wrapper`
- **Label text**: (inferred) "Widget main color"
- **Component**: `cly-color-picker` (Countly custom component embedded in a dropdown)

#### Logo (Radio Group)
- **data-test-id (label)**: `nps-drawer-customization-logo-label`
- **data-test-id (tooltip)**: `nps-drawer-customization-logo-tooltip`

Three mutually exclusive radio options:

| Option Label | Value | data-test-id (wrapper) | data-test-id (radio el) | data-test-id (input) | data-test-id (label) |
|---|---|---|---|---|---|
| Use default logo | `default` | `nps-drawer-default-el-radio-wrapper` | `nps-drawer-default-el-radio` | `nps-drawer-default-el-radio-button` | `nps-drawer-default-el-radio-label` |
| Upload a custom logo | `custom` | `nps-drawer-custom-el-radio-wrapper` | `nps-drawer-custom-el-radio` | `nps-drawer-custom-el-radio-button` | `nps-drawer-custom-el-radio-label` |
| Don't use a logo | `none` | `nps-drawer-none-el-radio-wrapper` | `nps-drawer-none-el-radio` | `nps-drawer-none-el-radio-button` | `nps-drawer-none-el-radio-label` |

Radio input elements follow the standard `el-radio` pattern:
```html
<input
  data-test-id="nps-drawer-default-el-radio-button"
  type="radio"
  aria-hidden="true"
  tabindex="-1"
  class="el-radio__original"
  value="default"
>
```

#### Submit Button Text
- **data-test-id (label)**: `nps-drawer-customization-submit-button-text-label`
- **data-test-id (input)**: `nps-drawer-customization-submit-button-text-input`
- **Element**: `<input type="text" autocomplete="off" class="el-input__inner">`

#### Next Button Text
- **data-test-id (input)**: `nps-drawer-customization-next-button-text-input`
- **Element**: `<input type="text" autocomplete="off" class="el-input__inner">`

#### Previous Button Text
- **data-test-id (input)**: `nps-drawer-customization-previous-button-text-input`
- **Element**: `<input type="text" autocomplete="off" class="el-input__inner">`

#### Follow-Up Placeholder Text
- **data-test-id (label)**: `nps-drawer-customization-placeholder-follow-up-label`
- **Element**: `<input type="text" autocomplete="off" class="el-input__inner">`

---

## 6. State Transitions

### 6.1 Step Navigation States

#### Step Label States
| CSS Class | Meaning |
|---|---|
| `is-active` | Currently active step (Step 1 on open) |
| `is-locked` | Step not yet reachable (Step 2 initially locked) |
| (no modifier) | Step completed / previously visited |

#### Step Sign States
- **Active step**: Step number shown in `.index.text-small.color-white` (white text on colored background)
- **Completed step**: `.done-icon` becomes visible with checkmark image (`<img data-test-id="nps-drawer-step-N">`)
- **Locked step**: Step number in `.index.text-small` (no `color-white`, uses default/muted color)

### 6.2 Follow-Up Question Conditional Display

| Radio Selection | Fields Shown |
|---|---|
| "Don't use follow-up question" | No follow-up inputs |
| "Use one follow-up question for all scores" | Single unified follow-up input |
| "Use and customize follow-up question by score" | Three separate inputs: Promoter, Passive, Detractor |

### 6.3 Logo Upload Conditional Display

| Radio Selection | Additional UI |
|---|---|
| "Use default logo" | No additional controls |
| "Upload a custom logo" | File upload control appears |
| "Don't use a logo" | No additional controls |

### 6.4 Drawer Open/Close

- **Open**: Classes `is-mounted is-open` present on root element
- **Closing**: `is-open` removed, transition animation plays
- **Mounted**: `is-mounted` persists to prevent re-mount animation

### 6.5 Form Validation

- Step 2 (`is-locked`) becomes navigable after Step 1 required fields are satisfied.
- Navigation via footer buttons (Next / Back / Save/Create).

---

## 7. Element UI Components

### 7.1 el-input (Text Input)

Used for: Survey name, main question, follow-up questions, thank you message, button texts, placeholder text.

```html
<div class="el-input [el-input--suffix]">
  <!---->
  <input type="text" autocomplete="off" class="el-input__inner" [placeholder="..."] [data-test-id="..."]>
  <!---->
  <!-- Optional suffix slot (for dropdown arrow): -->
  <span class="el-input__suffix">
    <span class="el-input__suffix-inner">
      <i data-test-id="..." class="el-select__caret ion-arrow-up-b"></i>
    </span>
  </span>
</div>
```

**Modifier class** `el-input--suffix`: Present when the input has a suffix icon (used for the visibility select).

### 7.2 el-radio (Radio Button)

Used for: Follow-up mode selection, logo selection.

```html
<label class="el-radio" [data-test-id="nps-drawer-*-el-radio"]>
  <span class="el-radio__input [is-checked]">
    <span class="el-radio__inner"></span>
    <input
      type="radio"
      aria-hidden="true"
      tabindex="-1"
      class="el-radio__original"
      value="[value]"
      [data-test-id="nps-drawer-*-el-radio-button"]
    >
  </span>
  <span class="el-radio__label" [data-test-id="nps-drawer-*-el-radio-label"]>
    [Label text]
  </span>
</label>
```

**Wrapper div**: `<div data-test-id="nps-drawer-*-el-radio-wrapper">`

### 7.3 el-checkbox (Checkbox)

Used for: "Add user consent" option.

```html
<label class="el-checkbox">
  <span class="el-checkbox__input [is-checked]">
    <span class="el-checkbox__inner"></span>
    <input
      type="checkbox"
      aria-hidden="true"
      tabindex="-1"
      class="el-checkbox__original"
      value=""
      data-test-id="nps-drawer-settings-add-user-consent-el-checkbox-input"
    >
  </span>
  <span class="el-checkbox__label" data-test-id="nps-drawer-settings-add-user-consent-el-checkbox-label">
    Add user consent
  </span>
</label>
```

### 7.4 el-select (Dropdown Select)

Used for: Visibility option.

```html
<div class="el-select">
  <!---->
  <div class="el-input el-input--suffix is-arrow">
    <!---->
    <input
      data-test-id="nps-drawer-customization-visibility-dropdown-select-input"
      type="text"
      readonly="readonly"
      autocomplete="off"
      placeholder="Select"
      min-width="-1"
      max-width="-1"
      class="el-input__inner"
    >
    <!----><span class="el-input__suffix">
      <span class="el-input__suffix-inner">
        <i data-test-id="nps-drawer-customization-visibility-dropdown-select-icon" class="el-select__caret ion-arrow-up-b"></i>
      </span>
    </span>
  </div>

  <!-- Dropdown panel (absolutely positioned) -->
  <div class="el-select-dropdown el-popper">
    <div class="el-scrollbar">
      <div class="el-select-dropdown__wrap el-scrollbar__wrap">
        <ul class="el-select-dropdown__list">
          <li data-test-id="option-until-they-submit-a-score-el-options" class="el-select-dropdown__item">
            Until they submit a score
          </li>
          <li data-test-id="option-until-user-closes-or-submits-the-widget-el-options" class="el-select-dropdown__item">
            Until user closes or submits the widget
          </li>
          <li data-test-id="option-always-visible-el-options" class="el-select-dropdown__item">
            Always visible
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
```

**Modifier class** `is-arrow`: Applied to `el-input` within `el-select` to show dropdown arrow styling.

### 7.5 Element UI Class Reference

| Class | Element | Notes |
|---|---|---|
| `el-input` | Wrapper div | Text input container |
| `el-input--suffix` | Wrapper modifier | Has suffix icon slot |
| `el-input__inner` | `<input>` | Actual input element |
| `el-input__suffix` | Suffix span | Right-side icon container |
| `el-input__suffix-inner` | Inner span | Inner wrapper for suffix icons |
| `el-radio` | `<label>` | Radio button wrapper |
| `el-radio__input` | `<span>` | Visual radio control wrapper |
| `el-radio__inner` | `<span>` | Custom radio circle visual |
| `el-radio__original` | `<input type="radio">` | Native input (hidden) |
| `el-radio__label` | `<span>` | Label text |
| `el-checkbox` | `<label>` | Checkbox wrapper |
| `el-checkbox__input` | `<span>` | Visual checkbox wrapper |
| `el-checkbox__inner` | `<span>` | Custom checkbox visual |
| `el-checkbox__original` | `<input type="checkbox">` | Native input (hidden) |
| `el-checkbox__label` | `<span>` | Label text |
| `el-select` | Wrapper div | Select/dropdown container |
| `el-select__caret` | `<i>` | Dropdown arrow icon |
| `el-select-dropdown` | Dropdown panel div | Floating options panel |
| `el-popper` | Same div | Popper.js positioning class |
| `el-scrollbar` | Scrollbar wrapper | Element UI scrollbar |
| `el-scrollbar__wrap` | Inner wrap | Scrollable area |
| `el-select-dropdown__wrap` | Dropdown scrollable | Options list scrollable area |
| `el-select-dropdown__list` | `<ul>` | Options list |
| `el-select-dropdown__item` | `<li>` | Individual option |

---

## 8. Countly Custom Components

### 8.1 cly-vue-drawer

The base drawer shell component. Key props inferred from classes:
- `half-screen`: Renders as a side panel covering half the viewport.
- `has-sidecars`: Activates sidecar layout with preview panel on the left.
- Manages step state: `is-active`, `is-locked`, completion transitions.

**Structural classes produced by this component**:
- `cly-vue-drawer`
- `cly-vue-drawer__sidecars-view`
- `cly-vue-drawer__steps-view`
- `cly-vue-drawer__title-container`
- `cly-vue-drawer__title-header`
- `cly-vue-drawer__close-button`
- `cly-vue-drawer__steps-header`
- `cly-vue-drawer__step-label`
- `cly-vue-drawer__step-sign`
- `cly-vue-drawer__step-title`
- `cly-vue-drawer__step-separator`
- `cly-vue-drawer__body-container`
- `cly-vue-drawer__footer`

**Step sign sub-elements**:
- `.index` — displays step number when step is active or locked
- `.done-icon` — displays completion checkmark image when step is done
- `cly-vue-drawer--half-screen-6` — variant class (numeric suffix likely corresponds to sidecar count or layout column configuration)

### 8.2 cly-vue-nps-preview

NPS-specific live preview sidecar component. Renders three preview panel states simultaneously:
1. Main question widget preview
2. Follow-ups widget preview
3. Thank You page preview

Each preview state is labeled and wrapped in `.preview-stage`.

### 8.3 cly-color-picker

A custom Countly color picker component used in the "Widget main color" field.
- Triggered via a dropdown control (`nps-drawer-customization-main-color-dropdown`)
- Contains an image wrapper: `nps-drawer-customization-main-color-dropdown-cly-color-picker-img-wrapper`
- Likely renders a color swatch + hex input or palette picker inside a popper dropdown.

### 8.4 cly-vue-tooltip-icon

Tooltip trigger icons used on form field labels.
- Element: `<i class="cly-vue-tooltip-icon ion-help-circled has-tooltip" data-original-title="null">`
- Present on: Visibility label, Logo label
- `data-original-title`: Tooltip content (currently "null" in snapshot, likely populated at runtime)

### 8.5 cly-vue-surveys-drawer (shared base)

NPS drawer inherits from or shares CSS with the generic Surveys drawer:
- Class: `cly-vue-surveys-drawer__subheading`
- Class: `cly-vue-surveys-drawer__survey-name`
- Class: `cly-vue-surveys-drawer--font-weight-medium`
- Class: `cly-vue-nps-drawer__margin-bottom`

---

## 9. Widget Preview

The left sidecar renders a live preview of the NPS widget in three distinct "stages". Each stage is wrapped in a `.preview-stage` container with a `.stage-label` heading.

### 9.1 Main Question Preview

**Stage label**: "Main question"
- **data-test-id**: `nps-drawer-preview-popup-main-question-label`
- **Stage label class**: `stage-label bu-pb-4`

**Widget outer container**:
```html
<div class="survey-widget-v2 full">
  <div class="survey-widget-v2__padding">
```

**Widget header (section-top)**:
```html
<div class="section-top center">
  <div class="pt-0 survey-widget-v2__horizontal-line w-100 center">
    <div data-test-id="servey-widget-section-top-center-horizantal-line-top-question-1-line-1"
         class="survey-widget-v2__horizontal-line__top"></div>
    <div data-test-id="servey-widget-section-top-center-horizantal-line-grey-question-1-line-1"
         class="survey-widget-v2__horizontal-line__grey"></div>
  </div>
  <div data-test-id="main-question-popup-close-button" class="close-button center">
    <i class="ion-ios-close-empty center"></i>
  </div>
</div>
```

**Widget body (section-body)**:
```html
<div class="section-body">
  <div data-test-id="nps-preview-main-question-popup-title-label" class="main-text question">
    How likely are you to recommend us to a friend or colleague?
  </div>
  <div class="main-sub-text">Select one</div>
```

- **data-test-id (title)**: `nps-preview-main-question-popup-title-label`
- **data-test-id (select label)**: `nps-preview-main-question-select-one-label`
- **Title class**: `main-text question`
- **Subtitle class**: `main-sub-text`

**NPS Rating Scale (0–10)**:

11 rating buttons rendered as a horizontal row. Each button uses the IDs `q_1_1` through `q_1_11`:

```html
<!-- Score 0 -->
<div id="q_1_1" data-test-id="surveys-widget-preview-popup-main-question-radio-button-0" class="rating-button">
  <div class="overlay-v2">
    <div class="text">0</div>
  </div>
</div>
<!-- Score 1–9 follow same pattern -->
<!-- Score 10 -->
<div id="q_1_11" data-test-id="surveys-widget-preview-popup-main-question-radio-button-10" class="rating-button">
  <div class="overlay-v2">
    <div class="text">10</div>
  </div>
</div>
```

**Complete rating button data-test-ids**:

| Score | Element ID | data-test-id |
|---|---|---|
| 0 | `q_1_1` | `surveys-widget-preview-popup-main-question-radio-button-0` |
| 1 | `q_1_2` | `surveys-widget-preview-popup-main-question-radio-button-1` |
| 2 | `q_1_3` | `surveys-widget-preview-popup-main-question-radio-button-2` |
| 3 | `q_1_4` | `surveys-widget-preview-popup-main-question-radio-button-3` |
| 4 | `q_1_5` | `surveys-widget-preview-popup-main-question-radio-button-4` |
| 5 | `q_1_6` | `surveys-widget-preview-popup-main-question-radio-button-5` |
| 6 | `q_1_7` | `surveys-widget-preview-popup-main-question-radio-button-6` |
| 7 | `q_1_8` | `surveys-widget-preview-popup-main-question-radio-button-7` |
| 8 | `q_1_9` | `surveys-widget-preview-popup-main-question-radio-button-8` |
| 9 | `q_1_10` | `surveys-widget-preview-popup-main-question-radio-button-9` |
| 10 | `q_1_11` | `surveys-widget-preview-popup-main-question-radio-button-10` |

**Rating labels**:
```html
<div class="rating-labels">
  <div data-test-id="surveys-widget-preview-rating-not-likely-label" class="left">Not likely</div>
  <div data-test-id="surveys-widget-preview-rating-likely-label" class="right">Very likely</div>
  <div class="clear"></div>
</div>
```

**Submit/Next button (in preview)**:
```html
<div class="submit-wrapper">
  <div data-test-id="nps-drawer-customization-next-button" class="submit-button">
    Next
  </div>
</div>
```

**Widget footer (section-footer)**:
```html
<div class="section-footer">
  <div data-test-id="surveys-widget-preview-default-logo" class="surveys-widget-preview-default-logo">
    <!-- Countly default logo SVG removed -->
    <div class="powered-by-countly">Powered by Countly</div>
  </div>
</div>
```
- **data-test-id (logo)**: `surveys-widget-preview-default-logo`
- **class**: `surveys-widget-preview-default-logo`
- **Text**: "Powered by Countly"
- **class**: `powered-by-countly`

### 9.2 Follow-Ups Preview

**Stage label**: "Follow-ups"
**data-test-id (label)**: `nps-drawer-preview-popup-follow-ups-label`

**Widget header with two horizontal lines**:
```html
<div data-test-id="servey-widget-section-top-center-horizantal-line-top-question-2-line-1"
     class="survey-widget-v2__horizontal-line__top"></div>
<div data-test-id="servey-widget-section-top-center-horizantal-line-top-question-2-line-2"
     class="survey-widget-v2__horizontal-line__grey"></div>
```

**Close button**: `follow-ups-popup-close-button`

**Widget body**:
```html
<div data-test-id="nps-preview-follow-ups-popup-title-label" class="main-text question">
  We're glad you like us. What do you like the most about our product?
</div>
```
- **data-test-id (title)**: `nps-preview-follow-ups-popup-title-label`
- **Default promoter follow-up text**: "We're glad you like us. What do you like the most about our product?"

**Comment textarea**:
```html
<div data-test-id="nps-preview-follow-ups-popup-comment-textarea-wrapper" class="textarea-wrapper">
  <textarea
    data-test-id="nps-preview-follow-ups-popup-comment-textarea"
    class="nps-preview-follow-ups-popup-comment-textarea"
    placeholder="Enter your comment"
  ></textarea>
</div>
```
- **data-test-id (wrapper)**: `nps-preview-follow-ups-popup-comment-textarea-wrapper`
- **data-test-id (textarea)**: `nps-preview-follow-ups-popup-comment-textarea`
- **Placeholder**: `"Enter your comment"`
- **class (textarea)**: `nps-preview-follow-ups-popup-comment-textarea`
- **class (wrapper)**: `textarea-wrapper`

**Submit & Previous buttons (in preview)**:
```html
<div data-test-id="nps-drawer-customization-submit-button" class="submit-button">Submit</div>
<div data-test-id="nps-drawer-customization-previous-button" class="previous-button">Previous</div>
```

**Footer**: Same `surveys-widget-preview-default-logo` with "Powered by Countly".

### 9.3 Thank You Preview

**Stage label**: "Thank you page"
**data-test-id (label)**: `nps-drawer-preview-popup-thank-you-page-label`

**Close button**: `thanks-message-popup-close-button`

**Widget body**:
```html
<div class="thanks">
  <div data-test-id="nps-preview-thanks-image" class="thanks-image">
    <!-- Thank you illustration image -->
  </div>
  <div class="centered-text">
    <div data-test-id="nps-preview-thanks-message-popup-centered-text-label" class="centered-text">
      Thank you for your feedback!
    </div>
  </div>
</div>
```
- **data-test-id (image)**: `nps-preview-thanks-image`
- **data-test-id (message)**: `nps-preview-thanks-message-popup-centered-text-label`
- **class (container)**: `thanks`
- **class (image)**: `thanks-image`
- **class (text)**: `centered-text`

**Footer**: Same `surveys-widget-preview-default-logo`.

### 9.4 Widget Class Summary

| Class | Element | Notes |
|---|---|---|
| `survey-widget-v2` | Widget outer div | Base widget container |
| `survey-widget-v2.full` | Widget outer div | Full-width variant |
| `survey-widget-v2__padding` | Inner wrapper | Applies widget padding |
| `survey-widget-v2__horizontal-line` | Line container | Top decoration lines |
| `survey-widget-v2__horizontal-line__top` | Line div | Primary color line |
| `survey-widget-v2__horizontal-line__grey` | Line div | Grey secondary line |
| `section-top` | Header area | Widget close button + lines |
| `section-body` | Content area | Main question + rating |
| `section-footer` | Footer area | Logo/branding |
| `close-button` | Button div | Widget close X |
| `main-text` | Heading div | Primary question text |
| `main-sub-text` | Subheading div | "Select one" instruction |
| `question` | Modifier class | Applied to main-text |
| `rating-button` | Score button div | Individual NPS score button |
| `overlay-v2` | Inner div | Score button overlay |
| `text` | Score span | Numeric score display |
| `rating-labels` | Labels container | "Not likely" / "Very likely" |
| `left` | Label div | Left label (Not likely) |
| `right` | Label div | Right label (Very likely) |
| `clear` | Clear div | Float clear |
| `submit-wrapper` | Button wrapper | Submit/Next button container |
| `submit-button` | Button div | Submit / Next action |
| `previous-button` | Button div | Previous / Back action |
| `textarea-wrapper` | Textarea wrapper | Comment input container |
| `thanks` | Thank you container | Thank you page wrapper |
| `thanks-image` | Image div | Thank you illustration |
| `centered-text` | Text div | Centered thank you message |
| `surveys-widget-preview-default-logo` | Logo div | Default Countly logo container |
| `powered-by-countly` | Branding div | "Powered by Countly" text |

---

## 10. Implementation Notes

### 10.1 Step ID Conventions

Steps use a combination of component instance ID and step index:
- Container: `id="cly-cmp-{instanceId}-step{N}"` (e.g., `cly-cmp-3625-step1`, `cly-cmp-3625-step2`)
- Sidecar: `id="cly-cmp-{instanceId}-mainSidecar"` (e.g., `cly-cmp-3620-mainSidecar`)
- These IDs are dynamically generated by Vue and will differ between instances.

### 10.2 data-test-id Naming Convention

Pattern: `{plugin}-drawer-{step/section}-{field}-{element-type}`

Examples:
- `nps-drawer-settings-survey-name-label` → plugin=nps, step=settings, field=survey-name, element=label
- `nps-drawer-customization-visibility-dropdown-select-input` → plugin=nps, step=customization, field=visibility-dropdown-select, element=input
- `nps-drawer-default-el-radio-button` → plugin=nps, section=default (logo), element=el-radio-button

**Note on typo**: Several test IDs use `servey-` (typo of "survey-") — this is present in production and must be matched exactly:
- `servey-widget-section-top-center-horizantal-line-top-question-1-line-1`
- `servey-widget-section-top-center-horizantal-line-grey-question-1-line-1`
- `servey-widget-section-top-center-horizantal-line-top-question-2-line-1`
- `servey-widget-section-top-center-horizantal-line-top-question-2-line-2`
- Note also: "horizantal" is a typo of "horizontal" — preserved as-is.

### 10.3 ARIA Attributes

- Radio inputs use `aria-hidden="true"` and `tabindex="-1"` (native inputs hidden, custom visuals handle accessibility).
- Checkbox inputs use same pattern.
- Tooltip icons use `data-original-title` attribute for tooltip content.
- `el-select` input uses `readonly="readonly"` to prevent keyboard input.
- `el-select` input uses custom `min-width="-1"` and `max-width="-1"` attributes (Element UI internal sizing).

### 10.4 Vue Component Markers

- Vue conditional rendering produces empty HTML comments: `<!---->` throughout the DOM. These are `v-if`/`v-show` placeholder markers.
- The `cly-vue-content` class is a generic Vue slot wrapper used throughout.

### 10.5 Placeholders

| Field | Placeholder |
|---|---|
| Survey internal name input | `"Enter a survey internal name"` |
| Main question input | `"Enter a survey name"` |
| Visibility select | `"Select"` |
| Follow-up textarea (preview) | `"Enter your comment"` |

### 10.6 Complete data-test-id Master List

All `data-test-id` attributes found in the NPS drawer (in DOM order):

**Preview Sidecar (Main Question)**:
1. `nps-drawer-preview-popup-main-question-label`
2. `servey-widget-section-top-center-horizantal-line-top-question-1-line-1`
3. `servey-widget-section-top-center-horizantal-line-grey-question-1-line-1`
4. `main-question-popup-close-button`
5. `nps-preview-main-question-popup-title-label`
6. `nps-preview-main-question-select-one-label`
7. `surveys-widget-preview-popup-main-question-radio-button-0`
8. `surveys-widget-preview-popup-main-question-radio-button-1`
9. `surveys-widget-preview-popup-main-question-radio-button-2`
10. `surveys-widget-preview-popup-main-question-radio-button-3`
11. `surveys-widget-preview-popup-main-question-radio-button-4`
12. `surveys-widget-preview-popup-main-question-radio-button-5`
13. `surveys-widget-preview-popup-main-question-radio-button-6`
14. `surveys-widget-preview-popup-main-question-radio-button-7`
15. `surveys-widget-preview-popup-main-question-radio-button-8`
16. `surveys-widget-preview-popup-main-question-radio-button-9`
17. `surveys-widget-preview-popup-main-question-radio-button-10`
18. `surveys-widget-preview-rating-not-likely-label`
19. `surveys-widget-preview-rating-likely-label`
20. `nps-drawer-customization-next-button`
21. `surveys-widget-preview-default-logo` *(first instance)*

**Preview Sidecar (Follow-Ups)**:
22. `nps-drawer-preview-popup-follow-ups-label`
23. `servey-widget-section-top-center-horizantal-line-top-question-2-line-1`
24. `servey-widget-section-top-center-horizantal-line-top-question-2-line-2`
25. `follow-ups-popup-close-button`
26. `nps-preview-follow-ups-popup-title-label`
27. `nps-preview-follow-ups-popup-comment-textarea-wrapper`
28. `nps-preview-follow-ups-popup-comment-textarea`
29. `nps-drawer-customization-submit-button`
30. `nps-drawer-customization-previous-button`
31. `surveys-widget-preview-default-logo` *(second instance)*

**Preview Sidecar (Thank You)**:
32. `nps-drawer-preview-popup-thank-you-page-label`
33. `thanks-message-popup-close-button`
34. `nps-preview-thanks-image`
35. `nps-preview-thanks-message-popup-centered-text-label`
36. `surveys-widget-preview-default-logo` *(third instance)*

**Drawer Header**:
37. `nps-drawer-header-title`

**Step Navigation**:
38. `nps-drawer-step-sign-container` *(Step 1)*
39. `nps-drawer-step-sign` *(Step 1)*
40. `nps-drawer-current-step-index-1`
41. `nps-drawer-current-step-index-img-container1`
42. `nps-drawer-step-1` *(img)*
43. `nps-drawer-settings-label`
44. `nps-drawer-seperator-1` *(note: typo "seperator" vs "separator")*
45. `nps-drawer-step-sign-container` *(Step 2)*
46. `nps-drawer-step-sign` *(Step 2)*
47. `nps-drawer-current-step-index-2`
48. `nps-drawer-current-step-index-img-container2`
49. `nps-drawer-step-2` *(img)*

**Step 1 — Settings**:
50. `nps-drawer-settings-survey-name-label`
51. `nps-drawer-settings-survey-name-input`
52. `nps-drawer-settings-main-question-label`
53. `nps-drawer-settings-main-question-input`
54. `nps-drawer-follow-up-question-1-el-radio` *(and wrapper, button, label variants)*
55. `nps-drawer-follow-up-question-2-el-radio-label`
56. `nps-drawer-settings-follow-up-question-for-promoter-label`
57. `nps-drawer-settings-follow-up-question-for-promoter-input`
58. `nps-drawer-settings-follow-up-question-for-passive-label`
59. `nps-drawer-settings-follow-up-question-for-passive-input`
60. `nps-drawer-settings-follow-up-question-for-detractor-label`
61. `nps-drawer-settings-follow-up-question-for-detractor-input`
62. `nps-drawer-settings-add-user-consent-el-checkbox-input`
63. `nps-drawer-settings-add-user-consent-el-checkbox-button`
64. `nps-drawer-settings-add-user-consent-el-checkbox-label`
65. `nps-drawer-settings-thanks-label`
66. `nps-drawer-settings-thanks-input`

**Step 2 — Customization**:
67. `nps-drawer-customization-visibility-label`
68. `nps-drawer-customization-visibility-tooltip`
69. `nps-drawer-customization-visibility-dropdown-select-input`
70. `nps-drawer-customization-visibility-dropdown-select-icon`
71. `option-until-they-submit-a-score-el-options`
72. `option-until-user-closes-or-submits-the-widget-el-options`
73. `option-always-visible-el-options`
74. `nps-drawer-customization-widget-main-color-label`
75. `nps-drawer-customization-main-color-dropdown`
76. `nps-drawer-customization-main-color-dropdown-cly-color-picker-img-wrapper`
77. `nps-drawer-customization-logo-label`
78. `nps-drawer-customization-logo-tooltip`
79. `nps-drawer-default-el-radio-wrapper`
80. `nps-drawer-default-el-radio`
81. `nps-drawer-default-el-radio-button`
82. `nps-drawer-default-el-radio-label`
83. `nps-drawer-custom-el-radio-wrapper`
84. `nps-drawer-custom-el-radio`
85. `nps-drawer-custom-el-radio-button`
86. `nps-drawer-custom-el-radio-label`
87. `nps-drawer-none-el-radio-wrapper`
88. `nps-drawer-none-el-radio`
89. `nps-drawer-none-el-radio-button`
90. `nps-drawer-none-el-radio-label`
91. `nps-drawer-customization-submit-button-text-label`
92. `nps-drawer-customization-submit-button-text-input`
93. `nps-drawer-customization-next-button-text-input`
94. `nps-drawer-customization-placeholder-follow-up-label`
95. `nps-drawer-customization-previous-button-text-input`

### 10.7 Known Typos in Production (Must Match Exactly)

| Typo | Correct | Location |
|---|---|---|
| `servey-` | `survey-` | Multiple data-test-ids in preview sidecar |
| `horizantal` | `horizontal` | data-test-ids for horizontal line elements |
| `seperator` | `separator` | `nps-drawer-seperator-1` |

### 10.8 Shared Components with Surveys Plugin

The NPS drawer shares significant structure and CSS with the generic Surveys plugin:
- Widget preview classes (`survey-widget-v2`, `section-*`, `rating-button`)
- Logo component (`surveys-widget-preview-default-logo`, `powered-by-countly`)
- Drawer CSS (`cly-vue-surveys-drawer--*` prefix)
- Rating button IDs use `q_1_N` format (same as Surveys question format)

### 10.9 Framework & Libraries

- **Frontend framework**: Vue 2 (inferred from comment-based conditional rendering `<!---->`)
- **Component library**: Element UI (all `el-*` prefixed components)
- **CSS utilities**: Bulma (all `bu-*` prefixed utility classes)
- **Icons**: Ionicons 2.x (`ion-ios-close-empty`, `ion-help-circled`, `ion-arrow-up-b`)
- **Positioning**: Popper.js (`el-popper` class on dropdown panel)
- **Drawer base**: `cly-vue-drawer` — Countly's proprietary Vue drawer component

### 10.10 Scroll Behavior

The drawer body uses `scroll-shadow-container` class to implement a scroll-shadow effect on the step content area, indicating scrollable overflow content within each step.
