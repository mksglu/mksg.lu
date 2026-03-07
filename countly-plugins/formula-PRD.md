# Countly Calculated Metrics / Formulas Plugin — PRD

**File source:** `formula-raw.html` (compact notation: `c`=class, `t`=data-test-id, `tp`=type, `ph`=placeholder)

---

## 1. Scope & Context

The **Formulas** plugin (route: `calculated-metrics-default`) is a full-page editor inside Countly analytics that allows users to create **custom calculated metrics** by combining raw analytics parameters (sessions, users, events, cohorts, user properties) using mathematical operations. Output can be formatted as Float, Integer, Percent, or Time.

Key capabilities:
- Create and name custom formulas
- Define formula variables (A, B, etc.) each mapped to a specific metric/parameter type
- Optionally enable a denominator for ratio calculations
- Configure output format and decimal precision
- Set a date range and execute the formula to see results
- Save, open, and reload previous queries

---

## 2. Page Layout — Visual Hierarchy

```
┌─────────────────────────────────────────────────────┐
│ HEADER (cly-vue-header white-bg)                    │
│  Left: "Formulas" h2 | View Guide                   │
│  Right: Last Queries (badge) | Load icon | + button │
├─────────────────────────────────────────────────────┤
│ MAIN CONTENT (cly-vue-main)                         │
│  ┌───────────────────────────────────────────────┐  │
│  │ Persistent Notifications                      │  │
│  ├───────────────────────────────────────────────┤  │
│  │ Formula name row                              │  │
│  │  Dropdown (Open formula) | Input (name field) │  │
│  │  [Cancel] [Save Formula]                      │  │
│  ├───────────────────────────────────────────────┤  │
│  │ SECTION 1: Configure Format (collapsible)     │  │
│  │   Output format radio group (Float/Int/…)     │  │
│  │   Decimal places (number input)               │  │
│  │   Unit (text input, 0/30 chars)               │  │
│  ├───────────────────────────────────────────────┤  │
│  │ SECTION 2: Define Formula (collapsible)       │  │
│  │   "Use denominator" checkbox                  │  │
│  │   Formula Builder (variables + operators)     │  │
│  ├───────────────────────────────────────────────┤  │
│  │ SECTION 3: Execute / Results                  │  │
│  │   "Date Range" label | Date picker            │  │
│  │   [Execute formula] button                    │  │
│  │   Results area: "Results based on Buckets"    │  │
│  │   Empty state: "Your data will be shown here  │  │
│  │    after you execute the query"               │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## 3. HTML Structure & Class Names

### Root Containers

| Class | Description |
|---|---|
| `routename-calculated-metrics-default` | Route-level wrapper |
| `formulas-view formulas-main cly-cmp-6771` | Plugin root component |
| `cly-vue-header white-bg` | Page header bar |
| `cly-vue-main bu-columns bu-is-gapless bu-is-centered` | Main content layout |
| `bu-column bu-is-full` | Full-width column |
| `persistent-notifications` | Notification banner area |
| `validator` | Form validation wrapper |

### Header Structure

| Class | Test ID | Notes |
|---|---|---|
| `bu-level bu-is-mobile cly-vue-header__level cly-vue-header__level--no-pt cly-vue-header__level--no-pb` | — | Bulma flex level, no top/bottom padding |
| `bu-level-left bu-is-flex-shrink-1` | `header-title` | Left side: title + guide |
| `bu-level-item` | — | Level item wrapper |
| `bu-mr-2` | — | h2 heading with right margin |
| `guide-dialog-wrapper` | — | View Guide dialog wrapper |
| `view-button-initial` | `view-guide-button` | Guide button trigger |
| `bu-level-right` | — | Right side: actions |
| `bu-mr-2` | — | Margin wrapper for Last Queries button |

### Formula Name / Toolbar Row

| Class | Test ID | Notes |
|---|---|---|
| `bu-level` | — | Flex row |
| `bu-level-left drill-commons-title-left` | — | Left: Open formula dropdown + name input |
| `has-ellipsis` | — | Text overflow on formula name |
| `cly-vue-dropdown el-select cly-vue-more-options` | — | "Open formula" dropdown |
| `cly-vue-form` | — | Name field form wrapper |
| `cly-vue-form-field` | `cly-form-field-test-id-header` | Name field |
| `el-input` | — | Name text input |
| `el-input__count-inner` | `input-test-id` | Character count display |
| `el-button el-button--secondary` | — | Cancel button |
| `el-button el-button--success` | — | Save Formula button |

### Section Components

| Class | Notes |
|---|---|
| `cly-vue-section bu-py-4 cly-vue-section--has-configurator-skin` | Configure Format section |
| `cly-vue-section__content white-bg` | White content area inside section |
| `cly-vue-section__sub bu-px-4 bu-py-2` | Sub-section with padding |
| `text-medium font-weight-bold bu-pr-4 text-uppercase` | Section sub-heading label |
| `bu-pt-4 text-medium` | Top-padded medium text |
| `cly-vue-section bu-py-4` | Execute / Results section (no configurator skin) |
| `text-medium font-weight-bold text-uppercase` | "Date Range" label |

### Collapsible (el-collapse)

| Class | Test ID | Notes |
|---|---|---|
| `el-collapse` | — | Accordion wrapper |
| `el-collapse-item is-active` | — | Expanded state |
| — | `el-collapse-item-test-id-el-collapse-item-header` | Collapse header |
| `el-collapse-item__content` | — | Content area |

### Formula Builder

| Class | Notes |
|---|---|
| `cly-vue-formula-builder cly-vue-formula-builder--has-2-row` | Root formula builder (2-row layout modifier) |
| `cly-vue-formula-builder__settings` | Settings bar (denominator checkbox) |
| `cly-vue-formula-builder__container` | Container for formula rows |
| `fb-formula-row` | A single formula row |
| `fb-formula-variable variable-styleset-d first-variable last-variable` | A variable card (styleset-d = color scheme D; modifiers: `first-variable`, `last-variable`) |
| `variable-card empty-box` | Empty/unassigned variable card |
| `variable-symbol` | The letter symbol (A, B, etc.) inside the variable card |

---

## 4. Design Tokens — Colors, Spacing, Typography

### Spacing (Bulma utility classes)
- `bu-py-4` — vertical padding level 4
- `bu-px-4` — horizontal padding level 4
- `bu-py-2` — vertical padding level 2
- `bu-pb-4` — bottom padding level 4
- `bu-pt-4` — top padding level 4
- `bu-mr-2` — right margin level 2
- `bu-pr-4` — right padding level 4

### Typography
- `text-medium` — medium font size
- `font-weight-bold` — bold weight
- `text-uppercase` — uppercase transform
- `has-ellipsis` — text overflow ellipsis

### Color / Status
- `white-bg` — white background (#fff)
- `cly-bullet cly-bullet--orange bu-mr-1` — orange bullet indicator (used on Last Queries badge)
- `bu-tag is-curved` — pill/badge shape for the queries count
- `el-button--success` — green action button (Save, Execute)
- `el-button--secondary` — secondary (Cancel)
- `el-button--default` — default/neutral button
- `variable-styleset-d` — variable color theme D (one of multiple available stylesets for A/B/C/D variable distinctions)

### Layout
- `bu-is-mobile` — mobile-responsive modifier on header level
- `bu-is-flex-shrink-1` — prevents shrink
- `bu-is-flex bu-is-flex-direction-column` — flex column layout
- `bu-columns bu-is-gapless bu-is-centered` — multi-column no-gap centered

---

## 5. Formula Builder — Variables, Parameter Types, Operators

### Denominator Toggle

A `el-checkbox is-checked` labeled "Use denominator" (test ID: `el-checkbox-test-id-el-checkbox-label`) enables a numerator/denominator ratio mode inside the formula builder. When checked, the builder displays a second formula row for the denominator expression.

### Variable Cards

Each variable is represented as `fb-formula-variable` inside `fb-formula-row`. Variables are assigned letters (A, B, C, D, …). The card displays:
- A **symbol** (`variable-symbol` div) showing the letter
- An **el-select dropdown** for choosing the parameter type
- An **empty-box** state when unassigned

Variable stylesets (`variable-styleset-a` through `variable-styleset-d`) provide distinct color coding per variable letter.

Modifiers:
- `first-variable` — first variable in the row
- `last-variable` — last variable in the row

### Parameter Types (el-select dropdown options)

| Test ID (option) | Label |
|---|---|
| `el-option-test-id--of-sessions-el-options` | # of sessions |
| `el-option-test-id--of-users-with-a-session-el-options` | # of users with a session |
| `el-option-test-id--of-new-users-el-options` | # of new users |
| `el-option-test-id-session-duration-el-options` | Session duration |
| `el-option-test-id--of-users-who-performed-event-el-options` | # of users who performed event |
| `el-option-test-id--of-users-in-cohort-el-options` | # of users in cohort |
| `el-option-test-id-event-count-el-options` | Event count |
| `el-option-test-id-event-sum-el-options` | Event sum |
| `el-option-test-id-event-duration-el-options` | Event duration |
| `el-option-test-id-sum-of-event-segment-el-options` | Sum of event segment |
| `el-option-test-id-sum-of-user-property-el-options` | Sum of user property |
| `el-option-test-id-numeric-value-el-options` | Numeric value |

**Selected state:** `el-select-dropdown__item selected` marks the currently chosen option.

### Operators

Operators between variables are rendered inline in the formula row between `fb-formula-variable` elements. Standard arithmetic operators (+, -, *, /) are expected between variables. The formula builder layout accommodates multi-row formulas via the `cly-vue-formula-builder--has-2-row` modifier.

---

## 6. Configure Format

Contained in a `cly-vue-section--has-configurator-skin` section. Fields:

### Output Format — Radio Group

Component: `el-radio-group is-full` containing `el-radio-button el-radio-button--small` items.

| Option | Active State |
|---|---|
| Float | `is-active` (default) |
| Integer | — |
| Percent | — |
| Time | — |

Display: Inner text is inside `el-radio-button__inner`. The active radio uses `is-active` class.

### Decimal Places

Component: `el-input-number`
- Input: `<input tp="text" t="el-input-number-test-id">`
- Controls precision of Float/Percent output
- Default shown: 2 (displayed in header as "Float, 2 decimal places")

### Unit

Component: `el-input` inside `cly-vue-form-field` (test ID: `cly-form-field-test-id-header`)
- Input: `<input tp="text" t="input-test-id">`
- Character limit: 30 (shown as "0/30" via `el-input__count-inner`)
- Appended unit string displayed alongside formula result

### Section Header Summary

The Configure Format section header displays the current format summary, e.g. **"Float, 2 decimal places"**, derived from the selected output format + decimal places value.

---

## 7. Element UI Components

| Component | Usage |
|---|---|
| `el-button` | All CTA buttons (Save, Cancel, Execute, Last Queries, New formula, Load) |
| `el-button--success` | Primary affirmative actions (Save Formula, Execute formula) |
| `el-button--secondary` | Cancel/dismiss |
| `el-button--default el-button--small` | Secondary toolbar buttons (Last Queries, icon add) |
| `el-button--medium` | Execute formula (medium size variant) |
| `el-radio-group` | Output format selector |
| `el-radio-button el-radio-button--small` | Individual format options (Float/Integer/Percent/Time) |
| `el-input-number` | Decimal places input |
| `el-input` | Formula name input, Unit input |
| `el-input__count-inner` | Character count display (Unit field: "0/30") |
| `el-collapse` | Collapsible sections (Configure Format, Define Formula) |
| `el-collapse-item` | Individual collapsible panel |
| `el-checkbox` | "Use denominator" toggle |
| `el-select` / `cly-vue-dropdown` | Variable parameter type selector, Open formula selector, more-options dropdown |
| `el-select-dropdown el-popper` | Dropdown popover |
| `el-select-dropdown__list` / `el-select-dropdown__item` | Option list items |

---

## 8. Implementation Notes

### Test IDs Reference

| Test ID | Element | Purpose |
|---|---|---|
| `header-title` | `div.bu-level-left` | Page title region |
| `view-guide-button` | `div.view-button-initial` | Opens guide dialog |
| `last-queries-button` | `button.el-button` | Opens last queries list |
| `cly-dropdown-default-test-id-dropdown-el-select` | dropdown | Default dropdown |
| `cly-input-dropdown-trigger-pseudo-input-label` | label | Dropdown trigger label (used twice: Open formula + more-options) |
| `cly-form-field-test-id-header` | `div.cly-vue-form-field` | Form field header (used twice: Decimal places section + Unit section) |
| `el-input-number-test-id` | `input` | Decimal places number input |
| `input-test-id` | `input` | Unit text input |
| `el-collapse-item-test-id-el-collapse-item-header` | collapse header | Collapsible section toggle |
| `el-checkbox-test-id-el-checkbox-label` | checkbox label | "Use denominator" checkbox |
| `cly-datepicker-test-id-pseudo-input-label` | `span` | Date range picker display label |
| `execute-formula-button` | `button.el-button--success--medium` | Execute formula action |

### Formula Name Field

- Auto-populated with timestamp on new formula: `New Formula [27-02-2026-18:55:35]`
- Editable text field with character counter
- Cancel button reverts; Save Formula button persists

### Date Picker

- Component: `cly-vue-datepicker` (rendered as `cly-datepicker-test-id-pseudo-input-label`)
- Default range shown: "Jan 29, 2026 – Feb 27, 2026" (30-day rolling window)
- Located in the Execute/Results section above the Execute button

### Execute Button

- Test ID: `execute-formula-button`
- Class: `el-button el-button--success el-button--medium`
- Triggers formula computation over the selected date range

### Results Area

- Section label: "Results based on Buckets" (`text-medium font-weight-bold text-uppercase`)
- Empty state message: "Your data will be shown here after you execute the query"
- Execute query button also appears in the empty state
- Results bucket selector: `cly-vue-dropdown` (bucket granularity: daily/weekly/monthly)

### Dropdown: Open Formula / Last Queries

- "Open formula" dropdown: `cly-vue-dropdown el-select cly-vue-more-options` in the title row
- "Last Queries" button: `el-button el-button--default el-button--small` with orange badge (`cly-bullet--orange`) showing count
- Load icon button: `cly-icon-btn cly-icon-load` (separate from Last Queries button)
- New formula icon button: `ion-android-add-circle` inside small default button

### Collapsible Sections

Both "Configure Format" and "Define Formula" sections use `el-collapse-item`. The `is-active` class indicates expanded state. Both appear expanded by default in the snapshot.

### Formula Builder Layout Modifier

The `cly-vue-formula-builder--has-2-row` class on the root formula builder indicates the denominator is enabled, causing a two-row layout (numerator row + denominator row). Without the denominator, a single `fb-formula-row` is rendered.
