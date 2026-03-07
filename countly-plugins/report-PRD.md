# PRD: Countly Email Report Drawer (`cly-vue-report-drawer`)

## 1. Scope & Context

This document describes the **Email Reports** Countly plugin drawer — a UI component that allows users to create and schedule automated email reports from Countly analytics data. The drawer surfaces a single-step form enabling users to:

- Name an email report
- Specify recipient email addresses
- Choose between Core and Dashboard report types
- Select one or more applications as data sources
- Pick data metrics categories (Analytics, Events, Revenue, Crash, Ratings, Performance)
- Configure delivery frequency (Daily, Weekly, Monthly)
- Set the delivery time and timezone
- Optionally attach the report as a PDF

Reports are dispatched automatically by the Countly backend on the configured schedule.

---

## 2. Drawer Layout

### Type
Half-screen drawer (`cly-vue-drawer--half-screen`). The modifier class `cly-vue-drawer--half-screen-6` indicates a 6-column grid slot width in the layout system.

### State Classes
On mount and open, the root element carries both `is-mounted` and `is-open`:

```
cly-vue-drawer cly-vue-report-drawer is-mounted is-open cly-vue-drawer--half-screen cly-vue-drawer--half-screen-6
```

### Single Step
This is a single-step drawer. There is no wizard/stepper navigation. The footer renders `is-single-step`:

```
cly-vue-drawer__buttons is-single-step bu-is-justify-content-flex-end bu-is-flex
```

### Regions
| Region | Class |
|---|---|
| Sidecars (empty) | `cly-vue-drawer__sidecars-view` |
| Steps view wrapper | `cly-vue-drawer__steps-view` → `cly-vue-drawer__steps-wrapper` |
| Header | `cly-vue-drawer__header` → `cly-vue-drawer__title` |
| Body | `cly-vue-drawer__steps-container` → `cly-vue-drawer__body-container` |
| Footer | `cly-vue-drawer__footer` |

---

## 3. HTML Structure & Class Names

### Root

```html
<div c="cly-vue-drawer cly-vue-report-drawer is-mounted is-open cly-vue-drawer--half-screen cly-vue-drawer--half-screen-6">
```

### Header

```html
<div c="cly-vue-drawer__header">
  <div c="cly-vue-drawer__title">
    <div c="cly-vue-drawer__title-container bu-is-flex bu-is-justify-content-space-between bu-is-align-items-center">
      <h3 c="cly-vue-drawer__title-header" t="reports-drawer-header-title">Create New Report</h3>
      <div c="cly-vue-drawer__close-button" t="reports-drawer-close-button">
        <i c="ion-ios-close-empty"></i>
      </div>
    </div>
  </div>
</div>
```

### Body Container

```html
<div c="cly-vue-drawer__steps-container">
  <div c="bu-columns bu-is-gapless bu-is-mobile cly-vue-drawer__body-container bu-pb-5 bu-pt-4 bu-mb-2 bu-mt-1">
    <div c="bu-column bu-is-12">
      <div c="cly-vue-content">
        <!-- Form fields rendered inside <span> wrapper -->
      </div>
    </div>
  </div>
</div>
```

### Footer

```html
<div c="cly-vue-drawer__footer">
  <div c="cly-vue-drawer__buttons is-single-step bu-is-justify-content-flex-end bu-is-flex">
    <button c="el-button el-button--secondary el-button--small" t="reports-drawer-cancel-button">Cancel</button>
    <button c="el-button el-button--success el-button--small is-disabled" t="reports-drawer-save-button">Create New E-mail Report</button>
  </div>
</div>
```

Note: The save button carries `is-disabled` until the form is valid.

---

## 4. Design Tokens

### Typography Classes
| Class | Usage |
|---|---|
| `text-big text-heading` | Section heading (Report Type label) |
| `text-medium` | Primary label in radio options (e.g., "Daily", "Weekly") |
| `text-small` | Secondary/description text in radio options |
| `color-cool-gray-50` | Muted gray for secondary text and icons |
| `color-red-100` | Validation error messages |

### Spacing (Bulma utilities)
| Class | Meaning |
|---|---|
| `bu-py-4` | Vertical padding 4 units (Report Type block) |
| `bu-mb-3` | Bottom margin 3 units (Report Type heading) |
| `bu-pb-5` | Bottom padding 5 units (body container) |
| `bu-pt-4` | Top padding 4 units (body container) |
| `bu-mb-2` | Bottom margin 2 units (body container) |
| `bu-mt-1` | Top margin 1 unit (body container) |

### Layout Classes
| Class | Meaning |
|---|---|
| `bu-is-flex` | Flex container |
| `bu-is-justify-content-space-between` | Space-between justification |
| `bu-is-justify-content-flex-end` | Flex-end justification (footer) |
| `bu-is-align-items-center` | Vertical center alignment |
| `bu-columns bu-is-gapless bu-is-mobile` | Gapless Bulma column grid |
| `bu-column bu-is-12` | Full-width single column |

### Icon Classes
| Class | Usage |
|---|---|
| `ion-ios-close-empty` | Drawer close button icon |
| `ion-help-circled` | Tooltip help icon on "Report Type" label |

---

## 5. Form Fields

All form fields use the base wrapper class `cly-vue-form-field cly-vue-form-step__section`. Some fields add block-level modifier classes.

### 5.1 Report Name

```html
<div c="cly-vue-form-field cly-vue-form-step__section">
  <div t="email-report-name-header">E-mail report name</div>
  <div c="el-input">
    <input t="email-report-name-input" tp="text" ph="Enter Report Name">
  </div>
</div>
```

- Label test ID: `email-report-name-header`
- Input test ID: `email-report-name-input`
- Component: `el-input` (Element UI text input)
- Placeholder: `Enter Report Name`

### 5.2 Email Recipients

```html
<div c="cly-vue-form-field cly-vue-form-step__section">
  <div t="email-to-receive-header">E-mails to Send Report to</div>
  <div c="cly-vue-dropdown el-select cly-vue-select-x cly-vue-select-email"
       t="email-to-receive-input-dropdown-el-select"
       ph="Enter Email Addresses">
    <input t="email-to-receive-input" tp="text" ph="Enter Email Addresses">
    <div c="cly-vue-select-x__pop">
      <input t="search-email-input" tp="text" ph="(e.g. john@doe.mail)">
      <div c="color-red-100 text-small">"" is not a valid email address</div>
    </div>
  </div>
</div>
```

- Label test ID: `email-to-receive-header`
- Dropdown test ID: `email-to-receive-input-dropdown-el-select`
- Input test ID: `email-to-receive-input`
- Search input test ID: `search-email-input`
- Component: `cly-vue-select-email` (extended `cly-vue-select-x`)
- Placeholder: `Enter Email Addresses` / `(e.g. john@doe.mail)`
- Inline validation error: `"" is not a valid email address` shown in `color-red-100 text-small`

### 5.3 Report Type

```html
<div c="cly-vue-form-field bu-py-4 report-type-block cly-vue-form-step__section">
  <div c="text-big text-heading bu-mb-3">
    Report Type
    <span c="ion-help-circled color-cool-gray-50 has-tooltip"></span>
  </div>
  <div c="report-types-block">
    <label c="el-radio is-autosized is-bordered is-checked" t="report-type-core-el-radio-wrapper">
      <input t="report-type-core-el-radio-button" tp="radio">
      <span t="report-type-core-el-radio-label">Core report</span>
    </label>
    <label c="el-radio is-autosized is-bordered" t="report-type-dashboards-el-radio-wrapper">
      <input t="report-type-dashboards-el-radio-button" tp="radio">
      <span t="report-type-dashboards-el-radio-label">Dashboard report</span>
    </label>
  </div>
</div>
```

- Block modifier classes: `report-type-block`, `bu-py-4`
- Inner container: `report-types-block`
- Default selection: Core report (`is-checked` on wrapper)
- Options: `Core report`, `Dashboard report`
- Component: `el-radio is-autosized is-bordered`

### 5.4 Applications Selector

```html
<div c="cly-vue-form-field cly-vue-form-step__section">
  <div t="select-apps-header">Applications to Receive Reports from</div>
  <div c="cly-vue-dropdown el-select cly-vue-select-x"
       t="select-apps-combobox-dropdown-el-select"
       ph="Select Applications">
    <input t="select-apps-combobox" tp="text" ph="Select Applications">
    <div c="cly-vue-listbox">
      <div c="el-checkbox-group">
        <label c="el-checkbox" t="select-apps-combobox-checklistbox-{appName}-el-checkbox-label">{appName}</label>
      </div>
    </div>
    <button t="select-apps-combobox-select-x-cancel-button">Cancel</button>
    <button t="select-apps-combobox-select-x-confirm-button">Confirm</button>
  </div>
</div>
```

- Label test ID: `select-apps-header`
- Dropdown test ID: `select-apps-combobox-dropdown-el-select`
- Input test ID: `select-apps-combobox`
- Checkbox label pattern: `select-apps-combobox-checklistbox-{appName}-el-checkbox-label`
- Cancel button: `select-apps-combobox-select-x-cancel-button`
- Confirm button: `select-apps-combobox-select-x-confirm-button`
- Component: `cly-vue-select-x` with `cly-vue-listbox` + `el-checkbox-group` popover

### 5.5 Data Metrics

```html
<div c="cly-vue-form-field cly-vue-form-step__section">
  <div t="select-data-header">Data included in reports</div>
  <div c="cly-vue-dropdown el-select cly-vue-select-x"
       t="select-metrics-combobox-dropdown-el-select"
       ph="Select Data">
    <input t="select-metrics-combobox" tp="text" ph="Select Data">
    <div c="el-checkbox-group">
      <label t="select-metrics-combobox-checklistbox-analytics-el-checkbox-label">Analytics</label>
      <label t="select-metrics-combobox-checklistbox-events-el-checkbox-label">Events</label>
      <label t="select-metrics-combobox-checklistbox-revenue-el-checkbox-label">Revenue</label>
      <label t="select-metrics-combobox-checklistbox-crash-el-checkbox-label">Crash</label>
      <label t="select-metrics-combobox-checklistbox-ratings-el-checkbox-label">Ratings</label>
      <label t="select-metrics-combobox-checklistbox-performance-el-checkbox-label">Performance</label>
    </div>
  </div>
</div>
```

- Label test ID: `select-data-header`
- Dropdown test ID: `select-metrics-combobox-dropdown-el-select`
- Input test ID: `select-metrics-combobox`
- Metric options and their test IDs:
  | Option | Test ID |
  |---|---|
  | Analytics | `select-metrics-combobox-checklistbox-analytics-el-checkbox-label` |
  | Events | `select-metrics-combobox-checklistbox-events-el-checkbox-label` |
  | Revenue | `select-metrics-combobox-checklistbox-revenue-el-checkbox-label` |
  | Crash | `select-metrics-combobox-checklistbox-crash-el-checkbox-label` |
  | Ratings | `select-metrics-combobox-checklistbox-ratings-el-checkbox-label` |
  | Performance | `select-metrics-combobox-checklistbox-performance-el-checkbox-label` |

### 5.6 Frequency

```html
<div c="cly-vue-form-field frequency-block cly-vue-form-step__section">
  <div t="select-frequency-header">Frequency</div>
  <div t="select-frequency-description-label">Select how often will Countly send the e-mail report.</div>

  <label c="el-radio is-autosized is-bordered" t="select-frequency-combobox-el-radio-wrapper">
    <span t="select-frequency-combobox-el-radio-label">
      <span c="text-medium">Daily</span>
      <span c="text-small color-cool-gray-50">On selected time</span>
    </span>
  </label>

  <label c="el-radio is-autosized is-bordered" t="select-frequency-combobox-el-radio-wrapper">
    <span t="select-frequency-combobox-el-radio-label">
      <span c="text-medium">Weekly</span>
      <span c="text-small color-cool-gray-50">On selected time and day</span>
    </span>
  </label>

  <label c="el-radio is-autosized is-bordered" t="select-frequency-combobox-el-radio-wrapper">
    <span t="select-frequency-combobox-el-radio-label">
      <span c="text-medium">Monthly</span>
      <span c="text-small color-cool-gray-50">1st of every month</span>
    </span>
  </label>
</div>
```

- Block modifier class: `frequency-block`
- Label test ID: `select-frequency-header`
- Description test ID: `select-frequency-description-label`
- Radio wrapper test ID: `select-frequency-combobox-el-radio-wrapper` (shared across all three)
- Radio label test ID: `select-frequency-combobox-el-radio-label` (shared across all three)
- Options:
  | Option | Secondary Text |
  |---|---|
  | Daily | On selected time |
  | Weekly | On selected time and day |
  | Monthly | 1st of every month |

### 5.7 Time Picker

```html
<div c="cly-vue-form-field cly-vue-form-step__section">
  <div>Time to receive reports</div>
  <div>Select at what time will Countly send the e-mail report.</div>
  <div c="cly-vue-dropdown el-select cly-vue-select-x" ph="Select Time">
    <input tp="text" ph="Select Time">
  </div>
</div>
```

- No test IDs present on time picker field or its input in the captured HTML
- Component: `cly-vue-select-x`
- Placeholder: `Select Time`

### 5.8 Timezone

```html
<div c="cly-vue-form-field cly-vue-form-step__section">
  <div>Time Zone</div>
  <div>Select the time zone that will apply to the time determined for sending the e-mail report.</div>
  <div c="cly-vue-dropdown el-select cly-vue-select-x" ph="Select Time Zone">
    <input tp="text" ph="Select Time Zone">
  </div>
</div>
```

- No test IDs present on timezone field or its input in the captured HTML
- Component: `cly-vue-select-x`
- Placeholder: `Select Time Zone`

### 5.9 PDF Attachment Checkbox

```html
<div c="cly-vue-form-field">
  <label c="el-checkbox">
    <span>Send as pdf attachment</span>
  </label>
</div>
```

- No `cly-vue-form-step__section` modifier — standalone field
- No test ID present in the captured HTML
- Component: `el-checkbox`
- Label text: `Send as pdf attachment`

---

## 6. Element UI Components

### 6.1 `el-radio` — Bordered, Autosized Variant

Used for Report Type and Frequency selections.

```
c="el-radio is-autosized is-bordered"          (unselected)
c="el-radio is-autosized is-bordered is-checked" (selected)
```

- `is-autosized`: radio button sizes to fit its content
- `is-bordered`: renders a bordered card-like appearance
- `is-checked`: applied to the active selection's `<label>` wrapper
- For Report Type, the `<label>` contains a hidden `<input tp="radio">` and a `<span>` with the label text
- For Frequency, the `<label>` contains only a `<span>` with two nested spans (`text-medium` + `text-small color-cool-gray-50`)

### 6.2 `el-checkbox`

Used in two contexts:

1. **Applications and Metrics multi-select popovers** — wrapped in `el-checkbox-group`, each option is an `el-checkbox` `<label>`
2. **PDF Attachment** — standalone `el-checkbox` `<label>` with a plain text `<span>`

### 6.3 `cly-vue-select-x` — Base Multi-Select Dropdown

Base class for all dropdown selectors in the form:

```
c="cly-vue-dropdown el-select cly-vue-select-x"
```

- Renders as an `el-select` dropdown with a trigger `<input tp="text">`
- The popover content (`cly-vue-select-x__pop`) is revealed on interaction
- Applications selector uses `cly-vue-listbox` inside the popover
- Metrics selector uses a flat `el-checkbox-group` inside the popover
- Both Applications and Metrics popovers include Cancel/Confirm action buttons

### 6.4 `cly-vue-select-email`

Extends `cly-vue-select-x` with email-specific behavior:

```
c="cly-vue-dropdown el-select cly-vue-select-x cly-vue-select-email"
```

- Adds a search/entry input with email format placeholder: `(e.g. john@doe.mail)`
- Inline validation error rendered inside the popover: `"" is not a valid email address`
- Error styled with `color-red-100 text-small`

---

## 7. Implementation Notes

### 7.1 Test ID Reference Table

| Element | Test ID |
|---|---|
| Drawer title | `reports-drawer-header-title` |
| Close button | `reports-drawer-close-button` |
| Cancel button | `reports-drawer-cancel-button` |
| Save/Create button | `reports-drawer-save-button` |
| Report name label | `email-report-name-header` |
| Report name input | `email-report-name-input` |
| Email recipients label | `email-to-receive-header` |
| Email recipients dropdown | `email-to-receive-input-dropdown-el-select` |
| Email recipients input | `email-to-receive-input` |
| Email search input (popover) | `search-email-input` |
| Report Type — Core wrapper | `report-type-core-el-radio-wrapper` |
| Report Type — Core radio input | `report-type-core-el-radio-button` |
| Report Type — Core label | `report-type-core-el-radio-label` |
| Report Type — Dashboard wrapper | `report-type-dashboards-el-radio-wrapper` |
| Report Type — Dashboard radio input | `report-type-dashboards-el-radio-button` |
| Report Type — Dashboard label | `report-type-dashboards-el-radio-label` |
| Applications label | `select-apps-header` |
| Applications dropdown | `select-apps-combobox-dropdown-el-select` |
| Applications input | `select-apps-combobox` |
| Applications checkbox (per app) | `select-apps-combobox-checklistbox-{appName}-el-checkbox-label` |
| Applications cancel | `select-apps-combobox-select-x-cancel-button` |
| Applications confirm | `select-apps-combobox-select-x-confirm-button` |
| Metrics label | `select-data-header` |
| Metrics dropdown | `select-metrics-combobox-dropdown-el-select` |
| Metrics input | `select-metrics-combobox` |
| Analytics metric | `select-metrics-combobox-checklistbox-analytics-el-checkbox-label` |
| Events metric | `select-metrics-combobox-checklistbox-events-el-checkbox-label` |
| Revenue metric | `select-metrics-combobox-checklistbox-revenue-el-checkbox-label` |
| Crash metric | `select-metrics-combobox-checklistbox-crash-el-checkbox-label` |
| Ratings metric | `select-metrics-combobox-checklistbox-ratings-el-checkbox-label` |
| Performance metric | `select-metrics-combobox-checklistbox-performance-el-checkbox-label` |
| Frequency label | `select-frequency-header` |
| Frequency description | `select-frequency-description-label` |
| Frequency radio wrappers | `select-frequency-combobox-el-radio-wrapper` |
| Frequency radio labels | `select-frequency-combobox-el-radio-label` |

### 7.2 Validation Behavior

- The Save button (`reports-drawer-save-button`) renders with `is-disabled` on initial load, indicating form-level validation guards submission.
- The email recipients field validates email format inline. An empty or invalid email address produces the message `"" is not a valid email address` displayed in `color-red-100 text-small` inside the popover.
- Validation must pass before the `is-disabled` class is removed from the save button.

### 7.3 Default State

- Report Type defaults to **Core report** (`is-checked` on `report-type-core-el-radio-wrapper`).
- No frequency option carries `is-checked` in the captured HTML — frequency has no default.
- The PDF attachment checkbox has no default checked state indicated in the HTML.

### 7.4 Field Order (Top to Bottom)

1. Report Name (`email-report-name-input`)
2. Email Recipients (`email-to-receive-input`)
3. Report Type (Core / Dashboard radio group)
4. Applications (`select-apps-combobox`)
5. Data Metrics (`select-metrics-combobox`)
6. Frequency (Daily / Weekly / Monthly radio group)
7. Time to receive reports (`Select Time` dropdown)
8. Time Zone (`Select Time Zone` dropdown)
9. PDF Attachment checkbox

### 7.5 Missing Test IDs

The following fields do not have test IDs in the captured HTML and may need to be added for complete test coverage:

- Time picker dropdown and input
- Timezone dropdown and input
- PDF attachment checkbox label

### 7.6 `cly-vue-select-x` Popover Pattern

For multi-select dropdowns (Applications, Metrics), the popover pattern is:

```
cly-vue-dropdown el-select cly-vue-select-x [t="...dropdown-el-select"]
  └── input [t="...combobox"] tp="text"
  └── cly-vue-listbox (Applications only)
      └── el-checkbox-group
          └── el-checkbox [t="...checklistbox-{value}-el-checkbox-label"]
  └── el-checkbox-group (Metrics — flat, no listbox wrapper)
      └── label [t="...checklistbox-{value}-el-checkbox-label"]
  └── button [t="...-select-x-cancel-button"]
  └── button [t="...-select-x-confirm-button"]
```

The Applications selector wraps its checkboxes in `cly-vue-listbox` while Metrics does not — this is a structural difference to account for in tests and styling.
