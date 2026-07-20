# Lovable Notch + Gooey Input Snippet

Saved from Aaryan's prompt on 2026-07-20.

This packet is intentionally dormant. It is not imported by the app yet.

## Project Check

- shadcn/ui structure: present via `components.json`, `src/components/ui`, and aliases such as `@/components/ui`.
- TypeScript: present.
- Tailwind CSS v4: present via `tailwindcss` and `@tailwindcss/vite`.
- Current app stylesheet: `src/tailwind.css`.
- shadcn config stylesheet: `src/styles.css`.

## Important Notes Before Installing

- The provided components use unprefixed Tailwind classes.
- The current homepage uses Tailwind v4 with the `tw:` prefix in `src/tailwind.css`.
- The provided components import from `motion/react`, but this repo currently has `framer-motion`, not `motion`.
- If installing these into the live app, add `motion` or adapt imports to the repo's animation library.
- The target app path should be `src/components/ui`, not root-level `components/ui`, because this Vite app aliases `@/components` to `src/components`.

## Saved Files

- `components/notch-demo.tsx`
- `components/gooey-input-demo.tsx`
- `components/ui/notch.tsx`
- `components/ui/gooey-input.tsx`
- `original-prompt.md`
