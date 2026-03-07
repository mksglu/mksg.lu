# PRD: Countly Drill Plugin — New Query Page

**Version:** 1.0
**Date:** 2026-02-27
**URL:** `http://mert.count.ly/dashboard#/6908ab02fece9ef06eca7285/drill`
**Source:** `drill-raw.html` (FULL attribute format, SVGs removed)

---

## 1. Scope & Context

### 1.1 Feature Summary

The Drill plugin is Countly's advanced analytics query builder. It exposes a full-page interface (not a drawer or modal) that allows analytics engineers and product managers to:

- Select an event category (Sessions, Events, Views, Feedback, LLM Observability, Consent, Crash, Push, Journey)
- Filter on specific event items within each category
- Apply property-level filters and conditions
- Configure date ranges and granularity
- Visualize results with chart types
- Save, open, and share queries
- Act on segmented user groups (e.g., "Send message to users")

### 1.2 Page Identity

| Attribute | Value |
|---|---|
| Route name | `drill` |
| Root element ID | `content` |
| Root element class | `routename-drill` |
| Top-level component class | `drill-view drill-main cly-cmp-3303` |
| Plugin namespace | `drill` |
| Component ID | `cly-cmp-3303` |

### 1.3 Context Within Countly

Drill sits alongside standard analytics views but is distinguished by its ad-hoc, multi-condition query capability. It is accessed from the main sidebar navigation. The "New Query" state is the entry point — users begin with a blank query form auto-named with a timestamp (e.g., `New Query [27-02-2026-18:37:58]`).

---

## 2. Component Hierarchy

```
#content.routename-drill
└── .drill-view.drill-main.cly-cmp-3303
    ├── .cly-vue-header.white-bg                          [Page Header]
    │   ├── .cly-vue-header__level (bu-level)
    │   │   ├── .bu-level-left [data-test-id="header-title"]
    │   │   │   └── h2 "Drill"
    │   │   │   └── .guide-dialog-wrapper
    │   │   │       ├── .view-button-initial [data-test-id="view-guide-button"]
    │   │   │       └── .el-dialog.guide-dialog [aria-label="dialog"]
    │   │   └── .bu-level-right
    │   │       ├── button.el-button [data-test-id="drill-page-new-query-button"]  "New Query"
    │   │       ├── button.el-button [data-test-id="drill-page-open-query-button"] "Open Query"
    │   │       └── button [data-test-id="last-queries-button"] "Last queries (0)"
    │
    └── .cly-vue-main.bu-columns.bu-is-gapless.bu-is-centered
        └── .bu-column.bu-is-full
            ├── .persistent-notifications
            └── .validator
                └── .bu-is-flex.bu-is-flex-direction-column.bu-pb-4
                    ├── .bu-level [Query Title Row]
                    │   └── .bu-level-left.drill-commons-title-left
                    │       └── h2.has-ellipsis [data-test-id="query-name-and-date-label"]
                    │           "New Query [27-02-2026-18:37:58]"
                    │
                    ├── .cly-vue-section.cly-vue-section--has-configurator-skin.bu-py-4
                    │   └── .cly-vue-section__content.white-bg
                    │       └── .cly-vue-section__sub.bu-px-4.bu-py-2 [Query Based On Row]
                    │           ├── span [data-test-id="query-based-on-label"] "QUERY BASED ON"
                    │           └── .cly-event-select [Event Selector Dropdown]
                    │               └── .cly-vue-dropdown.el-select.cly-vue-select-x
                    │                   ├── .cly-input-dropdown-trigger.el-input.is-adaptive
                    │                   │   ├── input[readonly] [pseudo-input]
                    │                   │   └── span [pseudo-input-label] "Sessions"
                    │                   └── .el-select-dropdown.el-popper [Popup Panel]
                    │                       └── .cly-vue-select-x__pop
                    │                           ├── .cly-vue-select-x__header
                    │                           │   └── .el-radio-group [Tab radio group]
                    │                           │       └── label.el-radio-button × 9
                    │                           └── .el-tabs [Tab Content]
                    │                               ├── .el-tabs__header
                    │                               │   └── .el-tabs__nav [tab strip]
                    │                               │       └── div.el-tabs__item × 9
                    │                               ├── .el-tabs__content
                    │                               │   ├── .el-tab-pane#pane-[CLY]_session [active]
                    │                               │   │   └── .cly-vue-listbox (scrollable)
                    │                               │   │       └── .cly-vue-listbox__items-wrapper
                    │                               │   │           └── .cly-vue-listbox__item × N
                    │                               │   ├── .el-tab-pane#pane-event [hidden]
                    │                               │   ├── .el-tab-pane#pane-[CLY]_view [hidden]
                    │                               │   ├── .el-tab-pane#pane-feedback [hidden]
                    │                               │   ├── .el-tab-pane#pane-llm [hidden]
                    │                               │   ├── .el-tab-pane#pane-[CLY]_consent [hidden]
                    │                               │   ├── .el-tab-pane#pane-[CLY]_crash [hidden]
                    │                               │   ├── .el-tab-pane#pane-[CLY]_push_action [hidden]
                    │                               │   └── .el-tab-pane#pane-Journey [hidden]
                    │                               └── .el-input--prefix [Search box]
                    │
                    ├── [Filter / Property Conditions Section — empty in default state]
                    │
                    ├── [Visualization / Chart Section — empty in default state]
                    │
                    └── span.bu-pt-4.text-medium [data-test-id="drill-page-drill-description-label"]
                        "Drill is a powerful, advanced segmentation feature..."
```

---

## 3. HTML Structure & Class Names

### 3.1 Page Shell

```html
<div id="content" class="routename-drill">
  <div>
    <div>
      <div class="drill-view drill-main cly-cmp-3303">
        <!-- Header -->
        <div>
          <div class="cly-vue-header white-bg">
            <div class="bu-level bu-is-mobile cly-vue-header__level cly-vue-header__level--no-pt cly-vue-header__level--no-pb">
              <div data-test-id="header-title" class="bu-level-left bu-is-flex-shrink-1">
                <div class="bu-level-item">
                  <h2 class="bu-mr-2">Drill</h2>
                  <!-- Guide dialog wrapper -->
                </div>
              </div>
              <div class="bu-level-right">
                <!-- Action buttons -->
              </div>
            </div>
          </div>
        </div>

        <!-- Main content -->
        <div class="cly-vue-main bu-columns bu-is-gapless bu-is-centered">
          <div class="bu-column bu-is-full">
            <div class="persistent-notifications"></div>
            <div class="validator">
              <div class="bu-is-flex bu-is-flex-direction-column bu-pb-4">
                <!-- Query title row -->
                <!-- Configurator section -->
                <!-- Description label -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 3.2 Header Buttons

```html
<!-- New Query -->
<button type="button"
  class="el-button el-button--default el-button--small"
  data-test-id="drill-page-new-query-button">
  <i class="ion-android-add-circle"></i>
  <span>New Query</span>
</button>

<!-- Open Query -->
<button type="button"
  class="el-button bu-is-align-items-center el-button--default el-button--small"
  data-test-id="drill-page-open-query-button">
  <i class="cly-icon-btn cly-icon-load"></i>
  <span>Open Query</span>
</button>

<!-- Last Queries -->
<button type="button" data-test-id="last-queries-button">
  <i class="cly-icon-btn cly-icon-prefix-icon bu-mr-1"></i>
  Last queries
  <span class="bu-tag is-curved">0</span>
</button>
```

### 3.3 Query Title Row

```html
<div class="bu-level">
  <div class="bu-level-left drill-commons-title-left">
    <div class="bu-is-justify-content-left bu-level-item">
      <h2 data-test-id="query-name-and-date-label" class="has-ellipsis">
        New Query [27-02-2026-18:37:58]
      </h2>
    </div>
  </div>
</div>
```

### 3.4 Configurator Section

```html
<div class="cly-vue-section bu-py-4 cly-vue-section--has-configurator-skin">
  <div class="bu-level">
    <div class="bu-level-left"><!-- empty --></div>
  </div>
  <div class="cly-vue-section__content white-bg">
    <div class="cly-vue-section__sub bu-px-4 bu-py-2">

      <!-- Label -->
      <span data-test-id="query-based-on-label"
        class="text-medium font-weight-bold bu-pr-4 text-uppercase">
        Query Based On
      </span>

      <!-- Event selector dropdown -->
      <div class="cly-event-select" prefixlabelwithtabid="" value="[CLY]_session">
        <div data-test-id="event-select-test-id-dropdown-el-select"
          class="cly-vue-dropdown el-select cly-vue-select-x"
          placeholder="Select Event">
          <!-- trigger -->
          <div>
            <div class="cly-input-dropdown-trigger el-input is-adaptive" size="" min-width="-1" max-width="-1">
              <input data-test-id="event-select-test-id-pseudo-input"
                type="text" readonly autocomplete="off"
                class="el-input__inner el-input__inner--auto-resize">
              <span data-test-id="event-select-test-id-pseudo-input-label"
                readonly
                class="el-input__inner el-input__inner--auto-resize">Sessions</span>
            </div>
          </div>

          <!-- dropdown popup -->
          <div class="el-select-dropdown el-popper">
            <div class="cly-vue-dropdown__pop">
              <div class="cly-vue-dropdown__pop-container">
                <div class="cly-vue-select-x__pop cly-vue-select-x__pop--hidden-tabs cly-vue-select-x__pop--has-single-option">

                  <!-- Radio group header (tab switcher) -->
                  <div class="cly-vue-select-x__header">
                    <div class="bu-level"><!-- left/right slots --></div>
                    <div class="cly-vue-select-x__header-slot">
                      <div role="radiogroup" class="el-radio-group">
                        <!-- 9 radio buttons, one per event category -->
                      </div>
                    </div>
                  </div>

                  <!-- Search box -->
                  <div class="el-input el-input--small el-input--prefix">
                    <input data-test-id="event-select-test-id-search-box"
                      class="el-input__inner" placeholder="Search...">
                    <span class="el-input__prefix">
                      <i data-test-id="event-select-test-id-search-icon"
                        class="el-input__icon el-icon-search"></i>
                    </span>
                  </div>

                  <!-- Tab panels (one per category) -->
                  <div class="el-tabs el-tabs--top">
                    <div class="el-tabs__header is-top">
                      <div class="el-tabs__nav-wrap is-top">
                        <div class="el-tabs__nav-scroll">
                          <div role="tablist" class="el-tabs__nav is-top">
                            <div class="el-tabs__active-bar is-top"></div>
                            <!-- tab items -->
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="el-tabs__content">
                      <!-- tab panes -->
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
```

### 3.5 Listbox Item (Event Item)

```html
<div tabindex="0" class="text-medium font-weight-bold cly-vue-listbox__item">
  <div data-test-id="event-select-test-id-item" class="cly-vue-listbox__item-content">
    <div class="bu-level">
      <div class="bu-level-left">
        <div class="cly-vue-listbox__item-prefix bu-mr-1"></div>
        <div data-test-id="event-select-test-id-item-sessions"
          class="cly-vue-listbox__item-label has-tooltip"
          data-original-title="null">Sessions</div>
      </div>
      <div class="bu-level-right"><!-- checkmark when selected --></div>
    </div>
  </div>
</div>
```

### 3.6 More Options Menu

```html
<div class="cly-vue-more-options">
  <button class="el-button">
    <i class="el-icon-more"></i>
  </button>
  <ul class="el-dropdown-menu">
    <li class="el-dropdown-menu__item">
      <i class="ion-android-open"></i>
      Send message to users
    </li>
  </ul>
</div>
```

### 3.7 Dialogs

#### Guide Dialog
```html
<div class="el-dialog__wrapper">
  <div role="dialog" aria-modal="true" aria-label="dialog" class="el-dialog guide-dialog">
    <div class="el-dialog__header">
      <div class="bu-is-flex bu-is-justify-content-space-between bu-is-align-items-center">
        <h2>Drill</h2>
        <div class="close-icon">
          <img src="images/icons/close-icon-grey.svg" alt="Icon" class="bu-p-1">
        </div>
      </div>
    </div>
    <div class="el-dialog__footer"><!-- guide content --></div>
  </div>
</div>
```

#### Recent Reports Dialog (Last Queries)
```html
<div class="el-dialog__wrapper cly-vue-dialog is-auto-centered" width="1120px">
  <div role="dialog" aria-modal="true" aria-label="Recent reports" class="el-dialog">
    <div class="el-dialog__header">
      <h3 data-test-id="cly-vue-dialog-test-id-cly-dialog-title-label"
        class="color-cool-gray-100">Recent reports</h3>
      <button data-test-id="el-dialog-test-id-el-dialog-close-button"
        type="button" aria-label="Close" class="el-dialog__headerbtn">
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </button>
    </div>
  </div>
</div>
```

---

## 4. Design Tokens

### 4.1 Color Classes

| Class | Usage |
|---|---|
| `white-bg` | Section content background; header background |
| `color-cool-gray-100` | Dialog title text color |

### 4.2 Spacing (Bulma-derived utility classes)

| Class | Meaning |
|---|---|
| `bu-py-4` | padding-top: 1rem; padding-bottom: 1rem |
| `bu-py-2` | padding-top: 0.5rem; padding-bottom: 0.5rem |
| `bu-px-4` | padding-left: 1rem; padding-right: 1rem |
| `bu-pb-4` | padding-bottom: 1rem |
| `bu-pt-4` | padding-top: 1rem |
| `bu-pr-4` | padding-right: 1rem |
| `bu-mr-1` | margin-right: 0.25rem |
| `bu-mr-2` | margin-right: 0.5rem |
| `bu-ml-1` | margin-left: 0.25rem |
| `bu-ml-2` | margin-left: 0.5rem |
| `bu-p-1` | padding: 0.25rem |

### 4.3 Typography

| Class | Usage |
|---|---|
| `text-medium` | Secondary / body text size |
| `text-uppercase` | All-caps label (e.g., "QUERY BASED ON") |
| `font-weight-bold` | Bold weight (listbox items, label) |
| `has-ellipsis` | Text overflow: ellipsis on query title |

### 4.4 Layout

| Class | Meaning |
|---|---|
| `bu-level` | Flexbox row with space-between |
| `bu-level-left` | Left-aligned flex group |
| `bu-level-right` | Right-aligned flex group |
| `bu-level-item` | Individual item inside bu-level |
| `bu-columns` | Column grid container |
| `bu-column` | Grid column |
| `bu-is-full` | 100% width column |
| `bu-is-gapless` | No gap between columns |
| `bu-is-centered` | Centered columns |
| `bu-is-mobile` | Mobile-responsive flex modifier |
| `bu-is-flex` | display: flex |
| `bu-is-flex-direction-column` | flex-direction: column |
| `bu-is-flex-shrink-1` | flex-shrink: 1 |
| `bu-is-align-items-center` | align-items: center |
| `bu-is-justify-content-left` | justify-content: flex-start |
| `bu-is-justify-content-space-between` | justify-content: space-between |

### 4.5 Icon Classes

| Class | Icon |
|---|---|
| `ion-android-add-circle` | Plus/circle add icon (Ionicons) |
| `ion-android-open` | External open icon (Ionicons) |
| `cly-icon-btn` | Countly icon button base class |
| `cly-icon-load` | Load/open icon |
| `cly-icon-save` | Save icon |
| `cly-icon-prefix-icon` | Prefix icon variant |
| `el-icon-close` | Element UI close X |
| `el-icon-more` | Element UI ellipsis/more icon |
| `el-icon-search` | Element UI search magnifier |

### 4.6 Tag

| Class | Usage |
|---|---|
| `bu-tag` | Pill/badge element |
| `is-curved` | Rounded pill modifier |

---

## 5. Form Fields & Query Builder Controls

### 5.1 Event Selector ("Query Based On")

**Component:** `cly-event-select`
**test-id:** `event-select-test-id-dropdown-el-select`
**Current value:** `[CLY]_session` (Sessions — default)
**Placeholder:** `Select Event`

The event selector is a composite dropdown built on `cly-vue-select-x`. It renders as a pseudo-text-input trigger that opens a popup containing:

1. A **radio-group tab switcher** (compact category switcher at the top of the popup)
2. A **search box** with an icon
3. **Tabbed panels** displaying filtered event lists per category

#### Trigger Input

| Attribute | Value |
|---|---|
| `data-test-id` | `event-select-test-id-pseudo-input` (hidden input), `event-select-test-id-pseudo-input-label` (visible span) |
| Type | `text`, `readonly` |
| Class | `el-input__inner el-input__inner--auto-resize` |
| Display value | Current category name (e.g., "Sessions") |

#### Search Box (within popup)

| Attribute | Value |
|---|---|
| `data-test-id` | `event-select-test-id-search-box` |
| Icon test-id | `event-select-test-id-search-icon` |
| Icon class | `el-icon-search` |
| Parent class | `el-input el-input--small el-input--prefix` |

### 5.2 Category Radio Group (Tab Switcher)

Located inside `cly-vue-select-x__header-slot`. Uses `el-radio-group` with `el-radio-button` labels.

| data-test-id | Value | Label |
|---|---|---|
| `event-select-test-id-tab-0` | `[CLY]_session` | Sessions (active) |
| `event-select-test-id-tab-1` | `event` | Events |
| `event-select-test-id-tab-2` | `[CLY]_view` | View |
| `event-select-test-id-tab-3` | `feedback` | Feedback |
| `event-select-test-id-tab-4` | `llm` | LLM Observability |
| `event-select-test-id-tab-5` | `[CLY]_consent` | Consent |
| `event-select-test-id-tab-6` | `[CLY]_crash` | Crash |
| `event-select-test-id-tab-7` | `[CLY]_push_action` | Push Actioned |
| `event-select-test-id-tab-8` | `Journey` | Journey |

#### Radio Button HTML Pattern

```html
<label data-test-id="event-select-test-id-tab-0"
  role="radio" tabindex="0"
  class="el-radio-button el-radio-button--small is-active"
  aria-checked="true">
  <input type="radio" tabindex="-1"
    class="el-radio-button__orig-radio"
    value="[CLY]_session">
  <span class="el-radio-button__inner">Sessions</span>
</label>
```

### 5.3 Tab Strip (within popup)

Mirrors the radio group with `el-tabs` component.

| tab ID | aria-controls | Label |
|---|---|---|
| `tab-[CLY]_session` | `pane-[CLY]_session` | Sessions |
| `tab-event` | `pane-event` | Events |
| `tab-[CLY]_view` | `pane-[CLY]_view` | View |
| `tab-feedback` | `pane-feedback` | Feedback |
| `tab-llm` | `pane-llm` | LLM Observability |
| `tab-[CLY]_consent` | `pane-[CLY]_consent` | Consent |
| `tab-[CLY]_crash` | `pane-[CLY]_crash` | Crash |
| `tab-[CLY]_push_action` | `pane-[CLY]_push_action` | Push Actioned |
| `tab-Journey` | `pane-Journey` | Journey |

Active tab: `tab-[CLY]_session` has `is-active` class and `aria-selected="true"`.

### 5.4 Event Item Listbox

Container: `cly-vue-listbox scroll-keep-show cly-vue-listbox--has-margin cly-vue-listbox--has-default-skin`
Scroll container: `__vuescroll vBarVisible hBarVisible` (data-test-id: `event-select-test-id-scroll`)
Items wrapper: `cly-vue-listbox__items-wrapper`

Full catalog of event items observed in the HTML:

| data-test-id suffix | Display Label | Category |
|---|---|---|
| `sessions` | Sessions | Sessions |
| `comment-added` | Comment Added | Events |
| `feature-used` | Feature Used | Events |
| `file-uploaded` | File Uploaded | Events |
| `integration-connected` | Integration Connected | Events |
| `project-archived` | Project Archived | Events |
| `project-created` | Project Created | Events |
| `task-completed` | Task Completed | Events |
| `task-created` | Task Created | Events |
| `task-updated` | Task Updated | Events |
| `view` | View | View |
| `ratings` | Ratings | Feedback |
| `nps` | NPS | Feedback |
| `surveys` | Surveys | Feedback |
| `llm-interaction` | LLM Interaction | LLM Observability |
| `llm-interaction-feedback` | LLM Interaction Feedback | LLM Observability |
| `llm-tool-used` | LLM Tool Used | LLM Observability |
| `llm-tool-usage-parameter` | LLM Tool Usage Parameter | LLM Observability |
| `consent` | Consent | Consent |

### 5.5 More Options Menu

Trigger: `cly-vue-more-options` with `el-icon-more` button
test-id: `cly-more-options-test-id-more-option-button`

Menu items:
- **Send message to users** — `el-dropdown-menu__item` with `ion-android-open` icon

### 5.6 Header Buttons

| Button | test-id | Icon | Size |
|---|---|---|---|
| New Query | `drill-page-new-query-button` | `ion-android-add-circle` | `el-button--small` |
| Open Query | `drill-page-open-query-button` | `cly-icon-load` | `el-button--small` |
| Last queries | `last-queries-button` | `cly-icon-prefix-icon` | — |

---

## 6. State Transitions

### 6.1 Initial / Empty State

- Query auto-named: `New Query [DD-MM-YYYY-HH:MM:SS]`
- Description label visible: `"Drill is a powerful, advanced segmentation feature that allows you to dive deep into your granular data"` (test-id: `drill-page-drill-description-label`)
- Event selector shows `Sessions` (default)
- No filters applied
- No visualization rendered
- Last queries badge shows `0`

### 6.2 Event Selector Closed (Default)

- Trigger input shows current selection label ("Sessions")
- Popup hidden (`el-select-dropdown` not rendered or hidden)
- Active tab: `[CLY]_session`, class `is-active`

### 6.3 Event Selector Open

- Popup renders `.el-select-dropdown.el-popper`
- Radio group and tab strip both visible in popup header
- Active radio button: `is-active`, `aria-checked="true"`
- Listbox scrolls vertically and horizontally (`vBarVisible hBarVisible`)
- Search box active — typing filters listbox items

### 6.4 Event Category Changed

- Radio button selected updates `is-active` class
- Corresponding tab becomes active (`aria-selected="true"`)
- Listbox content switches to matching event items
- Trigger label updates to the new category name

### 6.5 Event Item Selected

- Item gets `selected` class modifier
- Trigger label updates to show the selected item name
- Popup closes
- Query section updates (property filters may populate below)

### 6.6 Guide Dialog Open

- `.el-dialog.guide-dialog` rendered inside `.el-dialog__wrapper`
- Dialog title: "Drill"
- Close button: `el-dialog__headerbtn` with `el-icon-close`

### 6.7 Recent Reports Dialog Open (Last Queries)

- `.el-dialog` with `aria-label="Recent reports"` rendered
- Title: h3 `"Recent reports"` (test-id: `cly-vue-dialog-test-id-cly-dialog-title-label`)
- Close button: `el-dialog__headerbtn` (test-id: `el-dialog-test-id-el-dialog-close-button`)
- Dialog width: `1120px`
- Class: `cly-vue-dialog is-auto-centered`

### 6.8 Tooltip Shown

- Items with `has-tooltip` class trigger tooltip on hover
- `data-original-title` attribute holds tooltip text (may be `"null"` when no tooltip set)

---

## 7. Element UI Components

All Element UI components are from the `el-` namespace (Element UI v2 for Vue 2).

### 7.1 el-button

| Modifier | Usage |
|---|---|
| `el-button--default` | Standard unfilled button |
| `el-button--small` | Compact size variant |

### 7.2 el-dialog

| Class | Purpose |
|---|---|
| `el-dialog__wrapper` | Backdrop/overlay wrapper |
| `el-dialog` | Modal box |
| `el-dialog__header` | Dialog header row |
| `el-dialog__headerbtn` | Close button in header |
| `el-dialog__close` | Close icon element |
| `el-dialog__footer` | Footer area |
| `guide-dialog` | Custom modifier for guide dialog |
| `cly-vue-dialog` | Countly wrapper modifier |
| `is-auto-centered` | Vertical centering modifier |

Modifiers applied: `role="dialog"`, `aria-modal="true"`, `aria-label="<title>"`

### 7.3 el-input

| Class | Purpose |
|---|---|
| `el-input` | Base input container |
| `el-input--small` | Small size |
| `el-input--prefix` | Has prefix icon slot |
| `el-input__inner` | Actual input element |
| `el-input__inner--auto-resize` | Auto-resize text width |
| `el-input__prefix` | Icon prefix slot |
| `el-input__icon` | Icon within prefix |
| `is-adaptive` | Width adapts to container |

### 7.4 el-tabs

| Class | Purpose |
|---|---|
| `el-tabs` | Tabs root |
| `el-tabs--top` | Top-positioned tab strip |
| `el-tabs__header` | Tab strip header |
| `el-tabs__nav-wrap` | Navigation scroll wrapper |
| `el-tabs__nav-scroll` | Scroll container |
| `el-tabs__nav` | Actual nav strip |
| `el-tabs__active-bar` | Animated underline indicator |
| `el-tabs__item` | Individual tab button |
| `el-tabs__content` | Panel container |
| `el-tab-pane` | Individual panel |
| `is-top` | Top modifier on tabs |
| `is-active` | Active tab state |

ARIA: `role="tablist"` on nav, `role="tab"` on items, `aria-selected`, `aria-controls`, `aria-labelledby`, `aria-hidden` on panes.

### 7.5 el-radio-group / el-radio-button

| Class | Purpose |
|---|---|
| `el-radio-group` | Group container (`role="radiogroup"`) |
| `el-radio-button` | Individual radio button |
| `el-radio-button--small` | Small size modifier |
| `el-radio-button__orig-radio` | Hidden native input |
| `el-radio-button__inner` | Visible button label |
| `is-active` | Active/checked state |

ARIA: `role="radio"`, `aria-checked`.

### 7.6 el-select / el-popper

| Class | Purpose |
|---|---|
| `el-select` | Select root container |
| `el-select-dropdown` | Dropdown popup |
| `el-popper` | Popper.js positioning modifier |

### 7.7 el-dropdown-menu

| Class | Purpose |
|---|---|
| `el-dropdown-menu` | Dropdown menu `<ul>` |
| `el-dropdown-menu__item` | Menu item `<li>` |

---

## 8. Countly Custom Components

### 8.1 cly-vue-header

Top navigation bar specific to each plugin page.

| Class | Purpose |
|---|---|
| `cly-vue-header` | Header root |
| `cly-vue-header__level` | Internal flex level layout |
| `cly-vue-header__level--no-pt` | No padding-top modifier |
| `cly-vue-header__level--no-pb` | No padding-bottom modifier |

Contains: page title h2, optional guide dialog trigger, and right-side action buttons.

### 8.2 cly-vue-main

Main content region below the header.

```
.cly-vue-main.bu-columns.bu-is-gapless.bu-is-centered
  └── .bu-column.bu-is-full
```

### 8.3 cly-vue-section

Configurator card/section container.

| Class | Purpose |
|---|---|
| `cly-vue-section` | Section root |
| `cly-vue-section--has-configurator-skin` | Light bordered configurator card skin |
| `cly-vue-section__content` | Inner content area |
| `cly-vue-section__sub` | Sub-row within section (padded) |

### 8.4 cly-event-select

Countly's specialized event selection component.

```html
<div class="cly-event-select" prefixlabelwithtabid="" value="[CLY]_session">
```

Attributes:
- `prefixlabelwithtabid` — boolean-style attribute controlling label prefix behavior
- `value` — current selected event key

### 8.5 cly-vue-dropdown / cly-vue-select-x

Countly's custom dropdown wrapping Element UI `el-select`.

| Class | Purpose |
|---|---|
| `cly-vue-dropdown` | Outer dropdown container |
| `cly-vue-dropdown__pop` | Popup root |
| `cly-vue-dropdown__pop-container` | Popup inner container |
| `cly-vue-select-x` | Extended select component |
| `cly-vue-select-x__pop` | Popup panel |
| `cly-vue-select-x__pop--hidden-tabs` | Hides the inner el-tabs (tabs replaced by radio group) |
| `cly-vue-select-x__pop--has-single-option` | Single-option mode modifier |
| `cly-vue-select-x__header` | Popup header area |
| `cly-vue-select-x__header-slot` | Slot container for header content |

### 8.6 cly-input-dropdown-trigger

Custom trigger element for the dropdown. Mimics text input appearance.

```html
<div class="cly-input-dropdown-trigger el-input is-adaptive"
  size="" min-width="-1" max-width="-1">
```

Children:
- Hidden native input: `el-input__inner el-input__inner--auto-resize` (readable by screen readers)
- Visible label span: `el-input__inner el-input__inner--auto-resize` with display value

test-ids:
- `cly-input-dropdown-trigger-pseudo-input` (generic instance)
- `cly-input-dropdown-trigger-pseudo-input-label` (generic instance)
- `event-select-test-id-pseudo-input` (event selector instance)
- `event-select-test-id-pseudo-input-label` (event selector instance)

### 8.7 cly-vue-listbox

Virtualized scrollable list of selectable items.

| Class | Purpose |
|---|---|
| `cly-vue-listbox` | Root list container |
| `cly-vue-listbox--has-margin` | Adds margin around list |
| `cly-vue-listbox--has-default-skin` | Default visual skin |
| `scroll-keep-show` | Always-visible scrollbar modifier |
| `cly-vue-listbox__items-wrapper` | Items wrapper (inside vuescroll) |
| `cly-vue-listbox__item` | Individual row |
| `cly-vue-listbox__item-content` | Content area of row |
| `cly-vue-listbox__item-prefix` | Left prefix slot (icon/bullet) |
| `cly-vue-listbox__item-label` | Text label within row |

Item states: `selected` class on selected item, `has-tooltip` + `data-original-title` for tooltip.

### 8.8 __vuescroll (Virtual Scroll)

Custom virtual scroll implementation used inside listbox.

| Class | Purpose |
|---|---|
| `__vuescroll` | Scroll root |
| `__panel` | Scroll panel |
| `__view` | Viewport |
| `__hidebar` | Hidden scrollbar variant |
| `__rail-is-vertical` | Vertical scroll rail |
| `__rail-is-horizontal` | Horizontal scroll rail |
| `vBarVisible` | Vertical bar visible state |
| `hBarVisible` | Horizontal bar visible state |

test-id: `event-select-test-id-scroll`

### 8.9 cly-vue-more-options

Overflow action menu (ellipsis button + dropdown).

| Class | Purpose |
|---|---|
| `cly-vue-more-options` | Root wrapper |

Trigger: button with `el-icon-more` icon
test-id: `cly-more-options-test-id-more-option-button`

### 8.10 cly-vue-dialog

Countly-extended dialog wrapper.

| Class | Purpose |
|---|---|
| `cly-vue-dialog` | Countly dialog modifier on `el-dialog__wrapper` |
| `is-auto-centered` | Centers dialog vertically |

### 8.11 guide-dialog-wrapper

Inline guide/help dialog system.

| Class | Purpose |
|---|---|
| `guide-dialog-wrapper` | Root wrapper |
| `view-button-initial` | Initial trigger button state |
| `guide-dialog` | Modifier on el-dialog for guide content |

### 8.12 cly-bullet

Visual bullet indicator.

```html
<span class="cly-bullet cly-bullet--orange"></span>
```

Modifier `--orange` sets color.

### 8.13 persistent-notifications

Fixed notification area above main content:

```html
<div class="persistent-notifications"></div>
```

### 8.14 validator

Form validation wrapper:

```html
<div class="validator"><!-- query form content --></div>
```

---

## 9. Implementation Notes

### 9.1 Query Auto-Naming

When a new query is created, the system auto-generates a timestamp-based name:

```
New Query [DD-MM-YYYY-HH:MM:SS]
```

Example observed: `New Query [27-02-2026-18:37:58]`

This is rendered inside `h2.has-ellipsis[data-test-id="query-name-and-date-label"]`. The name is editable (clicking the h2 likely triggers an inline edit input).

### 9.2 Event Selector: Dual Navigation Pattern

The event selector uses a dual-navigation approach:

1. **Radio group** (`el-radio-group`) — a compact horizontal strip at the top of the popup for fast category switching
2. **Tab strip** (`el-tabs`) — mirrors the radio group; the tabs are hidden via `cly-vue-select-x__pop--hidden-tabs` when the radio group is in use

This allows the listbox to respond to both navigation mechanisms for the same underlying state.

### 9.3 cly-vue-select-x Modifiers

| Modifier class | Behavior |
|---|---|
| `--hidden-tabs` | Hides `el-tabs__header`; navigation done via radio group instead |
| `--has-single-option` | Restricts selection to single item |

### 9.4 CLY_ Prefix Convention

Event keys prefixed with `[CLY]_` are Countly internal/system events:

| Key | Display Name |
|---|---|
| `[CLY]_session` | Sessions |
| `[CLY]_view` | View |
| `[CLY]_consent` | Consent |
| `[CLY]_crash` | Crash |
| `[CLY]_push_action` | Push Actioned |

User-defined events use plain string keys (e.g., `event`, `feedback`, `llm`, `Journey`).

### 9.5 ARIA Implementation

The page follows ARIA patterns:

- Tabs: `role="tablist"` > `role="tab"` > `role="tabpanel"` with `aria-selected`, `aria-controls`, `aria-labelledby`, `aria-hidden`
- Radio group: `role="radiogroup"` > `role="radio"` > `aria-checked`
- Dialogs: `role="dialog"` + `aria-modal="true"` + `aria-label`
- Close buttons: `aria-label="Close"`

### 9.6 data-test-id Naming Conventions

Three prefixes are observed:

| Prefix | Scope |
|---|---|
| `drill-page-*` | Page-level elements (header buttons, description) |
| `event-select-test-id-*` | Event selector dropdown internals |
| `cly-*` / `el-dialog-test-id-*` | Shared Countly component system IDs |
| `header-title` | Generic page header |
| `query-name-and-date-label` | Query title heading |
| `query-based-on-label` | Section label above event selector |

### 9.7 Scroll Implementation

The `__vuescroll` component wraps all listboxes. In the observed state, both `vBarVisible` and `hBarVisible` classes are present, indicating both scroll axes are active. The `scroll-keep-show` class on the listbox root forces scrollbars to always be visible (not auto-hide).

### 9.8 Tooltip System

Tooltips use `data-original-title` attribute (a jQuery/Bootstrap-style pattern):

```html
class="cly-vue-listbox__item-label has-tooltip" data-original-title="null"
```

When `data-original-title="null"`, no tooltip is displayed. When populated with a string, the tooltip activates on hover.

### 9.9 Dialog Sizes

| Dialog | Width |
|---|---|
| Guide dialog | Default (not specified) |
| Recent reports (Last queries) | `1120px` |

### 9.10 Empty State Description

The description text visible when no query is configured:

> "Drill is a powerful, advanced segmentation feature that allows you to dive deep into your granular data"

Element: `span.bu-pt-4.text-medium[data-test-id="drill-page-drill-description-label"]`

This text should be hidden once a query is actively being built (state management).

### 9.11 Save / Load Icons

| Icon class | Purpose |
|---|---|
| `cly-icon-save` | Save query action |
| `cly-icon-load` | Open/load saved query |

These appear in the header right area. The `Open Query` button uses `cly-icon-load`.

### 9.12 Send Message to Users Integration

The overflow menu (`cly-vue-more-options`) contains:

- **"Send message to users"** — triggers a campaign/message workflow targeting the segmented users from the current Drill query. Icon: `ion-android-open`.

This represents the primary CTA connecting Drill results to downstream action (Push Notifications / In-app messaging).

### 9.13 Last Queries Badge

The "Last queries" button renders a `bu-tag is-curved` badge showing the count of saved recent queries:

```html
<span class="bu-tag is-curved">0</span>
```

In the observed state, count is `0`, indicating no saved queries exist yet.

### 9.14 Configurator Section Skin

The main query configuration area uses `cly-vue-section--has-configurator-skin`, which applies a distinct visual treatment (typically a light bordered card style) to differentiate the filter/query builder from surrounding content.

### 9.15 Validation Wrapper

The entire query form is wrapped in `.validator`, Countly's form validation container that manages error display and field-level validation state.
