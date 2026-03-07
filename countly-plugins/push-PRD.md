# PRD: Push Notifications Drawer — Create One-Time Push Notification

**Plugin:** Push Notifications
**Drawer Type:** `cly-vue-drawer` — multi-step wizard
**URL:** `http://mert.count.ly/dashboard#/6908ab02fece9ef06eca7285/messaging`
**Steps:** 4 — Info & Targeting → Delivery → Push Content → Review
**Date:** 2026-02-27

---

## 1. Scope & Context

### 1.1 Purpose

The Push Notifications drawer enables operators to compose and schedule one-time push notification campaigns targeting mobile users (Android and/or iOS). It is a guided 4-step wizard that collects: notification metadata, platform selection, audience targeting, delivery timing, message content (with emoji/variable support and localization), and then presents a review summary before creation.

### 1.2 Trigger

Opened from the Messaging plugin page (`/messaging`) via a "Create" or "+" action. The drawer overlays the main page as a half-screen panel anchored to the right.

### 1.3 Scope Boundaries

- **In scope:** One-time push notification creation (not recurring/automated campaigns).
- **Out of scope:** In-app messages, email campaigns, recurring automation, campaign editing (edit reuses the same drawer with pre-filled data).

### 1.4 Related Components

- `cly-vue-drawer` (shared drawer framework)
- `cly-vue-push-notification-drawer` (plugin-specific drawer)
- Element UI (`el-input`, `el-checkbox`, `el-radio`, `el-button`, `el-select`)
- Countly custom: `cly-vue-push-notification-large-radio-button-with-description`
- Countly tooltip: `cly-vue-tooltip-icon`

---

## 2. Component Hierarchy

```
cly-vue-drawer
  ├── cly-vue-drawer__sidecars-view           ← sidecar panel (preview)
  │   └── cly-vue-content
  │       └── [device preview / empty]
  └── cly-vue-drawer__steps-view
      └── cly-vue-drawer__steps-wrapper
          ├── cly-vue-drawer__header
          │   ├── cly-vue-drawer__title
          │   │   ├── cly-vue-drawer__title-container
          │   │   │   ├── h3.cly-vue-drawer__title-header   ← "Create One-Time Push Notification"
          │   │   │   └── cly-vue-drawer__close-button       ← ✕ close
          │   │   └── cly-vue-drawer__subtitle
          │   │       └── cly-vue-drawer__steps-header       ← step indicator strip
          │   │           ├── step-label[1] — Info & Targeting
          │   │           ├── step-separator[0]
          │   │           ├── step-label[2] — Delivery
          │   │           ├── step-separator[1]
          │   │           ├── step-label[3] — Push Content
          │   │           ├── step-separator[2]
          │   │           └── step-label[4] — Review
          ├── cly-vue-drawer__steps-container.is-multi-step
          │   ├── scroll-shadow-container
          │   └── cly-vue-drawer__body-container             ← scrollable content area
          │       ├── [Step 1] Info & Targeting content
          │       ├── [Step 2] Delivery content
          │       ├── [Step 3] Push Content content
          │       └── [Step 4] Review content
          └── cly-vue-drawer__footer
              ├── cly-vue-drawer__controls-left-pc
              └── cly-vue-drawer__buttons.is-multi-step
                  ├── el-button (Cancel / Back)
                  └── el-button (Next / Create)
```

---

## 3. HTML Structure & Class Names

### 3.1 Drawer Root

```html
<div class="cly-vue-drawer cly-vue-push-notification-drawer is-mounted is-open has-sidecars cly-vue-drawer--half-screen cly-vue-drawer--half-screen-6">
```

| Class | Description |
|---|---|
| `cly-vue-drawer` | Base drawer component |
| `cly-vue-push-notification-drawer` | Plugin-specific extension |
| `is-mounted` | Vue component lifecycle: mounted |
| `is-open` | Drawer visible state |
| `has-sidecars` | Indicates sidecar panel (preview) is present |
| `cly-vue-drawer--half-screen` | Half-screen layout variant |
| `cly-vue-drawer--half-screen-6` | Width modifier (Bulma column width = 6/12 = 50%) |

### 3.2 Header

```html
<div class="cly-vue-drawer__title-container bu-is-flex bu-is-justify-content-space-between bu-is-align-items-center">
  <h3 class="cly-vue-drawer__title-header" data-test-id="drawer-test-id-header-title">
    Create One-Time Push Notification
  </h3>
  <div class="cly-vue-drawer__close-button" data-test-id="drawer-test-id-close-button">
    <i class="ion-ios-close-empty"></i>
  </div>
</div>
```

### 3.3 Step Indicator Strip

```html
<div class="cly-vue-drawer__steps-header" data-test-id="drawer-test-id-steps-header-container">
  <!-- Step 1 -->
  <div class="cly-vue-drawer__step-label is-active" data-test-id="drawer-test-id-step-1-label">
    <div class="cly-vue-drawer__step-sign" data-test-id="drawer-test-id-step-sign">
      <span class="index text-small color-white" data-test-id="drawer-test-id-current-step-index-1">1</span>
      <span class="done-icon text-small color-white bu-pt-0" data-test-id="drawer-test-id-current-step-index-img-container1">
        <img data-test-id="drawer-test-id-step-1">
      </span>
    </div>
    <div class="cly-vue-drawer__step-title text-small font-weight-bold color-cool-gray-40"
         data-test-id="drawer-test-id-info-targeting-label">Info &amp; Targeting</div>
  </div>
  <div class="cly-vue-drawer__step-separator" data-test-id="drawer-test-id-seperator-0"></div>
  <!-- Step 2 (same structure, is-locked) -->
  <!-- Step 3 (same structure, is-locked) -->
  <!-- Step 4 (same structure, is-locked) -->
</div>
```

### 3.4 Body Container

```html
<div class="cly-vue-drawer__steps-container is-multi-step">
  <div class="scroll-shadow-container"></div>
  <div class="bu-columns bu-is-gapless bu-is-mobile cly-vue-drawer__body-container bu-pb-5 bu-pt-4 bu-mb-2 bu-mt-1">
    <div class="bu-column bu-is-12">
      <div class="cly-vue-content">
        <!-- Step content rendered here -->
      </div>
    </div>
  </div>
</div>
```

### 3.5 Footer

```html
<div class="cly-vue-drawer__footer">
  <div class="cly-vue-drawer__controls-left-pc"></div>
  <div class="cly-vue-drawer__buttons is-multi-step bu-is-justify-content-flex-end bu-is-flex">
    <button class="el-button el-button--secondary el-button--small" data-test-id="drawer-test-id-cancel-button">
      <span>Cancel</span>
    </button>
    <button class="el-button el-button--success el-button--small" data-test-id="drawer-test-id-next-button">
      <span>Next</span>
    </button>
  </div>
</div>
```

---

## 4. Design Tokens

### 4.1 Color Utilities (Bulma + Countly)

| Class | Usage |
|---|---|
| `color-white` | Step index number text, done icon |
| `color-cool-gray-40` | Step label titles |
| `bu-is-flex` | Flexbox row |
| `bu-is-flex-wrap-wrap` | Wrapping flex (radio group) |
| `bu-is-justify-content-space-between` | Header title/close layout |
| `bu-is-align-items-center` | Vertical centering in header |
| `bu-is-justify-content-flex-end` | Footer buttons right-aligned |
| `bu-level` | Horizontal layout for radio cards |
| `bu-level-item` | Individual radio card in level |

### 4.2 Typography Utilities

| Class | Usage |
|---|---|
| `text-small` | Step index numbers, step titles |
| `text-medium` | Section sub-headers |
| `font-weight-bold` | Step labels, radio group headers |
| `font-weight-normal` | Radio card description text |

### 4.3 Spacing Utilities

| Class | Value | Context |
|---|---|---|
| `bu-pb-5` | padding-bottom | Body container |
| `bu-pt-4` | padding-top | Body container |
| `bu-mb-2` | margin-bottom | Body container |
| `bu-mt-1` | margin-top | Body container |
| `bu-py-1` | padding-y | Section label/header |
| `bu-my-1` | margin-y | Section label/header |
| `bu-pr-1` | padding-right | Radio card container |
| `bu-ml-5` | margin-left | Radio card description indent |
| `bu-mt-2` | margin-top | Radio card title/content |
| `bu-pt-0` | padding-top | Done icon span |

### 4.4 Element States

| Class | Description |
|---|---|
| `is-active` | Current step in indicator strip |
| `is-locked` | Future/inaccessible step |
| `is-done` | Completed step (implied, via done-icon visibility) |
| `is-checked` | Selected radio or checkbox state |
| `is-bordered` | Radio button card border styling |
| `is-mounted` | Vue mounted lifecycle flag |
| `is-open` | Drawer visibility flag |
| `has-sidecars` | Sidecar panel presence flag |
| `is-multi-step` | Wizard mode for buttons/container |
| `is-single-step` | Single-step mode (not applicable here) |

---

## 5. Form Fields (Per Step)

### Step 1 — Info & Targeting

#### 5.1.1 Notification Name

| Attribute | Value |
|---|---|
| Label | "Notification Name" |
| Description | "Set the name of push notification (optional)." |
| Component | `el-input` |
| Input type | `text` |
| Placeholder | `Enter Notification Name` |
| Required | No (optional) |
| `data-test-id` | `input-test-id` |
| Container class | `cly-vue-push-notification-drawer__section` |
| Label class | `cly-vue-push-notification-drawer__input-label` |
| Description class | `cly-vue-push-notification-drawer__input-description` |

```html
<div class="cly-vue-push-notification-drawer__section">
  <div class="bu-py-1 bu-my-1 cly-vue-push-notification-drawer__input-label">Notification Name</div>
  <div class="cly-vue-push-notification-drawer__input-description">Set the name of push notification (optional).</div>
  <span><form>
    <div class="el-input">
      <input class="el-input__inner" data-test-id="input-test-id" type="text" placeholder="Enter Notification Name">
    </div>
  </form></span>
</div>
```

#### 5.1.2 Platforms

| Attribute | Value |
|---|---|
| Label | "Platforms" |
| Component | `el-checkbox-group` |
| Options | Android, iOS |
| Selection | Multi-select (both can be checked) |
| Container class | `cly-vue-push-notification-drawer__section` |
| Header class | `cly-vue-push-notification-drawer__checkbox-group-header` |
| ARIA role | `group` |

```html
<div class="cly-vue-push-notification-drawer__section">
  <div class="bu-py-1 bu-my-1 cly-vue-push-notification-drawer__checkbox-group-header">Platforms</div>
  <div class="el-checkbox-group" role="group">
    <label class="el-checkbox" type="checkbox">
      <span class="el-checkbox__input" data-test-id="el-checkbox-test-id-el-checkbox-input">
        <span class="el-checkbox__inner"></span>
        <input class="el-checkbox__original" data-test-id="el-checkbox-test-id-el-checkbox-button" type="checkbox">
      </span>
      <span class="el-checkbox__label" data-test-id="el-checkbox-test-id-el-checkbox-label"> Android </span>
    </label>
    <label class="el-checkbox" type="checkbox">
      <!-- same structure -->
      <span class="el-checkbox__label" data-test-id="el-checkbox-test-id-el-checkbox-label"> iOS </span>
    </label>
  </div>
</div>
```

#### 5.1.3 Targeting

| Attribute | Value |
|---|---|
| Label | "Targeting" (with tooltip) |
| Component | `el-radio` group — large card variant |
| Options | "All push-enabled users", "Segmented users" |
| Default | "All push-enabled users" (pre-selected) |
| Container class | `cly-vue-drawer-step__section` |
| Header class | `cly-vue-push-notification-drawer__radio-group-header` |
| Tooltip icon | `cly-vue-tooltip-icon ion ion-help-circled has-tooltip` |

**Option A — All push-enabled users:**

| Attribute | Value |
|---|---|
| Value | All push-enabled users |
| Description | Determine users right before sending the message |
| State | `is-checked` (default selected) |
| Card class | `cly-vue-push-notification-large-radio-button-with-description__button is-bordered is-checked` |

**Option B — Segmented users:**

| Attribute | Value |
|---|---|
| Value | Segmented users |
| Description | Filter users by conditions/cohorts |
| State | Unchecked by default |
| Conditional content | Reveals filter/drill UI when selected |

```html
<div class="cly-vue-drawer-step__section">
  <div class="bu-py-1 bu-my-1 cly-vue-push-notification-drawer__radio-group-header">
    Targeting
    <i class="cly-vue-tooltip-icon ion ion-help-circled has-tooltip"></i>
  </div>
  <div class="bu-level bu-is-flex-wrap-wrap">
    <div class="bu-level-item cly-vue-push-notification-large-radio-button-with-description__container bu-pr-1">
      <label class="el-radio cly-vue-push-notification-large-radio-button-with-description__button is-bordered is-checked"
             data-test-id="el-radio-test-id-el-radio-wrapper" role="radio">
        <span class="el-radio__input is-checked" data-test-id="el-radio-test-id-el-radio">
          <span class="el-radio__inner"></span>
          <input class="el-radio__original" data-test-id="el-radio-test-id-el-radio-button" type="radio">
        </span>
        <span class="el-radio__label" data-test-id="el-radio-test-id-el-radio-label">
          <div class="cly-vue-push-notification-large-radio-button-with-description__title bu-mt-2">All push-enabled users</div>
          <div class="cly-vue-push-notification-large-radio-button-with-description__content bu-level bu-ml-5 bu-mt-2 font-weight-normal">
            Determine users right before sending the message
          </div>
        </span>
      </label>
    </div>
    <!-- Option B: Segmented users — same structure, not is-checked -->
  </div>
</div>
```

---

### Step 2 — Delivery

#### 5.2.1 Delivery Timing

| Attribute | Value |
|---|---|
| Label | "Delivery" (with tooltip) |
| Component | `el-radio` group — large card variant |
| Options | "Send now", "Schedule" |
| Default | "Send now" |
| Container class | `cly-vue-drawer-step__section` |
| Header class | `cly-vue-push-notification-drawer__radio-group-header text-medium font-weight-bold` |
| Tooltip icon | `cly-vue-tooltip-icon ion ion-help-circled has-tooltip` |

**Option A — Send now:**

| Attribute | Value |
|---|---|
| Title | "Send now" |
| Description | "Send the push notification immediately" |
| Card title class | `cly-vue-push-notification-large-radio-button-with-description__title bu-mt-2` |
| Card content class | `cly-vue-push-notification-large-radio-button-with-description__content bu-level bu-ml-5 bu-mt-2 font-weight-normal` |

**Option B — Schedule:**

| Attribute | Value |
|---|---|
| Title | "Schedule" |
| Description | "Schedule delivery for a specific date and time" |
| Conditional content | Reveals date/time picker when selected |

```html
<div class="cly-vue-drawer-step__section">
  <div class="bu-py-1 bu-my-1 cly-vue-push-notification-drawer__radio-group-header text-medium font-weight-bold">
    Delivery
    <i class="cly-vue-tooltip-icon ion ion-help-circled has-tooltip"></i>
  </div>
  <div class="bu-level bu-is-flex-wrap-wrap">
    <!-- Send now card -->
    <div class="bu-level-item cly-vue-push-notification-large-radio-button-with-description__container bu-pr-1">
      <label class="el-radio cly-vue-push-notification-large-radio-button-with-description__button is-bordered">
        ...
        <div class="cly-vue-push-notification-large-radio-button-with-description__title bu-mt-2">Send now</div>
        <div class="cly-vue-push-notification-large-radio-button-with-description__content bu-level bu-ml-5 bu-mt-2 font-weight-normal">
          Send the push notification immediately...
        </div>
      </label>
    </div>
    <!-- Schedule card — same structure -->
  </div>
</div>
```

---

### Step 3 — Push Content

#### 5.3.1 Message Title

| Attribute | Value |
|---|---|
| Label | "Title" |
| Component | `el-input` |
| Input type | `text` |
| Placeholder | `Enter notification title` |
| Required | Yes |
| Features | Emoji picker, variable insertion |

#### 5.3.2 Message Body

| Attribute | Value |
|---|---|
| Label | "Message" |
| Component | `el-input` (textarea variant) |
| Input type | `textarea` |
| Placeholder | `Enter notification message` |
| Required | Yes |
| Features | Emoji picker, variable insertion |
| Max length | Platform-dependent |

#### 5.3.3 Localization / Language

| Attribute | Value |
|---|---|
| Label | "Languages" or "Add Language" |
| Component | `el-select` or tab-based language switcher |
| Default | Default language |
| Feature | Multiple language variants for title/body |

#### 5.3.4 Media / Image URL (Optional)

| Attribute | Value |
|---|---|
| Label | "Image URL" |
| Component | `el-input` |
| Input type | `text` |
| Placeholder | `https://...` |
| Required | No |

---

### Step 4 — Review

The Review step is a read-only summary panel displaying all configured values:

| Field | Source |
|---|---|
| Notification Name | Step 1 input |
| Platforms | Step 1 checkboxes (Android / iOS) |
| Targeting | Step 1 radio (All users / Segmented) |
| Delivery | Step 2 radio (Send now / Scheduled time) |
| Message Title | Step 3 title input |
| Message Body | Step 3 body input |
| Language(s) | Step 3 language selection |
| Media | Step 3 image URL (if provided) |

No interactive inputs on this step. "Create" button submits the form.

---

## 6. State Transitions

### 6.1 Step Indicator States

| State | Class | Description |
|---|---|---|
| Active (current) | `is-active` | Current step being filled |
| Locked (future) | `is-locked` | Not yet reachable; index shown in gray |
| Done (completed) | `is-done` (implied) | Past step; checkmark icon shown via `.done-icon img` |

**Step sign rendering logic:**

- `.index span` — visible when step is active or locked (shows number)
- `.done-icon span` — visible when step is completed (shows checkmark image)
- Both spans exist in DOM; CSS controls visibility via step state class

### 6.2 Step Label Modifier Classes

```
.cly-vue-drawer__step-label
  .is-active   → current step
  .is-locked   → future steps
  (no modifier) → completed steps
```

### 6.3 Footer Button Transitions

| Step | Left Button | Right Button |
|---|---|---|
| Step 1 | Cancel (`drawer-test-id-cancel-button`) | Next |
| Step 2 | Back | Next |
| Step 3 | Back | Next |
| Step 4 | Back | Create (`el-button--success`) |

Button classes:

```html
<!-- Secondary/Cancel/Back -->
<button class="el-button el-button--secondary el-button--small" data-test-id="drawer-test-id-cancel-button">

<!-- Primary/Next/Create -->
<button class="el-button el-button--success el-button--small" data-test-id="drawer-test-id-next-button">
<!-- or on final step -->
<button class="el-button el-button--success el-button--small" data-test-id="drawer-test-id-save-button">
```

### 6.4 Conditional Field Visibility

| Trigger | Reveals |
|---|---|
| Targeting = "Segmented users" | Segment filter/conditions UI |
| Delivery = "Schedule" | Date & time picker |
| Language tab added | Additional title/body inputs for that locale |

### 6.5 Radio Card States

```html
<!-- Unchecked -->
<label class="el-radio cly-vue-push-notification-large-radio-button-with-description__button is-bordered">

<!-- Checked -->
<label class="el-radio cly-vue-push-notification-large-radio-button-with-description__button is-bordered is-checked">
```

---

## 7. Element UI Components

### 7.1 `el-input`

Used for: Notification Name, message title, message body (textarea), image URL.

```html
<div class="el-input">
  <input class="el-input__inner" type="text" placeholder="...">
</div>
```

Textarea variant (message body):
```html
<div class="el-input el-textarea">
  <textarea class="el-textarea__inner" placeholder="..."></textarea>
</div>
```

### 7.2 `el-checkbox` / `el-checkbox-group`

Used for: Platform selection (Android / iOS).

```html
<div class="el-checkbox-group" role="group">
  <label class="el-checkbox" type="checkbox">
    <span class="el-checkbox__input [is-checked]">
      <span class="el-checkbox__inner"></span>
      <input class="el-checkbox__original" type="checkbox">
    </span>
    <span class="el-checkbox__label"> Android </span>
  </label>
</div>
```

States:
- Default: `el-checkbox__input`
- Checked: `el-checkbox__input is-checked`
- Indeterminate: `el-checkbox__input is-indeterminate`

### 7.3 `el-radio`

Used for: Targeting type, Delivery timing. Wrapped in large card variant.

```html
<label class="el-radio [is-bordered] [is-checked]" role="radio">
  <span class="el-radio__input [is-checked]">
    <span class="el-radio__inner"></span>
    <input class="el-radio__original" type="radio">
  </span>
  <span class="el-radio__label">...</span>
</label>
```

### 7.4 `el-button`

```html
<!-- Secondary -->
<button class="el-button el-button--secondary el-button--small">

<!-- Success/Primary -->
<button class="el-button el-button--success el-button--small">
```

### 7.5 `el-select`

Used in: Language selector, Schedule timezone picker.

```html
<div class="el-select">
  <div class="el-input el-input--suffix">
    <input class="el-input__inner" type="text" readonly autocomplete="chrome-off" placeholder="Select">
    <span class="el-input__suffix">
      <span class="el-input__suffix-inner">
        <i class="el-select__caret ion-arrow-up-b"></i>
      </span>
    </span>
  </div>
  <div class="el-select-dropdown el-popper">
    <div class="el-scrollbar">
      <ul class="el-select-dropdown__list">
        <li class="el-select-dropdown__item">...</li>
      </ul>
    </div>
  </div>
</div>
```

---

## 8. Countly Custom Components

### 8.1 `cly-vue-push-notification-large-radio-button-with-description`

A custom Countly component that renders a large bordered radio card with a title and descriptive text below. Used in both Targeting and Delivery sections.

**BEM structure:**

```
cly-vue-push-notification-large-radio-button-with-description
  __container     ← bu-level-item wrapper
  __button        ← el-radio root (is-bordered, is-checked modifiers)
  __title         ← bu-mt-2 title text inside el-radio__label
  __content       ← bu-level bu-ml-5 bu-mt-2 font-weight-normal description
```

Full class path:
```html
<div class="bu-level-item cly-vue-push-notification-large-radio-button-with-description__container bu-pr-1">
  <label class="el-radio cly-vue-push-notification-large-radio-button-with-description__button is-bordered [is-checked]">
    ...
    <span class="el-radio__label">
      <div class="cly-vue-push-notification-large-radio-button-with-description__title bu-mt-2">
        Title text
      </div>
      <div class="cly-vue-push-notification-large-radio-button-with-description__content bu-level bu-ml-5 bu-mt-2 font-weight-normal">
        Description text
      </div>
    </span>
  </label>
</div>
```

### 8.2 `cly-vue-tooltip-icon`

Inline help icon shown next to section labels. Uses Ionicons.

```html
<i class="cly-vue-tooltip-icon ion ion-help-circled has-tooltip"></i>
```

Appears next to: "Targeting", "Delivery" section headers.

### 8.3 `cly-vue-drawer-step__section`

Section wrapper for steps 2+. Distinct from step 1's `cly-vue-push-notification-drawer__section`.

```html
<div class="cly-vue-drawer-step__section">
  <!-- section header + controls -->
</div>
```

### 8.4 `cly-vue-push-notification-drawer` (Class Extensions)

Plugin-specific BEM classes on the drawer root:

| Class | Usage |
|---|---|
| `cly-vue-push-notification-drawer__section` | Step 1 content sections |
| `cly-vue-push-notification-drawer__input-label` | "Notification Name" label |
| `cly-vue-push-notification-drawer__input-description` | Description text below label |
| `cly-vue-push-notification-drawer__checkbox-group-header` | "Platforms" section header |
| `cly-vue-push-notification-drawer__radio-group-header` | "Targeting" / "Delivery" section headers |

### 8.5 Sidecar (Preview Panel)

The drawer uses `has-sidecars` mode, which activates a sidecar panel on the left:

```html
<div class="cly-vue-drawer__sidecars-view">
  <div class="cly-vue-content">
    <!-- Device/notification preview renders here, conditionally -->
  </div>
</div>
```

Sidecar is empty in the initial HTML snapshot (Step 1) — preview likely renders when push content (Step 3) is being composed.

---

## 9. Multi-Step Wizard

### 9.1 Step Configuration

| Step | Index | `data-test-id` Label | Description |
|---|---|---|---|
| 1 | 1 | `drawer-test-id-info-targeting-label` | "Info & Targeting" |
| 2 | 2 | `drawer-test-id-delivery-label` | "Delivery" |
| 3 | 3 | `drawer-test-id-push-content-label` | "Push Content" |
| 4 | 4 | `drawer-test-id-review-label` | "Review" |

### 9.2 Step Separator

```html
<div class="cly-vue-drawer__step-separator" data-test-id="drawer-test-id-seperator-{n}"></div>
```

3 separators between 4 steps: `seperator-0`, `seperator-1`, `seperator-2`.

Note: the `data-test-id` uses "seperator" (single 'a') — this is a typo in the existing codebase and must be reproduced exactly.

### 9.3 Step Sign Anatomy

```html
<div class="cly-vue-drawer__step-sign" data-test-id="drawer-test-id-step-sign">
  <!-- Number shown on active/locked steps -->
  <span class="index text-small [color-white]" data-test-id="drawer-test-id-current-step-index-{n}">
    {n}
  </span>
  <!-- Checkmark shown on completed steps -->
  <span class="done-icon text-small color-white bu-pt-0" data-test-id="drawer-test-id-current-step-index-img-container{n}">
    <img data-test-id="drawer-test-id-step-{n}">
  </span>
</div>
```

- Active step index: `color-white` applied
- Locked step index: `color-white` NOT applied (gray appearance)
- Done step: `.index` hidden, `.done-icon` shown

### 9.4 Wizard Navigation Rules

1. Steps are sequential — user cannot skip forward.
2. Steps can be navigated backward (Back button returns to previous).
3. Step N is locked until step N-1 is completed and valid.
4. Validation occurs on "Next" — errors shown inline if required fields are missing.
5. Step 1 requires at least one platform selected (Android or iOS).
6. "Create" on Step 4 submits the API request and closes the drawer on success.

### 9.5 Scroll Shadow

```html
<div class="scroll-shadow-container"></div>
```

Positioned at top of body container. Displays shadow when content scrolls below the header. State class `is-scroll-shadow-at-top` on `.cly-vue-drawer__steps-container` may control this.

---

## 10. Implementation Notes

### 10.1 Test ID Index (data-test-id)

#### Drawer Framework

| `data-test-id` | Element |
|---|---|
| `drawer-test-id-header-title` | `h3` — drawer title |
| `drawer-test-id-close-button` | Close button |
| `drawer-test-id-steps-header-container` | Steps indicator strip root |
| `drawer-test-id-step-1-label` | Step 1 label container |
| `drawer-test-id-step-2-label` | Step 2 label container |
| `drawer-test-id-step-3-label` | Step 3 label container |
| `drawer-test-id-step-4-label` | Step 4 label container |
| `drawer-test-id-step-sign` | Step circle sign |
| `drawer-test-id-step-sign-container` | `bu-is-flex` wrapper |
| `drawer-test-id-current-step-index-{n}` | Index span (1–4) |
| `drawer-test-id-current-step-index-img-container{n}` | Done icon span (1–4) |
| `drawer-test-id-step-{n}` | Done checkmark `img` (1–4) |
| `drawer-test-id-seperator-{n}` | Step separators (0–2) |
| `drawer-test-id-info-targeting-label` | Step 1 title |
| `drawer-test-id-delivery-label` | Step 2 title |
| `drawer-test-id-push-content-label` | Step 3 title |
| `drawer-test-id-review-label` | Step 4 title |
| `drawer-test-id-cancel-button` | Cancel/Back button |
| `drawer-test-id-next-button` | Next button |
| `drawer-test-id-save-button` | Create button (Step 4) |

#### Step 1 Fields

| `data-test-id` | Element |
|---|---|
| `input-test-id` | Notification name `input` |
| `el-checkbox-test-id-el-checkbox-input` | Checkbox `span.el-checkbox__input` |
| `el-checkbox-test-id-el-checkbox-button` | Checkbox `input[type=checkbox]` |
| `el-checkbox-test-id-el-checkbox-label` | Checkbox label text |
| `el-radio-test-id-el-radio-wrapper` | Targeting radio `label` |
| `el-radio-test-id-el-radio` | Targeting radio `span.el-radio__input` |
| `el-radio-test-id-el-radio-button` | Targeting radio `input[type=radio]` |
| `el-radio-test-id-el-radio-label` | Targeting radio label text |

### 10.2 Drawer Mode Flags

| Flag | Description |
|---|---|
| `cly-vue-drawer--half-screen` | 50% viewport width, right-aligned |
| `cly-vue-drawer--half-screen-6` | Bulma 6-column grid width |
| `has-sidecars` | Left sidecar (preview) panel enabled |
| `is-multi-step` | Multi-step wizard mode (affects footer and container) |
| `is-mounted` | Vue component mounted lifecycle |
| `is-open` | Drawer is visible |

### 10.3 Form Submission

- The form wraps content in `<form>` elements rendered via `cly-vue-content > span > form`.
- Multiple `<form>` elements exist — one per section or field group.
- Submit is handled by Vue component logic, not native form submission.
- API endpoint: `POST /o/push` or similar Countly messaging API.

### 10.4 Sidecar Architecture

The drawer uses the `has-sidecars` split layout:

```
[ sidecar (left) ][ steps-view (right) ]
```

- `cly-vue-drawer__sidecars-view` — left panel for device preview
- `cly-vue-drawer__steps-view` — right panel for the wizard steps

The sidecar panel renders a live preview of the push notification as content is entered in Step 3 (Push Content). It is empty/blank in earlier steps.

### 10.5 Typo in `data-test-id` (Known Codebase Issue)

The step separators use:
```
drawer-test-id-seperator-{n}
```
Note: "seperator" is misspelled (should be "separator"). This is an existing bug in the codebase. Do **not** correct this in test selectors — existing tests rely on the misspelled version.

### 10.6 Ionicons Usage

The close button uses Ionicons v2:
```html
<i class="ion-ios-close-empty"></i>
```

The tooltip icon:
```html
<i class="ion ion-help-circled has-tooltip"></i>
```

### 10.7 Vue Component Structure (Inferred)

Based on class structure and patterns:

```
ClyVueDrawer (base component, shared)
  └── ClyVuePushNotificationDrawer (plugin extension)
        ├── Step1InfoTargeting
        │     ├── NotificationNameInput
        │     ├── PlatformCheckboxGroup
        │     └── TargetingRadioGroup
        │           └── (conditional) SegmentFilterPanel
        ├── Step2Delivery
        │     └── DeliveryRadioGroup
        │           └── (conditional) ScheduleDateTimePicker
        ├── Step3PushContent
        │     ├── LanguageTabGroup
        │     ├── TitleInput (with emoji/variable controls)
        │     ├── MessageTextarea (with emoji/variable controls)
        │     └── MediaUrlInput
        └── Step4Review
              └── SummaryReadonlyView
```

### 10.8 CSS Architecture

- **Bulma** utility classes (`bu-` prefix) — layout, spacing, flex
- **Element UI** component classes (`el-` prefix) — form controls
- **Countly BEM** classes (`cly-vue-` prefix) — custom components and drawer framework
- **Ionicons** (`ion-`, `ion ` prefix) — icons
- All classes appear to be global (no CSS Modules scoping observed)

### 10.9 Accessibility

- Platform checkboxes: `role="group"` on `el-checkbox-group`
- Targeting radios: `role="radio"` on each `el-radio label`
- Close button: interactive `div` — consider `role="button"` and `aria-label="Close"`
- Tooltip icons: `has-tooltip` class — tooltip text likely via `data-original-title` attribute

### 10.10 Validation Rules (Inferred)

| Field | Rule |
|---|---|
| Notification Name | Optional; no validation |
| Platforms | At least one must be selected (Android or iOS) |
| Targeting | One option required (always has default) |
| Delivery | One option required (always has default) |
| Message Title | Required (non-empty) |
| Message Body | Required (non-empty) |
| Image URL | Optional; must be valid URL if provided |

---

*End of PRD*
