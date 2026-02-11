# Copilot Instructions for Oxen Web Project

## Project Overview

This is a **React + TypeScript + Vite** marketing website for Oxen (likely a B2B/industrial product). Built with modern tooling for fast development and production performance.

**Key Stack:**
- **Frontend Framework:** React 19 with TypeScript
- **Build Tool:** Vite (with `@vitejs/plugin-react`)
- **Styling:** Tailwind CSS + custom CSS variables
- **Component Library:** shadcn/ui (Radix UI primitives + custom variants)
- **Animations:** Framer Motion
- **Form Handling:** React Hook Form + Zod validation
- **Icons:** Lucide React

## Architecture & Critical Patterns

### UI Components (src/components/ui/)
- **Shadcn-based system** - Use `class-variance-authority` (CVA) for component variants
- **All components wrap Radix UI primitives** with Tailwind styling
- **Pattern Example (button.tsx):**
  ```tsx
  const buttonVariants = cva("base-styles", {
    variants: { variant: {...}, size: {...} }
  })
  ```
- **Import path alias:** `@/components/ui` for all UI components
- **Utility function:** Use `cn()` from `@/lib/utils` to merge Tailwind classes safely

### Styling System
- **CSS Variables-first** - All colors defined in `:root` as HSL values in `src/index.css`
- **Custom Classes:** `.gradient-text`, `.glass`, `.glass-dark` for repeated effects
- **Font Stack:** 
  - Headings: "Sora" (600-700 weight)
  - Body: "Work Sans" (300-600 weight)
  - Special: "Montserrat" (600-700 weight)
- **Custom scrollbar styling** is applied globally

### Animation Patterns
- **Framer Motion variants** stored as objects in component files (e.g., `fadeInUp`, `staggerContainer` in App.tsx)
- **Common variants:** opacity/y-offset transitions with 0.6s duration
- **Container pattern:** `staggerContainer` wraps multiple animated children with `delayChildren` and `staggerChildren`

### Component Integration
- **Shadcn path alias:** Configure in `components.json` (aliases point to `@/components`, `@/utils`, `@/lib`)
- **Form components:** `Dialog`, `Input`, `Label`, `Textarea`, `Select`, `Badge` - all imported from `@/components/ui`
- **Icons:** Import from `lucide-react` or create custom SVG components (see `WhatsAppIcon` pattern in App.tsx)

## Development Workflow

### Setup & Running
```bash
npm install          # Install dependencies
npm run dev         # Start Vite dev server (HMR enabled)
npm run build       # Compile TypeScript + Vite build (outputs to dist/)
npm run lint        # Run ESLint (flat config in eslint.config.js)
npm run preview     # Preview production build locally
```

### Type Checking
- **TypeScript Config:** `tsconfig.app.json` for app code, `tsconfig.node.json` for build tooling
- **Build includes `tsc -b`** for type checking before Vite bundle
- **No React Compiler enabled** (by design, due to dev/build performance impact)

### Code Quality
- **ESLint:** Configured with React Hook Rules + React Refresh plugin
- **No import path prefixes:** Use `@/` aliases defined in `vite.config.ts` and `components.json`

### Deployment & Monitoring
- **Platform:** Vercel (configured in `vercel.json`)
- **Analytics:** Vercel Analytics enabled (`@vercel/analytics`) - tracks page views and user interactions
- **Performance:** Vercel SpeedInsights enabled (`@vercel/speed-insights`) - monitors Core Web Vitals
- **Build Command:** `npm run build` (outputs to `dist/`)
- **Output Directory:** `dist/`

## Project-Specific Conventions

### File Organization
- `src/components/ui/` - Shadcn components (Radix primitives + styling)
- `src/hooks/` - Custom React hooks (e.g., `use-mobile.ts`)
- `src/lib/` - Utilities (`utils.ts` exports `cn()` function)
- `src/App.tsx` - Main application (762 lines - contains landing page sections with animations)

### Naming Conventions
- **Components:** PascalCase (e.g., `OxenLogo`, `WhatsAppIcon`)
- **CSS Classes:** kebab-case (`.gradient-text`, `.glass-dark`)
- **Animation Objects:** camelCase (e.g., `fadeInUp`, `staggerContainer`)
- **Props Objects:** Follow React patterns with explicit interfaces

### Data & State Patterns
- **No Redux/Context API visible** - component state uses `useState`
- **Form handling:** React Hook Form likely used for contact forms (Dialog-based in App.tsx)
- **No custom API layer** visible - focus on static landing page

### Custom Component Examples
- **OxenLogo:** Dynamic component with size prop (`sm|md|lg`) and optional animation
- **WhatsAppIcon:** SVG wrapper component with configurable `className` prop
- Both use `motion` from Framer Motion for animations

## Integration Points & Dependencies

### Critical External Dependencies
- **@radix-ui/** - 30+ packages for unstyled, accessible components
- **framer-motion** - Animation library (motion, AnimatePresence, useScroll hooks)
- **@hookform/resolvers + react-hook-form** - Form state + validation
- **tailwindcss + tailwind-merge** - CSS utilities
- **clsx** - Class name utility (paired with twMerge in `cn()`)
- **lucide-react** - Icon library (562+ icons)
- **date-fns, embla-carousel-react** - Date utilities and carousel

### Build-Time Plugin
- **kimi-plugin-inspect-react** - Custom Vite plugin (appears to be for inspecting React components)
- Imported in `vite.config.ts`: `inspectAttr()`

## Common Tasks & Patterns

### Adding a New UI Component
1. Create component in `src/components/ui/component-name.tsx`
2. Use CVA for variants: `const componentVariants = cva(...)`
3. Export with TypeScript props interface
4. Add to shadcn registry in `components.json` if needed

### Creating Animated Sections
1. Define animation variants (opacity, y, scale, etc.)
2. Wrap section in `motion.section` with `initial`, `whileInView`, `transition`
3. Use `staggerContainer` + `staggerChildren` for child animations
4. Import motion utilities: `motion, AnimatePresence, useScroll, useTransform`

### Form Integration
- Use `Dialog` from `@/components/ui/dialog`
- Wrap form inputs: `Input`, `Label`, `Textarea`, `Select`
- Handle submission with React Hook Form
- Apply validation with Zod (from resolvers package)

### Tailwind Extensions
- **Base colors:** Defined as CSS variables in `:root` (--primary, --accent, etc.)
- **Custom utilities:** Check `tailwind.config.js` for sidebar variants and extended colors
- **Dark mode:** Enabled via class strategy (`darkMode: ["class"]`)

## Important Notes

- **No React Compiler:** Project intentionally avoids React Compiler due to performance impact on dev experience
- **Path Resolution:** Always use `@/` prefix for imports (configured in Vite + TypeScript)
- **CSS Variable System:** Colors are in HSL format to enable easy dark mode toggling
- **Accessibility:** Radix UI components handle a11y; focus on semantic HTML and ARIA roles
- **Production Build:** Combines TypeScript type checking + Vite optimization for minimal bundle size
