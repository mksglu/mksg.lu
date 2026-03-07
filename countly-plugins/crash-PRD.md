# Countly Crashes Plugin - Product Requirements Document

**Plugin:** Crashes (Overview)
**Type:** Analytics Dashboard Page
**URL:** `http://mert.count.ly/dashboard#/6908ab02fece9ef06eca7285/crashes`
**Purpose:** Crash analytics overview with crash group listings, occurrence counts, affected users, and resolution status tracking

---

## 1. Scope & Context

The Crashes plugin provides analytics teams with comprehensive crash monitoring and resolution tracking. The page displays application crashes organized by group, with filtering, sorting, and real-time refresh capabilities. Users can analyze crash patterns, identify affected users, and track resolution progress.

**Key Objectives:**
- Display crash groups with metrics (occurrences, affected users)
- Enable filtering by crash properties (status, device, resolution, etc.)
- Provide real-time auto-refresh capability
- Support crash statistics view as alternate perspective
- Track crash resolution status and fatality levels

---

## 2. Page Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER SECTION (white-bg)                                      │
│  ┌─────────────────┬─────────────────────────────────────┐     │
│  │ "Crash Groups"  │  Auto-refresh Toggle | Help Center  │     │
│  │ [Tooltip]       │  Status: Enabled/Disabled           │     │
│  └─────────────────┴─────────────────────────────────────┘     │
├─────────────────────────────────────────────────────────────────┤
│  FILTER CONTROLS                                                │
│  [Filter Icon] [New Filter Button] [Property Dropdowns]        │
├─────────────────────────────────────────────────────────────────┤
│  TAB NAVIGATION (Button Style)                                  │
│  [Crash Groups] [Crash Statistics]                             │
├─────────────────────────────────────────────────────────────────┤
│  CONTENT AREA                                                   │
│  [Crash Groups List]                                           │
│  (Rendered when tab is active)                                 │
├─────────────────────────────────────────────────────────────────┤
│  NOTIFICATION AREA (persistent-notifications)                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. HTML Structure & Class Names

### Root Container
```
c="routename-crashes"
  └─ c="crashes-overview"
     └─ c="cly-vue-tabs"
```

### Header Section
```
c="cly-vue-header white-bg"
  └─ c="bu-level bu-is-mobile"
     ├─ c="bu-level-left bu-is-flex-shrink-1"
     │  └─ c="bu-level-item"
     │     └─ <h2> Crash Groups
     └─ c="bu-level-right"
        └─ c="cly-vue-auto-refresh-toggle"
```

### Tab Navigation
```
c="cly-vue-tabs"
  └─ c="el-tabs el-tabs--top el-tabs--button"
     ├─ c="el-tabs__header is-top"
     │  └─ c="el-tabs__nav-wrap is-top"
     │     └─ c="el-tabs__nav is-top"
     │        ├─ c="el-tabs__item is-top is-active"
     │        │  └─ <span t="tab-crash-groups-label">Crash Groups</span>
     │        └─ c="el-tabs__item is-top"
     │           └─ <span t="tab-crash-statistics-label">Crash Statistics</span>
     └─ c="el-tabs__content"
        └─ c="el-tab-pane"
```

### Main Content Area
```
c="cly-vue-main bu-columns bu-is-gapless bu-is-centered"
  └─ c="bu-column bu-is-full"
     ├─ c="persistent-notifications" (empty by default)
     └─ Filter & Content Controls
```

### Filter Section
```
[Filter Icon] c="fas fa-filter color-cool-gray-40 icon-size-4 bu-pr-2"
[New Filter Button] c="el-button is-wireframe el-button--default el-button--small"
  └─ <i c="el-icon-circle-plus"></i>
  └─ <span>New filter</span>

Dropdown Structure:
  c="cly-vue-dropdown el-select cly-vue-select-x"
    └─ c="cly-input-dropdown-trigger el-input el-input--suffix is-arrow"
       └─ <input c="el-input__inner" t="cly-qb-segmentation-test-id-property-select-property-dropdown-0" ph="Select Property">
    └─ c="el-select-dropdown el-popper cly-vue-dropdown__pop"
       └─ Property List (scrollable)
```

---

## 4. Design Tokens

### Color Palette
- **white-bg:** White background for header sections
- **color-cool-gray-40:** Filter icon color (neutral gray)

### Typography
- **text-medium:** Medium font weight for list items
- **font-weight-bold:** Bold labels in listbox items

### Spacing (Bulma utilities)
- **bu-mr-2:** Margin right (2 units)
- **bu-ml-1, bu-ml-2:** Margin left (1-2 units)
- **bu-p-1:** Padding (1 unit)

### Layout System (Bulma)
- **bu-level:** Flex row with alignment (space-between by default)
- **bu-level-left, bu-level-right:** Left/right flex children
- **bu-columns, bu-is-gapless:** Grid system without gaps
- **bu-is-mobile:** Responsive breakpoint
- **bu-is-flex-shrink-1:** Prevent flex shrinking
- **bu-is-full:** Full width column
- **bu-is-centered:** Center column content

### Component Classes
- **el-tabs, el-tabs--top, el-tabs--button:** Tabbed interface
- **el-button, el-button--default, el-button--small:** Button component
- **el-input, el-input__inner:** Input field
- **el-switch, is-checked:** Toggle switch
- **el-loading-mask, el-loading-spinner:** Loading state
- **el-icon-*:** Icon libraries (el-icon-*, ion-*, fas fa-*)
- **cly-vue-*:** Custom Countly Vue components
- **has-tooltip:** Tooltip trigger class

---

## 5. Filters & Controls

### Auto-Refresh Toggle
```
c="cly-vue-auto-refresh-toggle"
  ├─ Status Display
  │  ├─ t="crash-groups-auto-refresh-toggle-is-label" → "Auto-refresh is"
  │  ├─ t="crash-groups-auto-refresh-toggle-enabled-label" → "Enabled"/"Disabled"
  │  └─ t="crash-groups-auto-refresh-toggle-tooltip"
  ├─ Toggle Button (visible when enabled)
  │  └─ <button c="el-button el-button--default" t="crash-groups-auto-refresh-toggle-button">
  │     └─ <i c="fa fa-stop-circle"></i> "Stop Auto-refresh"
  └─ Switch (visible when disabled)
     ├─ <input c="el-switch__input" t="crash-groups-auto-refresh-toggle-el-switch-input" tp="checkbox">
     ├─ <span c="el-switch__core" t="crash-groups-auto-refresh-toggle-el-switch-core">
     └─ t="crash-groups-auto-refresh-toggle-disabled-label" → "Enable Auto-refresh"
```

### New Filter Button
- **Label:** "New filter"
- **Type:** Wireframe style button with small size
- **Icon:** Circle plus icon (el-icon-circle-plus)
- **Action:** Opens filter property selector dropdown

### Property Filter Dropdown
#### Available Properties (Filterable):
1. **Status Properties**
   - Fatality
   - Visibility
   - Viewed
   - Reoccurred
   - Resolved
   - Resolving

2. **Crash Data**
   - Crash (crash name/type)
   - Affected Users (count)
   - Occurrences (total count)

3. **Device Properties**
   - Device (device model/type)
   - Resolution (screen resolution)

4. **Temporal**
   - First Seen On (date/time)
   - Last Seen (implied)

#### Dropdown Structure
```
t="cly-qb-segmentation-test-id-property-select-property-dropdown-0-dropdown-el-select"

Sub-components:
  ├─ Search Input
  │  └─ t="cly-qb-segmentation-test-id-property-select-property-dropdown-0-search-box"
  │     ph="Search in Properties"
  │     + Search Icon (t="...search-icon")
  │
  ├─ Tabs (Property Categories)
  │  ├─ t="...el-tab-all-properties" → "All Properties"
  │  ├─ t="...el-tab-main" → "Main"
  │  └─ t="...el-tab-detail" → "Detail"
  │
  └─ Listbox (Scrollable)
     c="cly-vue-listbox scroll-keep-show cly-vue-listbox--has-margin"
       ├─ c="cly-vue-listbox__items-wrapper"
       │  └─ [Property Item List]
       │
       └─ Property Items
          ├─ c="cly-vue-listbox__item"
          │  └─ c="cly-vue-listbox__item-content"
          │     ├─ c="cly-vue-listbox__item-prefix"
          │     ├─ c="cly-vue-listbox__item-label has-tooltip"
          │     └─ [Right padding for state]
```

#### Property Item Structure
```
c="text-medium font-weight-bold cly-vue-listbox__item"
  └─ c="bu-level"
     ├─ c="bu-level-left"
     │  ├─ c="cly-vue-listbox__item-prefix bu-mr-1"
     │  └─ c="cly-vue-listbox__item-label has-tooltip"
     │     └─ Property Name
     └─ c="bu-level-right"
        └─ [Selection State Indicator]
```

---

## 6. Crash List Table

### Expected Columns (from context)
Based on available filter properties, the crash list likely includes:
1. **Crash Name/Type** - crash identifier
2. **Occurrences** - number of crash incidents
3. **Affected Users** - unique user count
4. **Status** - Resolved/Resolving/Open/Fatality
5. **Device** - device model
6. **First Seen** - initial occurrence date
7. **Last Seen** - most recent occurrence date
8. **Visibility** - public/private status

### Table Structure (Expected)
```
<table c="cly-vue-table">
  <thead>
    <tr>
      <th>Crash</th>
      <th>Occurrences</th>
      <th>Affected Users</th>
      <th>Status</th>
      <th>Device</th>
      <th>First Seen</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr t="crash-row-{id}">
      <td>{crash_name}</td>
      <td>{occurrence_count}</td>
      <td>{user_count}</td>
      <td c="status-{status}">{status_label}</td>
      <td>{device_type}</td>
      <td>{date}</td>
      <td>
        <button>View Details</button>
        <button>Mark Resolved</button>
      </td>
    </tr>
  </tbody>
</table>
```

---

## 7. Element UI Components

### Tab Component
```
Component: el-tabs
Variants: el-tabs--top, el-tabs--button (not card/border)
Props:
  - active-tab: "crash-groups" | "crash-statistics"
  - Tab Labels: string (localized)
DOM:
  - Header with nav-wrap, nav-scroll, nav
  - Tab items with is-active state
  - Content area with tab-pane
  - Active bar indicator (el-tabs__active-bar)
```

### Button Component
```
Component: el-button
Variants:
  1. Primary (default)
     c="el-button el-button--default"
     [Stop Auto-refresh button]

  2. Wireframe/Secondary (small)
     c="el-button is-wireframe el-button--default el-button--small"
     [New Filter button]

Structure:
  <button c="el-button [variants]" tp="button">
    <i c="icon-class"></i>
    <span>Label</span>
  </button>
```

### Dropdown Component
```
Component: el-select / cly-vue-dropdown
Classes: el-select, cly-vue-dropdown, cly-vue-select-x
Variants: is-arrow (shows dropdown indicator)
Structure:
  <div c="cly-vue-dropdown el-select cly-vue-select-x">
    <div c="cly-input-dropdown-trigger el-input el-input--suffix is-arrow">
      <input c="el-input__inner">
    </div>
    <div c="el-select-dropdown el-popper cly-vue-dropdown__pop">
      [Dropdown Content]
    </div>
  </div>
```

### Switch Component
```
Component: el-switch
States:
  - is-checked: enabled state
  - (default): disabled state
Structure:
  <div c="el-switch [state]">
    <input c="el-switch__input" tp="checkbox">
    <span c="el-switch__core">
  </div>
```

### Listbox Component
```
Component: cly-vue-listbox
Classes:
  - scroll-keep-show (keep scrollbar visible)
  - cly-vue-listbox--has-margin
  - cly-vue-listbox--has-default-skin
Structure:
  <div c="cly-vue-listbox [variants]">
    <div c="__vuescroll vBarVisible hBarVisible">
      <div c="__panel __hidebar">
        <div c="__view">
          <div c="cly-vue-listbox__items-wrapper">
            [List Items]
          </div>
        </div>
      </div>
    </div>
  </div>
```

### Loading State
```
<div c="el-loading-mask">
  <div c="el-loading-spinner">
    <i c="el-icon-loading"></i>
    <p c="el-loading-text">Loading...</p>
  </div>
</div>
```

### Tooltip
```
Trigger: c="has-tooltip"
Content: HTML title attribute or data-tooltip
Icon: c="ion-help-circled has-tooltip"
```

### Help Dialog
```
Component: guide-dialog-wrapper
Structure:
  <div c="guide-dialog-wrapper">
    <i c="cly-vue-tooltip-icon ion ion-help-circled has-tooltip">
    <div c="el-dialog__wrapper">
      <div c="el-dialog guide-dialog">
        <div c="el-dialog__header">
          [Dialog Title]
          <div c="close-icon">
            <img c="bu-p-1">
        </div>
        <div c="el-dialog__footer">
          [Feedback Link]
          [Help Center Link]
        </div>
      </div>
    </div>
  </div>
```

---

## 8. Implementation Notes

### Data-Test-ID Conventions
- Format: `[feature]-test-id-[component]-[context]-[variation]`
- Examples:
  - `t="tab-crash-groups-label"` - Crash Groups tab
  - `t="tab-crash-statistics-label"` - Statistics tab
  - `t="crash-groups-auto-refresh-toggle-button"` - Stop refresh button
  - `t="cly-qb-segmentation-test-id-property-select-property-dropdown-0"` - Property selector input

### Icon Libraries
- **Font Awesome:** `fa fa-*` (fa-stop-circle, fa-filter)
- **Ionicons:** `ion ion-*` (ion-help-circled, ion-arrow-up-b, ion-android-open)
- **Element UI:** `el-icon-*` (el-icon-loading, el-icon-circle-plus, el-icon-search)

### State Management
- **Auto-refresh state:** Toggle between "Enabled" and "Disabled"
- **Tab state:** Single active tab per view
- **Filter state:** Multiple filters can be applied (query builder)
- **Loading state:** Show spinner when fetching crash data

### Responsive Behavior
- **Mobile:** `bu-is-mobile` classes adjust layout for smaller screens
- **Flex Shrinking:** `bu-is-flex-shrink-1` prevents header overflow
- **Columns:** `bu-is-gapless` removes grid gaps for compact layout

### Accessibility
- All interactive elements have `t="..."` (data-test-id) for testing
- Tooltip icons use `has-tooltip` class + title attribute
- Labels associated with form inputs via semantic HTML
- Help icon links to Help Center (a.link with icon)

### Component Dependencies
- **Vue Framework:** Component lifecycle (mounted, updated)
- **Element UI Library:** Tab, Button, Input, Select, Switch, Dialog
- **Bulma CSS:** Layout utilities (columns, levels, flexbox)
- **Query Builder Pattern:** `cly-qb-*` classes indicate filtering logic
- **Auto-refresh Timer:** Likely 5-10 second intervals (configurable)

### Future Enhancements
- Add crash group sorting options
- Implement bulk actions (resolve multiple crashes)
- Add export functionality (CSV/PDF)
- Real-time notification badges for new crashes
- Crash pattern analysis and grouping suggestions
