# Commander JS: High-Fidelity Scrollytelling Blueprint

This document specifies the motion design, structural layout, and narrative flow for a 7-section scrollytelling experience that teaches JavaScript through the metaphor of Magic: The Gathering (Commander).

> The coded wireframe (`index.html` & `style.css`) runs automatically in light mode (Parchment) or dark mode (Dark Battlefield) depending on system preferences.

## 🎨 Creative Direction
* **Typography Hierarchy:**
  * **Headings (72px/48px):** *Cinzel* (elegant, classic MTG aesthetic)
  * **Body (18px/24px):** *Lora* (highly readable, traditional serif)
  * **Annotations (12px):** *IBM Plex Mono* (distinguishes tech/wireframe notes)
* **Mana Accent Colors:**
  * ☀️ White (`#F9FAEF` / `#EAE6CD`)
  * 💧 Blue (`#0E68AB` / `#2A8DE5`) 
  * 💀 Black (`#150B00` / `#3a2e26`)
  * 🔥 Red (`#D3202A` / `#E84545`)
  * 🌲 Green (`#00733E` / `#2A9D6A`)

---

## 📐 Section Architecture & Motion Specs

### 1. Hero (Full-Bleed, Centered)
* **Layout:** Centered monolithic text block inside a 100vh container.
* **Motion (GSAP ScrollTrigger):** 
  * Pin the hero text in the center.
  * As the user scrolls, `scale()` the hero text down until it fades to 0 opacity.
* **Parallax Layers marked:**
  * `Midground (Z-index -1)`: Faint U, B, W mana symbols. Move at 50% scroll speed.
  * `Background (Z-index -2)`: Faint G, R symbols. Move at 20% scroll speed. 

### 2. Contained Card Layout (Dense)
* **Layout:** A grid of 3 physical "Cards" explaining Fetch, Listeners, and Closures.
* **Motion (GSAP ScrollTrigger):**
  * Staggered fade-up entry `y: 50, opacity: 0, stagger: 0.2`.
  * **Hover Interaction:** Subtle 3D tilt using mouse coordinates mapped to `rotateX` and `rotateY`.

### 3. Text-Heavy Narrative (Spacious)
* **Layout:** Asymmetric split. Left: Large typography (The Call Stack Resolves). Right: Diagram wirebox.
* **Motion (GSAP ScrollTrigger):**
  * **Text Scrub:** The `<p>` tags have borders/opacity that "fill" as the scroll hits the triggers, highlighting the text line-by-line.
  * **Diagram Sync:** As the text highlights "pushed onto the stack," a block drops into the wirebox.

### 4. Split Comparison Layout (Dense)
* **Layout:** 50/50 split. 
  * Left side explains Synchronous vs Async (Sorcery vs Instant).
  * Right side holds 3 content cards representing execution phases.
* **Motion (GSAP ScrollTrigger):**
  * The left Side **Pins** (`pin: true`) rigidly to the viewport.
  * The right side scrolls past. The middle card (Instant Speed/Async) has an opposing parallax scrub (it floats up slightly faster than the scroll rate to stand out).

### 5. Interaction-Focused Layout (Spacious)
* **Layout:** A central "Battlefield" containing DOM nodes represented as lands (Forest, Mountain, Island).
* **Motion (GSAP Hover/Mousemove):**
  * **Magnetic Hover:** As the mouse nears a node, it snaps slightly toward the cursor.
  * Clicking the central "QuerySelectorAll" button triggers a staggered highlight flash on all nodes.

### 6. Grid-Based System Layout (Dense)
* **Layout:** A bento-box grid representing the "Standard Library" (Array.map, Fetch, Set, etc). Heavy use of the mana colors for top-borders.
* **Motion (GSAP ScrollTrigger):**
  * Staggered entrance, springing up from scale `0.8` to `1` with a slight rotation constraint, simulating laying out cards onto a table.

### 7. Spacious Closing Layout (Full-Bleed)
* **Layout:** Centered final CTA. "Pass the Turn. Initialize Project." Massive typography, huge negative space.
* **Motion:** 
  * Deep background parallax layer (a giant crystal/mana symbol) scrolls up at an incredibly slow rate.
  * CTA fades in when scrolled exactly to 50% of the viewport.
