# Visual System Starter Kit: Figma Scaffolding Specification

This document details the exact structure, pages, and frames for the downloadable Figma toolkit. Use this as your blueprint to build the file.

## 📁 File Structure

### Page 1: 🟢 Start Here (Cover & Instructions)
- **Frame: Cover (1920x1080)** - Bold typography, minimal visual noise. Title: "Visual System Starter Kit". Tagline: "A constraint-based system for human-led, AI-supported design."
- **Frame: How to Use This Kit (Desktop 1440)**
  - Manifesto: The core philosophy (pattern amplifier vs. author).
  - Navigation links to other pages.
  - "The Loop" diagram: Context & Constraints (Human) ➔ Permutation (AI) ➔ Curation (Human).

### Page 2: 🔍 Phase 1: Deconstruction (Analysis)
- **Component: Reference Annotation Tag** - A stickie/tag component with properties: `Principle` (Color, Type, Spacing, Hierarchy) and `Effect` (Why it works).
- **Frame: System Comparison Worksheet (Desktop 1440)**
  - Table Layout with columns: `Inspiration Image`, `Color Logic`, `Type Scale`, `Spacing Assumptions`, `Tone`.
  - Prompts below each column: "What is the primary background vs. text color contrast?"
- **Frame: X-Ray Vision Tools**
  - Transparent colored overlay components measuring margins, typeline heights, and color swatches.

### Page 3: 🚧 Phase 2: Definition (Constraints)
- **Frame: The Constraint Contract (Desktop 1440)**
  - Input field for Domain (e.g., "SaaS Admin Dashboard", "Boutique Portfolio").
  - 3 large boxes: "Constraint 1", "Constraint 2", "Constraint 3".
  - For each box, text fields: "Rationale", "What it allows", "What it prevents".
- **Frame: Extreme Constraint Exercises (Desktop 1440)**
  - Test 1: Design a complex data table using only 1 color and 1 font weight.
  - Test 2: Design a 3-tier pricing tier using only typography (no lines, no background colors).

### Page 4: 🤖 Phase 3: Generation (AI Prompts)
- **Component: Prompt Builder** - Mad-libs style text fields that combine into a final prompt string.
- **Frame: AI Collaboration Protocol (Desktop 1440)**
  - A dashboard of 5 core prompt templates (e.g., Typography Scaling, Color Palette Generation, JSON Token mapping).
  - Explicit warning section: "When NOT to use AI" (e.g., Setting the core constraints, finalizing taste, deciding component semantics).

### Page 5: 🧩 Phase 4: Synthesis (Starter File)
- **Frame: Primitive Tokens (Color & Type)**
  - Palette scales (50-900) but ONLY gray, primary, and one secondary. (Keep it a starter, not a bloated system).
  - Type scales based on a stated ratio (e.g., Major Third).
- **Frame: Semantic Tokens Mapping**
  - "The Translator Workshop": Visual arrows showing how Primitive `Blue-600` becomes Semantic `Action-Primary-Background`.
- **Frame: Core Anatomy Components**
  - Button Variants (Primary, Secondary, Ghost).
  - Card Variants (Basic, Interactive, Media).
  - Form Fields.
  - *Keep them totally unstyled (wireframe) to force the designer to apply their constraints.*

---
**Remember:** This file is a *thinking framework*. The aesthetic of the kit itself should be brutalist, functional, and highly architectural. Do not provide beautiful gradients or styling inside the actual toolkit templates—leave that room for the human designer's taste.
