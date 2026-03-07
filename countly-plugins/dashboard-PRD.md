# Countly Dashboard (Home) Plugin - PRD

## 1. Scope & Context

**Plugin Name:** Dashboard (Home)
**Type:** Dashboard page with customizable widgets
**URL Pattern:** `/#/{projectId}/`
**Purpose:** Main landing page showing key metrics, real-time data, and analytics summaries with user-customizable widget layout

---

## 2. Page Layout

### Overall Structure
- **Header Section:** White background header with title, guide icon, and customize button
- **Main Content Area:** Responsive grid-based widget layout
- **Responsive Design:** Uses Bulma grid system (`bu-columns`, `bu-is-gapless`, `bu-column bu-is-6`)
- **Mobile Support:** Includes mobile-specific classes (`bu-is-mobile`)

### Layout Hierarchy
```
┌─────────────────────────────────────────┐
│ Header (white-bg)                       │
│  [Home Title] [Guide Icon] [Customize] │
└─────────────────────────────────────────┘
│                                         │
│ Widget Grid Container                   │
│ ┌─────────────────┬─────────────────┐   │
│ │ Widget 1        │ Widget 2        │   │
│ │ (2 cols)        │ (2 cols)        │   │
│ ├─────────────────┼─────────────────┤   │
│ │ Widget 3        │ Widget 4        │   │
│ │ (2 cols)        │ (2 cols)        │   │
│ └─────────────────┴─────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

---

## 3. HTML Structure & Class Names

### Root Container
```html
<div class="routename-dashboard">
  <div class="cly-cmp-6246">  <!-- Dashboard container -->
    <div class="cly-vue-header white-bg">  <!-- Header -->
```

### Key CSS Classes (Compact Format)
- **Layout:** `bu-level`, `bu-level-left`, `bu-level-right`, `bu-is-flex-shrink-1`
- **Grid:** `bu-columns`, `bu-is-gapless`, `bu-column bu-is-6`, `bu-pb-5`, `bu-mt-3`
- **Spacing:** `bu-p-5`, `bu-pr-5`, `bu-pt-5`, `bu-pl-5`, `bu-mr-2`, `bu-ml-1`
- **Typography:** `text-medium`, `text-small`, `text-danger`, `h2`, `h4`
- **Components:** `cly-vue-header`, `cly-vue-section`, `cly-vue-chart`, `white-bg`
- **States:** `is-checked`, `has-tooltip`, `blink` (for live indicator)

### Colors & Indicators
- **Text Colors:** `.color-cool-gray-50`, `.text-danger` (red for live indicators)
- **Background:** `.white-bg` (white background sections)

---

## 4. Widget System

### Customizable Widgets
All widgets are toggleable via the Customize dropdown. Available widgets include:

1. **Audience** - User audience metrics
2. **Crash Statistics** - App crash data and analytics
3. **Events Overview** - Event tracking summary
4. **Top Events** - Most frequently triggered events
5. **Concurrent Users** / **Online Users** - Real-time active user count
6. **Additional Analytics** - Other customizable metric widgets

### Widget Structure
Each widget follows a consistent pattern:
```html
<div class="cly-vue-section {widget-type}-widget cly-vue-section--has-default-skin">
  <div class="bu-level">
    <!-- Widget Header -->
  </div>
  <div class="cly-vue-section__content white-bg">
    <!-- Widget Content -->
  </div>
</div>
```

### Widget Features
- **Draggable:** Drag handler icon for reordering (`class="drag-handler"`)
- **Responsive:** 2-column layout (`bu-column bu-is-6`) wraps on mobile
- **Dismissible:** Close functionality in widget header
- **Navigation:** Links to detailed views (e.g., "Go to Online Users")
- **Real-time Data:** Live indicator icon with blinking animation

---

## 5. Design Tokens

### Typography
- **Page Title:** `<h2>` - "Home"
- **Section Headings:** `<h4>` with classes `bu-pt-2 bu-mb-4 cly-vue-events-overview-subheadings--font`
- **Body Text:** `.text-medium`, `.text-small`
- **Icon Font:** Font Awesome (`fa`, `fas`), Ionicons (`ion-android-open`), Countly Icons (`cly-icon-*`)

### Spacing System
- Padding: `bu-p-5`, `bu-pt-5`, `bu-pr-5`, `bu-pb-5`, `bu-pl-5`
- Margins: `bu-mr-2`, `bu-ml-1`, `bu-mb-4`, `bu-mt-1`, `bu-mt-3`

### Color Palette
- **Danger/Alert:** `.text-danger` (red for live indicators)
- **Cool Gray:** `.color-cool-gray-50` (secondary text)
- **White:** `.white-bg` (card backgrounds)

---

## 6. Element UI Components

### Header
- **Title:** `<h2 class="bu-mr-2">Home</h2>`
- **Guide Dialog:** `.guide-dialog-wrapper` with close icon and feedback link
- **Help Link:** `<a class="link">Help Center</a>` with external link icon

### Customize Button & Dropdown
```html
<button class="el-button el-button--default el-button--small"
        test-id="button-home-customize">
  <i class="cly-icon-btn cly-icon-menu"></i>
  <span>Customize</span>
</button>
```

### Customize Modal (Element UI Dialog)
- **Container:** `.el-dialog__wrapper` with `.el-dialog.guide-dialog`
- **Header:** `.el-dialog__header` with close icon
- **Footer:** `.el-dialog__footer` with feedback link
- **Popper:** `.el-select-dropdown.el-popper.cly-vue-dropdown__pop`

### Widget Customization List
- **List Component:** `.cly-vue-listbox--has-margin.cly-vue-listbox--has-default-skin`
- **Scroll:** `.vuescroll` with visible scrollbars (`.vBarVisible.hBarVisible`)
- **Items:** `.el-checkbox-group` with `.cly-vue-listbox__item`
- **Checkboxes:** `el-checkbox` with state `.is-checked.has-tooltip`
  - Input: `el-checkbox__input.is-checked`
  - Label: `el-checkbox__label`
  - Native input: `<input type="checkbox">`

### Chart Component
```html
<div class="cly-vue-chart bu-is-flex bu-is-flex-direction-column cly-vue-chart--padded"
     test-id="cly-chart-bar-test-id-chart">
  <div class="cly-vue-chart__echart bu-is-flex bu-is-flex-direction-column
              bu-is-flex-grow-1 bu-is-flex-shrink-1">
    <echarts><canvas></canvas></echarts>
    <div class="el-loading-mask">
      <div class="el-loading-spinner"><SVG></div>
    </div>
  </div>
</div>
```

### Buttons
- **Customize Button:** `el-button el-button--default el-button--small`
- **Secondary Buttons:** `el-button el-button--secondary el-button--small`
- **Navigation Links:** `cly-back-link text-medium`

### Lists & Text
- **Text Elements:** `.text-medium`, `.text-small` for content hierarchy
- **Live Indicator:** `<i class="fa fa-circle text-danger blink bu-mr-1"></i>`
- **Icons:** FontAwesome (`fa`, `fas`), Ionicons, Countly icons

---

## 7. Implementation Notes

### Key Technical Details

#### Customize Functionality
- Uses Element UI `.el-select` dropdown with `.cly-vue-select-x` wrapper
- Dropdown placeholder: `i18n('dashboard.customize-home')`
- Widget list includes checkboxes for toggle/hide functionality
- Supports drag-and-drop reordering via `.drag-handler` elements
- Apply/Cancel buttons in footer: `cly-vue-select-x__footer` with `.cly-vue-select-x__commit-section`

#### Widget Rendering
- Widgets render in 2-column responsive grid (6-unit columns in 12-unit system)
- Each widget contained in `.cly-vue-section` with type-specific class (e.g., `concurrent-users-widget`)
- Content area: `.cly-vue-section__content.white-bg`
- Charts use ECharts library (`.echarts` web component)

#### Real-time Features
- Live indicator uses blinking animation (`.blink` class)
- Real-time user count displays with live pulse
- Widget links for drill-down navigation (e.g., to "Online Users" page)

#### Accessibility & Testing
- Test IDs for automation: `test-id="header-title"`, `test-id="button-home-customize"`, `test-id="cly-select-x-test-id-dropdown-el-select"`
- Checkbox test IDs: `cly-select-x-test-id-checklistbox-{widget-name}-el-checkbox-{part}`
- Dialog elements properly marked with role/aria attributes (Element UI defaults)

#### Mobile Responsiveness
- Header: `.bu-is-mobile` for mobile layout
- No padding top/bottom: `.cly-vue-header__level--no-pt.cly-vue-header__level--no-pb`
- Grid wraps naturally with 2-column (`bu-is-6`) layout
- Vertical/horizontal scrollbars for customize list: `.__rail-is-vertical`, `.__rail-is-horizontal`

#### Internationalization
- Customize button text: `i18n('dashboard.customize-home')`
- Likely other i18n keys for widget names, labels, and feedback text

---

## Document Metadata
- **Last Updated:** 2026-02-27
- **Status:** Draft
- **Framework:** Vue.js + Element UI + Bulma
- **Component Library:** Countly Vue Components (cly-vue-*)
