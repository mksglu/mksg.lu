# PRD: Countly Performance Monitoring (APM) Plugin

**Plugin Name:** Performance Monitoring / APM
**Type:** Analytics Dashboard Page
**URL:** `http://mert.count.ly/dashboard#/6908ab02fece9ef06eca7285/performance-monitoring`
**Audience:** Application Performance Monitoring Users
**Primary Function:** Display network request timing, response times, and performance metrics with issue detection and tracking.

---

## 1. Scope & Context

### Overview
The Performance Monitoring plugin provides application performance monitoring (APM) capabilities within the Countly dashboard. It tracks and visualizes performance metrics related to network requests, device performance, and application responsiveness. The page helps teams identify performance bottlenecks and slow transactions.

### Key Features
- Multi-tab interface for different performance aspects (Overview, Device, Network)
- Real Issues detection and display with performance thresholds
- Data export functionality (CSV, JSON, XLSX)
- Date range filtering for historical analysis
- Issue management drawer for editing and tracking
- Performance metrics aggregation and visualization

### Target Users
- Application developers
- Performance engineers
- DevOps teams
- Product managers tracking application health

---

## 2. Page Layout

### Layout Structure
The page uses a hierarchical, column-based layout with three main zones:

1. **Header Zone** - Title, help dialog, and navigation
2. **Tab Navigation** - Three primary tabs for different data views
3. **Main Content Area** - Full-width column containing both sections

### Container Structure
```
routename-performance-monitoring
├── cly-vue-tabs (Tab Navigation)
│   ├── cly-vue-tabs__primary-tab-list (Tab bar)
│   │   ├── Overview (default/active)
│   │   ├── Device
│   │   └── Network
│   └── cly-vue-tab (Tab Content)
│
└── cly-vue-main (Main Content)
    └── bu-column (Full width)
        ├── persistent-notifications
        ├── Recent Issues Section
        │   ├── Header with tooltip
        │   ├── cly-vue-eldatatable (Data table)
        │   └── cly-vue-drawer (Edit issue modal)
        └── Performance Metrics Section
            └── Date range selector
```

### Responsive Behavior
- Uses Bulma CSS framework (`bu-*` classes) for responsive design
- Mobile-aware layout with `bu-is-mobile` flag
- Flexbox layout system for responsive alignment
- Tablet/desktop optimized for full-width column display

---

## 3. HTML Structure & Class Names

### Root Container
```
c="routename-performance-monitoring"
```
Component wrapper identifying the APM plugin page.

### Tab Navigation Component
```
c="cly-vue-tabs"
c="cly-vue-tabs__primary-tab-list"
c="white-bg" — White background styling
c="cly-vue-tabs__tab cly-vue-tabs__tab--default"
c="cly-vue-tabs__tab--primary cly-vue-tabs__tab--primary-active"
```

### Header Section
```
c="cly-vue-header white-bg bu-pt-2"
c="bu-level bu-is-mobile" — Flexbox horizontal layout
c="bu-level-left bu-is-flex-shrink-1"
c="bu-level-right"
```

### Main Content Container
```
c="cly-vue-main bu-columns bu-is-gapless bu-is-centered"
c="bu-column bu-is-full" — Full-width column wrapper
c="bu-mb-4 bu-is-flex bu-is-flex-direction-column" — Margin bottom, flex column
```

### Data Table Classes
```
c="cly-vue-eldatatable" — Core table component
c="cly-vue-apm__recent-issues-table" — APM-specific table variant
c="cly-vue-eldatatable__header cly-vue-eldatatable__header--white"
c="el-table el-table--fit el-table--has-options"
c="el-table__header-wrapper"
c="el-table__body-wrapper is-scrolling-none"
c="el-table__fixed-right" — Right-aligned sticky column
```

### Drawer Modal Component
```
c="cly-vue-drawer"
c="cly-vue-drawer--half-screen" — Half-screen overlay size
c="cly-vue-drawer--half-screen-6" — Grid-based sizing
c="cly-vue-drawer__header"
c="cly-vue-drawer__steps-wrapper"
c="cly-vue-drawer__body-container"
c="cly-vue-drawer__footer"
```

### Dialog/Help Component
```
c="guide-dialog-wrapper"
c="el-dialog guide-dialog"
c="el-dialog__header"
c="el-dialog__footer"
```

### Spacing & Utility Classes
```
bu-mb-4 — Margin bottom (1.5rem)
bu-mt-4 — Margin top
bu-mx-4 — Margin left/right
bu-pt-2 — Padding top
bu-pb-5 — Padding bottom
bu-mr-2 — Margin right
bu-mr-1 — Small margin right
bu-is-flex — Flexbox display
bu-is-flex-direction-column — Column direction
bu-is-justify-content-space-between — Space-between alignment
bu-is-justify-content-flex-end — Right alignment
bu-is-align-items-center — Vertical center alignment
bu-is-gapless — Remove gap between columns
bu-is-centered — Center content
```

---

## 4. Design Tokens

### Color Palette
```
white-bg — White background (used for headers, tabs)
color-cool-gray-40 — Secondary text color (metric descriptions)
color-cool-gray-100 — Label text color (form field labels)
```

### Icon System
```
ion-help-circled — Help/info indicator (ionicons)
ion-android-arrow-forward — Forward navigation arrow
cly-icon-download — Download export icon
cly-icon-btn — Icon button styling
el-input__icon — Input field icon styling
el-input__prefix — Prefix icon container
el-input__suffix — Suffix icon container
ion-arrow-up-b — Dropdown arrow (Element UI)
ion-ios-close-empty — Close icon
```

### Typography
```
h2 c="bu-mr-2" — Main page title
h3 c="bu-mr-1" — Section headings
text-medium — Medium text weight
text-small — Reduced font size
color-cool-gray-40 — Secondary text styling
font-weight-bold — Bold section headers
```

### Button Styles
```
el-button el-button--default el-button--small — Export dropdown trigger
el-button el-button--success el-button--medium — Export action button
el-button el-button--secondary el-button--small — Cancel button
el-button el-button--success el-button--small — Save button
```

### Input Styles
```
el-input el-input--small — Small input fields
el-input__inner — Input text container
el-input__inner--auto-resize — Auto-sizing input
is-adaptive is-arrow — Adaptive dropdown styling
el-input--prefix el-input--suffix — Icon container variants
```

---

## 5. Filters & Controls

### Date Range Picker
**Test ID:** `cly-dropdown-default-test-id-dropdown-el-select`
**Type:** Custom dropdown with date range input
**Classes:** `cly-input-dropdown-trigger`, `el-input--small`, `el-input--prefix`, `el-input--suffix`
**Icon:** `cly-icon-date` (prefix), `ion-arrow-up-b` (suffix)
**Placeholder:** "Select"
**Tooltip:** Enabled (`has-tooltip` class)
**Current Value:** "Jan 29, 2026 - Feb 27, 2026"
**Display Format:** Month DD, YYYY - Month DD, YYYY

**Components:**
- `cly-vue-daterp` — Date range picker component
- `cly-vue-daterp__shortcuts-col` — Quick select shortcuts
- `cly-vue-daterp__shortcut--custom` — Custom range option

### Export Control
**Button Test ID:** `cly-datatable-n-test-id-export-as-button`
**Type:** Dropdown menu button
**Icon:** Download icon (`cly-icon-download`)
**Classes:** `el-button`, `el-button--default`, `el-button--small`

**Export Formats (Radio Select):**
- `.CSV` (default selected) — `cly-datatable-n-test-id-export-as-pop-up-csv-button`
- `.JSON` — `cly-datatable-n-test-id-export-as-pop-up-json-button`
- `.XLSX` — `cly-datatable-n-test-id-export-as-pop-up-xlsx-button`

**Export UI Fields:**
- **Format Label:** "Export as" (test-id: `cly-datatable-n-test-id-export-as-pop-up-label`)
- **File Name Input:** (test-id: `cly-datatable-n-test-id-export-as-pop-up-file-name-input`)
  - Type: `text`
  - Placeholder: (implied file name)
- **File Name Label:** "File name" (test-id: `cly-datatable-n-test-id-export-as-pop-up-file-name-label`)
- **Export Button:** Primary action (test-id: `cly-datatable-n-test-id-export-as-pop-up-export-button`)
  - Class: `el-button--success el-button--medium`

### Search Filter
**Test ID:** `cly-datatable-n-test-id-datatable-search-input`
**Type:** `text` input
**Classes:** `el-input__inner`, `el-input--small`, `el-input--prefix`
**Placeholder:** "Search"
**Icon:** `ion-ios-search-strong` (search magnifying glass)
**Location:** Right side of data table header

---

## 6. Performance Metrics

### Recent Issues Section

#### Section Header
- **Title:** "Recent Issues" (h3)
- **Tooltip Icon:** `ion-help-circled` (info icon, clickable)
- **Navigation Link:** "See All Issues" with arrow `ion-android-arrow-forward`

#### Table Structure
**Component Class:** `cly-vue-apm__recent-issues-table`
**Element Type:** `el-table` (Element UI data table)

**Columns:**
1. **Issue** (clickable, sortable)
   - Test ID: `cly-datatable-n-test-id-label-issue`
   - Column ID: `el-table_66_column_400`
   - Class: `el-table-column--clickable`
   - Content: URL or metric name (e.g., `https://www.google.ru/search?q=product+analytics`, `app_start`)

2. **Details**
   - Test ID: `cly-datatable-n-test-id-label-details`
   - Column ID: `el-table_66_column_401`
   - Content: Issue type + description
   - Sub-text styling: `text-small color-cool-gray-40`

3. **Options** (hidden, right-aligned)
   - Column ID: `el-table_66_column_402`
   - Class: `el-table-column--options is-hidden`
   - Location: `el-table__fixed-right`

#### Sample Data Rows
```
1. Issue: https://www.google.ru/search?q=product+analytics
   Detail: Slow Response Time
   Description: 100% of requests took over 2 seconds

2. Issue: app_start
   Detail: Slow app_start
   Description: 72% of samples were over 2 seconds

3. Issue: http://stackoverflow.com/questions?search=what+is+mobile+analytics
   Detail: Slow Response Time
   Description: 60% of requests took over 2 seconds
```

#### Row Styling
- Test ID: `datatable-test-id` (per row)
- Class: `el-table__row`
- Clickable cells link to issue details
- Text overflow: `has-ellipsis` (truncated with ellipsis)

#### Table Features
- **Fixed Right Column:** Sticky options column on right scroll
- **Loading State:** `el-loading-mask` with spinner
- **Column Resize:** `el-table__column-resize-proxy` (drag to resize columns)
- **Scroll Indicators:** `custom-move-indicator-left`, `custom-move-indicator-right`

### Performance Metrics Section

#### Section Header
- **Title:** "Performance Metrics" (h3)
- **Location:** Below Recent Issues
- **Spacing:** `bu-level bu-mb-4`

#### Date Range Control (Nested)
**Component:** Date range picker dropdown
**Test ID:** `cly-dropdown-default-test-id-dropdown-el-select`
**Placeholder Text:** "Select"
**Has Tooltip:** Yes

---

## 7. Element UI Components

### Tabs Component (`cly-vue-tabs`)
**Structure:**
- Primary tab list with white background
- Three tabs: Overview (active), Device, Network
- Tab state: Active tab highlighted with `cly-vue-tabs__tab--primary-active`

**Test IDs:**
- `tab-overview-link` + `tab-overview-title`
- `tab-device-link` + `tab-device-title`
- `tab-network-link` + `tab-network-title`

### Drawer Component (`cly-vue-drawer`)

**Purpose:** Edit issue modal overlay
**Type:** Half-screen overlay (`cly-vue-drawer--half-screen`)

**Header Section**
- Test ID: `drawer-test-id-header-title`
- Title: "Edit issue" (h3)
- Close Button: Test ID `drawer-test-id-close-button` (icon: `ion-ios-close-empty`)

**Body Section**
- Classes: `bu-pb-5 bu-pt-4 bu-mb-2 bu-mt-1`
- Content area: `cly-vue-content`
- Scroll shadow container: `scroll-shadow-container`

**Footer Section**
- Left controls: `cly-vue-drawer__controls-left-pc` (PC-only)
- Button group: Right-aligned flex container
- **Cancel Button** — Test ID: `drawer-test-id-cancel-button`
  - Class: `el-button--secondary el-button--small`
- **Save Button** — Test ID: `drawer-test-id-save-button`
  - Class: `el-button--success el-button--small`

### Dialog Component (`guide-dialog`)

**Purpose:** Help/feedback dialog in header
**Type:** Modal dialog overlay

**Header:**
- Flexbox layout with space-between alignment
- Close icon button (image)

**Footer:**
- "Do you have any feedback?" text
- "Help Center" link with external icon (`ion-android-open`)

### Data Table Component (`el-table`)

**Features:**
- Header wrapper with column definitions
- Body wrapper with row data
- Fixed right column for options
- Column resize proxy for drag resizing
- Scrolling indicators (left/right)
- Loading mask overlay with spinner

**Cell Structure:**
- Wrapper: `<div c="cell">`
- Ellipsis handling: `<div c="has-ellipsis">`
- Clickable links in Issue column

### Dropdown Component (`cly-vue-dropdown`)

**Trigger:**
- Button with `el-button--default el-button--small`
- Or input with `.cly-input-dropdown-trigger`

**Popup:**
- Classes: `el-select-dropdown el-popper cly-vue-dropdown__pop`
- Container: `cly-vue-dropdown__pop-container` (padding: `bu-mx-4`, `bu-mt-4`)

### Radio Button Group (Export Format)
**Component:** `el-radio-group`
**Style:** `el-radio-button` buttons
**Options:**
- `.CSV` (default: `is-active`)
- `.JSON`
- `.XLSX`

### Input Field (File Name)
**Component:** `el-input`
**Classes:** `el-input--small`, `el-input__inner`
**Type:** text
**Label:** "File name"

---

## 8. Implementation Notes

### Key CSS Classes & Patterns

**Layout Utilities:**
- Bulma (`bu-*`) provides grid and spacing
- Flexbox helpers: `bu-is-flex`, `bu-is-flex-direction-column`, `bu-is-justify-content-*`
- Responsive: `bu-is-mobile` for mobile layout detection
- Centering: `bu-is-centered`, `bu-is-gapless` for column layouts

**Component-Specific:**
- `cly-vue-*` — Countly Vue component namespacing
- `el-*` — Element UI component classes (buttons, inputs, tables)
- `ion-*` — Ionicons icon prefixes

### Data Flow

1. **Page Load:**
   - Render tab navigation (Overview default)
   - Fetch recent issues data
   - Display date range picker (default: last 30 days)

2. **Issue Interaction:**
   - Click issue row → open drawer
   - Edit issue details in drawer
   - Save → update issue → refresh table

3. **Data Export:**
   - Click export button → dropdown menu
   - Select format (CSV/JSON/XLSX)
   - Enter file name
   - Click Export → download file

4. **Filtering:**
   - Change date range → refetch data
   - Search issues → filter table rows
   - (Tab switching → load different data set)

### Accessibility Considerations

- **Tooltip Icon:** `cly-vue-tooltip-icon` with `has-tooltip` class (hover reveals help text)
- **Form Labels:** Associated with inputs via test IDs
- **Icon Buttons:** Should have associated `aria-label` or title attributes
- **Table Headers:** Semantic `<th>` with test IDs for automation

### Performance Considerations

- **Table Rendering:**
  - Fixed right column sticky positioning for large tables
  - Virtual scrolling (implied by `el-table__body-wrapper`)
  - Column resize dragging uses proxy element

- **Modal/Drawer:**
  - Half-screen overlay (minimal layout disruption)
  - Steps wrapper for potential multi-step flows
  - Shadow container for scroll UX

### Browser Compatibility

- Uses Element UI (v2.x implied) — modern browsers (IE11+)
- Bulma CSS framework — modern browsers (IE10+)
- Flexbox layout — full support needed
- CSS custom properties — not used (broad compatibility)

### Future Enhancement Opportunities

1. **Advanced Filtering:**
   - Multi-metric comparison
   - Device/network segmentation
   - Alert threshold customization

2. **UI Enhancements:**
   - Charts/graphs for metric trends
   - Real-time issue notifications
   - Batch issue actions (bulk edit, delete)

3. **Data Export:**
   - Scheduled export
   - Email delivery
   - Custom fields selection

4. **Analytics:**
   - Drill-down into issue details
   - Root cause analysis tools
   - Performance trending reports

---

## Appendix: Data-Test-ID Reference

| Test ID | Component | Type | Purpose |
|---------|-----------|------|---------|
| `tab-overview-link` | Link | Navigation | Overview tab |
| `tab-device-link` | Link | Navigation | Device tab |
| `tab-network-link` | Link | Navigation | Network tab |
| `header-title` | Container | Layout | Page header |
| `cly-dropdown-default-test-id-dropdown-el-select` | Dropdown | Control | Date range picker |
| `cly-datatable-n-test-id-export-as-button` | Button | Action | Export menu trigger |
| `cly-datatable-n-test-id-export-as-pop-up-csv-button` | Radio | Option | CSV format |
| `cly-datatable-n-test-id-export-as-pop-up-json-button` | Radio | Option | JSON format |
| `cly-datatable-n-test-id-export-as-pop-up-xlsx-button` | Radio | Option | XLSX format |
| `cly-datatable-n-test-id-export-as-pop-up-file-name-input` | Input | Field | File name entry |
| `cly-datatable-n-test-id-export-as-pop-up-export-button` | Button | Action | Execute export |
| `cly-datatable-n-test-id-datatable-search-input` | Input | Control | Search issues |
| `cly-datatable-n-test-id-label-issue` | Header | Column | Issue column label |
| `cly-datatable-n-test-id-label-details` | Header | Column | Details column label |
| `datatable-test-id` | Cell | Data | Table cell content |
| `drawer-test-id-header-title` | Header | Component | Drawer title |
| `drawer-test-id-close-button` | Button | Action | Close drawer |
| `drawer-test-id-cancel-button` | Button | Action | Cancel edit |
| `drawer-test-id-save-button` | Button | Action | Save changes |
