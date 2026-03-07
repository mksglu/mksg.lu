# Countly Views Plugin — Page Analytics PRD

## 1. Scope & Context

**Plugin**: Views (Page Analytics)
**Type**: Analytics Dashboard
**URL**: `http://mert.count.ly/dashboard#/6908ab02fece9ef06eca7285/analytics/views`
**Purpose**: Displays comprehensive page/screen view analytics with metrics, trends, and detailed data tables for performance analysis.

---

## 2. Page Layout

### Hierarchy (Top to Bottom)
1. **Header** — Title, breadcrumbs, action buttons
2. **Controls Bar** — Date picker, drill button, more options menu
3. **Metric Cards Section** — KPI cards displaying aggregate metrics
4. **Chart Section** — Time-series visualization of view trends
5. **Data Table Section** — Detailed breakdown of views by page/screen
6. **Footer** — Feedback and help links

---

## 3. HTML Structure & Class Names

### Key Container Classes
- `.cly-vue-main` — Main content container (flexbox, centered, full-width columns)
- `.cly-vue-section` — Content section wrapper with white background
- `.cly-vue-section__content` — Section content area with padding/spacing
- `.white-bg` — White background styling
- `.bu-level` — Horizontal flex container (left/right alignment)
- `.bu-level-left` / `.bu-level-right` — Left/right flex children

### Metric Cards Container
- `.cly-vue-metric-cards` — Grid container for KPI cards
- `.bu-columns bu-is-gapless bu-is-mobile` — Responsive column layout
- `.cly-vue-metric-card` — Individual metric card
- `.cly-vue-metric-card__wrapper` — Card inner wrapper with padding (`bu-p-5`)
- Flex arrangement: space-between, items centered, ellipsis overflow handling

---

## 4. Design Tokens

### Color Scheme
- **Background**: `.white-bg` (white)
- **Text**: `.text-medium`, `.text-small`
- **Accent**: `.color-cool-gray-50` (secondary text)
- **Icons**: `.ion-*` (Ionicons), `.cly-icon-*` (Countly icons), `.fas fa-*` (Font Awesome)

### Spacing
- **Padding**: `bu-p-5` (standard), `bu-px-5`, `bu-pb-5`, `bu-pl-1`, `bu-pt-1`
- **Margin**: `bu-ml-1`, `bu-ml-2`, `bu-mr-2`, `bu-mt-1`
- **Gap**: `bu-is-gapless` (columns without gaps)

### Typography
- **Headings**: `<h2>` for main titles, metric values
- **Labels**: `.text-medium` (secondary labels)
- **Tooltips**: `.has-ellipsis`, `.has-tooltip` classes

---

## 5. Filters & Controls

### Header Controls
- **Drill Button**: `.el-button el-button--default el-button--small`
  - Icon: `.cly-is cly-is-drill`
  - Test ID: `cly-dropdown-default-test-id-dropdown-el-select` (in dropdown)

- **More Options Menu**: `.cly-vue-dropdown el-select cly-vue-more-options`
  - Button: `.el-button el-button--default el-button--small`
  - Test ID: `analytics-views-more-option-button`
  - Menu Item: "Settings"
  - Dropdown: `.el-select-dropdown el-popper cly-vue-dropdown__pop`

### Date Picker Control
- **Container**: `.views-date-picker-container`
- **Type**: `.el-input--small`, `.el-input--prefix`, `.el-input--suffix`
- **Input Field**:
  - Test ID: `cly-datepicker-test-id-pseudo-input`
  - Type: `text`
  - Display: Range format (e.g., "Jan 29, 2026 - Feb 27, 2026")
- **Icon**: `.cly-icon-date`, `.cly-icon-prefix-icon`

---

## 6. Charts & Data Visualization

### Chart Section Structure
- Parent: `.cly-vue-section cly-vue-section--has-default-skin`
- Content: `.cly-vue-section__content white-bg`
- Layout: Column-based responsive grid

### Metric Card Components
Each metric card contains:
1. **Label** — Metric name (e.g., "Total Views")
   - Class: `.text-medium`, `.has-ellipsis`, `.has-tooltip`
   - Test ID: `metric-card-{metric}-column-label`

2. **Tooltip Icon** — Help indicator
   - Class: `.cly-vue-tooltip-icon`, `.ion`, `.ion-help-circled`
   - Test ID: `metric-card-{metric}-column-tooltip`

3. **Value** — Large metric number
   - Element: `<h2>`
   - Test ID: `metric-card-{metric}-column-number`
   - Example: "11,266"

4. **Description** — Optional secondary info
   - Class: `.text-medium`
   - Test ID: `metric-card-{metric}-column-description`

### Metric Cards Currently in Views Plugin
1. **Total Views** — Total number of page/screen views
2. **Unique Views** — Count of unique visitors
3. **New Users** — Count of new users viewing pages
4. **Avg. time** — Average time spent per view
5. **Landings** — Page/screen entry count
6. **Exits** — Page/screen exit count
7. **Bounces** — Bounce count metric

### Line/Area Chart
- Displays time-series data (views over selected date range)
- X-axis: Time (dates)
- Y-axis: View count or selected metric
- Interactivity: Tooltip on hover, drill-down capability

---

## 7. Data Table

### Table Structure
- **Container**: `.cly-vue-section`
- **Content Area**: `.cly-vue-section__content white-bg`
- **Table Rows**: Scrollable with pagination/infinite scroll

### Table Columns
Standard analytics view table typically includes:
1. **Page/Screen Name** — View identifier
2. **Views** — Total count for this page
3. **Unique Views** — Unique visitors
4. **Duration** — Avg. time on page
5. **Bounce Rate** — Percentage of bounces
6. **Conversions** — (If goal tracking enabled)
7. **Actions** — Edit/delete icons for row operations

### Row Interactions
- **Hover State**: Row highlight
- **Click Action**: Drill into page-specific details
- **Icon Buttons**: Edit/drill/delete actions

---

## 8. Element UI Components

### Input Components
- **Type**: Element UI (`.el-input`, `.el-input--small`)
- **Auto-resize**: `.el-input__inner--auto-resize`
- **Prefix/Suffix Icons**: `.el-input__prefix`, `.el-input__suffix`
- **States**: Default, focused, disabled

### Dropdown/Select Components
- **Container**: `.cly-vue-dropdown`, `.el-select`
- **Trigger**: `.cly-input-dropdown-trigger`, `.el-input`
- **Placeholder**: `ph="Select"`
- **Dropdown Menu**: `.el-select-dropdown`, `.el-popper`
- **Menu Items**: `.el-select-dropdown__item`, `.el-dropdown-menu__item`
- **Scrollbar**: `.el-scrollbar__bar`, `.el-scrollbar__thumb`

### Button Components
- **Standard**: `.el-button`, `.el-button--default`
- **Sizes**: `.el-button--small` (for header controls)
- **Icon Buttons**: Icon-only buttons (drill, more options)
- **States**: Default, hover, active, disabled

### Progress Components
- **Circular Progress**: `.el-progress`, `.el-progress--circle`
- **Usage**: Display concurrent user counts or percentages
- **Props**: Data value, max value, color

### Dialog Components
- **Wrapper**: `.el-dialog__wrapper`
- **Dialog**: `.el-dialog` (role="dialog")
- **Header**: `.el-dialog__header`
- **Footer**: `.el-dialog__footer`
- **Close Icon**: `.close-icon`

---

## 9. Implementation Notes

### Data-Test-ID Naming Pattern
Convention: `{component}-{identifier}-{element-type}`

Examples from Views plugin:
- `metric-card-total-views-column`
- `metric-card-total-views-column-wrapper`
- `metric-card-total-views-column-label`
- `metric-card-total-views-column-tooltip`
- `metric-card-total-views-column-number`
- `metric-card-unique-views-column`
- `cly-datepicker-test-id-pseudo-input`
- `cly-datepicker-test-id-pseudo-input-label`
- `cly-dropdown-default-test-id-dropdown-el-select`
- `analytics-views-more-option-button`

### Accessibility
- Tooltip icons: `.has-tooltip` class (hover triggers help text)
- Aria labels: Dialog components use `aria-modal="true"`, `aria-label="dialog"`
- Icon semantics: Ionicons for standard UI patterns
- Text overflow: `.has-ellipsis` for truncated content with tooltip

### Responsive Design
- **Base Framework**: Bulma (`bu-*` classes)
- **Mobile Support**: `.bu-is-mobile` for responsive column wrapping
- **Flexbox Utilities**:
  - `.bu-is-flex` — Display flex
  - `.bu-is-justify-content-space-between` — Justify content
  - `.bu-is-align-items-center` — Vertical alignment
  - `.bu-is-flex-direction-column` — Column layout
  - `.bu-is-flex-grow-1` — Flex grow

### Interactive States
- **Date Picker**: Displays selected range, clickable to open calendar
- **Drill Button**: Opens drill-down analysis view
- **Settings Menu**: Allows configuration of displayed metrics
- **Metric Cards**: May include trend indicators (up/down arrows) or comparisons

### Data Binding
- **Dynamic Values**: Metric numbers update based on selected date range
- **Chart Re-rendering**: Updates when date range changes or filters applied
- **Table Pagination**: Shows limited rows with scroll/pagination controls
- **Real-time Updates**: (If real-time views enabled) Auto-refresh metric values

---

## 10. Key Interaction Flows

### View Analytics by Date Range
1. User selects date range via `.views-date-picker-container`
2. All metrics, charts, and tables refresh
3. Chart displays time-series data for selected period
4. Table updates with filtered view data

### Drill into Page Performance
1. Click "Drill" button or drill icon on table row
2. Opens drill-down dialog with detailed filters
3. Allows segmentation by user properties, behaviors, etc.

### Access Settings
1. Click more options button (three dots)
2. Select "Settings" from dropdown
3. Configure visible metrics, sorting, export options

### View Detailed Metrics
1. Hover over tooltip icons on metric cards
2. Display definition/explanation of metric
3. Click metric card to see trend chart for that metric

---

## Appendix: CSS Class Utility Reference

| Class | Purpose |
|-------|---------|
| `bu-columns` | Create grid container |
| `bu-column` | Grid item |
| `bu-is-gapless` | Remove gaps between columns |
| `bu-is-mobile` | Responsive mobile stacking |
| `bu-is-flex` | Display flex |
| `bu-is-flex-direction-column` | Flex column direction |
| `bu-is-justify-content-space-between` | Space-between alignment |
| `bu-is-align-items-center` | Center items vertically |
| `bu-is-flex-grow-1` | Flex grow: 1 |
| `bu-level` | Horizontal flex layout |
| `bu-level-left` | Left side of level layout |
| `bu-level-right` | Right side of level layout |
| `bu-p-5` | Padding all sides |
| `bu-px-5` | Padding horizontal |
| `bu-py-5` | Padding vertical |
| `bu-pb-5` | Padding bottom |
| `bu-pl-1` | Padding left |
| `bu-pt-1` | Padding top |
| `bu-ml-1` | Margin left |
| `bu-ml-2` | Margin left (2x) |
| `bu-mr-2` | Margin right |
| `bu-mt-1` | Margin top |
| `has-ellipsis` | Text overflow ellipsis |
| `has-tooltip` | Tooltip trigger |
| `white-bg` | White background |
| `text-medium` | Medium font weight |
| `text-small` | Small font size |
| `color-cool-gray-50` | Secondary text color |

