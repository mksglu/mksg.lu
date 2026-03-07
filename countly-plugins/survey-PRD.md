# PRD: Countly Surveys Plugin — "Create New Survey" Drawer

**Plugin:** Surveys
**Component Type:** `cly-vue-drawer` (multi-step, half-screen with sidecars)
**URL:** `http://mert.count.ly/dashboard#/6908ab02fece9ef06eca7285/ias`
**Date:** 2026-02-27

---

## 1. Scope & Context

### Purpose
The Surveys drawer enables operators to create customer feedback surveys that render as on-page widgets. Surveys support five question types, live preview of the widget, per-question choice management, customization, targeting, and a final review step before publication.

### Entry Points
- "Create new survey" button on the Surveys plugin index page (`/ias` route).
- The drawer opens in a half-screen layout (`.cly-vue-drawer--half-screen`) that slides in from the right, with a live widget preview sidecar on the left.

### Key Constraints
- The drawer is mounted with `.is-mounted` and opened with `.is-open`.
- The `.has-sidecars` modifier activates the split layout (preview panel left, form right).
- The modifier `.cly-vue-drawer--half-screen-6` sets the sidecar column width to 6 columns.
- The drawer is a **4-step wizard**: Settings & Questions → Customization → Targeting → Review.
- Navigation between steps is locked (`.is-locked`) until preceding steps are valid.

---

## 2. Component Hierarchy

```
cly-vue-drawer (.is-mounted .is-open .has-sidecars .cly-vue-drawer--half-screen .cly-vue-drawer--half-screen-6)
├── cly-vue-drawer__sidecars-view
│   └── cly-vue-content
│       └── [Widget Preview Sidecar]
│           └── countly-surveys-web.widget-preview.cly-vue-surveys-preview
│               ├── preview-stage.bu-mb-6           ← Question preview stage
│               │   ├── stage-label.bu-pb-4          ← "Question (1/1)"
│               │   └── survey-widget-v2.full
│               │       ├── survey-widget-v2__padding
│               │       │   ├── section-top.center
│               │       │   │   ├── survey-widget-v2__horizontal-line.w-100.center
│               │       │   │   │   └── survey-widget-v2__horizontal-line__top
│               │       │   │   └── close-button.center  ← ion-ios-close-empty icon
│               │       │   ├── section-body
│               │       │   │   ├── main-text           ← Question title
│               │       │   │   ├── checklist-wrapper
│               │       │   │   │   ├── main-sub-text   ← "Select one or multiple"
│               │       │   │   │   └── q_1.check-item  ← Choice 1 (checkbox input)
│               │       │   │   └── submit-wrapper
│               │       │   │       └── submit-button   ← "Submit"
│               │       │   └── section-footer
│               │       │       └── img (logo)
│               └── preview-stage (Thank you message)
│                   ├── stage-label.bu-pb-4            ← "Thank you message"
│                   └── survey-widget-v2.full.finished
│                       ├── section-top
│                       │   ├── close-button.center
│                       │   └── centered-text
│                       │       ├── img.thanks-image
│                       │       └── div.thanks          ← "Thanks for your feedback!"
│                       └── section-footer
│                           └── img (logo)
└── cly-vue-drawer__steps-view
    └── cly-vue-drawer__steps-wrapper
        ├── cly-vue-drawer__header
        │   ├── cly-vue-drawer__title
        │   │   └── cly-vue-drawer__title-container.bu-is-flex.bu-is-justify-content-space-between.bu-is-align-items-center
        │   │       ├── cly-vue-drawer__title-header   ← "Create new survey"
        │   │       └── cly-vue-drawer__close-button
        │   └── cly-vue-drawer__subtitle               ← Descriptive subtitle
        ├── cly-vue-drawer__steps-header               ← Step indicator breadcrumb
        │   └── cly-vue-drawer__steps-container
        │       ├── Step 1: cly-vue-drawer__step-label  (active)
        │       │   ├── cly-vue-drawer__step-sign
        │       │   │   ├── span.index.text-small.color-white  ← "1"
        │       │   │   └── span.done-icon.text-small.color-white  ← checkmark img
        │       │   └── cly-vue-drawer__step-title      ← "Settings and questions"
        │       ├── cly-vue-drawer__step-separator
        │       ├── Step 2: cly-vue-drawer__step-label.is-locked
        │       │   └── … "Customization"
        │       ├── cly-vue-drawer__step-separator
        │       ├── Step 3: cly-vue-drawer__step-label.is-locked
        │       │   └── … "Targeting"
        │       ├── cly-vue-drawer__step-separator
        │       └── Step 4: cly-vue-drawer__step-label.is-locked
        │           └── … "Review"
        └── cly-vue-drawer__body-container
            └── [Step Content — see §10]
```

---

## 3. HTML Structure & Class Names

### Drawer Root
| Class | Purpose |
|---|---|
| `cly-vue-drawer` | Root drawer component |
| `is-mounted` | Drawer has been mounted to DOM |
| `is-open` | Drawer is visible/expanded |
| `has-sidecars` | Activates split layout with preview sidecar |
| `cly-vue-drawer--half-screen` | Half-screen width mode |
| `cly-vue-drawer--half-screen-6` | Sidecar occupies 6 of 12 columns |
| `is-multi-step` | Enables step-based navigation UI |

### Sidecar (Preview Panel)
| Class | Purpose |
|---|---|
| `cly-vue-drawer__sidecars-view` | Container for the left sidecar pane |
| `cly-vue-content` | Inner content wrapper |
| `countly-surveys-web` | Plugin-scoped root for widget |
| `widget-preview` | Flags this as a preview container |
| `cly-vue-surveys-preview` | Vue component class for preview |

### Widget Preview Internals
| Class | Purpose |
|---|---|
| `preview-stage` | Wraps each preview card (question / thank you) |
| `stage-label` | Label above preview card ("Question (1/1)", "Thank you message") |
| `survey-widget-v2` | Widget version 2 root |
| `survey-widget-v2__padding` | Inner padding wrapper |
| `survey-widget-v2__horizontal-line` | Top decorative line container |
| `survey-widget-v2__horizontal-line__top` | The line element itself |
| `section-top` | Top bar with close button |
| `section-body` | Main content area |
| `section-footer` | Bottom area with logo |
| `main-text` | Question title text |
| `main-sub-text` | Sub-prompt (e.g., "Select one or multiple") |
| `checklist-wrapper` | Wraps checkbox choices |
| `check-item` | Individual choice row |
| `q_1` | Per-question identifier prefix (`q_N`) |
| `submit-wrapper` | Wraps the submit button |
| `submit-button` | Submit CTA button |
| `close-button` | X close icon wrapper |
| `centered-text` | Centered thank-you content |
| `thanks-image` | Thank-you state illustration |
| `thanks` | Thank-you text label |
| `finished` | Modifier applied to widget in completed state |

### Drawer Step Header
| Class | Purpose |
|---|---|
| `cly-vue-drawer__steps-header` | Sticky step progress bar container |
| `cly-vue-drawer__steps-container` | Flex row of step items |
| `cly-vue-drawer__step-label` | Single step item wrapper |
| `cly-vue-drawer__step-separator` | Divider line between steps |
| `cly-vue-drawer__step-sign` | Circular indicator for step number |
| `cly-vue-drawer__step-title` | Step name text |
| `is-locked` | Step is not yet accessible |
| `is-active` | Current active step |
| `done-icon` | Checkmark shown on completed steps |
| `index` | Numeric index shown in step circle |

### Drawer Body — Survey-Specific
| Class | Purpose |
|---|---|
| `cly-vue-surveys-drawer` | Root BEM block for survey form |
| `cly-vue-surveys-drawer__survey-name` | Survey name field section |
| `cly-vue-surveys-drawer__internal-name` | Internal name field section |
| `cly-vue-surveys-drawer__subheading` | Section subheadings |
| `cly-vue-surveys-drawer__input-element` | Generic input wrapper |
| `cly-vue-surveys-drawer__choices` | Choices list for a question |
| `cly-vue-surveys-drawer__add-question` | "Add new question" trigger |
| `cly-vue-surveys-drawer__exclusive-option` | "None of the above" exclusive checkbox |
| `cly-vue-surveys-drawer__other-option` | "Other" freetext option row |
| `cly-vue-surveys-drawer__margin-bottom` | Utility spacing modifier |
| `cly-vue-surveys-drawer__notification` | Inline notification/alert area |
| `cly-vue-surveys-drawer--text` | Text variant modifier |

### Notification Banner
| Class | Purpose |
|---|---|
| `cly-vue-notification__alert-box` | Alert box container |
| `cly-vue-notification__alert-box--full` | Full-width alert variant |
| `cly-vue-notification__alert-box__alert-text--yellow` | Yellow/warning text style |
| `cly-vue-notification__alert-box__close-icon` | Close icon for dismissible alerts |

### Step Content Sections
| Class | Purpose |
|---|---|
| `cly-vue-drawer-step__section` | A logical section within a step |
| `cly-vue-drawer-step__section-group` | Groups related sections |
| `cly-vue-drawer-step__section-group--filled` | Filled/highlighted group variant |
| `cly-vue-drawer-step__line` | Vertical connector line in step list |
| `cly-vue-drawer-step__line--aligned` | Aligned variant of the connector |

### Drag & Sort
| Class | Purpose |
|---|---|
| `drag-icon` | Handle for drag-to-reorder questions |
| `ion-arrow-up-b` | Ionicons arrow used as drag indicator |

### Utility / Layout (Bulma)
| Class | Purpose |
|---|---|
| `bu-is-flex` | `display: flex` |
| `bu-is-align-items-center` | `align-items: center` |
| `bu-is-justify-content-space-between` | `justify-content: space-between` |
| `bu-is-justify-content-left` | `justify-content: flex-start` |
| `bu-is-mobile` | Mobile breakpoint modifier |
| `bu-is-gapless` | Removes column gaps |
| `bu-columns` / `bu-column` | Bulma grid columns |
| `bu-is-12` | Full-width column |
| `bu-mb-1/2/6` | Margin bottom scale |
| `bu-mt-1/2/4` | Margin top scale |
| `bu-ml-2` / `bu-mr-2` | Margin left/right |
| `bu-pb-4/5` | Padding bottom |
| `bu-pt-0/4` | Padding top |
| `bu-pl-2` / `bu-pr-3` | Padding left/right |
| `bu-p-2` | Padding all sides |
| `bu-my-3` | Margin vertical |

### Color Utilities
| Class | Token |
|---|---|
| `color-white` | White text |
| `color-cool-gray-40` | Cool gray 40 text (inactive step titles) |
| `color-cool-gray-50` | Cool gray 50 text |
| `is-light-blue` | Light blue accent state |

---

## 4. Design Tokens

Inferred from class names and Countly's design system:

| Token Category | Values Observed |
|---|---|
| **Typography** | `text-small`, `text-smallish`, `font-weight-bold` |
| **Colors** | `color-white`, `color-cool-gray-40`, `color-cool-gray-50`, yellow (notification), light blue (active state) |
| **Spacing** | Bulma scale: 1–6 (margin/padding), maps to 4px, 8px, 12px, 16px, 20px, 24px multiples |
| **Icons** | Ionicons: `ion-ios-close-empty`, `ion-arrow-up-b`; Element UI: `el-icon-close` |
| **States** | `is-active`, `is-locked`, `is-mounted`, `is-open`, `finished`, `is-scroll-shadow-at-top` |
| **Layout** | Half-screen 6-col split; sidecar left, form right |
| **Widget Colors** | Customizable via Step 2 (Customization); preview reflects live changes |

---

## 5. Form Fields & Question Types

### Step 1: Settings & Questions

#### Survey Identity Fields
| Field | Component | Placeholder / Label |
|---|---|---|
| Survey Name | Text input | (survey name) |
| Internal Name | Text input | (internal name) |

#### Question Block
Each question is rendered as a draggable card within `.cly-vue-drawer-step__section-group`. A question block contains:

1. **Question Type Selector** — `el-select` dropdown with `el-select-dropdown__item` entries
2. **Question Text** — text input for the question prompt
3. **Required toggle** — `el-switch` to mark the question as mandatory
4. **Choices list** (for choice-based types) — ordered list rendered inside `.cly-vue-surveys-drawer__choices`

#### Supported Question Types

| Type | Key Indicator | Widget Rendering |
|---|---|---|
| **Multiple Choice (Checkbox)** | `tp="checkbox"` inputs in preview; `checklist-wrapper` | Checkbox list with "Select one or multiple" sub-label |
| **Radio Button** | `tp="radio"` inputs | Single-select radio list |
| **Textbox** | Free-text input area | Single-line or multi-line input field |
| **Dropdown** | `el-select` variant | Collapsed dropdown, expands on click |
| **Rating Scale (NPS-style)** | Numeric scale | Horizontal numeric rating selector |

#### Per-Choice Options (Multiple Choice / Radio)
Each choice row in `.cly-vue-surveys-drawer__choices` includes:
- Choice text input (`ph="Choice 1"`, `ph="Choice 2"`, etc.)
- Delete icon
- "Add choice" link: `t="survey-drawer-settings-and-questions-page-question-1-1-+-add-choice"`
- **"Add All of the Above"** option — `el-checkbox-button` + `el-checkbox-input`
  `t="survey-drawer-settings-and-questions-page-question-1-1-add-all-of-above-choice-option-el-checkbox-button"`
- **"Other" option** — renders as `.cly-vue-surveys-drawer__other-option`
- **"None of the Above"** option — renders as `.cly-vue-surveys-drawer__exclusive-option`

#### Add New Question
- CTA: `t="survey-drawer-settings-and-questions-page-+-add-new-question"`
- Rendered in `.cly-vue-surveys-drawer__add-question`
- Opens a type-selection UI (inline or dropdown)

#### Question Type Select
- Test IDs: `survey-drawer-settings-and-questions-page-question-1-1--select-icon`, `survey-drawer-settings-and-questions-page-question-1-1--select-input`
- Uses `el-select` / `el-select-dropdown` pattern

---

## 6. State Transitions

### Drawer Open/Close
```
[Closed] → [is-mounted + is-open] → [Step 1 active, steps 2-4 is-locked]
[Open]   → [Close button / backdrop click] → [Closed, state reset]
```

### Step Progression
```
Step 1 (active) → [Validation passes] → Step 2 unlocked
Step 2 (active) → [Validation passes] → Step 3 unlocked
Step 3 (active) → [Validation passes] → Step 4 unlocked
Step 4 (Review) → [Create/Save] → Drawer closes, survey created
```

### Step Visual States
| State | CSS Class | Visual |
|---|---|---|
| Not reached | `is-locked` | Gray circle + gray title |
| Active | `is-active` (implicit) | Filled circle, bold title |
| Completed | `done-icon` visible | Checkmark icon replaces number |

### Widget Preview States
| State | Class | Content |
|---|---|---|
| Question view | `survey-widget-v2 full` | Question + choices + Submit button |
| Thank you view | `survey-widget-v2 full finished` | Thanks image + message + logo |

### Notification Banner
- Appears in `.cly-vue-surveys-drawer__notification` / `.cly-vue-notification__alert-box--full`
- Yellow variant: `.cly-vue-notification__alert-box__alert-text--yellow`
- Dismissible via `.cly-vue-notification__alert-box__close-icon` (`el-icon-close`)

### Scroll Shadow
- Applied as `is-scroll-shadow-at-top` when body content is scrolled

---

## 7. Element UI Components

| Component | Usage |
|---|---|
| `el-button` | Primary and text buttons throughout the wizard |
| `el-button--primary` | Primary CTA buttons (Next, Create) |
| `el-button--small` | Small action buttons (Add choice, etc.) |
| `el-button--text` | Inline text-style buttons |
| `el-checkbox` | Choice option checkboxes in question preview/form |
| `el-checkbox__input` | Hidden actual input for checkbox |
| `el-checkbox__inner` | Visual checkbox indicator box |
| `el-checkbox__label` | Checkbox label text |
| `el-checkbox__original` | Native `<input type="checkbox">` |
| `el-select` | Question type selector and other dropdowns |
| `el-select-dropdown` | Dropdown menu panel |
| `el-select-dropdown__list` | Options list container |
| `el-select-dropdown__item` | Individual dropdown option |
| `el-select-dropdown__wrap` | Dropdown scroll wrapper |
| `el-select__caret` | Caret/arrow indicator |
| `el-scrollbar` | Custom scrollbar on dropdown lists |
| `el-scrollbar__wrap` | Scrollable area |
| `el-scrollbar__wrap--hidden-default` | Hides native scrollbar |
| `el-switch` | Toggle for "Required" question flag |
| `el-switch__core` | Visual track of the switch |
| `el-switch__input` | Hidden native input |
| `el-switch__label` | Label(s) for switch (left/right) |
| `el-switch__label--right` | Right-side label variant |
| `el-icon-close` | Close icon used in notification dismiss |

---

## 8. Countly Custom Components

### `cly-vue-drawer`
**Root multi-step drawer component.**

Props / Behavior:
- `is-mounted` — lifecycle flag, set on component mount
- `is-open` — controls visibility
- `has-sidecars` — activates the split sidecar layout
- `cly-vue-drawer--half-screen` — half-screen width mode
- `cly-vue-drawer--half-screen-N` — N-column sidecar width (6 here)
- `is-multi-step` — enables step indicator header

Emits: close, step-change, save/submit

Sub-elements:
- `cly-vue-drawer__sidecars-view` — left panel
- `cly-vue-drawer__steps-view` — right panel (form)
- `cly-vue-drawer__header` — sticky header with title and close
- `cly-vue-drawer__steps-header` — step progress bar
- `cly-vue-drawer__body-container` — scrollable form content

### `cly-vue-content`
Generic content wrapper used inside the sidecar.

### `cly-vue-surveys-preview`
**Survey widget preview component** (`countly-surveys-web widget-preview`).

Behavior:
- Renders a live preview of the survey widget as configured.
- Shows two stages: the active question and the thank-you message.
- Reflects changes made in the form in real-time.

### `cly-vue-notification`
Inline notification/alert component.

Variants:
- `--full` — full-width alert
- `__alert-text--yellow` — warning color
- Dismissible with `__close-icon`

---

## 9. Widget Preview

### Layout
The preview sidecar (`.cly-vue-drawer__sidecars-view`) contains two stacked preview cards:

1. **Question Preview Card** (`preview-stage bu-mb-6`)
   - Label: "Question (1/1)" (`t="preview-question-label-1"`)
   - Widget: `survey-widget-v2 full`
   - Structure:
     - `section-top.center`: horizontal decorative line + close button (ion-ios-close-empty)
     - `section-body`: question title + choices + submit button
     - `section-footer`: logo image

2. **Thank You Preview Card** (`preview-stage`)
   - Label: "Thank you message" (`t="survey-preview-thank-you-message-label"`)
   - Widget: `survey-widget-v2 full finished`
   - Structure:
     - `section-top`: close button + centered content
     - Centered: thank-you image + "Thanks for your feedback!" text
     - `section-footer`: logo image

### Live Update Behavior
The preview mirrors form inputs live:
- Question text → `main-text`
- Sub-prompt → `main-sub-text`
- Choices → `check-item` rows with `tp="checkbox"` inputs
- Custom logo → `img[t="surveys-widget-preview-default-logo"]`
- Custom thank-you message → `.thanks` text
- Custom thank-you image → `.thanks-image`

### Widget States
| State | Widget Class | Notes |
|---|---|---|
| Active question | `survey-widget-v2 full` | Normal state |
| Completed/thank you | `survey-widget-v2 full finished` | `.finished` modifier |

### Test IDs for Preview
| Element | `t=` Value |
|---|---|
| Question label | `preview-question-label-1` |
| Widget title | `nps-preview-nps-widget-title-label` |
| Horizontal line top | `servey-widget-section-top-center-horizantal-line-top-question-1-line-1` (note: typo in source — "servey") |
| Close button | `nps-widget-close-button` |
| Sub-label (select one) | `survey-preview-page-question-1-select-one-or-multiple-label` |
| Choice 1 | `survey-preview-page-question-1-choice-1` |
| Submit button | `nps-drawer-customization-submit-button` |
| Logo | `surveys-widget-preview-default-logo` |
| Thank you label | `survey-preview-thank-you-message-label` |
| Thanks image | `nps-preview-thanks-image` |
| Thanks text | `nps-preview-thanks-message-popup-centered-text-label` |

---

## 10. Multi-Step Wizard

### Step Indicator Header (`cly-vue-drawer__steps-header`)

4 steps separated by 3 separators:

| # | Step Label | Test IDs |
|---|---|---|
| 1 | Settings and questions | `drawer-test-id-step-1-label`, `drawer-test-id-settings-and-questions-label`, `drawer-test-id-step-1`, `drawer-test-id-current-step-index-1`, `drawer-test-id-current-step-index-img-container1` |
| 2 | Customization | `drawer-test-id-step-2-label`, `drawer-test-id-customization-label`, `drawer-test-id-step-2`, `drawer-test-id-current-step-index-2`, `drawer-test-id-current-step-index-img-container2` |
| 3 | Targeting | `drawer-test-id-step-3-label`, `drawer-test-id-targeting-label`, `drawer-test-id-step-3`, `drawer-test-id-current-step-index-3`, `drawer-test-id-current-step-index-img-container3` |
| 4 | Review | `drawer-test-id-step-4-label`, `drawer-test-id-review-label`, `drawer-test-id-step-4`, `drawer-test-id-current-step-index-4`, `drawer-test-id-current-step-index-img-container4` |

Separator test IDs: `drawer-test-id-seperator-0`, `drawer-test-id-seperator-1`, `drawer-test-id-seperator-2` (note: typo in source — "seperator")

Header container: `drawer-test-id-steps-header-container`
Header title: `drawer-test-id-header-title`
Step sign: `drawer-test-id-step-sign`, `drawer-test-id-step-sign-container`

### Step 1: Settings & Questions
**Sections:**
- **Survey identity**: Survey name, internal name
- **Questions list**: Ordered, draggable list of question blocks
  - Each block: type selector, question text, required toggle, choices (if applicable)
  - Per-choice: text input, "Add choice" button, "All of the above" option, "Other" option, "None of the above" option
- **Add question** CTA at the bottom

**Validation requirements:**
- At least one question must be defined
- Survey name must not be empty

### Step 2: Customization
**Sections (inferred from class usage and context):**
- Widget color / theme customization
- Font settings
- Logo upload / URL
- Submit button label
- Thank-you message text
- Thank-you image

The live preview in the sidecar reflects all Customization changes in real-time.

### Step 3: Targeting
**Sections (inferred from class usage and context):**
- Audience targeting rules (user segments, cohorts, countries, etc.)
- Display conditions (trigger events, frequency, delay)
- Platform targeting (web, in-app)
- Show/hide logic

The `.cly-vue-notification__alert-box--full` notification may appear in this step to warn about targeting configuration.

### Step 4: Review
**Content:**
- Read-only summary of all configured settings from Steps 1–3
- Survey name, questions count, question types
- Customization summary
- Targeting summary
- Final "Create" / "Save" CTA button (primary)
- "Back" navigation link

---

## 11. Implementation Notes

### Naming Consistency Issues (Bugs in Source)
1. **"servey"** typo in `t="servey-widget-section-top-center-horizantal-line-top-question-1-line-1"` — should be "survey"
2. **"seperator"** typo in separator test IDs (`drawer-test-id-seperator-0/1/2`) — should be "separator"
3. **"horizantal"** typo in the same test ID — should be "horizontal"

These typos exist in the live DOM. New tests or implementations must match these exact values or the typos must be fixed at the source and tests updated.

### Drag & Reorder
- Questions support drag-to-reorder via `drag-icon` / `ion-arrow-up-b` handles.
- Implementation should use a sortable list directive (e.g., `v-sortable`, `vue-draggable`).

### Step Lock Logic
- Steps 2, 3, 4 receive `.is-locked` until the preceding step passes validation.
- Clicking a locked step has no effect (pointer-events disabled or no-op handler).
- On step completion, the numeric index in the step sign is replaced by a done/checkmark image.

### Scroll Behavior
- The drawer body scrolls independently. The `.is-scroll-shadow-at-top` class is toggled on scroll to indicate overflowed content above.

### Notification Component
- Alert banners can appear within the drawer body (e.g., in Targeting step for cohort/segment warnings).
- Yellow variant is used for warnings; standard for informational.
- Close icon (`el-icon-close`) dismisses the banner.

### Sidecar Sync
- The sidecar preview (`cly-vue-surveys-preview`) is always visible regardless of the active step.
- It only reflects settings from Step 1 (question content) and Step 2 (customization/styling).
- Steps 3 and 4 do not alter the preview.

### Question Numbering
- Questions are labeled `q_N` (e.g., `q_1`) in the preview DOM.
- The preview label shows `(N/Total)` format.

### Element UI Dropdown Pattern
- `el-select` uses a teleported dropdown (`el-select-dropdown`) appended to document body.
- Scrollable option lists use `el-scrollbar` with `--hidden-default` to suppress native scrollbar.

### Input Test ID Pattern
- Form inputs use `t="input-test-id"` (generic) in some places.
- Specific choices and controls use descriptive test IDs following the pattern:
  `survey-drawer-{step-name}-{context}-{action}`
  Example: `survey-drawer-settings-and-questions-page-question-1-1-+-add-choice`

### BEM Naming Convention
The surveys-specific classes follow strict BEM:
- Block: `cly-vue-surveys-drawer`
- Elements: `__survey-name`, `__internal-name`, `__choices`, `__add-question`, etc.
- Modifiers: `--text`

### Column/Grid System
- Uses Bulma-prefixed (`bu-`) utility classes for layout, not raw Bulma class names.
- This is a Countly-internal Bulma namespace to avoid conflicts.

---

*End of PRD*
