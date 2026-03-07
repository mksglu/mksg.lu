# UI Exploration & PRD Generation — Meta Prompt Template

## Usage
Copy the prompt below, customize `[PLACEHOLDERS]`, paste into Claude Code.

---

### Output Organization Rules

- **One PRD per feature/plugin** — All PRD content for a feature must be in a SINGLE markdown file, not spread across multiple files.
- **Feature-scoped directories** — Each feature gets its own directory under the project root. Example: if working on "Funnel", all output goes under `funnel/` directory.
  - `funnel/PRD.md` — Single combined PRD
  - Do NOT create multiple PRD files (PRD-styles.md, PRD-interactions.md, etc.) — merge everything into one.
  - Do NOT create `prd-assets/` directories or save screenshots — CSS values and HTML structure are sufficient.
- **No root-level PRD sprawl** — Never save PRDs, assets, or temporary files in the project root directory. Always use a feature-scoped subdirectory.
- **Naming convention**: `{feature-name}/PRD.md` (e.g., `cohort-drawer/PRD.md`, `funnel/PRD.md`)

---

## The Prompt

```
I need you to exhaustively document the UI of [APP_NAME]'s [FEATURE_NAME] for a pixel-perfect reimplementation in [TARGET_FRAMEWORK e.g. Vue3/React/etc].

## Context
- URL: [URL]
- Login: mert.koseoglu@count.ly / Mksglu.countly**1
- Target element: [e.g. "Click 'New Cohort' button to open the drawer"]

## Browser Automation

Use `agent-browser` CLI (preferred) or Playwright MCP as fallback.

### agent-browser Quick Reference
```bash
# Navigate & wait
agent-browser open <url>
agent-browser wait --load networkidle
agent-browser wait 2000

# Snapshot (ALWAYS re-snapshot after every click/interaction — refs are invalidated on DOM change)
agent-browser snapshot -i                    # Interactive elements with refs (@e1, @e2)
agent-browser snapshot -i -C                 # Include cursor-interactive elements
agent-browser snapshot -s "#selector"        # Scope to CSS selector

# Interact
agent-browser click @e1
agent-browser fill @e2 "text"
agent-browser select @e1 "option"
agent-browser press Escape
agent-browser scroll down 500

# Semantic locators (when refs don't work)
agent-browser find testid "submit-btn" click
agent-browser find text "Sign In" click

# JavaScript eval (use --stdin for complex JS)
agent-browser eval 'document.title'
agent-browser eval --stdin <<'EVALEOF'
document.querySelector('.el').className
EVALEOF

# Parallel sessions (each subagent MUST use its own session)
agent-browser --session agent1 open <url>
agent-browser --session agent2 open <url>

# Diff
agent-browser diff snapshot

# Close
agent-browser --session agent1 close
```

### CSS Extraction via CDP (when eval is blocked by CSP)
```javascript
async (page) => {
  const client = await page.context().newCDPSession(page);
  const { root } = await client.send('DOM.getDocument');
  const { nodeId } = await client.send('DOM.querySelector', {
    nodeId: root.nodeId, selector: '.my-element'
  });
  const { computedStyle } = await client.send('CSS.getComputedStyleForNode', { nodeId });
  const { matchedCSSRules } = await client.send('CSS.getMatchedStylesForNode', { nodeId });
  const { outerHTML } = await client.send('DOM.getOuterHTML', { nodeId });
}
```

### Fallback: Playwright MCP
If `agent-browser` is unavailable: `browser_navigate`, `browser_snapshot`, `browser_click`, `browser_type`, `browser_run_code`.

---

## Deliverable: Single Unified PRD

All findings go into ONE file: `{feature-name}/PRD.md`

The file has 6 parts. Run subagents in parallel to research each part, then merge results into the single file.

---

## Parallel Execution Strategy

### CRITICAL: Browser Session Isolation

Each subagent that touches the browser MUST use a dedicated named session:
- `--session behavior` for Part 1
- `--session styles` for Part 2
- `--session interactions` for Part 3
- `--session dom` for Part 4
- `--session cee` for Part 5

**WHY**: If two subagents share a session, one agent's click changes the page for the other agent. This causes:
- Wrong snapshots (agent sees other agent's state)
- Invalid refs (other agent navigated away)
- Corrupted data (extracting CSS from wrong element)

### Internal Parallelism Within Each Part

Each subagent can ALSO spawn its own sub-subagents for independent research within its scope:

**Part 2 (Styles) — safe to parallelize internally:**
- Sub-agent A: Extract drawer container + header + footer styles
- Sub-agent B: Extract property segmentation element styles
- Sub-agent C: Extract behavior segmentation element styles
- Sub-agent D: Extract visibility section + warning banner styles
- Each uses its OWN browser session: `--session styles-a`, `--session styles-b`, etc.

**Part 3 (Interactions) — CANNOT parallelize internally:**
- Interactions are SEQUENTIAL by nature (click A → see result → click B)
- One agent, one session, step by step
- BUT: can parallelize documentation after capture

**Part 4 (DOM) — safe to parallelize internally:**
- Sub-agent A: Extract drawer container + header DOM
- Sub-agent B: Extract property section DOM
- Sub-agent C: Extract behavior section DOM
- Sub-agent D: Extract visibility + footer DOM
- Each uses its OWN session

**Part 5 (Cee comparison) — partially parallelizable:**
- Agent A: Open Cee, send prompts, extract AI-rendered form CSS/DOM
- Agent B: Open original drawer, configure matching states, extract CSS/DOM
- THEN: Single agent compares both sets of extracted values
- Agents A and B can run simultaneously with separate sessions

### Summary: What CAN and CANNOT be parallel

| Task | Parallel? | Reason |
|------|-----------|--------|
| Parts 1-5 research | YES | Different browser sessions |
| Style extraction (within Part 2) | YES | Read-only, different sessions |
| DOM extraction (within Part 4) | YES | Read-only, different sessions |
| Interaction capture (Part 3) | NO | Sequential clicks, state-dependent |
| Cee CSS/DOM extraction vs Original extraction | YES | Different sessions |
| Cee comparison analysis | NO | Needs both sets of extracted values first |
| Final merge into single PRD | NO | Needs all parts complete |

---

## Part 1: Functional Behavior

Document all functional behavior, options, and conditional logic.

### Cover:
- Every dropdown option and its complete list of values
- Every form field type and validation rules
- Conditional rendering: which fields appear/disappear based on selections
- All property types and their corresponding operator sets
- All tabs/categories and their items
- Data test-id patterns for every interactive element
- Default values and placeholder text
- Disabled/enabled state conditions
- Warning/error messages and when they appear
- Button states (enabled, disabled, loading)

### Static vs Dynamic Data
For EVERY dropdown/list, determine and tag:
- `[STATIC/i18n]` — UI label, should be localized (e.g. "Select Property", "is set", "All time")
- `[DYNAMIC/DB]` — Data from API/database, display as-is (e.g. property name "Session Count", event name "Login")
- `[STATIC/FIXED]` — Technical value that must not change (e.g. operator key "eq", data-test-id)

Detection method: Use CDP `Network.enable` to watch for API calls when dropdowns open.

---

## Part 2: Design System & Visual Styles

Extract all computed CSS styles, design tokens, and the complete design system.

### Design System Tokens:
- **Color palette**: ALL hex colors with RGB, CSS variable name (if any), and usage context
- **Typography scale**: every distinct font-size/weight/line-height combination, mapped to elements
- **Spacing scale**: all unique padding/margin values, identify if they follow a scale (4px, 8px, 12px, 16px...)
- **Border radius**: all unique values
- **Box shadows**: all unique shadow definitions
- **Transitions**: all unique transitions with property, duration, timing, delay
- **Z-index layers**: all z-index values and usage
- **Icon system**: font family (Ionicons, Material Icons, etc.), icon names/classes

### Per-Element CSS Extraction
For EVERY distinct UI element, extract:

| Property | Value |
|---|---|
| **Selector** | Exact CSS selector path (`.parent > .child.modifier`) |
| **CSS class names** | ALL classes (e.g. `el-button el-button--success el-button--small`) |
| **Component name** | UI library component (e.g. `el-select`, `cly-vue-select-x`) |
| background-color, color | computed values |
| font-size, font-weight, font-family, line-height | computed values |
| padding, margin (all sides) | computed values |
| border (width, style, color per side), border-radius | computed values |
| width, height, min/max | computed values |
| display, position, z-index | computed values |
| cursor, opacity, box-shadow, transition | computed values |
| flex/grid properties | flex-direction, justify-content, align-items, gap |

### State Variants
Extract the above for EACH state: Default, Hover, Focus, Active/Selected, Disabled, Error.

### Authored CSS Rules
Use CDP `CSS.getMatchedStylesForNode` to get actual CSS rules as written in stylesheets.

### Component Library Reference
- Library name + version (Element UI, Ant Design, Vuetify, etc.)
- For each component: library name, variant/modifier classes, custom wrapper classes
- Custom (app-specific) vs library-provided distinction
- Dropdown/popper rendering strategy (body-level portal vs inline)

---

## Part 3: Interaction Flows

Document every click interaction, state transition, and visual change.

### For EVERY interactive element:
1. **Trigger**: What the user clicks/types/selects
2. **Visual Change**: What appears, disappears, or changes
3. **CSS class changes**: Classes added/removed (e.g. `.is-active` added)
4. **Position & Layout**: Where new elements appear relative to trigger
5. **State Dependencies**: What becomes enabled/disabled/visible/hidden
6. **Animation**: Transitions observed (slide-in, fade, instant, duration)
7. **Dropdown behavior**: Close on select? Outside click? Escape?

### Also include:
- State machine diagrams (text-based) for each form section
- Operator-to-value-field mapping table
- Cascading dependency chain (e.g. "Select Property → enables Operator → select Operator → changes Value field")

### CRITICAL — Sub-interaction completeness:
Every "+ Add" button, inline form trigger, or dynamic row generator MUST be clicked and its full result documented:
- What new UI elements appear after clicking?
- What is the complete DOM structure of the added row/form?
- What are the available options in every dropdown within the added UI?
- How does adding multiple items work (indexing, AND/OR connectors, first/last CSS modifiers)?
- What is the validation/completion state that re-enables the "+ Add" button?
- **A button mentioned without its click result documented is a PRD gap that will cause implementation failures.**

---

## Part 4: HTML Structure & Class Names

Extract DOM/HTML structure with all class names for every UI section.

### For EACH section, extract simplified HTML skeleton:
- Element tags, ALL CSS class names, data-test-id, ARIA roles
- Nesting/hierarchy (indented parent-child)
- NO text content or dynamic data — structure and classes only

### State variations:
- Dropdown closed vs open (DOM diff)
- 1 row vs 2 rows (AND/OR appears)
- Disabled vs enabled (class changes)
- Conditionally rendered (v-if) vs always-in-DOM (v-show)

---

## Part 5: AI Chat ("Cee") vs Original UI Comparison

The app has an AI assistant "Cee" (green smiley icon in left sidebar). When asked to create a cohort, it renders a form INSIDE the chat. This form must be pixel-perfect identical to the original drawer.

### Steps to Open Cee AI in Full Screen:

**CRITICAL: The Cee AI icon is NOT a standard sidebar menu item. It is a small green smiley-face icon in the far-left icon column of the sidebar (the narrow vertical strip with icons only). It sits between the "Journeys" and "Feedback" menu items vertically.**

#### Step 1: Find and click the Cee icon
- **Location**: Left sidebar icon column, near the bottom (around y=690px)
- **Appearance**: Small green rounded rectangle with a smiley face (two dots for eyes, curved line for mouth)
- **Accessibility tree identification**: It appears as a `listitem` containing an `img` element inside the bottom `list` of the sidebar. It is the FIRST listitem in that list.
- **Playwright MCP approach**:
  ```
  # In snapshot output, look for the bottom sidebar list (after all menu items).
  # The Cee icon is the FIRST listitem in that list, containing an <img>.
  # Example: listitem [ref=e23] > img [ref=e26]
  # Click the listitem ref, NOT the img ref.
  browser_click(ref=<listitem_ref>)
  ```
- **agent-browser approach**:
  ```bash
  # The icon has no text or data-test-id, so use snapshot refs
  agent-browser snapshot -i
  # Find the bottom list in sidebar, first listitem with img child
  agent-browser click @<ref>
  ```
- **Fallback CSS selector**: The Cee container typically has class patterns like `cly-vue-ai-*` or similar AI-prefixed classes.

#### Step 2: Switch to Full Screen layout
After clicking the Cee icon, a popup panel appears on the right side of the page.
- **DO NOT click the `>>` (double chevron) button** — that HIDES/CLOSES the popup (data-test-id: `ai-container-hide-prompt-icon`).
- **Click the "Select layout" button** — it's the SECOND icon in the popup header (next to the `>>` button). It looks like a small rectangle/window icon.
  ```
  # In snapshot, look for two buttons in the popup header:
  # Button 1: data-test-id="ai-container-hide-prompt-icon" — DO NOT CLICK (this hides the popup)
  # Button 2: title="Select layout" — CLICK THIS ONE
  browser_click(ref=<select_layout_button_ref>)
  ```
- A dropdown menu appears with two options: **"Pop up"** and **"Full screen"**.
- Click **"Full screen"**.
  ```
  # After clicking "Select layout", a list appears:
  # listitem "Pop up"
  # listitem "Full screen" — CLICK THIS
  browser_click(ref=<fullscreen_listitem_ref>)
  ```

#### Step 3: Verify full-screen mode
- The Cee AI panel should now cover the entire viewport (with a slight dark overlay on the edges).
- The chat input "Ask Cee anything" should be visible at the bottom.
- Verify via snapshot that the chat input "Ask Cee anything" is visible at the bottom.

#### Step 4: Type cohort prompts
Type these prompts one at a time into the "Ask Cee anything" textbox, wait for each response:
   - `Group together everyone who signed up this month but never opened the app again`
   - `Show me users who completed a purchase but never came back in 30 days`
   - `Find users on iOS who had more than 5 sessions`

#### Step 5: Extract and compare
- Extract CSS/DOM from AI-rendered form after each prompt
- Open original drawer (via "+ New Cohort" button), configure same parameters, extract CSS/DOM
- Compare values systematically

#### Step 6: Extract Cee Form CSS (Pixel-Perfect)
For EVERY distinct UI element in the Cee-rendered form, use CDP to extract:

**Per-element extraction (same as Part 2 format):**
| Property | Value |
|---|---|
| **Selector** | CSS selector path |
| **CSS class names** | ALL classes |
| **Component type** | native HTML element or library component |
| background-color, color | computed values |
| font-size, font-weight, font-family, line-height | computed values |
| padding, margin (all sides) | computed values |
| border (width, style, color per side), border-radius | computed values |
| width, height, min/max | computed values |
| display, position, z-index | computed values |
| cursor, opacity, box-shadow, transition | computed values |
| flex/grid properties | flex-direction, justify-content, align-items, gap |

**Elements to extract from Cee form:**
1. Form card container (the bordered card that wraps the entire cohort form)
2. Card header (title "Create: [Name]" + "POST /i/cohorts/add")
3. Cohort name label + input
4. Description label + input
5. Section headers ("User Property Segmentation", "User Behaviour Segmentation", "Visibility")
6. Section description text
7. Property row container + each column (Property combobox, Operator combobox, Value input)
8. "+ Add property filter" button
9. Behavior tab buttons (Sessions, Events, View, Consent, Crash, Push) — both active and inactive states
10. Behavior row: "Users who" text + performed/didn't perform combobox + event selector + frequency combobox + count spinbutton + "times" text + time period combobox
11. Event warning text (orange)
12. AND connector button
13. Visibility radio cards (Global and Private) — both selected and unselected states
14. Confirm button (green)
15. Cancel button (outlined)
16. Debug info card

**CDP extraction approach (when eval is blocked by CSP):**
```javascript
async (page) => {
  const client = await page.context().newCDPSession(page);
  await client.send('DOM.enable');
  await client.send('CSS.enable');
  const { root } = await client.send('DOM.getDocument', { depth: -1 });

  // For each element:
  const { nodeId } = await client.send('DOM.querySelector', {
    nodeId: root.nodeId, selector: '.target-element'
  });
  const { computedStyle } = await client.send('CSS.getComputedStyleForNode', { nodeId });
  const { matchedCSSRules } = await client.send('CSS.getMatchedStylesForNode', { nodeId });
  const { outerHTML } = await client.send('DOM.getOuterHTML', { nodeId });
}
```

**Fallback: Playwright page.evaluate:**
```javascript
async (page) => {
  return await page.evaluate(() => {
    const el = document.querySelector('.target');
    const styles = window.getComputedStyle(el);
    return {
      classes: el.className,
      tagName: el.tagName,
      fontSize: styles.fontSize,
      fontWeight: styles.fontWeight,
      // ... all properties
    };
  });
}
```

##### CRITICAL: CSS Selector Specificity for Element UI Apps

**LESSON LEARNED**: When using CDP to extract CSS with generic selectors like `.el-radio-button__inner` or `.el-radio-group`, Element UI apps reuse these classes across multiple unrelated components (e.g., CSV export buttons, column edit dropdowns, sidebar toggles). `DOM.querySelector` returns the FIRST match in DOM order, which is almost always the WRONG element.

**ALWAYS scope selectors using one of these strategies:**

1. **`data-test-id` attributes as anchors** (preferred):
   ```
   [data-test-id="cohorts-drawer-seg-step-0-event-type-tab-0"] .el-radio-button__inner
   ```

2. **Parent component classes**:
   ```
   .cly-event-select .el-radio-group
   .cohort-drawer-content .el-select
   ```

3. **For body-level poppers** (dropdowns rendered outside the component DOM via `teleport`/`append-to-body`):
   - These are NOT inside the parent component's DOM tree — they are appended to `<body>`.
   - Search ALL `.el-popper` nodes and filter by `innerHTML` content match:
   ```javascript
   const { nodeIds } = await client.send('DOM.querySelectorAll', {
     nodeId: root.nodeId, selector: '.el-popper'
   });
   for (const nid of nodeIds) {
     const { outerHTML } = await client.send('DOM.getOuterHTML', { nodeId: nid });
     if (outerHTML.includes('Sessions') || outerHTML.includes('expected-content')) {
       // This is the correct popper
     }
   }
   ```

4. **NEVER use generic class selectors without scoping** — `.el-radio-button__inner` alone will match dozens of elements across the page.

**VERIFICATION STEP**: After extracting each element, ALWAYS check the `outerHTML` snippet to confirm it matches the expected content. If the returned HTML contains unexpected text (e.g., returns ".CSV" or "Edit Columns" instead of "Sessions"), your selector hit the wrong element. Re-scope and retry.

```javascript
// Always verify after querySelector:
const { outerHTML } = await client.send('DOM.getOuterHTML', { nodeId });
console.log('VERIFY:', outerHTML.substring(0, 200));
// If this doesn't match expected content → wrong element → fix selector
```

#### Step 7: Build Value-Based Diff Table
For each element that differs between Original Drawer and Cee Form, create a **value-based diff row**:

| # | Element | CSS Property | Original Value | Cee Value | Fix CSS |
|---|---------|-------------|----------------|-----------|---------|
| 1 | Visibility Radio | border | `1px solid #DCDFE6` | `2px solid #4CAF50` | `border: 1px solid #DCDFE6` |
| 2 | Behavior Tab | background | `transparent` | `#67C23A` | `background: transparent` |

Include EVERY differing CSS property, not just the major ones. This table is the direct implementation spec for fixing parity issues.

### Document each difference:

| # | Element | Original (Drawer) | AI Chat (Cee) | Severity | Fix Required |
|---|---------|-------------------|---------------|----------|--------------|
| 1 | Title font | 16px/500 | 14px/400 | HIGH | `font-size: 16px; font-weight: 500` |

### Categories to compare:
Layout, Typography, Colors, Components, Borders, Interactive States, Dropdowns, Icons, Conditional Behavior, AND/OR Logic, Footer, Missing Elements.

### Test multiple prompts:
- Property segmentation only
- Behavior segmentation only
- Both property + behavior
- Multiple conditions with AND/OR

### Output:
1. Value-based diff table with every discrepancy
2. Prioritized fix list (HIGH/MEDIUM/LOW)
3. Exact CSS/class changes needed

---

## Part 6: Localization & Data Rules

1. **UI labels** → Use user's language (i18n), from translation file
2. **Static lists** (operators, tab names, frequency options) → Also translate
3. **DB data** (property names, event names, user content) → Display as API returns, never modify
4. **Class names, data-test-ids** → Keep as-is, never translate

Tag every value in dropdowns: `[STATIC/i18n]`, `[DYNAMIC/DB]`, `[STATIC/FIXED]`

---

## Execution Rules

1. **Single output file**: Everything goes into `{feature-name}/PRD.md` with Parts 1-6 as sections.
2. **Maximize parallelism**: Launch subagents for Parts 1-5 simultaneously. Each uses its own `--session`.
3. **Internal parallelism**: Parts 2 and 4 can spawn sub-subagents (each with own session). Part 3 is sequential.
4. **NEVER share browser sessions**: Two agents on the same session = corrupted data.
5. **Be exhaustive**: Click every dropdown, every tab, every option.
6. **Use data-test-id selectors** via `agent-browser find testid "..."` when available.
7. **CDP fallback** if eval is blocked by CSP.
8. **Always re-snapshot**: After every click. Refs are invalidated on DOM change.
9. **Close all sessions when done**.
10. **Class names are critical**: Never omit or abbreviate class lists.
11. **Merge step**: After all subagents finish, orchestrator merges results into the single PRD file.
12. **CRITICAL — Document ALL sub-interactions**: Every clickable element that adds, opens, or reveals new UI MUST be clicked and its result fully documented. This includes:
    - "+ Add property/filter/condition" buttons → What row/form appears? What fields? What dropdowns?
    - "+ Add" buttons of any kind → Document the full sub-form that appears
    - Expandable/collapsible sections → Document both states
    - Inline edit triggers → Document the edit mode UI
    - Tab content → Click EVERY tab and document its unique content
    - Conditional fields → Select different parent values and document how child fields change (e.g., different property types produce different operator sets and value field types)
    - Multi-row patterns → Add at least 2 rows to verify row indexing, AND/OR connectors, first/last modifiers
    - **If a button exists in the UI, you MUST click it and document what happens.** A PRD that mentions a button without documenting its click behavior is incomplete.
13. **Property/Operator/Value cascading**: When documenting query builder or filter components, you MUST:
    - Select at least 3 different property types (numeric, string, list/enum) and document the operator set for each
    - Document how the value field changes based on property type + operator combination
    - Build a complete mapping table: Property Type → Available Operators → Value Field Type

## Output Structure

```
{feature-name}/PRD.md           — Single unified PRD (Parts 1-6)
```
```

---

## Prerequisites

### Install agent-browser skill (one-time)

```bash
npx skills add vercel-labs/agent-browser
```

### CLAUDE.md Configuration

Add to project `CLAUDE.md`:

```markdown
## Browser Automation

Use `agent-browser` for web automation. Run `agent-browser --help` for all commands.

Core workflow:
1. `agent-browser open <url>` - Navigate to page
2. `agent-browser snapshot -i` - Get interactive elements with refs (@e1, @e2)
3. `agent-browser click @e1` / `fill @e2 "text"` - Interact using refs
4. Re-snapshot after page changes
```

---

## Default Login Credentials

```
Username: mert.koseoglu@count.ly
Password: Mksglu.countly**1
```

## Example

```
APP_NAME: Countly
FEATURE_NAME: Cohort Creation Drawer
TARGET_FRAMEWORK: Vue3
URL: http://mert.count.ly/dashboard#/6908ab02fece9ef06eca7285/cohorts
Login: mert.koseoglu@count.ly / Mksglu.countly**1
Target element: Click "+ New Cohort" button to open the full-screen drawer
```

## Tips

- Note exact UI library component names (e.g. `el-select`, `el-radio-button`) — these are the bridge for the implementing LLM
- Build state transition tables: "When X selected → Y appears, Z disabled"
- Include BOTH computed values AND authored CSS rules
- Note dropdown rendering strategy (body-level portal vs inline, z-index)
- Static vs dynamic: check network tab when dropdowns open
- DOM extraction: section by section, depth-first, not entire page at once
- Chaining: `agent-browser click @e1 && agent-browser wait 1000 && agent-browser snapshot -i`
