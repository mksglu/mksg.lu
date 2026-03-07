# PRD: Funnel "Add Property" Filter Component

**Component:** `cly-vue-qb-seg` (Query Builder Segment)
**Feature:** Per-step property filtering in Funnel analysis
**Extracted from:** `http://mert.count.ly/dashboard#/6908ab02fece9ef06eca7285/funnels`
**State captured:** Country property selected, operator "is" selected, value dropdown open with checkbox list

---

## Part 1: Functional Behavior

### 1.1 Overview

Each funnel step contains a "+ Add property" button (rendered beneath the "...which has" label). Clicking it appends a new property filter row consisting of three input columns and a close button. Multiple rows may be added per step. The button is disabled until the current row's property and operator are both selected.

### 1.2 State Machine

```
[IDLE] Button active, no rows
  → click "+ Add property"
[ROW ADDED] Row appended. Property dropdown empty. Operator disabled. Value disabled. Button disabled.
  → select property
[PROPERTY SELECTED] Operator dropdown becomes active. Value resets. Error state shown on operator (el-select is-error).
  → select operator
[OPERATOR SELECTED] Value field activates. Type determined by property type + operator.
  → enter value (or skip for "is set")
[COMPLETE] Row fully configured. Button re-enables. Additional rows can be added.
  → click close button on any row
[ROW REMOVED] That row is deleted. If no rows remain, state returns to IDLE.
```

### 1.3 Row Completion Rules

- **Property selected + operator not yet selected:** "+" button stays disabled. Operator field shows `el-select is-error`.
- **Property selected + operator selected:** "+" button enables. Value field type activates.
- **Operator "is set" selected:** Value field is hidden (no input needed). Row is considered complete after operator selection.
- **Operator "is between" selected (NUMERIC only):** Two number input fields appear side by side.
- **Any other operator selected:** Single value input appears (type depends on property + operator).

### 1.4 Conditional Rendering: Value Field by Property Type and Operator

| Property Type | Operator | Value Field |
|---|---|---|
| Any | (no operator selected) | `el-input is-disabled`, placeholder "String" [STATIC/i18n] |
| NUMERIC | is between | Two `el-input` number inputs [STATIC/FIXED] |
| NUMERIC | is, is not, greater than, at least, less than, at most | Single `el-input` number input, placeholder "Number" [STATIC/i18n] |
| NUMERIC | is set | Value hidden |
| STRING | is, is not, contains, doesn't contain, begins with | Single `el-input` text input [STATIC/FIXED] |
| STRING | is set | Value hidden |
| LIST | is, is not | `cly-vue-select-x` multi-select dropdown with checkboxes [DYNAMIC/DB] |
| LIST | is set | Value hidden |

### 1.5 Property Types

**NUMERIC properties:** Duration, Age, Session Count, Birth year, Days of retention, Months of retention, Weeks of retention, Engagement Score, Last Payment, Last Purchase Amount, Total Purchase Amount, Total Purchase Count, Total Session Duration

**STRING properties:** Browser, App Version, Email, Name, Username, Browser version, Carrier, Density, Last view name, Locale, Manufacturer, Organization, Phone, Platform Version, Resolution, Source, Source Channel, Hinge, Profile Group

**LIST properties:** Country, City, Platform, Gender, Device Type, Device, Device Orientation, Language, Region, ID, First Seen On, Last Seen On, Local Day of the Week, Local Hour, Cohorts

### 1.6 Operator Sets

**NUMERIC operators** [STATIC/i18n]:
- is between
- greater than
- at least
- less than
- at most
- is
- is not
- is set

**STRING operators** [STATIC/i18n]:
- is
- is not
- contains
- doesn't contain
- is set
- begins with

**LIST operators** [STATIC/i18n]:
- is
- is not
- is set

### 1.7 Multi-Row Behavior

- Each "+ Add property" click appends one row with index `N` (0-indexed).
- Close button (`el-icon-close`) on any row removes it.
- Test ID suffixes use the row index: `-0`, `-1`, `-2`, etc.
- First row only: `cly-vue-qb-seg__row--first cly-vue-qb-seg__row--last`
- Middle rows: `cly-vue-qb-seg__row` (no first/last modifier)
- Last row (multi-row): `cly-vue-qb-seg__row--last`
- First row (multi-row): `cly-vue-qb-seg__row--first`

### 1.8 Property Dropdown Behavior

- Renders as a **body-level popper** (not inline).
- Contains a search box ("Search in Properties") [STATIC/i18n] with `el-icon-search`.
- Contains 5 tabs: All Properties, Event, User, Custom, Campaign [STATIC/i18n].
- Tab switching filters the list below. "All Properties" is the default active tab.
- Each item in the list is a `cly-vue-listbox__item`.
- Selecting an item closes the popper and populates the property input.

**Tab contents:**

| Tab | Contents |
|---|---|
| Event [STATIC/i18n] | Duration [DYNAMIC/DB] |
| User [STATIC/i18n] | 46 properties: ID, Age, App Version, Browser, Browser version, Birth year, Carrier, Days of retention, Months of retention, Weeks of retention, Country, City, Device, Density, Local Day of the Week, Device Type, Email, First Seen On, Gender, Local Hour, Language, Last Seen On, Last view name, Manufacturer, Name, Organization, Device Orientation, Platform, Phone, Platform Version, Resolution, Region, Session Count, Source, Total Session Duration, Username, Locale, Source Channel, Engagement Score, Last Payment, Last Purchase Amount, Total Purchase Amount, Total Purchase Count, Hinge, Cohorts, Profile Group [DYNAMIC/DB] |
| Custom [STATIC/i18n] | Acquisition Source, Industry, Onboarding Method, Subscription Plan, Team Size, populator, Referral Campaign [DYNAMIC/DB] |
| Campaign [STATIC/i18n] | Campaign attribution properties [DYNAMIC/DB] |
| All Properties [STATIC/i18n] | Combined list of all above [DYNAMIC/DB] |

### 1.9 Value Dropdown Behavior (List type, "is"/"is not" operator)

- Renders as a **body-level popper** (not inline).
- Contains a search box ("Search in Values") [STATIC/i18n] with `el-icon-search`.
- Contains a single tab: "Values" [STATIC/i18n].
- Items rendered as `el-checkbox` inside `cly-vue-listbox__item`.
- Multi-select: multiple checkboxes can be checked simultaneously.
- Each selected value is shown as a tag (`el-select__tags`) in the collapsed trigger.

### 1.10 Loading State

- When data is being fetched (e.g., property list or value list loading), an `el-loading-mask` overlay appears over the row container.
- Contains `el-loading-spinner` with `el-icon-loading` and "Loading..." text [STATIC/i18n].

---

## Part 2: Design System and Visual Styles

### 2.1 Component: `cly-vue-qb-seg`

The top-level wrapper for the entire property filter section (all rows + add button).

```
div.cly-vue-qb-seg
  span
    div.bu-columns.bu-is-gapless.bu-is-multiline
      div.bu-column.bu-is-12
        [loading overlay — conditionally rendered]
        [rows — one per property filter]
      div.bu-column.bu-is-12.bu-mt-2
        [+ Add property button]
```

### 2.2 Grid Layout

Uses Bulma columns with `bu-is-gapless` and `bu-is-mobile`:

| Column | Class | Width | Content |
|---|---|---|---|
| Property | `bu-column bu-is-4` | 4/12 | `cly-vue-select-x` dropdown |
| Operator | `bu-column bu-is-3` | 3/12 | `el-select` dropdown |
| Value | `bu-column bu-is-4` | 4/12 | Varies by type |
| Close | `bu-column bu-is-1` | 1/12 | `el-icon-close` button |

### 2.3 Row Classes

```css
/* Single row (only row) */
.cly-vue-qb-seg__row.cly-vue-qb-seg__row--first.cly-vue-qb-seg__row--last

/* First of multiple rows */
.cly-vue-qb-seg__row.cly-vue-qb-seg__row--first

/* Middle row (neither first nor last) */
.cly-vue-qb-seg__row

/* Last of multiple rows */
.cly-vue-qb-seg__row.cly-vue-qb-seg__row--last
```

Inner containers:
- `cly-vue-qb-seg__row-selects` — wraps the 4 columns
- `cly-vue-qb-seg__row-wrapper` — wraps value field inside its column

### 2.4 Close Button

```html
<div class="cly-icon-button cly-icon-button--gray cly-vue-qb-icon">
  <i class="el-icon-close" data-test-id="funnel-steps-step-{N}-qbs-close-button-{ROW}"></i>
</div>
```

### 2.5 Add Property Button

```html
<div class="bu-column bu-is-2">
  <div class="cly-text-button cly-text-button--disabled"
       data-test-id="funnel-steps-step-{N}-add-property-button">
    + Add property
  </div>
</div>
```

- **Active:** `cly-text-button` (no `--disabled`)
- **Disabled:** `cly-text-button cly-text-button--disabled`

### 2.6 Property Dropdown (Trigger)

```html
<div class="cly-vue-dropdown el-select cly-vue-select-x"
     data-test-id="funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-dropdown-el-select"
     placeholder="Select Property">
  <div>
    <div class="cly-input-dropdown-trigger el-input el-input--suffix is-arrow">
      <input class="el-input__inner"
             data-test-id="funnel-steps-step-{N}-property-select-property-dropdown-{ROW}"
             type="text"
             placeholder="Select Property">
      <span class="el-input__suffix">
        <span class="el-input__suffix-inner">
          <i class="el-select__caret ion-arrow-up-b"></i>
        </span>
      </span>
    </div>
  </div>
</div>
```

### 2.7 Operator Dropdown (Trigger)

```html
<div class="el-select">
  <div class="el-input el-input--suffix is-arrow">
    <input class="el-input__inner"
           data-test-id="funnel-steps-step-{N}-property-select-condition-dropdown-{ROW}-select-input"
           type="text"
           placeholder="Select">
    <span class="el-input__suffix">
      <span class="el-input__suffix-inner">
        <i class="el-select__caret ion-arrow-up-b"
           data-test-id="funnel-steps-step-{N}-property-select-condition-dropdown-{ROW}-select-icon"></i>
      </span>
    </span>
  </div>
</div>
```

- **Error state (property selected, no operator):** `el-select is-error`

### 2.8 Value Field — Disabled Default

```html
<span class="cly-vue-qb-seg__row-wrapper">
  <div class="el-input is-disabled">
    <input class="el-input__inner"
           data-test-id="funnel-steps-step-{N}-property-select-value-dropdown-{ROW}"
           type="text"
           placeholder="String">
  </div>
</span>
```

### 2.9 Value Field — List Type ("is"/"is not")

```html
<span class="cly-vue-qb-seg__row-wrapper">
  <form>
    <div class="cly-vue-dropdown el-select cly-vue-select-x"
         data-test-id="funnel-steps-step-{N}-property-select-value-dropdown-{ROW}-dropdown-el-select"
         placeholder="Select">
      <div>
        <div class="el-select el-select-head">
          <div class="el-select__tags"></div>
          <div class="el-input el-input--suffix is-arrow">
            <input class="el-input__inner"
                   data-test-id="funnel-steps-step-{N}-property-select-value-dropdown-{ROW}"
                   type="text"
                   placeholder="Select">
          </div>
        </div>
      </div>
    </div>
  </form>
</span>
```

### 2.10 Loading Overlay

```html
<div class="el-loading-mask">
  <div class="el-loading-spinner">
    <i class="el-icon-loading"></i>
    <p class="el-loading-text">Loading...</p>
  </div>
</div>
```

---

## Part 3: Interaction Flows

### 3.1 Flow: Add First Property Row

1. Step rendered. "+ Add property" button is active: `cly-text-button`.
2. User clicks button.
3. New row appended with classes: `cly-vue-qb-seg__row--first cly-vue-qb-seg__row--last`.
4. Property column: `cly-vue-select-x` trigger, empty, placeholder "Select Property" [STATIC/i18n].
5. Operator column: `el-select`, empty, placeholder "Select" [STATIC/i18n], not in error state yet.
6. Value column: `el-input is-disabled`, placeholder "String" [STATIC/i18n].
7. Button becomes disabled: `cly-text-button cly-text-button--disabled`.

### 3.2 Flow: Select Property

1. User clicks property trigger input.
2. Body-level popper opens (`cly-vue-select-x__pop`).
3. Popper shows search box (placeholder "Search in Properties" [STATIC/i18n]) and 5 tabs.
4. "All Properties" tab is active by default.
5. User optionally types to filter list (client-side search on visible items).
6. User optionally switches tab to narrow scope.
7. User clicks a `cly-vue-listbox__item`.
8. Popper closes. Property trigger shows selected property name.
9. Operator field becomes active. Operator shows `el-select is-error` state (required).
10. Value field resets to `el-input is-disabled`.
11. Button remains disabled.

### 3.3 Flow: Select Operator

1. User clicks operator trigger.
2. Standard `el-select` dropdown renders with operator list for the selected property type.
3. User clicks an operator option.
4. Dropdown closes. Operator trigger shows selected operator label.
5. `is-error` class removed from operator field.
6. Value field activates per the operator-to-value-field mapping table (Part 1.4).
7. Button re-enables: `cly-text-button` (no `--disabled`).

### 3.4 Flow: "is set" Operator Selected

1. Operator "is set" selected.
2. Value field is hidden or remains disabled — no input required.
3. Row is complete. Button enables.

### 3.5 Flow: "is between" Operator Selected (NUMERIC)

1. Operator "is between" selected.
2. Value column renders two number inputs side by side.
3. Both inputs have placeholder "Number" [STATIC/i18n].
4. User enters lower bound in first input, upper bound in second.

### 3.6 Flow: List Property + "is"/"is not" Operator

1. User selects a LIST property (e.g., Country).
2. User selects "is" or "is not" operator.
3. Value field renders as `cly-vue-select-x` multi-select trigger with tags.
4. User clicks value trigger.
5. Body-level popper opens with "Search in Values" [STATIC/i18n] search box and "Values" tab.
6. List of checkboxes renders (`el-checkbox-group`).
7. User checks one or more values.
8. Selected values appear as tags (`el-select__tags`) in the collapsed trigger.

### 3.7 Flow: Tab Switching in Property Dropdown

1. Popper is open on "All Properties" (default active tab).
2. User clicks "Event", "User", "Custom", or "Campaign" tab.
3. `el-tabs__item is-active` moves to clicked tab.
4. Listbox refreshes to show only items from that category.
5. Search box remains and filters within active tab.

### 3.8 Flow: Search Filtering

**In property dropdown:**
1. User types in "Search in Properties" input.
2. List filters in real time to matching items across the active tab.
3. Clearing the input restores full list.

**In value dropdown:**
1. User types in "Search in Values" input.
2. Checkbox list filters in real time.
3. Already-checked items remain checked even if filtered out of view.

### 3.9 Flow: Remove a Row

1. User clicks `el-icon-close` inside `cly-icon-button--gray`.
2. Row is removed from DOM.
3. Remaining rows re-index (or keep their existing test-id indexes).
4. If last row removed: "+ Add property" button returns to active state.
5. `--first`/`--last` modifiers reapply based on new row count.

### 3.10 Flow: Add Second Row

1. First row is complete (property + operator selected).
2. Button is active.
3. User clicks "+ Add property".
4. Second row appended with index `1`.
5. First row loses `--last` modifier (keeps `--first`).
6. New row gets `--last` (no `--first` unless it is also the first).
7. Button disables again until second row is configured.

---

## Part 4: HTML Structure and Class Names

### 4.1 Full DOM Hierarchy

```html
<!-- Root: cly-vue-qb-seg -->
<div class="cly-vue-qb-seg">
  <span>
    <div class="bu-columns bu-is-gapless bu-is-multiline">

      <!-- Row container -->
      <div class="bu-column bu-is-12">

        <!-- Loading overlay (conditionally visible) -->
        <div class="el-loading-mask">
          <div class="el-loading-spinner">
            <i class="el-icon-loading"></i>
            <p class="el-loading-text">Loading...</p>
          </div>
        </div>

        <!-- Property filter row (single row has both --first and --last) -->
        <div class="bu-columns bu-is-gapless bu-is-mobile
                    cly-vue-qb-seg__row
                    cly-vue-qb-seg__row--first
                    cly-vue-qb-seg__row--last">
          <div class="bu-column bu-is-12">
            <div class="bu-columns bu-is-gapless bu-is-mobile cly-vue-qb-seg__row-selects">

              <!-- Column 1: Property (4/12) -->
              <div class="bu-column bu-is-4">
                <span>
                  <div class="cly-vue-dropdown el-select cly-vue-select-x"
                       data-test-id="funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-dropdown-el-select"
                       placeholder="Select Property">
                    <div>
                      <div class="cly-input-dropdown-trigger el-input el-input--suffix is-arrow">
                        <input class="el-input__inner"
                               data-test-id="funnel-steps-step-{N}-property-select-property-dropdown-{ROW}"
                               type="text"
                               placeholder="Select Property">
                        <span class="el-input__suffix">
                          <span class="el-input__suffix-inner">
                            <i class="el-select__caret ion-arrow-up-b"></i>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </span>
              </div>

              <!-- Column 2: Operator (3/12) -->
              <div class="bu-column bu-is-3">
                <span>
                  <!-- Error state: el-select is-error (property selected, no operator) -->
                  <div class="el-select [is-error]">
                    <div class="el-input el-input--suffix is-arrow">
                      <input class="el-input__inner"
                             data-test-id="funnel-steps-step-{N}-property-select-condition-dropdown-{ROW}-select-input"
                             type="text"
                             placeholder="Select">
                      <span class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                          <i class="el-select__caret ion-arrow-up-b"
                             data-test-id="funnel-steps-step-{N}-property-select-condition-dropdown-{ROW}-select-icon"></i>
                        </span>
                      </span>
                    </div>
                  </div>
                </span>
              </div>

              <!-- Column 3: Value (4/12) — varies by property type + operator -->

              <!-- Variant A: Disabled default (no operator selected) -->
              <div class="bu-column bu-is-4">
                <span class="cly-vue-qb-seg__row-wrapper">
                  <div class="el-input is-disabled">
                    <input class="el-input__inner"
                           data-test-id="funnel-steps-step-{N}-property-select-value-dropdown-{ROW}"
                           type="text"
                           placeholder="String">
                  </div>
                </span>
              </div>

              <!-- Variant B: List type "is"/"is not" → cly-vue-select-x multi-select -->
              <div class="bu-column bu-is-4">
                <span class="cly-vue-qb-seg__row-wrapper">
                  <form>
                    <div class="cly-vue-dropdown el-select cly-vue-select-x"
                         data-test-id="funnel-steps-step-{N}-property-select-value-dropdown-{ROW}-dropdown-el-select"
                         placeholder="Select">
                      <div>
                        <div class="el-select el-select-head">
                          <div class="el-select__tags"></div>
                          <div class="el-input el-input--suffix is-arrow">
                            <input class="el-input__inner"
                                   data-test-id="funnel-steps-step-{N}-property-select-value-dropdown-{ROW}"
                                   type="text"
                                   placeholder="Select">
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </span>
              </div>

              <!-- Column 4: Close Button (1/12) -->
              <div class="bu-column bu-is-1
                          bu-is-flex bu-is-align-items-center bu-is-justify-content-center">
                <div class="cly-icon-button cly-icon-button--gray cly-vue-qb-icon">
                  <i class="el-icon-close"
                     data-test-id="funnel-steps-step-{N}-qbs-close-button-{ROW}"></i>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- Add Property Button -->
      <div class="bu-column bu-is-12 bu-mt-2">
        <div class="bu-columns bu-is-gapless bu-is-mobile">
          <div class="bu-column bu-is-2">
            <!-- Active: cly-text-button | Disabled: cly-text-button cly-text-button--disabled -->
            <div class="cly-text-button [cly-text-button--disabled]"
                 data-test-id="funnel-steps-step-{N}-add-property-button">
              + Add property
            </div>
          </div>
        </div>
      </div>

    </div>
  </span>
</div>
```

### 4.2 Property Dropdown Popper (body-level)

```html
<div class="cly-vue-select-x__pop">
  <div class="cly-vue-select-x__header">
    <div class="bu-level">
      <div class="bu-level-item">
        <div class="el-input el-input--prefix">
          <input class="el-input__inner"
                 data-test-id="funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-search-box"
                 type="text"
                 placeholder="Search in Properties">
          <span class="el-input__prefix">
            <i class="el-input__icon el-icon-search"
               data-test-id="funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-search-icon"></i>
          </span>
        </div>
      </div>
    </div>
  </div>

  <!-- Tabs -->
  <div class="el-tabs el-tabs--top">
    <div class="el-tabs__header is-top">
      <div class="el-tabs__nav is-top">
        <div class="el-tabs__item is-top [is-active]">
          <span data-test-id="funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-el-tab-all-properties">All Properties</span>
        </div>
        <div class="el-tabs__item is-top">
          <span data-test-id="funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-el-tab-event">Event</span>
        </div>
        <div class="el-tabs__item is-top">
          <span data-test-id="funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-el-tab-user">User</span>
        </div>
        <div class="el-tabs__item is-top">
          <span data-test-id="funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-el-tab-custom">Custom</span>
        </div>
        <div class="el-tabs__item is-top">
          <span data-test-id="funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-el-tab-campaign">Campaign</span>
        </div>
      </div>
    </div>
    <div class="el-tabs__content">
      <div class="el-tab-pane">
        <div class="cly-vue-listbox scroll-keep-show cly-vue-listbox--has-margin cly-vue-listbox--has-default-skin">
          <div class="cly-vue-listbox__items-wrapper"
               data-test-id="funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-scroll">
            <!-- Each property item -->
            <div class="text-medium cly-vue-listbox__item [selected]"
                 data-test-id="funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-item">
              <span class="cly-vue-listbox__item-label"
                    data-test-id="funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-item-{property-slug}">
                {Property Name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 4.3 Value Dropdown Popper — List Type (body-level)

```html
<div class="cly-vue-select-x__pop">
  <div class="cly-vue-select-x__header">
    <div class="bu-level">
      <div class="bu-level-item">
        <div class="el-input el-input--prefix">
          <input class="el-input__inner"
                 data-test-id="funnel-steps-step-{N}-property-select-value-dropdown-{ROW}-search-box"
                 type="text"
                 placeholder="Search in Values">
          <span class="el-input__prefix">
            <i class="el-input__icon el-icon-search"
               data-test-id="funnel-steps-step-{N}-property-select-value-dropdown-{ROW}-search-icon"></i>
          </span>
        </div>
      </div>
    </div>
  </div>

  <!-- Single tab: Values -->
  <div class="el-tabs el-tabs--top">
    <div class="el-tabs__header is-top">
      <div class="el-tabs__nav is-top">
        <div class="el-tabs__item is-top is-active">
          <span data-test-id="funnel-steps-step-{N}-property-select-value-dropdown-{ROW}-el-tab-values">Values</span>
        </div>
      </div>
    </div>
    <div class="el-tabs__content">
      <div class="el-tab-pane">
        <div class="cly-vue-listbox scroll-keep-show cly-vue-listbox--has-margin cly-vue-listbox--has-default-skin">
          <div class="cly-vue-listbox__items-wrapper">
            <div class="el-checkbox-group">
              <!-- Each value item -->
              <div class="text-medium cly-vue-listbox__item">
                <label class="el-checkbox has-tooltip">
                  <span class="el-checkbox__input"
                        data-test-id="funnel-steps-step-{N}-property-select-value-dropdown-{ROW}-checklistbox-{value-slug}-el-checkbox-input">
                    <span class="el-checkbox__inner"></span>
                    <input class="el-checkbox__original"
                           data-test-id="funnel-steps-step-{N}-property-select-value-dropdown-{ROW}-checklistbox-{value-slug}-el-checkbox-button"
                           type="checkbox">
                  </span>
                  <span class="el-checkbox__label"
                        data-test-id="funnel-steps-step-{N}-property-select-value-dropdown-{ROW}-checklistbox-{value-slug}-el-checkbox-label">
                    {Value Name}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 4.4 Class Reference

| Class | Purpose |
|---|---|
| `cly-vue-qb-seg` | Root component wrapper |
| `cly-vue-qb-seg__row` | Individual property filter row |
| `cly-vue-qb-seg__row--first` | First row modifier |
| `cly-vue-qb-seg__row--last` | Last row modifier |
| `cly-vue-qb-seg__row-selects` | Wrapper for the 4 columns |
| `cly-vue-qb-seg__row-wrapper` | Inner wrapper for value column |
| `cly-vue-qb-icon` | Icon button container in QB context |
| `cly-vue-select-x` | Extended select dropdown component |
| `cly-vue-select-x__pop` | Body-level popper container |
| `cly-vue-select-x__header` | Popper header (search box) |
| `cly-vue-dropdown` | Dropdown wrapper |
| `cly-input-dropdown-trigger` | Trigger input for custom dropdown |
| `cly-text-button` | Text-style button |
| `cly-text-button--disabled` | Disabled state modifier |
| `cly-icon-button` | Icon button |
| `cly-icon-button--gray` | Gray color variant |
| `cly-vue-listbox` | List container in dropdown |
| `cly-vue-listbox--has-margin` | Margin modifier |
| `cly-vue-listbox--has-default-skin` | Default skin modifier |
| `cly-vue-listbox__items-wrapper` | Scrollable items container |
| `cly-vue-listbox__item` | Individual list item |
| `cly-vue-listbox__item-label` | Item label text |
| `el-select` | Element UI select |
| `el-select-head` | Select head (multi-select trigger) |
| `el-select__tags` | Tags container (selected values) |
| `el-select__caret` | Dropdown arrow icon |
| `el-input` | Element UI input |
| `el-input--suffix` | Input with suffix slot |
| `el-input--prefix` | Input with prefix slot |
| `el-input__inner` | Actual input element |
| `el-input__suffix` | Suffix container |
| `el-input__prefix` | Prefix container |
| `el-input__suffix-inner` | Inner suffix wrapper |
| `el-input__icon` | Icon in input |
| `el-icon-close` | Close/X icon |
| `el-icon-search` | Search icon |
| `el-icon-loading` | Loading spinner icon |
| `el-loading-mask` | Loading overlay |
| `el-loading-spinner` | Spinner container |
| `el-loading-text` | Loading text |
| `el-tabs` | Tab component |
| `el-tabs--top` | Top-aligned tabs |
| `el-tabs__header` | Tab header bar |
| `el-tabs__nav` | Tab navigation |
| `el-tabs__item` | Individual tab |
| `el-tabs__item.is-active` | Active tab |
| `el-tabs__content` | Tab content area |
| `el-tab-pane` | Individual tab pane |
| `el-checkbox` | Checkbox element |
| `el-checkbox__input` | Checkbox input wrapper |
| `el-checkbox__inner` | Visual checkbox box |
| `el-checkbox__original` | Native checkbox input |
| `el-checkbox__label` | Checkbox label text |
| `el-checkbox-group` | Group container for checkboxes |
| `is-disabled` | Disabled state (el-input) |
| `is-error` | Error state (el-select) |
| `is-active` | Active state (tabs) |
| `is-arrow` | Arrow indicator variant |
| `ion-arrow-up-b` | Ionic arrow-up icon |
| `has-tooltip` | Tooltip trigger |
| `selected` | Selected item state |
| `scroll-keep-show` | Persistent scrollbar |
| `bu-columns` | Bulma columns |
| `bu-column` | Bulma column |
| `bu-is-1` through `bu-is-4` | Bulma column widths |
| `bu-is-12` | Full width Bulma column |
| `bu-is-gapless` | No gap between columns |
| `bu-is-mobile` | Mobile breakpoint |
| `bu-is-multiline` | Multi-line columns |
| `bu-is-flex` | Flex container |
| `bu-is-align-items-center` | Flex align center |
| `bu-is-justify-content-center` | Flex justify center |
| `bu-level` | Bulma level layout |
| `bu-level-item` | Bulma level item |
| `bu-mt-2` | Margin top 2 |
| `text-medium` | Medium text weight |
| `body-level` | Body-level rendering marker |

---

## Part 5: N/A

Cee AI is not applicable to this component.

---

## Part 6: Localization and Data Rules

### 6.1 Tag Legend

- **[STATIC/i18n]** — Hard-coded UI string, must be passed through the i18n translation system.
- **[STATIC/FIXED]** — Hard-coded constant, not translated (e.g., input type="number").
- **[DYNAMIC/DB]** — Value fetched from the server/database at runtime.

### 6.2 Strings by Category

| String | Location | Tag |
|---|---|---|
| "+ Add property" | Button label | [STATIC/i18n] |
| "Select Property" | Property dropdown placeholder | [STATIC/i18n] |
| "Select" | Operator dropdown placeholder | [STATIC/i18n] |
| "String" | Value input placeholder (disabled default) | [STATIC/i18n] |
| "Number" | Value input placeholder (numeric) | [STATIC/i18n] |
| "Search in Properties" | Property popper search box placeholder | [STATIC/i18n] |
| "Search in Values" | Value popper search box placeholder | [STATIC/i18n] |
| "All Properties" | Tab label | [STATIC/i18n] |
| "Event" | Tab label | [STATIC/i18n] |
| "User" | Tab label | [STATIC/i18n] |
| "Custom" | Tab label | [STATIC/i18n] |
| "Campaign" | Tab label | [STATIC/i18n] |
| "Values" | Value popper tab label | [STATIC/i18n] |
| "Loading..." | Loading mask text | [STATIC/i18n] |
| Operator labels (is, is not, is between, etc.) | Operator dropdown options | [STATIC/i18n] |
| Property names (Country, Age, Duration, etc.) | Property list items | [DYNAMIC/DB] |
| Custom property names (Acquisition Source, etc.) | Custom tab property list | [DYNAMIC/DB] |
| Value items (country names, city names, etc.) | Value checkbox list | [DYNAMIC/DB] |
| Campaign property names | Campaign tab property list | [DYNAMIC/DB] |

### 6.3 Data Sources

| Data | Source | Notes |
|---|---|---|
| Event properties | App event schema | Per-app, fetched at component mount |
| User properties (standard) | Countly core user profile fields | Same across apps |
| Custom properties | App custom user property schema | Per-app, fetched at component mount |
| Campaign properties | Campaign attribution schema | Dependent on campaign plugin |
| LIST values (Country, City, etc.) | Countly metrics API | Filtered by app and time range |
| Operator lists | Client-side constant map | Keyed by property type (NUMERIC/STRING/LIST) |
| Property type classification | App schema metadata | Determines operator set and value field type |

---

## Appendix A: data-test-id Index

| Element | data-test-id Pattern |
|---|---|
| Add property button | `funnel-steps-step-{N}-add-property-button` |
| Property dropdown (el-select wrapper) | `funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-dropdown-el-select` |
| Property dropdown trigger input | `funnel-steps-step-{N}-property-select-property-dropdown-{ROW}` |
| Property dropdown search box | `funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-search-box` |
| Property dropdown search icon | `funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-search-icon` |
| Property dropdown tab: All Properties | `funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-el-tab-all-properties` |
| Property dropdown tab: Event | `funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-el-tab-event` |
| Property dropdown tab: User | `funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-el-tab-user` |
| Property dropdown tab: Custom | `funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-el-tab-custom` |
| Property dropdown tab: Campaign | `funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-el-tab-campaign` |
| Property dropdown scroll container | `funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-scroll` |
| Property dropdown item (container) | `funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-item` |
| Property dropdown item (label) | `funnel-steps-step-{N}-property-select-property-dropdown-{ROW}-item-{property-slug}` |
| Operator dropdown trigger input | `funnel-steps-step-{N}-property-select-condition-dropdown-{ROW}-select-input` |
| Operator dropdown caret icon | `funnel-steps-step-{N}-property-select-condition-dropdown-{ROW}-select-icon` |
| Value field (all types, trigger input) | `funnel-steps-step-{N}-property-select-value-dropdown-{ROW}` |
| Value dropdown (el-select wrapper) | `funnel-steps-step-{N}-property-select-value-dropdown-{ROW}-dropdown-el-select` |
| Value dropdown search box | `funnel-steps-step-{N}-property-select-value-dropdown-{ROW}-search-box` |
| Value dropdown search icon | `funnel-steps-step-{N}-property-select-value-dropdown-{ROW}-search-icon` |
| Value dropdown tab: Values | `funnel-steps-step-{N}-property-select-value-dropdown-{ROW}-el-tab-values` |
| Value checkbox (input wrapper) | `funnel-steps-step-{N}-property-select-value-dropdown-{ROW}-checklistbox-{value-slug}-el-checkbox-input` |
| Value checkbox (native input) | `funnel-steps-step-{N}-property-select-value-dropdown-{ROW}-checklistbox-{value-slug}-el-checkbox-button` |
| Value checkbox (label) | `funnel-steps-step-{N}-property-select-value-dropdown-{ROW}-checklistbox-{value-slug}-el-checkbox-label` |
| Close/remove row button | `funnel-steps-step-{N}-qbs-close-button-{ROW}` |

**Variables:**
- `{N}` = step number (1-indexed, e.g., `1`, `2`, `3`)
- `{ROW}` = row index (0-indexed, e.g., `0`, `1`, `2`)
- `{property-slug}` = kebab-case property identifier (e.g., `country`, `age`, `app-version`, `duration`)
- `{value-slug}` = kebab-case value identifier (e.g., `us`, `gb`, `male`, `female`)

---

## Appendix B: Component Dependency Map

```
cly-vue-qb-seg
├── el-loading-mask (Element UI — conditional)
├── cly-vue-qb-seg__row (× N rows)
│   ├── Column 1: cly-vue-select-x (Countly custom)
│   │   └── Popper: cly-vue-select-x__pop (body-level)
│   │       ├── Search: el-input el-input--prefix
│   │       └── Tabs: el-tabs
│   │           └── List: cly-vue-listbox
│   │               └── Items: cly-vue-listbox__item
│   ├── Column 2: el-select (Element UI)
│   │   └── Popper: el-select-dropdown (body-level, standard)
│   ├── Column 3: [conditional]
│   │   ├── el-input is-disabled (no operator)
│   │   ├── el-input[type=text/number] (string/numeric)
│   │   ├── [two el-inputs] (is between)
│   │   └── cly-vue-select-x multi-select (list type)
│   │       └── Popper: cly-vue-select-x__pop (body-level)
│   │           ├── Search: el-input el-input--prefix
│   │           └── Tabs: el-tabs (Values only)
│   │               └── List: cly-vue-listbox
│   │                   └── Items: el-checkbox-group > el-checkbox
│   └── Column 4: cly-icon-button (el-icon-close)
└── cly-text-button (+ Add property)
```
