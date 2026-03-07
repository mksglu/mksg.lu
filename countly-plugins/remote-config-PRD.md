# PRD: Remote Config — Add Parameter Drawer

**Plugin:** Remote Config
**Feature:** Add / Edit Parameter Drawer
**Drawer Type:** `cly-vue-drawer`, single-step
**URL:** `http://mert.count.ly/dashboard#/<appId>/remote-config`
**Date:** 2026-02-27

---

## 1. Scope & Context

### 1.1 Purpose

The "Add Parameter" drawer allows product and engineering teams to create remote configuration key-value pairs that are delivered to mobile (and other) Countly SDK clients at runtime. Parameters can carry a default value plus per-condition overrides, enabling A/B testing, feature flags, and phased rollouts without shipping a new app build.

### 1.2 Trigger Points

- Clicking the primary "Add Parameter" button on the Remote Config list view opens the drawer in **create** mode.
- Clicking an existing parameter row opens the drawer in **edit** mode (same component, pre-populated fields).

### 1.3 Scope Boundaries

- **In scope:** drawer structure, form fields, conditions system, default value editor (plain text + JSON toggle), expiration toggle, save/cancel flow, confirm dialog on unsaved changes.
- **Out of scope:** Remote Config list table, SDK delivery logic, A/B test targeting backend.

---

## 2. Component Hierarchy

```
cly-vue-drawer.cly-vue-drawer--half-screen.cly-vue-drawer--half-screen-6
  └── [Drawer Header]  .cly-vue-drawer__header
        ├── .cly-vue-drawer__title-container
        │     ├── .cly-vue-drawer__title-header
        │     │     └── .cly-vue-drawer__title  (t=drawer-test-id-header-title)
        │     └── .cly-vue-drawer__close-button  (t=drawer-test-id-close-button)
        └── .cly-vue-drawer__controls-left-pc
  └── [Drawer Body]    .cly-vue-drawer__steps-wrapper
        └── .cly-vue-drawer__steps-container
              └── .cly-vue-drawer__steps-view
                    └── .cly-vue-drawer__body-container
                          └── .cly-vue-drawer__sidecars-view
                                └── .cly-vue-drawer-step__section-group (single step)
                                      └── .cly-vue-drawer-step__section
                                            ├── [Parameter Key Field]
                                            ├── [Default Value Field]
                                            ├── [Description Checkbox]
                                            ├── [Conditions Section]
                                            └── [Expiration Section]
  └── [Drawer Footer]  .cly-vue-drawer__footer
        └── .cly-vue-drawer__buttons
              ├── Cancel button  (t=drawer-test-id-cancel-button)
              └── Save button    (t=drawer-test-id-save-button)
```

### 2.1 Overlay Dialogs

- **Confirm Dialog** (`cly-vue-confirm-dialog.cly-vue-dialog.el-dialog`) — shown when navigating away with unsaved changes.
- **New Condition Dialog** (`cly-vue-remote-config-condition-dialog`) — shown when clicking "New Condition".
- **Add Value for Condition Dropdown** (`cly-vue-dropdown`) — shown when clicking "+ Add value for condition".

---

## 3. HTML Structure & Class Names

### 3.1 Drawer Root

```html
<div c="cly-vue-drawer cly-vue-drawer--half-screen cly-vue-drawer--half-screen-6 is-mounted is-open is-single-step">
```

| Modifier class | Meaning |
|---|---|
| `cly-vue-drawer--half-screen` | Half-screen width drawer variant |
| `cly-vue-drawer--half-screen-6` | Six-column grid column span (Bulma) |
| `is-mounted` | Component has been mounted to DOM |
| `is-open` | Drawer is currently visible |
| `is-single-step` | No multi-step navigation; single content pane |

### 3.2 Header

```html
<div c="cly-vue-drawer__header">
  <div c="cly-vue-drawer__title-container">
    <div c="cly-vue-drawer__title-header">
      <h3 c="cly-vue-drawer__title" t="drawer-test-id-header-title">Add Parameter</h3>
    </div>
    <i c="ion-ios-close-empty cly-vue-drawer__close-button" t="drawer-test-id-close-button"></i>
  </div>
  <div c="cly-vue-drawer__controls-left-pc"></div>
</div>
```

### 3.3 Body / Step Container

```html
<div c="cly-vue-drawer__steps-wrapper">
  <div c="cly-vue-drawer__steps-container">
    <div c="cly-vue-drawer__steps-view">
      <div c="cly-vue-drawer__body-container">
        <div c="cly-vue-drawer__sidecars-view">
          <div c="cly-vue-drawer-step__section-group cly-vue-drawer-step__section-group--filled">
            <div c="cly-vue-drawer-step__section">
              <!-- Form fields here -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 3.4 Form Section Layout

Each form field uses the Countly form-field wrapper pattern:

```html
<div c="cly-vue-form-field">
  <div c="cly-vue-form-step__section">
    <!-- optional header label -->
    <div c="cly-vue-form-field__inner">
      <!-- input element -->
    </div>
  </div>
</div>
```

The header label (when present) is identified by `t="cly-form-field-test-id-header"`.

### 3.5 Footer

```html
<div c="cly-vue-drawer__footer">
  <div c="cly-vue-drawer__buttons bu-is-flex bu-is-justify-content-flex-end">
    <button c="el-button el-button--secondary el-button--small" t="drawer-test-id-cancel-button" tp="button">
      <span>Cancel</span>
    </button>
    <button c="el-button el-button--success el-button--small is-disabled" t="drawer-test-id-save-button" tp="button">
      <span>Save</span>
    </button>
  </div>
</div>
```

### 3.6 Confirm Dialog (Unsaved Changes)

```html
<div c="cly-vue-confirm-dialog cly-vue-dialog el-dialog el-dialog--center el-dialog--centered" r="dialog">
  <div c="el-dialog__header">
    <h3 t="cly-vue-dialog-test-id-cly-dialog-title-label"><!-- title --></h3>
  </div>
  <!-- body content -->
  <div c="el-dialog__footer cly-vue-formdialog__buttons">
    <button t="cly-vue-confirm-dialog-test-id-cly-confirm-dialog-cancel-button">Cancel</button>
    <button t="cly-vue-confirm-dialog-test-id-cly-confirm-dialog-save-button">Save</button>
  </div>
</div>
```

---

## 4. Design Tokens

### 4.1 Color Utilities (Bulma + Countly overrides)

| Token class | Usage |
|---|---|
| `color-cool-gray-40` | Muted / secondary text |
| `color-cool-gray-50` | Disabled or placeholder text |
| `color-cool-gray-100` | Primary body text |
| `color-blue-100` | Interactive / link color (e.g. "+ Add value for condition" button text) |
| `bg-light-blue-100` | Light blue background on interactive secondary buttons |

### 4.2 Typography Utilities

| Token class | Usage |
|---|---|
| `text-big` | Large heading text |
| `text-heading` | Section heading size |
| `text-small` | Small body text |
| `text-smallish` | Slightly below body size, used for labels |
| `font-weight-bold` | Bold weight |
| `bu-has-text-weight-normal` | Normal weight override |

### 4.3 Spacing Utilities (Bulma `bu-` prefix)

| Class | CSS equivalent |
|---|---|
| `bu-mb-1` | `margin-bottom: 0.25rem` |
| `bu-mb-2` | `margin-bottom: 0.5rem` |
| `bu-mt-1` | `margin-top: 0.25rem` |
| `bu-mt-2` | `margin-top: 0.5rem` |
| `bu-mt-4` | `margin-top: 1rem` |
| `bu-mr-2` | `margin-right: 0.5rem` |
| `bu-ml-3` | `margin-left: 0.75rem` |
| `bu-pb-1` | `padding-bottom: 0.25rem` |
| `bu-pb-4` | `padding-bottom: 1rem` |
| `bu-pb-5` | `padding-bottom: 1.25rem` |
| `bu-pt-3` | `padding-top: 0.75rem` |
| `bu-pt-4` | `padding-top: 1rem` |
| `bu-py-1` | `padding-top/bottom: 0.25rem` |
| `bu-py-4` | `padding-top/bottom: 1rem` |

### 4.4 Layout Utilities

| Class | Usage |
|---|---|
| `bu-is-flex` | `display: flex` |
| `bu-is-align-items-center` | `align-items: center` |
| `bu-is-justify-content-flex-end` | `justify-content: flex-end` |
| `bu-is-justify-content-space-between` | `justify-content: space-between` |
| `bu-is-gapless` | No column gap |
| `bu-is-mobile` | Mobile breakpoint modifier |
| `bu-columns` / `bu-column` / `bu-is-12` | Bulma column grid |
| `bu-level` / `bu-level-item` | Bulma level horizontal alignment |
| `scroll-keep-show` | Keep scrollbar visible |
| `scroll-shadow-container` | Shadow scroll container |

---

## 5. Form Fields

### 5.1 Parameter Key

| Property | Value |
|---|---|
| Test ID | `parameter-key-input` |
| Type | `text` (input) |
| Role | `textbox` |
| Placeholder | `Enter parameter key name` |
| Component | `el-autocomplete` / `el-input` (with prefix search icon) |
| Classes | `cly-vue-remote-config-parameters-drawer__autocomplete`, `el-autocomplete`, `el-input--prefix`, `el-input__prefix`, `el-icon-search` |
| Character count | Yes — `el-input__count` / `el-input__count-inner` |
| Suffix | None |
| Validation | Required; must be unique key name; enables Save button when non-empty |

The autocomplete wrapper includes a JSON toggle button:

```html
<button c="el-button cly-vue-remote-config-parameters-drawer__autocomplete-button el-button--text" tp="button">
  <span>{ }</span>
</button>
```

This button is positioned within `cly-vue-remote-config-parameters-drawer__autocomplete` and likely toggles the default value field between plain text and JSON editor modes.

#### Autocomplete Suggestion Dropdown

```html
<div c="el-autocomplete-suggestion el-popper">
  <div c="el-autocomplete-suggestion__wrap el-scrollbar">
    <ul c="el-autocomplete-suggestion__list">
      <!-- suggestion items -->
    </ul>
  </div>
</div>
```

### 5.2 Default Value

| Property | Value |
|---|---|
| Test ID | `default-value-input` |
| Type | `text` (input) |
| Role | `textbox` |
| Placeholder | `Enter default value` |
| Component | `el-input` with suffix |
| Classes | `cly-vue-remote-config-parameters-drawer__default-value`, `el-input--suffix`, `el-input__suffix`, `el-input__suffix-inner` |
| Character count | Yes — `el-input__count` / `el-input__count-inner` |
| JSON Mode | Toggled via the `{ }` button on the Parameter Key field; switches to `cly-vue-remote-config-conditions-drawer-json-editor` |

In JSON editor mode:

```html
<div c="cly-vue-remote-config-conditions-drawer-json-editor">
  <!-- CodeMirror or similar JSON editor -->
</div>
```

### 5.3 Description (Optional)

| Property | Value |
|---|---|
| Test ID | `parameter-description-el-checkbox-button` / `parameter-description-el-checkbox-input` / `parameter-description-el-checkbox-label` |
| Type | `checkbox` |
| Role | Implicit checkbox |
| Label | "Description" (optional) |
| Classes | `el-checkbox`, `el-checkbox__input`, `el-checkbox__inner`, `el-checkbox__label`, `el-checkbox__original` |
| Behavior | When checked, reveals a description textarea (not visible in unchecked state) |

```html
<label c="el-checkbox" t="parameter-description-el-checkbox-button">
  <span c="el-checkbox__input">
    <span c="el-checkbox__inner"></span>
    <input c="el-checkbox__original" tp="checkbox" r="checkbox"
           t="parameter-description-el-checkbox-input">
  </span>
  <span c="el-checkbox__label" t="parameter-description-el-checkbox-label">
    Description (optional)
  </span>
</label>
```

### 5.4 Conditions

See Section 9 (Conditions System) for full detail.

### 5.5 Expiration

| Property | Value |
|---|---|
| Component | `el-switch` |
| Test IDs | `el-switch-test-id-el-switch-wrapper`, `el-switch-test-id-el-switch-core`, `el-switch-test-id-el-switch-input` |
| Role | `switch` |
| Label | "Expiration" or similar |
| Default state | Off |
| Classes | `el-switch`, `el-switch__core`, `el-switch__input` |

When toggled on, a date/time picker or input field becomes visible (not rendered in the captured HTML snapshot, implying `v-if` or `v-show` conditional rendering).

```html
<div c="el-switch" t="el-switch-test-id-el-switch-wrapper" r="switch" aria-checked="false">
  <input c="el-switch__input" tp="checkbox" t="el-switch-test-id-el-switch-input">
  <span c="el-switch__core" t="el-switch-test-id-el-switch-core"></span>
</div>
```

---

## 6. State Transitions

### 6.1 Drawer Open States

| State | Description |
|---|---|
| Initial (empty) | All fields blank; Save button `is-disabled` |
| Partially filled | Key entered, default value empty or vice versa; Save remains disabled if required fields empty |
| Valid (ready to save) | Required fields filled; `is-disabled` removed from Save button |
| Submitting | Save clicked; loading state on button (spinner or disabled) |
| Success | Drawer closes; list refreshes |
| Error | Inline error messages shown; drawer stays open |

### 6.2 Save Button

```html
<!-- Disabled state -->
<button c="el-button el-button--success el-button--small is-disabled" t="drawer-test-id-save-button">
  <span>Save</span>
</button>

<!-- Enabled state (is-disabled removed) -->
<button c="el-button el-button--success el-button--small" t="drawer-test-id-save-button">
  <span>Save</span>
</button>
```

Save is disabled until at minimum the Parameter Key field is non-empty.

### 6.3 Cancel / Close Behavior

- Clicking Cancel (`drawer-test-id-cancel-button`) or the close icon (`drawer-test-id-close-button`) when form is **pristine** (no changes): closes drawer immediately.
- Clicking Cancel or close when form has **unsaved changes**: shows `cly-vue-confirm-dialog` with Cancel / Save options.

### 6.4 Confirm Dialog States

| Action | Result |
|---|---|
| Confirm "Cancel" (`cly-confirm-dialog-cancel-button`) | Closes dialog; returns to drawer (does NOT discard) |
| Confirm "Save" (`cly-confirm-dialog-save-button`) | Saves data and closes drawer |

### 6.5 JSON Toggle

- Default mode: plain `el-input` text field for default value.
- JSON mode (after clicking `{ }` button): `cly-vue-remote-config-conditions-drawer-json-editor` rendered; `el-input` hidden.
- Toggling back resets editor to plain text mode (with value carried over if valid).

### 6.6 Description Checkbox

- Unchecked (default): description textarea hidden.
- Checked: description textarea rendered below checkbox.

### 6.7 Expiration Toggle

- Off (default): no date input rendered.
- On: expiration date/time field appears.

---

## 7. Element UI Components

### 7.1 `el-input`

Used for Parameter Key and Default Value fields.

| Sub-element | Class |
|---|---|
| Root | `el-input`, `el-input--prefix` or `el-input--suffix` |
| Native input | `el-input__inner` |
| Prefix icon wrapper | `el-input__prefix` |
| Prefix icon | `el-icon-search` |
| Suffix wrapper | `el-input__suffix` |
| Suffix inner | `el-input__suffix-inner` |
| Character count | `el-input__count`, `el-input__count-inner` |

### 7.2 `el-autocomplete`

Extends `el-input` with a suggestion dropdown. The suggestion popper is `el-popper`:

```html
<div c="el-autocomplete-suggestion el-popper">
  <div c="el-autocomplete-suggestion__wrap el-scrollbar">
    <div c="el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
      <div c="el-scrollbar__view">
        <ul c="el-autocomplete-suggestion__list">
          <!-- li items -->
        </ul>
      </div>
    </div>
    <div c="el-scrollbar__bar is-vertical">
      <div c="el-scrollbar__thumb"></div>
    </div>
    <div c="el-scrollbar__bar is-horizontal">
      <div c="el-scrollbar__thumb"></div>
    </div>
  </div>
</div>
```

### 7.3 `el-checkbox`

Used for the optional Description field toggle.

### 7.4 `el-switch`

Used for the Expiration toggle.

### 7.5 `el-button`

Three variants in use:

| Variant | Class | Usage |
|---|---|---|
| Secondary | `el-button--secondary el-button--small` | Cancel |
| Success | `el-button--success el-button--small` | Save, "New Condition" |
| Text | `el-button--text` | `{ }` JSON toggle, "+ Add value for condition" |

The "+ Add value for condition" button also has `bg-light-blue-100 color-blue-100` for styling.

### 7.6 `el-tabs`

Used inside the Add Value for Condition dropdown to switch between input modes (e.g., plain value vs. JSON):

| Sub-element | Class |
|---|---|
| Root | `el-tabs`, `el-tabs--top` |
| Header | `el-tabs__header` |
| Nav wrap | `el-tabs__nav-wrap` |
| Nav scroll | `el-tabs__nav-scroll` |
| Nav | `el-tabs__nav` |
| Active bar | `el-tabs__active-bar` |
| Tab item | `el-tabs__item` |
| Content | `el-tabs__content` |
| Pane | `el-tab-pane` |

The root tab element has test ID `add-value-for-condition-el-tab-__root`.

### 7.7 `el-select`

Used inside the Add Value for Condition dropdown for selecting the condition operator or type. Test ID: `add-value-for-condition-dropdown-el-select`.

### 7.8 `el-scrollbar`

Standard Element UI scrollbar wrapper used throughout the drawer body and dropdowns.

### 7.9 `el-form-item`

Standard Element UI form wrapper for validation messages. Contains the form field inputs.

### 7.10 `el-dialog`

Base dialog component used by `cly-vue-dialog` / `cly-vue-confirm-dialog`.

---

## 8. Countly Custom Components

### 8.1 `cly-vue-drawer`

The primary drawer container. Single-step variant activated by `is-single-step` class (no step navigation rendered). Half-screen width variant via `cly-vue-drawer--half-screen`.

**Key internal regions:**

| Region | Class |
|---|---|
| Title | `cly-vue-drawer__title` |
| Title container | `cly-vue-drawer__title-container` |
| Title header | `cly-vue-drawer__title-header` |
| Close button | `cly-vue-drawer__close-button` |
| Left controls | `cly-vue-drawer__controls-left-pc` |
| Steps wrapper | `cly-vue-drawer__steps-wrapper` |
| Steps container | `cly-vue-drawer__steps-container` |
| Steps view | `cly-vue-drawer__steps-view` |
| Body container | `cly-vue-drawer__body-container` |
| Sidecars view | `cly-vue-drawer__sidecars-view` |
| Footer | `cly-vue-drawer__footer` |
| Buttons row | `cly-vue-drawer__buttons` |

**Step separator line:** `cly-vue-drawer-step__line`, `cly-vue-drawer-step__line--aligned`

**Step section group:** `cly-vue-drawer-step__section-group`, modifier `--filled` for background fill.

### 8.2 `cly-vue-form-field`

Wraps each form field. Contains:
- Header label (`t="cly-form-field-test-id-header"`)
- Inner content (`cly-vue-form-field__inner`)

### 8.3 `cly-vue-form-step__section` / `cly-vue-form-field`

Used to group related form fields within a single step. Each section renders inside `cly-vue-drawer-step__section`.

### 8.4 `cly-vue-confirm-dialog`

Confirm dialog shown on unsaved-changes navigation. Extends `cly-vue-dialog`.

**Test IDs:**
- Dialog title: `cly-vue-dialog-test-id-cly-dialog-title-label`
- Cancel: `cly-vue-confirm-dialog-test-id-cly-confirm-dialog-cancel-button`
- Save: `cly-vue-confirm-dialog-test-id-cly-confirm-dialog-save-button`

### 8.5 `cly-vue-select-x`

Advanced select component used in the conditions area:

```html
<div c="cly-vue-select-x">
  <div c="cly-vue-select-x__header"><!-- selected value --></div>
  <div c="cly-vue-select-x__pop cly-vue-select-x__pop--hidden-tabs">
    <!-- dropdown options -->
  </div>
</div>
```

The `--hidden-tabs` modifier hides tab navigation in the pop-out panel.

### 8.6 `cly-vue-dropdown`

Dropdown wrapper for the "Add value for condition" interaction:

```html
<div c="cly-vue-dropdown">
  <div c="cly-vue-dropdown__pop">
    <div c="cly-vue-dropdown__pop-container">
      <!-- content -->
    </div>
  </div>
</div>
```

### 8.7 `cly-vue-listbox`

Listbox used within dropdowns and selects:

```html
<div c="cly-vue-listbox cly-vue-listbox--has-default-skin cly-vue-listbox--has-margin">
  <div c="cly-vue-listbox__no-data" t="cly-listbox-no-match-found-label">
    No match found
  </div>
</div>
```

### 8.8 `cly-vue-content`

Content region wrapper used within the conditions section.

### 8.9 `cly-vue-remote-config-parameters-drawer__autocomplete`

Plugin-specific wrapper around the `el-autocomplete` for the parameter key input. Contains both the autocomplete input and the JSON toggle button (`__autocomplete-button`).

### 8.10 `cly-vue-remote-config-parameters-drawer__default-value`

Plugin-specific class on the default value `el-input`.

### 8.11 `cly-vue-remote-config-conditions-drawer-json-editor`

Full JSON editor component rendered when JSON mode is active. Replaces the plain `el-input` for default value and for per-condition values.

### 8.12 `cly-vue-remote-config-condition-dialog`

Modal dialog for creating a new condition. Triggered by the "New Condition" button (`t="new-condition-button"`).

### 8.13 `cly-vue-remote-config-conditions-drawer__letter-spacing`

Utility class applied in the conditions drawer for letter-spacing adjustments on condition labels.

---

## 9. Conditions System

### 9.1 Overview

Conditions allow parameter values to be overridden for specific audience segments. Each condition has:
- A **condition selector** (which saved condition to apply)
- A **value** for that condition (plain text or JSON)
- An optional **expiration** per condition

### 9.2 Conditions Section Structure

```
[Conditions Section]
  ├── Header row
  │     ├── Label: "Conditions" or similar
  │     └── [New Condition button]
  └── [Condition rows]
        └── Per condition:
              ├── Condition selector (cly-vue-select-x)
              ├── Value input (el-input or JSON editor)
              └── Delete/remove action
```

### 9.3 New Condition Button

```html
<button c="el-button el-button--success el-button--small" t="new-condition-button" tp="button">
  <i c="el-icon-circle-plus"></i>
  <span>New Condition</span>
</button>
```

Clicking opens `cly-vue-remote-config-condition-dialog` where a new segment condition is defined.

### 9.4 Add Value for Condition

```html
<button c="el-button bg-light-blue-100 color-blue-100 el-button--text el-button--small" tp="button">
  <span> + Add value for condition </span>
</button>
```

Clicking opens `cly-vue-dropdown` which contains:

1. A **search input** (`t="add-value-for-condition-search-box"`) with search icon (`t="add-value-for-condition-search-icon"`)
2. An **`el-tabs`** component (`t="add-value-for-condition-el-tab-__root"`) to switch between different value entry modes
3. An **`el-select`** (`t="add-value-for-condition-dropdown-el-select"`) for selecting condition type/operator
4. A **`cly-vue-listbox`** showing available conditions (with "No match found" empty state via `t="cly-listbox-no-match-found-label"`)

The search box has:
- `t="add-value-for-condition-search-box"`, `r="combobox"`, `ph="Search in conditions"`, `tp="text"`
- Wrapping select: `r="listbox"` for accessibility

### 9.5 Condition Value Entry

Each existing condition entry shows:
- A `cly-vue-select-x` to pick the condition from defined segments
- A value entry area (plain text or JSON editor via `cly-vue-remote-config-conditions-drawer-json-editor`)
- The `pl="Select"` placeholder on condition selector

### 9.6 Per-Condition JSON Editor

```html
<div c="cly-vue-remote-config-conditions-drawer-json-editor">
  <!-- JSON editor (CodeMirror-based) -->
</div>
```

Shared class with the default value JSON editor — same component reused.

### 9.7 Tab Structure (Add Value Dropdown)

```html
<div c="el-tabs el-tabs--top" t="add-value-for-condition-el-tab-__root" r="tablist">
  <div c="el-tabs__header is-top">
    <div c="el-tabs__nav-wrap is-top">
      <div c="el-tabs__nav-scroll">
        <div c="el-tabs__nav is-top">
          <div c="el-tabs__active-bar is-top"></div>
          <div c="el-tabs__item is-top" r="tab"><!-- Tab label --></div>
        </div>
      </div>
    </div>
  </div>
  <div c="el-tabs__content">
    <div c="el-tab-pane" r="tabpanel"><!-- Pane content --></div>
  </div>
</div>
```

---

## 10. Implementation Notes

### 10.1 Vue Architecture

- Drawer is a Vue 2/3 single-file component consistent with the `cly-vue-*` Countly component library.
- Single step (no step navigation) — `is-single-step` applied at mount.
- Uses `v-if` / `v-show` for conditional rendering of: description textarea, expiration input, JSON editor.
- Autocomplete suggestions are fetched asynchronously and rendered via `el-autocomplete`.

### 10.2 Test ID Strategy

All interactive elements carry `t="..."` (mapped from `data-test-id` in compact format). Full list:

| Test ID | Element |
|---|---|
| `drawer-test-id-header-title` | Drawer title h3 |
| `drawer-test-id-close-button` | Close icon |
| `drawer-test-id-cancel-button` | Cancel button |
| `drawer-test-id-save-button` | Save button |
| `parameter-key-input` | Parameter key el-input |
| `default-value-input` | Default value el-input |
| `parameter-description-el-checkbox-button` | Description checkbox label |
| `parameter-description-el-checkbox-input` | Description checkbox input |
| `parameter-description-el-checkbox-label` | Description checkbox text |
| `el-switch-test-id-el-switch-wrapper` | Expiration switch root |
| `el-switch-test-id-el-switch-core` | Expiration switch visual |
| `el-switch-test-id-el-switch-input` | Expiration switch native input |
| `new-condition-button` | New Condition button |
| `add-value-for-condition-search-box` | Conditions search input |
| `add-value-for-condition-search-icon` | Conditions search icon |
| `add-value-for-condition-el-tab-__root` | Condition tabs root |
| `add-value-for-condition-dropdown-el-select` | Condition type selector |
| `cly-listbox-no-match-found-label` | Empty state message |
| `cly-form-field-test-id-header` | Form field header label |
| `cly-vue-dialog-test-id-cly-dialog-title-label` | Confirm dialog title |
| `cly-vue-confirm-dialog-test-id-cly-confirm-dialog-cancel-button` | Confirm dialog cancel |
| `cly-vue-confirm-dialog-test-id-cly-confirm-dialog-save-button` | Confirm dialog save |

### 10.3 Accessibility

| Role | Applied to |
|---|---|
| `dialog` | Confirm dialog root |
| `switch` | Expiration `el-switch` |
| `combobox` | Conditions search input |
| `listbox` | Conditions option list |
| `tab` | Each tab item in condition tabs |
| `tablist` | Tabs root |
| `tabpanel` | Tab pane content |
| `textbox` | Text inputs (key, default value) |
| `region` | Scrollable sections |

### 10.4 Validation Rules

| Field | Rule |
|---|---|
| Parameter Key | Required; max length (enforced by character counter); unique across parameters |
| Default Value | Optional in plain mode; must be valid JSON in JSON mode |
| Conditions | At least zero (conditions are optional); each selected condition must have a value |
| Expiration | Valid date/time in the future when enabled |

### 10.5 Character Count

Both the Parameter Key and Default Value inputs render character count indicators using:
- `el-input__count` wrapper
- `el-input__count-inner` for the visible count string (e.g., "12/100")

### 10.6 Scrollbar Implementation

Long content uses Countly/Element UI `el-scrollbar`:
- `el-scrollbar__wrap` with `el-scrollbar__wrap--hidden-default` to hide native scrollbar
- `el-scrollbar__view` as the scrollable content area
- `el-scrollbar__bar.is-vertical` and `is-horizontal` with `el-scrollbar__thumb` for custom scrollbar tracks

### 10.7 Drawer Width

- Class `cly-vue-drawer--half-screen-6` maps to a 6-column (50%) width in the Bulma grid system.
- The drawer slides in from the right.

### 10.8 Known Patterns from Sibling Plugins

- The `{ }` button toggling JSON mode is a pattern shared across Remote Config drawers (default value and per-condition values).
- The conditions system (New Condition dialog + Add value for condition dropdown) is the most complex sub-system in this drawer and follows a two-level pattern: (1) define a condition segment globally, (2) assign a value per parameter per condition.
- The `cly-vue-remote-config-condition-dialog` for defining conditions reuses the same `cly-vue-dialog` base and `cly-vue-confirm-dialog` sub-pattern seen elsewhere in the plugin suite.

### 10.9 Form Dirty Tracking

The drawer tracks form dirtiness to decide whether to show the confirm dialog on close/cancel. Implementation likely uses a Vue `computed` or `watch` comparing current form state to the initial state at open time.

### 10.10 Empty State

When no conditions exist yet:
- `cly-vue-listbox__no-data` with `t="cly-listbox-no-match-found-label"` renders the empty state message.
- The "+ Add value for condition" button is the primary CTA to start adding condition-specific values.
