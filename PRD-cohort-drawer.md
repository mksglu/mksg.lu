# Countly Cohort Creation Drawer — Unified PRD

> Generated: 2026-02-27
> Target: Pixel-perfect reimplementation in Vue 3
> Source: http://mert.count.ly/dashboard#/6908ab02fece9ef06eca7285/cohorts
> Stack: Element UI 2.14.1 + Vue 2.6.12 + Bulma (fork) + custom cly-* components
> Font: Inter (Google Fonts)
> Icons: Ionicons 2.0 (ion-* prefix)

---

## Table of Contents

- [**Part 1: Functional Behavior**](#part-1-functional-behavior)
  - [A. Drawer Structure](#a-drawer-structure)
  - [B. Property Segmentation Section](#b-property-segmentation-section)
  - [C. Behavior Segmentation Section](#c-behavior-segmentation-section)
  - [D. Multiple Conditions](#d-multiple-conditions)
  - [E. Visibility Section](#e-visibility-section)
  - [F. Footer](#f-footer)
  - [G. Conditional Logic & Validation](#g-conditional-logic--validation)
  - [H. Static vs Dynamic Data Classification](#h-static-vs-dynamic-data-classification)
  - [I. data-test-id Reference](#i-data-test-id-reference)
  - [J. Technical Notes](#j-technical-notes)
- [**Part 2: Design System & Visual Styles**](#part-2-design-system--visual-styles)
  - [A. Component Library Detection](#a-component-library-detection)
  - [B. Design System Tokens](#b-design-system-tokens)
  - [C. Per-Element CSS Extraction](#c-per-element-css-extraction)
  - [D. State Variants](#d-state-variants)
  - [E. Dropdown/Popper Styles](#e-dropdownpopper-styles)
  - [F. CSS Variables (from `:root`)](#f-css-variables-from-`root`)
  - [G. Complete CSS Class Reference](#g-complete-css-class-reference)
  - [H. Layout Structure Summary](#h-layout-structure-summary)
  - [I. Key Measurements Summary](#i-key-measurements-summary)
- [**Part 3: Interaction Flows**](#part-3-interaction-flows)
  - [Overview](#overview)
  - [Flow 1: Drawer Open/Close](#flow-1-drawer-openclose)
  - [Flow 2: Cohort Name Input](#flow-2-cohort-name-input)
  - [Flow 3: Property Selection](#flow-3-property-selection)
  - [Flow 4: Different Property Types (Numeric)](#flow-4-different-property-types-numeric)
  - [Flow 5: Multiple Conditions (AND/OR)](#flow-5-multiple-conditions-andor)
  - [Flow 6: Behavior Segmentation](#flow-6-behavior-segmentation)
  - [Flow 7: Visibility Section](#flow-7-visibility-section)
  - [Flow 8: Footer States](#flow-8-footer-states)
  - [State Machine Diagrams](#state-machine-diagrams)
  - [Operator-to-Value Mapping Table](#operator-to-value-mapping-table)
  - [Component Architecture](#component-architecture)
  - [UI Patterns & Technical Notes](#ui-patterns--technical-notes)
  - [Screenshot Index](#screenshot-index)
- [**Part 4: HTML Structure & Class Names**](#part-4-html-structure--class-names)
  - [A. Drawer Container](#a-drawer-container)
  - [B. Header Section](#b-header-section)
  - [C. Cohort Name & Description Inputs](#c-cohort-name--description-inputs)
  - [D. User Property Segmentation Section](#d-user-property-segmentation-section)
  - [E. User Behavior Segmentation Section](#e-user-behavior-segmentation-section)
  - [F. Visibility Section](#f-visibility-section)
  - [G. Footer](#g-footer)
  - [H. State Variations](#h-state-variations)
  - [I. data-test-id Index](#i-data-test-id-index)
  - [J. ARIA Attributes](#j-aria-attributes)
  - [Complete CSS Class Reference](#complete-css-class-reference)
- [**Part 5: AI Chat (Cee) vs Original UI Comparison**](#part-5-ai-chat-cee-vs-original-ui-comparison)
  - [Executive Summary](#executive-summary)
  - [Phase 1: Original Drawer Documentation](#phase-1-original-drawer-documentation)
  - [Phase 2: Cee AI Chat — Access Attempts](#phase-2-cee-ai-chat-—-access-attempts)
  - [Phase 3: What the Countly Guides Panel Shows (Instead of Cee)](#phase-3-what-the-countly-guides-panel-shows-instead-of-cee)
  - [Phase 4: Comparison Table (Placeholder)](#phase-4-comparison-table-placeholder)
  - [Phase 5: CSS Reference for Future Comparison](#phase-5-css-reference-for-future-comparison)
  - [Recommendations](#recommendations)
  - [Screenshots Directory](#screenshots-directory)
- [**Part 6: Localization & Data Rules**](#part-6-localization--data-rules)
  - [Classification Rules](#classification-rules)
  - [Data Classification Table](#data-classification-table)
  - [Dropdown-Specific Classification](#dropdown-specific-classification)
- [**Part 7: Screenshot Index**](#part-7-screenshot-index)

---

## Part 1: Functional Behavior

## A. Drawer Structure

### Opening
- Triggered by clicking **"+ New Cohort"** button on the Cohorts page
- `data-test-id="cohorts-home-page-new-cohort-button"`

### Layout (Top to Bottom)
| Section | Description |
|---------|------------|
| **Header** | Title: `+ Create New Cohort` |
| **Close Button** | X icon (top-right corner), `data-test-id="drawer-test-id-close-button"` |
| **Cohort Name** | Label: "Cohort name", Input placeholder: "Enter cohort name", `data-test-id="cohorts-drawer-cohorts-name-input"` |
| **Description** | Label: "Description", Input placeholder: "Enter cohort description", `data-test-id="cohorts-drawer-cohorts-description-input"` |
| **User Property Segmentation** | Section with info icon tooltip, `data-test-id="cohorts-drawer-segmentation-label"` |
| **User Behavior Segmentation** | Section with info icon tooltip |
| **Visibility** | Global/Private radio selection |
| **Warning Banner** | Conditional - appears when duplicate segmentation exists |
| **Footer** | Cancel + "+ Create New Cohort" buttons |

### Default State When Opened
- Cohort name: empty
- Description: empty
- Property row: one empty row (Select Property | Select | String)
- Behavior section: "+ Add Condition" button only (no rows)
- Visibility: "Global" selected by default
- Warning banner: "You can't proceed because a cohort with the selected segmentations already exists View it" (appears when segmentation matches an existing cohort)

---

## B. Property Segmentation Section

### Section Header
- **Title**: "User Property Segmentation" `[STATIC/i18n]`
- **Label**: "Users with" `[STATIC/i18n]`
- **Info icon**: tooltip (blue circle with ?)

### Property Row Components
Each property row contains 3 dropdowns + remove button:
1. **Property Dropdown** - placeholder: "Select Property" `[STATIC/i18n]`
2. **Operator Dropdown** - placeholder: "Select" `[STATIC/i18n]`
3. **Value Input** - varies by operator (text input, number input, dropdown, date picker)
4. **Remove Button** - X icon to remove the row

### Property Dropdown

#### Tabs
| Tab | Label | Content | Data Source |
|-----|-------|---------|-------------|
| All Properties | `[STATIC/i18n]` | Union of all properties from all tabs | N/A |
| User | `[STATIC/i18n]` | Built-in user profile properties | `[STATIC/FIXED]` (Countly SDK default properties) |
| Custom | `[STATIC/i18n]` | User-defined custom properties | `[DYNAMIC/DB]` |
| Campaign | `[STATIC/i18n]` | Campaign/attribution properties | `[DYNAMIC/DB]` |
| Push Notification | `[STATIC/i18n]` | Push notification related properties | `[STATIC/FIXED]` |

#### Tab navigation
- Tabs scroll horizontally with left/right arrow buttons when space is limited
- Search box at top: "Search in Properties" `[STATIC/i18n]`
  - `data-test-id="cohorts-drawer-property-row-select-property-popover-search-input"`

#### All Properties (Complete List - "All Properties" Tab)

##### User Properties (Built-in)
| # | Property Name | Data Type | Source |
|---|--------------|-----------|--------|
| 1 | ID | String | `[DYNAMIC/DB]` |
| 2 | Age | Number | `[DYNAMIC/DB]` |
| 3 | App Version | String | `[DYNAMIC/DB]` |
| 4 | Browser | String | `[DYNAMIC/DB]` |
| 5 | Browser version | String | `[DYNAMIC/DB]` |
| 6 | Birth year | Number | `[DYNAMIC/DB]` |
| 7 | Carrier | String | `[DYNAMIC/DB]` |
| 8 | Days of retention | Number | `[DYNAMIC/DB]` |
| 9 | Months of retention | Number | `[DYNAMIC/DB]` |
| 10 | Weeks of retention | Number | `[DYNAMIC/DB]` |
| 11 | Country | String | `[DYNAMIC/DB]` |
| 12 | City | String | `[DYNAMIC/DB]` |
| 13 | Device | String | `[DYNAMIC/DB]` |
| 14 | Density | String | `[DYNAMIC/DB]` |
| 15 | Local Day of the Week | Number | `[DYNAMIC/DB]` |
| 16 | Device Type | String | `[DYNAMIC/DB]` |
| 17 | Email | String | `[DYNAMIC/DB]` |
| 18 | First Seen On | Date | `[DYNAMIC/DB]` |
| 19 | Gender | String | `[DYNAMIC/DB]` |
| 20 | Local Hour | Number | `[DYNAMIC/DB]` |
| 21 | Language | String | `[DYNAMIC/DB]` |
| 22 | Last Seen On | Date | `[DYNAMIC/DB]` |
| 23 | Last view name | String | `[DYNAMIC/DB]` |
| 24 | Manufacturer | String | `[DYNAMIC/DB]` |
| 25 | Name | String | `[DYNAMIC/DB]` |
| 26 | Organization | String | `[DYNAMIC/DB]` |
| 27 | Device Orientation | String | `[DYNAMIC/DB]` |
| 28 | Platform | String | `[DYNAMIC/DB]` |
| 29 | Phone | String | `[DYNAMIC/DB]` |
| 30 | Platform Version | String | `[DYNAMIC/DB]` |
| 31 | Resolution | String | `[DYNAMIC/DB]` |
| 32 | Region | String | `[DYNAMIC/DB]` |
| 33 | Session Count | Number | `[DYNAMIC/DB]` |
| 34 | Source | String | `[DYNAMIC/DB]` |
| 35 | Total Session Duration | Number | `[DYNAMIC/DB]` |
| 36 | Username | String | `[DYNAMIC/DB]` |
| 37 | Locale | String | `[DYNAMIC/DB]` |
| 38 | Source Channel | String | `[DYNAMIC/DB]` |
| 39 | Engagement Score | Number | `[DYNAMIC/DB]` |
| 40 | Last Payment | Date | `[DYNAMIC/DB]` |
| 41 | Last Purchase Amount | Number | `[DYNAMIC/DB]` |
| 42 | Total Purchase Amount | Number | `[DYNAMIC/DB]` |
| 43 | Total Purchase Count | Number | `[DYNAMIC/DB]` |
| 44 | Hinge | String | `[DYNAMIC/DB]` |
| 45 | Cohorts | List | `[DYNAMIC/DB]` |
| 46 | Profile Group | String | `[DYNAMIC/DB]` |
| 47 | push.geo.location | String | `[DYNAMIC/DB]` |

##### Custom Properties (User-Defined) - "Custom" Tab
| # | Property Name | Data Source |
|---|--------------|-------------|
| 1 | Acquisition Source | `[DYNAMIC/DB]` |
| 2 | Industry | `[DYNAMIC/DB]` |
| 3 | Onboarding Method | `[DYNAMIC/DB]` |
| 4 | Subscription Plan | `[DYNAMIC/DB]` |
| 5 | Team Size | `[DYNAMIC/DB]` |
| 6 | populator | `[DYNAMIC/DB]` |

##### Campaign Properties - "Campaign" Tab
| # | Property Name | Data Source |
|---|--------------|-------------|
| 1 | Referral Campaign | `[DYNAMIC/DB]` |

##### Push Notification Properties - "Push Notification" Tab
| # | Property Name | Data Source |
|---|--------------|-------------|
| 1 | Push Token | `[DYNAMIC/DB]` |
| 2 | Geolocation | `[DYNAMIC/DB]` |

> **Note**: Property names are `[DYNAMIC/DB]` - loaded from the server/database. The "All Properties" tab is the union of User + Custom + Campaign + Push Notification tabs. The User tab contains built-in Countly SDK properties. Custom properties are user-defined through the Countly User Profiles feature.

#### data-test-id Pattern for Property Items
```
cohorts-drawer-property-select-property-dropdown-{rowIndex}-item-{property-name-kebab-case}
```
Example: `cohorts-drawer-property-select-property-dropdown-0-item-session-count`

---

### Operators by Property Data Type

#### String Operators
| # | Operator Label | Operator Key | Value Input Type | Value Input State |
|---|---------------|-------------|-----------------|-------------------|
| 1 | is | `[STATIC/FIXED]` | Text input (placeholder: "String") | Enabled |
| 2 | is not | `[STATIC/FIXED]` | Text input (placeholder: "String") | Enabled |
| 3 | contains | `[STATIC/FIXED]` | Text input (placeholder: "String") | Enabled |
| 4 | doesn't contain | `[STATIC/FIXED]` | Text input (placeholder: "String") | Enabled |
| 5 | is set | `[STATIC/FIXED]` | Dropdown (options: yes, no) with "Search in Values" | Enabled |
| 6 | begins with | `[STATIC/FIXED]` | Text input (placeholder: "String") | Enabled |

**"is set" value dropdown**:
- Search box: "Search in Values" `[STATIC/i18n]`
- Options: **yes** `[STATIC/FIXED]`, **no** `[STATIC/FIXED]`

#### Numeric Operators
| # | Operator Label | Operator Key | Value Input Type | Default Value |
|---|---------------|-------------|-----------------|---------------|
| 1 | is between | `[STATIC/FIXED]` | Two number spinners separated by "-" | 0 - 1 |
| 2 | greater than | `[STATIC/FIXED]` | Single number spinner | 0 |
| 3 | at least | `[STATIC/FIXED]` | Single number spinner | 0 |
| 4 | less than | `[STATIC/FIXED]` | Single number spinner | 0 |
| 5 | at most | `[STATIC/FIXED]` | Single number spinner | 0 |
| 6 | is | `[STATIC/FIXED]` | Single number spinner | 0 |
| 7 | is not | `[STATIC/FIXED]` | Single number spinner | 0 |
| 8 | is set | `[STATIC/FIXED]` | Dropdown (options: yes, no) | - |

**Number input**: Has up/down spinner arrows for increment/decrement.

#### Date Operators
| # | Operator Label | Operator Key | Value Input Type | Default Value |
|---|---------------|-------------|-----------------|---------------|
| 1 | is between | `[STATIC/FIXED]` | Date range picker (two date inputs) | - |
| 2 | greater than | `[STATIC/FIXED]` | Date picker | - |
| 3 | at least | `[STATIC/FIXED]` | Date picker | - |
| 4 | less than | `[STATIC/FIXED]` | Date picker | - |
| 5 | at most | `[STATIC/FIXED]` | Date picker | - |
| 6 | is set | `[STATIC/FIXED]` | Dropdown (options: yes, no) | - |
| 7 | in the last | `[STATIC/FIXED]` | Relative date picker | "in the last day" |

**"in the last" value picker**:
- **Number input**: default value `1`
- **Time unit dropdown** `[STATIC/i18n]`:
  - `days` (default)
  - `weeks`
  - `months`
  - `years`
- **Calendar**: Full month calendar view with today highlighted
- **Buttons**: "Cancel" `[STATIC/i18n]`, "Apply range" `[STATIC/i18n]`

#### Default Operator Behavior
- When a property is selected and no operator has been chosen, the operator dropdown shows placeholder "Select" `[STATIC/i18n]`
- The value input shows placeholder "String" `[STATIC/i18n]` and is **disabled** until an operator is selected
- When operator is "is set", the value input changes from text input to a yes/no dropdown

### "+ Add property" Link
- Label: "+ Add property" `[STATIC/i18n]`
- Adds a new property condition row below the existing one
- When multiple rows exist, AND/OR toggle appears between rows (based on existing cohort descriptions seen: "and" conjunction is used)

---

## C. Behavior Segmentation Section

### Section Header
- **Title**: "User Behavior Segmentation" `[STATIC/i18n]`
- **Info icon**: tooltip (blue circle with ?)

### Initial State
- Only shows **"+ Add Condition"** button `[STATIC/i18n]`
- `data-test-id` pattern: button ref available in interactive snapshot

### Behavior Condition Row (after clicking "+ Add Condition")
Each row contains:

| Component | Default Value | Type | data-test-id pattern |
|-----------|--------------|------|---------------------|
| **Action Toggle** | "performed" | Dropdown | `cohorts-drawer-behavior-row-{index}-did-action-dropdown` |
| **Event/View Selector** | "Sessions" | Dropdown | `cohorts-drawer-behavior-row-{index}-event-select` |
| **Frequency** | "at least 1 time" | Dropdown | `cohorts-drawer-behavior-row-{index}-frequency` |
| **Time Range** | "All time" | Date picker dropdown | - |
| **Remove Button** | - | X icon | - |
| **"which has"** | - | Label | - |
| **"+ Add property"** | - | Link | - |

#### Action Toggle Options
| Option | Label | Description |
|--------|-------|-------------|
| 1 | performed | `[STATIC/i18n]` - Users who DID perform the action |
| 2 | didn't perform | `[STATIC/i18n]` - Users who did NOT perform the action |

#### Event/View Selector
- Default: "Sessions" `[STATIC/FIXED]`
- Contains events and views from the application
- `[DYNAMIC/DB]` - Events are loaded from the Countly server
- Based on existing cohorts on the page, observed events include:
  - Sessions (built-in)
  - Session start
  - View
  - Crash
  - Comment Added
  - Integration Connected
  - Task Created
  - Feature Used
  - Project Created
  - Purchase
  - Purchasexx (custom events)
- Event segmentation with sub-properties is supported (e.g., "Purchase (Country is Turkey)")

#### Frequency Options
Based on existing cohort descriptions visible on the main page:
| # | Option | Label |
|---|--------|-------|
| 1 | at least N time(s) | `[STATIC/i18n]` |
| 2 | at most N time(s) | `[STATIC/i18n]` |
| 3 | exactly N time(s) | `[STATIC/i18n]` |

- Default: "at least 1 time"
- Number is editable (observed values: 1, 2, 5)
- Dropdown has a down-arrow caret

#### Time Range Options
| # | Option | Description | Value Input |
|---|--------|-------------|-------------|
| 1 | All time | `[STATIC/i18n]` | No additional input |
| 2 | in the last N days/weeks/months/years | `[STATIC/i18n]` | Number + time unit + calendar |

- Default: "All time"
- Calendar icon prefix
- Uses same date picker as property "in the last" operator
- Observed values from existing cohorts: "in the last 60 days", "in the last 30 days", "in the last 7 days", "in the last 90 days", "all time"

#### "which has" Sub-Property
- Below each behavior condition row, text "which has" `[STATIC/i18n]` appears
- "+ Add property" `[STATIC/i18n]` link allows adding event property filters
- This enables segmentation like "Purchase (Country is Turkey)"

---

## D. Multiple Conditions

### Property Conditions (AND)
- Click "+ Add property" to add additional property rows
- Between rows: **AND** conjunction is used
- Based on existing cohort "Power Users Q1": "Users with Platform is iOS, Country is US, **and** Session count is greater than 10"
- Multiple property rows appear vertically stacked with implicit AND

### Behavior Conditions (AND/OR)
- Click "+ Add Condition" to add additional behavior rows
- Between behavior rows: **AND** / **OR** toggle buttons appear
- Based on existing cohort "Power Users Q1":
  - "performed Session start at least 5 times in the last 30 days **AND** (performed Integration Connected at least 2 times in the last 7 days **OR** didn't perform Task Created at least 1 time in the last 90 days)"
- Parenthetical grouping is supported for OR conditions within AND blocks

### Mixing Property AND Behavior
- Property and Behavior segmentation sections are independent
- Both can have conditions simultaneously
- The final cohort description reads: "Property: [conditions] Behavior: [conditions]"
- Existing cohort segmentation descriptions show formats like:
  - "Property - Behavior" (both present)
  - "Property" (only property)
  - "Behavior" (only behavior, though no example seen without at least a default empty property row)

### Removing Conditions
- Each row has an **X** (remove) button on the right side
- Clicking X removes that specific condition row
- At least one property row always remains (cannot remove the last one)

---

## E. Visibility Section

### Section Header
- **Title**: "Visibility" `[STATIC/i18n]`

### Options
| # | Option | Label | Sub-label | Default | Radio Button |
|---|--------|-------|-----------|---------|-------------|
| 1 | Global | "Global" `[STATIC/i18n]` | "Make this cohort visible to all users" `[STATIC/i18n]` | **Selected** | Checked |
| 2 | Private | "Private" `[STATIC/i18n]` | "Make this cohort visible only to me" `[STATIC/i18n]` | Not selected | Unchecked |

- Radio buttons are mutually exclusive
- Each option displayed as a card with radio button, label, and sub-label
- Selected option has a blue border/highlight
- `data-test-id` patterns:
  - Global radio: refs available in interactive snapshot
  - Private radio: refs available in interactive snapshot
- No additional conditional fields for either option

---

## F. Footer

### Buttons
| Button | Label | Style | State | Position |
|--------|-------|-------|-------|----------|
| Cancel | "Cancel" `[STATIC/i18n]` | Secondary/text (no background) | Always enabled | Left |
| Create | "+ Create New Cohort" `[STATIC/i18n]` | Primary (green background, white text) | See validation rules | Right |

### Button States
- **Cancel**: Always clickable, closes the drawer without saving
- **"+ Create New Cohort"**: Appears to always show as enabled (green), but form validation occurs on click
- When a duplicate segmentation exists, the warning banner appears and the create button may be restricted

### data-test-ids
- Cancel: `data-test-id` available via snapshot
- Create: `data-test-id` available via snapshot

---

## G. Conditional Logic & Validation

### Field Visibility/State Changes

| Condition | What Changes |
|-----------|-------------|
| No property selected | Operator dropdown: disabled, placeholder "Select". Value input: disabled, placeholder "String" |
| Property selected, no operator | Operator dropdown: enabled. Value input: disabled, placeholder "String" |
| String property + any text operator (is, is not, contains, etc.) | Value input: enabled text field, placeholder "String" |
| Any property + "is set" operator | Value input changes to **dropdown** with "yes"/"no" options |
| Numeric property + "is between" | Value input becomes **two number spinners** with "-" separator, defaults: 0 - 1 |
| Numeric property + any other operator (except is set) | Value input: **single number spinner**, default: 0 |
| Date property + "in the last" | Value input: **relative date picker** (number + unit dropdown + calendar). Default: "in the last day" |
| Date property + "is between" | Value input: **date range picker** (two date fields) |
| Date property + other operators | Value input: **date picker** (single date) |

### Warning Messages
| Warning | Trigger | Text | Location |
|---------|---------|------|----------|
| Duplicate Segmentation | When selected segmentation matches an existing cohort | "You can't proceed because a cohort with the selected segmentations already exists View it" `[STATIC/i18n]` | Banner at bottom of drawer, above footer |

- The "View it" link opens the existing cohort detail page
- Warning has an external link icon

### Validation Rules
1. Cohort name appears to be optional on the form (no asterisk/required indicator visible) but may be validated on submit
2. At minimum, some segmentation condition must differ from existing cohorts
3. Property rows must have property + operator + value filled to be meaningful
4. Behavior rows default to "performed Sessions at least 1 time All time"

---

## H. Static vs Dynamic Data Classification

### Summary Table

| Element | Category | Rationale |
|---------|----------|-----------|
| Drawer title "Create New Cohort" | `[STATIC/i18n]` | UI label |
| Section headers | `[STATIC/i18n]` | UI labels |
| "Users with", "Users who" | `[STATIC/i18n]` | UI labels |
| Property tab names (All Properties, User, Custom, etc.) | `[STATIC/i18n]` | UI labels |
| "Search in Properties" placeholder | `[STATIC/i18n]` | UI label |
| Property names (ID, Age, Country, etc.) | `[DYNAMIC/DB]` | From server/user data model |
| Custom property names (Industry, etc.) | `[DYNAMIC/DB]` | User-defined |
| Operator labels (is, is not, contains, etc.) | `[STATIC/i18n]` | UI labels for operators |
| Operator keys (internal values) | `[STATIC/FIXED]` | Technical identifiers |
| "is set" value options (yes/no) | `[STATIC/FIXED]` | Fixed boolean |
| "in the last" time units (days, weeks, months, years) | `[STATIC/i18n]` | UI labels |
| Behavior type (performed, didn't perform) | `[STATIC/i18n]` | UI labels |
| Event/View names (Sessions, etc.) | `[DYNAMIC/DB]` | From Countly events |
| Frequency options (at least, at most, exactly) | `[STATIC/i18n]` | UI labels |
| Time range options (All time, in the last) | `[STATIC/i18n]` | UI labels |
| Visibility labels (Global, Private) | `[STATIC/i18n]` | UI labels |
| Button labels (Cancel, + Create New Cohort) | `[STATIC/i18n]` | UI labels |
| Warning text | `[STATIC/i18n]` | UI label |
| data-test-id attributes | `[STATIC/FIXED]` | Must not change, used for testing |
| "String" placeholder in value input | `[STATIC/i18n]` | UI label |
| "Select" placeholder in dropdowns | `[STATIC/i18n]` | UI label |
| "+ Add property" link text | `[STATIC/i18n]` | UI label |
| "+ Add Condition" button text | `[STATIC/i18n]` | UI label |
| "which has" text | `[STATIC/i18n]` | UI label |
| AND/OR toggle labels | `[STATIC/i18n]` | UI labels |

### Network/API Detection Notes
- Property dropdown: Properties appear to be loaded at drawer open (pre-fetched). No visible network activity when switching tabs within the property popover -- they are client-side filtered from a single API response.
- Event/View dropdown: Events are expected to be loaded from the Countly `/o/events` API endpoint when the behavior section is activated.
- The CSP (Content Security Policy) on the page blocks `eval()`, confirmed by console messages: "eval not available".

---

## I. data-test-id Reference

### Key data-test-ids Discovered

| Element | data-test-id |
|---------|-------------|
| New Cohort button (page) | `cohorts-home-page-new-cohort-button` |
| Drawer header title | `drawer-test-id-header-title` |
| Drawer close button | `drawer-test-id-close-button` |
| Cohort name label | `cohorts-drawer-cohorts-name-label-header` |
| Cohort name input | `cohorts-drawer-cohorts-name-input` |
| Description label | `cohorts-drawer-cohorts-description-label-header` |
| Description input | `cohorts-drawer-cohorts-description-input` |
| Segmentation label | `cohorts-drawer-segmentation-label` |
| Property dropdown item | `cohorts-drawer-property-select-property-dropdown-{row}-item-{name}` |
| Property search input | `cohorts-drawer-property-row-select-property-popover-search-input` |
| Behavior row action | `cohorts-drawer-behavior-row-{index}-did-action-dropdown` |
| Behavior row event | `cohorts-drawer-behavior-row-{index}-event-select` |
| Behavior row frequency | `cohorts-drawer-behavior-row-{index}-frequency` |
| Cohort table compare button | `datatable-cohorts-compare-button` |
| Edit columns dropdown | `datatable-cohorts-edit-columns-container-dropdown-el-select` |

### data-test-id Naming Convention
```
cohorts-drawer-{section}-{subsection}-{element}-{qualifier}
```
- Sections: `cohorts-name`, `cohorts-description`, `segmentation`, `property`, `behavior`
- Row indexing: 0-based (`property-row-0`, `behavior-row-0`)
- Item names: kebab-case (`session-count`, `first-seen-on`)

---

## J. Technical Notes

### Framework
- **Vue.js** (development mode detected)
- **Element UI** components (el-drawer, el-select, el-popover, el-table, etc.)
- **Countly custom components** (cly-vue-listbox, cly-vue-dropdown, cly-vue-drawer, etc.)

### Known Bugs/Issues
- Console error: `TypeError: periodClause.name.toLowerCase is not a function` in `countly.models.js` - occurs in cohort targeting description rendering for some cohorts

### Browser Compatibility
- CSP (Content Security Policy) blocks `eval()` - confirmed by "eval not available" console messages
- jQuery Migrate 3.5.2 is loaded


---

## Part 2: Design System & Visual Styles

> Extracted from **Countly Enterprise v25.03** via Playwright automated CSS extraction.

---

## A. Component Library Detection

| Library | Version | Detected |
|---------|---------|----------|
| Element UI | **2.14.1** | Yes (`el-*` classes) |
| Vue.js | **2.6.12** | Yes |
| Bulma (custom fork) | N/A | Yes (`bu-*` classes) |
| Custom Countly | N/A | Yes (`cly-*` classes) |
| Ionicons | v2 | Yes (`ion-*` icon classes) |

---

## B. Design System Tokens

### B.1 Color Palette

| Hex | RGB | Usage | CSS Variable |
|-----|-----|-------|-------------|
| `#333C48` | `rgb(51, 60, 72)` | Primary text color, headings, labels, input text | N/A |
| `#0166D6` | `rgb(1, 102, 214)` | Primary brand / accent (buttons, links, checked radio, focus ring, selected dropdown item) | N/A |
| `#FFFFFF` | `rgb(255, 255, 255)` | Button text on primary, select input background, unchecked radio fill | N/A |
| `#FBFDFE` | `rgb(251, 253, 254)` | Input field background (default) | N/A |
| `#F6F6F6` | `rgb(246, 246, 246)` | Disabled input background, search input background | N/A |
| `#CFD6E4` | `rgb(207, 214, 228)` | Input/select border color (default) | N/A |
| `#A7AEB8` | `rgb(167, 174, 184)` | Unchecked radio border, icon secondary color | N/A |
| `#81868D` | `rgb(129, 134, 141)` | Close button icon, search icon, remove (X) icon | N/A |
| `#D6D6D6` | `rgb(214, 214, 214)` | Disabled input text / placeholder (disabled) | N/A |
| `#E1EFFF` | `rgb(225, 239, 255)` | Focus ring glow color (box-shadow) | N/A |
| `#12AF51` | `rgb(18, 175, 81)` | Success/create button background and border | N/A |
| `#FCF5E5` | `rgb(252, 245, 229)` | Warning banner background | N/A |
| `#000000` | `rgb(0, 0, 0)` | Add property link text (fallback) | N/A |
| `transparent` | `rgba(0, 0, 0, 0)` | Drawer wrapper background, non-selected dropdown item background | N/A |

**Button Box Shadow**: `rgba(0, 0, 0, 0.047) 0px 2px 4px 0px` (subtle shadow on all buttons)

### B.2 Typography Scale

| Element | Font Size | Font Weight | Line Height | Font Family | Usage |
|---------|-----------|-------------|-------------|-------------|-------|
| Drawer Title (h3) | `20px` | `500` (medium) | `30px` | `Inter` | "+ Create New Cohort" |
| Section Header | `16px` | `500` (medium) | N/A | `Inter` | "User Property Segmentation", "User Behavior Segmentation", "Visibility" |
| Form Label | `13px` | `500` (medium) | N/A | `Inter` | "Cohort name", "Description" |
| Body Text / Subheading | `14px` | `400` (normal) | N/A | `Inter` | "Users with", input text, radio labels |
| Input Text | `14px` | `400` (normal) | `32px` | `Inter` | All text inputs and selects |
| Button Text (primary) | `14px` | `400` (normal) | `14px` | `Inter` | "+ Add Condition", "+ Create New Cohort" |
| Select Dropdown Item | `13px` | `500` (medium) | `16px` | `Inter` | Dropdown list items |
| Tooltip Icon | `17px` | N/A | N/A | `Ionicons` | Help circle icons |
| Select Caret | `14px` | N/A | N/A | `Ionicons` | Dropdown arrow icons |
| Close Button Icon | `30px` | N/A | N/A | `Ionicons` | Close (X) icon - `ion-ios-close-empty` |

### B.3 Spacing Scale

The spacing system follows Bulma utility classes (`bu-mt-*`, `bu-mb-*`, `bu-px-*`, `bu-pt-*`, `bu-pb-*`):

| Token | Value | Usage |
|-------|-------|-------|
| `1` | `4px` | `bu-px-1`, `bu-pb-1` (small inline padding) |
| `2` | `8px` | `bu-mt-2`, `bu-mb-2` (form label bottom margin) |
| `3` | `12px` | Button padding (8+12 pattern) |
| `4` | `16px` | `bu-pt-4` Section heading bottom margin (`mb-4 = 16px`) |
| `5` | `24px` | `bu-mt-5`, `bu-pb-5` (section top margin) |
| `10px` | `10px` | Input horizontal padding |
| `290px` | `290px` | Drawer horizontal padding (left/right centering on full-screen) |

### B.4 Border Radius

| Value | Usage |
|-------|-------|
| `4px` | Text inputs, select dropdowns, buttons, dropdown items |
| `100%` | Radio button inner circle |

### B.5 Box Shadows

| Value | Usage |
|-------|-------|
| `rgb(225, 239, 255) 0px 0px 0px 3px` | Focus ring on inputs and selects (`#E1EFFF` glow) |
| `rgba(0, 0, 0, 0.047) 0px 2px 4px 0px` | Button shadow (all primary, secondary, success buttons) |
| `none` | Default state for non-button elements |

### B.6 Transitions

| Value | Usage |
|-------|-------|
| `0.1s` | All buttons (hover/active state transitions) |
| `all` | Radio buttons (checked/unchecked transition) |
| `all` | Dropdown items (hover transition) |
| `all` | Warning banner |

### B.7 Z-Index Layers

| Value | Element |
|-------|---------|
| `2001` | `.cly-vue-drawer.is-open` (drawer wrapper) |

### B.8 Icon System

| Icon Class | Icon | Usage |
|------------|------|-------|
| `ion-ios-close-empty` | Close X | Drawer close button (30px) |
| `ion-help-circled` | Help circle | Tooltip/info icon next to section headers (17px) |
| `ion-arrow-up-b` | Chevron/caret | Select dropdown arrow (14px, rotates) |
| `el-icon-search` | Magnifying glass | Search input prefix icon (14px) |
| `el-icon-close` | Small X | Remove/clear icon (16px) |
| `el-icon-loading` | Spinner | Loading indicator (16px) |
| `ion-android-arrow-forward` | Right arrow | Tab navigation arrow |

---

## C. Per-Element CSS Extraction

### C.1 Drawer Container

**`.cly-vue-drawer.is-open.cly-vue-drawer--full-screen`**

| Property | Value |
|----------|-------|
| `position` | `fixed` |
| `top` | `0px` |
| `left` | `0px` |
| `z-index` | `2001` |
| `width` | `1280px` (viewport width) |
| `height` | `720px` (viewport height) |
| `display` | `block` |
| `background-color` | `transparent` |
| `overflow` | `visible` |

### C.2 Drawer Steps View

**`.cly-vue-drawer__steps-view`**

| Property | Value |
|----------|-------|
| `position` | `absolute` |
| `width` | `1280px` |
| `height` | `720px` |
| `display` | `block` |

### C.3 Drawer Steps Wrapper

**`.cly-vue-drawer__steps-wrapper`**

| Property | Value |
|----------|-------|
| `display` | `flex` |
| `width` | `1280px` |
| `height` | `720px` |
| `background-color` | `transparent` |

### C.4 Drawer Header

**`.cly-vue-drawer__header.is-full-screen`**

| Property | Value |
|----------|-------|
| `display` | `block` |
| `padding` | `0px 290px` |
| `height` | `16px` |

### C.5 Drawer Body (Steps Container)

**`.cly-vue-drawer__steps-container.is-scroll-shadow-at-top`**

| Property | Value |
|----------|-------|
| `padding` | `0px 290px` |
| `overflow` | `hidden auto` |
| `overflow-y` | `auto` |
| `height` | `542px` |

### C.6 Drawer Title (H3)

**`h3` (no class)**

| Property | Value |
|----------|-------|
| `font-size` | `20px` |
| `font-weight` | `500` |
| `font-family` | `Inter` |
| `line-height` | `30px` |
| `color` | `#333C48` |
| `margin` | `0` |

### C.7 Close Button

**`.cly-vue-drawer__close-button`**

| Property | Value |
|----------|-------|
| `display` | `flex` |
| `cursor` | `pointer` |
| `font-size` | `30px` |
| `color` | `#81868D` |

Icon class: `ion-ios-close-empty`

### C.8 Cohort Name Input

**`input.el-input__inner`** (placeholder: "Enter cohort name")

| Property | Value |
|----------|-------|
| `font-size` | `14px` |
| `font-weight` | `400` |
| `font-family` | `Inter` |
| `line-height` | `32px` |
| `color` | `#333C48` |
| `background-color` | `#FBFDFE` |
| `border` | `1px solid #CFD6E4` |
| `border-radius` | `4px` |
| `padding` | `0px 10px` |
| `height` | `32px` |
| `width` | `668px` |

Wrapper: `.el-input` (668px x 32px)

### C.9 Description Input

**`input.el-input__inner`** (placeholder: "Enter cohort description")

Same as Cohort Name Input (identical computed styles).

### C.10 Section Headers

#### "Cohort name" / "Description" (Form Labels)

**`div.font-weight-bold.text-smallish.bu-mb-2`**

| Property | Value |
|----------|-------|
| `font-size` | `13px` |
| `font-weight` | `500` |
| `color` | `#333C48` |
| `margin-bottom` | `8px` |

#### "User Property Segmentation" / "User Behavior Segmentation" / "Visibility"

**`div.text-big.text-heading`**

| Property | Value |
|----------|-------|
| `font-size` | `16px` |
| `font-weight` | `500` |
| `color` | `#333C48` |
| `margin-bottom` | `16px` |

"User Behavior Segmentation" has extra `bu-mt-5` class adding `margin-top: 24px`.

#### "Users with"

**`div.text-medium.bu-px-1.bu-pb-1`**

| Property | Value |
|----------|-------|
| `font-size` | `14px` |
| `font-weight` | `400` |
| `color` | `#333C48` |
| `padding` | `0px 4px 4px 4px` |

### C.11 Property Select Dropdown (Closed)

**`.cly-vue-dropdown.el-select.cly-vue-select-x`** (wrapper)

| Property | Value |
|----------|-------|
| `display` | `inline-block` |
| `width` | `217.33px` |
| `height` | `32px` |

**`input.el-input__inner`** (placeholder: "Select Property")

| Property | Value |
|----------|-------|
| `font-size` | `14px` |
| `font-weight` | `400` |
| `color` | `#333C48` |
| `background-color` | `#FFFFFF` |
| `border` | `1px solid #CFD6E4` |
| `border-radius` | `4px` |
| `padding` | `0px 30px 0px 10px` |
| `height` | `32px` |
| `cursor` | `pointer` |

Suffix icon: `.el-select__caret.ion-arrow-up-b` (14px, `#333C48`)

### C.12 Operator Select (Disabled)

**`.el-select`** (wrapper, 163px x 32px)

**`input.el-input__inner`** (placeholder: "Select")

| Property | Value |
|----------|-------|
| `font-size` | `14px` |
| `font-weight` | `400` |
| `color` | `#D6D6D6` |
| `background-color` | `#F6F6F6` |
| `border` | `1px solid #CFD6E4` |
| `border-radius` | `4px` |
| `padding` | `0px 30px 0px 10px` |
| `height` | `32px` |
| `cursor` | `not-allowed` |

### C.13 Value Input (Disabled)

**`input.el-input__inner`** (placeholder: "String")

| Property | Value |
|----------|-------|
| `font-size` | `14px` |
| `font-weight` | `400` |
| `color` | `#D6D6D6` |
| `background-color` | `#F6F6F6` |
| `border` | `1px solid #CFD6E4` |
| `padding` | `0px 10px` |

### C.14 "+ Add Condition" Button

**`button.el-button.el-button--primary.el-button--small`**

| Property | Value |
|----------|-------|
| `font-size` | `14px` |
| `font-weight` | `400` |
| `line-height` | `14px` |
| `color` | `#FFFFFF` |
| `background-color` | `#0166D6` |
| `border` | `1px solid #0166D6` |
| `border-radius` | `4px` |
| `padding` | `8px 12px` |
| `height` | `32px` |
| `cursor` | `pointer` |
| `box-shadow` | `rgba(0, 0, 0, 0.047) 0px 2px 4px 0px` |
| `transition` | `0.1s` |
| `text-align` | `center` |
| `white-space` | `nowrap` |
| `width` | `133.66px` |

### C.15 "+ Add property" Link

**`div.bu-column.bu-is-12.bu-mt-2`**

| Property | Value |
|----------|-------|
| `font-size` | `16px` |
| `font-weight` | `400` |
| `color` | `#000000` |
| `cursor` | `auto` |
| `text-decoration` | `none` |

Note: In the screenshot, this link appears in blue/teal color with `+ Add property` text. The computed color `#000000` suggests it might be an anchor (`<a>`) child inside this div that provides the blue color.

### C.16 Radio Buttons (Visibility)

**`label.el-radio.is-autosized.is-multiline.is-bordered`**

| Property | Value (Checked) | Value (Unchecked) |
|----------|----------------|-------------------|
| `font-size` | `14px` | `14px` |
| `font-weight` | `500` | `500` |
| `color` | `#333C48` | `#333C48` |
| `cursor` | `pointer` | `pointer` |
| Additional classes | `is-checked` | (none) |
| `margin-left` | `0px` | `10px` |

**Radio Inner Circle** (`.el-radio__inner`)

| Property | Checked | Unchecked |
|----------|---------|-----------|
| `width` | `16px` | `16px` |
| `height` | `16px` | `16px` |
| `border-radius` | `100%` | `100%` |
| `background-color` | `#0166D6` | `#FFFFFF` |
| `border` | `1px solid #0166D6` | `1px solid #A7AEB8` |
| `transition` | `all` | `all` |

**Radio Labels** (`.el-radio__label`)

| Property | Value |
|----------|-------|
| `font-size` | `14px` |
| `font-weight` | `500` |
| `color` | `#333C48` |

### C.17 Footer

**`.cly-vue-drawer__footer`**

| Property | Value |
|----------|-------|
| `display` | `block` |
| `padding` | `0px 290px` |
| `height` | `132px` |
| `width` | `700px` |
| `background-color` | `transparent` |

**Buttons Container** (`.cly-vue-drawer__buttons.is-single-step.bu-is-justify-content-flex-end.bu-is-flex`)

| Property | Value |
|----------|-------|
| `display` | `flex` |
| `justify-content` | `flex-end` |
| `margin` | `16px` |
| `width` | `668px` |
| `height` | `32px` |

**Cancel Button** (`button.el-button.el-button--secondary.el-button--small`)

| Property | Value |
|----------|-------|
| `font-size` | `14px` |
| `font-weight` | `400` |
| `color` | `#333C48` |
| `background-color` | `#F6F6F6` |
| `border` | `1px solid #F6F6F6` |
| `border-radius` | `4px` |
| `padding` | `8px 12px` |
| `height` | `32px` |
| `cursor` | `pointer` |
| `box-shadow` | `rgba(0, 0, 0, 0.047) 0px 2px 4px 0px` |
| `transition` | `0.1s` |

**"+ Create New Cohort" Button** (`button.el-button.el-button--success.el-button--small`)

| Property | Value (Enabled) | Value (Disabled) |
|----------|----------------|------------------|
| `font-size` | `14px` | `14px` |
| `font-weight` | `400` | `400` |
| `color` | `#FFFFFF` | `#FFFFFF` |
| `background-color` | `#12AF51` | `#12AF51` |
| `border` | `1px solid #12AF51` | `1px solid #12AF51` |
| `border-radius` | `4px` | `4px` |
| `padding` | `8px 12px` | `8px 12px` |
| `height` | `32px` | `32px` |
| `cursor` | `pointer` | `not-allowed` |
| `box-shadow` | `rgba(0, 0, 0, 0.047) 0px 2px 4px 0px` | same |
| `transition` | `0.1s` | `0.1s` |
| Additional class | (none) | `is-disabled` |

Note: `#12AF51` = `rgb(18, 175, 81)` - Countly's success/green color.

### C.18 Warning Banner

**`div.cly-in-page-notification.text-medium.bu-p-2.cly-in-page-notification--light-warning`**

Located inside `.cly-vue-drawer__controls-left-pc` in the footer area.

| Property | Value |
|----------|-------|
| `background-color` | `#FCF5E5` (`rgb(252, 245, 229)`) |
| `color` | `#333C48` |
| `font-size` | `14px` |
| `font-weight` | `400` |
| `line-height` | `20px` |
| `padding` | `8px` |
| `margin-bottom` | `32px` |
| `border` | `none` |
| `border-radius` | `4px` |
| `width` | `652px` |
| `text-align` | `center` |
| `display` | `block` |

Text: "You can't proceed because a cohort with the selected segmentations already exists View it"

The "View it" link within is an `<a>` tag with cursor pointer.

### C.19 Tooltip/Info Icon

**`.cly-vue-tooltip-icon.ion.ion-help-circled`**

| Property | Value |
|----------|-------|
| `font-size` | `17px` |
| `color` | `#A7AEB8` |
| Font family | `Ionicons` |

### C.20 Remove Condition Button (X)

**`.el-icon-close`**

| Property | Value |
|----------|-------|
| `font-size` | `16px` |
| `color` | `#81868D` |

---

## D. State Variants

### D.1 Input Focus State

| Property | Default | Focused |
|----------|---------|---------|
| `border-color` | `#CFD6E4` | `#0166D6` |
| `box-shadow` | `none` | `#E1EFFF 0px 0px 0px 3px` |
| `background-color` | `#FBFDFE` | `#FBFDFE` (unchanged) |
| `outline` | `none` | `none` |

### D.2 Input Disabled State

| Property | Enabled | Disabled |
|----------|---------|----------|
| `color` | `#333C48` | `#D6D6D6` |
| `background-color` | `#FFFFFF` or `#FBFDFE` | `#F6F6F6` |
| `cursor` | `pointer` or `text` | `not-allowed` |
| `border` | `1px solid #CFD6E4` | `1px solid #CFD6E4` (same) |

### D.3 Radio Button States

| Property | Checked | Unchecked |
|----------|---------|-----------|
| Inner `background-color` | `#0166D6` | `#FFFFFF` |
| Inner `border-color` | `#0166D6` | `#A7AEB8` |
| Wrapper additional class | `.is-checked` | (none) |

### D.4 Dropdown Item States

| Property | Default | Selected |
|----------|---------|----------|
| `background-color` | `transparent` | `#0166D6` |
| `color` | `#333C48` | `#FFFFFF` |
| `font-weight` | `500` | `500` |
| `border-radius` | `4px` | `4px` |
| `padding` | `7px 6px` | `7px 6px` |

---

## E. Dropdown/Popper Styles

The property dropdown uses `cly-vue-select-x` with a custom popper structure.

### E.1 Dropdown Container

The dropdown is rendered inside the drawer (not at body level). It contains:
- Search input with `.el-input--prefix` (search icon on left)
- Tabs: "All Properties", "User", "Custom", "Campaign" (Element UI `el-tabs`)
- Scrollable list of items

### E.2 Dropdown Search Input

**`.el-input__inner`** (placeholder: "Search in Properties")

| Property | Value |
|----------|-------|
| `background-color` | `#F6F6F6` |
| `border` | `1px solid #CFD6E4` |
| `border-radius` | `4px` |
| `padding` | `0px 10px 0px 30px` (left padding for search icon) |
| `height` | `32px` |

Search icon: `.el-input__icon.el-icon-search` (14px, `#81868D`)

### E.3 Dropdown List Items

**`.el-select-dropdown__item`**

| Property | Value |
|----------|-------|
| `font-size` | `13px` |
| `font-weight` | `500` |
| `line-height` | `16px` |
| `padding` | `7px 6px` |
| `border-radius` | `4px` |
| `cursor` | `pointer` |
| `display` | `list-item` |

### E.4 Dropdown Scrollable Wrap

**`.el-select-dropdown__wrap.el-scrollbar__wrap`**

| Property | Value |
|----------|-------|
| `max-height` | `274px` |
| `overflow` | `scroll` |

---

## F. CSS Variables (from `:root`)

| Variable | Value |
|----------|-------|
| `--font-weight-medium` | `500` |
| `--tw-translate-x` | `0` |
| `--tw-translate-y` | `0` |
| `--tw-translate-z` | `0` |
| `--tw-border-style` | `solid` |
| `--tw-shadow` | `0 0 #0000` |
| `--tw-shadow-alpha` | `100%` |
| `--tw-inset-shadow` | `0 0 #0000` |
| `--tw-inset-shadow-alpha` | `100%` |

Note: The application uses primarily hardcoded CSS values rather than CSS custom properties for theming. The Tailwind CSS variables present suggest Tailwind is included but not extensively used for the drawer components.

---

## G. Complete CSS Class Reference

### G.1 Drawer Component Classes (cly-vue-drawer)

- `cly-vue-drawer`, `is-mounted`, `is-open`
- `cly-vue-drawer--full-screen`, `cly-vue-drawer--half-screen`, `cly-vue-drawer--half-screen-6`
- `cly-vue-drawer__sidecars-view`
- `cly-vue-drawer__steps-view`, `cly-vue-drawer__steps-wrapper`, `cly-vue-drawer__steps-container`
- `cly-vue-drawer__header`, `is-full-screen`
- `cly-vue-drawer__title`, `cly-vue-drawer__title-container`, `cly-vue-drawer__title-header`
- `cly-vue-drawer__close-button`
- `cly-vue-drawer__body-container`
- `cly-vue-drawer__footer`
- `cly-vue-drawer__controls-left-pc`
- `cly-vue-drawer__buttons`, `is-single-step`
- `cly-vue-drawer-step__section`
- `cly-vue-drawer-step__line`, `cly-vue-drawer-step__line--aligned`
- `is-scroll-shadow-at-top`, `scroll-shadow-container`

### G.2 Element UI Classes (el-*)

- `el-input`, `el-input__inner`, `el-input__suffix`, `el-input__suffix-inner`, `el-input__prefix`, `el-input__icon`
- `el-input--suffix`, `el-input--prefix`
- `el-select`, `el-select__caret`
- `el-select-dropdown`, `el-select-dropdown__wrap`, `el-select-dropdown__list`, `el-select-dropdown__item`
- `el-scrollbar`, `el-scrollbar__wrap`, `el-scrollbar__wrap--hidden-default`, `el-scrollbar__view`
- `el-radio`, `el-radio__input`, `el-radio__inner`, `el-radio__original`, `el-radio__label`
- `el-button`, `el-button--primary`, `el-button--small`, `el-button--success`, `el-button--secondary`
- `el-tabs`, `el-tabs--top`, `el-tabs__header`, `el-tabs__nav-wrap`, `el-tabs__nav-scroll`, `el-tabs__nav`, `el-tabs__active-bar`, `el-tabs__item`, `el-tabs__content`
- `el-popper`
- `el-icon-close`, `el-icon-search`, `el-icon-loading`

### G.3 Bulma Utility Classes (bu-*)

- Layout: `bu-columns`, `bu-column`, `bu-is-12`, `bu-is-gapless`, `bu-is-mobile`
- Flex: `bu-is-flex`, `bu-is-justify-content-flex-end`, `bu-is-justify-content-space-between`, `bu-is-align-items-center`
- Spacing: `bu-mt-1` through `bu-mt-5`, `bu-mb-2` through `bu-mb-5`, `bu-pt-4`, `bu-pb-1`, `bu-pb-5`, `bu-px-1`
- Level: `bu-level`, `bu-level-item`

### G.4 Custom Countly Classes (cly-*)

- `cly-vue-content`
- `cly-vue-dropdown`, `cly-vue-dropdown__pop`, `cly-vue-dropdown__pop-container`
- `cly-vue-select-x`, `cly-vue-select-x__pop`, `cly-vue-select-x__header`
- `cly-vue-listbox__item-label`
- `cly-vue-tooltip-icon`
- `cly-vue-qb-seg`, `cly-vue-qb-seg__row`, `cly-vue-qb-seg__row-selects`
- `cly-vue-qb-icon`
- `cly-input-dropdown-trigger`
- `cohorts-drawer-radio-visibility-label`

### G.5 Application Utility Classes

- `font-weight-bold`, `text-smallish`, `text-big`, `text-heading`, `text-medium`
- `is-arrow`, `is-autosized`, `is-multiline`, `is-bordered`, `is-checked`
- `has-tooltip`, `selected`, `hover`

### G.6 Ionicon Classes

- `ion-ios-close-empty` (drawer close)
- `ion-help-circled` (tooltip info icon)
- `ion-arrow-up-b` (select dropdown caret)
- `ion-android-arrow-forward` (tab nav arrow)

---

## H. Layout Structure Summary

```
.cly-vue-drawer.is-open.cly-vue-drawer--full-screen (fixed, z-index: 2001, 100vw x 100vh)
  .cly-vue-drawer__steps-view (absolute, full size)
    .cly-vue-drawer__steps-wrapper (flex)
      .cly-vue-drawer__close-button (close X, top-right area)
      .cly-vue-drawer__header.is-full-screen (padding: 0 290px, 16px tall)
      .cly-vue-drawer__steps-container (padding: 0 290px, overflow-y: auto, ~542px)
        h3 "+ Create New Cohort" (20px/500)
        .cly-vue-content
          [Form Fields: Cohort name, Description]
          .cly-vue-drawer-step__section "User Property Segmentation"
            "Users with" label
            .cly-vue-qb-seg__row (property + operator + value + remove)
            "+ Add property" link
          .cly-vue-drawer-step__section "User Behavior Segmentation"
            "+ Add Condition" button (primary blue)
          "Visibility" section
            Radio buttons: Global (checked) | Private
      .cly-vue-drawer__footer (padding: 0 290px)
        Warning banner (if applicable)
        Cancel button | "+ Create New Cohort" button (success green)
```

---

## I. Key Measurements Summary

| Element | Width | Height |
|---------|-------|--------|
| Full-screen drawer | `100vw` | `100vh` |
| Content area (horizontal padding) | `700px` (1280 - 2*290) | Variable |
| Input fields | `668px` | `32px` |
| Property select | `217px` | `32px` |
| Operator select | `163px` | `32px` |
| Buttons (small) | Auto | `32px` |
| Radio inner circle | `16px` | `16px` |
| Close icon | `30px` | `30px` |
| Tooltip icon | `17px` | `17px` |
| Dropdown max scroll | N/A | `274px` |


---

## Part 3: Interaction Flows

## Overview

This document captures every interaction flow in the Countly Cohort Creation Drawer, documented with screenshots at each state change. The Countly instance is running Enterprise v25.03.

---

## Flow 1: Drawer Open/Close

### Step 1: Initial Cohorts Page
- **Trigger**: Navigate to Cohorts page
- **Visual**: Page shows cohort list table with columns: Cohort's Name, Segmentation, Current Users, Today's Change
- **Elements**: Green "+ New Cohort" button in top-right corner, "All Cohorts" filter dropdown, "Compare" button, list/export toggle, search
- **Screenshot**: `cohort-01-cohorts-page.png`

### Step 2: Open Drawer (Click "+ New Cohort")
- **Trigger**: Click green "+ New Cohort" button
- **Visual Change**: Full-width right-side drawer slides in overlaying the cohorts page. Background is dimmed/overlaid.
- **Drawer Layout** (top to bottom):
  - Title: "+ Create New Cohort"
  - Close (X) button: top-right corner
  - **Cohort name**: Text input with placeholder "Enter cohort name"
  - **Description**: Text input with placeholder "Enter cohort description"
  - **User Property Segmentation** (with info icon):
    - "Users with" label
    - Row: [Select Property dropdown] [Select operator dropdown (disabled)] [String value input (disabled)] [X remove]
    - "+ Add property" link (blue text)
  - **User Behavior Segmentation** (with info icon):
    - Blue "+ Add Condition" button
  - **Visibility** section:
    - Radio cards: Global (default selected) | Private
  - **Warning banner** (yellow): "You can't proceed because a cohort with the selected segmentations already exists View it"
  - **Footer**: "Cancel" text button | "+ Create New Cohort" green button
- **Animation**: Drawer slides in from right
- **Screenshot**: `cohort-02-drawer-empty.png`

### Step 3: Close Drawer (Click Cancel)
- **Trigger**: Click "Cancel" button in footer
- **Visual Change**: Drawer slides out to the right, background overlay removed, returns to cohorts list page
- **Animation**: Reverse slide animation
- **Screenshot**: `cohort-03-drawer-closed.png`

---

## Flow 2: Cohort Name Input

### Step 4: Name Input Focus
- **Trigger**: Click on "Enter cohort name" input
- **Visual Change**: Input border changes from light gray (#dcdfe6) to blue (#409eff) focus ring
- **CSS Change**: Border color transition to blue, indicating focus state
- **Screenshot**: `cohort-04-name-focused.png`

### Step 5: Name Input Filled
- **Trigger**: Type "Test Cohort" into the name field
- **Visual Change**: Placeholder text replaced with "Test Cohort" in dark text, blue focus border maintained
- **Screenshot**: `cohort-05-name-filled.png`

---

## Flow 3: Property Selection

### Step 6: Property Dropdown Open
- **Trigger**: Click "Select Property" dropdown
- **Visual Change**: Dropdown popover appears below the property field with:
  - Search input: "Search in Properties" with magnifying glass icon
  - **Tab navigation**: All Properties (default selected) | User | Custom | Campaign | Push Notification (arrow indicates overflow)
  - **Property list** (scrollable, under "All Properties" tab):
    - ID, Age, App Version, Browser, Browser version, Birth year, Carrier, Days of retention...
- **Position**: Dropdown appears directly below the property field, overlapping the sections below
- **Dropdown behavior**: Stays open until a selection is made or user clicks outside
- **Screenshot**: `cohort-06-property-dropdown-open.png`

### Step 7: Property Selected (Name)
- **Trigger**: Search "Name" in search field, then click "Name" item from filtered list
- **Visual Change**:
  - Property dropdown closes
  - Property field now shows "Name" (dark text)
  - Operator dropdown becomes enabled (was disabled)
  - Value field still shows "String" placeholder (disabled until operator selected)
  - Warning banner disappears (segmentation is no longer the default/duplicate)
  - Visibility section fully visible
- **Screenshot**: `cohort-07-property-name-selected.png`

### Step 8: String Operators Dropdown
- **Trigger**: Click operator "Select" dropdown (now enabled)
- **Visual Change**: Dropdown appears below the operator field showing string operators:
  - `is`
  - `is not`
  - `contains`
  - `doesn't contain`
  - `is set`
  - `begins with`
- **No search input** in operator dropdown (unlike property dropdown)
- **Screenshot**: `cohort-08-string-operators.png`

### Step 9: Operator "is" Selected
- **Trigger**: Click "is" in operator dropdown
- **Visual Change**:
  - Operator field shows "is"
  - Value field becomes an enabled text input with "String" placeholder
  - A new empty text input appears for entering the value
- **Dropdown behavior**: Closes on selection
- **Screenshot**: `cohort-09-operator-is-selected.png`

### Step 10: Operator "is set" Selected
- **Trigger**: Reopen operator dropdown, click "is set"
- **Visual Change**:
  - Operator field shows "is set"
  - Value field changes from text input to a "Select" dropdown (for true/false selection)
  - Field type adapts based on operator
- **Screenshot**: `cohort-10-operator-is-set.png`

---

## Flow 4: Different Property Types (Numeric)

### Step 11: Numeric Property Selected (Session Count)
- **Trigger**: Open property dropdown, search "Session", select "Session Count" from "User" tab
- **Visual Change**:
  - Property field shows "Session Count"
  - Operator dropdown resets to "Select" with orange/red validation border (required)
  - Value field shows "String" placeholder
- **Key Observation**: Tab auto-switches to "User" when search matches User properties
- **Screenshot**: `cohort-11-numeric-property.png`

### Step 12: Numeric Operators
- **Trigger**: Click operator dropdown
- **Visual Change**: Dropdown shows numeric-specific operators:
  - `is between`
  - `greater than`
  - `at least`
  - `less than`
  - `at most`
  - `is`
  - `is not`
  - (possibly more operators if scrollable: `is set`)
- **Screenshot**: `cohort-12-numeric-operators.png`

### Step 13: "is between" Operator
- **Trigger**: Select "is between"
- **Visual Change**:
  - Operator shows "is between"
  - Value field transforms into TWO number spinner inputs separated by a dash "-"
  - Default values: 0 - 1
  - Each input has up/down spinner arrows
  - "+ Create New Cohort" button turns green (enabled) since all fields are complete
- **Screenshot**: `cohort-13-is-between.png`

---

## Flow 5: Multiple Conditions (AND/OR)

### Step 14: Two Property Conditions
- **Trigger**: Click "+ Add property" link below the property row
- **Visual Change**:
  - Second property row appears below the first
  - **AND/OR toggle** buttons appear between the two rows
  - AND is selected by default (blue filled button)
  - OR is unselected (white outlined button)
  - New row: [Select Property] [Select operator (disabled)] [String (disabled)] [X remove]
  - "+ Add property" link moves below the second row
- **Screenshot**: `cohort-14-two-conditions.png`

### Step 15: OR Selected
- **Trigger**: Click "OR" button
- **Visual Change**:
  - OR button becomes blue filled (selected)
  - AND button becomes white outlined (unselected)
  - Toggle is immediate, no animation
- **CSS Changes**: Selected button gets `.is-active` or equivalent class with blue background
- **Screenshot**: `cohort-15-or-selected.png`

### Step 16: AND Selected (back)
- **Trigger**: Click "AND" button
- **Visual Change**: AND becomes blue (selected), OR becomes white (unselected)
- **Screenshot**: `cohort-16-and-selected.png`

### Step 17: Condition Row Removed
- **Trigger**: Click X (remove) button on second condition row
- **Visual Change**:
  - Second property row removed
  - AND/OR toggle buttons removed (only shown when 2+ rows exist)
  - Layout collapses back to single row
  - "+ Add property" link repositions below the remaining row
- **Animation**: Instant removal, no fade/slide
- **Screenshot**: `cohort-17-condition-removed.png`

---

## Flow 6: Behavior Segmentation

### Step 18: Behavior Condition Added
- **Trigger**: Click blue "+ Add Condition" button
- **Visual Change**:
  - "User Behavior Segmentation" section expands
  - "Users who" label appears
  - Behavior row appears: [performed] [Sessions] [at least 1 time ▼] [📅 All time ▼] [X]
  - "which has" label below
  - "+ Add property" link (for behavior sub-properties)
  - Another "+ Add Condition" button below (for additional behavior conditions)
- **Default values**: performed / Sessions / at least 1 time / All time
- **Screenshot**: `cohort-18-behavior-added.png`

### Step 19: Behavior Type Dropdown
- **Trigger**: Click "performed" text/dropdown
- **Visual Change**: Small dropdown appears with two options:
  - `performed` (selected, blue highlight)
  - `didn't perform`
- **Dropdown behavior**: Closes on selection
- **Screenshot**: `cohort-19-behavior-type-dropdown.png`

### Step 22: Frequency Popover
- **Trigger**: Click "at least 1 time" dropdown
- **Visual Change**: Popover appears (not a dropdown) with:
  - **Radio buttons**: At least (default), Equal to, At most
  - **Number input** with - / + buttons (value: 1)
  - Green **"Apply"** button
- **Popover behavior**: Requires explicit "Apply" click to confirm changes; closes on Apply or clicking outside
- **Screenshot**: `cohort-22-frequency-options.png`

### Step 23: Time Range Picker
- **Trigger**: Click "All time" dropdown
- **Visual Change**: Large date picker popover appears with:
  - **Left sidebar** (preset modes):
    - Presets (with arrow for submenu)
    - In between
    - Before
    - Since
    - In the last
    - All time (currently selected, blue text)
  - **Right panel** (calendar):
    - Date range inputs: 2026-01-27 and 2026-02-27
    - Calendar grid (February 2026)
    - Today (27th) highlighted with blue circle
    - Selected range highlighted in light blue
  - **Footer**: Cancel | "Apply range" green button
- **Screenshot**: `cohort-23-time-range.png`

---

## Flow 7: Visibility Section

### Step 24: Private Visibility
- **Trigger**: Click "Private" radio card
- **Visual Change**:
  - Private card gets blue radio dot + blue border
  - Global card becomes unselected (gray border, empty radio)
  - Cards are side-by-side, equal width
- **Card text**: "Private - Make this cohort visible only to me"
- **Screenshot**: `cohort-24-visibility-private.png`

### Step 25: Global Visibility (back)
- **Trigger**: Click "Global" radio card
- **Visual Change**:
  - Global card gets blue radio dot + blue border
  - Private card becomes unselected
- **Card text**: "Global - Make this cohort visible to all users"
- **Screenshot**: `cohort-25-visibility-global.png`

---

## Flow 8: Footer States

### Step 27: Footer with Enabled Create Button
- **Trigger**: All required fields filled (name + at least one valid property/behavior condition)
- **Visual**:
  - "Cancel" text button (left) - no background, dark text
  - "+ Create New Cohort" green filled button (right) - green background, white text
- **Button states**: Button is always visible; green color indicates it's enabled/clickable
- **Screenshot**: `cohort-27-footer-enabled.png`

**Note**: When a duplicate segmentation is detected, a yellow warning banner appears: "You can't proceed because a cohort with the selected segmentations already exists View it" (with external link icon).

---

## State Machine Diagrams

### Drawer Open/Close
```
[Cohorts Page] →(click "+ New Cohort")→ [Drawer Open]
  →(click Cancel / click X / click outside)→ [Cohorts Page]
```

### Property Selection Flow
```
[Empty Row: Select Property (disabled operator, disabled value)]
  →(click Select Property)→ [Property Dropdown Open]
    →(search/browse, click property)→ [Property Selected, Operator Enabled]
      →(click operator dropdown)→ [Operator Dropdown Open]
        →(select operator)→ [Operator Selected, Value Field Adapts]
          - String "is"/"is not"/"contains"/"begins with" → Text Input
          - String "is set" → Select Dropdown (true/false)
          - Numeric "is between" → Two Number Spinners
          - Numeric "is"/"greater than"/etc → Single Number Spinner
```

### Multiple Conditions Flow
```
[Single Property Row]
  →(click "+ Add property")→ [Two Rows + AND/OR Toggle]
    →(click AND)→ [AND Selected (blue)]
    →(click OR)→ [OR Selected (blue)]
    →(click X on row)→ [Single Row, AND/OR Hidden]
```

### Behavior Segmentation Flow
```
[Empty Behavior Section: "+ Add Condition" button]
  →(click "+ Add Condition")→ [Behavior Row: performed | Sessions | at least 1 time | All time]
    →(click performed)→ [Type Dropdown: performed / didn't perform]
    →(click frequency)→ [Frequency Popover: At least/Equal to/At most + number + Apply]
    →(click time range)→ [Date Picker: Presets/In between/Before/Since/In the last/All time + Calendar]
```

---

## Operator-to-Value Mapping Table

### String Properties (e.g., Name, Username, Browser)
| Operator | Value Field | Description |
|---|---|---|
| is | Text input | Single string value |
| is not | Text input | Single string value |
| contains | Text input | Substring match |
| doesn't contain | Text input | Negative substring match |
| is set | Select dropdown | Boolean (true/false presence check) |
| begins with | Text input | Prefix match |

### Numeric Properties (e.g., Session Count, Total Session Duration)
| Operator | Value Field | Description |
|---|---|---|
| is between | Two number spinners (min - max) | Range with default 0-1 |
| greater than | Number spinner | Single threshold |
| at least | Number spinner | Inclusive minimum |
| less than | Number spinner | Single threshold |
| at most | Number spinner | Inclusive maximum |
| is | Number spinner | Exact match |
| is not | Number spinner | Negative exact match |

### Behavior Condition Components
| Component | Type | Options |
|---|---|---|
| Behavior Type | Dropdown | performed, didn't perform |
| Event | Text (pre-filled) | Sessions (default), other events |
| Frequency | Popover | At least / Equal to / At most + number input + Apply |
| Time Range | Date Picker | Presets, In between, Before, Since, In the last, All time |

---

## Component Architecture

### Property Dropdown
- **Component**: `cly-vue-dropdown` with `cly-vue-listbox`
- **Tab panes**: `#pane-__root`, `#pane-__all`, `#pane-User`, `#pane-Custom`, `#pane-Campaign`, `#pane-Push Notification`
- **Search**: Full-text filter across all tabs
- **Selection**: Clicking item in listbox triggers Vue event, closes dropdown

### Operator Dropdown
- **Component**: `cly-vue-dropdown` with `cly-vue-listbox`
- **No search**: Direct list of operators
- **Dynamic**: Operators change based on selected property type (string vs numeric)
- **Selection**: Uses Playwright `text=/^exact_text$/` regex for reliable click targeting

### AND/OR Toggle
- **Component**: Button group with mutually exclusive selection
- **Visual**: Selected = blue filled, Unselected = white outlined
- **Behavior**: Only visible when 2+ property rows exist

### Visibility Radio Cards
- **Component**: Radio button group rendered as cards
- **States**: Selected = blue radio + blue border, Unselected = empty radio + gray border
- **Layout**: Two equal-width cards side by side

---

## UI Patterns & Technical Notes

1. **Dropdown items** in `cly-vue-listbox` components require Playwright regex text selectors (`text=/^exact_text$/`) for reliable clicking. Standard CSS selectors and JavaScript `.click()` do not trigger Vue's event system.

2. **Property dropdown** items are selectable via `#pane-{tabName} .cly-vue-listbox__item:nth-child(N)` CSS selectors.

3. **Frequency control** is a popover (not a dropdown) with Apply button - requires explicit confirmation.

4. **Time range** opens a full date picker with preset sidebar and calendar grid.

5. **Warning banner** appears when the selected segmentation matches an existing cohort.

6. **The "+ Add property" link** is a `<span>` element (not `<a>`), clickable via `text=/\+ Add property/` selector.

7. **Value field adapts** dynamically based on both property type AND selected operator:
   - String + is → text input
   - String + is set → select dropdown
   - Numeric + is between → two number spinners
   - Numeric + is/greater than → single number spinner

---

## Screenshot Index

| # | Filename | Description |
|---|---|---|
| 01 | `cohort-01-cohorts-page.png` | Initial cohorts list page |
| 02 | `cohort-02-drawer-empty.png` | Empty drawer after opening |
| 03 | `cohort-03-drawer-closed.png` | Page after drawer closed |
| 04 | `cohort-04-name-focused.png` | Name input focused (blue border) |
| 05 | `cohort-05-name-filled.png` | Name input with "Test Cohort" |
| 06 | `cohort-06-property-dropdown-open.png` | Property dropdown with tabs and items |
| 07 | `cohort-07-property-name-selected.png` | "Name" property selected |
| 08 | `cohort-08-string-operators.png` | String operator dropdown open |
| 09 | `cohort-09-operator-is-selected.png` | "is" operator selected, text input |
| 10 | `cohort-10-operator-is-set.png` | "is set" operator, Select dropdown |
| 11 | `cohort-11-numeric-property.png` | "Session Count" numeric property |
| 12 | `cohort-12-numeric-operators.png` | Numeric operators dropdown |
| 13 | `cohort-13-is-between.png` | "is between" with two spinners |
| 14 | `cohort-14-two-conditions.png` | Two property rows with AND/OR |
| 15 | `cohort-15-or-selected.png` | OR toggle selected |
| 16 | `cohort-16-and-selected.png` | AND toggle selected |
| 17 | `cohort-17-condition-removed.png` | Second condition removed |
| 18 | `cohort-18-behavior-added.png` | Behavior condition added |
| 19 | `cohort-19-behavior-type-dropdown.png` | Behavior type: performed/didn't perform |
| 22 | `cohort-22-frequency-options.png` | Frequency popover with Apply |
| 23 | `cohort-23-time-range.png` | Time range date picker |
| 24 | `cohort-24-visibility-private.png` | Private visibility selected |
| 25 | `cohort-25-visibility-global.png` | Global visibility selected |
| 27 | `cohort-27-footer-enabled.png` | Footer with enabled Create button |

All screenshots are stored in: `prd-assets/`


---

## Part 4: HTML Structure & Class Names

## A. Drawer Container

The drawer root element:
```html
<div tabindex="0" class="cly-vue-drawer is-mounted is-open cly-vue-drawer--full-screen">
  <div class="cly-vue-drawer__sidecars-view" style="display: none;"></div>
  <div class="cly-vue-drawer__steps-view">
    <div class="cly-vue-drawer__steps-wrapper">
      <!-- Close button row -->
      <div class="bu-container bu-pt-3 bu-is-fluid bu-p-0">
        <div class="bu-columns bu-is-gapless">
          <div class="bu-column bu-is-12 bu-is-flex bu-is-justify-content-flex-end">
            <span data-test-id="drawer-test-id-close-button" class="cly-vue-drawer__close-button">
              <i class="ion-ios-close-empty" />
            </span>
          </div>
        </div>
      </div>

      <!-- Header (empty in full-screen mode) -->
      <div class="cly-vue-drawer__header is-full-screen">
        <div class="cly-vue-drawer__title" />
      </div>

      <!-- Steps Container (scrollable body) -->
      <div class="cly-vue-drawer__steps-container is-scroll-shadow-at-top">
        <div class="scroll-shadow-container" style="top: 588px;" />
        <!-- Title Row -->
        <div class="bu-columns bu-is-gapless bu-is-mobile">
          <div data-test-id="drawer-test-id-header-title" class="bu-column bu-is-12">
            <h3>+ Create New Cohort</h3>
          </div>
        </div>
        <!-- Body Container -->
        <div class="bu-columns bu-is-gapless bu-is-mobile cly-vue-drawer__body-container">
          <div class="bu-column bu-is-12">
            <div id="cly-cmp-13-cohorts-main" class="cly-vue-content">
              <!-- All sections go here -->
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="cly-vue-drawer__footer">
        <!-- content -->
      </div>
    </div>
  </div>
</div>
```

### Key Drawer Classes
| Class | Purpose |
|---|---|
| `cly-vue-drawer` | Base drawer component |
| `is-mounted` | Drawer has been mounted to DOM |
| `is-open` | Drawer is currently visible/open |
| `cly-vue-drawer--full-screen` | Full-screen mode |
| `cly-vue-drawer--half-screen` | Half-screen mode (other drawer) |
| `cly-vue-drawer--half-screen-6` | Half-screen width variant |
| `cly-vue-drawer__sidecars-view` | Side panel container (hidden with `display:none`) |
| `cly-vue-drawer__steps-view` | Main content wrapper |
| `cly-vue-drawer__steps-wrapper` | Steps layout wrapper |
| `cly-vue-drawer__header` | Header container |
| `cly-vue-drawer__header.is-full-screen` | Header in full-screen mode |
| `cly-vue-drawer__title` | Title area (empty for cohort drawer, title is in steps-container) |
| `cly-vue-drawer__steps-container` | Scrollable content area |
| `cly-vue-drawer__steps-container.is-scroll-shadow-at-top` | Scroll shadow position state |
| `cly-vue-drawer__body-container` | Body section wrapper |
| `cly-vue-drawer__close-button` | Close (X) button |
| `cly-vue-drawer__footer` | Footer with action buttons |
| `cly-vue-drawer__buttons` | Button group in footer |
| `cly-vue-drawer__controls-left-pc` | Left-side controls/warnings area |
| `scroll-shadow-container` | Shadow effect indicator for scrolling |

---

## B. Header Section

```html
<div class="bu-container bu-pt-3 bu-is-fluid bu-p-0">
  <div class="bu-columns bu-is-gapless">
    <div class="bu-column bu-is-12 bu-is-flex bu-is-justify-content-flex-end">
      <span data-test-id="drawer-test-id-close-button" class="cly-vue-drawer__close-button">
        <i class="ion-ios-close-empty" />
      </span>
    </div>
  </div>
</div>

<div class="cly-vue-drawer__header is-full-screen">
  <div class="cly-vue-drawer__title" />
</div>

<div class="bu-columns bu-is-gapless bu-is-mobile">
  <div data-test-id="drawer-test-id-header-title" class="bu-column bu-is-12">
    <h3>+ Create New Cohort</h3>
  </div>
</div>
```

---

## C. Cohort Name & Description Inputs

```html
<!-- Cohort Name -->
<div class="cly-vue-form-field cly-vue-form-step__section" name="Cohort name" rules="required">
  <div class="bu-is-flex bu-is-justify-content-space-between bu-mr-2">
    <div data-test-id="cohorts-drawer-cohorts-name-label-header" class="font-weight-bold text-smallish bu-mb-2">
      Cohort name
    </div>
    <div class="text-small text-heading color-cool-gray-40" style="display: none;">
      Optional
    </div>
  </div>
  <form>
    <span>
      <div class="cly-vue-form-field__inner el-form-item">
        <div class="el-input">
          <input data-test-id="cohorts-drawer-cohorts-name-input"
                 type="text"
                 autocomplete="off"
                 placeholder="Enter cohort name"
                 class="el-input__inner" />
        </div>
      </div>
    </span>
  </form>
</div>

<!-- Description -->
<div class="cly-vue-form-field cly-vue-form-step__section" name="Description">
  <div class="bu-is-flex bu-is-justify-content-space-between bu-mr-2">
    <div data-test-id="cohorts-drawer-cohorts-description-label-header" class="font-weight-bold text-smallish bu-mb-2">
      Description
    </div>
    <div class="text-small text-heading color-cool-gray-40">
      Optional
    </div>
  </div>
  <form>
    <span>
      <div class="cly-vue-form-field__inner el-form-item">
        <div class="el-input">
          <input data-test-id="cohorts-drawer-cohorts-description-input"
                 type="text"
                 autocomplete="off"
                 placeholder="Enter cohort description"
                 class="el-input__inner" />
        </div>
      </div>
    </span>
  </form>
</div>
```

---

## D. User Property Segmentation Section

### D.1 Section Container
```html
<div class="cly-vue-drawer-step__section">
  <div class="bu-columns bu-is-gapless bu-is-mobile bu-is-centered">
    <div class="bu-column bu-is-12">
      <div>
        <div>
          <!-- Section Title -->
          <div class="text-big text-heading">
            <span data-test-id="cohorts-drawer-segmentation-label">
              User Property Segmentation
            </span>
            <i class="cly-vue-tooltip-icon ion ion-help-circled has-tooltip"
               data-original-title="null"
               data-test-id="cohorts-drawer-segmentation-tooltip" />
          </div>

          <!-- Subtitle -->
          <div data-test-id="cohorts-drawer-user-property-segmentation-label"
               class="text-medium bu-px-1 bu-pb-1">
            Users with
          </div>

          <!-- Query Builder Segment -->
          <div class="cly-vue-qb-seg">
            <!-- Condition rows go here -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### D.2 Single Condition Row (closed dropdowns, initial state)
```html
<div class="cly-vue-qb-seg">
  <span>
    <div class="bu-columns bu-is-gapless bu-is-multiline">
      <div element-loading-text="Loading..."
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0.8)"
           class="bu-column bu-is-12">
        <!-- Loading mask (hidden) -->
        <div class="el-loading-mask" style="background-color: rgba(255, 255, 255, 0.8); display: none;">
          <div class="el-loading-spinner">
            <i class="el-icon-loading" />
            <p class="el-loading-text">Loading...</p>
          </div>
        </div>

        <!-- Row container -->
        <div class="bu-columns bu-is-gapless bu-is-mobile cly-vue-qb-seg__row cly-vue-qb-seg__row--first cly-vue-qb-seg__row--last">
          <div class="bu-column bu-is-12">
            <!-- Row selects -->
            <div class="bu-columns bu-is-gapless bu-is-mobile cly-vue-qb-seg__row-selects">

              <!-- Property Dropdown (bu-is-4 = 33% width) -->
              <div class="bu-column bu-is-4">
                <span>
                  <div data-test-id="cohorts-drawer-property-select-property-dropdown-0-dropdown-el-select"
                       class="cly-vue-dropdown el-select cly-vue-select-x"
                       placeholder="Select Property">
                    <div style="width: 100%;">
                      <div class="cly-input-dropdown-trigger el-input el-input--suffix is-arrow"
                           size="" min-width="-1" max-width="-1">
                        <input data-test-id="cohorts-drawer-property-select-property-dropdown-0"
                               type="text"
                               readonly="readonly"
                               autocomplete="off"
                               placeholder="Select Property"
                               class="el-input__inner" />
                        <span class="el-input__suffix">
                          <span class="el-input__suffix-inner">
                            <i class="el-select__caret ion-arrow-up-b" />
                          </span>
                        </span>
                      </div>
                    </div>

                    <!-- Dropdown popup (hidden when closed) -->
                    <div class="el-select-dropdown el-popper cly-vue-dropdown__pop"
                         style="display: none;">
                      <div class="cly-vue-dropdown__pop-container">
                        <div class="cly-vue-select-x__pop">
                          <!-- See D.4 for open state -->
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
              </div>

              <!-- Operator Dropdown (bu-is-3 = 25% width) -->
              <div class="bu-column bu-is-3">
                <span>
                  <div class="el-select">
                    <div class="el-input el-input--suffix is-arrow">
                      <input data-test-id="cohorts-drawer-property-select-condition-dropdown-0-select-input"
                             type="text"
                             readonly="readonly"
                             autocomplete="off"
                             placeholder="Select"
                             class="el-input__inner" />
                      <span class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                          <i data-test-id="cohorts-drawer-property-select-condition-dropdown-0-select-icon"
                             class="el-select__caret ion-arrow-up-b" />
                        </span>
                      </span>
                    </div>
                    <!-- Operator dropdown popup (hidden when closed) -->
                    <div class="el-select-dropdown el-popper"
                         style="display: none; min-width: 163px;">
                      <div class="el-scrollbar">
                        <div class="el-select-dropdown__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
                          <ul class="el-scrollbar__view el-select-dropdown__list">
                            <!-- Operator items rendered here when property selected -->
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
              </div>

              <!-- Value Input (bu-is-4 = 33% width) -->
              <div class="bu-column bu-is-4">
                <span popper-append-to-body="true" class="cly-vue-qb-seg__row-wrapper" pop-class="">
                  <div class="el-input is-disabled">
                    <input data-test-id="cohorts-drawer-property-select-value-dropdown-0"
                           type="text"
                           disabled="disabled"
                           autocomplete="off"
                           placeholder="String"
                           class="el-input__inner" />
                  </div>
                </span>
              </div>

              <!-- Delete Row Button (bu-is-1 = 8% width) -->
              <div class="bu-column bu-is-1 bu-is-flex bu-is-align-items-center bu-is-justify-content-center">
                <div class="cly-icon-button cly-icon-button--gray cly-vue-qb-icon">
                  <i data-test-id="cohorts-drawer-qbs-close-button-0" class="el-icon-close" />
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
            <div data-test-id="cohorts-drawer-add-property-button"
                 class="cly-text-button cly-text-button--disabled">
              + Add property
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</div>
```

### D.3 Row State Classes
| Class | When Applied |
|---|---|
| `cly-vue-qb-seg__row--first` | First condition row |
| `cly-vue-qb-seg__row--last` | Last condition row |
| When 2+ rows, middle rows have neither `--first` nor `--last` | |
| `cly-text-button--disabled` | "Add property" disabled (no operator selected) |
| `cly-text-button` | "Add property" enabled |
| `is-disabled` (on el-input) | Value input disabled (no operator selected) |
| `is-focus` (on el-input) | Input currently focused |
| `is-arrow` (on el-input) | Dropdown trigger has arrow icon |

### D.4 Property Dropdown (Open State)
```html
<div class="el-select-dropdown el-popper cly-vue-dropdown__pop" style="">
  <div class="cly-vue-dropdown__pop-container">
    <div class="cly-vue-select-x__pop">
      <div class="cly-vue-select-x__header">
        <div class="bu-level">
          <!-- Title / Selected count (hidden for property dropdown) -->
        </div>
        <!-- Search box -->
        <div class="bu-level">
          <div class="bu-level-item">
            <div class="el-input el-input--prefix">
              <input data-test-id="cohorts-drawer-property-select-property-dropdown-0-search-box"
                     type="text"
                     autocomplete="off"
                     placeholder="Search in Properties"
                     class="el-input__inner" />
              <span class="el-input__prefix">
                <i data-test-id="cohorts-drawer-property-select-property-dropdown-0-search-icon"
                   class="el-input__icon el-icon-search" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="el-tabs el-tabs--top">
        <div class="el-tabs__header is-top">
          <div class="el-tabs__nav-wrap is-scrollable is-top is-scrollable-right">
            <span class="el-tabs__nav-prev is-disabled">
              <i data-test-id="cohorts-drawer-property-select-property-dropdown-0-tabs-tab-arrow-back"
                 class="ion-android-arrow-back" />
            </span>
            <span class="el-tabs__nav-next">
              <i data-test-id="cohorts-drawer-property-select-property-dropdown-0-tabs-tab-arrow-forward"
                 class="ion-android-arrow-forward" />
            </span>
            <div class="el-tabs__nav-scroll">
              <div role="tablist" class="el-tabs__nav is-top">
                <div class="el-tabs__active-bar is-top" />
                <!-- Tab items -->
                <div id="tab-__all" role="tab" tabindex="0"
                     class="el-tabs__item is-top is-active" aria-selected="true">
                  <span data-test-id="cohorts-drawer-property-select-property-dropdown-0-el-tab-all-properties">
                    All Properties
                  </span>
                </div>
                <div id="tab-user" role="tab" tabindex="-1"
                     class="el-tabs__item is-top">
                  <span data-test-id="cohorts-drawer-property-select-property-dropdown-0-el-tab-user">
                    User
                  </span>
                </div>
                <div id="tab-custom" role="tab" tabindex="-1"
                     class="el-tabs__item is-top">
                  <span data-test-id="cohorts-drawer-property-select-property-dropdown-0-el-tab-custom">
                    Custom
                  </span>
                </div>
                <!-- Campaign tab, Push Notification tab follow same pattern -->
              </div>
            </div>
          </div>
        </div>

        <!-- Tab Content -->
        <div class="el-tabs__content">
          <div role="tabpanel" class="el-tab-pane">
            <div class="cly-vue-listbox scroll-keep-show cly-vue-listbox--has-margin cly-vue-listbox--has-default-skin">
              <div class="__vuescroll vBarVisible hBarVisible">
                <div class="__panel __hidebar">
                  <div class="__view">
                    <div class="cly-vue-listbox__items-wrapper">
                      <!-- List items -->
                      <div class="text-medium font-weight-bold cly-vue-listbox__item">
                        <div class="cly-vue-listbox__item-content">
                          <div class="bu-level-left">
                            <div class="cly-vue-listbox__item-prefix bu-mr-1" />
                            <div data-original-title="null"
                                 class="cly-vue-listbox__item-label has-tooltip"
                                 data-test-id="cohorts-drawer-property-select-property-dropdown-0-item-name">
                              Name
                            </div>
                          </div>
                          <div class="bu-level-right" />
                        </div>
                      </div>
                      <!-- More items follow same structure -->
                    </div>
                  </div>
                </div>
              </div>
              <!-- Scrollbar rails -->
              <div class="__rail-is-vertical" />
              <div class="__rail-is-horizontal" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### D.5 Operator Dropdown Items (after property "Name" selected - string type)
```html
<div class="el-select-dropdown el-popper" style="display: none; min-width: 163px;">
  <div class="el-scrollbar">
    <div class="el-select-dropdown__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
      <ul class="el-scrollbar__view el-select-dropdown__list">
        <li class="el-select-dropdown__item has-tooltip" data-original-title="null">
          <span data-test-id="cohorts-drawer-property-select-condition-dropdown-0-item-is-el-options">is</span>
        </li>
        <li class="el-select-dropdown__item has-tooltip" data-original-title="null">
          <span data-test-id="cohorts-drawer-property-select-condition-dropdown-0-item-is-not-el-options">is not</span>
        </li>
        <li class="el-select-dropdown__item has-tooltip" data-original-title="null">
          <span data-test-id="cohorts-drawer-property-select-condition-dropdown-0-item-contains-el-options">contains</span>
        </li>
        <li class="el-select-dropdown__item has-tooltip" data-original-title="null">
          <span data-test-id="cohorts-drawer-property-select-condition-dropdown-0-item-doesnt-contain-el-options">doesn't contain</span>
        </li>
        <li class="el-select-dropdown__item has-tooltip" data-original-title="null">
          <span data-test-id="cohorts-drawer-property-select-condition-dropdown-0-item-is-set-el-options">is set</span>
        </li>
        <li class="el-select-dropdown__item has-tooltip" data-original-title="null">
          <span data-test-id="cohorts-drawer-property-select-condition-dropdown-0-item-begins-with-el-options">begins with</span>
        </li>
      </ul>
    </div>
  </div>
</div>
```

### D.6 Value Input (after operator "is" selected)
When operator is selected, value field changes from disabled text input to a multi-select:
```html
<div class="bu-column bu-is-4">
  <span popper-append-to-body="true" class="cly-vue-qb-seg__row-wrapper" pop-class="">
    <div class="el-select">
      <div class="el-select__tags" style="width: 100%; max-width: 185.328px;">
        <input type="text"
               data-test-id="cohorts-drawer-property-select-value-dropdown-0-el-select-input"
               autocomplete="chrome-off"
               class="el-select__input" />
      </div>
      <div class="el-input">
        <input data-test-id="cohorts-drawer-property-select-value-dropdown-0-select-input"
               tabindex="-1"
               type="text"
               readonly="readonly"
               autocomplete="chrome-off"
               placeholder="String"
               class="el-input__inner" />
      </div>
      <div class="el-select-dropdown el-popper is-multiple"
           style="display: none; min-width: 217.328px;">
        <div class="el-scrollbar" style="display: none;">
          <div class="el-select-dropdown__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
            <ul class="el-scrollbar__view el-select-dropdown__list" />
          </div>
        </div>
        <span class="empty-span" />
      </div>
    </div>
  </span>
</div>
```

---

## E. User Behavior Segmentation Section

### E.1 Section Header (before any condition added)
```html
<div class="text-big text-heading bu-mt-5">
  <span data-test-id="cohorts-drawer-user-behaviour-segmentation-label">
    User Behavior Segmentation
  </span>
  <i class="cly-vue-tooltip-icon ion ion-help-circled has-tooltip"
     data-original-title="null"
     data-test-id="cohorts-drawer-user-behaviour-segmentation-tooltip" />
</div>

<div class="cly-vue-qb-steps">
  <span>
    <!-- No step rows when empty -->
    <div class="bu-columns bu-is-gapless">
      <div class="bu-column bu-is-12">
        <div class="bu-columns bu-is-gapless bu-is-mobile">
          <div class="bu-column bu-is-2">
            <button type="button"
                    class="el-button el-button--primary el-button--small"
                    data-test-id="cohorts-drawer-cohort-steps-add-conditions-button">
              <span>+ Add Condition</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </span>
</div>
```

### E.2 Behavior Step (after clicking "+ Add Condition")
```html
<div class="cly-vue-qb-steps__step">
  <div class="bu-columns bu-is-gapless bu-is-multiline">
    <!-- "Users who" label -->
    <div class="bu-column bu-is">
      <div data-test-id="cohorts-drawer-seg-step-0-seg-type-users-who"
           class="text-medium bu-px-1 bu-pb-1">
        Users who
      </div>
    </div>

    <!-- Step Row -->
    <div class="bu-column bu-is-12">
      <div class="bu-columns bu-is-gapless bu-is-mobile cly-vue-qb-steps__row">
        <div class="bu-column bu-is-12">
          <div class="cly-vue-qb-steps__row-selects">
            <div class="bu-is-flex bu-is-justify-content-space-between bu-is-align-items-center">
              <div class="bu-is-flex">

                <!-- Behavior Type Dropdown (performed/didn't perform) -->
                <div class="bu-mr-1" style="min-width: 120px; width: 120px;">
                  <div class="cly-vue-form-field" name="behaviorType" rules="required">
                    <form>
                      <span>
                        <div class="cly-vue-form-field__inner el-form-item">
                          <div class="el-select" width="120">
                            <div class="el-input">
                              <input data-test-id="cohorts-drawer-seg-step-0-behaviour-type-select-input"
                                     type="text"
                                     readonly="readonly"
                                     autocomplete="chrome-off"
                                     placeholder="Select Behavior Type"
                                     class="el-input__inner" />
                            </div>
                            <div class="el-select-dropdown el-popper" style="display: none; min-width: 120px;">
                              <div class="el-scrollbar">
                                <div class="el-select-dropdown__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
                                  <ul class="el-scrollbar__view el-select-dropdown__list">
                                    <li class="el-select-dropdown__item selected has-tooltip">
                                      <span data-test-id="cohorts-drawer-seg-step-0-behaviour-type-performed-el-options">
                                        performed
                                      </span>
                                    </li>
                                    <li class="el-select-dropdown__item has-tooltip">
                                      <span data-test-id="cohorts-drawer-seg-step-0-behaviour-type-didnt-perform-el-options">
                                        didn't perform
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </span>
                    </form>
                  </div>
                </div>

                <!-- Event Type Dropdown -->
                <div>
                  <div data-test-id="cohorts-drawer-seg-step-0-event-type-dropdown-el-select"
                       class="cly-vue-dropdown el-select cly-vue-select-x"
                       placeholder="Select Behavior Type">
                    <div style="width: 100%;">
                      <div data-test-id="cohorts-drawer-seg-step-0-event-type-pseudo-input"
                           class="cly-input-dropdown-trigger el-input el-input--suffix is-arrow">
                        <input type="text" readonly="readonly"
                               autocomplete="off"
                               placeholder="Select Behavior Type"
                               class="el-input__inner" />
                        <span class="el-input__suffix">
                          <span class="el-input__suffix-inner">
                            <i class="el-select__caret ion-arrow-up-b" />
                          </span>
                        </span>
                      </div>
                    </div>

                    <!-- Event dropdown popup (with tabs for event types) -->
                    <div class="el-select-dropdown el-popper cly-vue-dropdown__pop" style="display: none;">
                      <div class="cly-vue-dropdown__pop-container">
                        <div class="cly-vue-select-x__pop cly-vue-select-x__pop--hidden-tabs cly-vue-select-x__pop--has-single-option">
                          <div class="cly-vue-select-x__header">
                            <div class="cly-vue-select-x__header-slot">
                              <!-- Radio buttons for frequency type -->
                              <div role="radiogroup" class="el-radio-group">
                                <!-- Radio items: at least, at most, exactly -->
                              </div>
                            </div>
                            <!-- Search box -->
                            <div class="bu-level">
                              <div class="bu-level-item">
                                <div class="el-input el-input--prefix">
                                  <input data-test-id="cohorts-drawer-seg-step-0-event-type-search-box"
                                         type="text"
                                         placeholder="Search"
                                         class="el-input__inner" />
                                  <span class="el-input__prefix">
                                    <i data-test-id="cohorts-drawer-seg-step-0-event-type-search-icon"
                                       class="el-input__icon el-icon-search" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- Tabs: Sessions, Events, View, Feedback, etc. -->
                          <div class="el-tabs el-tabs--top">
                            <div class="el-tabs__header is-top">
                              <div class="el-tabs__nav-wrap is-top">
                                <div class="el-tabs__nav-scroll">
                                  <div role="tablist" class="el-tabs__nav is-top">
                                    <!-- Tab items -->
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="el-tabs__content">
                              <!-- Tab panes with listbox items -->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Delete step button -->
              <div>
                <div class="cly-icon-button cly-icon-button--gray">
                  <i data-test-id="cohorts-drawer-seg-step-0-seg-delete-button"
                     class="el-icon-close" />
                </div>
              </div>
            </div>

            <!-- Frequency row -->
            <div class="bu-is-flex bu-is-align-items-center bu-mt-2">
              <!-- Times select dropdown -->
              <div data-test-id="cohorts-drawer-seg-step-0-times-select-pseudo-input"
                   class="cly-input-dropdown-trigger el-input el-input--suffix is-arrow">
                <input type="text" readonly="readonly"
                       class="el-input__inner"
                       class="el-input__inner--auto-resize" />
              </div>

              <!-- Frequency radio buttons -->
              <div role="radiogroup" class="el-radio-group">
                <label data-test-id="cohorts-drawer-seg-step-0-item-0-el-radio-wrapper"
                       role="radio" class="el-radio-button">
                  <span class="el-radio-button__orig-radio" />
                  <span data-test-id="cohorts-drawer-seg-step-0-item-0-el-radio-label"
                        class="el-radio-button__inner">
                    <!-- at least / at most / exactly -->
                  </span>
                </label>
                <!-- More radio buttons: item-1, item-2 -->
              </div>

              <!-- Count input -->
              <div role="spinbutton"
                   aria-valuemax="Infinity"
                   aria-valuemin="1"
                   aria-valuenow="1"
                   aria-disabled="false"
                   class="el-input-number el-input-number--small is-without-controls">
                <div class="el-input">
                  <input data-test-id="cohorts-drawer-seg-step-0-el-input-number"
                         type="text"
                         autocomplete="off"
                         class="el-input__inner"
                         role="spinbutton" />
                </div>
              </div>

              <!-- Approve button -->
              <button data-test-id="cohorts-drawer-seg-step-0-approve-button"
                      class="el-button el-button--primary el-button--mini is-circle">
                <i class="el-icon-check" />
              </button>
            </div>

            <!-- Date picker row -->
            <div class="bu-is-flex bu-is-align-items-center bu-mt-2">
              <div data-test-id="cohorts-drawer-seg-step-0-datepicker-pseudo-input"
                   class="cly-input-dropdown-trigger el-input el-input--suffix is-arrow">
                <input type="text" readonly="readonly" class="el-input__inner" />
                <span data-test-id="cohorts-drawer-seg-step-0-datepicker-pseudo-input-label"
                      class="el-input__suffix" />
              </div>
              <!-- Date picker dropdown popup with buttons -->
              <div class="el-select-dropdown el-popper cly-vue-dropdown__pop" style="display: none;">
                <div class="cly-vue-dropdown__pop-container">
                  <div>
                    <div data-test-id="cohorts-drawer-seg-step-0-datepicker-select-date-custom-label">
                      custom
                    </div>
                    <button data-test-id="cohorts-drawer-seg-step-0-datepicker-select-date-in-between-button">
                      in between
                    </button>
                    <button data-test-id="cohorts-drawer-seg-step-0-datepicker-select-date-before-button">
                      before
                    </button>
                    <button data-test-id="cohorts-drawer-seg-step-0-datepicker-select-date-since-button">
                      since
                    </button>
                    <button data-test-id="cohorts-drawer-seg-step-0-datepicker-select-date-in-the-last-button">
                      in the last
                    </button>
                    <button data-test-id="cohorts-drawer-seg-step-0-datepicker-select-date-all-time-button">
                      all time
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- "which has" label and add property -->
            <div data-test-id="cohorts-drawer-seg-step-0-which-has-label"
                 class="text-medium bu-mt-3">
              which has
            </div>
            <div data-test-id="cohorts-drawer-seg-step-0-add-property-button"
                 class="cly-text-button">
              + Add property
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Divider between steps -->
  <div class="bu-my-4 cly-divider is-dashed" />

  <!-- Add Condition button -->
  <div class="bu-columns bu-is-gapless">
    <div class="bu-column bu-is-12">
      <div class="bu-columns bu-is-gapless bu-is-mobile">
        <div class="bu-column bu-is-2">
          <button type="button"
                  class="el-button el-button--primary el-button--small"
                  data-test-id="cohorts-drawer-cohort-steps-add-conditions-button">
            <span>+ Add Condition</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### E.3 Event Type Dropdown Tabs
| Tab data-test-id | Label |
|---|---|
| `cohorts-drawer-seg-step-0-event-type-el-tab-sessions` | Sessions |
| `cohorts-drawer-seg-step-0-event-type-el-tab-events` | Events |
| `cohorts-drawer-seg-step-0-event-type-el-tab-view` | View |
| `cohorts-drawer-seg-step-0-event-type-el-tab-feedback` | Feedback |
| `cohorts-drawer-seg-step-0-event-type-el-tab-llm-observability` | LLM Observability |
| `cohorts-drawer-seg-step-0-event-type-el-tab-consent` | Consent |
| `cohorts-drawer-seg-step-0-event-type-el-tab-crash` | Crash |
| `cohorts-drawer-seg-step-0-event-type-el-tab-push-actioned` | Push Actioned |
| `cohorts-drawer-seg-step-0-event-type-el-tab-journey` | Journey |

---

## F. Visibility Section

```html
<div class="cly-vue-drawer-step__section">
  <div data-test-id="cohorts-drawer-cohorts-visibility-label-header"
       class="text-big text-heading">
    Visibility
  </div>

  <div class="cly-vue-drawer-step__line cly-vue-drawer-step__line--aligned">
    <!-- Global Radio -->
    <label data-test-id="cohorts-drawer-cohorts-visibility-radio-global-el-radio-wrapper"
           role="radio"
           aria-checked="true"
           tabindex="0"
           class="el-radio is-autosized is-multiline is-bordered is-checked">
      <span data-test-id="cohorts-drawer-cohorts-visibility-radio-global-el-radio"
            class="el-radio__input is-checked">
        <span class="el-radio__inner" />
        <input data-test-id="cohorts-drawer-cohorts-visibility-radio-global-el-radio-button"
               type="radio"
               aria-hidden="true"
               tabindex="-1"
               class="el-radio__original"
               value="global" />
      </span>
      <span data-test-id="cohorts-drawer-cohorts-visibility-radio-global-el-radio-label"
            class="el-radio__label">
        <div data-test-id="cohorts-drawer-cohorts-visibility-radio-global-label"
             class="cohorts-drawer-radio-visibility-label">
          Global
        </div>
        <div data-test-id="cohorts-drawer-cohorts-visibility-radio-make-this-cohort-visible-to-all-users-description"
             class="text-small bu-has-text-grey">
          Make this cohort visible to all users
        </div>
      </span>
    </label>

    <!-- Private Radio -->
    <label data-test-id="cohorts-drawer-cohorts-visibility-radio-private-el-radio-wrapper"
           role="radio"
           tabindex="0"
           class="el-radio is-autosized is-multiline is-bordered">
      <span data-test-id="cohorts-drawer-cohorts-visibility-radio-private-el-radio"
            class="el-radio__input">
        <span class="el-radio__inner" />
        <input data-test-id="cohorts-drawer-cohorts-visibility-radio-private-el-radio-button"
               type="radio"
               aria-hidden="true"
               tabindex="-1"
               class="el-radio__original"
               value="private" />
      </span>
      <span data-test-id="cohorts-drawer-cohorts-visibility-radio-private-el-radio-label"
            class="el-radio__label">
        <div data-test-id="cohorts-drawer-cohorts-visibility-radio-private-label"
             class="cohorts-drawer-radio-visibility-label">
          Private
        </div>
        <div data-test-id="cohorts-drawer-cohorts-visibility-radio-make-this-cohort-visible-only-to-me-description"
             class="text-small bu-has-text-grey">
          Make this cohort visible only to me
        </div>
      </span>
    </label>
  </div>
</div>
```

### Visibility Radio State Classes
| Class | When Applied |
|---|---|
| `is-checked` (on `el-radio`) | Radio is selected |
| `is-checked` (on `el-radio__input`) | Inner radio indicator active |
| `is-bordered` | Bordered style for radio cards |
| `is-multiline` | Multi-line label layout |
| `is-autosized` | Auto-width sizing |

---

## G. Footer

```html
<div class="cly-vue-drawer__footer">
  <!-- Left side: warnings/notifications -->
  <div class="cly-vue-drawer__controls-left-pc">
    <!-- Warning notification (conditionally rendered) -->
    <div class="cly-in-page-notification text-medium bu-p-2 cly-in-page-notification--light-warning">
      <span>
        You can't proceed because a cohort with the selected segmentations already exists
        <a href="#/cohorts/detail/{id}" target="_blank">View it</a>
        <i class="ion-android-open" />
      </span>
    </div>
  </div>

  <!-- Right side: Action buttons -->
  <div class="cly-vue-drawer__buttons is-single-step is-single-step bu-is-justify-content-flex-end bu-is-flex">
    <button type="button"
            class="el-button el-button--secondary el-button--small"
            data-test-id="drawer-test-id-cancel-button">
      <span>Cancel</span>
    </button>
    <button type="button"
            class="el-button el-button--success el-button--small is-disabled"
            data-test-id="drawer-test-id-save-button">
      <span>+ Create New Cohort</span>
    </button>
  </div>
</div>
```

### Footer Button State Classes
| Class | When Applied |
|---|---|
| `el-button--secondary` | Cancel button style |
| `el-button--success` | Create/Save button style |
| `el-button--small` | Small button size |
| `is-disabled` | Button disabled (form incomplete) |
| `is-single-step` | Single-step drawer mode (no back/next) |
| `cly-in-page-notification--light-warning` | Warning notification style |

---

## H. State Variations

### H.1 Dropdown Closed vs Open
| State | DOM Changes |
|---|---|
| **Closed** | `<div class="el-select-dropdown el-popper" style="display: none;">` |
| **Open** | `style="display: none;"` removed, dropdown rendered visible |
| **Property dropdown open** | Input gets `is-focus` class on trigger |
| **Select-x popup** | `cly-vue-dropdown__pop` becomes visible, listbox items rendered |

### H.2 One Condition vs Multiple (Property Segmentation)
| State | DOM Changes |
|---|---|
| **1 condition** | Row has both `cly-vue-qb-seg__row--first` and `cly-vue-qb-seg__row--last` |
| **2+ conditions** | AND/OR toggle appears between rows. First row: `--first`, last: `--last` |
| **Add property button** | `cly-text-button--disabled` when no operator selected, `cly-text-button` when enabled |

### H.3 Enabled vs Disabled States
| Element | Disabled Class/Attribute | Enabled State |
|---|---|---|
| Value input | `class="el-input is-disabled"`, `disabled="disabled"` | `class="el-input"`, no disabled |
| Operator dropdown | `class="el-input is-disabled"`, `disabled="disabled"` | No disabled attribute |
| Save button | `class="... is-disabled"` | No `is-disabled` |
| Add property | `class="cly-text-button cly-text-button--disabled"` | `class="cly-text-button"` |

### H.4 With vs Without Behavior Section
| State | DOM Changes |
|---|---|
| **No behavior condition** | `cly-vue-qb-steps` contains only the "+ Add Condition" button |
| **With behavior condition** | `cly-vue-qb-steps__step` div inserted before the button, with divider |

### H.5 Conditionally Rendered (v-if)
- **Behavior step rows**: Removed from DOM when no conditions exist
- **Operator dropdown items**: `<li>` elements only present after property selected
- **Warning notification**: Added/removed from `cly-vue-drawer__controls-left-pc`
- **"Optional" label**: Present in DOM but `display: none` for required fields

### H.6 Visibility Toggle (v-show / display:none)
- `cly-vue-drawer__sidecars-view` always in DOM with `style="display: none;"`
- Dropdown popups: `el-select-dropdown el-popper` with `style="display: none;"`
- Loading mask: `el-loading-mask` with `display: none;`
- "Optional" label: `style="display: none;"` for required fields

---

## I. data-test-id Index

### Drawer Framework
| data-test-id | Element | Purpose |
|---|---|---|
| `drawer-test-id-close-button` | `<span>` | Close (X) button |
| `drawer-test-id-header-title` | `<div>` | Drawer title container |
| `drawer-test-id-cancel-button` | `<button>` | Cancel button |
| `drawer-test-id-save-button` | `<button>` | Save/Create button |

### Cohort Name & Description
| data-test-id | Element | Purpose |
|---|---|---|
| `cohorts-drawer-cohorts-name-label-header` | `<div>` | "Cohort name" label |
| `cohorts-drawer-cohorts-name-input` | `<input>` | Name text input |
| `cohorts-drawer-cohorts-description-label-header` | `<div>` | "Description" label |
| `cohorts-drawer-cohorts-description-input` | `<input>` | Description text input |

### User Property Segmentation
| data-test-id | Element | Purpose |
|---|---|---|
| `cohorts-drawer-segmentation-label` | `<span>` | Section title |
| `cohorts-drawer-segmentation-tooltip` | `<i>` | Help tooltip icon |
| `cohorts-drawer-user-property-segmentation-label` | `<div>` | "Users with" label |
| `cohorts-drawer-property-select-property-dropdown-{n}-dropdown-el-select` | `<div>` | Property dropdown wrapper |
| `cohorts-drawer-property-select-property-dropdown-{n}` | `<input>` | Property dropdown input |
| `cohorts-drawer-property-select-property-dropdown-{n}-search-box` | `<input>` | Property search input |
| `cohorts-drawer-property-select-property-dropdown-{n}-search-icon` | `<i>` | Property search icon |
| `cohorts-drawer-property-select-property-dropdown-{n}-tabs-tab-arrow-back` | `<i>` | Tab scroll left arrow |
| `cohorts-drawer-property-select-property-dropdown-{n}-tabs-tab-arrow-forward` | `<i>` | Tab scroll right arrow |
| `cohorts-drawer-property-select-property-dropdown-{n}-el-tab-all-properties` | `<span>` | "All Properties" tab |
| `cohorts-drawer-property-select-property-dropdown-{n}-el-tab-user` | `<span>` | "User" tab |
| `cohorts-drawer-property-select-property-dropdown-{n}-el-tab-custom` | `<span>` | "Custom" tab |
| `cohorts-drawer-property-select-property-dropdown-{n}-scroll` | `<div>` | Scrollable area |
| `cohorts-drawer-property-select-property-dropdown-{n}-item` | `<div>` | Property group item |
| `cohorts-drawer-property-select-property-dropdown-{n}-item-{name}` | `<div>` | Individual property item (e.g., `-item-name`, `-item-age`, `-item-platform`) |
| `cohorts-drawer-property-select-condition-dropdown-{n}-select-input` | `<input>` | Operator dropdown input |
| `cohorts-drawer-property-select-condition-dropdown-{n}-select-icon` | `<i>` | Operator dropdown arrow |
| `cohorts-drawer-property-select-condition-dropdown-{n}-item-{operator}-el-options` | `<span>` | Operator option (e.g., `-item-is-el-options`, `-item-is-not-el-options`, `-item-contains-el-options`, `-item-doesnt-contain-el-options`, `-item-is-set-el-options`, `-item-begins-with-el-options`) |
| `cohorts-drawer-property-select-value-dropdown-{n}` | `<input>` | Value input (disabled state) |
| `cohorts-drawer-property-select-value-dropdown-{n}-el-select-input` | `<input>` | Value multi-select input |
| `cohorts-drawer-property-select-value-dropdown-{n}-select-input` | `<input>` | Value select input |
| `cohorts-drawer-qbs-close-button-{n}` | `<i>` | Delete condition row button |
| `cohorts-drawer-add-property-button` | `<div>` | "+ Add property" button |

### User Behavior Segmentation
| data-test-id | Element | Purpose |
|---|---|---|
| `cohorts-drawer-user-behaviour-segmentation-label` | `<span>` | Section title |
| `cohorts-drawer-user-behaviour-segmentation-tooltip` | `<i>` | Help tooltip icon |
| `cohorts-drawer-cohort-steps-add-conditions-button` | `<button>` | "+ Add Condition" button |
| `cohorts-drawer-seg-step-{n}-seg-type-users-who` | `<div>` | "Users who" label |
| `cohorts-drawer-seg-step-{n}-behaviour-type-select-input` | `<input>` | Behavior type dropdown |
| `cohorts-drawer-seg-step-{n}-behaviour-type-performed-el-options` | `<span>` | "performed" option |
| `cohorts-drawer-seg-step-{n}-behaviour-type-didnt-perform-el-options` | `<span>` | "didn't perform" option |
| `cohorts-drawer-seg-step-{n}-event-type-dropdown-el-select` | `<div>` | Event type dropdown wrapper |
| `cohorts-drawer-seg-step-{n}-event-type-pseudo-input` | `<div>` | Event type input trigger |
| `cohorts-drawer-seg-step-{n}-event-type-pseudo-input-label` | `<span>` | Event type input label |
| `cohorts-drawer-seg-step-{n}-event-type-search-box` | `<input>` | Event search input |
| `cohorts-drawer-seg-step-{n}-event-type-search-icon` | `<i>` | Event search icon |
| `cohorts-drawer-seg-step-{n}-event-type-tab-{0-8}` | `<div>` | Event type tab |
| `cohorts-drawer-seg-step-{n}-event-type-el-tab-sessions` | `<span>` | "Sessions" tab |
| `cohorts-drawer-seg-step-{n}-event-type-el-tab-events` | `<span>` | "Events" tab |
| `cohorts-drawer-seg-step-{n}-event-type-el-tab-view` | `<span>` | "View" tab |
| `cohorts-drawer-seg-step-{n}-event-type-el-tab-feedback` | `<span>` | "Feedback" tab |
| `cohorts-drawer-seg-step-{n}-event-type-el-tab-llm-observability` | `<span>` | "LLM Observability" tab |
| `cohorts-drawer-seg-step-{n}-event-type-el-tab-consent` | `<span>` | "Consent" tab |
| `cohorts-drawer-seg-step-{n}-event-type-el-tab-crash` | `<span>` | "Crash" tab |
| `cohorts-drawer-seg-step-{n}-event-type-el-tab-push-actioned` | `<span>` | "Push Actioned" tab |
| `cohorts-drawer-seg-step-{n}-event-type-el-tab-journey` | `<span>` | "Journey" tab |
| `cohorts-drawer-seg-step-{n}-event-type-scroll` | `<div>` | Scrollable event list |
| `cohorts-drawer-seg-step-{n}-event-type-item` | `<div>` | Event group item |
| `cohorts-drawer-seg-step-{n}-event-type-item-{name}` | `<div>` | Event item (e.g., `-item-sessions`, `-item-view`, `-item-crash`, etc.) |
| `cohorts-drawer-seg-step-{n}-times-select-pseudo-input` | `<div>` | Times select dropdown |
| `cohorts-drawer-seg-step-{n}-times-select-pseudo-input-label` | `<span>` | Times select label |
| `cohorts-drawer-seg-step-{n}-item-{0,1,2}-el-radio-wrapper` | `<label>` | Frequency radio wrapper |
| `cohorts-drawer-seg-step-{n}-item-{0,1,2}-el-radio` | `<span>` | Frequency radio input |
| `cohorts-drawer-seg-step-{n}-item-{0,1,2}-el-radio-button` | `<input>` | Frequency radio button |
| `cohorts-drawer-seg-step-{n}-item-{0,1,2}-el-radio-label` | `<span>` | Frequency radio label (at least / at most / exactly) |
| `cohorts-drawer-seg-step-{n}-el-input-number` | `<input>` | Count number input |
| `cohorts-drawer-seg-step-{n}-approve-button` | `<button>` | Check/approve button |
| `cohorts-drawer-seg-step-{n}-datepicker-pseudo-input` | `<div>` | Date picker trigger |
| `cohorts-drawer-seg-step-{n}-datepicker-pseudo-input-label` | `<span>` | Date picker label |
| `cohorts-drawer-seg-step-{n}-datepicker-select-date-custom-label` | `<div>` | "custom" label |
| `cohorts-drawer-seg-step-{n}-datepicker-select-date-in-between-button` | `<button>` | "in between" option |
| `cohorts-drawer-seg-step-{n}-datepicker-select-date-before-button` | `<button>` | "before" option |
| `cohorts-drawer-seg-step-{n}-datepicker-select-date-since-button` | `<button>` | "since" option |
| `cohorts-drawer-seg-step-{n}-datepicker-select-date-in-the-last-button` | `<button>` | "in the last" option |
| `cohorts-drawer-seg-step-{n}-datepicker-select-date-all-time-button` | `<button>` | "all time" option |
| `cohorts-drawer-seg-step-{n}-seg-delete-button` | `<i>` | Delete step button |
| `cohorts-drawer-seg-step-{n}-which-has-label` | `<div>` | "which has" label |
| `cohorts-drawer-seg-step-{n}-add-property-button` | `<div>` | "+ Add property" in behavior step |

### Visibility
| data-test-id | Element | Purpose |
|---|---|---|
| `cohorts-drawer-cohorts-visibility-label-header` | `<div>` | "Visibility" section header |
| `cohorts-drawer-cohorts-visibility-radio-global-el-radio-wrapper` | `<label>` | Global radio wrapper |
| `cohorts-drawer-cohorts-visibility-radio-global-el-radio` | `<span>` | Global radio input container |
| `cohorts-drawer-cohorts-visibility-radio-global-el-radio-button` | `<input>` | Global radio input |
| `cohorts-drawer-cohorts-visibility-radio-global-el-radio-label` | `<span>` | Global radio label container |
| `cohorts-drawer-cohorts-visibility-radio-global-label` | `<div>` | "Global" text |
| `cohorts-drawer-cohorts-visibility-radio-make-this-cohort-visible-to-all-users-description` | `<div>` | Global description |
| `cohorts-drawer-cohorts-visibility-radio-private-el-radio-wrapper` | `<label>` | Private radio wrapper |
| `cohorts-drawer-cohorts-visibility-radio-private-el-radio` | `<span>` | Private radio input container |
| `cohorts-drawer-cohorts-visibility-radio-private-el-radio-button` | `<input>` | Private radio input |
| `cohorts-drawer-cohorts-visibility-radio-private-el-radio-label` | `<span>` | Private radio label container |
| `cohorts-drawer-cohorts-visibility-radio-private-label` | `<div>` | "Private" text |
| `cohorts-drawer-cohorts-visibility-radio-make-this-cohort-visible-only-to-me-description` | `<div>` | Private description |

### Property Dropdown Items (observed)
| data-test-id suffix | Property Name |
|---|---|
| `-item-name` | Name |
| `-item-username` | Username |
| `-item-last-view-name` | Last view name |
| `-item-platform` | Platform |
| `-item-phone` | Phone |
| `-item-platform-version` | Platform version |
| `-item-resolution` | Resolution |
| `-item-region` | Region |
| `-item-session-count` | Session count |
| `-item-source` | Source |
| `-item-total-session-duration` | Total session duration |
| `-item-locale` | Locale |
| `-item-push-token` | Push token |
| `-item-geolocation` | Geolocation |
| `-item-referral-campaign` | Referral campaign |

### Event Type Items (observed)
| data-test-id suffix | Event Name |
|---|---|
| `-item-sessions` | Sessions |
| `-item-comment-added` | Comment added |
| `-item-feature-used` | Feature used |
| `-item-file-uploaded` | File uploaded |
| `-item-integration-connected` | Integration connected |
| `-item-project-archived` | Project archived |
| `-item-project-created` | Project created |
| `-item-task-completed` | Task completed |
| `-item-task-created` | Task created |
| `-item-task-updated` | Task updated |
| `-item-view` | View |
| `-item-ratings` | Ratings |
| `-item-nps` | NPS |
| `-item-surveys` | Surveys |
| `-item-llm-interaction` | LLM Interaction |
| `-item-llm-interaction-feedback` | LLM Interaction Feedback |
| `-item-llm-tool-used` | LLM Tool Used |
| `-item-llm-tool-usage-parameter` | LLM Tool Usage Parameter |
| `-item-consent` | Consent |
| `-item-crash` | Crash |
| `-item-push-action` | Push Action |
| `-item-journey-started` | Journey Started |
| `-item-journey-ended` | Journey Ended |
| `-item-content-views` | Content Views |
| `-item-content-interactions` | Content Interactions |

---

## J. ARIA Attributes

| Attribute | Value | Element | Context |
|---|---|---|---|
| `role="radiogroup"` | - | `<div>` | Visibility radio group, frequency radio group |
| `role="radio"` | - | `<label>` | Each radio option (Global/Private) |
| `role="tablist"` | - | `<div class="el-tabs__nav">` | Property/event tabs |
| `role="tab"` | - | `<div class="el-tabs__item">` | Individual tab |
| `role="tabpanel"` | - | `<div class="el-tab-pane">` | Tab content panel |
| `role="button"` | - | Various | Clickable elements |
| `role="spinbutton"` | - | `<div class="el-input-number">` | Numeric input for count |
| `aria-checked="true"` | - | `<label role="radio">` | Selected radio |
| `aria-hidden="true"` | - | `<input type="radio">` | Native radio hidden from a11y |
| `aria-selected="true"` | - | `<div role="tab">` | Active tab |
| `aria-controls="pane-{id}"` | - | `<div role="tab">` | Tab controls panel |
| `aria-labelledby="tab-{id}"` | - | `<div role="tabpanel">` | Panel labeled by tab |
| `aria-valuemax="Infinity"` | - | `<div role="spinbutton">` | Max value for count input |
| `aria-valuemin="1"` | - | `<div role="spinbutton">` | Min value for count input |
| `aria-valuenow="1"` | - | `<div role="spinbutton">` | Current value for count input |
| `aria-disabled="false"` | - | `<div role="spinbutton">` | Enabled state for count input |
| `tabindex="0"` | - | Various | Focusable elements (drawer, radios, active tab) |
| `tabindex="-1"` | - | Various | Programmatically focusable (inactive tabs, hidden inputs) |

---

## Complete CSS Class Reference

### Drawer Shell
- `cly-vue-drawer`, `is-mounted`, `is-open`
- `cly-vue-drawer--full-screen`, `cly-vue-drawer--half-screen`, `cly-vue-drawer--half-screen-6`
- `cly-vue-drawer__sidecars-view`, `cly-vue-drawer__steps-view`, `cly-vue-drawer__steps-wrapper`
- `cly-vue-drawer__header`, `is-full-screen`
- `cly-vue-drawer__title`, `cly-vue-drawer__title-container`, `cly-vue-drawer__title-header`
- `cly-vue-drawer__close-button`
- `cly-vue-drawer__steps-container`, `is-scroll-shadow-at-top`
- `cly-vue-drawer__body-container`
- `cly-vue-drawer__footer`, `cly-vue-drawer__buttons`, `is-single-step`
- `cly-vue-drawer__controls-left-pc`
- `cly-vue-drawer-step__section`, `cly-vue-drawer-step__line`, `cly-vue-drawer-step__line--aligned`
- `scroll-shadow-container`

### Form Fields
- `cly-vue-form-field`, `cly-vue-form-field__inner`, `cly-vue-form-step__section`
- `cly-vue-content`

### Query Builder (Property Segmentation)
- `cly-vue-qb-seg`
- `cly-vue-qb-seg__row`, `cly-vue-qb-seg__row--first`, `cly-vue-qb-seg__row--last`
- `cly-vue-qb-seg__row-selects`
- `cly-vue-qb-seg__row-wrapper`
- `cly-vue-qb-icon`

### Query Builder (Behavior Segmentation)
- `cly-vue-qb-steps`
- `cly-vue-qb-steps__step`
- `cly-vue-qb-steps__row`, `cly-vue-qb-steps__row-selects`

### Dropdowns
- `cly-vue-dropdown`, `cly-vue-dropdown__pop`, `cly-vue-dropdown__pop-container`
- `cly-vue-select-x`, `cly-vue-select-x__pop`, `cly-vue-select-x__pop--hidden-tabs`, `cly-vue-select-x__pop--has-single-option`
- `cly-vue-select-x__header`, `cly-vue-select-x__header-slot`, `cly-vue-select-x__title`
- `cly-input-dropdown-trigger`

### Listbox
- `cly-vue-listbox`, `cly-vue-listbox--has-margin`, `cly-vue-listbox--has-default-skin`
- `cly-vue-listbox__items-wrapper`
- `cly-vue-listbox__item`, `cly-vue-listbox__item-content`
- `cly-vue-listbox__item-prefix`, `cly-vue-listbox__item-label`

### Element UI Components
- `el-input`, `el-input__inner`, `el-input__suffix`, `el-input__suffix-inner`, `el-input__prefix`, `el-input__icon`
- `el-input--suffix`, `el-input--prefix`
- `el-select`, `el-select__caret`, `el-select__tags`, `el-select__input`
- `el-select-dropdown`, `el-select-dropdown__wrap`, `el-select-dropdown__list`, `el-select-dropdown__item`, `el-select-dropdown__empty`
- `el-popper`, `is-multiple`
- `el-scrollbar`, `el-scrollbar__wrap`, `el-scrollbar__wrap--hidden-default`, `el-scrollbar__view`, `el-scrollbar__bar`, `el-scrollbar__thumb`
- `el-radio`, `el-radio__input`, `el-radio__inner`, `el-radio__original`, `el-radio__label`
- `el-radio-button`, `el-radio-button__orig-radio`, `el-radio-button__inner`
- `el-radio-group`
- `el-button`, `el-button--primary`, `el-button--secondary`, `el-button--success`, `el-button--small`, `el-button--mini`
- `el-tabs`, `el-tabs--top`, `el-tabs__header`, `el-tabs__nav-wrap`, `el-tabs__nav-scroll`, `el-tabs__nav`, `el-tabs__nav-prev`, `el-tabs__nav-next`, `el-tabs__active-bar`, `el-tabs__item`, `el-tabs__content`
- `el-tab-pane`
- `el-form-item`
- `el-input-number`, `el-input-number--small`, `is-without-controls`
- `el-loading-mask`, `el-loading-spinner`, `el-icon-loading`
- `el-icon-close`, `el-icon-check`, `el-icon-search`

### State Modifiers
- `is-checked`, `is-active`, `is-disabled`, `is-focus`, `is-arrow`
- `is-bordered`, `is-multiline`, `is-autosized`
- `is-scrollable`, `is-scrollable-right`
- `is-top` (tabs), `is-horizontal`, `is-vertical` (scrollbar)
- `selected` (on el-select-dropdown__item)
- `has-tooltip`

### Utility Classes (Bulma-based)
- `bu-columns`, `bu-column`, `bu-is-12`, `bu-is-4`, `bu-is-3`, `bu-is-2`, `bu-is-1`
- `bu-is-gapless`, `bu-is-mobile`, `bu-is-multiline`, `bu-is-centered`
- `bu-is-flex`, `bu-is-flex-direction-column`
- `bu-is-justify-content-flex-end`, `bu-is-justify-content-space-between`, `bu-is-justify-content-center`
- `bu-is-align-items-center`
- `bu-container`, `bu-is-fluid`
- `bu-level`, `bu-level-left`, `bu-level-right`, `bu-level-item`
- `bu-mr-1`, `bu-mr-2`, `bu-mb-2`, `bu-mt-2`, `bu-mt-3`, `bu-mt-5`, `bu-my-4`
- `bu-pt-3`, `bu-p-0`, `bu-p-2`, `bu-px-1`, `bu-pb-1`, `bu-pb-4`
- `bu-has-text-grey`

### Typography
- `text-big`, `text-medium`, `text-small`, `text-smallish`, `text-heading`
- `font-weight-bold`
- `color-cool-gray-40`, `color-cool-gray-50`

### Misc
- `cly-text-button`, `cly-text-button--disabled`
- `cly-icon-button`, `cly-icon-button--gray`
- `cly-vue-tooltip-icon`
- `cly-divider`, `is-dashed`
- `cly-in-page-notification`, `cly-in-page-notification--light-warning`
- `cohorts-drawer-radio-visibility-label`
- `ion-ios-close-empty`, `ion-arrow-up-b`, `ion-android-arrow-back`, `ion-android-arrow-forward`, `ion-android-open`, `ion-help-circled`
- `scroll-keep-show`
- `__vuescroll`, `__panel`, `__hidebar`, `__view`, `__rail-is-vertical`, `__rail-is-horizontal`
- `empty-span`


---

## Part 5: AI Chat (Cee) vs Original UI Comparison

### Executive Summary

The Cee AI Chat assistant is **fully accessible** on Countly Enterprise v25.03 at `mert.count.ly`. The green smiley-face icon in the left sidebar's icon column opens a popup chat panel. The panel can be expanded to **full-screen mode** via the "Select layout" button (second icon in the popup header).

Cee uses **Gemini 3 Flash Preview** (`gemini-3-flash-preview`) as its backend model and routes prompts through intent classification:
- **`cohort_agent`** — renders interactive cohort creation forms inline (triggered by "Create cohort..." prompts)
- **`user_agent`** — returns data analysis tables (triggered by "Find users..." prompts)

When the `cohort_agent` is triggered, Cee renders a **fully interactive cohort form** inside the chat that closely mirrors the original drawer UI. The form includes: Cohort name, Description, User Property Segmentation, User Behaviour Segmentation (with AND logic), Visibility radio buttons, and Confirm/Cancel action buttons.

---

### How to Access Cee AI

#### Step 1: Click the Cee Icon
- **Location**: Far-left icon column of the sidebar (narrow vertical strip), between "Journeys" and "Feedback" vertically
- **Appearance**: Small green rounded rectangle with a smiley face
- **Accessibility tree**: First `listitem` in the bottom `list` of the sidebar, containing an `<img>` element
- **data-test-id**: The input field uses `ai-assistants-message-input`

#### Step 2: Switch to Full Screen
- After clicking, a popup panel appears on the right
- Click the **second icon** in the popup header (title: "Select layout") — NOT the `>>` button (which hides the popup, data-test-id: `ai-container-hide-prompt-icon`)
- Select **"Full screen"** from the dropdown menu

#### Step 3: Type Prompts
- Use the textbox at the bottom: placeholder "Ask Cee anything" (data-test-id: `ai-assistants-message-input`)
- Press Enter to submit

---

### Prompt Test Results

#### Prompt 1: Behavior-only segmentation (AND logic)
- **Input**: `Create a cohort for users who signed up this month but never opened the app again`
- **Agent**: `cohort_agent` (confidence: 1)
- **Result**: Rendered full cohort form
- **Screenshot**: `prd-assets/cee-prompt1-signup-no-return.png`, `prd-assets/cee-prompt1-scrolled-up.png`

| Field | Value |
|-------|-------|
| Cohort name | `New Signups - No Return (Current Month)` |
| Description | `Users who performed the Signup event this month but did not have any subsequent sessions.` |
| Property Segmentation | Empty (+ Add property filter button shown) |
| Behavior Condition 1 | **Events** tab selected → Users who **performed** `⚠ Signup` **at least** `1` times (time period dropdown shown, no selection) |
| Warning | `Event "Signup" was not found in available events — it will still be used.` |
| AND connector | Shown between conditions |
| Behavior Condition 2 | **Sessions** tab selected → Users who **didn't perform** `Sessions` **at least** `1` times (time period dropdown shown) |
| Visibility | **Global** selected (green border highlight) |
| Actions | **Confirm** (green button) + **Cancel** (outlined button) |

#### Prompt 2: User query (non-cohort routing)
- **Input**: `Find users on iOS who had more than 5 sessions`
- **Agent**: `user_agent` (confidence: 0.95)
- **Result**: Data analysis table (NOT a cohort form)
- **Screenshot**: `prd-assets/cee-prompt2-ios-sessions-query.png`
- **Note**: "Find users" phrasing triggers `user_agent` instead of `cohort_agent`. Returns analytics summary table with Metric/Value columns.

#### Prompt 3: Property + Behavior segmentation
- **Input**: `Create a cohort for users on iOS platform who had more than 5 sessions in the last 30 days`
- **Agent**: `cohort_agent` (confidence: 1)
- **Result**: Rendered full cohort form with BOTH property and behavior sections populated
- **Screenshot**: `prd-assets/cee-prompt3-ios-power-users.png`

| Field | Value |
|-------|-------|
| Cohort name | `iOS Power Users (30d)` |
| Description | `Users on iOS platform with more than 5 sessions in the last 30 days` |
| Property Segmentation | **Platform** `is` `iOS` (with comma-separated values helper text) |
| Property Dropdown | Shows categories: Carrier, Orientation, **LOCATION & LANGUAGE** (Country, City, Region, Language, Locale) |
| Behavior Condition | **Sessions** tab selected → Users who **performed** `Sessions` **at least** `1` times **in the last 30 days** |
| Behavior sub-filter | `where Platform is iOS` (shown below behavior row) |
| Visibility | **Global** selected |
| Actions | **Confirm** + **Cancel** |

#### Prompt 4: Behavior AND logic (purchase + no return)
- **Input**: `Create a cohort for users who completed a purchase but never came back in 30 days`
- **Agent**: `cohort_agent` (confidence: 1)
- **Result**: Rendered full cohort form with AND logic
- **Screenshot**: `prd-assets/cee-prompt4-purchase-no-return.png`

| Field | Value |
|-------|-------|
| Cohort name | `Purchased but No Return (30d)` |
| Description | `Users who completed a Purchase event but did not have any sessions in the following 30 days.` |
| Property Segmentation | Empty (+ Add property filter button shown) |
| Behavior Condition 1 | **Events** tab → Users who **performed** `⚠ Purchase` **at least** `1` times **all time** |
| Warning | `Event "Purchase" was not found in available events — it will still be used.` |
| AND connector | Shown between conditions |
| Behavior Condition 2 | **Sessions** tab → Users who **didn't perform** `Sessions` **at least** `1` times **in the last 30 days** |
| Visibility | **Global** selected |
| Actions | **Confirm** + **Cancel** |

---

### Cee Form vs Original Drawer — Structural Comparison

| # | Element | Original (Drawer) | Cee AI Chat Form | Difference | Severity |
|---|---------|-------------------|-----------------|------------|----------|
| 1 | **Container** | `cly-vue-drawer--full-screen` overlay, fixed position | Inline card within chat scroll area | Different rendering context — Cee form is embedded in chat, not a modal overlay | INFO |
| 2 | **Title** | "+ Create New Cohort" (h2, ~20px, weight 500-600) | Bold card header: "Create: [Cohort Name]" + "POST /i/cohorts/add" subtitle | Different title format; Cee shows API endpoint | MEDIUM |
| 3 | **Cohort Name** | Label "Cohort name" + `input[placeholder="Enter cohort name"]`, 32px height, 668px width | Label "Cohort name *" (with red asterisk) + same placeholder input | Cee adds required indicator `*` — original doesn't show it | LOW |
| 4 | **Description** | Label "Description" + `input[placeholder="Enter cohort description"]` | Same label + same placeholder | Identical | NONE |
| 5 | **Property Section Title** | "User Property Segmentation" with info icon (blue circle ?) | "User Property Segmentation" with description text below | Cee adds description text: "Select the properties of the users you would like to group under one cohort." Original has info icon tooltip instead | MEDIUM |
| 6 | **Property Row** | 3-column: `cly-vue-select-x` Property \| Operator \| Value + Remove(X) | `combobox` Property \| `combobox` Operator \| `textbox` Value | Different component types — Cee uses native `combobox` instead of `cly-vue-select-x` | HIGH |
| 7 | **Property Dropdown** | Tabbed: All Properties \| User \| Custom \| Campaign \| Push Notification + search | Flat dropdown with category headers (e.g., "LOCATION & LANGUAGE") | Different dropdown structure — Cee uses grouped flat list, original uses tabs | HIGH |
| 8 | **Operator Options** | is, is not, contains, doesn't contain, is set, begins with (6 options for string) | is, is not, greater than, at least, less than, at most, contains, does not contain, begins with, is set (10 options) | Cee shows ALL operator types at once (including numeric); original filters by property type | HIGH |
| 9 | **Add Property** | Blue text link "+ Add property" | Button "+ Add property filter" | Different label text and possibly different styling | LOW |
| 10 | **Behavior Section Title** | "User Behavior Segmentation" with info icon | "User Behaviour Segmentation" (British spelling) with description text | Spelling difference ("Behavior" vs "Behaviour") + description text added | MEDIUM |
| 11 | **Behavior Tabs** | Not visible in empty state; shown after "+ Add Condition" click | Always visible: Sessions \| Events \| View \| Consent \| Crash \| Push | Cee shows tabs immediately; original requires clicking "Add Condition" first | MEDIUM |
| 12 | **Behavior Tab Style** | Standard `el-tabs` with underline indicator | Pill/tag buttons — active tab has colored background (green for Sessions, orange for Events) | Different tab styling — Cee uses colored pill buttons, original uses underlined tabs | HIGH |
| 13 | **Behavior Row Layout** | "Users who" + performed/didn't perform + event + frequency + count + "times" + time period | Same structure but uses native `combobox` and `spinbutton` elements | Same logical layout, different component implementations | MEDIUM |
| 14 | **Event Warning** | Not applicable (events are validated from list) | Orange warning: `Event "X" was not found in available events — it will still be used.` | Cee allows free-text events with validation warning; original uses strict dropdown | HIGH |
| 15 | **AND/OR Connector** | AND/OR toggle button between conditions | "AND" button between condition cards | Similar concept, styling may differ | LOW |
| 16 | **Behavior Sub-filter** | Not present | `where Platform is iOS` tag shown below behavior row | Cee adds cross-reference summary tags — original doesn't | MEDIUM |
| 17 | **Visibility** | Radio buttons: Global (blue ring) / Private, horizontal layout | Radio cards: Global (green border highlight, filled background) / Private, horizontal layout | Different radio styling — Cee uses card-style with green highlight; original uses standard radio with blue ring | HIGH |
| 18 | **Footer / Actions** | Fixed footer: Cancel (gray `el-button--secondary`) + "+ Create New Cohort" (green `el-button--primary`) | Inline at form bottom: **Confirm** (green filled) + **Cancel** (outlined) | Different button labels ("Confirm" vs "+ Create New Cohort"), not fixed to viewport bottom | HIGH |
| 19 | **Close/Delete** | X button in top-right corner of drawer | Trash icon (🗑) in top-right of full-screen Cee panel | Different close/dismiss mechanism | LOW |
| 20 | **Debug Info** | Not present | Debug card showing: intent, confidence, domain, agent, workflow, model, app, member, thread | Cee shows debugging metadata — should be hidden in production | LOW |

---

### Cee AI Technical Details

| Property | Value |
|----------|-------|
| Backend Model | `gemini-3-flash-preview` |
| Workflow | `api-chat` |
| Intent Routing | `cohort_agent` (confidence 1.0 for "Create cohort" prompts) |
| Alternative Agent | `user_agent` (confidence 0.95 for "Find users" prompts) |
| Data test IDs | `ai-assistants-message-input` (chat input), `ai-container-hide-prompt-icon` (hide button) |
| Thread persistence | Uses thread UUID across same session |
| Form interactivity | All dropdowns, inputs, spinbuttons are interactive and editable |
| Confirm action | POSTs to `/i/cohorts/add` API endpoint |

---

### Prioritized Fix List for Pixel-Perfect Parity

#### HIGH Priority
1. **Property Dropdown Structure** — Cee uses flat grouped list; original uses tabbed interface with search. Implement `cly-vue-select-x` with `el-tabs` and `cly-vue-listbox` components.
2. **Operator Filtering** — Cee shows all operators regardless of property type. Filter operators based on selected property type (string → 6 options, numeric → different set).
3. **Behavior Tab Style** — Replace colored pill buttons with `el-tabs` underline-style tabs matching the original drawer.
4. **Visibility Radio Style** — Replace card-style green-border radios with standard `el-radio` components using blue ring checked state.
5. **Footer Actions** — Change "Confirm" to "+ Create New Cohort", use `el-button--primary` (green) and `el-button--secondary` (gray), fix to viewport bottom.
6. **Event Validation** — Replace free-text event input with validated dropdown matching available events; or keep warning but style it identically.

#### MEDIUM Priority
7. **Section Titles** — Remove description text from Cee; add info icon tooltips matching original. Fix "Behaviour" → "Behavior" spelling.
8. **Form Title** — Change "Create: [Name]" to "+ Create New Cohort" matching original drawer header.
9. **Behavior Sub-filters** — Remove `where Platform is iOS` summary tags (not present in original).
10. **Component Types** — Replace native `combobox` with `cly-vue-select-x` + `el-select` wrappers.

#### LOW Priority
11. **Required Indicator** — Remove red asterisk `*` from "Cohort name" label (original doesn't show it).
12. **Add Property Label** — Change "+ Add property filter" to "+ Add property".
13. **Debug Card** — Hide debug metadata in production.
14. **Close Button** — Match trash icon behavior to X close button behavior.

---

### Cee Form — Computed CSS Reference

All values extracted via CDP `CSS.getComputedStyleForNode`. Font: Inter (body) / Plus Jakarta Sans (headings).

#### Design Tokens (Cee AI Form)

| Token | Value | Usage |
|-------|-------|-------|
| `--brand-green-700` | `rgb(33, 181, 102)` / `#21B566` | Active tab bg, Confirm btn bg, Radio selected border |
| `--brand-green-800` | `rgb(30, 164, 92)` / `#1EA45C` | Confirm btn border, hover state |
| `--brand-green-50` | `rgb(235, 248, 241)` / `#EBF8F1` | Selected radio card background |
| `--light-0` | `rgb(255, 255, 255)` / `#FFFFFF` | Default backgrounds, confirm btn text |
| `--light-50` | `rgb(251, 252, 252)` / `#FBFCFC` | Value input background |
| `--light-100` | `rgb(244, 247, 248)` / `#F4F7F8` | Select/spinbutton background, AND btn bg |
| `--line-600` | `rgb(236, 235, 237)` / `#ECEBED` | Default borders |
| `--dark-500` | `rgb(100, 111, 127)` / `#646F7F` | Add property btn text |
| `--dark-600` | `rgb(0, 0, 0)` | Inactive tab text (computed as black) |
| `--dark-700` | `rgb(65, 72, 82)` / `#414852` | AND btn text |
| `--dark-800` | `rgb(36, 41, 46)` / `#24292E` | Value input text |
| `--dark-900` | `rgb(21, 21, 21)` / `#151515` | Input text, section header text |
| `font-primary` | `"Plus Jakarta Sans", Arial, sans-serif` | Section headers, tabs, add property btn |
| `font-secondary` | `Inter` | Buttons (Confirm, Cancel, AND) |
| `rounded-small` | Tailwind default | Tabs, inputs, selects |
| `rounded-button` | Tailwind default | Action buttons, radio cards |

#### Per-Element Computed CSS

##### 1. Cohort Name Input
```css
/* Tailwind: (no explicit class visible, standard input) */
input[placeholder="Enter cohort name"] {
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  color: rgb(21, 21, 21);           /* --dark-900 */
  background-color: rgb(255, 255, 255); /* --light-0 */
  border: 1px solid rgb(236, 235, 237); /* --line-600 */
  border-radius: /* default */;
  padding: 8px 12px;
  height: 39px;
  width: 802px;
  display: inline-block;
  cursor: text;
}
```

##### 2. Description Input
```css
/* Same as Cohort Name Input */
input[placeholder="Enter cohort description"] {
  /* Identical to cohort name input */
  font: 400 14px/21px Inter;
  color: rgb(21, 21, 21);
  background: rgb(255, 255, 255);
  border: 1px solid rgb(236, 235, 237);
  padding: 8px 12px;
  height: 39px;
  width: 802px;
}
```

##### 3. Section Headers (User Property Segmentation, User Behaviour Segmentation, Visibility)
```css
/* class="text-[15px] font-semibold text-dark-900 mb-3 font-primary flex items-center gap-1.5" */
div.font-semibold {
  font-family: "Plus Jakarta Sans", Arial, sans-serif;
  font-size: 15px;
  font-weight: 600;
  line-height: normal;
  color: rgb(21, 21, 21);           /* --dark-900 */
  display: flex;
  align-items: center;
  gap: 6px;                         /* gap-1.5 */
  margin-bottom: 12px;              /* mb-3 */
  width: 802px;
  height: 17px;
}
```

##### 4. Behavior Tab Buttons — Inactive State
```css
/* class="px-2.5 py-1 text-xs font-medium border rounded-small cursor-pointer font-primary 
   transition-[background-color,color,border-color] duration-150 
   bg-light-0 text-dark-600 border-line-600" */
button.tab-inactive {
  font-family: Inter;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: rgb(0, 0, 0);              /* text-dark-600 */
  background-color: rgb(255, 255, 255); /* bg-light-0 */
  border: 1px solid rgb(236, 235, 237); /* border-line-600 */
  border-radius: /* rounded-small */;
  padding: 4px 10px;
  height: 26px;
  cursor: pointer;
  transition: background-color, color, border-color 150ms;
}
```

##### 5. Behavior Tab Buttons — Active State (Sessions/Events selected)
```css
/* class="... bg-brand-green-700 text-light-0 border-brand-green-700" */
button.tab-active {
  font-family: Inter;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: rgb(255, 255, 255);        /* text-light-0 */
  background-color: rgb(33, 181, 102); /* bg-brand-green-700 */
  border: 1px solid rgb(33, 181, 102); /* border-brand-green-700 */
  padding: 4px 10px;
  height: 26px;
}
```

##### 6. Select / Combobox (performed/didn't perform, at least/equal to, time period)
```css
/* class="py-1 pl-2.5 pr-7 text-sm text-dark-900 bg-light-100 border border-line-600 
   rounded-small font-primary outline-none cursor-pointer appearance-none select-arrow leading-normal" */
select {
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  color: rgb(21, 21, 21);           /* text-dark-900 */
  background-color: rgb(244, 247, 248); /* bg-light-100 */
  border: 1px solid rgb(236, 235, 237); /* border-line-600 */
  padding: 4px 28px 4px 10px;       /* py-1 pl-2.5 pr-7 */
  height: 31px;
  cursor: pointer;
  appearance: none;
  /* Widths vary: performed=125.5px, at least=90px, time period=161px */
}
```

##### 7. Spinbutton (count input)
```css
/* class="w-14 py-1 px-2 text-sm text-center text-dark-900 bg-light-100 
   border border-line-600 rounded-small font-primary outline-none" */
input[type="number"] {
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: rgb(21, 21, 21);
  background-color: rgb(244, 247, 248); /* bg-light-100 */
  border: 1px solid rgb(236, 235, 237);
  padding: 4px 8px;
  height: 20px;
  width: 56px;                       /* w-14 */
  text-align: center;
}
```

##### 8. Value Input (comma-separated, e.g. "iOS")
```css
/* class="flex-1 min-w-[120px] box-border px-2 py-1.5 text-[13px] text-dark-800 
   bg-light-50 border border-line-600 rounded-small font-primary outline-none" */
input.value-input {
  font-family: Inter;
  font-size: 13px;
  font-weight: 400;
  color: rgb(36, 41, 46);           /* text-dark-800 */
  background-color: rgb(251, 252, 252); /* bg-light-50 */
  border: 1px solid rgb(236, 235, 237);
  padding: 6px 8px;
  height: 29.5px;
  width: 164px;
  min-width: 120px;
}
```

##### 9. Confirm Button
```css
/* class="inline-flex items-center justify-center rounded-button font-secondary font-medium 
   cursor-pointer outline-none whitespace-nowrap transition-[background-color,color,border-color] 
   duration-150 bg-brand-green-700 text-light-0 border border-brand-green-800 
   hover:bg-brand-green-800 text-sm" */
button.confirm {
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: rgb(255, 255, 255);        /* text-light-0 */
  background-color: rgb(33, 181, 102); /* bg-brand-green-700 */
  border: 1px solid rgb(30, 164, 92);  /* border-brand-green-800 */
  padding: 9px 14px;
  height: 34px;
  width: 83.49px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color, color, border-color 150ms;
}
```

##### 10. Cancel Button
```css
/* class="... bg-transparent text-black border-[1.5px] border-black hover:bg-white/30 
   text-sm px-3.5 py-[9px]" */
button.cancel {
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: rgb(0, 0, 0);
  background-color: transparent;
  border: 1.5px solid rgb(0, 0, 0);
  padding: 9px 14px;
  height: 34px;
  width: 77.29px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
```

##### 11. AND Connector Button
```css
/* class="py-0.5 px-3.5 text-xs font-semibold border border-line-600 rounded-full 
   cursor-pointer font-secondary transition-[background-color,color,border-color] 
   duration-150 leading-[1.75] bg-light-100 text-dark-700" */
button.and-connector {
  font-family: Inter;
  font-size: 12px;
  font-weight: 600;
  line-height: 21px;                /* leading-[1.75] */
  color: rgb(65, 72, 82);           /* text-dark-700 */
  background-color: rgb(244, 247, 248); /* bg-light-100 */
  border: 1px solid rgb(236, 235, 237); /* border-line-600 */
  border-radius: 9999px;            /* rounded-full */
  padding: 2px 14px;
  height: 27px;
  width: 56.27px;
  cursor: pointer;
}
```

##### 12. + Add Property Filter Button
```css
/* class="inline-flex items-center gap-1 px-2.5 py-1 mt-1 text-xs font-medium 
   text-dark-500 font-primary border border-dashed border-line-600 rounded-small 
   bg-transparent cursor-pointer transition-[color,border-color] duration-150" */
button.add-property {
  font-family: Inter;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: rgb(100, 111, 127);        /* text-dark-500 */
  background-color: transparent;
  border: 1px dashed rgb(236, 235, 237); /* border-dashed border-line-600 */
  padding: 4px 10px;
  height: 26px;
  width: 139.02px;
  margin-top: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;                          /* gap-1 */
  cursor: pointer;
}
```

##### 13. Visibility Parent Container
```css
/* class="flex flex-wrap gap-3" */
div.visibility-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;                         /* gap-3 */
  width: 802px;
  height: 68px;
}
```

##### 14. Visibility Radio Card — Selected (Global)
```css
/* class="flex items-start gap-2.5 px-4 py-3.5 border rounded-button cursor-pointer
   transition-[border-color,background-color] duration-150
   flex-1 border-brand-green-700 bg-brand-green-50" */
label.radio-selected {
  display: flex;
  align-items: flex-start;
  gap: 10px;                         /* gap-2.5 */
  padding: 14px 16px;               /* py-3.5 px-4 */
  border: 1px solid rgb(33, 181, 102); /* border-brand-green-700 #21B566 */
  border-radius: var(--rounded-button);
  background-color: rgb(235, 248, 241); /* bg-brand-green-50 #EBF8F1 */
  cursor: pointer;
  flex: 1;
  transition: border-color 150ms, background-color 150ms;
  width: 361px;
  height: 68px;
}
```

##### 15. Visibility Radio Card — Unselected (Private)
```css
/* class="flex items-start gap-2.5 px-4 py-3.5 border border-line-600 rounded-button
   cursor-pointer transition-[border-color,background-color] duration-150 bg-light-0 flex-1" */
label.radio-unselected {
  display: flex;
  align-items: flex-start;
  gap: 10px;                         /* gap-2.5 */
  padding: 14px 16px;               /* py-3.5 px-4 */
  border: 1px solid rgb(236, 235, 237); /* border-line-600 #ECEBED */
  border-radius: var(--rounded-button);
  background-color: rgb(255, 255, 255); /* bg-light-0 */
  cursor: pointer;
  flex: 1;
  transition: border-color 150ms, background-color 150ms;
  width: 361px;
  height: 68px;
}
```

##### 16. Radio Input Element
```css
/* class="w-4 h-4 accent-brand-green-700 m-0 cursor-pointer mt-0.5 shrink-0" */
input[type="radio"][name="cohort_visibility"] {
  width: 16px;                       /* w-4 */
  height: 16px;                      /* h-4 */
  accent-color: #21B566;            /* accent-brand-green-700 */
  margin: 0;                        /* m-0 */
  margin-top: 2px;                   /* mt-0.5 */
  cursor: pointer;
  flex-shrink: 0;                    /* shrink-0 */
  appearance: auto;
  border-radius: 50%;
}
```

##### 17. Radio Title Text ("Global" / "Private")
```css
/* class="text-sm font-semibold text-dark-900 font-primary" */
div.radio-title {
  font-family: "Plus Jakarta Sans", Arial, sans-serif; /* font-primary */
  font-size: 14px;                   /* text-sm */
  font-weight: 600;                  /* font-semibold */
  line-height: 20px;
  color: rgb(21, 21, 21);           /* text-dark-900 #151515 */
}
```

##### 18. Radio Description Text
```css
/* class="text-xs text-dark-500 font-primary mt-0.5" */
div.radio-description {
  font-family: "Plus Jakarta Sans", Arial, sans-serif; /* font-primary */
  font-size: 12px;                   /* text-xs */
  font-weight: 400;
  line-height: 16px;
  color: rgb(100, 111, 127);        /* text-dark-500 #646F7F */
  margin-top: 2px;                   /* mt-0.5 */
}
```

> **Full HTML structure and state transition details**: See `PRD-visibility-radio.md`

---

### Screenshots Directory

All screenshots saved to: `prd-assets/`

| # | File | Description | Section |
|---|------|-------------|---------|
| 1 | `cee-sidebar-before-click.png` | Cohorts page showing Cee icon location in left sidebar | Access |
| 2 | `cee-popup-opened.png` | Cee popup panel open (non-fullscreen) | Access |
| 3 | `cee-fullscreen.png` | Cee AI in full-screen mode, initial state | Access |
| 4 | `cee-prompt1-signup-no-return.png` | Prompt 1 form: behavior section with AND logic | Prompt 1 |
| 5 | `cee-prompt1-scrolled-up.png` | Prompt 1 form: full view with name, description, debug info | Prompt 1 |
| 6 | `cee-prompt1-top.png` | Prompt 1 form: top section (property + behavior start) | Prompt 1 |
| 7 | `cee-prompt2-ios-sessions-query.png` | Prompt 2: user_agent response (data table, not cohort form) | Prompt 2 |
| 8 | `cee-prompt3-ios-power-users.png` | Prompt 3 form: property (Platform=iOS) + behavior + dropdown open | Prompt 3 |
| 9 | `cee-prompt4-purchase-no-return.png` | Prompt 4 form: Purchase event + AND + no Sessions in 30d | Prompt 4 |


---

## Part 6: Localization & Data Rules

### Classification Rules

1. **UI labels** -> Use user's language (i18n), sourced from translation file
2. **Static lists** (operators, tab names, frequency options) -> Also translate via i18n
3. **DB data** (property names, event names, user content) -> Display as API returns, never modify
4. **Class names, data-test-ids** -> Keep as-is, never translate

### Data Classification Table

| Element | Category | Rationale |
|---------|----------|-----------|
| Drawer title "Create New Cohort" | `[STATIC/i18n]` | UI label |
| Section headers ("Users with", "Users who") | `[STATIC/i18n]` | UI labels |
| Property tab names (All Properties, User, Custom, Campaign, Push Notification) | `[STATIC/i18n]` | UI labels |
| "Search in Properties" placeholder | `[STATIC/i18n]` | UI label |
| Property names (ID, Age, Country, etc.) | `[DYNAMIC/DB]` | From server/user data model |
| Custom property names (Industry, etc.) | `[DYNAMIC/DB]` | User-defined |
| Operator labels (is, is not, contains, etc.) | `[STATIC/i18n]` | UI labels for operators |
| Operator keys (internal values) | `[STATIC/FIXED]` | Technical identifiers |
| "is set" value options (yes/no) | `[STATIC/FIXED]` | Fixed boolean |
| "in the last" time units (days, weeks, months, years) | `[STATIC/i18n]` | UI labels |
| Behavior type (performed, didn't perform) | `[STATIC/i18n]` | UI labels |
| Event/View names (Sessions, etc.) | `[DYNAMIC/DB]` | From Countly events |
| Frequency options (at least, at most, exactly) | `[STATIC/i18n]` | UI labels |
| Time range options (All time, in the last) | `[STATIC/i18n]` | UI labels |
| Visibility labels (Global, Private) | `[STATIC/i18n]` | UI labels |
| Button labels (Cancel, + Create New Cohort) | `[STATIC/i18n]` | UI labels |
| Warning text | `[STATIC/i18n]` | UI label |
| data-test-id attributes | `[STATIC/FIXED]` | Must not change, used for testing |
| CSS class names | `[STATIC/FIXED]` | Must not change |

### Dropdown-Specific Classification

| Dropdown | Values | Category |
|----------|--------|----------|
| Property Tab Selector | All Properties, User, Custom, Campaign, Push Notification | `[STATIC/i18n]` |
| Property List Items | ID, Age, Country, City, Platform, Device, etc. | `[DYNAMIC/DB]` |
| String Operators | is, is not, contains, doesn't contain, is set | `[STATIC/i18n]` |
| Numeric Operators | =, !=, >, <, >=, <=, is between, is set | `[STATIC/i18n]` |
| Date Operators | in the last, is between, before, since, is set | `[STATIC/i18n]` |
| "is set" Values | yes, no | `[STATIC/FIXED]` |
| Behavior Action Toggle | performed, didn't perform | `[STATIC/i18n]` |
| Event Selector | Sessions, [Views], [Events] | `[DYNAMIC/DB]` |
| Frequency Options | at least N time(s), at most N time(s), exactly N time(s) | `[STATIC/i18n]` |
| Time Range Mode | All time, in the last, in between, before, since | `[STATIC/i18n]` |
| Time Unit | days, weeks, months, years | `[STATIC/i18n]` |
| Visibility | Global, Private | `[STATIC/i18n]` |
| AND/OR Conjunction | AND, OR | `[STATIC/i18n]` |


---

## Part 7: Screenshot Index

| File | Description | Part | State Captured |
|------|-------------|------|----------------|
| `prd-assets/cee-01-original-empty.png` | Original drawer empty state (Cee comparison baseline) | Part 5 | cee-01-original-empty |
| `prd-assets/cee-01b-property-dropdown.png` | Property dropdown open (Cee comparison) | Part 5 | cee-01b-property-dropdown |
| `prd-assets/cee-01c-after-name-click.png` | After clicking Name property (Cee comparison) | Part 5 | cee-01c-after-name-click |
| `prd-assets/cee-01d-check.png` | Verification checkpoint (Cee comparison) | Part 5 | cee-01d-check |
| `prd-assets/cee-01e-after-coord-click.png` | After clicking coordinate (Cee comparison) | Part 5 | cee-01e-after-coord-click |
| `prd-assets/cee-01f-check2.png` | Verification checkpoint 2 (Cee comparison) | Part 5 | cee-01f-check2 |
| `prd-assets/cee-01g-name-selected.png` | Name property selected state (Cee comparison) | Part 5 | cee-01g-name-selected |
| `prd-assets/cee-01h-operator-dropdown.png` | Operator dropdown open (Cee comparison) | Part 5 | cee-01h-operator-dropdown |
| `prd-assets/cee-01i-after-is-click.png` | After selecting "is" operator (Cee comparison) | Part 5 | cee-01i-after-is-click |
| `prd-assets/cee-01j-check.png` | Verification checkpoint (Cee comparison) | Part 5 | cee-01j-check |
| `prd-assets/cee-01k-check.png` | Verification checkpoint (Cee comparison) | Part 5 | cee-01k-check |
| `prd-assets/cee-02-full-page.png` | Full page view with Cee chat | Part 5 | cee-02-full-page |
| `prd-assets/cee-03-after-cee-click.png` | After clicking Cee button | Part 5 | cee-03-after-cee-click |
| `prd-assets/cee-04-after-cee-click2.png` | After second Cee button click | Part 5 | cee-04-after-cee-click2 |
| `prd-assets/cee-04-cee-chat-open.png` | Cee AI chat panel open | Part 5 | cee-04-cee-chat-open |
| `prd-assets/cee-04b-cohorts-page.png` | Cohorts page with Cee visible | Part 5 | cee-04b-cohorts-page |
| `prd-assets/cee-04c-check.png` | Verification checkpoint (Cee) | Part 5 | cee-04c-check |
| `prd-assets/cee-04d-check.png` | Verification checkpoint (Cee) | Part 5 | cee-04d-check |
| `prd-assets/cee-05-cee-page.png` | Cee AI full page view | Part 5 | cee-05-cee-page |
| `prd-assets/cee-06-after-dblclick.png` | After double-click interaction (Cee) | Part 5 | cee-06-after-dblclick |
| `prd-assets/cee-07-click462.png` | Click interaction (Cee) | Part 5 | cee-07-click462 |
| `prd-assets/cee-08-guide-click.png` | Guide click interaction (Cee) | Part 5 | cee-08-guide-click |
| `prd-assets/cee-09-guide-scrolled.png` | Guide scrolled state (Cee) | Part 5 | cee-09-guide-scrolled |
| `prd-assets/cee-10-after-close.png` | After closing Cee panel | Part 5 | cee-10-after-close |
| `prd-assets/cee-11-original-drawer-final.png` | Original drawer final state (Cee comparison) | Part 5 | cee-11-original-drawer-final |
| `prd-assets/cee-debug.png` | Debug screenshot (Cee) | Part 5 | cee-debug |
| `prd-assets/cee-debug2.png` | Debug screenshot 2 (Cee) | Part 5 | cee-debug2 |
| `prd-assets/cee-debug3.png` | Debug screenshot 3 (Cee) | Part 5 | cee-debug3 |
| `prd-assets/cee-debug4.png` | Debug screenshot 4 (Cee) | Part 5 | cee-debug4 |
| `prd-assets/cee-debug5.png` | Debug screenshot 5 (Cee) | Part 5 | cee-debug5 |
| `prd-assets/cee-hover-450.png` | Hover state at element 450 (Cee) | Part 5 | cee-hover-450 |
| `prd-assets/cee-hover-453.png` | Hover state at element 453 (Cee) | Part 5 | cee-hover-453 |
| `prd-assets/cohort-01-cohorts-page.png` | Cohorts home page with existing cohorts list | Part 3 | cohort-01-cohorts-page |
| `prd-assets/cohort-02-drawer-empty.png` | Empty drawer after opening (initial state) | Part 3 | cohort-02-drawer-empty |
| `prd-assets/cohort-03-drawer-closed.png` | Drawer closed / closing state | Part 3 | cohort-03-drawer-closed |
| `prd-assets/cohort-04-name-focused.png` | Cohort name input focused | Part 3 | cohort-04-name-focused |
| `prd-assets/cohort-05-name-filled.png` | Cohort name input with text entered | Part 3 | cohort-05-name-filled |
| `prd-assets/cohort-06-property-dropdown-open.png` | Property selection dropdown open with tabs | Part 3 | cohort-06-property-dropdown-open |
| `prd-assets/cohort-07-property-name-selected.png` | Property "Name" selected in dropdown | Part 3 | cohort-07-property-name-selected |
| `prd-assets/cohort-08-string-operators.png` | String operators dropdown open | Part 3 | cohort-08-string-operators |
| `prd-assets/cohort-09-operator-is-selected.png` | "is" operator selected for string property | Part 3 | cohort-09-operator-is-selected |
| `prd-assets/cohort-10-operator-is-set.png` | "is set" operator selected showing yes/no dropdown | Part 3 | cohort-10-operator-is-set |
| `prd-assets/cohort-11-numeric-property.png` | Numeric property (Session count) selected | Part 3 | cohort-11-numeric-property |
| `prd-assets/cohort-12-numeric-operators.png` | Numeric operators dropdown open | Part 3 | cohort-12-numeric-operators |
| `prd-assets/cohort-13-is-between.png` | "is between" operator with dual number inputs | Part 3 | cohort-13-is-between |
| `prd-assets/cohort-14-two-conditions.png` | Two property conditions with AND conjunction | Part 3 | cohort-14-two-conditions |
| `prd-assets/cohort-15-or-selected.png` | OR conjunction selected between conditions | Part 3 | cohort-15-or-selected |
| `prd-assets/cohort-16-and-selected.png` | AND conjunction selected between conditions | Part 3 | cohort-16-and-selected |
| `prd-assets/cohort-17-condition-removed.png` | After removing a condition row | Part 3 | cohort-17-condition-removed |
| `prd-assets/cohort-18-behavior-added.png` | Behavior condition section added | Part 3 | cohort-18-behavior-added |
| `prd-assets/cohort-19-behavior-type-dropdown.png` | Behavior type dropdown (performed/didn't perform) | Part 3 | cohort-19-behavior-type-dropdown |
| `prd-assets/cohort-22-frequency-options.png` | Frequency options dropdown (at least/at most/exactly) | Part 3 | cohort-22-frequency-options |
| `prd-assets/cohort-23-time-range.png` | Time range picker with calendar and presets | Part 3 | cohort-23-time-range |
| `prd-assets/cohort-24-visibility-private.png` | Visibility set to Private | Part 3 | cohort-24-visibility-private |
| `prd-assets/cohort-25-visibility-global.png` | Visibility set to Global | Part 3 | cohort-25-visibility-global |
| `prd-assets/cohort-27-footer-enabled.png` | Footer with enabled Create New Cohort button | Part 3 | cohort-27-footer-enabled |
| `prd-assets/cee-sidebar-before-click.png` | Cohorts page showing Cee icon location in left sidebar | Part 5 | cee-sidebar-before-click |
| `prd-assets/cee-popup-opened.png` | Cee popup panel open (non-fullscreen) | Part 5 | cee-popup-opened |
| `prd-assets/cee-fullscreen.png` | Cee AI in full-screen mode, initial state | Part 5 | cee-fullscreen |
| `prd-assets/cee-prompt1-signup-no-return.png` | Prompt 1: behavior section with AND logic (signup + no sessions) | Part 5 | cee-prompt1-signup-no-return |
| `prd-assets/cee-prompt1-scrolled-up.png` | Prompt 1: full view with name, description, debug info | Part 5 | cee-prompt1-scrolled-up |
| `prd-assets/cee-prompt1-top.png` | Prompt 1: top section (property + behavior start) | Part 5 | cee-prompt1-top |
| `prd-assets/cee-prompt2-ios-sessions-query.png` | Prompt 2: user_agent response (data table, not cohort form) | Part 5 | cee-prompt2-ios-sessions-query |
| `prd-assets/cee-prompt3-ios-power-users.png` | Prompt 3: property (Platform=iOS) + behavior + dropdown open | Part 5 | cee-prompt3-ios-power-users |
| `prd-assets/cee-prompt4-purchase-no-return.png` | Prompt 4: Purchase event + AND + no Sessions in 30d | Part 5 | cee-prompt4-purchase-no-return |
