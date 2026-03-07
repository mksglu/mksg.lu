# Countly Geo Plugin - Product Requirements Document

**Plugin Name:** Geo (Geographic Analytics)
**Type:** Analytics Dashboard Page
**URL:** `/dashboard#/[project-id]/analytics/geo`
**Last Updated:** February 27, 2026

---

## 1. Scope & Context

### Purpose
The Geo plugin provides geographic analytics visualization for Countly, displaying user distribution and session data across countries, regions, and cities. It enables analytics teams to understand user demographics by location and identify geographic trends in user engagement.

### Key Objectives
- Visualize global user distribution via interactive world map
- Provide country-level and city-level geographic breakdowns
- Track session metrics by geographic location with trend indicators
- Support temporal analysis via customizable date range filtering
- Enable drill-down exploration of geographic data

### Users
- Analytics teams
- Product managers
- Data analysts
- Business intelligence roles

---

## 2. Page Layout

### Overall Structure
```
┌─────────────────────────────────────────────────────┐
│  Header: "Countries" + Help Icon + More Options      │
├─────────────────────────────────────────────────────┤
│  [Countries Tab] [Activity Map Tab] [Languages Tab]  │
├─────────────────────────────────────────────────────┤
│  Date Picker: [Jan 29, 2026 - Feb 27, 2026]          │
├─────────────────────────────────────────────────────┤
│  Metrics Row:                                         │
│  [Total Sessions: 4586 ▼-28.5%] [Total Users: 165] │
│  [New Users: 61 ▼-56.1%]                            │
├─────────────────────────────────────────────────────┤
│  Content Section (2-Column Layout):                  │
│  ┌──────────────────┬──────────────────────────────┐ │
│  │ Radio Selection  │   Interactive World Map      │ │
│  │ (Metrics)        │   - Regions/Cities Toggle    │ │
│  │                  │   - Zoom Controls            │ │
│  │                  │   - Location Popups          │ │
│  └──────────────────┴──────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### Sections
1. **Page Header** - Title, help, more options menu
2. **Tab Navigation** - Countries, Activity Map, Languages
3. **Date Filter** - Customizable date range selector
4. **Metrics Summary** - Key statistics with trend indicators
5. **Geographic Visualization** - Left: Metrics selector, Right: Interactive map
6. **Location Popups** - Country-level data displayed on hover/click

---

## 3. HTML Structure & Class Names

### Root Elements
| Element | Class | Purpose |
|---------|-------|---------|
| Root Container | `routename-analytics-geo` | Page root selector for routing |
| Main Wrapper | `geo-analytics-wrapper cly-cmp-6490` | Component wrapper with unique ID |
| Tab Container | `cly-vue-tabs` | Tab management system |

### Header Section
| Element | Class | Purpose |
|---------|-------|---------|
| Header | `cly-vue-header white-bg` | Top navigation/title bar |
| Title Container | `bu-level bu-is-mobile cly-vue-header__level` | Flexbox title layout |
| Title | `bu-mr-2` (on h2) | Main section title |
| Help Icon | `cly-vue-tooltip-icon ion ion-help-circled` | Interactive help tooltip |
| Help Dialog | `el-dialog guide-dialog` | Modal help content |
| More Options | `cly-vue-dropdown el-select` | Dropdown menu button |

### Tab Navigation
| Element | Class | Purpose |
|---------|-------|---------|
| Tab List | `cly-vue-tabs__primary-tab-list white-bg` | Tab bar container |
| Tab Item | `cly-vue-tabs__tab cly-vue-tabs__tab--primary` | Individual tab |
| Active Tab | `cly-vue-tabs__tab--primary-active` | Currently selected tab |

### Date Picker
| Element | Class | Purpose |
|---------|-------|---------|
| Date Picker Container | `geo-date-picker-container has-tooltip` | Date range selector wrapper |
| Input Trigger | `cly-input-dropdown-trigger el-input el-input--small` | Clickable date display |
| Pseudo Input | `el-input__inner el-input__inner--auto-resize` | Display field |
| Label Span | `el-input__inner el-input__inner--auto-resize` | Date range text |
| Icon Prefix | `cly-icon-date cly-icon-prefix-icon` | Calendar icon |
| Dropdown Popup | `el-select-dropdown el-popper` | Date picker dropdown menu |
| Date Range Picker | `cly-vue-daterp` | Vue date range component |
| Shortcut Buttons | `cly-vue-daterp__shortcut` | Preset date options |

### Metrics Cards
| Element | Class | Purpose |
|---------|-------|---------|
| Radio Block | `cly-vue-radio-block radio-main-skin` | Metrics selection container |
| Radio Wrapper | `radio-wrapper bu-is-flex` | Flex wrapper for radios |
| Radio Button | `radio-button bu-is-flex selected` | Individual metric button |
| Radio Box | `box` | Visual indicator/checkbox |
| Metric Label | `text-medium` | Metric name text |
| Metric Number | `number` (on h2) | Large metric value display |
| Trend Indicator | `cly-trend-down bu-ml-2` | Trend visualization (up/down) |
| Trend Icon | `cly-trend-down-icon ion-android-arrow-down` | Arrow icon |
| Trend Value | `cly-trend-value-*` | Percentage change text |

### Map Section
| Element | Class | Purpose |
|---------|-------|---------|
| Map Column | `bu-column leaflet-noclick-map` | Right column container for map |
| Worldmap Wrapper | `cly-vue-worldmap` | Vue component wrapper |
| Map Container | `bu-column cly-vue-worldmap__map-container` | Map DOM parent |
| Detail Switch | `cly-vue-worldmap__detail-switch bu-m-3` | Regions/Cities toggle |
| Radio Group | `el-radio-group` | Toggle button group |
| Radio Button | `el-radio-button el-radio-button--small` | Toggle option |
| Active Radio | `is-active` | Selected toggle state |
| Map DOM | `vue2leaflet-map leaflet-container` | Leaflet.js container |
| Leaflet Pane | `leaflet-pane leaflet-*-pane` | Leaflet internal DOM panes |

### Location Popups
| Element | Class | Purpose |
|---------|-------|---------|
| Popup Wrapper | (SVG/div within map) | Individual location marker popup |
| Flag Icon | `bu-mr-2` | Country flag image |
| Location Name | `text-medium` | Country/city name text |
| Session Value | `h4` | Number of sessions |
| Metric Label | `text-medium bu-pt-1` | "Total Sessions" label |

### Responsive Classes (Bulma CSS)
| Class | Purpose |
|-------|---------|
| `bu-columns` | Grid container |
| `bu-column` | Grid item |
| `bu-is-full` | 100% width |
| `bu-is-gapless` | No gap between columns |
| `bu-is-flex` | Flexbox display |
| `bu-is-flex-direction-column` | Flex column direction |
| `bu-is-justify-content-center` | Center flex items |
| `bu-is-justify-content-space-between` | Space-between flex items |
| `bu-is-align-items-center` | Center align flex items |
| `bu-is-mobile` | Mobile responsive behavior |
| `bu-is-centered` | Center container |
| `bu-is-flex-shrink-1` | Flex shrink |

---

## 4. Map Component

### Technology Stack
- **Library:** Leaflet.js (via vue2leaflet Vue component)
- **DOM Class:** `vue2leaflet-map leaflet-container`
- **Interactivity:** Vue 2 reactivity for data binding

### Features
1. **Interactive World Map**
   - Pan and zoom capabilities
   - Color-coded regions/countries by metric intensity
   - Click/hover to display location details

2. **Toggle Views**
   - **Regions Mode:** Country-level granularity (default)
   - **Cities Mode:** City-level geographic breakdown
   - Radio button toggle in top-left corner

3. **Navigation Controls**
   - Zoom in button: `+` (leaflet-control-zoom-in)
   - Zoom out button: `-` (leaflet-control-zoom-out)
   - Positioned bottom-right

4. **Location Popups**
   - Triggered on hover/click
   - Contains:
     - Country flag icon
     - Location name
     - Session count (h4 heading)
     - "Total Sessions" label
   - Appear in flexbox columns within map

### Map Layers
- **Tile Pane:** Base map tiles (OpenStreetMap or configured provider)
- **Shadow Pane:** Drop shadows for markers
- **Overlay Pane:** Custom overlays
- **Marker Pane:** Location markers (countries/cities)
- **Tooltip Pane:** Hover tooltips
- **Popup Pane:** Click popups

---

## 5. Design Tokens

### Color Palette
- **Primary Accent:** Brand color (used in selected metric boxes)
- **Neutral Background:** `white-bg` class
- **Trend Up:** Green (implied from `-down` modifier patterns)
- **Trend Down:** Red (matches `cly-trend-down` styling)
- **Text Primary:** `text-medium` (body text)
- **Border/Divider:** Subtle gray (Bulma defaults)

### Spacing
- **Padding:** `bu-p-1`, `bu-p-3` (Bulma padding classes)
- **Margin:** `bu-m-3`, `bu-mr-2`, `bu-ml-1` (Bulma margin classes)
- **Gap:** `bu-is-gapless` (no gap between columns)

### Typography
- **Headings:** `h2` (section title), `h4` (metric values)
- **Body:** `text-medium` (standard text)
- **Font Weight:** `font-weight-bold` (emphasized text)

### Shadows & Elevation
- **Modal Dialog:** `el-dialog` (Element UI dialog styling)
- **Dropdown Popper:** `el-popper` (floating dropdown styling)

---

## 6. Filters & Controls

### Date Range Picker
**Element:** `geo-date-picker-container`

**Display Format:**
- Shows selected range: "Jan 29, 2026 - Feb 27, 2026"
- Input type: text (pseudo-input via span)
- Icon: Calendar (cly-icon-date)

**Preset Shortcuts:**
- Custom range (default, active on load)
- Yesterday
- Today
- Last 7 days
- Last 30 days
- Last 60 days
- January 2026 (month selection)
- February 2026 (month selection)
- 2026 (year selection)

**Behavior:**
- Dropdown expands on click
- Custom range section expandable (indicated by right caret)
- Presets section expandable
- Single selection per category

### Metric Selection (Radio Buttons)
**Element:** `cly-vue-radio-block`

**Options:**
1. Total Sessions (selected by default)
   - Value: 4,586
   - Trend: ▼ -28.5%

2. Total Users
   - Value: 165
   - Trend: ▼ -53.1%

3. New Users
   - Value: 61
   - Trend: ▼ -56.1%

**Behavior:**
- Only one metric selectable at a time
- Selection updates map color coding
- Trend indicator shows period-over-period change

### More Options Menu
**Element:** `cly-vue-dropdown el-select` (in header)

**Button:**
- Icon: `el-icon-more` (three-dot menu)
- Style: `el-button el-button--default el-button--small`
- data-test-id: `cly-more-options-test-id-more-option-button`

**Menu Items:**
- "Drill Data" - Deep-dive analysis option

---

## 7. Data Table

Currently **not present** in the Countries tab. Data is displayed via:
- **Metrics Cards:** Top-level summary numbers
- **Map Popups:** Geographic location details
- **Possible in Activity Map Tab:** May contain tabular data

### Projected Table Structure (if added)
Expected columns:
- Country/City name (with flag)
- Total Sessions
- Total Users
- New Users
- Trend indicators
- Bounce rate (potential)
- Avg. Session Duration (potential)

---

## 8. Element UI Components

### Button Components
| Class | Purpose | State |
|-------|---------|-------|
| `el-button el-button--default el-button--small` | Standard button | Default |
| `el-button--small` | Compact button size | - |

### Input Components
| Class | Purpose |
|-------|---------|
| `el-input el-input--small` | Input field (small) |
| `el-input__inner` | Input text area |
| `el-input__inner--auto-resize` | Auto-expanding input |
| `el-input__prefix` | Left icon slot |
| `el-input__suffix` | Right icon slot |

### Radio & Selection
| Class | Purpose |
|-------|---------|
| `el-radio-button` | Radio button style |
| `el-radio-button--small` | Compact radio |
| `is-active` | Selected state |
| `el-radio-button__inner` | Radio label text |
| `el-radio-button__orig-radio` | Hidden input element |

### Dropdown Components
| Class | Purpose |
|-------|---------|
| `el-select-dropdown` | Dropdown menu container |
| `el-popper` | Floating popup positioning |
| `el-dropdown-menu__item` | Menu item (non-selectable) |

### Dialog Components
| Class | Purpose |
|-------|---------|
| `el-dialog` | Modal dialog wrapper |
| `el-dialog__wrapper` | Dialog backdrop |
| `el-dialog__header` | Dialog title bar |
| `el-dialog__footer` | Dialog action footer |
| `guide-dialog` | Help/guide dialog variant |

### Loading States
| Class | Purpose |
|-------|---------|
| `el-loading-mask` | Loading overlay |
| `el-loading-spinner` | Spinner animation |

### Icons
| Icon Class | Meaning |
|-----------|---------|
| `ion ion-help-circled` | Help/information icon |
| `ion ion-android-arrow-down` | Down arrow (trend indicator) |
| `el-icon-more` | Three-dot menu icon |
| `el-input__icon cly-icon-date` | Calendar date picker icon |
| `el-select__caret ion-arrow-up-b` | Dropdown caret icon |
| `el-icon-caret-right` | Right arrow (expand/collapse) |

---

## 9. Implementation Notes

### Architecture Patterns
- **Vue 2 Components:** Uses vue2leaflet for map, Element UI for form components
- **Layout System:** Bulma CSS (BEM-like class naming)
- **Data Binding:** Reactive data properties update metrics and map visualization
- **Tab Management:** cly-vue-tabs component handles tab switching

### Key Classes & Hierarchy
```
routename-analytics-geo (routing root)
├── geo-analytics-wrapper (component wrapper)
│   ├── cly-vue-tabs (tab navigation)
│   ├── cly-vue-header (title bar)
│   ├── geo-date-picker-container (filter)
│   ├── cly-vue-section (data section)
│   │   ├── cly-vue-radio-block (metrics selector)
│   │   └── cly-vue-worldmap (map component)
│   │       └── vue2leaflet-map (Leaflet container)
```

### Loading & Error States
- Loading mask (`el-loading-mask`) with spinner during data fetch
- Should display over metrics and map sections
- Prevents interaction during loading

### Responsive Behavior
- Mobile view: `bu-is-mobile` applied for smaller screens
- Column layout adjusts via `bu-columns` and `bu-is-full`
- Flexbox utilities handle alignment across breakpoints
- Map container stretches to fill available space

### Help System
- Help icon triggers modal dialog (`el-dialog guide-dialog`)
- Dialog includes:
  - Close button (X icon)
  - Feedback link
  - Help Center link (external)
- Tooltip on hover for icon (`has-tooltip` class)

### Date Range Implementation
- Date picker uses cly-vue-daterp (custom Vue date range picker)
- Selected range displayed as span (pseudo-input)
- Shortcuts expand/collapse sections
- Format: "MMM DD, YYYY - MMM DD, YYYY"

### Map Interactivity
- Leaflet controls: zoom in/out at bottom-right
- Popup shown on region/city click (contains flag, name, count)
- Regions/Cities toggle updates displayed granularity
- Color intensity based on selected metric (Total Sessions, Users, New Users)

### Data Display Flow
1. User selects date range → API call to fetch geo data
2. Metrics cards populate with summary statistics
3. Map renders with location markers/color coding
4. User selects metric radio button → map colors update
5. User clicks location → popup displays specific data
6. User toggles Regions/Cities → map detail level updates

### Testing Considerations
- All interactive elements have data-test-id attributes (t= in COMPACT format)
- Metrics cards: `cly-radio-*` test IDs
- Date picker: `cly-datepicker-test-id-*`
- Tabs: `tab-*-link` and `tab-*-title`
- Map: `cly-worldmap`
- Radio toggles: `el-radio-button-test-id`
- Dropdown: `cly-dropdown-default-test-id-dropdown-el-select`
- More options: `cly-more-options-test-id-more-option-button`

---

## Appendix: HTML Attributes Reference

### COMPACT Format Key
- `c="..."` → class attribute
- `t="..."` → data-test-id attribute
- `tp="..."` → type attribute
- `ph="..."` → placeholder attribute

### Example Structure
```html
<div c="cly-vue-radio-block radio-main-skin">
  <div c="radio-wrapper bu-is-flex">
    <div c="radio-button selected" t="cly-radio-button-box-total-sessions">
      <span c="text-medium" t="cly-radio-label-total-sessions">
        Total Sessions
      </span>
      <h2 t="cly-radio-number-total-sessions">4586</h2>
      <div c="cly-trend-down" t="cly-radio-trend-total-sessions">
        <i c="ion-android-arrow-down"></i>
        <span t="cly-radio-trend-value-total-sessions">-28.5%</span>
      </div>
    </div>
  </div>
</div>
```

---

**Document Version:** 1.0
**Created:** February 27, 2026
**Plugin Status:** Analyzed from live instance at http://mert.count.ly/
