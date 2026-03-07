# User Profiles Plugin - PRD

**Plugin**: User Profiles
**Type**: Analytics Dashboard Page (List View, No Create Drawer)
**URL**: `http://mert.count.ly/dashboard#/6908ab02fece9ef06eca7285/users`
**Last Updated**: 2026-02-27

---

## 1. Scope & Context

### Purpose
The User Profiles page enables users to browse, search, filter, and analyze individual user profiles within the Countly analytics dashboard. Users can apply segmentation filters based on user properties (demographics, device, campaign data) and view aggregated metrics about the filtered user cohort.

### Key Features
- **Query Builder**: Dynamic segmentation filters based on user properties
- **Property Filtering**: Multi-tab property selection (User, Campaign, Custom, Push Notification)
- **Search Capability**: Full-text search across properties within selected categories
- **Metric Cards**: Display summary statistics and KPIs for the filtered user cohort
- **Read-Only Interface**: No user creation or direct profile editing

### Not in Scope
- User profile creation modal/drawer
- Bulk user import
- Direct user data editing
- Real-time user tracking view

---

## 2. Page Layout & Component Hierarchy

### Visual Structure
```
┌─────────────────────────────────────────────────────┐
│  HEADER                                             │
│  ┌──────────────────────────────────────────────┐  │
│  │ Title: "User Profiles"                       │  │
│  │ [View Guide] [Last Queries] [More Options]   │  │
│  └──────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────┤
│  SEGMENTATION & FILTERS (Query Builder Bar)         │
│  ┌──────────────────────────────────────────────┐  │
│  │ Property Selector [dropdown]                 │  │
│  │ Operator [select] Value [input/select]       │  │
│  │ [Add Filter] [Clear All]                     │  │
│  └──────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────┤
│  METRICS DISPLAY (Stat Cards)                       │
│  ┌──┬──┬──┬──┐ ┌──┬──┬──┬──┐ ┌──┬──┬──┬──┐        │
│  │ Card 1 │ │ Card 2 │ │ Card 3 │ ...              │
│  └──┴──┴──┴──┘ └──┴──┴──┴──┘ └──┴──┴──┴──┘        │
│                                                     │
│  Each card shows: Metric Name, Value, Description │
└─────────────────────────────────────────────────────┘
```

### Component Hierarchy
```
<div c="routename-vue-users">
  ├── Header Section (cly-vue-header)
  │   ├── Left Level: Empty container
  │   ├── Center Level: Title + View Guide Dialog
  │   │   ├── <h2> "User Profiles"
  │   │   ├── [View Guide] button
  │   │   └── Guide Dialog (el-dialog)
  │   └── Right Level: Action Buttons
  │       ├── [Last Queries] button
  │       ├── Recent Reports Dialog
  │       └── [More Options] dropdown menu
  │
  └── Main Content Section (cly-vue-section)
      ├── Query Builder Bar (cly-vue-qb-bar)
      │   └── Segmentation Controls (cly-vue-qb-seg)
      │       ├── Row 1: Property Select + Operator
      │       ├── Row 2: Value input
      │       └── Add/Remove filter buttons
      │
      └── Metrics Section (white-bg)
          └── Metric Cards Grid (4-column layout)
              ├── Card: Total Users
              ├── Card: Active Sessions
              ├── Card: Avg Session Duration
              └── ... (12 total metric cards)
```

---

## 3. HTML Structure & Class Names

### Root Container
```html
<div c="routename-vue-users">
  <!-- Main page wrapper -->
</div>
```

### Header Styling Classes
| Class | Purpose |
|-------|---------|
| `cly-vue-header` | Header wrapper, white background |
| `white-bg` | White background styling |
| `bu-level` | Bulma level layout (horizontal distribution) |
| `bu-level-left` | Left-aligned flex group |
| `bu-level-right` | Right-aligned flex group |
| `bu-level-item` | Individual level item |
| `bu-is-mobile` | Responsive mobile layout |
| `bu-is-flex-shrink-1` | Prevent flex shrinking |

### Query Builder Styling Classes
| Class | Purpose |
|-------|---------|
| `cly-vue-qb-bar` | Query builder container |
| `cly-vue-qb-bar__body` | Main QB content area (pt-3, pb-5) |
| `cly-vue-qb-seg` | Segmentation controls wrapper |
| `cly-vue-qb-seg__row` | Single filter row |
| `cly-vue-qb-seg__row--first` | First row variant |
| `cly-vue-qb-seg__row--last` | Last row variant |
| `cly-vue-qb-seg__row-selects` | Dropdown/select containers |
| `cly-vue-qb-seg__section-header` | Section label header |

### Section & Layout Classes
| Class | Purpose |
|-------|---------|
| `cly-vue-section` | Content section container |
| `cly-vue-section--has-default-skin` | Default styling variant |
| `cly-vue-section__content` | Inner content wrapper |
| `bu-column` | Bulma column (responsive grid) |
| `bu-is-12` | Full width column |
| `bu-is-4` | 1/3 width column |
| `bu-is-full` | Full width variant |
| `bu-columns` | Bulma columns container |
| `bu-is-gapless` | No gap between columns |
| `bu-is-multiline` | Allow column wrapping |

### Spacing & Alignment Classes
| Class | Purpose |
|-------|---------|
| `bu-px-4` | Horizontal padding (1.5rem) |
| `bu-py-3` | Vertical padding (0.75rem) |
| `bu-pb-3` | Bottom padding |
| `bu-mb-5` | Bottom margin (1.25rem) |
| `bu-mb-4` | Bottom margin (1rem) |
| `bu-mr-2` | Right margin (0.5rem) |
| `bu-ml-1` | Left margin (0.25rem) |
| `bu-pl-2` | Left padding |
| `bu-pr-4` | Right padding |
| `bu-is-flex` | Flex display |
| `bu-is-flex-direction-column` | Column flex direction |
| `bu-is-justify-content-space-between` | Space-between flex |
| `bu-is-align-items-center` | Center align items |
| `bu-is-align-items-baseline` | Baseline align items |

### Interactive Element Classes
| Class | Purpose |
|-------|---------|
| `el-button` | Button base style |
| `el-button--default` | Default button variant |
| `el-button--small` | Small button size |
| `el-select` | Select/dropdown wrapper |
| `el-select-dropdown` | Dropdown menu container |
| `el-popper` | Popper.js positioning class |
| `el-dialog` | Modal dialog base |
| `el-dialog__wrapper` | Dialog wrapper/overlay |
| `el-dialog__header` | Dialog header section |
| `el-dialog__footer` | Dialog footer section |
| `el-icon` | Icon base class |
| `el-icon-more` | More options (⋮) icon |
| `el-icon-close` | Close (✕) icon |

### Component-Specific Classes
| Class | Purpose |
|-------|---------|
| `metric-card` | Stat/metric card wrapper |
| `cly-metric-card` | Countly metric card styling |
| `cly-bullet` | Colored bullet indicator |
| `cly-bullet--orange` | Orange bullet (unread/alert) |
| `cly-vue-dropdown` | Custom Countly dropdown |
| `cly-vue-more-options` | More options menu variant |
| `cly-vue-tooltip-icon` | Tooltip trigger icon |
| `guide-dialog-wrapper` | Help guide dialog wrapper |
| `close-icon` | Custom close button icon |
| `el-dialog-test-id-el-dialog-close-button` | Close dialog button |

### Utility/Modifier Classes
| Class | Purpose |
|-------|---------|
| `has-ellipsis` | Text overflow with ellipsis |
| `has-tooltip` | Enable tooltip on hover |
| `is-curved` | Curved/pill styling (tags) |
| `color-cool-gray-100` | Text color (dark gray) |
| `ion` | Icon wrapper |
| `ion-help-circled` | Help icon |
| `ion-android-open` | External link icon |
| `__panel` | Panel wrapper |
| `__hidebar` | Hide scrollbar variant |
| `__view` | View container |
| `__vuescroll` | Vue-scroll component |
| `vBarVisible` | Vertical scrollbar visible |
| `hBarVisible` | Horizontal scrollbar visible |

---

## 4. Design Tokens & Visual Elements

### Color Palette
| Token | Usage |
|-------|-------|
| `white-bg` | Section backgrounds |
| `color-cool-gray-100` | Dark text (headings) |
| `cly-bullet--orange` | Alert/unread indicator |
| Default theme | Neutral grays, blues (Bulma) |

### Typography
| Element | Style |
|---------|-------|
| Page Title | `<h2>` User Profiles |
| Dialog Title | `<h3>` color-cool-gray-100 |
| Section Headers | `cly-vue-qb-seg__section-header` |

### Spacing Scale (Bulma)
- `bu-p-1` = 0.25rem
- `bu-px-4` = 1.5rem (horizontal)
- `bu-pb-3` = 0.75rem (bottom)
- `bu-mb-4` = 1rem (bottom margin)
- `bu-mb-5` = 1.25rem (bottom margin)
- `bu-mr-2` = 0.5rem (right margin)

### Button Variants
| Variant | Use Case |
|---------|----------|
| `el-button--default el-button--small` | Secondary actions (Last Queries, More Options) |
| `el-button--primary` | Primary actions (implied) |

### Dialog Styling
```html
<div c="el-dialog guide-dialog">
  <div c="el-dialog__header"><!-- Header with title + close btn --></div>
  <div c="el-dialog__body"><!-- Content area --></div>
  <div c="el-dialog__footer"><!-- Footer with links --></div>
</div>
```

---

## 5. Filters & Search

### Property Selection
Users filter by selecting properties from organized dropdown menus.

#### Available Property Categories (Tabs)
1. **All Properties** - Unified view of all available properties
2. **User** - User-specific data (age, birth-year, id, etc.)
3. **Campaign** - Campaign-related properties
4. **Custom** - Custom user properties
5. **Push Notification** - Push notification properties
6. **Pane** - Additional properties panel

#### Available Properties (Sample)
```
- age
- app-version
- birth-year
- browser
- browser-version
- carrier
- (and more...)
```

### Filter UI Components
```
┌─ Property Select Dropdown ─────────────┐
│ [Select Property ▼]                    │
│ ┌─ Tabs ────────────────────────────┐  │
│ │ All | User | Campaign | Custom ...|  │
│ ├────────────────────────────────────┤  │
│ │ Search: [Search in Properties...] │  │
│ ├────────────────────────────────────┤  │
│ │ ☐ age                              │  │
│ │ ☐ app-version                      │  │
│ │ ☐ birth-year                       │  │
│ │ ☐ browser                          │  │
│ │ ☐ ... (scrollable list)            │  │
│ └────────────────────────────────────┘  │
└────────────────────────────────────────┘
```

### Search Inputs
| Input Type | Placeholder | Purpose |
|-----------|------------|---------|
| text | "Select Property" | First dropdown label |
| text | "Search in Properties" | Property search box |
| text | "Select Property" | Operator/value select |

### Test IDs for Filters
```
cly-qb-segmentation-test-id-property-select-property-dropdown-0
  ├── -dropdown-el-select (main select)
  ├── -el-tab-all-properties (tab)
  ├── -el-tab-user (tab)
  ├── -el-tab-campaign (tab)
  ├── -el-tab-custom (tab)
  ├── -el-tab-push-notification (tab)
  ├── -search-box (search input)
  ├── -search-icon (search trigger)
  ├── -item (base item)
  ├── -item-age (property option)
  ├── -item-app-version (property option)
  ├── -item-birth-year (property option)
  ├── -item-browser (property option)
  ├── -item-browser-version (property option)
  ├── -item-carrier (property option)
  └── -scroll (scrollable container)
```

---

## 6. Data Table Structure

### Display Format
User data is NOT displayed in a traditional table. Instead, metrics are shown via **metric cards** in a grid layout.

### Metric Cards Grid
- **Layout**: 4-column responsive grid (using Bulma columns)
- **Total Cards**: 12 metric cards visible in default view
- **Card Structure**:
  ```html
  <div c="metric-card cly-metric-card">
    <div c="cly-metric-card-test-id-column">
      <div c="cly-metric-card-test-id-column-wrapper">
        <div c="cly-metric-card-test-id-column-label">
          {metric_name}
        </div>
        <div c="cly-metric-card-test-id-column-number">
          {metric_value}
        </div>
        <div c="cly-metric-card-test-id-column-description">
          {metric_description}
        </div>
      </div>
    </div>
  </div>
  ```

### Metric Card Data Structure
| Property | Type | Example |
|----------|------|---------|
| `label` | string | "Total Users" |
| `number` | string/number | "1,234" |
| `description` | string | "Active in last 30 days" |
| `wrapper` | container | Card content container |
| `column` | container | Data column cell |

### Card Test IDs
```
metric-card-cly-metric-card-test-id-column
├── -wrapper (card container)
├── -label (metric name)
├── -number (metric value)
└── -description (additional info)

el-progress-metric-card-cly-metric-card-test-id-column
└── (progress variant with similar structure)
```

---

## 7. Element UI Components

### Button Components

#### Primary Action Buttons
```html
<button c="el-button el-button--default el-button--small"
        t="last-queries-button" tp="button">
  <span>Last queries <span c="bu-tag is-curved">0</span></span>
</button>
```
- **Purpose**: Display recent saved queries
- **State**: Shows count badge (bu-tag)
- **Variant**: Small default button

#### Secondary Action Buttons
```html
<button c="el-button el-button--default el-button--small"
        t="cly-more-options-test-id-more-option-button" tp="button">
  <i c="el-icon-more"></i>
</button>
```
- **Purpose**: More options menu trigger
- **Icon**: Hamburger/dots menu icon
- **Dropdown**: Triggers `el-select-dropdown el-popper cly-vue-dropdown__pop`

#### Help Button
```html
<div c="view-button-initial" t="view-guide-button">
  <span c="icon"><img></span>
  <span c="text">View Guide</span>
</div>
```
- **Purpose**: Open User Profiles guide modal
- **Modal**: `el-dialog guide-dialog`

### Dropdown/Select Components

#### Property Select Dropdown
```html
<div c="cly-vue-qb-seg__row-selects">
  <div class="el-select">
    <button c="el-select__reference" t="cly-qb-segmentation-test-id-property-select-property-dropdown-0-dropdown-el-select">
      Select Property
    </button>
    <div c="el-select-dropdown el-popper cly-vue-dropdown__pop">
      <!-- Tabs: All Properties, User, Campaign, Custom, Push Notification -->
      <!-- Search box for filtering properties -->
      <!-- List of property options -->
    </div>
  </div>
</div>
```

### Modal/Dialog Components

#### Guide Dialog
```html
<div c="el-dialog guide-dialog">
  <div c="el-dialog__header">
    <div c="bu-is-flex bu-is-justify-content-space-between bu-is-align-items-center">
      <h2>User Profiles</h2>
      <div c="close-icon">
        <img c="bu-p-1" t="el-dialog-test-id-el-dialog-close-button">
      </div>
    </div>
  </div>
  <div c="el-dialog__body">
    {guide_content}
  </div>
  <div c="el-dialog__footer">
    <div c="bu-is-flex bu-is-justify-content-space-between">
      <div c="feedback__link">Do you have any feedback?</div>
      <a c="link">
        <span>Help Center</span>
        <i c="ion-android-open bu-ml-1"></i>
      </a>
    </div>
  </div>
</div>
```

#### Recent Reports Dialog
```html
<div c="el-dialog__wrapper cly-vue-dialog is-auto-centered">
  <div c="el-dialog">
    <div c="el-dialog__header">
      <h3 c="color-cool-gray-100" t="cly-vue-dialog-test-id-cly-dialog-title-label">
        Recent reports
      </h3>
      <button c="el-dialog__headerbtn"
              t="el-dialog-test-id-el-dialog-close-button"
              tp="button">
        <i c="el-dialog__close el-icon el-icon-close"></i>
      </button>
    </div>
  </div>
</div>
```

### Badge/Tag Components
```html
<span c="bu-tag is-curved">0</span>
```
- **Purpose**: Display count badges (e.g., "0" recent queries)
- **Styling**: Curved pill shape

### Icon Components
| Icon Class | Icon Type | Usage |
|-----------|-----------|-------|
| `ion-help-circled` | Help (?) | Help/guide trigger |
| `ion-android-open` | External link | Open Help Center |
| `el-icon-more` | Hamburger (⋮) | More options menu |
| `el-icon-close` | X | Dialog close button |

### Indicator Components
```html
<div c="cly-bullet cly-bullet--orange bu-mr-1"></div>
```
- **Purpose**: Color-coded status indicator
- **Color**: Orange = unread/new
- **Usage**: "Last queries" button indicator

---

## 8. Implementation Notes

### File Organization
```
user-raw.html
└── Contains full page layout with:
    - Header with navigation/actions
    - Query builder segmentation controls
    - Metric cards display
    - Modal dialogs (Guide, Recent Reports)
    - Test IDs for E2E testing
```

### Key Test IDs for Automation
```
header-title                              Page title
view-guide-button                         View Guide button
last-queries-button                       Last Queries button
cly-more-options-test-id-more-option-button  More Options button
cly-qb-segmentation-test-id-property-select-property-dropdown-0*  Filter selects
cly-vue-dialog-test-id-cly-dialog-title-label  Dialog titles
el-dialog-test-id-el-dialog-close-button  Close dialog button
metric-card-cly-metric-card-test-id-column*  Metric cards
undefined-link                            Dynamic links
undefined-title                           Dynamic content
```

### Browser Compatibility
- Responsive design via Bulma grid system
- Mobile-aware layouts (bu-is-mobile)
- Vue.js component framework
- Element UI (el-*) components

### Accessibility
- Semantic HTML structure
- Icon-only buttons have label spans
- Dialog ARIA patterns (implicit via el-dialog)
- Tab navigation for property selection
- Search inputs with placeholders

### Performance Considerations
- Metric cards are pre-rendered (no lazy loading visible)
- Query builder uses virtual scrolling (cly-vue-qb-bar__pop with scroll)
- Property dropdown uses searchable/filterable options
- No visible pagination for data

### Future Enhancement Opportunities
1. **User List Table View**: Add drill-down to individual user profiles
2. **Save Filter Presets**: Allow named filter templates
3. **Scheduled Reports**: Email metric snapshots
4. **Custom Metric Cards**: Drag-drop card reordering
5. **Export Data**: CSV/PDF export of current metrics
6. **Real-time Metric Updates**: WebSocket-driven metric refresh

---

## Revision History

| Date | Version | Changes |
|------|---------|---------|
| 2026-02-27 | 1.0 | Initial PRD creation from user-raw.html analysis |

