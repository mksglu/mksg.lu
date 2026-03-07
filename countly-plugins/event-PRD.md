# Countly Events Plugin PRD

## 1. Scope & Context

**Plugin Name:** Events (All Events)
**Type:** Analytics Dashboard Page
**URL:** `http://mert.count.ly/dashboard#/6908ab02fece9ef06eca7285/analytics/events`
**Primary Use Case:** Display comprehensive event analytics showing all tracked events with detailed statistics, segmentation options, and trend visualization

---

## 2. Page Layout

### Overall Structure
- **Two-Column Layout:** Left sidebar (25%) + main content area (75%)
- **Header Section:** Title bar with guide dialog, drill button, and help resources
- **Tabs Navigation:** Event Stats (active) | Compare Events
- **Sidebar:** Event selector listbox with search capability
- **Main Area:**
  - Event title and metadata display
  - Filter controls (Segmentation, Period)
  - Chart visualization section
  - Data table with detailed metrics

### Layout Grid
- Container: `bu-columns bu-is-gapless` (Bulma flexbox grid)
- Left Column: `bu-column bu-is-3` (25% width)
- Right Column: `bu-column bu-is-9` (75% width)
- Responsive: `bu-is-mobile` class for mobile adaptations

---

## 3. HTML Structure & Class Names

### Root Container
```
<div c="routename-events">
  <div c="cly-cmp-6729">
    <div c="cly-vue-tabs">
      [Tab navigation]
    </div>
    <div c="cly-vue-tab cly-cmp-6731">
      [Main content]
    </div>
  </div>
</div>
```

### Header Section
```html
<div c="cly-vue-header white-bg">
  <div c="bu-level bu-is-mobile cly-vue-header__level cly-vue-header__level--no-pt cly-vue-header__level--no-pb">
    <div c="bu-level-left bu-is-flex-shrink-1" t="header-title">
      <h2 c="bu-mr-2">All Events</h2>
      <div c="guide-dialog-wrapper">
        [View Guide button]
        [Help dialog modal]
      </div>
    </div>
    <div c="bu-level-right">
      <button c="el-button el-button--default el-button--small">
        <i c="cly-is cly-is-drill"></i>
        <span c="bu-ml-1">Drill</span>
      </button>
    </div>
  </div>
</div>
```

### Left Sidebar - Event Listbox
```html
<div c="bu-column white-bg bu-is-3 bu-mr-5">
  <div c="cly-vue-listbox scroll-keep-show cly-vue-listbox--bordered is-expandable cly-vue-listbox--has-jumbo-skin">
    <div c="cly-vue-listbox__header bu-p-3">
      <form>
        <div c="el-input el-input--prefix">
          <input c="el-input__inner" t="cly-listbox-search-input" tp="text" ph="Search in 9 Events">
          <span c="el-input__prefix">
            <i c="el-input__icon el-icon-search"></i>
          </span>
        </div>
      </form>
    </div>
    <div c="__vuescroll vBarVisible hBarVisible" t="all-events-scroll">
      <div c="cly-vue-listbox__items-wrapper">
        [Event list items]
      </div>
    </div>
  </div>
</div>
```

### Event List Items
```html
<div c="text-medium font-weight-bold cly-vue-listbox__item">
  <div c="cly-vue-listbox__item-content" t="all-events-item">
    <div c="bu-level">
      <div c="bu-level-left">
        <div c="cly-vue-listbox__item-label has-tooltip" t="all-events-item-[event-name]">
          [Event Name]
        </div>
      </div>
      <div c="bu-level-right"></div>
    </div>
  </div>
</div>
```

### Right Column - Main Content
```html
<div c="bu-column bu-is-9">
  <div c="cly-vue-events-all" t="event-title">[Event Name]</div>
  <div c="bu-is-flex cly-vue-events-all--padding">
    [Filters: Segmentation, Period]
  </div>
  <div c="cly-vue-section bu-mt-5 bu-mr-5 cly-vue-section--has-default-skin">
    <div c="cly-vue-chart bu-is-flex bu-is-flex-direction-column cly-vue-chart--padded">
      [Chart visualization]
    </div>
  </div>
</div>
```

---

## 4. Design Tokens & CSS Framework

### Framework & Utilities
- **CSS Framework:** Bulma (Flexbox-based grid system)
- **Component Library:** Element UI (Vue integration)
- **Custom:** Countly Vue Components (`cly-vue-*` prefix)

### Key Utility Classes
| Class | Purpose |
|-------|---------|
| `bu-columns` | Flex container |
| `bu-is-gapless` | Remove gaps between columns |
| `bu-column bu-is-3` | 25% width column |
| `bu-column bu-is-9` | 75% width column |
| `bu-level` | Horizontal flex layout |
| `bu-level-left` / `bu-level-right` | Left/right flex items |
| `bu-is-flex` | Flexbox display |
| `bu-is-flex-direction-column` | Column direction |
| `bu-is-align-items-center` | Vertical center alignment |
| `bu-is-justify-content-space-between` | Space-between distribution |
| `white-bg` | White background |
| `bu-mr-*` / `bu-ml-*` | Right/left margin (scale) |
| `bu-mt-5` / `bu-pt-4` | Top margin/padding |
| `bu-pr-2` | Right padding |

### Typography
- Headings: `<h2>` for page title and section headers
- Labels: `bu-is-flex`, `cly-vue-events-all-placeholder-text`
- Font weights: `font-weight-bold`, `text-medium`

### Component Styling
- **Inputs:** `el-input`, `el-input--prefix`, `el-input--suffix`, `el-input__inner`
- **Buttons:** `el-button`, `el-button--default`, `el-button--small`
- **Dropdowns:** `el-select`, `cly-vue-dropdown`, `el-select-dropdown`
- **Listbox:** `cly-vue-listbox`, `cly-vue-listbox__item`, `cly-vue-listbox__item-label`
- **Icons:** `cly-is` (custom icon class), `ion-*` (Ionicons prefix)
- **Scrolling:** `__vuescroll`, `vBarVisible`, `hBarVisible`

### Color & Theme
- Background: `white-bg` containers
- Interactive: Element UI blue theme (default)
- Icons: Ionicons (iOS-style) + custom Countly icons

---

## 5. Event Selector & Filters

### Event Selection (Left Sidebar)
**Component:** `cly-vue-listbox` (Custom Vue listbox component)

**Structure:**
- Search input field with icon
- Scrollable list of 9 events (initially)
- Single-selection mode (indicated by "selected" class on active item)
- Tooltip support on event names

**Events Listed:**
1. Comment Added
2. Feature Used (default/selected)
3. File Uploaded
4. Integration Connected
5. Project Archived
6. Project Created
7. Task Completed
8. Task Created
9. Task Updated

**Interactions:**
- Click event to select and update main view
- Type in search to filter events (placeholder: "Search in 9 Events")
- Custom scrollbar rendering via `__vuescroll`

### Segmentation Filter
**Component:** `cly-vue-dropdown` (Element UI Select wrapper)

**Properties:**
- Data-test-id: `segmentation-select-dropdown-el-select`
- Search enabled with box: `segmentation-select-search-box`
- Multi-level structure with tabs (`__root` tab visible)
- Nested listbox for segment selection

**Default Options:**
- "Any segmentation" (selected by default)
- "Feature" (segment dimension)
- Additional segments available via tabs

**Styling:**
- Class: `cly-vue-select-x` (custom select extension)
- Search icon: `el-icon-search`
- Caret icon: `ion-arrow-up-b`

### Period Filter
**Component:** `cly-vue-dropdown` with date picker integration

**Properties:**
- Data-test-id: `cly-dropdown-default-test-id-dropdown-el-select`
- Default range: "Jan 29, 2026 - Feb 27, 2026"
- Icon: `cly-icon-date`
- Input auto-resizing: `el-input__inner--auto-resize`

**Shortcut Options:**
- Custom range (active)
- Presets (submenu)
- Yesterday
- Today
- Last 7 days
- Last 30 days
- Last 60 days
- January, 2026
- February, 2026
- 2026

**Date Picker Component:**
- Class: `cly-vue-daterp` (custom date range picker)
- Structure: Shortcuts column on left, calendar/inputs on right
- Active state indicators on selected period

---

## 6. Charts & Visualization

### Chart Container
**Class:** `cly-vue-chart bu-is-flex bu-is-flex-direction-column cly-vue-chart--padded`

**Structure:**
```html
<div c="cly-vue-chart__echart bu-is-flex bu-is-flex-direction-column bu-is-flex-grow-1">
  <div c="bu-level">
    <div c="bu-level-left">
      [Chart type toggle]
    </div>
    <div c="bu-level-right">
      [Chart legend/actions]
    </div>
  </div>
  <div c="chart-container">
    [EChart instance]
  </div>
</div>
```

### Chart Type Toggle
**Wrapper:** `chart-type-toggle-wrapper` (data-test-id: `all-events-chart-time-header-chart-type-toggle-wrapper`)

**Purpose:** Switch between different visualization types (line, bar, area, etc.)

**Implementation:** Element UI Select component (`el-select`)

### Chart Features
- **Library:** ECharts (implied by `echart` class)
- **Responsive:** `bu-is-flex-grow-1` for full-width, `bu-is-flex-shrink-1` for proper sizing
- **Padding:** `cly-vue-chart--padded` adds internal spacing
- **Legend:** Positioned in header right section

---

## 7. Data Table

**Status:** Table structure referenced but full implementation truncated in HTML snapshot.

**Expected Implementation:**
- Located below chart section
- Shows event count, segment breakdown, duration metrics
- Sortable columns
- Pagination support
- Row-level drill-down capability (via "Drill" button in header)

**Key Metrics Displayed:**
- Event Count (primary metric)
- Segmentation Values
- Duration (if applicable)
- Trend indicators

---

## 8. Element UI Components & Icons

### Button Components
```html
<button c="el-button el-button--default el-button--small">
  <i c="cly-is cly-is-drill"></i>
  <span c="bu-ml-1">Drill</span>
</button>
```

**Button Classes:**
- `el-button` - Base button styling
- `el-button--default` - Default variant (neutral)
- `el-button--small` - Small size variant

**Icon System:**
- `cly-is` - Countly custom icon prefix
- `cly-is-drill` - Drill (funnel) icon
- `ion-android-open` - External link icon (Ionicons)
- `ion-arrow-up-b` - Dropdown caret (up arrow)
- `el-icon-search` - Search icon
- `el-icon-caret-right` - Right-pointing caret
- `cly-icon-date` - Calendar/date icon

### Form Input Components
```html
<div c="el-input el-input--prefix el-input--suffix">
  <input c="el-input__inner" t="test-id" tp="text" ph="Placeholder">
  <span c="el-input__prefix">
    <i c="el-input__icon el-icon-search"></i>
  </span>
  <span c="el-input__suffix">
    <i c="el-input__suffix-inner el-select__caret ion-arrow-up-b"></i>
  </span>
</div>
```

**Input Classes:**
- `el-input` - Base input container
- `el-input__inner` - Input field
- `el-input--prefix` / `el-input--suffix` - Icon support
- `el-input--small` - Small size variant
- `is-adaptive` - Adaptive width
- `el-input__inner--auto-resize` - Auto-sizing input

### Dialog/Modal
```html
<div c="el-dialog__wrapper">
  <div c="el-dialog guide-dialog">
    <div c="el-dialog__header">
      <h2>Events</h2>
      <div c="close-icon"><img c="bu-p-1"></div>
    </div>
    <div c="el-dialog__footer">
      [Footer content with help links]
    </div>
  </div>
</div>
```

**Dialog Classes:**
- `el-dialog` - Dialog wrapper
- `el-dialog__header` - Header section
- `el-dialog__footer` - Footer section
- `guide-dialog` - Custom guide/help dialog styling

### Tab Navigation
```html
<div c="cly-vue-tabs">
  <div c="white-bg cly-vue-tabs__primary-tab-list">
    <div c="cly-vue-tabs__tab cly-vue-tabs__tab--primary cly-vue-tabs__tab--primary-active">
      <a t="tab-event-stats-link">
        <span t="tab-event-stats-title">Event Stats</span>
      </a>
    </div>
    <div c="cly-vue-tabs__tab cly-vue-tabs__tab--primary">
      <span t="tab-compare-events-title">Compare Events</span>
    </div>
  </div>
</div>
```

**Tab Classes:**
- `cly-vue-tabs` - Tab container
- `cly-vue-tabs__primary-tab-list` - Tab list
- `cly-vue-tabs__tab` - Individual tab
- `cly-vue-tabs__tab--primary-active` - Active tab state
- `cly-vue-tab` - Tab content panel

---

## 9. Implementation Notes

### Data Attributes Reference
- `t="..."` - Data-test-id for testing/automation
- `c="..."` - CSS class (compact representation)
- `tp="..."` - HTML input type
- `ph="..."` - Input placeholder text

### Key Test IDs for Automation
- Header: `header-title`
- Tabs: `tab-event-stats-link`, `tab-compare-events-title`
- Guide: `view-guide-button`
- Event list: `all-events-scroll`, `all-events-item`, `all-events-item-[event-name]`
- Segmentation: `segmentation-select-dropdown-el-select`, `segmentation-select-search-box`
- Period: `cly-datepicker-test-id-*` (various date/time controls)
- Chart: `all-events-chart-time-header-chart-type-toggle-wrapper`

### Custom Vue Components
1. `cly-vue-tabs` - Tab navigation system
2. `cly-vue-listbox` - Custom scrollable listbox with search
3. `cly-vue-dropdown` - Select wrapper with custom behavior
4. `cly-vue-daterp` - Date range picker
5. `cly-vue-chart` - Chart wrapper with ECharts integration
6. `cly-vue-select-x` - Extended select with multi-tab support
7. `cly-vue-header` - Header component
8. `cly-vue-section` - Card/section wrapper
9. `cly-vue-main` - Main layout container

### Responsive Design
- Mobile breakpoint: `bu-is-mobile` class applied to header level
- Column widths: 25/75 split on desktop
- Sidebar scrolling: Custom `__vuescroll` for smooth scrolling
- Flexible padding: Utility margins (`bu-mr-*`, `bu-mt-*`)

### Performance Considerations
- Virtualized scrolling via `__vuescroll` for event list
- Large event list support (9+ events initially)
- Search filtering for quick event selection
- Date range shortcuts for common queries
- Chart lazy-loading (implied by structure)

### Accessibility Features
- Test IDs for automated testing
- Tooltip support on event names (`has-tooltip`)
- Help dialog with external resources link
- Semantic HTML structure (h2 headings, form inputs)
- Icon labels with text fallbacks in buttons

---

## Appendix: Event List

| Event Name | Test ID |
|---|---|
| Comment Added | `all-events-item-comment-added` |
| Feature Used | `all-events-item-feature-used` |
| File Uploaded | `all-events-item-file-uploaded` |
| Integration Connected | `all-events-item-integration-connected` |
| Project Archived | `all-events-item-project-archived` |
| Project Created | `all-events-item-project-created` |
| Task Completed | `all-events-item-task-completed` |
| Task Created | `all-events-item-task-created` |
| Task Updated | `all-events-item-task-updated` |

---

**Last Updated:** February 27, 2026
**Status:** Complete - Ready for Implementation
