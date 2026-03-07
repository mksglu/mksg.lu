# PRD: Countly Funnel Drawer — Pixel-Perfect Specification

## Scope & Metadata

| Field | Value |
|-------|-------|
| **Component** | New Funnel Drawer |
| **Source** | Live extraction via CDP `CSS.getComputedStyleForNode` + `DOM.getOuterHTML` |
| **Instance** | `http://mert.count.ly` (Enterprise v25.03) |
| **Date** | 2026-02-27 |
| **Purpose** | Pixel-perfect reproduction of the "New Funnel" drawer UI |
| **Root Selector** | `.cly-vue-drawer.is-open.cly-vue-drawer--full-screen` |

---

## 1. Component Hierarchy

```
cly-vue-drawer (position: fixed, 1200x948px)
└── cly-vue-drawer__steps-view (position: absolute, 1200x948px, bg: #FFFFFF)
    ├── Close button (top-right, .cly-vue-drawer__close-button)
    ├── cly-vue-drawer__header.is-full-screen
    ├── cly-vue-drawer__steps-container (max-width: 700px, pl: 250px, pr: 250px)
    │   ├── h3 "New Funnel"
    │   └── cly-vue-drawer__body-container (margin: 16px, width: 668px)
    │       └── cly-vue-content
    │           ├── Section: Funnel Name
    │           │   ├── Label (data-test-id="funnel-name-label")
    │           │   └── Input (data-test-id="funnel-name-input")
    │           ├── Section: Funnel Description
    │           │   ├── Label (data-test-id="funnel-description-label")
    │           │   └── Input (data-test-id="funnel-description-input")
    │           ├── Section: Funnel Type
    │           │   ├── Label (data-test-id="funnel-type-label")
    │           │   └── Radio cards container (.cly-vue-drawer-step__line--aligned)
    │           │       ├── Radio: Session Independent (checked by default)
    │           │       └── Radio: Same Session
    │           └── Section: Funnel Steps
    │               ├── Label (data-test-id="funnel-steps-label")
    │               └── cly-vue-qb-steps
    │                   ├── Step 1
    │                   │   ├── Drag handle (8x11px icon)
    │                   │   ├── Step label "Step 1"
    │                   │   ├── Event selector (Sessions default)
    │                   │   ├── Delete step button (X icon, visible with 2+ steps)
    │                   │   ├── "...which has" label
    │                   │   └── "+ Add property" button
    │                   ├── AND/OR toggle (between steps, visible with 2+ steps)
    │                   ├── Step 2 (same structure as Step 1)
    │                   └── "+ Add Condition" button
    └── cly-vue-drawer__footer
        └── cly-vue-drawer__buttons
            ├── Cancel button
            └── New Funnel button (disabled until valid)
```

---

## 2. Complete HTML Structure

### 2.1 Funnel Name Section

```html
<div class="cly-vue-drawer-step__section">
  <div data-test-id="funnel-name-label"
       class="text-medium text-heading font-weighted-bold color-gool-gray-100">
    Funnel Name
  </div>
  <span>
    <div class="el-input">
      <input data-test-id="funnel-name-input"
             type="text"
             autocomplete="off"
             placeholder="Enter funnel name"
             class="el-input__inner">
    </div>
  </span>
</div>
```

### 2.2 Funnel Description Section

```html
<div class="cly-vue-drawer-step__section">
  <div data-test-id="funnel-description-label"
       class="text-medium text-heading font-weighted-bold color-gool-gray-100">
    Funnel Description
  </div>
  <span>
    <form>
      <div class="el-input">
        <input data-test-id="funnel-description-input"
               type="text"
               autocomplete="off"
               placeholder="An optional description that will be visible to all users while viewing this funnel"
               class="el-input__inner">
      </div>
    </form>
  </span>
</div>
```

### 2.3 Funnel Type Section (Radio Cards)

```html
<div class="cly-vue-drawer-step__section">
  <div data-test-id="funnel-type-label"
       class="text-big font-weight-bold text-heading">
    Funnel Type
  </div>
  <div class="cly-vue-drawer-step__line cly-vue-drawer-step__line--aligned">

    <!-- SELECTED: Session Independent -->
    <label data-test-id="funnel-type-session-independent-el-radio-wrapper"
           role="radio"
           aria-checked="true"
           tabindex="0"
           class="el-radio is-autosized is-multiline is-bordered is-checked">
      <span data-test-id="funnel-type-session-independent-el-radio"
            class="el-radio__input is-checked">
        <span class="el-radio__inner"></span>
        <input data-test-id="funnel-type-session-independent-el-radio-button"
               type="radio"
               aria-hidden="true"
               tabindex="-1"
               class="el-radio__original"
               value="session-independent">
      </span>
      <span data-test-id="funnel-type-session-independent-el-radio-label"
            class="el-radio__label">
        <span data-test-id="funnel-type-radio-button-title-label-session-independent"
              class="text-normal color-cool-gray-100 bu-mt-2">
          Session Independent
        </span>
        <div data-test-id="funnel-type-radio-button-description-label-session-independent"
             class="text-small bu-mt-2 color-cool-gray-50 bu-mb-1">
          Funnel steps can occur in multiple sessions
        </div>
      </span>
    </label>

    <!-- UNSELECTED: Same Session -->
    <label data-test-id="funnel-type-same-session-el-radio-wrapper"
           role="radio"
           tabindex="0"
           class="el-radio is-autosized is-multiline is-bordered">
      <span data-test-id="funnel-type-same-session-el-radio"
            class="el-radio__input">
        <span class="el-radio__inner"></span>
        <input data-test-id="funnel-type-same-session-el-radio-button"
               type="radio"
               aria-hidden="true"
               tabindex="-1"
               class="el-radio__original"
               value="same-session">
      </span>
      <span data-test-id="funnel-type-same-session-el-radio-label"
            class="el-radio__label">
        <span data-test-id="funnel-type-radio-button-title-label-same-session"
              class="text-normal color-cool-gray-100 bu-mt-2">
          Same Session
        </span>
        <div data-test-id="funnel-type-radio-button-description-label-same-session"
             class="text-small bu-mt-2 color-cool-gray-50 bu-mb-1">
          Funnel steps need to occur in the same session
        </div>
      </span>
    </label>

  </div>
</div>
```

### 2.4 Funnel Steps Section

```html
<div class="cly-vue-drawer-step__section">
  <div data-test-id="funnel-steps-label"
       class="text-big font-weight-bold color-cool-gray-100 text-heading bu-mb-5">
    Funnel Steps
  </div>
  <div class="bu-columns bu-is-gapless bu-is-mobile bu-is-centered">
    <div class="bu-column bu-is-12">
      <div class="cly-vue-qb-steps" allow-step-reordering="true">

        <!-- Step 1 -->
        <div class="bu-is-flex bu-columns bu-mb-1">
          <div class="bu-ml-3 bu-mr-3">
            <div data-test-id="funnel-steps-drag-icon-0" class="drag-handler">
              <img src="images/drill/drag-icon.svg">
            </div>
          </div>
          <div class="bu-column">
            <div class="cly-vue-qb-steps__step">
              <div class="bu-columns bu-is-gapless bu-is-multiline">
                <div class="bu-column bu-is">
                  <div data-test-id="funnel-steps-label-step-1"
                       class="text-medium bu-px-1 bu-pb-1">
                    Step 1
                  </div>
                </div>
                <div class="bu-column bu-is-12">
                  <div class="bu-columns bu-is-gapless bu-is-mobile cly-vue-qb-steps__row">
                    <div class="bu-column bu-is-12">
                      <div class="cly-vue-qb-steps__row-selects">
                        <!-- Event selector (see Section 2.5) -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div data-test-id="funnel-steps-which-has-label-1"
                   class="text-medium bu-p-1 bu-mt-2 bu-mb-2">
                ...which has
              </div>
              <div class="cly-vue-qb-seg">
                <div data-test-id="funnel-steps-step-1-add-property-button"
                     class="cly-text-button">
                  + Add property
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- AND/OR toggle appears here between steps when 2+ steps exist -->
        <!-- Step 2+ (same structure as Step 1) -->

        <!-- + Add Condition button -->
        <button type="button"
                class="el-button bg-light-blue-100 bu-mt-5 text-small font-weight-bold color-blue-100 el-button--text"
                data-test-id="add-condition-button">
          <span>+ Add Condition</span>
        </button>

      </div>
    </div>
  </div>
</div>
```

### 2.5 Event Selector (Inside Each Step)

```html
<div class="cly-event-select" value="[CLY]_session">
  <div data-test-id="funnel-steps-step-sessions-1-dropdown-el-select"
       class="cly-vue-dropdown el-select cly-vue-select-x"
       placeholder="Select Event">
    <div style="width: 100%;">
      <div class="cly-input-dropdown-trigger el-input is-adaptive">
        <input data-test-id="funnel-steps-step-sessions-1-pseudo-input"
               type="text"
               readonly
               class="el-input__inner el-input__inner--auto-resize"
               style="display: none;">
        <span data-test-id="funnel-steps-step-sessions-1-pseudo-input-label"
              readonly
              class="el-input__inner el-input__inner--auto-resize">
          Sessions
        </span>
      </div>
    </div>
    <!-- Dropdown panel (display: none when closed) -->
    <div class="el-select-dropdown el-popper cly-vue-dropdown__pop cly-event-select"
         style="display: none;">
      <!-- 9 Event Type Radio Tabs -->
      <!-- Tab content with listbox items -->
    </div>
  </div>
</div>
```

### 2.6 AND/OR Toggle (Between Steps)

```html
<!-- Rendered between Step N and Step N+1 when 2+ steps exist -->
<div class="el-radio-group">
  <!-- AND (active by default) -->
  <label class="el-radio-button is-active">
    <input type="radio" class="el-radio-button__orig-radio" value="and">
    <span class="el-radio-button__inner">AND</span>
  </label>
  <!-- OR (inactive by default) -->
  <label class="el-radio-button">
    <input type="radio" class="el-radio-button__orig-radio" value="or">
    <span class="el-radio-button__inner">OR</span>
  </label>
</div>
```

### 2.7 Footer

```html
<div class="cly-vue-drawer__footer">
  <div class="cly-vue-drawer__controls-left-pc"></div>
  <div class="cly-vue-drawer__buttons is-single-step bu-is-justify-content-flex-end bu-is-flex">
    <button type="button"
            class="el-button el-button--secondary el-button--small"
            data-test-id="drawer-test-id-cancel-button">
      <span>Cancel</span>
    </button>
    <button type="button"
            class="el-button el-button--success el-button--small is-disabled"
            data-test-id="drawer-test-id-save-button">
      <span>New Funnel</span>
    </button>
  </div>
</div>
```

---

## 3. Design Tokens

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Blue primary | `#0166D6` | `rgb(1, 102, 214)` | Selected radio border, radio inner fill, AND toggle active bg, links, "+ Add" buttons |
| Green success | `#12AF51` | `rgb(18, 175, 81)` | Save button bg and border |
| Gray text (cool-gray-100) | `#333C48` | `rgb(51, 60, 72)` | Title, labels, input text, unselected radio title, step labels |
| Gray description (cool-gray-50) | `#81868D` | `rgb(129, 134, 141)` | Radio description text, close button icon |
| Gray border | `#CFD6E4` | `rgb(207, 214, 228)` | Input borders, unselected radio card border |
| Gray radio border | `#A7AEB8` | `rgb(167, 174, 184)` | Unselected radio inner circle border |
| Toggle border | `#E2E4E8` | `rgb(226, 228, 232)` | OR toggle inactive border |
| Light blue bg | `#E1EFFF` | `rgb(225, 239, 255)` | "+ Add Condition" button background |
| Step row bg | `#F8FAFD` | `rgb(248, 250, 253)` | Step selector row background |
| Input bg | `#FBFDFE` | `rgb(251, 253, 254)` | Text input background |
| Cancel bg | `#F6F6F6` | `rgb(246, 246, 246)` | Cancel button background and border |
| White | `#FFFFFF` | `rgb(255, 255, 255)` | Drawer bg, radio card bg, event selector bg, OR toggle inactive bg |
| Shadow light | — | `rgba(0, 0, 0, 0.08)` | Event selector trigger box-shadow |
| Shadow button | — | `rgba(0, 0, 0, 0.047)` | Cancel button, save button box-shadow |
| Font family | `Inter` | — | All text elements throughout the drawer |

---

## 4. Per-Element Computed CSS

### 4.1 Drawer Container

```
Selector: .cly-vue-drawer.is-open.cly-vue-drawer--full-screen
  position: fixed
  width: 1200px
  height: 948px
  font-family: Inter
  font-size: 16px
  color: rgb(0, 0, 0) / #000000
```

### 4.2 Steps View

```
Selector: .cly-vue-drawer__steps-view
  position: absolute
  width: 1200px
  height: 948px
  background-color: rgb(255, 255, 255) / #FFFFFF
  font-family: Inter
```

### 4.3 Close Button

```
Selector: .cly-vue-drawer__close-button
  color: rgb(129, 134, 141) / #81868D
  font-size: 30px
  display: flex
  align-items: center
  justify-content: center
  width: 40px
  height: 24px
  margin-top: -6px
  cursor: pointer

Icon: .cly-vue-drawer__close-button i (ion-ios-close-empty)
  font-size: 30px
  height: 36px
  width: 11.25px
```

### 4.4 Steps Container

```
Selector: .cly-vue-drawer__steps-container
  max-width: 700px
  padding-left: 250px
  padding-right: 250px
  width: 700px (computed 1200px including padding)
  height: 838px
```

### 4.5 Drawer Title

```
Selector: .cly-vue-drawer__steps-container h3
  Text: "New Funnel"
  color: rgb(51, 60, 72) / #333C48
  font-family: Inter
  font-size: 20px
  font-weight: 500
  line-height: 30px
  height: 30px
  width: 668px
```

### 4.6 Body Container

```
Selector: .cly-vue-drawer__body-container
  margin: 16px
  width: 668px
```

### 4.7 Section Container

```
Selector: .cly-vue-drawer-step__section
  padding-top: 12px
  padding-bottom: 12px
  width: 668px
  height: varies per content
```

### 4.8 Funnel Name Label

```
Selector: [data-test-id="funnel-name-label"]
  Classes: text-medium text-heading font-weighted-bold color-gool-gray-100
  color: rgb(51, 60, 72) / #333C48
  font-family: Inter
  font-size: 14px
  font-weight: 500
  line-height: 20px
  margin-bottom: 8px
  width: 668px
  height: 20px
```

### 4.9 Funnel Name Input

```
Selector: [data-test-id="funnel-name-input"] (.el-input__inner)
  color: rgb(51, 60, 72) / #333C48
  font-family: Inter
  font-size: 14px
  font-weight: 400
  line-height: 32px
  background-color: rgb(251, 253, 254) / #FBFDFE
  padding-left: 10px
  padding-right: 10px
  height: 32px
  width: 668px
  border: 1px solid rgb(207, 214, 228) / #CFD6E4
  border-radius: 4px
  cursor: text
  placeholder: "Enter funnel name"
```

### 4.10 Funnel Description Label

```
Selector: [data-test-id="funnel-description-label"]
  Classes: text-medium text-heading font-weighted-bold color-gool-gray-100
  color: rgb(51, 60, 72) / #333C48
  font-family: Inter
  font-size: 14px
  font-weight: 500
  line-height: 20px
  margin-bottom: 8px
  width: 668px
  height: 20px
```

### 4.11 Funnel Description Input

```
Selector: [data-test-id="funnel-description-input"] (.el-input__inner)
  color: rgb(51, 60, 72) / #333C48
  font-family: Inter
  font-size: 14px
  font-weight: 400
  line-height: 32px
  background-color: rgb(251, 253, 254) / #FBFDFE
  padding-left: 10px
  padding-right: 10px
  height: 32px
  width: 668px
  border: 1px solid rgb(207, 214, 228) / #CFD6E4
  border-radius: 4px
  cursor: text
  placeholder: "An optional description that will be visible to all users while viewing this funnel"
```

### 4.12 Funnel Type Label

```
Selector: [data-test-id="funnel-type-label"]
  Classes: text-big font-weight-bold text-heading
  color: rgb(51, 60, 72) / #333C48
  font-family: Inter
  font-size: 16px
  font-weight: 500
  line-height: 24px
  margin-bottom: 16px
  width: 668px
  height: 24px
```

### 4.13 Funnel Type Radio Cards Container

```
Selector: .cly-vue-drawer-step__line.cly-vue-drawer-step__line--aligned
  display: flex
  align-items: center
  justify-content: space-between
  width: 668px
  height: 78px
```

### 4.14 Radio Card -- Selected (Session Independent)

```
Selector: .el-radio.is-autosized.is-multiline.is-bordered.is-checked
  display: flex
  align-items: flex-start
  padding: 16px (all sides)
  width: 329px
  height: 78px
  background-color: rgb(255, 255, 255) / #FFFFFF
  border: 1px solid rgb(1, 102, 214) / #0166D6
  border-radius: 4px
  cursor: pointer
  font-family: Inter
  font-size: 14px
  font-weight: 500
  line-height: 14px
```

### 4.15 Radio Inner Circle -- Selected

```
Selector: .el-radio__inner (within .is-checked)
  width: 16px
  height: 16px
  background-color: rgb(1, 102, 214) / #0166D6
  border: 1px solid rgb(1, 102, 214) / #0166D6
  border-radius: 100%
```

### 4.16 Radio Card Title (Selected)

```
Selector: .text-normal.color-cool-gray-100 (within .is-checked)
  Text: "Session Independent"
  color: rgb(51, 60, 72) / #333C48
  font-family: Inter
  font-size: 14px
  font-weight: 500
  line-height: 14px
  margin-top: 8px
  display: inline
```

### 4.17 Radio Card Description (Selected)

```
Selector: .text-small.color-cool-gray-50 (within .is-checked)
  Text: "Funnel steps can occur in multiple sessions"
  color: rgb(129, 134, 141) / #81868D
  font-family: Inter
  font-size: 12px
  font-weight: 400
  line-height: 18px
  margin-top: 8px
  margin-bottom: 4px
```

### 4.18 Radio Card -- Unselected (Same Session)

```
Selector: .el-radio.is-autosized.is-multiline.is-bordered:not(.is-checked)
  display: flex
  align-items: flex-start
  padding: 16px (all sides)
  width: 329px
  height: 78px
  background-color: rgb(255, 255, 255) / #FFFFFF
  border: 1px solid rgb(207, 214, 228) / #CFD6E4
  border-radius: 4px
  margin-left: 10px
  cursor: pointer
  font-family: Inter
  font-size: 14px
  font-weight: 500
  line-height: 14px
```

### 4.19 Radio Inner Circle -- Unselected

```
Selector: .el-radio__inner (within :not(.is-checked))
  width: 16px
  height: 16px
  background-color: rgb(255, 255, 255) / #FFFFFF
  border: 1px solid rgb(167, 174, 184) / #A7AEB8
  border-radius: 100%
```

### 4.20 Funnel Steps Label

```
Selector: [data-test-id="funnel-steps-label"]
  Classes: text-big font-weight-bold color-cool-gray-100 text-heading bu-mb-5
  color: rgb(51, 60, 72) / #333C48
  font-family: Inter
  font-size: 16px
  font-weight: 500
  line-height: 24px
  margin-bottom: 24px
  width: 668px
  height: 24px
```

### 4.21 Step Label ("Step 1", "Step 2", etc.)

```
Selector: [data-test-id="funnel-steps-label-step-1"]
  Classes: text-medium bu-px-1 bu-pb-1
  color: rgb(51, 60, 72) / #333C48
  font-family: Inter
  font-size: 14px
  font-weight: 400
  line-height: 20px
  padding: 0 4px 4px 4px
  width: 628px (within 636px column)
```

### 4.22 Step Row Selects (Background Bar)

```
Selector: .cly-vue-qb-steps__row-selects
  background-color: rgb(248, 250, 253) / #F8FAFD
  padding: 8px (all sides)
  border-radius: 4px
  width: 620px (636px minus padding)
  height: 48px (32px content + 16px padding)
```

### 4.23 Drag Handler

```
Selector: .drag-handler
  width: 8px
  height: 20px

Selector: .drag-handler img
  width: 8px
  height: 11px
  src: images/drill/drag-icon.svg
```

### 4.24 Event Selector Trigger

```
Selector: .cly-input-dropdown-trigger .el-input__inner--auto-resize (label span)
  color: rgb(51, 60, 72) / #333C48
  font-family: Inter
  font-size: 14px
  font-weight: 400
  line-height: 32px
  background-color: rgb(255, 255, 255) / #FFFFFF
  padding-left: 10px
  padding-right: 10px
  height: 32px
  width: adaptive (min-width: 120px container, actual ~81px for "Sessions" text)
  border: 1px solid rgb(207, 214, 228) / #CFD6E4
  border-radius: 4px
  cursor: pointer
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 4px 0px
```

### 4.25 "...which has" Label

```
Selector: [data-test-id="funnel-steps-which-has-label-1"]
  Classes: text-medium bu-p-1 bu-mt-2 bu-mb-2
  Text: "...which has"
  color: rgb(51, 60, 72) / #333C48
  font-family: Inter
  font-size: 14px
  font-weight: 400
  line-height: 20px
  padding: 4px (all sides)
  margin-top: 8px
  margin-bottom: 8px
```

### 4.26 "+ Add property" Button

```
Selector: .cly-text-button
  Text: "+ Add property"
  color: rgb(1, 102, 214) / #0166D6
  font-family: Inter
  font-size: 13px
  font-weight: 500
  cursor: pointer
  display: inline-block
  text-align: center
```

### 4.27 "+ Add Condition" Button

```
Selector: [data-test-id="add-condition-button"]
  Classes: el-button bg-light-blue-100 bu-mt-5 text-small font-weight-bold color-blue-100 el-button--text
  Text: "+ Add Condition"
  color: rgb(1, 102, 214) / #0166D6
  font-family: Inter
  font-size: 12px
  font-weight: 500
  line-height: 18px
  background-color: rgb(225, 239, 255) / #E1EFFF
  padding: 8px 12px
  margin-top: 24px
  border-radius: 4px
  cursor: pointer
  width: 117px
  height: 34px
```

### 4.28 AND/OR Toggle -- AND Active State

```
Selector: .el-radio-button.is-active .el-radio-button__inner
  color: rgb(255, 255, 255) / #FFFFFF
  background-color: rgb(1, 102, 214) / #0166D6
  border: 1px solid rgb(1, 102, 214) / #0166D6
  border-radius: 4px (left side only for AND position)
  font-family: Inter
  font-size: 14px
  font-weight: 400
  line-height: 14px
  padding: 8px 12px
  cursor: pointer
  text-align: center
```

### 4.29 AND/OR Toggle -- OR Inactive State

```
Selector: .el-radio-button:not(.is-active) .el-radio-button__inner
  color: rgb(51, 60, 72) / #333C48
  background-color: rgb(255, 255, 255) / #FFFFFF
  border: 1px solid rgb(226, 228, 232) / #E2E4E8
  font-family: Inter
  font-size: 14px
  font-weight: 400
  line-height: 14px
  padding: 8px 12px
  cursor: pointer
  text-align: center
```

### 4.30 Footer

```
Selector: .cly-vue-drawer__footer
  height: 64px
  max-width: 700px
  padding-left: 250px
  padding-right: 250px
```

### 4.31 Footer Buttons Container

```
Selector: .cly-vue-drawer__buttons
  display: flex
  justify-content: flex-end
  margin: 16px
  height: 32px
  width: 668px
```

### 4.32 Cancel Button

```
Selector: .el-button--secondary.el-button--small
  Text: "Cancel"
  color: rgb(51, 60, 72) / #333C48
  font-family: Inter
  font-size: 14px
  font-weight: 400
  line-height: 14px
  background-color: rgb(246, 246, 246) / #F6F6F6
  border: 1px solid rgb(246, 246, 246) / #F6F6F6
  border-radius: 4px
  padding: 8px 12px
  height: 32px
  box-shadow: rgba(0, 0, 0, 0.047) 0px 2px 4px 0px
  cursor: pointer
```

### 4.33 Save Button -- Disabled State

```
Selector: .el-button--success.el-button--small.is-disabled
  Text: "New Funnel"
  color: rgb(255, 255, 255) / #FFFFFF
  font-family: Inter
  font-size: 14px
  font-weight: 400
  line-height: 14px
  background-color: rgb(18, 175, 81) / #12AF51
  border: 1px solid rgb(18, 175, 81) / #12AF51
  border-radius: 4px
  padding: 8px 12px
  margin-left: 8px
  height: 32px
  box-shadow: rgba(0, 0, 0, 0.047) 0px 2px 4px 0px
  opacity: 0.5
  cursor: not-allowed
```

### 4.34 Save Button -- Enabled State

```
Selector: .el-button--success.el-button--small:not(.is-disabled)
  Text: "New Funnel"
  color: rgb(255, 255, 255) / #FFFFFF
  font-family: Inter
  font-size: 14px
  font-weight: 400
  line-height: 14px
  background-color: rgb(18, 175, 81) / #12AF51
  border: 1px solid rgb(18, 175, 81) / #12AF51
  border-radius: 4px
  padding: 8px 12px
  margin-left: 8px
  height: 32px
  box-shadow: rgba(0, 0, 0, 0.047) 0px 2px 4px 0px
  opacity: 1
  cursor: pointer
```

---

## 5. State Transitions

### 5.1 Radio Card Selection (Funnel Type)

When clicking an unselected radio card, the selection toggles between "Session Independent" and "Same Session":

| Property | Becoming Selected | Becoming Unselected |
|----------|-------------------|---------------------|
| Card `border` | `1px solid #CFD6E4` -> `1px solid #0166D6` | `1px solid #0166D6` -> `1px solid #CFD6E4` |
| Radio inner `background-color` | `#FFFFFF` -> `#0166D6` | `#0166D6` -> `#FFFFFF` |
| Radio inner `border` | `1px solid #A7AEB8` -> `1px solid #0166D6` | `1px solid #0166D6` -> `1px solid #A7AEB8` |
| Card class | Add `is-checked` | Remove `is-checked` |
| Radio input class | Add `is-checked` | Remove `is-checked` |
| `aria-checked` | `"false"` -> `"true"` | `"true"` -> `"false"` |

**Default state**: Session Independent is selected.

### 5.2 AND/OR Toggle

The AND/OR toggle between funnel steps is a radio button group:

| State | AND Button | OR Button |
|-------|-----------|----------|
| **AND selected** (default) | bg: `#0166D6`, color: `#FFFFFF`, border: `#0166D6` | bg: `#FFFFFF`, color: `#333C48`, border: `#E2E4E8` |
| **OR selected** | bg: `#FFFFFF`, color: `#333C48`, border: `#E2E4E8` | bg: `#0166D6`, color: `#FFFFFF`, border: `#0166D6` |

**Default state**: AND is selected.

### 5.3 Save Button (New Funnel) Enable/Disable

| Property | Disabled (default) | Enabled |
|----------|-------------------|---------|
| `opacity` | `0.5` | `1` |
| `cursor` | `not-allowed` | `pointer` |
| Class | Has `is-disabled` | No `is-disabled` |
| `background-color` | `#12AF51` (unchanged) | `#12AF51` (unchanged) |
| `color` | `#FFFFFF` (unchanged) | `#FFFFFF` (unchanged) |

**Trigger**: The button becomes enabled when the funnel name input has a non-empty value.

### 5.4 Input Focus State

| Property | Default | Focused |
|----------|---------|---------|
| `border` | `1px solid #CFD6E4` | `1px solid #0166D6` |
| `background-color` | `#FBFDFE` | `#FBFDFE` (unchanged) |

---

## 6. Multi-Step Behavior

### 6.1 Adding Steps

When the "+ Add Condition" button is clicked:

1. A new step is appended below the last step with identical structure:
   - Drag handle icon (8x11px SVG)
   - Step label ("Step N" where N is sequential)
   - Event selector (defaults to Sessions / `[CLY]_session`)
   - "...which has" label
   - "+ Add property" button
2. An AND/OR toggle appears between each adjacent pair of steps
3. Each step (when 2+ steps exist) gains a delete button (X icon) on the right side of the event selector row
4. Steps are numbered sequentially: Step 1, Step 2, Step 3...

### 6.2 Deleting Steps

- Delete button (X icon) appears on the right side of the step's event selector row
- Only visible when there are 2 or more steps
- Clicking removes that step and renumbers remaining steps
- The AND/OR toggle between adjacent steps adjusts accordingly
- If only 1 step remains after deletion, all delete buttons are hidden

### 6.3 Reordering Steps

- Drag-and-drop is enabled via `allow-step-reordering="true"` on `.cly-vue-qb-steps`
- Each step has a `.drag-handler` element with a grip icon (`images/drill/drag-icon.svg`)
- Dragging a step repositions it in the sequence
- Step labels are renumbered after reordering (always "Step 1", "Step 2", etc.)
- AND/OR toggles remain between each pair of steps

### 6.4 Default AND/OR Value

When a new step is added, the AND/OR toggle between the new step and its predecessor defaults to **AND**.

---

## 7. Event Type Selector

### 7.1 Dropdown Structure

The event selector dropdown renders as a body-level popper with the following classes:
```
.el-select-dropdown.el-popper.cly-vue-dropdown__pop.cly-event-select
```

**Trigger behavior**: Clicking the event selector trigger (e.g., showing "Sessions") opens the dropdown.

**Layout**:
- Top section: 9 radio button tabs for event type categories
- Bottom section: Listbox of events matching the selected tab
- Search box available within the dropdown (hidden for single-option tabs)

### 7.2 Event Type Tabs (9 Tabs)

| # | Tab Label | Value | Events |
|---|-----------|-------|--------|
| 1 | Sessions | `[CLY]_session` | Sessions (single item, auto-select) |
| 2 | Events | `event` | Comment Added, Feature Used, File Uploaded, Integration Connected, Project Archived, Project Created, Task Completed, Task Created, Task Updated |
| 3 | View | `[CLY]_view` | View (single item, auto-select) |
| 4 | Feedback | `feedback` | Ratings, NPS, Surveys |
| 5 | LLM Observability | `llm` | LLM Interaction, LLM Interaction Feedback, LLM Tool Used, LLM Tool Usage Parameter |
| 6 | Consent | `[CLY]_consent` | Consent (single item, auto-select) |
| 7 | Crash | `[CLY]_crash` | Crash (single item, auto-select) |
| 8 | Push Actioned | `[CLY]_push_action` | Push action (single item, auto-select) |
| 9 | Journey | `Journey` | Journey Started, Journey Ended, Content Views, Content Interactions |

### 7.3 Auto-Select Behavior

For tabs with only a single event option (Sessions, View, Consent, Crash, Push Actioned), selecting the tab automatically selects the event and closes the dropdown. No search box is shown for these tabs.

### 7.4 Event Selector Sizing

```
Event selector trigger:
  min-width: 120px (container)
  width: adaptive based on selected event text
  height: 32px

Event selector wrapper:
  width: 165px (default container)

Dropdown popper:
  display: none (when closed)
  display: block (when open, positioned via Popper.js)
```

---

## 8. Implementation Notes

### 8.1 Framework & Dependencies

- **Vue.js** component architecture (Countly uses Vue 2.x with Element UI)
- **Element UI** components used:
  - `el-input` for text inputs
  - `el-radio` with `.is-bordered` for radio cards
  - `el-radio-button` for AND/OR toggle
  - `el-button` for action buttons
  - `el-select` / `el-select-dropdown` for event selector
- **Bulma utilities** (prefixed `bu-`) for spacing and layout:
  - `bu-mt-2` = margin-top: 8px
  - `bu-mt-5` = margin-top: 24px
  - `bu-mb-1` = margin-bottom: 4px
  - `bu-mb-5` = margin-bottom: 24px
  - `bu-p-1` = padding: 4px
  - `bu-px-1` = padding-left: 4px, padding-right: 4px
  - `bu-pb-1` = padding-bottom: 4px
  - `bu-ml-3` = margin-left: 12px
  - `bu-mr-3` = margin-right: 12px
  - `bu-columns`, `bu-is-gapless`, `bu-is-mobile`, `bu-is-centered` = Bulma grid
  - `bu-column`, `bu-is-12` = full-width column
  - `bu-is-flex` = display: flex
  - `bu-is-justify-content-flex-end` = justify-content: flex-end

### 8.2 Custom CSS Classes

| Class | Purpose |
|-------|---------|
| `cly-vue-drawer` | Root drawer container |
| `cly-vue-drawer--full-screen` | Full-screen variant |
| `cly-vue-drawer__steps-view` | White background panel |
| `cly-vue-drawer__steps-container` | Centered content column with horizontal padding |
| `cly-vue-drawer__body-container` | Body wrapper with margin |
| `cly-vue-drawer__close-button` | X close button in top-right |
| `cly-vue-drawer__footer` | Footer bar |
| `cly-vue-drawer__buttons` | Button group in footer |
| `cly-vue-drawer-step__section` | Each form section |
| `cly-vue-drawer-step__line--aligned` | Flex row for radio cards |
| `cly-vue-qb-steps` | Step builder container |
| `cly-vue-qb-steps__step` | Individual step |
| `cly-vue-qb-steps__row` | Step row wrapper |
| `cly-vue-qb-steps__row-selects` | Gray background bar for selects |
| `cly-vue-qb-seg` | Property filter segment |
| `cly-vue-content` | Content wrapper |
| `cly-text-button` | Inline text-style button |
| `cly-event-select` | Event selector component |
| `cly-vue-dropdown` | Dropdown wrapper |
| `cly-vue-select-x` | Extended select component |
| `cly-input-dropdown-trigger` | Dropdown trigger input area |
| `drag-handler` | Drag handle for step reordering |

### 8.3 Typography Classes

| Class | Properties |
|-------|-----------|
| `text-medium` | font-size: 14px |
| `text-small` | font-size: 12px |
| `text-big` | font-size: 16px |
| `text-normal` | font-size: 14px |
| `text-heading` | Heading style modifier |
| `font-weighted-bold` | font-weight: 500 |
| `font-weight-bold` | font-weight: 500 |
| `color-cool-gray-100` | color: #333C48 |
| `color-cool-gray-50` | color: #81868D |
| `color-gool-gray-100` | color: #333C48 (note: likely typo in source, "gool" vs "cool") |
| `color-blue-100` | color: #0166D6 |
| `bg-light-blue-100` | background-color: #E1EFFF |

### 8.4 Data Test IDs

All interactive elements include `data-test-id` attributes for automated testing:

| Test ID | Element |
|---------|---------|
| `funnel-name-label` | Funnel Name label |
| `funnel-name-input` | Funnel Name input field |
| `funnel-description-label` | Funnel Description label |
| `funnel-description-input` | Funnel Description input field |
| `funnel-type-label` | Funnel Type section label |
| `funnel-type-session-independent-el-radio-wrapper` | Session Independent radio card wrapper |
| `funnel-type-session-independent-el-radio` | Session Independent radio input wrapper |
| `funnel-type-session-independent-el-radio-button` | Session Independent radio input |
| `funnel-type-session-independent-el-radio-label` | Session Independent radio label |
| `funnel-type-radio-button-title-label-session-independent` | Session Independent title text |
| `funnel-type-radio-button-description-label-session-independent` | Session Independent description |
| `funnel-type-same-session-el-radio-wrapper` | Same Session radio card wrapper |
| `funnel-type-same-session-el-radio` | Same Session radio input wrapper |
| `funnel-type-same-session-el-radio-button` | Same Session radio input |
| `funnel-type-same-session-el-radio-label` | Same Session radio label |
| `funnel-type-radio-button-title-label-same-session` | Same Session title text |
| `funnel-type-radio-button-description-label-same-session` | Same Session description |
| `funnel-steps-label` | Funnel Steps section label |
| `funnel-steps-drag-icon-{N}` | Drag handle for step N (0-indexed) |
| `funnel-steps-label-step-{N}` | Step label for step N (1-indexed) |
| `funnel-steps-step-sessions-{N}-dropdown-el-select` | Event selector dropdown for step N |
| `funnel-steps-step-sessions-{N}-pseudo-input` | Hidden input in event selector |
| `funnel-steps-step-sessions-{N}-pseudo-input-label` | Visible label in event selector |
| `funnel-steps-which-has-label-{N}` | "...which has" label for step N |
| `funnel-steps-step-{N}-add-property-button` | "+ Add property" button for step N |
| `add-condition-button` | "+ Add Condition" button |
| `drawer-test-id-cancel-button` | Cancel button |
| `drawer-test-id-save-button` | Save / New Funnel button |

### 8.5 Icons

| Icon | Source | Size | Usage |
|------|--------|------|-------|
| Close (X) | `ion-ios-close-empty` (Ionicons) | 30px font-size, 11.25x36px | Drawer close button |
| Drag handle | `images/drill/drag-icon.svg` | 8x11px | Step reordering grip |
| Delete step (X) | Element UI icon | — | Remove step (visible with 2+ steps) |

### 8.6 Layout Constants

| Constant | Value | Purpose |
|----------|-------|---------|
| Drawer width | 1200px | Fixed drawer width |
| Drawer height | 948px | Fixed drawer height |
| Content max-width | 700px | Steps container max-width |
| Horizontal padding | 250px each side | Centers 668px content within 1200px |
| Content width | 668px | Effective content area (700px - 2x16px margin) |
| Footer height | 64px | Fixed footer height |
| Body height | 838px | Steps container height (948px - header - footer) |
| Radio card width | 329px | Each radio card in the type section |
| Radio card height | 78px | Each radio card in the type section |
| Radio card gap | 10px | Margin-left on second radio card |
| Step row width | 620px | Row selects area (636px - 16px padding) |

### 8.7 Accessibility

- Radio cards use `role="radio"` and `aria-checked` attributes
- Radio inputs use `aria-hidden="true"` with `tabindex="-1"` (keyboard via wrapper label)
- Radio card wrappers are focusable with `tabindex="0"`
- Event selector uses `role="listbox"` in dropdown with `role="option"` for items
- All interactive elements have descriptive `data-test-id` attributes

### 8.8 Validation Rules

| Field | Required | Validation |
|-------|----------|-----------|
| Funnel Name | Yes | Non-empty string enables Save button |
| Funnel Description | No | Optional text field |
| Funnel Type | Yes | Radio selection (default: Session Independent) |
| Funnel Steps | Yes | At least 1 step with an event selected (Step 1 defaults to Sessions) |

### 8.9 Z-Index & Layering

- Drawer container: `position: fixed` (stacks above page content)
- Steps view: `position: absolute` within drawer
- Event selector dropdown: Body-level popper (rendered outside drawer DOM, positioned via Popper.js)
- Close button: Positioned top-right within the drawer

---

## 9. Appendix: Bulma Utility Reference

The `bu-` prefixed classes follow a spacing scale:

| Suffix | Value |
|--------|-------|
| `-1` | 4px |
| `-2` | 8px |
| `-3` | 12px |
| `-4` | 16px |
| `-5` | 24px |
| `-6` | 48px |

Directional modifiers:
- `m` = margin, `p` = padding
- `t` = top, `b` = bottom, `l` = left, `r` = right, `x` = horizontal, `y` = vertical
