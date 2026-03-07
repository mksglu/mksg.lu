# Countly A/B Testing Plugin — Drawer PRD

**Version:** 1.0
**Date:** 2026-02-27
**Plugin:** A/B Testing
**URL:** `http://mert.count.ly/dashboard#/6908ab02fece9ef06eca7285/ab-testing`

---

## Table of Contents

1. [Scope & Context](#1-scope--context)
2. [Component Hierarchy](#2-component-hierarchy)
3. [HTML Structure & Class Names](#3-html-structure--class-names)
4. [Design Tokens](#4-design-tokens)
5. [Form Fields](#5-form-fields)
6. [State Transitions](#6-state-transitions)
7. [Element UI Components](#7-element-ui-components)
8. [Countly Custom Components](#8-countly-custom-components)
9. [Multi-Step Wizard](#9-multi-step-wizard)
10. [Implementation Notes](#10-implementation-notes)

---

## 1. Scope & Context

| Property | Value |
|---|---|
| Plugin | A/B Testing |
| Drawer Title | "Create new experiment" |
| Drawer Type | `cly-vue-drawer` — multi-step wizard |
| Number of Steps | 4 |
| Step Labels | Basics → Targeting → Goals → Variants |
| URL | `http://mert.count.ly/dashboard#/6908ab02fece9ef06eca7285/ab-testing` |
| Root Component | `cly-vue-ab-testing-drawer` |

**Purpose:** A right-side drawer that guides users through a 4-step wizard to create a new A/B testing experiment. The wizard collects experiment metadata (name, description, expiration), targeting/segmentation rules, experiment goals, and variant definitions.

---

## 2. Component Hierarchy

```
cly-vue-ab-testing-drawer
└── cly-vue-drawer (multi-step)
    ├── HEADER
    │   ├── cly-vue-drawer__title-container
    │   │   ├── h3.cly-vue-drawer__title-header  [ab-testing-header-title]
    │   │   │   "Create new experiment"
    │   │   └── div.cly-vue-drawer__close-button  [ab-testing-close-button]
    │   │       └── i.ion-ios-close-empty
    │   └── div.cly-vue-drawer__subtitle (subtitle row, optional)
    │
    ├── STEP NAVIGATION BAR  [ab-testing-steps-header-container]
    │   ├── STEP 1  [ab-testing-step-1-label]
    │   │   ├── div.cly-vue-drawer__step-sign  [ab-testing-step-sign-container]
    │   │   │   ├── div.cly-vue-drawer__step-sign  [ab-testing-step-sign]
    │   │   │   │   └── span  [ab-testing-current-step-index-1]  "1"
    │   │   │   └── div  [ab-testing-current-step-index-img-container1]
    │   │   │       └── img (check-icon.svg)  [ab-testing-step-1]
    │   │   ├── div.cly-vue-drawer__step-title  [ab-testing-basics-label]  "Basics"
    │   │   └── div.cly-vue-drawer__step-separator  [ab-testing-seperator-0]
    │   │
    │   ├── STEP 2  [ab-testing-step-2-label]  .is-locked
    │   │   ├── div.cly-vue-drawer__step-sign  [ab-testing-step-sign-container]
    │   │   │   ├── div.cly-vue-drawer__step-sign  [ab-testing-step-sign]
    │   │   │   │   └── span  [ab-testing-current-step-index-2]  "2"
    │   │   │   └── div  [ab-testing-current-step-index-img-container2]
    │   │   │       └── img (check-icon.svg)  [ab-testing-step-2]
    │   │   ├── div.cly-vue-drawer__step-title  [ab-testing-targeting-label]  "Targeting"
    │   │   └── div.cly-vue-drawer__step-separator  [ab-testing-seperator-1]
    │   │
    │   ├── STEP 3  [ab-testing-step-3-label]  .is-locked
    │   │   ├── div.cly-vue-drawer__step-sign  [ab-testing-step-sign-container]
    │   │   │   ├── div.cly-vue-drawer__step-sign  [ab-testing-step-sign]
    │   │   │   │   └── span  [ab-testing-current-step-index-3]  "3"
    │   │   │   └── div  [ab-testing-current-step-index-img-container3]
    │   │   │       └── img (check-icon.svg)  [ab-testing-step-3]
    │   │   ├── div.cly-vue-drawer__step-title  [ab-testing-goals-label]  "Goals"
    │   │   └── div.cly-vue-drawer__step-separator  [ab-testing-seperator-2]
    │   │
    │   └── STEP 4  [ab-testing-step-4-label]  .is-locked
    │       ├── div.cly-vue-drawer__step-sign  [ab-testing-step-sign-container]
    │       │   ├── div.cly-vue-drawer__step-sign  [ab-testing-step-sign]
    │       │   │   └── span  [ab-testing-current-step-index-4]  "4"
    │       │   └── div  [ab-testing-current-step-index-img-container4]
    │       │       └── img (check-icon.svg)  [ab-testing-step-4]
    │       └── div.cly-vue-drawer__step-title  [ab-testing-variants-label]  "Variants"
    │
    └── BODY (cly-vue-drawer__steps-container.is-multi-step)
        ├── div.scroll-shadow-container
        ├── STEP 1 CONTENT  #cly-cmp-2970-step1  .cly-vue-content
        │   ├── FIELD: Experiment Name
        │   ├── FIELD: Experiment Description
        │   └── SECTION: Expiration
        │       ├── RADIO: Manually (value=0)  [checked by default]
        │       ├── RADIO: Expiration day (value=1)
        │       ├── RADIO: Target improvement rate (value=2)
        │       └── RADIO: Both (value=3)
        │
        ├── STEP 2 CONTENT  .cly-vue-content
        │   └── SECTION: Target Users
        │       ├── el-switch (Use Target Users toggle)
        │       └── cly-vue-qb-seg (query builder / segmentation)
        │           └── Property row  (cly-vue-qb-seg__row)
        │               └── cly-vue-dropdown (Property Selector)
        │                   ├── Search Box
        │                   └── el-tabs (All Properties | Event | User | Custom | Campaign)
        │                       └── cly-vue-listbox (property items)
        │
        ├── STEP 3 CONTENT  .cly-vue-content
        │   └── [Goals configuration — not fully rendered in snapshot]
        │
        └── STEP 4 CONTENT  .cly-vue-content
            └── [Variants configuration — not fully rendered in snapshot]
```

---

## 3. HTML Structure & Class Names

### 3.1 Drawer Root

```html
<div class="cly-vue-ab-testing-drawer">
  <!-- cly-vue-drawer renders inside -->
</div>
```

### 3.2 Drawer Header

```html
<div class="cly-vue-drawer__title-container">
  <h3
    data-test-id="ab-testing-header-title"
    class="cly-vue-drawer__title-header"
  >
    Create new experiment
  </h3>
  <div
    data-test-id="ab-testing-close-button"
    class="cly-vue-drawer__close-button"
  >
    <i class="ion-ios-close-empty"></i>
  </div>
</div>
```

### 3.3 Step Navigation Bar

```html
<div
  data-test-id="ab-testing-steps-header-container"
  class="cly-vue-drawer__steps-header"
>

  <!-- STEP 1: Basics (active / complete) -->
  <div data-test-id="ab-testing-step-1-label" class="cly-vue-drawer__step-label">
    <div data-test-id="ab-testing-step-sign-container" class="bu-is-flex">
      <div data-test-id="ab-testing-step-sign" class="cly-vue-drawer__step-sign">
        <span data-test-id="ab-testing-current-step-index-1">1</span>
      </div>
      <div data-test-id="ab-testing-current-step-index-img-container1">
        <img data-test-id="ab-testing-step-1" src="images/icons/check-icon.svg" />
      </div>
    </div>
    <div
      data-test-id="ab-testing-basics-label"
      class="cly-vue-drawer__step-title text-small font-weight-bold color-cool-gray-40"
    >
      Basics
    </div>
  </div>

  <!-- Separator -->
  <div data-test-id="ab-testing-seperator-0" class="cly-vue-drawer__step-separator"></div>

  <!-- STEP 2: Targeting (locked) -->
  <div data-test-id="ab-testing-step-2-label" class="cly-vue-drawer__step-label is-locked">
    <div data-test-id="ab-testing-step-sign-container" class="bu-is-flex">
      <div data-test-id="ab-testing-step-sign" class="cly-vue-drawer__step-sign">
        <span data-test-id="ab-testing-current-step-index-2">2</span>
      </div>
      <div data-test-id="ab-testing-current-step-index-img-container2">
        <img data-test-id="ab-testing-step-2" src="images/icons/check-icon.svg" />
      </div>
    </div>
    <div
      data-test-id="ab-testing-targeting-label"
      class="cly-vue-drawer__step-title text-small font-weight-bold color-cool-gray-40"
    >
      Targeting
    </div>
  </div>

  <!-- Separator -->
  <div data-test-id="ab-testing-seperator-1" class="cly-vue-drawer__step-separator"></div>

  <!-- STEP 3: Goals (locked) -->
  <div data-test-id="ab-testing-step-3-label" class="cly-vue-drawer__step-label is-locked">
    <div data-test-id="ab-testing-step-sign-container" class="bu-is-flex">
      <div data-test-id="ab-testing-step-sign" class="cly-vue-drawer__step-sign">
        <span data-test-id="ab-testing-current-step-index-3">3</span>
      </div>
      <div data-test-id="ab-testing-current-step-index-img-container3">
        <img data-test-id="ab-testing-step-3" src="images/icons/check-icon.svg" />
      </div>
    </div>
    <div
      data-test-id="ab-testing-goals-label"
      class="cly-vue-drawer__step-title text-small font-weight-bold color-cool-gray-40"
    >
      Goals
    </div>
  </div>

  <!-- Separator -->
  <div data-test-id="ab-testing-seperator-2" class="cly-vue-drawer__step-separator"></div>

  <!-- STEP 4: Variants (locked) -->
  <div data-test-id="ab-testing-step-4-label" class="cly-vue-drawer__step-label is-locked">
    <div data-test-id="ab-testing-step-sign-container" class="bu-is-flex">
      <div data-test-id="ab-testing-step-sign" class="cly-vue-drawer__step-sign">
        <span data-test-id="ab-testing-current-step-index-4">4</span>
      </div>
      <div data-test-id="ab-testing-current-step-index-img-container4">
        <img data-test-id="ab-testing-step-4" src="images/icons/check-icon.svg" />
      </div>
    </div>
    <div
      data-test-id="ab-testing-variants-label"
      class="cly-vue-drawer__step-title text-small font-weight-bold color-cool-gray-40"
    >
      Variants
    </div>
  </div>

</div>
```

### 3.4 Drawer Body Container

```html
<div class="cly-vue-drawer__steps-container is-multi-step">
  <div class="scroll-shadow-container"></div>
  <div class="bu-columns bu-is-gapless bu-is-mobile cly-vue-drawer__body-container bu-pb-5 bu-pt-4 bu-mb-2 bu-mt-1">
    <div class="bu-column bu-is-12">
      <!-- Step content panels rendered here -->
    </div>
  </div>
</div>
```

### 3.5 Step 1: Basics — Experiment Name Field

```html
<div
  class="cly-vue-form-field cly-vue-form-step__section"
  name="name"
  rules="required"
>
  <div class="bu-is-flex bu-is-justify-content-space-between bu-mr-2">
    <div
      data-test-id="experiment-name-label-header"
      class="font-weight-bold text-smallish bu-mb-2"
    >
      Experiment Name
    </div>
    <div class="text-small text-heading color-cool-gray-40">Optional</div>
  </div>
  <form>
    <span>
      <div class="cly-vue-form-field__inner el-form-item">
        <div class="el-input">
          <input
            data-test-id="experiment-name-input"
            type="text"
            autocomplete="off"
            placeholder="Enter Experiment Name"
            class="el-input__inner"
          />
        </div>
      </div>
    </span>
  </form>
</div>
```

### 3.6 Step 1: Basics — Experiment Description Field

```html
<div
  class="cly-vue-form-field cly-vue-form-step__section"
  name="description"
>
  <div class="bu-is-flex bu-is-justify-content-space-between bu-mr-2">
    <div
      data-test-id="experiment-description-label-header"
      class="font-weight-bold text-smallish bu-mb-2"
    >
      Experiment Description
    </div>
    <div class="text-small text-heading color-cool-gray-40">Optional</div>
  </div>
  <form>
    <div class="cly-vue-form-field__inner el-form-item">
      <div class="el-textarea">
        <textarea
          autocomplete="off"
          rows="3"
          data-test-id="experiment-description-input"
          placeholder="Enter Experiment Description"
          class="el-textarea__inner"
        ></textarea>
      </div>
    </div>
  </form>
</div>
```

### 3.7 Step 1: Basics — Expiration Section

```html
<div class="bu-mt-5">
  <span
    data-test-id="expiration-checkbox-label"
    class="text-big font-weight-bold"
  >
    Expiration
    <i
      class="bu-is-flex-grow-1 cly-vue-tooltip-icon ion ion-help-circled has-tooltip"
      data-original-title="null"
      data-test-id="expiration-checkbox-tooltip"
    ></i>
  </span>

  <!-- RADIO: Manually (value=0, checked by default) -->
  <div class="bu-mt-2">
    <label
      data-test-id="expiration-manually-el-radio-wrapper"
      role="radio"
      aria-checked="true"
      tabindex="0"
      class="el-radio is-autosized is-multiline bu-px-3 is-bordered is-checked"
    >
      <span
        data-test-id="expiration-manually-el-radio"
        class="el-radio__input is-checked"
      >
        <span class="el-radio__inner"></span>
        <input
          data-test-id="expiration-manually-el-radio-button"
          type="radio"
          aria-hidden="true"
          tabindex="-1"
          class="el-radio__original"
          value="0"
        />
      </span>
      <span
        data-test-id="expiration-manually-el-radio-label"
        class="el-radio__label"
      >
        <div data-test-id="expiration-manually-title">Manually</div>
        <div
          data-test-id="expiration-manually-description"
          class="text-small bu-has-text-grey bu-mt-1 radio-description"
        >
          Stop the experiment manually whenever you choose
        </div>
      </span>
    </label>
  </div>

  <!-- RADIO: Expiration day (value=1) -->
  <div class="bu-mt-2">
    <label
      data-test-id="expiration-expiration-day-el-radio-wrapper"
      role="radio"
      tabindex="0"
      class="el-radio is-autosized is-multiline bu-px-3 is-bordered"
    >
      <span
        data-test-id="expiration-expiration-day-el-radio"
        class="el-radio__input"
      >
        <span class="el-radio__inner"></span>
        <input
          data-test-id="expiration-expiration-day-el-radio-button"
          type="radio"
          aria-hidden="true"
          tabindex="-1"
          class="el-radio__original"
          value="1"
        />
      </span>
      <span
        data-test-id="expiration-expiration-day-el-radio-label"
        class="el-radio__label"
      >
        <div data-test-id="expiration-expiration-day-title">Expiration day</div>
        <div
          data-test-id="expiration-expiration-day-description"
          class="text-small bu-has-text-grey bu-mt-1 radio-description"
        >
          Set a specific date to automatically stop the experiment
        </div>
      </span>
    </label>
  </div>

  <!-- RADIO: Target improvement rate (value=2) -->
  <div class="bu-mt-2">
    <label
      data-test-id="expiration-target-improvement-rate-el-radio-wrapper"
      role="radio"
      tabindex="0"
      class="el-radio is-autosized is-multiline bu-px-3 is-bordered"
    >
      <span
        data-test-id="expiration-target-improvement-rate-el-radio"
        class="el-radio__input"
      >
        <span class="el-radio__inner"></span>
        <input
          data-test-id="expiration-target-improvement-rate-el-radio-button"
          type="radio"
          aria-hidden="true"
          tabindex="-1"
          class="el-radio__original"
          value="2"
        />
      </span>
      <span
        data-test-id="expiration-target-improvement-rate-el-radio-label"
        class="el-radio__label"
      >
        <div data-test-id="expiration-target-improvement-rate-title">
          Target improvement rate
        </div>
        <div
          data-test-id="expiration-target-improvement-rate-description"
          class="text-small bu-has-text-grey bu-mt-1 radio-description"
        >
          Stop the experiment when a variant achieves the target rate
        </div>
      </span>
    </label>
  </div>

  <!-- RADIO: Both expiration day and target improvement rate (value=3) -->
  <div class="bu-mt-2">
    <label
      data-test-id="expiration-both-expiration-day-and-target-improvement-rate-el-radio-wrapper"
      role="radio"
      tabindex="0"
      class="el-radio is-autosized is-multiline bu-px-3 is-bordered"
    >
      <span
        data-test-id="expiration-both-expiration-day-and-target-improvement-rate-el-radio"
        class="el-radio__input"
      >
        <span class="el-radio__inner"></span>
        <input
          data-test-id="expiration-both-expiration-day-and-target-improvement-rate-el-radio-button"
          type="radio"
          aria-hidden="true"
          tabindex="-1"
          class="el-radio__original"
          value="3"
        />
      </span>
      <span
        data-test-id="expiration-both-expiration-day-and-target-improvement-rate-el-radio-label"
        class="el-radio__label"
      >
        <div data-test-id="expiration-both-expiration-day-and-target-improvement-rate-title">
          Both expiration day and target improvement rate
        </div>
        <div
          data-test-id="expiration-both-expiration-day-and-target-improvement-rate-description"
          class="text-small bu-has-text-grey bu-mt-1 radio-description"
        >
          Stop the experiment when a variant reaches the target
        </div>
      </span>
    </label>
  </div>
</div>
```

### 3.8 Step 2: Targeting — Target Users Section

```html
<div class="cly-vue-form-step__auto-group bu-mb-4">
  <div class="cly-vue-form-step__section-group cly-vue-form-step__section-group--filled">

    <!-- Section Header: Target Users -->
    <div class="bu-level bu-mb-1">
      <div class="bu-level bu-level-left">
        <div
          data-test-id="target-users-label"
          class="text-small font-weight-bold"
        >
          TARGET USERS
        </div>
        <i
          class="bu-is-flex-grow-1 bu-ml-2 cly-vue-tooltip-icon ion ion-help-circled has-tooltip"
          data-original-title="null"
          data-test-id="target-users-tooltip"
        ></i>
      </div>
      <div class="bu-level bu-level-right">
        <!-- Toggle switch -->
        <div
          role="switch"
          aria-checked="true"
          data-test-id="use-target-users-el-switch-wrapper"
          class="el-switch is-checked"
        >
          <input
            type="checkbox"
            name=""
            data-test-id="use-target-users-el-switch-input"
            true-value="true"
            class="el-switch__input"
          />
          <span
            data-test-id="use-target-users-el-switch-core"
            class="el-switch__core"
          ></span>
        </div>
        <span
          data-test-id="use-target-users-checkbox-label"
          class="text-small text-heading color-cool-gray-40 bu-mb-0 bu-ml-1"
        >
          Use Target Users
        </span>
      </div>
    </div>

    <!-- Segmentation / Query Builder -->
    <div class="cly-vue-form-field cly-vue-form-step__section">
      <div class="bu-is-flex bu-is-justify-content-space-between bu-mr-2">
        <div class="text-small text-heading color-cool-gray-40">Optional</div>
      </div>
      <form>
        <div class="cly-vue-form-field__inner el-form-item">
          <div class="bu-py-2">
            <div class="cly-vue-qb-seg">
              <span>
                <div class="bu-columns bu-is-gapless bu-is-multiline">
                  <div
                    element-loading-text="Loading..."
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0.8)"
                    class="bu-column bu-is-12"
                  >
                    <!-- Query builder row -->
                    <div class="bu-columns bu-is-gapless bu-is-mobile cly-vue-qb-seg__row cly-vue-qb-seg__row--first cly-vue-qb-seg__row--last">
                      <div class="bu-column bu-is-12">
                        <div class="bu-columns bu-is-gapless bu-is-mobile cly-vue-qb-seg__row-selects">

                          <!-- Property Selector (Column 4) -->
                          <div class="bu-column bu-is-4">
                            <span>
                              <div
                                data-test-id="target-users-drawer-property-select-property-dropdown-0-dropdown-el-select"
                                class="cly-vue-dropdown el-select cly-vue-select-x"
                                placeholder="Select Property"
                              >
                                <div>
                                  <div
                                    class="cly-input-dropdown-trigger el-input el-input--suffix is-arrow"
                                    size=""
                                    min-width="-1"
                                    max-width="-1"
                                  >
                                    <input
                                      data-test-id="target-users-drawer-property-select-property-dropdown-0"
                                      type="text"
                                      readonly="readonly"
                                      autocomplete="off"
                                      placeholder="Select Property"
                                      min-width="-1"
                                      max-width="-1"
                                      class="el-input__inner"
                                    />
                                    <span class="el-input__suffix">
                                      <span class="el-input__suffix-inner">
                                        <i class="el-select__caret ion-arrow-up-b"></i>
                                      </span>
                                    </span>
                                  </div>
                                </div>

                                <!-- Dropdown Popup -->
                                <div class="el-select-dropdown el-popper cly-vue-dropdown__pop">
                                  <div class="cly-vue-dropdown__pop-container">
                                    <div class="cly-vue-select-x__pop">

                                      <!-- Search Box -->
                                      <div class="cly-vue-select-x__header">
                                        <div class="bu-level">
                                          <div class="bu-level-item">
                                            <div class="el-input el-input--prefix">
                                              <input
                                                data-test-id="target-users-drawer-property-select-property-dropdown-0-search-box"
                                                type="text"
                                                autocomplete="off"
                                                placeholder="Search in Properties"
                                                class="el-input__inner"
                                              />
                                              <span class="el-input__prefix">
                                                <i
                                                  data-test-id="target-users-drawer-property-select-property-dropdown-0-search-icon"
                                                  class="el-input__icon el-icon-search"
                                                ></i>
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <!-- Tabs -->
                                      <div class="el-tabs el-tabs--top">
                                        <div class="el-tabs__header is-top">
                                          <div class="el-tabs__nav-wrap is-top">
                                            <div class="el-tabs__nav-scroll">
                                              <div role="tablist" class="el-tabs__nav is-top">
                                                <div class="el-tabs__active-bar is-top"></div>
                                                <div
                                                  id="tab-__all"
                                                  aria-controls="pane-__all"
                                                  role="tab"
                                                  tabindex="0"
                                                  class="el-tabs__item is-top is-active"
                                                  aria-selected="true"
                                                >
                                                  <span data-test-id="target-users-drawer-property-select-property-dropdown-0-el-tab-all-properties">
                                                    All Properties
                                                  </span>
                                                </div>
                                                <div
                                                  id="tab-Event"
                                                  aria-controls="pane-Event"
                                                  role="tab"
                                                  tabindex="-1"
                                                  class="el-tabs__item is-top"
                                                >
                                                  <span data-test-id="target-users-drawer-property-select-property-dropdown-0-el-tab-event">
                                                    Event
                                                  </span>
                                                </div>
                                                <div
                                                  id="tab-User"
                                                  aria-controls="pane-User"
                                                  role="tab"
                                                  tabindex="-1"
                                                  class="el-tabs__item is-top"
                                                >
                                                  <span data-test-id="target-users-drawer-property-select-property-dropdown-0-el-tab-user">
                                                    User
                                                  </span>
                                                </div>
                                                <div
                                                  id="tab-Custom"
                                                  aria-controls="pane-Custom"
                                                  role="tab"
                                                  tabindex="-1"
                                                  class="el-tabs__item is-top"
                                                >
                                                  <span data-test-id="target-users-drawer-property-select-property-dropdown-0-el-tab-custom">
                                                    Custom
                                                  </span>
                                                </div>
                                                <div
                                                  id="tab-Campaign"
                                                  aria-controls="pane-Campaign"
                                                  role="tab"
                                                  tabindex="-1"
                                                  class="el-tabs__item is-top"
                                                >
                                                  <span data-test-id="target-users-drawer-property-select-property-dropdown-0-el-tab-campaign">
                                                    Campaign
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <!-- Listbox Items (cly-vue-listbox) -->
                                        <!-- Items use class="text-medium font-weight-bold cly-vue-listbox__item" -->
                                        <!-- Each item: cly-vue-listbox__item-content > cly-vue-listbox__item-label -->
                                      </div>

                                    </div>
                                  </div>
                                </div>
                              </div>
                            </span>
                          </div>
                          <!-- Operator and Value selectors (columns 4+4) omitted from snapshot -->

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>

  </div>
</div>
```

### 3.9 Property Listbox Items (All Properties Tab)

Each property item has the following structure:

```html
<div
  tabindex="0"
  class="text-medium font-weight-bold cly-vue-listbox__item"
>
  <div
    data-test-id="target-users-drawer-property-select-property-dropdown-0-item"
    class="cly-vue-listbox__item-content"
  >
    <div class="bu-level">
      <div class="bu-level-left">
        <div class="cly-vue-listbox__item-prefix bu-mr-1"></div>
        <div
          data-test-id="target-users-drawer-property-select-property-dropdown-0-item-{property-key}"
          class="cly-vue-listbox__item-label has-tooltip"
          data-original-title="null"
        >
          {Property Display Name}
        </div>
      </div>
      <div class="bu-level-right"></div>
    </div>
  </div>
</div>
```

---

## 4. Design Tokens

### 4.1 Colors (from class names)

| Token Class | Role | Usage |
|---|---|---|
| `color-cool-gray-40` | Secondary / muted text | Step labels, optional badges, toggle label |
| `color-white` | White background/text | Active step sign background |
| `bu-has-text-grey` | Grey text | Radio description text |

### 4.2 Typography

| Class | Size Role | Usage |
|---|---|---|
| `text-big` | Large heading | Expiration section header |
| `text-small` | Small text | Step labels, target users label, radio descriptions |
| `text-smallish` | Slightly larger than small | Field labels (Experiment Name, Description) |
| `text-medium` | Medium body | Property listbox items |
| `text-heading` | Heading style | Optional badge, toggle label |
| `font-weight-bold` | Bold weight | Field labels, step titles, listbox items |

### 4.3 Spacing (Bulma utilities)

| Class | Value |
|---|---|
| `bu-mb-0` | margin-bottom: 0 |
| `bu-mb-1` | margin-bottom: 0.25rem |
| `bu-mb-2` | margin-bottom: 0.5rem |
| `bu-mb-4` | margin-bottom: 1rem |
| `bu-mb-5` | margin-bottom: 1.5rem |
| `bu-mt-1` | margin-top: 0.25rem |
| `bu-mt-2` | margin-top: 0.5rem |
| `bu-mt-5` | margin-top: 1.5rem |
| `bu-ml-1` | margin-left: 0.25rem |
| `bu-ml-2` | margin-left: 0.5rem |
| `bu-mr-1` | margin-right: 0.25rem |
| `bu-mr-2` | margin-right: 0.5rem |
| `bu-px-3` | padding-x: 0.75rem |
| `bu-py-2` | padding-y: 0.5rem |
| `bu-pb-5` | padding-bottom: 1.5rem |
| `bu-pt-4` | padding-top: 1rem |

### 4.4 Layout (Bulma utilities)

| Class | Role |
|---|---|
| `bu-is-flex` | `display: flex` |
| `bu-is-flex-grow-1` | `flex-grow: 1` |
| `bu-is-justify-content-space-between` | `justify-content: space-between` |
| `bu-columns` | Flexbox column container |
| `bu-is-gapless` | No column gaps |
| `bu-is-mobile` | Mobile breakpoint columns |
| `bu-is-multiline` | Allow column wrapping |
| `bu-column bu-is-12` | Full-width column |
| `bu-column bu-is-4` | One-third width column |
| `bu-level` | Level layout (flexbox baseline) |
| `bu-level-left` | Left-aligned level child |
| `bu-level-right` | Right-aligned level child |
| `bu-level-item` | Level item |

### 4.5 Scroll

| Class | Role |
|---|---|
| `__vuescroll` | VueScroll wrapper |
| `__panel` | VueScroll panel |
| `__view` | VueScroll view |
| `__hidebar` | VueScroll hidden scrollbar |

---

## 5. Form Fields

### Step 1: Basics

#### 5.1 Experiment Name

| Property | Value |
|---|---|
| `data-test-id` | `experiment-name-input` |
| Label | "Experiment Name" |
| Label `data-test-id` | `experiment-name-label-header` |
| Label classes | `font-weight-bold text-smallish bu-mb-2` |
| Badge | "Optional" — `class="text-small text-heading color-cool-gray-40"` |
| Field classes | `cly-vue-form-field cly-vue-form-step__section` |
| `name` attr | `name` |
| `rules` attr | `required` |
| Element type | `<input>` |
| Element class | `el-input__inner` |
| `type` | `text` |
| `autocomplete` | `off` |
| `placeholder` | `Enter Experiment Name` |
| Wrapper class | `el-input` |
| Inner wrapper | `cly-vue-form-field__inner el-form-item` |

#### 5.2 Experiment Description

| Property | Value |
|---|---|
| `data-test-id` | `experiment-description-input` |
| Label | "Experiment Description" |
| Label `data-test-id` | `experiment-description-label-header` |
| Label classes | `font-weight-bold text-smallish bu-mb-2` |
| Badge | "Optional" — `class="text-small text-heading color-cool-gray-40"` |
| Field classes | `cly-vue-form-field cly-vue-form-step__section` |
| `name` attr | `description` |
| Element type | `<textarea>` |
| Element class | `el-textarea__inner` |
| `rows` | `3` |
| `autocomplete` | `off` |
| `placeholder` | `Enter Experiment Description` |
| Wrapper class | `el-textarea` |
| Inner wrapper | `cly-vue-form-field__inner el-form-item` |

#### 5.3 Expiration Radio Group

| Property | Value |
|---|---|
| Section label | "Expiration" |
| Label `data-test-id` | `expiration-checkbox-label` |
| Label classes | `text-big font-weight-bold` |
| Tooltip icon | `ion ion-help-circled` |
| Tooltip `data-test-id` | `expiration-checkbox-tooltip` |

**Radio Options:**

| Value | Title | data-test-id (wrapper) | data-test-id (radio) | data-test-id (button) | Default |
|---|---|---|---|---|---|
| `0` | Manually | `expiration-manually-el-radio-wrapper` | `expiration-manually-el-radio` | `expiration-manually-el-radio-button` | YES (`is-checked`) |
| `1` | Expiration day | `expiration-expiration-day-el-radio-wrapper` | `expiration-expiration-day-el-radio` | `expiration-expiration-day-el-radio-button` | No |
| `2` | Target improvement rate | `expiration-target-improvement-rate-el-radio-wrapper` | `expiration-target-improvement-rate-el-radio` | `expiration-target-improvement-rate-el-radio-button` | No |
| `3` | Both expiration day and target improvement rate | `expiration-both-expiration-day-and-target-improvement-rate-el-radio-wrapper` | `expiration-both-expiration-day-and-target-improvement-rate-el-radio` | `expiration-both-expiration-day-and-target-improvement-rate-el-radio-button` | No |

**Radio descriptions (data-test-id — description divs):**

| Radio | Description `data-test-id` | Description Text |
|---|---|---|
| Manually | `expiration-manually-description` | "Stop the experiment manually whenever you choose" |
| Expiration day | `expiration-expiration-day-description` | "Set a specific date to automatically stop the experiment" |
| Target improvement rate | `expiration-target-improvement-rate-description` | "Stop the experiment when a variant achieves the target rate" |
| Both | `expiration-both-expiration-day-and-target-improvement-rate-description` | "Stop the experiment when a variant reaches the target" |

**Radio label classes:** `el-radio is-autosized is-multiline bu-px-3 is-bordered`
**Checked radio adds:** `is-checked`
**aria-checked:** `"true"` when selected
**radio input class:** `el-radio__original`

### Step 2: Targeting

#### 5.4 Use Target Users Toggle (el-switch)

| Property | Value |
|---|---|
| Section label | "TARGET USERS" |
| Label `data-test-id` | `target-users-label` |
| Label classes | `text-small font-weight-bold` |
| Tooltip `data-test-id` | `target-users-tooltip` |
| Switch wrapper `data-test-id` | `use-target-users-el-switch-wrapper` |
| Switch wrapper classes | `el-switch is-checked` |
| Switch `role` | `switch` |
| Switch `aria-checked` | `"true"` (initially checked/on) |
| Switch input `data-test-id` | `use-target-users-el-switch-input` |
| Switch input type | `checkbox` |
| Switch input `true-value` | `"true"` |
| Switch input class | `el-switch__input` |
| Switch core `data-test-id` | `use-target-users-el-switch-core` |
| Switch core class | `el-switch__core` |
| Toggle label `data-test-id` | `use-target-users-checkbox-label` |
| Toggle label text | "Use Target Users" |
| Toggle label classes | `text-small text-heading color-cool-gray-40 bu-mb-0 bu-ml-1` |

#### 5.5 Property Selector Dropdown

| Property | Value |
|---|---|
| Container `data-test-id` | `target-users-drawer-property-select-property-dropdown-0-dropdown-el-select` |
| Container classes | `cly-vue-dropdown el-select cly-vue-select-x` |
| Trigger input `data-test-id` | `target-users-drawer-property-select-property-dropdown-0` |
| Trigger input classes | `el-input__inner` |
| Trigger input `type` | `text` |
| Trigger input `readonly` | `readonly` |
| Trigger input `placeholder` | `Select Property` |
| Trigger wrapper classes | `cly-input-dropdown-trigger el-input el-input--suffix is-arrow` |
| Dropdown icon class | `el-select__caret ion-arrow-up-b` |
| Search box `data-test-id` | `target-users-drawer-property-select-property-dropdown-0-search-box` |
| Search box `placeholder` | `Search in Properties` |
| Search icon `data-test-id` | `target-users-drawer-property-select-property-dropdown-0-search-icon` |
| Search icon class | `el-input__icon el-icon-search` |
| Popup class | `el-select-dropdown el-popper cly-vue-dropdown__pop` |

#### 5.6 Property Dropdown Tabs

| Tab Label | `data-test-id` | Tab ID | aria-controls |
|---|---|---|---|
| All Properties | `target-users-drawer-property-select-property-dropdown-0-el-tab-all-properties` | `tab-__all` | `pane-__all` |
| Event | `target-users-drawer-property-select-property-dropdown-0-el-tab-event` | `tab-Event` | `pane-Event` |
| User | `target-users-drawer-property-select-property-dropdown-0-el-tab-user` | `tab-User` | `pane-User` |
| Custom | `target-users-drawer-property-select-property-dropdown-0-el-tab-custom` | `tab-Custom` | `pane-Custom` |
| Campaign | `target-users-drawer-property-select-property-dropdown-0-el-tab-campaign` | `tab-Campaign` | `pane-Campaign` |

Default active tab: **All Properties** (`is-active`, `aria-selected="true"`)

#### 5.7 Property Listbox Items (All Properties)

Each item shares the wrapper `data-test-id="target-users-drawer-property-select-property-dropdown-0-item"` and has an individual label `data-test-id`:

| data-test-id (label) | Display Name |
|---|---|
| `...-item-duration` | Duration |
| `...-item-id` | ID |
| `...-item-age` | Age |
| `...-item-app-version` | App Version |
| `...-item-browser` | Browser |
| `...-item-browser-version` | Browser Version |
| `...-item-birth-year` | Birth Year |
| `...-item-carrier` | Carrier |
| `...-item-days-of-retention` | Days of Retention |
| `...-item-months-of-retention` | Months of Retention |
| `...-item-weeks-of-retention` | Weeks of Retention |
| `...-item-country` | Country |
| `...-item-city` | City |
| `...-item-device` | Device |
| `...-item-density` | Density |
| `...-item-local-day-of-the-week` | Local Day of the Week |
| `...-item-device-type` | Device Type |
| `...-item-email` | Email |
| `...-item-first-seen-on` | First Seen On |

Full `data-test-id` prefix: `target-users-drawer-property-select-property-dropdown-0-item-`

**Item classes:** `text-medium font-weight-bold cly-vue-listbox__item`
**Item content class:** `cly-vue-listbox__item-content`
**Item label class:** `cly-vue-listbox__item-label has-tooltip`
**Item prefix class:** `cly-vue-listbox__item-prefix bu-mr-1`

---

## 6. State Transitions

### 6.1 Step Navigation States

| State | Class(es) | Visual |
|---|---|---|
| Current / Active step | `cly-vue-drawer__step-label` (no modifier) | Step number visible, title colored |
| Locked / Future step | `cly-vue-drawer__step-label is-locked` | Step number greyed out, not clickable |
| Completed step | `cly-vue-drawer__step-label` + check icon shown | Step number replaced with check icon (check-icon.svg) |

### 6.2 Radio Button States

| State | Class on `<label>` | Class on `<span.el-radio__input>` | `aria-checked` |
|---|---|---|---|
| Unselected | `el-radio is-autosized is-multiline bu-px-3 is-bordered` | `el-radio__input` | `false` (or absent) |
| Selected | `el-radio is-autosized is-multiline bu-px-3 is-bordered is-checked` | `el-radio__input is-checked` | `"true"` |

### 6.3 Toggle Switch States

| State | Class on wrapper | `aria-checked` |
|---|---|---|
| Enabled/On | `el-switch is-checked` | `"true"` |
| Disabled/Off | `el-switch` | `"false"` |

When the toggle is off, the Target Users segmentation section should be hidden or disabled.

### 6.4 Property Dropdown States

| State | Description |
|---|---|
| Closed | Trigger input shown, popup hidden |
| Open | `cly-vue-dropdown__pop` visible, `ion-arrow-up-b` icon indicates open |
| Tab active | `el-tabs__item is-active` + `aria-selected="true"` on the active tab |
| Item selected | Item gets selected state (highlight) |

---

## 7. Element UI Components

### 7.1 `el-input` (Text Input)

```html
<div class="el-input">
  <input class="el-input__inner" type="text" ... />
</div>
```

**Variants used:**
- `el-input--suffix` — has suffix icon (dropdown trigger)
- `el-input--prefix` — has prefix icon (search box)

**Icon slots:**
- `el-input__suffix` / `el-input__suffix-inner` — suffix container
- `el-input__prefix` — prefix container
- `el-input__icon el-icon-search` — search icon
- `el-select__caret ion-arrow-up-b` — dropdown caret

### 7.2 `el-textarea`

```html
<div class="el-textarea">
  <textarea class="el-textarea__inner" rows="3" ... ></textarea>
</div>
```

### 7.3 `el-radio`

```html
<label class="el-radio is-autosized is-multiline bu-px-3 is-bordered [is-checked]"
       role="radio" aria-checked="[true|false]" tabindex="0">
  <span class="el-radio__input [is-checked]">
    <span class="el-radio__inner"></span>
    <input type="radio" class="el-radio__original" aria-hidden="true" tabindex="-1" value="..." />
  </span>
  <span class="el-radio__label">
    <div>Title</div>
    <div class="text-small bu-has-text-grey bu-mt-1 radio-description">Description</div>
  </span>
</label>
```

**Custom modifiers applied:**
- `is-autosized` — auto-sized width
- `is-multiline` — multi-line label layout
- `is-bordered` — border box around each radio option
- `is-checked` — added when option is selected

### 7.4 `el-switch`

```html
<div role="switch" aria-checked="true" class="el-switch [is-checked]">
  <input type="checkbox" class="el-switch__input" true-value="true" />
  <span class="el-switch__core"></span>
</div>
```

### 7.5 `el-select` (used as base for cly-vue-dropdown)

```html
<div class="el-select cly-vue-dropdown cly-vue-select-x" placeholder="...">
  <!-- trigger input -->
  <div class="el-select-dropdown el-popper cly-vue-dropdown__pop">
    <!-- popup content -->
  </div>
</div>
```

### 7.6 `el-tabs`

```html
<div class="el-tabs el-tabs--top">
  <div class="el-tabs__header is-top">
    <div class="el-tabs__nav-wrap is-top">
      <div class="el-tabs__nav-scroll">
        <div role="tablist" class="el-tabs__nav is-top">
          <div class="el-tabs__active-bar is-top"></div>
          <div id="tab-..." role="tab" class="el-tabs__item is-top [is-active]" aria-selected="[true|false]">
            <span data-test-id="...">Tab Label</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="pane-..." class="el-tab-pane">
    <!-- tab content -->
  </div>
</div>
```

---

## 8. Countly Custom Components

### 8.1 `cly-vue-drawer` (Multi-Step)

**Root component** for the experiment creation drawer.

```html
<div class="cly-vue-ab-testing-drawer">
  <!-- drawer renders inside with these structural classes: -->
  <!-- cly-vue-drawer__title-container -->
  <!-- cly-vue-drawer__steps-header (step nav) -->
  <!-- cly-vue-drawer__steps-container is-multi-step (body) -->
  <!-- cly-vue-drawer__footer (buttons) -->
</div>
```

**Key structural classes:**

| Class | Role |
|---|---|
| `cly-vue-drawer__title-container` | Header row with title + close button |
| `cly-vue-drawer__title-header` | `<h3>` title text |
| `cly-vue-drawer__close-button` | X close button |
| `cly-vue-drawer__subtitle` | Optional subtitle row below header |
| `cly-vue-drawer__steps-header` | Horizontal wizard step nav bar |
| `cly-vue-drawer__step-label` | Individual step container |
| `cly-vue-drawer__step-label.is-locked` | Step not yet accessible |
| `cly-vue-drawer__step-sign` | Circle containing step number |
| `cly-vue-drawer__step-title` | Step text label |
| `cly-vue-drawer__step-separator` | Line between steps |
| `cly-vue-drawer__steps-container` | Body content area |
| `cly-vue-drawer__steps-container.is-multi-step` | Multi-step mode |
| `cly-vue-drawer__body-container` | Inner body padding container |
| `cly-vue-drawer__footer` | Footer with navigation buttons |

### 8.2 `cly-vue-content`

Wrapper for each step's rendered content.

```html
<div id="cly-cmp-{id}-step{n}" class="cly-vue-content">
  <span>
    <!-- step form content -->
  </span>
</div>
```

### 8.3 `cly-vue-form-field`

Wrapper for individual form fields with built-in validation support.

```html
<div class="cly-vue-form-field cly-vue-form-step__section" name="fieldName" rules="required">
  <!-- label row -->
  <form>
    <div class="cly-vue-form-field__inner el-form-item">
      <!-- input element -->
    </div>
  </form>
</div>
```

### 8.4 `cly-vue-form-step__section-group`

Groups related form sections within a step.

```html
<div class="cly-vue-form-step__section-group cly-vue-form-step__section-group--filled">
  <!-- section content -->
</div>
```

**Modifier:** `--filled` indicates the group has content (non-empty background treatment).

### 8.5 `cly-vue-form-step__auto-group`

Auto-grouped form fields.

```html
<div class="cly-vue-form-step__auto-group bu-mb-4">
  <!-- section groups -->
</div>
```

### 8.6 `cly-vue-dropdown` / `cly-vue-select-x`

Enhanced dropdown/select component extending `el-select`.

```html
<div class="cly-vue-dropdown el-select cly-vue-select-x" placeholder="...">
  <div class="cly-input-dropdown-trigger el-input el-input--suffix is-arrow">
    <input class="el-input__inner" type="text" readonly="readonly" ... />
  </div>
  <div class="el-select-dropdown el-popper cly-vue-dropdown__pop">
    <div class="cly-vue-dropdown__pop-container">
      <div class="cly-vue-select-x__pop">
        <div class="cly-vue-select-x__header">
          <!-- search input -->
        </div>
        <!-- el-tabs for category filtering -->
        <!-- cly-vue-listbox for items -->
      </div>
    </div>
  </div>
</div>
```

### 8.7 `cly-vue-listbox`

List of selectable items within a dropdown.

```html
<div class="cly-vue-listbox cly-vue-listbox--has-default-skin cly-vue-listbox--has-margin">
  <div class="cly-vue-listbox__items-wrapper">
    <div class="text-medium font-weight-bold cly-vue-listbox__item">
      <div class="cly-vue-listbox__item-content" data-test-id="...">
        <div class="bu-level">
          <div class="bu-level-left">
            <div class="cly-vue-listbox__item-prefix bu-mr-1"></div>
            <div class="cly-vue-listbox__item-label has-tooltip" data-test-id="...">
              Item Label
            </div>
          </div>
          <div class="bu-level-right"></div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Modifiers:**
- `cly-vue-listbox--has-default-skin` — default visual skin
- `cly-vue-listbox--has-margin` — adds margin

### 8.8 `cly-vue-qb-seg` (Query Builder / Segmentation)

Used in Step 2 for building targeting rules. Implements a property + operator + value row pattern.

```html
<div class="cly-vue-qb-seg">
  <div class="bu-columns bu-is-gapless bu-is-multiline">
    <div class="bu-column bu-is-12">
      <div class="bu-columns bu-is-gapless bu-is-mobile cly-vue-qb-seg__row cly-vue-qb-seg__row--first cly-vue-qb-seg__row--last">
        <div class="bu-column bu-is-12">
          <div class="bu-columns bu-is-gapless bu-is-mobile cly-vue-qb-seg__row-selects">
            <div class="bu-column bu-is-4"> <!-- Property selector --> </div>
            <div class="bu-column bu-is-4"> <!-- Operator selector --> </div>
            <div class="bu-column bu-is-4"> <!-- Value input --> </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Row modifiers:**
- `cly-vue-qb-seg__row--first` — first row
- `cly-vue-qb-seg__row--last` — last row (no AND/OR connector below)

### 8.9 `cly-vue-tooltip-icon`

```html
<i class="bu-is-flex-grow-1 cly-vue-tooltip-icon ion ion-help-circled has-tooltip"
   data-original-title="null"
   data-test-id="..."></i>
```

---

## 9. Multi-Step Wizard

### 9.1 Step Configuration

| Step # | Label | `data-test-id` (label div) | `data-test-id` (title div) | Content ID |
|---|---|---|---|---|
| 1 | Basics | `ab-testing-step-1-label` | `ab-testing-basics-label` | `cly-cmp-{id}-step1` |
| 2 | Targeting | `ab-testing-step-2-label` | `ab-testing-targeting-label` | `cly-cmp-{id}-step2` |
| 3 | Goals | `ab-testing-step-3-label` | `ab-testing-goals-label` | `cly-cmp-{id}-step3` |
| 4 | Variants | `ab-testing-step-4-label` | `ab-testing-variants-label` | `cly-cmp-{id}-step4` |

### 9.2 Step Separator Elements

| Separator `data-test-id` | Between Steps |
|---|---|
| `ab-testing-seperator-0` | Step 1 → Step 2 |
| `ab-testing-seperator-1` | Step 2 → Step 3 |
| `ab-testing-seperator-2` | Step 3 → Step 4 |

Note: "seperator" is the spelling used in the actual `data-test-id` attributes (single 'a', not 'separator').

### 9.3 Step Sign / Number Indicators

Each step has two `data-test-id` elements for the step circle:

| Step | Number span | Image container | Image element |
|---|---|---|---|
| 1 | `ab-testing-current-step-index-1` | `ab-testing-current-step-index-img-container1` | `ab-testing-step-1` |
| 2 | `ab-testing-current-step-index-2` | `ab-testing-current-step-index-img-container2` | `ab-testing-step-2` |
| 3 | `ab-testing-current-step-index-3` | `ab-testing-current-step-index-img-container3` | `ab-testing-step-3` |
| 4 | `ab-testing-current-step-index-4` | `ab-testing-current-step-index-img-container4` | `ab-testing-step-4` |

**Behavior:** When a step is completed, the number span is hidden and the check icon image (img container) is shown.

### 9.4 Step Navigation Logic

| Action | Result |
|---|---|
| Click "Next" in step N | Validates step N, advances to step N+1, unlocks step N+1 |
| Click "Back" | Returns to previous step, no validation required |
| Click step label (if not locked) | Navigate directly to that step |
| Click step label (if `is-locked`) | No navigation — user must complete prior steps |
| Click "Create" (final step) | Submits the experiment creation |
| Click "Cancel" / close button | Closes drawer, discards changes |

### 9.5 Validation Rules by Step

| Step | Field | Rule |
|---|---|---|
| 1 (Basics) | Experiment Name | `rules="required"` on the form-field container |
| 1 (Basics) | Experiment Description | Optional |
| 1 (Basics) | Expiration | Required (has default: "Manually") |
| 2 (Targeting) | Target Users | Optional (toggle + segmentation rules) |
| 3 (Goals) | Goals | TBD (not fully rendered in snapshot) |
| 4 (Variants) | Variants | TBD (not fully rendered in snapshot) |

### 9.6 Drawer Container Structure (Steps mode)

```html
<div class="cly-vue-drawer__steps-container is-multi-step">
  <div class="scroll-shadow-container"></div>
  <div class="bu-columns bu-is-gapless bu-is-mobile cly-vue-drawer__body-container bu-pb-5 bu-pt-4 bu-mb-2 bu-mt-1">
    <div class="bu-column bu-is-12">
      <!-- Active step content rendered here as cly-vue-content -->
    </div>
  </div>
</div>
```

---

## 10. Implementation Notes

### 10.1 Drawer Component Pattern

The drawer uses `cly-vue-drawer` in multi-step mode. The step navigation bar (`cly-vue-drawer__steps-header`) is separate from the body content. Only one step panel is rendered/visible at a time. Steps beyond the current step receive `is-locked` on their label elements.

### 10.2 Step ID Pattern

Content pane IDs follow the pattern `cly-cmp-{componentId}-step{n}`. The component ID (`2970` in the snapshot) is dynamically assigned at runtime and must not be hardcoded in tests. Use `data-test-id` attributes for reliable test targeting.

### 10.3 Expiration Radio — Default State

The first radio option ("Manually", value `0`) is selected by default. Its `<label>` has `is-checked`, its `<span.el-radio__input>` has `is-checked`, and the `<label>` has `aria-checked="true"`. All other options have none of these.

### 10.4 Target Users Toggle — Default State

The toggle is shown as **on** (`is-checked`, `aria-checked="true"`) in the captured snapshot. When off, the segmentation row should be hidden or disabled.

### 10.5 Property Dropdown — Scroll

The property listbox uses VueScroll (`__vuescroll`, `__panel`, `__view`, `__hidebar`) for virtual scrolling of the property list. The `__hidebar` class hides the native scrollbar.

### 10.6 Query Builder Row Structure

The `cly-vue-qb-seg__row` uses three equal-width columns (`bu-is-4` each):
1. Property selector — `cly-vue-dropdown cly-vue-select-x`
2. Operator selector — (not in snapshot)
3. Value input — (not in snapshot)

Additional rows can be added with AND/OR connectors. The first row gets `cly-vue-qb-seg__row--first` and the last row gets `cly-vue-qb-seg__row--last`.

### 10.7 Test ID Naming Conventions

| Pattern | Description |
|---|---|
| `ab-testing-{section}-{element}` | Main drawer structural elements |
| `ab-testing-step-{n}-label` | Step nav label containers |
| `ab-testing-step-{n}` | Step check icon image element |
| `ab-testing-current-step-index-{n}` | Step number span |
| `ab-testing-current-step-index-img-container{n}` | Step check icon container |
| `ab-testing-{step-name}-label` | Step title text element |
| `ab-testing-seperator-{n}` | Step separators (note: single 'a' spelling) |
| `expiration-{option}-el-radio-wrapper` | Radio label (outermost) |
| `expiration-{option}-el-radio` | Radio input span |
| `expiration-{option}-el-radio-button` | Radio input element |
| `expiration-{option}-el-radio-label` | Radio label span |
| `expiration-{option}-title` | Radio title text div |
| `expiration-{option}-description` | Radio description text div |
| `use-target-users-el-switch-wrapper` | Toggle switch container |
| `use-target-users-el-switch-input` | Toggle checkbox input |
| `use-target-users-el-switch-core` | Toggle visual core span |
| `use-target-users-checkbox-label` | Toggle text label |
| `target-users-drawer-property-select-property-dropdown-0-*` | Property dropdown (index 0) elements |
| `target-users-drawer-property-select-property-dropdown-0-item` | Shared wrapper data-test-id for all items |
| `target-users-drawer-property-select-property-dropdown-0-item-{key}` | Individual property label |

### 10.8 Ionicons Used

| Class | Icon |
|---|---|
| `ion-ios-close-empty` | Close/X button in header |
| `ion ion-help-circled` | Help tooltip icon |
| `ion-arrow-up-b` | Dropdown open indicator (caret) |

### 10.9 Dependencies

| Dependency | Role |
|---|---|
| Element UI v2 | `el-input`, `el-textarea`, `el-radio`, `el-switch`, `el-select`, `el-tabs` |
| Bulma | Utility layout classes (`bu-*`) |
| VueScroll | Scrollable listbox/panel |
| Ionicons | Icon font |
| Countly `cly-vue-*` | Custom drawer, form, dropdown, listbox, query builder |

### 10.10 Loading State (Step 2)

The targeting section's query builder row wrapper uses Element UI's loading directive attributes:

```
element-loading-text="Loading..."
element-loading-spinner="el-icon-loading"
element-loading-background="rgba(255, 255, 255, 0.8)"
```

This indicates the property list is fetched asynchronously from the API and a loading overlay is shown during fetch.

### 10.11 Tooltip System

Tooltips use the `has-tooltip` class combined with `data-original-title` attribute. When the title is `"null"`, the tooltip content is populated dynamically at runtime from the component's tooltip text.

---

## Complete data-test-id Reference (Ordered)

| # | `data-test-id` | Element | Context |
|---|---|---|---|
| 1 | `ab-testing-header-title` | `h3` | Drawer title "Create new experiment" |
| 2 | `ab-testing-close-button` | `div` | X close button |
| 3 | `ab-testing-steps-header-container` | `div` | Step nav bar container |
| 4 | `ab-testing-step-1-label` | `div` | Step 1 nav label block |
| 5 | `ab-testing-step-sign-container` | `div` | Step sign flex wrapper (×4, one per step) |
| 6 | `ab-testing-step-sign` | `div` | Step circle (×4, one per step) |
| 7 | `ab-testing-current-step-index-1` | `span` | "1" number in step circle |
| 8 | `ab-testing-current-step-index-img-container1` | `div` | Check icon container step 1 |
| 9 | `ab-testing-step-1` | `img` | Check icon image step 1 |
| 10 | `ab-testing-basics-label` | `div` | "Basics" step title text |
| 11 | `ab-testing-seperator-0` | `div` | Separator between step 1 and 2 |
| 12 | `ab-testing-step-2-label` | `div` | Step 2 nav label block |
| 13 | `ab-testing-current-step-index-2` | `span` | "2" number in step circle |
| 14 | `ab-testing-current-step-index-img-container2` | `div` | Check icon container step 2 |
| 15 | `ab-testing-step-2` | `img` | Check icon image step 2 |
| 16 | `ab-testing-targeting-label` | `div` | "Targeting" step title text |
| 17 | `ab-testing-seperator-1` | `div` | Separator between step 2 and 3 |
| 18 | `ab-testing-step-3-label` | `div` | Step 3 nav label block |
| 19 | `ab-testing-current-step-index-3` | `span` | "3" number in step circle |
| 20 | `ab-testing-current-step-index-img-container3` | `div` | Check icon container step 3 |
| 21 | `ab-testing-step-3` | `img` | Check icon image step 3 |
| 22 | `ab-testing-goals-label` | `div` | "Goals" step title text |
| 23 | `ab-testing-seperator-2` | `div` | Separator between step 3 and 4 |
| 24 | `ab-testing-step-4-label` | `div` | Step 4 nav label block |
| 25 | `ab-testing-current-step-index-4` | `span` | "4" number in step circle |
| 26 | `ab-testing-current-step-index-img-container4` | `div` | Check icon container step 4 |
| 27 | `ab-testing-step-4` | `img` | Check icon image step 4 |
| 28 | `ab-testing-variants-label` | `div` | "Variants" step title text |
| 29 | `experiment-name-label-header` | `div` | "Experiment Name" field label |
| 30 | `experiment-name-input` | `input` | Name text input |
| 31 | `experiment-description-label-header` | `div` | "Experiment Description" label |
| 32 | `experiment-description-input` | `textarea` | Description textarea |
| 33 | `expiration-checkbox-label` | `span` | "Expiration" section header |
| 34 | `expiration-checkbox-tooltip` | `i` | Expiration help tooltip icon |
| 35 | `expiration-manually-el-radio-wrapper` | `label` | Manually radio option |
| 36 | `expiration-manually-el-radio` | `span` | Manually radio input wrapper |
| 37 | `expiration-manually-el-radio-button` | `input[radio]` | Manually radio input (value=0) |
| 38 | `expiration-manually-el-radio-label` | `span` | Manually radio label |
| 39 | `expiration-manually-title` | `div` | "Manually" title text |
| 40 | `expiration-manually-description` | `div` | Manually description text |
| 41 | `expiration-expiration-day-el-radio-wrapper` | `label` | Expiration day radio option |
| 42 | `expiration-expiration-day-el-radio` | `span` | Expiration day radio input wrapper |
| 43 | `expiration-expiration-day-el-radio-button` | `input[radio]` | Expiration day radio input (value=1) |
| 44 | `expiration-expiration-day-el-radio-label` | `span` | Expiration day radio label |
| 45 | `expiration-expiration-day-title` | `div` | "Expiration day" title text |
| 46 | `expiration-expiration-day-description` | `div` | Expiration day description text |
| 47 | `expiration-target-improvement-rate-el-radio-wrapper` | `label` | Target rate radio option |
| 48 | `expiration-target-improvement-rate-el-radio` | `span` | Target rate radio input wrapper |
| 49 | `expiration-target-improvement-rate-el-radio-button` | `input[radio]` | Target rate radio input (value=2) |
| 50 | `expiration-target-improvement-rate-el-radio-label` | `span` | Target rate radio label |
| 51 | `expiration-target-improvement-rate-title` | `div` | "Target improvement rate" title |
| 52 | `expiration-target-improvement-rate-description` | `div` | Target rate description text |
| 53 | `expiration-both-expiration-day-and-target-improvement-rate-el-radio-wrapper` | `label` | Both radio option |
| 54 | `expiration-both-expiration-day-and-target-improvement-rate-el-radio` | `span` | Both radio input wrapper |
| 55 | `expiration-both-expiration-day-and-target-improvement-rate-el-radio-button` | `input[radio]` | Both radio input (value=3) |
| 56 | `expiration-both-expiration-day-and-target-improvement-rate-el-radio-label` | `span` | Both radio label |
| 57 | `expiration-both-expiration-day-and-target-improvement-rate-title` | `div` | "Both..." title text |
| 58 | `expiration-both-expiration-day-and-target-improvement-rate-description` | `div` | Both description text |
| 59 | `target-users-label` | `div` | "TARGET USERS" section label |
| 60 | `target-users-tooltip` | `i` | Target users help tooltip |
| 61 | `use-target-users-el-switch-wrapper` | `div` | Toggle switch container |
| 62 | `use-target-users-el-switch-input` | `input[checkbox]` | Toggle checkbox input |
| 63 | `use-target-users-el-switch-core` | `span` | Toggle visual core |
| 64 | `use-target-users-checkbox-label` | `span` | "Use Target Users" label |
| 65 | `target-users-drawer-property-select-property-dropdown-0-dropdown-el-select` | `div` | Property dropdown container |
| 66 | `target-users-drawer-property-select-property-dropdown-0` | `input` | Property dropdown trigger input |
| 67 | `target-users-drawer-property-select-property-dropdown-0-search-box` | `input` | Property search input |
| 68 | `target-users-drawer-property-select-property-dropdown-0-search-icon` | `i` | Search icon |
| 69 | `target-users-drawer-property-select-property-dropdown-0-el-tab-all-properties` | `span` | "All Properties" tab |
| 70 | `target-users-drawer-property-select-property-dropdown-0-el-tab-event` | `span` | "Event" tab |
| 71 | `target-users-drawer-property-select-property-dropdown-0-el-tab-user` | `span` | "User" tab |
| 72 | `target-users-drawer-property-select-property-dropdown-0-el-tab-custom` | `span` | "Custom" tab |
| 73 | `target-users-drawer-property-select-property-dropdown-0-el-tab-campaign` | `span` | "Campaign" tab |
| 74 | `target-users-drawer-property-select-property-dropdown-0-item` | `div` | Listbox item content (shared, repeated) |
| 75–93 | `target-users-drawer-property-select-property-dropdown-0-item-{key}` | `div` | Individual property labels (19 properties) |
