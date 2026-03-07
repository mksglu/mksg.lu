# Countly Cohort Creation Drawer — Visual & Style Specification

> Extracted from live instance at `http://mert.count.ly/dashboard#/6908ab02fece9ef06eca7285/cohorts`
> Date: 2026-02-27 | Viewport: 1200x948
> Extraction Method: Chrome DevTools Protocol (CDP) — `CSS.getComputedStyleForNode` + `CSS.getMatchedStylesForNode`

---

## Design Tokens

### Color Palette

| Token | Hex | RGB | Usage |
|---|---|---|---|
| **Primary Blue** | `#0166D6` | `rgb(1, 102, 214)` | Focus ring border, active tabs, selected items, links, checked radio |
| **Success Green** | `#12AF51` | `rgb(18, 175, 81)` | Add Condition, Apply, Create buttons |
| **Success Green Hover** | `#10A14A` | `rgb(16, 161, 74)` | Create button hover |
| **Text Primary** | `#333C48` | `rgb(51, 60, 72)` | Labels, titles, input text, body text, buttons |
| **Text Secondary** | `#7A7A7A` | `rgb(122, 122, 122)` | Radio description text |
| **Text Muted** | `#858A91` | `rgb(133, 138, 145)` | Inactive tab text |
| **Icon Gray** | `#81868D` | `rgb(129, 134, 141)` | Close button, delete icon, placeholder (final override) |
| **Icon Muted** | `#A7AEB8` | `rgb(167, 174, 184)` | Tooltip icon, placeholder (base), dropdown panel borders, unchecked radio border |
| **Text Disabled** | `#D6D6D6` | `rgb(214, 214, 214)` | Disabled input text |
| **White** | `#FFFFFF` | `rgb(255, 255, 255)` | Panel backgrounds, active radio text, selected item text |
| **BG Input** | `#FBFDFE` | `rgb(251, 253, 254)` | Text input background |
| **BG Disabled** | `#F6F6F6` | `rgb(246, 246, 246)` | Disabled inputs, hover background, cancel button, search input bg |
| **BG Spinner Button** | `#F5F7FA` | `rgb(245, 247, 250)` | Number spinner increase/decrease buttons |
| **BG Warning** | `#FCF5E5` | `rgb(252, 245, 229)` | Warning banner |
| **Border Input** | `#CFD6E4` | `rgb(207, 214, 228)` | Input borders |
| **Border Strong** | `#A7AEB8` | `rgb(167, 174, 184)` | Dropdown panel borders |
| **Border Light** | `#E2E4E8` | `rgb(226, 228, 232)` | Radio button inactive border, header border |
| **Border Divider** | `#ECECEC` | `rgb(236, 236, 236)` | Footer border, dashed separators, spinner internal borders |
| **Focus Ring** | `#E1EFFF` | `rgb(225, 239, 255)` | Focus box-shadow (0 0 0 3px) |
| **Error Border** | `#D23F00` | `rgb(210, 63, 0)` | Validation error border |
| **Error BG** | `#FBECE5` | `rgb(251, 236, 229)` | Validation error background |
| **Close Hover** | `#333333` | `rgb(51, 51, 51)` | Close button hover |

### Box Shadows

| Token | Value | Usage |
|---|---|---|
| Shadow Button | `0 2px 4px rgba(0, 0, 0, 0.048)` | Buttons (Cancel, Create, Apply) |
| Shadow Select | `0 1px 4px rgba(0, 0, 0, 0.08)` | Select dropdown triggers |
| Shadow Popover | `0 2px 7px rgba(0, 0, 0, 0.188)` | Frequency popover |
| Focus Ring | `0 0 0 3px #E1EFFF` | Input/select focus state |

### Typography

| Element | Font | Size | Weight | Line-Height |
|---|---|---|---|---|
| Drawer (base) | Inter | 16px | 400 | normal |
| Header Title (H3) | Inter | 20px | 500 | 30px |
| Section Titles | Inter | 16px | 500 | 24px |
| Form Labels | Inter | 13px | 500 | 16px |
| Body Text / "Users who" | Inter | 14px | 400 | 20px |
| Input Text | Inter | 14px | 400 | 32px |
| Button Text | Inter | 14px | 400 | 14px |
| Tab Items | Inter | 14px | 500 | 40px |
| List Items (property) | Inter | 14px | 500 | 16px |
| List Items (operator) | Inter | 13px | 500 | 16px |
| Add Property Link | Inter | 13px | 500 | - |
| Radio Description | Inter | 12px | 400 | 18px |
| Close Button Icon | Ionicons | 30px | 400 | normal |
| Tooltip Icon | Ionicons | 17px | 400 | 17px |

### Transitions

| Element | Property | Duration | Timing |
|---|---|---|---|
| Close Button | `color` | `1s` | `ease` |
| Buttons (Cancel, Create) | `all` | `0.1s` | `ease` |
| Tab Active Bar | `transform` | `0.3s` | `cubic-bezier(.645, .045, .355, 1)` |
| Radio Inner Dot | `transform` | `0.15s` | `ease-in` |
| Input | `none` | - | - |

---

## Part A — Drawer Container & Layout

### A1. Drawer Container

**Selector:** `.cly-vue-drawer.is-open.cly-vue-drawer--full-screen`

| Property | Value |
|---|---|
| position | `fixed` |
| top / right / bottom / left | `0px` |
| z-index | `2001` |
| width / height | `100%` |
| background-color | `rgba(0, 0, 0, 0)` — transparent, no overlay in full-screen |
| font-family | `Inter` |
| font-size | `16px` |
| display | `block` |
| overflow | `visible` |
| border | none |
| box-shadow | none |

```css
.cly-vue-drawer {
  position: fixed;
  height: 100%;
  right: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0);
  z-index: 2001;
  width: 100%;
}
```

**Overlay:** Full-screen drawer does NOT render a separate overlay/backdrop. The drawer itself covers the viewport.

### A2. Steps View (White Panel)

**Selector:** `.cly-vue-drawer__steps-view`

| Property | Value |
|---|---|
| background-color | `#FFFFFF` |
| position | `absolute` |
| right | `0px` |
| width | `100%` (full-screen) / `674px` (normal) |
| height | `100%` |

```css
.cly-vue-drawer__steps-view {
  box-sizing: border-box;
  position: absolute;
  right: 0;
  background-color: #fff;
}
.cly-vue-drawer--full-screen .cly-vue-drawer__steps-view {
  width: 100%;
}
```

### A3. Steps Wrapper

**Selector:** `.cly-vue-drawer__steps-wrapper`

| Property | Value |
|---|---|
| display | `flex` |
| flex-direction | `column` |
| height | `100%` |

### A4. Drawer Header

**Selector:** `.cly-vue-drawer__header`

| Property | Value |
|---|---|
| border-bottom | `1px solid #E2E4E8` (non-fullscreen only) |
| padding | `0` |

**Full-screen variant:** `.cly-vue-drawer__header.is-full-screen`

| Property | Value |
|---|---|
| max-width | `700px` |
| width | `700px` |
| padding | `0 calc(50% - 350px)` |
| border-bottom | `none` |

```css
.cly-vue-drawer__header:not(.is-full-screen) {
  border-bottom: 1px solid #E2E4E8;
}
.cly-vue-drawer--full-screen .cly-vue-drawer__header {
  max-width: 700px;
  width: 700px;
  padding: 0 calc(50% - 350px);
}
```

### A5. Header Title

**Selector:** `.cly-vue-drawer__steps-container h3`
**Content:** "+ Create New Cohort"

| Property | Value |
|---|---|
| font-size | `20px` |
| font-weight | `500` |
| color | `#333C48` |
| line-height | `30px` |

### A6. Close Button

**Selector:** `.cly-vue-drawer__close-button`

| Property | Value |
|---|---|
| display | `flex` |
| align-items / justify-content | `center` |
| font-size | `30px` |
| color | `#81868D` |
| cursor | `pointer` |
| height | `24px` (full-screen) |
| width | `40px` (full-screen) |
| transition | `color 1s ease` |

```css
.cly-vue-drawer__close-button:hover {
  color: #333;
  transition: color 1s;
}
```

Icon: `.ion-ios-close-empty` — rendered via Ionicons font.

### A7. Content Area

**Selector:** `.cly-vue-drawer__steps-container`

| Property | Value |
|---|---|
| width / height | `100%` |
| overflow-x | `hidden` |
| overflow-y | `auto` |
| margin-top | `12px` |

```css
.cly-vue-drawer--full-screen .cly-vue-drawer__steps-container {
  max-width: 700px;
  width: 700px;
  padding: 0 calc(50% - 350px);
}
```

### A8. Body Container

**Selector:** `.cly-vue-drawer__body-container`

| Property | Value |
|---|---|
| display | `flex` |
| flex-direction | `row` |
| padding | `16px 0 24px 0` |
| margin | `4px 32px 8px 32px` |

### A9. Form Labels

**Selector:** `.font-weight-bold.text-smallish`

| Property | Value |
|---|---|
| font-size | `13px` |
| font-weight | `500` |
| color | `#333C48` |
| line-height | `16px` |
| margin-bottom | `8px` |

### A10. Text Inputs (el-input)

**Selector:** `.el-input__inner`

| Property | Value |
|---|---|
| background-color | `#FBFDFE` |
| color | `#333C48` |
| font-size | `14px` |
| height | `32px` |
| line-height | `32px` |
| padding | `0 10px` |
| border | `1px solid #CFD6E4` |
| border-radius | `4px` |
| width | `100%` |

```css
/* Focus */
.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border-color: #0166D6;
  box-shadow: 0 0 0 3px #E1EFFF;
  outline: 0;
}

/* Error */
.el-form-item.is-error .el-input__inner:focus {
  border-color: #D23F00;
  background-color: #FBECE5;
}

/* Placeholder */
.el-input__inner::placeholder {
  color: #81868D;
}
```

### A11. Section Titles

**Selector:** `.text-big.text-heading`

| Property | Value |
|---|---|
| font-size | `16px` |
| font-weight | `500 !important` |
| color | `#333C48` |
| line-height | `24px` |
| margin-bottom | `16px` |

```css
.text-big { color: #333c48; font-size: 16px; font-weight: 400; line-height: 22px; }
.text-heading.text-big { line-height: 24px; font-weight: 500 !important; margin-bottom: 16px; }
```

### A12. Tooltip Icon

**Selector:** `.cly-vue-tooltip-icon`

| Property | Value |
|---|---|
| font-size | `17px` |
| font-family | `Ionicons` |
| color | `#A7AEB8` |
| width / height | `18px` |
| display | `inline-block` |
| cursor | `pointer` |

### A13. Form Section

**Selector:** `.cly-vue-form-step__section`

| Property | Value |
|---|---|
| padding | `12px 0` |

```css
/* Full-screen override */
.cly-vue-drawer__steps-wrapper .cly-vue-drawer__steps-container .cly-vue-form-step__section {
  padding: 12px 24px !important;
}
```

---

## Part B — User Property Segmentation

### B1. Grid Layout

**Selector:** `.bu-columns.bu-is-gapless.bu-is-mobile`

| Property | Value |
|---|---|
| display | `flex` |
| margin | `0` (gapless) |
| column gap | `margin-right: 4px` per column |

| Column Class | Width | Content |
|---|---|---|
| `.bu-is-4` | ~217px | Property select / Value input |
| `.bu-is-3` | ~163px | Operator select |
| `.bu-is-1` | ~54px | Delete button |

### B2. Property Select Trigger (Closed)

**Selector:** `.cly-vue-qb-seg .cly-vue-select-x`

| Property | Value |
|---|---|
| display | `inline-block` |
| position | `relative` |
| height | `32px` |
| width | `217.328px` |
| box-shadow | `0 1px 4px rgba(0, 0, 0, 0.08)` |

**Inner input:** `.cly-vue-select-x .el-input__inner`

| Property | Value |
|---|---|
| background-color | `#FFFFFF` |
| border | `1px solid #CFD6E4` |
| color | `#333C48` |
| font-size | `14px` |
| height | `32px` |
| padding | `0 30px 0 10px` |
| cursor | `pointer` |

### B3. Property Select Dropdown Panel (Open)

**Selector:** `[x-placement] .el-select-dropdown.cly-vue-dropdown__pop`

| Property | Value |
|---|---|
| position | `fixed` (body-level popper) |
| background-color | `#FFFFFF` |
| border | `1px solid #A7AEB8` |
| border-radius | `4px` |
| width | `400px` |
| height | `414px` |
| z-index | `2040` |
| margin-top | `6px` |
| margin-bottom | `5px` |
| padding | `0` |

**Pop container:** `.cly-vue-dropdown__pop-container` — `398px × 412px`

### B4. Dropdown Search Input

**Selector:** `[x-placement] .el-input__inner` (focused)

| Property | Value |
|---|---|
| background-color | `#F6F6F6` |
| border | `1px solid #0166D6` |
| box-shadow | `0 0 0 3px #E1EFFF` |
| color | `#333C48` |
| font-size | `14px` |
| height | `32px` |
| padding-left | `30px` (prefix icon) |
| width | `366px` |

### B5. Dropdown Tabs

**Active tab:** `.el-tabs__item.is-active`

| Property | Value |
|---|---|
| color | `#333C48` |
| font-size | `14px` |
| font-weight | `500` |
| height / line-height | `40px` |
| padding | `0 20px` (first: `0 20px 0 0`) |

**Inactive tab:** `.el-tabs__item:not(.is-active)`

| Property | Value |
|---|---|
| color | `#858A91` |
| font-size | `14px` |
| font-weight | `500` |
| height / line-height | `40px` |
| padding | `0 20px` |

**Active bar:** `.el-tabs__active-bar`

| Property | Value |
|---|---|
| position | `absolute` |
| bottom | `0` |
| height | `2px` |
| background-color | `#0166D6` |
| z-index | `1` |
| transition | `transform .3s cubic-bezier(.645, .045, .355, 1)` |

**Tab scroll arrow:** `.el-tabs__nav-next` — `#81868D`, `12px`, `cursor: pointer`, `z-index: 100`

### B6. Property List Items

**Normal:** `.cly-vue-listbox__item`

| Property | Value |
|---|---|
| display | `flex` |
| align-items | `center` |
| justify-content | `space-between` |
| color | `#333C48` |
| font-size | `14px` |
| font-weight | `500` |
| line-height | `16px` |
| padding | `8px` |
| margin | `8px` |
| border-radius | `4px` |
| cursor | `pointer` |

```css
/* Hover */
.cly-vue-listbox--has-default-skin .cly-vue-listbox__item:hover {
  background: #F6F6F6;
}
/* Selected */
.cly-vue-listbox__item.is-selected {
  background: #0166D6;
  color: #FFF;
}
```

### B7. Operator Dropdown Panel

**Selector:** `.el-select-dropdown.el-popper`

| Property | Value |
|---|---|
| background-color | `#FFFFFF` |
| border | `1px solid #A7AEB8` |
| border-radius | `4px` |
| width | `163px` |
| min-width | `163px` |
| z-index | `2042` |
| margin-top | `6px` |

### B8. Operator Dropdown Items

**Selector:** `.el-select-dropdown__item`

| Property | Value |
|---|---|
| color | `#333C48` |
| font-size | `13px` |
| font-weight | `500` |
| line-height | `16px` |
| padding | `7px 6px` |
| margin | `8px` |
| border-radius | `4px` |
| cursor | `pointer` |
| max-width | `300px` |
| text-overflow | `ellipsis` |

```css
/* Hover */
.el-select-dropdown__item:hover,
.el-select-dropdown__item.hover {
  background: #F6F6F6;
}
/* Selected */
.el-select-dropdown__item.selected {
  color: #0166D6;
  font-weight: 600;
}
```

### B9. Value Text Input (Disabled — no operator selected)

**Selector:** `.el-input.is-disabled .el-input__inner`

| Property | Value |
|---|---|
| background-color | `#F6F6F6` |
| color | `#D6D6D6` |
| border | `1px solid #CFD6E4` |
| cursor | `not-allowed` |
| height | `32px` |
| padding | `0 30px 0 10px` |

### B10. Value Text Input (Enabled — STRING "is")

| Property | Value |
|---|---|
| background-color | `#FFFFFF` |
| border | `1px solid #CFD6E4` |
| color | `#333C48` |
| font-size | `14px` |
| height | `32px` |
| padding | `0 10px` |
| cursor | `pointer` |

### B11. Number Spinner

**Selector:** `.el-input-number.is-slim.el-input-number--small.is-controls-right`

| Property | Value |
|---|---|
| display | `inline-block` |
| position | `relative` |
| width | `93px` (43% of column, inline style) |
| height | `32px` |
| line-height | `30px` |

**Spinner buttons:** `.el-input-number__increase` / `.el-input-number__decrease`

| Property | Increase (top) | Decrease (bottom) |
|---|---|---|
| position | `absolute` | `absolute` |
| width | `22px` | `22px` |
| height | `15px` | `15px` |
| background-color | `#F5F7FA` | `#F5F7FA` |
| color | `#333C48` | `#333C48` |
| cursor | `pointer` | `pointer` |
| border-radius | `0 4px 0 0` | `0 0 4px 0` |
| border-bottom | `1px solid #ECECEC` | none |
| border-left | `1px solid #ECECEC` | `1px solid #ECECEC` |

### B12. "is between" Dual Spinner Layout

| Component | Details |
|---|---|
| Container | `span.cly-vue-qb-seg__row-wrapper` (display: inline) |
| Each spinner | `el-input-number` with `style="width: 43%"` |
| Separator | `span.bu-mx-1` containing "—" dash (margin: 0 4px) |

### B13. Yes/No Dropdown ("is set" operator)

Same as operator select — `el-select` with:

| Property | Value |
|---|---|
| background-color | `#FFFFFF` |
| border | `1px solid #CFD6E4` |
| height | `32px` |
| width | `217px` |
| box-shadow (wrapper) | `0 1px 4px rgba(0, 0, 0, 0.08)` |
| cursor | `pointer` |

Options: `yes`, `no`

### B14. AND/OR Radio Buttons

**Container:** `.el-radio-group` — `display: inline-block`

**AND Button (Active):** `.el-radio-button__inner` (checked)

| Property | Value |
|---|---|
| background-color | `#0166D6` |
| color | `#FFFFFF` |
| border | `1px solid #0166D6` |
| border-radius | `4px 0 0 4px` |
| padding | `8px 12px` |
| font-size | `14px` |
| line-height | `14px` |
| box-shadow | `none !important` |

**OR Button (Inactive):** `.el-radio-button__inner` (unchecked)

| Property | Value |
|---|---|
| background-color | `#FFFFFF` |
| color | `#333C48` |
| border | `1px solid #E2E4E8` |
| border-left | `0` (collapsed) |
| border-radius | `0 4px 4px 0` |
| padding | `8px 12px` |

### B15. "+ Add property" Link

**Selector:** `.cly-text-button`

| Property | Value |
|---|---|
| color | `#0166D6 !important` |
| font-size | `13px` |
| font-weight | `500` |
| cursor | `pointer` |
| border-radius | `4px` |

```css
.cly-text-button--disabled {
  cursor: default;
  color: #81868d;
  opacity: .7;
}
```

### B16. Delete Row Button (×)

**Selector:** `.cly-icon-button.cly-icon-button--gray` / `.cly-vue-qb-icon`

| Property | Value |
|---|---|
| color | `#81868D` |
| width / height | `26px` |
| border-radius | `8px` |
| display | `flex` |
| justify-content / align-items | `center` |
| cursor | `pointer` |

```css
.cly-vue-qb-icon:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
```

---

## Part C — User Behavior Segmentation

### C1. "+ Add Condition" Button

**Selector:** `.el-button--success.el-button--small`

| Property | Value |
|---|---|
| background-color | `#12AF51` |
| color | `#FFFFFF` |
| border | `1px solid #12AF51` |
| border-radius | `4px` |
| padding | `8px 12px` |
| font-size | `14px` |
| line-height | `14px` |
| box-shadow | `0 2px 4px rgba(0, 0, 0, 0.048)` |
| cursor | `pointer` |
| transition | `0.1s` |

```css
.el-button--success:hover { background: #3FB866; border-color: #3FB866; }
```

### C2. "Users who" Prefix Text

**Selector:** `.text-medium.bu-px-1.bu-pb-1`

| Property | Value |
|---|---|
| color | `#333C48` |
| font-size | `14px` |
| font-weight | `400` |
| line-height | `20px` |
| padding | `0 4px 4px 4px` |

### C3. Behavior Type Dropdown (performed / didn't perform)

**Selector:** `.el-select .el-input__inner`

| Property | Value |
|---|---|
| background-color | `#FFFFFF` |
| color | `#333C48` |
| font-size | `14px` |
| height | `32px` |
| border | `1px solid #CFD6E4` |
| border-radius | `4px` |
| padding | `0 10px` |
| width | `120px` |
| cursor | `pointer` |

### C4. Event Select Trigger (Closed)

**Selector:** `.cly-vue-dropdown.el-select` / `.el-input__inner--auto-resize`

| Property | Value |
|---|---|
| background-color | `#FFFFFF` |
| color | `#333C48` |
| height | `32px` |
| border | `1px solid #CFD6E4` |
| border-radius | `4px` |
| padding | `0 10px` |
| min-width | `100px` |
| max-width | `120px` |
| box-shadow (container) | `0 1px 4px rgba(0, 0, 0, 0.08)` |
| overflow | `hidden` / `text-overflow: ellipsis` |

### C5. Event Select Dropdown Panel (Open)

**Selector:** `.el-select-dropdown` / `.cly-vue-dropdown__pop`

| Property | Value |
|---|---|
| background-color | `#FFFFFF` |
| border | `1px solid #A7AEB8` |
| border-radius | `4px` |
| margin | `5px 0` |
| z-index | `1001` |

### C6. Event Dropdown Tabs (Sessions, Events, View, etc.)

**Active tab:** `.el-radio-button__orig-radio:checked + .el-radio-button__inner`

| Property | Value |
|---|---|
| background-color | `#0166D6` |
| color | `#FFFFFF` |
| border-color | `#0166D6` |
| padding | `8px 12px` |
| font-size | `14px` |
| line-height | `14px` |
| box-shadow | `-1px 0 0 0 #0166D6` |

**Inactive tab:** `.el-radio-button__inner` (default)

| Property | Value |
|---|---|
| background-color | `#FFFFFF` |
| color | `#333C48` |
| border | `1px solid #E2E4E8` |
| border-left | `0` (collapsed between tabs) |
| padding | `8px 12px` |
| border-radius | `0` (first: `4px 0 0 4px`, last: `0 4px 4px 0`) |

```css
.cly-event-select .el-radio-group { display: flex; }
.cly-event-select .el-radio-button { flex-grow: 1; }
```

### C7. Event Dropdown List Items

Same as property list items (B6): `#333C48`, `14px`, `500 weight`, `8px padding/margin`, `4px radius`

```css
.cly-vue-listbox--has-default-skin .cly-vue-listbox__item:hover { background-color: #f2f2f2; }
.cly-vue-listbox__item.selected { background: #0166D6; }
.cly-vue-listbox__item.selected * { color: #fff; }
```

### C8. Frequency Selector Trigger ("at least 1 time")

**Selector:** `.el-input__inner--auto-resize` (frequency)

| Property | Value |
|---|---|
| background-color | `#FFFFFF` |
| color | `#333C48` |
| height | `32px` |
| border | `1px solid #CFD6E4` |
| border-radius | `4px` |
| padding | `0 30px 0 10px` |
| min-width | `100px` |
| max-width | `135px` |
| cursor | `pointer` |

### C9. Frequency Popover

**Selector:** `.el-popover`

| Property | Value |
|---|---|
| background-color | `#FFFFFF` |
| border | `1px solid #ECECEC` |
| border-radius | `4px` |
| padding | `14px 0` |
| box-shadow | `0 2px 7px rgba(0, 0, 0, 0.188)` |
| width | `224px` |
| min-width | `150px` |
| z-index | `2000` |
| position | `absolute` |

### C10. Frequency Radio Buttons (At least / Equal to / At most)

**Wrapper:** `.el-radio`

| Property | Value |
|---|---|
| color | `#333C48` |
| font-size | `14px` |
| font-weight | `500` |
| line-height | `14px` |
| margin-right | `30px` (last: `0`) |

**Radio circle (checked):** `.el-radio__inner`

| Property | Value |
|---|---|
| width / height | `16px` |
| border | `1px solid #0166D6` |
| background-color | `#0166D6` |
| border-radius | `100%` |

**Radio circle (unchecked):**

| Property | Value |
|---|---|
| border | `1px solid #A7AEB8` |
| background-color | `#FFFFFF` |

**Inner dot (::after):**
```css
.el-radio__inner::after {
  width: 8px; height: 8px; border-radius: 100%;
  background-color: #FFF;
  position: absolute; left: 50%; top: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform .15s ease-in;
}
.el-radio__input.is-checked .el-radio__inner::after {
  transform: translate(-50%, -50%) scale(1);
}
```

**Radio label:** `font-size: 14px; padding-left: 10px; color: #333C48` (checked inherits)

### C11. Frequency Number Input

**Selector:** `.el-input-number .el-input__inner`

| Property | Value |
|---|---|
| height | `32px` |
| border | `1px solid #CFD6E4` |
| border-radius | `4px` |
| padding | `0 42px` |
| text-align | `center` |
| background-color | `#FFFFFF` |
| color | `#333C48` |

### C12. Frequency Apply Button

**Selector:** `.el-button--success` (inside popover, `width: 100%`)

| Property | Value |
|---|---|
| background-color | `#12AF51` |
| color | `#FFFFFF` |
| border | `1px solid #12AF51` |
| border-radius | `4px` |
| padding | `8px 12px` |
| width | `100%` |
| font-size | `14px` |
| box-shadow | `0 2px 4px rgba(0, 0, 0, 0.048)` |

### C13. Time Range Trigger

**Selector:** `.el-input--prefix.el-input--suffix .el-input__inner`

| Property | Value |
|---|---|
| background-color | `#FFFFFF` |
| color | `#333C48` |
| height | `32px` |
| border | `1px solid #CFD6E4` |
| border-radius | `4px` |
| padding | `0 30px` (left for calendar icon, right for arrow) |
| min-width | `200px` |
| max-width | `220px` |
| cursor | `pointer` |

### C14. Time Range Options

**Active:** `color: #0166D6; font-weight: 500`
**Inactive:** `color: #333C48; font-weight: 500`
**Both:** `font-size: 14px; line-height: 16px; cursor: pointer`

### C15. Step Delete Button

Same as B16 — `.cly-vue-qb-icon.cly-icon-button--gray`: `#81868D`, `26×26px`, `border-radius: 8px`

### C16. AND/OR Between Steps

Same styling as B14 (AND/OR radio buttons). Plus dashed separator:

**Selector:** `.cly-divider.is-dashed`

| Property | Value |
|---|---|
| border-top | `1px dashed #ECECEC` |
| margin | `16px 0` |
| width | `100%` (668px) |

### C17. "which has" Sub-Property Label

**Selector:** `.text-medium.bu-p-1`

| Property | Value |
|---|---|
| color | `#333C48` |
| font-size | `14px` |
| line-height | `20px` |
| padding | `4px` |

---

## Part D — Visibility

### D1. Visibility Container

**Selector:** `.cly-vue-drawer-step__line--aligned`

| Property | Value |
|---|---|
| display | `flex` |
| justify-content | `space-between` |
| align-items | `center` |
| width | `668px` |
| height | `67px` |

### D2. Radio (Unselected — Private)

**Selector:** `.el-radio.is-bordered.is-autosized`

| Property | Value |
|---|---|
| background-color | `#FFFFFF` |
| border | `1px solid #CFD6E4` |
| border-radius | `4px` |
| padding | `16px` |
| display | `flex` |
| align-items | `flex-start` |
| width | `329px` (50% of container) |
| cursor | `pointer` |

### D3. Radio (Selected — Global)

**Selector:** `.el-radio.is-bordered.is-checked`

| Property | Value |
|---|---|
| border-color | `#0166D6` |
| All other properties same as unselected |

```css
.el-radio.is-autosized {
  padding: 16px;
  display: flex;
  width: 100%;
  margin-right: 0;
  height: unset;
  background-color: #fff;
}
.el-radio.is-bordered { border: 1px solid #cfd6e4; }
.el-radio.is-bordered.is-checked { border-color: #0166D6; }
```

### D4. Radio Circle

**Checked:** `.el-radio__input.is-checked .el-radio__inner`

| Property | Value |
|---|---|
| width / height | `16px` |
| border | `1px solid #0166D6` |
| background-color | `#0166D6` |
| border-radius | `100%` |

**Unchecked:** `.el-radio__inner`

| Property | Value |
|---|---|
| border | `1px solid #A7AEB8` |
| background-color | `#FFFFFF` |

**Inner dot (::after):** `8×8px`, `#FFFFFF`, `border-radius: 100%`, `transform: scale(1)` when checked

```css
.el-radio__inner:hover { border-color: #0166D6; }
```

### D5. Radio Label Text

**Selector:** `.cohorts-drawer-radio-visibility-label`

| Property | Value |
|---|---|
| color | `#333C48` |
| font-size | `14px` |
| font-weight | `500` |
| line-height | `14px` |
| margin-top | `1px` |

### D6. Radio Description Text

**Selector:** `.text-small.bu-has-text-grey`

| Property | Value |
|---|---|
| color | `#7A7A7A !important` |
| font-size | `12px` |
| font-weight | `400` |
| line-height | `18px` |

---

## Part E — Warning Banner

### E1. Banner Container

**Selector:** `.cly-in-page-notification--light-warning`

| Property | Value |
|---|---|
| background-color | `#FCF5E5` |
| color | `#333C48` |
| border-radius | `4px` |
| padding | `8px` |
| margin-bottom | `32px` |
| text-align | `center` |
| font-size | `14px` |
| line-height | `20px` |

### E2. "View it" Link

**Selector:** `.cly-in-page-notification--light-warning a`

| Property | Value |
|---|---|
| color | `inherit` (`#333C48`) |
| text-decoration | `none` |
| cursor | `pointer` |

---

## Part F — Footer

### F1. Footer Container

**Selector:** `.cly-vue-drawer__footer`

| Property | Value |
|---|---|
| display | `flex` |
| justify-content | `space-between` |
| align-items | `baseline` |
| padding | `16px` |
| border-top | `1px solid #ECECEC` |

```css
.cly-vue-drawer--full-screen .cly-vue-drawer__footer {
  max-width: 700px;
  width: 700px;
  padding: 0 calc(50% - 350px);
  border: none;
}
.cly-vue-drawer--full-screen .cly-vue-drawer__footer:after {
  content: "";
  width: 685px;
  position: absolute;
  bottom: 63px;
  border-top: 1px solid #ECECEC;
}
```

### F2. Cancel Button

**Selector:** `.el-button--secondary`

| Property | Value |
|---|---|
| background-color | `#F6F6F6` |
| color | `#333C48` |
| border | `1px solid #F6F6F6` |
| border-radius | `4px` |
| padding | `8px 12px` |
| font-size | `14px` |
| box-shadow | `0 2px 4px rgba(0, 0, 0, 0.047)` |
| transition | `all 0.1s ease` |

```css
.el-button--secondary:hover { background: #ECECEC; border-color: #ECECEC; }
.el-button--secondary.is-disabled { opacity: 0.5; }
```

### F3. Create Button

**Selector:** `.el-button--success`

| Property | Value |
|---|---|
| background-color | `#12AF51` |
| color | `#FFFFFF` |
| border | `1px solid #12AF51` |
| border-radius | `4px` |
| padding | `8px 12px` |
| font-size | `14px` |
| height | `32px` |
| margin-left | `8px` |
| box-shadow | `0 2px 4px rgba(0, 0, 0, 0.047)` |
| transition | `all 0.1s ease` |

```css
.el-button--success:hover { background: #10A14A; border-color: #10A14A; }
.el-button--success.is-disabled { opacity: 0.5; cursor: not-allowed; }
```

---

## Component Architecture Notes

1. **Property Select** uses custom `cly-vue-select-x` with `cly-vue-dropdown__pop` panel (400px, tabs + search)
2. **Operator Select** uses standard Element UI `el-select` with `el-select-dropdown.el-popper` panel (163px, no tabs)
3. **Event Select** uses `cly-event-select` variant of `cly-vue-select-x` with radio button tabs
4. **All dropdowns** render as **body-level poppers** with `[x-placement]` attribute (not inside component DOM)
5. **Number spinners** use `el-input-number` with `is-slim is-controls-right` variant
6. **AND/OR (behavior)** uses `el-radio-group` + `el-radio-button` (segmented button look)
7. **Visibility radios** use `el-radio.is-bordered.is-autosized` (card-style bordered radio)
8. **Frequency selector** uses `el-popover` with radio buttons + number input + apply button
9. **Grid** uses Bulma-derived `bu-columns bu-is-gapless` with fractional column classes
10. **Full-screen centering** achieved via `max-width: 700px; padding: 0 calc(50% - 350px)` pattern
