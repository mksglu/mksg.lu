# Journey Plugin — Product Requirements Document

**Plugin:** Countly Journey
**Date:** 2026-02-27
**Component Library:** Element UI v2.x + Countly custom components + Vue Flow

---

## Part 1: Functional Behavior

### 1.1 Top-Level Navigation

The Journey plugin renders inside `div.routename-content` and contains a primary tab system.

**Primary Tabs** (`cly-vue-tabs__primary-tab-list`)

| Tab | data-test-id | State |
|-----|-------------|-------|
| Journeys | `tab-journeys-title` | Active (default) |
| Library | `tab-library-title` | Inactive; wrapped in anchor `tab-library-link` |

Tab active state: `cly-vue-tabs__tab--primary-active` class is added to the active tab container.

---

### 1.2 Journeys List View Header

Container: `cly-vue-header white-bg` inside `cly-vue-tab`.

**Left side** (`bu-level-left`, `header-title`):
- `<h2>` text: "Journeys" `[STATIC/i18n]`
- Tooltip icon: `ion ion-help-circled has-tooltip` with `header-title-tooltip` test-id. Wraps in `guide-dialog-wrapper`.

**Right side** (`bu-level-right`):

| Element | data-test-id | Type | Label | Tag |
|---------|-------------|------|-------|-----|
| Last queries button | `last-queries-button` | `el-button--default el-button--small` | "Last queries" + count badge | `[DYNAMIC/DB]` count |
| Count badge | — | `bu-tag is-curved` | "0" | `[DYNAMIC/DB]` |
| Bullet indicator | — | `cly-bullet cly-bullet--orange bu-mr-1` | — | — |
| New Journey button | `new-journey-button` | `el-button--success el-button--small` | "New Journey" | `[STATIC/i18n]` |
| New Journey icon | — | `el-icon-circle-plus` | — | — |

---

### 1.3 Content Builder — Visual Flow Editor

Container: `journey-content-builder` wrapping the entire builder area.

#### 1.3.1 Content Builder Header

Container: `cly-vue-content-builder-header`

**Left section** (`cly-vue-content-builder-header__left`):

| Element | data-test-id | Type | Notes |
|---------|-------------|------|-------|
| Close button | `close-icon` | icon button | Icon: `cly-io cly-io-x` |
| Journey name input container | `content-header-input-container` | — | `cly-vue-content-builder-header__input-container` |
| Journey name input | `content-header-input` | `text` input | Inside `el-input`; editable journey name |
| Created-by label | `created-by-label` | static text | "Created by Browser Agent" `[DYNAMIC/DB]` |

**Center section** (`cly-vue-content-builder-header__tabs`):

| Tab | data-test-id | State |
|-----|-------------|-------|
| Editor | `tab-editor-title` | Active (default) `cly-vue-tabs__tab--primary-active` |
| Results | `tab-results-title` | Inactive; has `has-tooltip` class |

**Right section** (`cly-vue-content-builder-header__actions`):

| Element | data-test-id | Type | Default State | Label |
|---------|-------------|------|---------------|-------|
| Save button | `content-header-save-button` | `el-button--success el-button--small` | Disabled (`is-disabled`) | "Save" |
| Publish button | `journey-publish-button` | `el-button--success el-button--small` | Disabled (`is-disabled`) | "Publish" |
| More options dropdown | `content-header-more-option-button` | `cly-vue-dropdown el-select cly-vue-more-options` | — | Icon: `el-icon-more` |

**More options dropdown items** (`cly-vue-dropdown__pop`):

| Item | data-test-id | Label |
|------|-------------|-------|
| Duplicate | `more-button-option-duplicate` | "Duplicate journey" `[STATIC/i18n]` |
| Delete | `more-button-option-delete` | "Delete journey" `[STATIC/i18n]` |

---

#### 1.3.2 Vue Flow Canvas

Container hierarchy:
```
journey-builder-layout__flow
  └── journey-builder-layout__flow__chart
        └── cly-journey-flow-container
              └── cly-journey-flow
                    └── vue-flow
                          └── vue-flow__nodes
```

**Start Node** (`vue-flow__node journey-button`):

| Element | Class | Content |
|---------|-------|---------|
| Start icon | `cly-is cly-is-play journey-start__icon` | — |
| Start label | `journey-start__text` | "Start" `[STATIC/FIXED]` |
| Add trigger button | `cly-journey-add-button-node cly-journey-add-button-node__active cly-journey-add-button-node__trigger` | — |
| Add trigger label | `journey-button-add-trigger` (test-id) | "+ Add trigger" `[STATIC/i18n]` |

The start node is always present as the entry point. The `cly-journey-add-button-node__active` class indicates the node is in an interactive state. `cly-journey-add-button-node__trigger` indicates this add-button opens the triggers sidebar.

---

#### 1.3.3 Right Sidebar — Triggers

Container: `cly-vue-content-builder__layout-main__body__right-sidebar`
Section heading: `<h4>Triggers</h4>` `[STATIC/i18n]`
Block list container: `cly-journey-block-list`

**Trigger Categories and Items:**

##### PROFILE category
test-id: `journey-triggers-block-list-category-label-profile`

| Trigger | test-id (box) | Name test-id | Description test-id | Description |
|---------|--------------|-------------|-------------------|-------------|
| Profile update | `journey-triggers-block-list-item-box-profile-update` | `...-name-profile-update` | `...-description-profile-update` | "Trigger when a user profile is updated" |
| Profile group entry | `journey-triggers-block-list-item-box-profile-group-entry` | `...-name-profile-group-entry` | `...-description-profile-group-entry` | "Trigger when a user enters a profile group" |
| Profile group exit | `journey-triggers-block-list-item-box-profile-group-exit` | `...-name-profile-group-exit` | `...-description-profile-group-exit` | "Trigger when a user exits a profile group" |

Profile update item has an explicit icon: `cly-journey-block-list__item-icon cly-is cly-is-user-add journey-block__icon color-charts-magenta bg-charts-light-magenta` with test-id `journey-triggers-block-list-item-icon-profile-update`.

Profile update has an explicit details wrapper: `cly-journey-block-list__item-details` with test-id `journey-triggers-block-list-item-details-profile-update`.

##### COHORT category
test-id: `journey-triggers-block-list-category-label-cohort`

| Trigger | test-id (box) | Description |
|---------|--------------|-------------|
| Cohort entry | `journey-triggers-block-list-item-box-cohort-entry` | "Trigger when a user enters a cohort" |
| Cohort exit | `journey-triggers-block-list-item-box-cohort-exit` | "Trigger when a user exits a cohort" |

##### JOURNEY category
test-id: `journey-triggers-block-list-category-label-journey`

| Trigger | test-id (box) | Description |
|---------|--------------|-------------|
| Journey exit | `journey-triggers-block-list-item-box-journey-exit` | "Trigger when a user exits a journey" |

##### INCOMING DATA category
test-id: `journey-triggers-block-list-category-label-incoming-data`

| Trigger | test-id (box) | Description |
|---------|--------------|-------------|
| Consent | `journey-triggers-block-list-item-box-consent` | "Trigger when a consent is started" |
| Crash | `journey-triggers-block-list-item-box-crash` | "Trigger when a crash is detected" |
| Push Action | `journey-triggers-block-list-item-box-push-action` | "Trigger when a push action is performed" |
| Session | `journey-triggers-block-list-item-box-session` | "Trigger when a session is started" |
| View | `journey-triggers-block-list-item-box-view` | "Trigger when a view is started" |
| Events | `journey-triggers-block-list-item-box-events` | "Trigger when a custom event is triggered" |
| Feedback | `journey-triggers-block-list-item-box-feedback` | "Trigger when a feedback is received" |

**Total triggers: 13 across 4 categories.**

All trigger name test-ids follow pattern: `journey-triggers-block-list-item-name-{slug}`
All trigger description test-ids follow pattern: `journey-triggers-block-list-item-description-{slug}`
All labels: `[STATIC/i18n]`
All descriptions: `[STATIC/i18n]`

---

### 1.4 IAS Drawer — 4-Step Wizard

Container: `cly-vue-drawer journey-content-builder__ias-drawer is-mounted has-sidecars cly-vue-drawer--half-screen cly-vue-drawer--half-screen-6`

This is a survey creation wizard embedded within the Journey builder. The drawer splits into two panes: a sidecar preview pane and a steps/form pane.

#### 1.4.1 Sidecar Preview Pane

Container: `cly-vue-drawer__sidecars-view` > `cly-vue-content` > `countly-surveys-web widget-preview cly-vue-surveys-preview`

**Preview Stage 1** — Question preview:
- Stage label test-id: `preview-question-label-1`, text: "Question (1/1)" `[DYNAMIC]`
- Widget container: `survey-widget full`
  - Header text test-id: `nps-preview-nps-widget-title-label`, placeholder: "Enter a survey name" `[DYNAMIC/DB]`
  - Close icon test-id: `nps-preview-nps-widget-close-icon`, icon: `ion-ios-close-empty`
  - Body contains: "Type your question here" `[DYNAMIC/DB]`
  - Checklist item: checkbox input `[DYNAMIC/DB]`
  - Submit wrapper: logo image `surveys-widget-preview-default-logo` + submit button `surveys-widget-preview-submit-button` text "Submit" `[STATIC/i18n]`

**Preview Stage 2** — Thank you message:
- Stage label test-id: `survey-preview-thank-you-message-label`, text: "Thank you message" `[STATIC/i18n]`
- Widget container: `survey-widget full finished`
  - Centered text test-id: `nps-preview-nps-widget-centered-text-label`, content: "Thanks for your feedback!" `[STATIC/i18n]`

#### 1.4.2 Steps/Form Pane

Container: `cly-vue-drawer__steps-view` > `cly-vue-drawer__steps-wrapper`

**Drawer Header** (`cly-vue-drawer__header`):
- Title: `<h3>` with test-id `drawer-test-id-header-title` (content populated dynamically)
- Steps header container: `cly-vue-drawer__steps-header` test-id `drawer-test-id-steps-header-container`

**Steps Navigation:**

| Step | Index test-id | Label test-id | Label text | State |
|------|--------------|--------------|------------|-------|
| Step 1 | `drawer-test-id-current-step-index-1` | `drawer-test-id-settings-and-questions-label` / `drawer-test-id-step-1-label` | "Settings and questions" | Active (`is-active`) |
| Step 2 | `drawer-test-id-current-step-index-2` | `drawer-test-id-customization-label` / `drawer-test-id-step-2-label` | "Customization" | Inactive |
| Step 3 | `drawer-test-id-current-step-index-3` | `drawer-test-id-customization-label` / `drawer-test-id-step-3-label` | "Targeting" | Inactive |
| Step 4 | `drawer-test-id-current-step-index-4` | `drawer-test-id-review-label` / `drawer-test-id-step-4-label` | "Review" | Inactive |

Note: Steps 2 and 3 share the same label test-id `drawer-test-id-customization-label` — this appears to be a known bug in the HTML source. Step 3 actual label is "Targeting".

Separators: `cly-vue-drawer__step-separator` with test-ids `drawer-test-id-seperator-0`, `drawer-test-id-seperator-1`, `drawer-test-id-seperator-2` (note: known typo — "seperator" not "separator").

**Drawer Footer** (`cly-vue-drawer__footer`):

| Button | data-test-id | Type | Label |
|--------|-------------|------|-------|
| Cancel | `drawer-test-id-cancel-button` | `el-button--secondary el-button--small` | "Cancel" `[STATIC/i18n]` |
| Next step | `drawer-test-id-next-step-button` | `el-button--success el-button--small` | "Next step" `[STATIC/i18n]` |

---

## Part 2: Design System & Visual Styles

### 2.1 Component Libraries

- **Element UI v2.x**: `el-button`, `el-input`, `el-select`, `el-icon-*`
- **Bulma utilities**: `bu-level`, `bu-level-left`, `bu-level-right`, `bu-level-item`, `bu-mr-1`, `bu-mr-2`, `bu-mb-6`, `bu-is-mobile`, `bu-tag`, `is-curved`
- **Countly custom**: `cly-vue-*`, `cly-journey-*`, `cly-is-*`, `cly-io-*`
- **Vue Flow**: `vue-flow`, `vue-flow__nodes`, `vue-flow__node`

### 2.2 CSS Class Patterns

**Layout:**
- `cly-vue-content-builder` — main content builder shell
- `cly-vue-content-builder__layout-header` — fixed top header bar
- `cly-vue-content-builder__layout-main` — main content area
- `cly-vue-content-builder__layout-main__body__right-sidebar` — right sidebar panel
- `journey-builder-layout` — journey-specific layout wrapper
- `journey-builder-layout__flow` — flow canvas area
- `journey-builder-layout__flow__chart` — chart/canvas container

**Header components:**
- `cly-vue-content-builder-header` — content builder header
- `cly-vue-content-builder-header__left` — left group (close + name)
- `cly-vue-content-builder-header__tabs` — center tab group
- `cly-vue-content-builder-header__actions` — right button group
- `cly-vue-content-builder-header__input-container` — name input wrapper
- `cly-vue-content-builder-header__input` — name input el-input
- `cly-vue-content-builder-header__created-by` — attribution label
- `cly-vue-content-builder-header__close-button` — close X button

**Journey-specific:**
- `cly-journey-flow-container` — Vue Flow wrapper
- `cly-journey-flow` — flow element
- `journey-start` — start node container
- `journey-start__icon` — start icon
- `journey-start__text` — start label
- `cly-journey-add-button-node` — add node button
- `cly-journey-add-button-node__active` — interactive state
- `cly-journey-add-button-node__trigger` — opens trigger panel
- `cly-journey-block-list` — trigger list container
- `cly-journey-block-list__category` — trigger category group
- `cly-journey-block-list__item` — single trigger item
- `cly-journey-block-list__item-icon` — item icon
- `cly-journey-block-list__item-details` — item name + description

**Drawer:**
- `cly-vue-drawer` — base drawer component
- `journey-content-builder__ias-drawer` — journey-specific drawer modifier
- `cly-vue-drawer--half-screen` — half-screen size modifier
- `cly-vue-drawer--half-screen-6` — size variant (6 columns)
- `cly-vue-drawer__sidecars-view` — left preview pane
- `cly-vue-drawer__steps-view` — right steps pane
- `cly-vue-drawer__steps-wrapper` — steps content
- `cly-vue-drawer__header` — drawer header
- `cly-vue-drawer__steps-header` — steps progress indicator
- `cly-vue-drawer__step-label` — single step label
- `cly-vue-drawer__step-label.is-active` — active step
- `cly-vue-drawer__step-separator` — step separator
- `cly-vue-drawer__footer` — drawer footer with action buttons

**Tabs:**
- `cly-vue-tabs` — tab component root
- `cly-vue-tabs__primary-tab-list` — tab list
- `cly-vue-tabs__tab` — individual tab
- `cly-vue-tabs__tab--primary` — primary style tab
- `cly-vue-tabs__tab--primary-active` — active state

**Global header:**
- `cly-vue-header` — page-level header
- `white-bg` — white background modifier

### 2.3 Icon Systems

**Ionicons (`ion-*`):**
- `ion ion-help-circled` — help/tooltip trigger icon
- `ion-ios-close-empty` — close X in survey preview

**Countly Shape Icons (`cly-is-*`):**
- `cly-is cly-is-play` — Start node play icon
- `cly-is cly-is-user-add` — Profile update trigger icon

**Countly IO Icons (`cly-io-*`):**
- `cly-io cly-io-x` — Close button in content builder header

**Element UI Icons (`el-icon-*`):**
- `el-icon-circle-plus` — New Journey button icon
- `el-icon-more` — More options (kebab) button icon

### 2.4 Color Utilities

- `color-charts-magenta` — magenta text/icon color
- `bg-charts-light-magenta` — light magenta background
- `cly-bullet cly-bullet--orange` — orange bullet indicator (Last queries button)

### 2.5 Tooltip Pattern

Tooltips use `has-tooltip` class on the trigger element. The guide dialog uses `guide-dialog-wrapper` with `cly-vue-tooltip-icon` class.

### 2.6 Dropdown Pattern

More options uses `cly-vue-dropdown el-select cly-vue-more-options` with an inner `cly-vue-dropdown__pop` containing `<li>` items.

---

## Part 3: Interaction Flows

### 3.1 Journeys List Interactions

1. **View Journeys**: Default view after navigating to the plugin. Shows header with "Journeys" title, Last queries button, and New Journey button.
2. **Open Library**: Click `tab-library-link` anchor to navigate to Library tab.
3. **View Last Queries**: Click `last-queries-button` to see recent query history. Badge shows count `[DYNAMIC/DB]`.
4. **Create New Journey**: Click `new-journey-button` to open the Content Builder in a new journey context.

### 3.2 Content Builder Header Interactions

1. **Close Builder**: Click `close-icon` (`cly-io-x`) to exit the content builder and return to Journeys list.
2. **Rename Journey**: Click on `content-header-input` (text input at `content-header-input-container`) to type a new journey name. Changes enable Save button.
3. **Switch to Results tab**: Click `tab-results-title`. Note: Results tab has `has-tooltip` — may show a tooltip if journey not yet published/has no data.
4. **Save Journey**: Click `content-header-save-button`. Disabled (`is-disabled`) by default until edits are made.
5. **Publish Journey**: Click `journey-publish-button`. Disabled (`is-disabled`) by default. Becomes enabled when journey is valid/saved.
6. **More Options**: Click `content-header-more-option-button` (kebab icon) to open `cly-vue-dropdown__pop` with:
   - `more-button-option-duplicate` — Duplicate the current journey
   - `more-button-option-delete` — Delete the current journey (likely shows confirmation)

### 3.3 Vue Flow Canvas Interactions

1. **Initial State**: Canvas shows a single Start node (`journey-start`) with a "Start" label and a "+ Add trigger" button below it (`journey-button-add-trigger`).
2. **Add Trigger**: Click `journey-button-add-trigger` to open the right sidebar trigger panel (or activate an existing open sidebar).
3. **Node States**: `cly-journey-add-button-node__active` class is present on the add button when in interactive/ready state.
4. **Canvas Navigation**: Standard Vue Flow interactions — pan (click+drag on empty canvas), zoom (scroll wheel).

### 3.4 Right Sidebar — Trigger Selection

1. **Browse Triggers**: Triggers are organized in 4 collapsible/scrollable category sections (PROFILE, COHORT, JOURNEY, INCOMING DATA).
2. **Add a Trigger**: Click or drag a trigger item (`cly-journey-block-list__item`) to add it to the canvas as a node connected to the Start node (or selected node).
3. **Trigger Item Anatomy**: Each item shows:
   - Icon (e.g., `cly-is-user-add` for Profile update)
   - Name (e.g., "Profile update")
   - Description (e.g., "Trigger when a user profile is updated")
4. **Category Headers**: Displayed as `<h3>` elements in uppercase (PROFILE, COHORT, JOURNEY, INCOMING DATA).

### 3.5 IAS Drawer — 4-Step Wizard

The IAS (In-App Survey) drawer opens as a half-screen drawer (`cly-vue-drawer--half-screen`) with a sidecar preview pane.

**Step progression:**

| Step | Label | Content Summary |
|------|-------|----------------|
| 1 | Settings and questions | Survey name, question text, checklist options |
| 2 | Customization | Visual styling and appearance |
| 3 | Targeting | Audience/trigger conditions |
| 4 | Review | Final review before saving |

**Navigation:**
- Click "Next step" (`drawer-test-id-next-step-button`) to advance to the next step.
- Click "Cancel" (`drawer-test-id-cancel-button`) to close the drawer without saving.
- Step indicators (`cly-vue-drawer__step-label`) show current position; active step has `is-active` class.
- Step separators (`cly-vue-drawer__step-separator`) visually connect step labels.

**Sidecar Preview:**
- Left pane shows a live preview of the survey widget as it would appear to users.
- Preview updates as user edits settings in the right pane.
- Shows Question stage and Thank you message stage.

### 3.6 Tab Switching

**Main tabs (Journeys vs Library):**
- Click `tab-journeys-title` to show journeys list.
- Click `tab-library-link` > `tab-library-title` to navigate to library view.
- Active tab indicated by `cly-vue-tabs__tab--primary-active` class.

**Content Builder tabs (Editor vs Results):**
- Click `tab-editor-title` for the visual flow editor view (default).
- Click `tab-results-title` for journey analytics/results view.
- Active tab indicated by `cly-vue-tabs__tab--primary-active` class.

---

## Part 4: HTML Structure & Class Names

### 4.1 Full DOM Hierarchy

```
div.routename-content
  └── div > div > div.cly-cmp-7422
        └── div > div.cly-vue-tabs
              ├── div.white-bg.cly-vue-tabs__primary-tab-list           [Main tab bar]
              │     ├── div.cly-vue-tabs__tab.--primary.--primary-active
              │     │     └── span[tab-journeys-title] "Journeys"
              │     └── div.cly-vue-tabs__tab.--primary
              │           └── a[tab-library-link]
              │                 └── span[tab-library-title] "Library"
              └── div.cly-vue-tab                                        [Active tab content]
                    └── div
                          ├── div.cly-vue-header.white-bg                [Page header]
                          │     └── div.bu-level.bu-is-mobile.cly-vue-header__level
                          │           ├── div.bu-level-left[header-title]
                          │           │     └── div.bu-level-item
                          │           │           ├── h2 "Journeys"
                          │           │           └── div > div.guide-dialog-wrapper
                          │           │                 └── i.cly-vue-tooltip-icon.ion.ion-help-circled.has-tooltip[header-title-tooltip]
                          │           └── div.bu-level-right
                          │                 ├── div.bu-mr-2
                          │                 │     └── button.el-button--default.el-button--small[last-queries-button]
                          │                 │           ├── div.cly-bullet.cly-bullet--orange.bu-mr-1
                          │                 │           ├── "Last queries"
                          │                 │           └── span.bu-tag.is-curved "0"
                          │                 └── button.el-button--success.el-button--small[new-journey-button]
                          │                       ├── i.el-icon-circle-plus
                          │                       └── span "New Journey"
                          └── div > div.journey-content-builder          [Builder container]
                                ├── div.cly-vue-drawer.journey-content-builder__ias-drawer [IAS Drawer]
                                │     ├── div.cly-vue-drawer__sidecars-view               [Preview pane]
                                │     │     └── div.cly-vue-content
                                │     │           └── div > div.countly-surveys-web.widget-preview.cly-vue-surveys-preview
                                │     │                 ├── div.preview-stage.bu-mb-6     [Question preview]
                                │     │                 │     ├── div.stage-label[preview-question-label-1]
                                │     │                 │     └── div.survey-widget.full
                                │     │                 │           ├── div.section-top
                                │     │                 │           │     ├── div.header-text[nps-preview-nps-widget-title-label]
                                │     │                 │           │     └── div.close-button[nps-preview-nps-widget-close-icon]
                                │     │                 │           └── div.section-body
                                │     │                 │                 ├── div.main-text
                                │     │                 │                 ├── div.checklist-wrapper > div.check-item > label
                                │     │                 │                 └── div.submit-wrapper
                                │     │                 │                       ├── img[surveys-widget-preview-default-logo]
                                │     │                 │                       └── div.submit-button[surveys-widget-preview-submit-button]
                                │     │                 └── div.preview-stage             [Thank you preview]
                                │     │                       ├── div.stage-label[survey-preview-thank-you-message-label]
                                │     │                       └── div.survey-widget.full.finished
                                │     │                             └── div.section-top
                                │     │                                   └── div.centered-text[nps-preview-nps-widget-centered-text-label]
                                │     └── div.cly-vue-drawer__steps-view                  [Steps pane]
                                │           └── div.cly-vue-drawer__steps-wrapper
                                │                 ├── div.cly-vue-drawer__header
                                │                 │     ├── h3[drawer-test-id-header-title]
                                │                 │     └── div.cly-vue-drawer__steps-header[drawer-test-id-steps-header-container]
                                │                 │           ├── div.cly-vue-drawer__step-label.is-active[drawer-test-id-step-1-label]
                                │                 │           │     ├── span[drawer-test-id-current-step-index-1] "1"
                                │                 │           │     └── div[drawer-test-id-settings-and-questions-label] "Settings and questions"
                                │                 │           ├── div.cly-vue-drawer__step-separator[drawer-test-id-seperator-0]
                                │                 │           ├── div.cly-vue-drawer__step-label[drawer-test-id-step-2-label]
                                │                 │           │     ├── span[drawer-test-id-current-step-index-2] "2"
                                │                 │           │     └── div[drawer-test-id-customization-label] "Customization"
                                │                 │           ├── div.cly-vue-drawer__step-separator[drawer-test-id-seperator-1]
                                │                 │           ├── div.cly-vue-drawer__step-label[drawer-test-id-step-3-label]
                                │                 │           │     ├── span[drawer-test-id-current-step-index-3] "3"
                                │                 │           │     └── div[drawer-test-id-customization-label] "Targeting"   ← SAME test-id as step 2 (known bug)
                                │                 │           ├── div.cly-vue-drawer__step-separator[drawer-test-id-seperator-2]
                                │                 │           └── div.cly-vue-drawer__step-label[drawer-test-id-step-4-label]
                                │                 │                 ├── span[drawer-test-id-current-step-index-4] "4"
                                │                 │                 └── div[drawer-test-id-review-label] "Review"
                                │                 └── div.cly-vue-drawer__footer
                                │                       ├── button.el-button--secondary.el-button--small[drawer-test-id-cancel-button] "Cancel"
                                │                       └── button.el-button--success.el-button--small[drawer-test-id-next-step-button] "Next step"
                                └── div.cly-vue-main                                      [Main builder]
                                      └── div.journey-builder-layout
                                            └── div.cly-vue-content-builder
                                                  ├── div.cly-vue-content-builder__layout-header
                                                  │     └── div.cly-vue-content-builder-header
                                                  │           ├── div.cly-vue-content-builder-header__left
                                                  │           │     ├── div.cly-vue-content-builder-header__close-button[close-icon]
                                                  │           │     │     └── i.cly-io.cly-io-x
                                                  │           │     └── div.cly-vue-content-builder-header__info
                                                  │           │           ├── div.cly-vue-content-builder-header__input-container[content-header-input-container]
                                                  │           │           │     └── div.cly-vue-content-builder-header__input.el-input
                                                  │           │           │           └── input[content-header-input][type=text]
                                                  │           │           └── div.cly-vue-content-builder-header__created-by[created-by-label]
                                                  │           ├── div.cly-vue-content-builder-header__tabs
                                                  │           │     └── div.cly-vue-tabs
                                                  │           │           └── div.cly-vue-tabs__primary-tab-list
                                                  │           │                 ├── div.cly-vue-tabs__tab.--primary.--primary-active
                                                  │           │                 │     └── span[tab-editor-title] "Editor"
                                                  │           │                 └── div.cly-vue-tabs__tab.--primary.has-tooltip
                                                  │           │                       └── span[tab-results-title] "Results"
                                                  │           └── div.cly-vue-content-builder-header__actions
                                                  │                 ├── button.el-button--success.el-button--small.is-disabled[content-header-save-button] "Save"
                                                  │                 ├── button.el-button--success.el-button--small.is-disabled[journey-publish-button] "Publish"
                                                  │                 └── div.cly-vue-dropdown.el-select.cly-vue-more-options
                                                  │                       ├── button[content-header-more-option-button]
                                                  │                       │     └── i.el-icon-more
                                                  │                       └── div.cly-vue-dropdown__pop
                                                  │                             ├── li[more-button-option-duplicate] "Duplicate journey"
                                                  │                             └── li[more-button-option-delete] "Delete journey"
                                                  └── div.cly-vue-content-builder__layout-main
                                                        ├── div.journey-builder-layout__flow
                                                        │     └── div.journey-builder-layout__flow__chart
                                                        │           └── div.cly-journey-flow-container
                                                        │                 └── div.cly-journey-flow
                                                        │                       └── div.vue-flow
                                                        │                             └── div.vue-flow__nodes
                                                        │                                   └── div.vue-flow__node.journey-button
                                                        │                                         ├── div.journey-start
                                                        │                                         │     ├── i.cly-is.cly-is-play.journey-start__icon
                                                        │                                         │     └── span.journey-start__text "Start"
                                                        │                                         └── div.cly-journey-add-button-node.--active.--trigger
                                                        │                                               └── div[journey-button-add-trigger] "+ Add trigger"
                                                        └── div.cly-vue-content-builder__layout-main__body__right-sidebar
                                                              ├── h4 "Triggers"
                                                              └── div.cly-journey-block-list
                                                                    ├── div.cly-journey-block-list__category   [PROFILE]
                                                                    │     ├── h3[journey-triggers-block-list-category-label-profile] "PROFILE"
                                                                    │     ├── div.cly-journey-block-list__item[...-box-profile-update]
                                                                    │     │     ├── div.cly-journey-block-list__item-icon.cly-is.cly-is-user-add.journey-block__icon.color-charts-magenta.bg-charts-light-magenta[...-icon-profile-update]
                                                                    │     │     └── div.cly-journey-block-list__item-details[...-details-profile-update]
                                                                    │     │           ├── div[...-name-profile-update] "Profile update"
                                                                    │     │           └── div[...-description-profile-update] "Trigger when a user profile is updated"
                                                                    │     ├── div.cly-journey-block-list__item[...-box-profile-group-entry]
                                                                    │     │     ├── div[...-name-profile-group-entry] "Profile group entry"
                                                                    │     │     └── div[...-description-profile-group-entry] "..."
                                                                    │     └── div.cly-journey-block-list__item[...-box-profile-group-exit]
                                                                    │           ├── div[...-name-profile-group-exit] "Profile group exit"
                                                                    │           └── div[...-description-profile-group-exit] "..."
                                                                    ├── div.cly-journey-block-list__category   [COHORT]
                                                                    │     ├── h3[journey-triggers-block-list-category-label-cohort] "COHORT"
                                                                    │     ├── div.cly-journey-block-list__item[...-box-cohort-entry]
                                                                    │     └── div.cly-journey-block-list__item[...-box-cohort-exit]
                                                                    ├── div.cly-journey-block-list__category   [JOURNEY]
                                                                    │     ├── h3[journey-triggers-block-list-category-label-journey] "JOURNEY"
                                                                    │     └── div.cly-journey-block-list__item[...-box-journey-exit]
                                                                    └── div.cly-journey-block-list__category   [INCOMING DATA]
                                                                          ├── h3[journey-triggers-block-list-category-label-incoming-data] "INCOMING DATA"
                                                                          ├── div.cly-journey-block-list__item[...-box-consent]
                                                                          ├── div.cly-journey-block-list__item[...-box-crash]
                                                                          ├── div.cly-journey-block-list__item[...-box-push-action]
                                                                          ├── div.cly-journey-block-list__item[...-box-session]
                                                                          ├── div.cly-journey-block-list__item[...-box-view]
                                                                          ├── div.cly-journey-block-list__item[...-box-events]
                                                                          └── div.cly-journey-block-list__item[...-box-feedback]
```

### 4.2 Known Issues in HTML Source

1. **Typo in separator test-ids**: All drawer step separators use `seperator` (misspelled) instead of `separator`:
   - `drawer-test-id-seperator-0`
   - `drawer-test-id-seperator-1`
   - `drawer-test-id-seperator-2`
   - Tests targeting these elements must use the misspelled form to match the actual DOM.

2. **Duplicate label test-id**: Steps 2 and 3 both use `drawer-test-id-customization-label` as the label container test-id. Step 3 displays "Targeting" text but shares the test-id with Step 2 ("Customization"). When writing tests, use the step container test-id (`drawer-test-id-step-3-label`) to scope correctly.

---

## Part 6: Localization & Data Rules

### 6.1 Data Classification

| Label/Value | Tag | Notes |
|-------------|-----|-------|
| "Journeys" (page title) | `[STATIC/i18n]` | Translatable string |
| "Library" (tab) | `[STATIC/i18n]` | Translatable string |
| "Last queries" | `[STATIC/i18n]` | Translatable string |
| Last queries count "0" | `[DYNAMIC/DB]` | Real-time count from backend |
| "New Journey" | `[STATIC/i18n]` | Translatable string |
| Journey name (input) | `[DYNAMIC/DB]` | User-entered, stored in DB |
| "Created by {user}" | `[DYNAMIC/DB]` | Populated from user session |
| "Editor" / "Results" | `[STATIC/i18n]` | Translatable strings |
| "Save" / "Publish" | `[STATIC/i18n]` | Translatable strings |
| "Duplicate journey" | `[STATIC/i18n]` | Translatable string |
| "Delete journey" | `[STATIC/i18n]` | Translatable string |
| "Start" (canvas node) | `[STATIC/FIXED]` | Fixed, not translatable |
| "+ Add trigger" | `[STATIC/i18n]` | Translatable string |
| "Triggers" (sidebar heading) | `[STATIC/i18n]` | Translatable string |
| All trigger category labels (PROFILE, COHORT, etc.) | `[STATIC/i18n]` | Uppercase display labels |
| All trigger names | `[STATIC/i18n]` | Translatable strings |
| All trigger descriptions | `[STATIC/i18n]` | Translatable strings |
| "Settings and questions" | `[STATIC/i18n]` | Drawer step label |
| "Customization" | `[STATIC/i18n]` | Drawer step label |
| "Targeting" | `[STATIC/i18n]` | Drawer step label |
| "Review" | `[STATIC/i18n]` | Drawer step label |
| "Cancel" / "Next step" | `[STATIC/i18n]` | Drawer footer buttons |
| "Enter a survey name" | `[DYNAMIC/DB]` | Editable survey title |
| "Type your question here" | `[DYNAMIC/DB]` | Editable question text |
| "Submit" | `[STATIC/i18n]` | Survey widget button |
| "Thank you message" | `[STATIC/i18n]` | Preview stage label |
| "Thanks for your feedback!" | `[STATIC/i18n]` | Default thank-you text |
| "Question (1/1)" | `[DYNAMIC]` | Question count formatted dynamically |

### 6.2 i18n Key Patterns

Based on Countly's i18n conventions, expected key patterns:

```
journey.tab.journeys
journey.tab.library
journey.header.title
journey.button.last-queries
journey.button.new-journey
journey.builder.tab.editor
journey.builder.tab.results
journey.builder.save
journey.builder.publish
journey.builder.duplicate
journey.builder.delete
journey.canvas.start
journey.canvas.add-trigger
journey.sidebar.triggers
journey.trigger.profile.title
journey.trigger.profile.update.name
journey.trigger.profile.update.description
journey.trigger.profile.group-entry.name
journey.trigger.profile.group-entry.description
journey.trigger.profile.group-exit.name
journey.trigger.profile.group-exit.description
journey.trigger.cohort.entry.name
journey.trigger.cohort.entry.description
journey.trigger.cohort.exit.name
journey.trigger.cohort.exit.description
journey.trigger.journey.exit.name
journey.trigger.journey.exit.description
journey.trigger.incoming.consent.name
journey.trigger.incoming.consent.description
journey.trigger.incoming.crash.name
journey.trigger.incoming.crash.description
journey.trigger.incoming.push-action.name
journey.trigger.incoming.push-action.description
journey.trigger.incoming.session.name
journey.trigger.incoming.session.description
journey.trigger.incoming.view.name
journey.trigger.incoming.view.description
journey.trigger.incoming.events.name
journey.trigger.incoming.events.description
journey.trigger.incoming.feedback.name
journey.trigger.incoming.feedback.description
journey.ias.step1.label
journey.ias.step2.label
journey.ias.step3.label
journey.ias.step4.label
journey.ias.cancel
journey.ias.next-step
```

### 6.3 Dynamic Data Sources

| Field | Source |
|-------|--------|
| Last queries count | Journey query history API |
| Journey name | Journey record in DB |
| Created by | User session / journey record |
| Survey name preview | Current IAS draft in state |
| Question text preview | Current IAS draft in state |
| Question count (1/1) | Computed from IAS question array length |

---

## Appendix: Complete data-test-id Reference

| data-test-id | Element Type | Description |
|-------------|-------------|-------------|
| `tab-journeys-title` | span | "Journeys" main tab |
| `tab-library-link` | a | Library tab anchor |
| `tab-library-title` | span | "Library" tab label |
| `header-title` | div | Page header left section |
| `header-title-tooltip` | i | Help icon tooltip trigger |
| `last-queries-button` | button | Last queries button |
| `new-journey-button` | button | Create new journey |
| `close-icon` | div | Builder close button |
| `content-header-input-container` | div | Journey name input wrapper |
| `content-header-input` | input | Journey name text input |
| `created-by-label` | div | Attribution label |
| `tab-editor-title` | span | Editor tab label |
| `tab-results-title` | span | Results tab label |
| `content-header-save-button` | button | Save button (disabled default) |
| `journey-publish-button` | button | Publish button (disabled default) |
| `content-header-more-option-button` | button | More options kebab |
| `more-button-option-duplicate` | li | Duplicate journey option |
| `more-button-option-delete` | li | Delete journey option |
| `journey-button-add-trigger` | div | Add trigger button on canvas |
| `journey-triggers-block-list-category-label-profile` | h3 | PROFILE category header |
| `journey-triggers-block-list-category-label-cohort` | h3 | COHORT category header |
| `journey-triggers-block-list-category-label-journey` | h3 | JOURNEY category header |
| `journey-triggers-block-list-category-label-incoming-data` | h3 | INCOMING DATA category header |
| `journey-triggers-block-list-item-box-{slug}` | div | Trigger item container (13 total) |
| `journey-triggers-block-list-item-icon-{slug}` | div | Trigger item icon |
| `journey-triggers-block-list-item-details-{slug}` | div | Trigger item details wrapper |
| `journey-triggers-block-list-item-name-{slug}` | div | Trigger item name |
| `journey-triggers-block-list-item-description-{slug}` | div | Trigger item description |
| `drawer-test-id-header-title` | h3 | IAS drawer title |
| `drawer-test-id-steps-header-container` | div | IAS steps progress bar |
| `drawer-test-id-step-{1-4}-label` | div | Step label container |
| `drawer-test-id-current-step-index-{1-4}` | span | Step number |
| `drawer-test-id-settings-and-questions-label` | div | Step 1 label text |
| `drawer-test-id-customization-label` | div | Step 2 & 3 label text (shared — known bug) |
| `drawer-test-id-review-label` | div | Step 4 label text |
| `drawer-test-id-seperator-{0-2}` | div | Step separators (typo: "seperator") |
| `drawer-test-id-cancel-button` | button | IAS drawer cancel |
| `drawer-test-id-next-step-button` | button | IAS drawer next step |
| `preview-question-label-1` | div | Survey preview question label |
| `nps-preview-nps-widget-title-label` | div | Survey name preview |
| `nps-preview-nps-widget-close-icon` | div | Survey close icon |
| `surveys-widget-preview-default-logo` | img | Survey logo image |
| `surveys-widget-preview-submit-button` | div | Survey submit button preview |
| `survey-preview-thank-you-message-label` | div | Thank you stage label |
| `nps-preview-nps-widget-centered-text-label` | div | Thank you message text |

**Trigger slugs for `{slug}` pattern (13 total):**
- `profile-update`
- `profile-group-entry`
- `profile-group-exit`
- `cohort-entry`
- `cohort-exit`
- `journey-exit`
- `consent`
- `crash`
- `push-action`
- `session`
- `view`
- `events`
- `feedback`
