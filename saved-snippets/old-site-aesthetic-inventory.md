# Old Homepage Aesthetic Inventory

Saved from the last committed local website so these pieces can be restored or blended into the new modular version.

## Visual Systems Worth Preserving

- `DotField`: canvas grid in the hero with pointer-reactive dots and blue/pink glow.
- `BlobCursor`: blurred high-contrast cursor blobs in the hero.
- `StoryCursor`: custom cursor for interactive sections.
- Dark navy hero gradient with dot-field overlay and soft mixed blue/magenta/gold lighting.
- Stacked `case-file` founder card with translucent borders, shine layer, stat rows, and angled physical-card feel.
- `ProofBoard`: asymmetric mosaic of metric, quote, brand, action, and serif tiles.
- `TrustStrip`: moving university marquee.
- `MethodFiles`: case-file/dossier style method cards.
- `HoverExpand_002`: Skiper stacked image interaction for pathway graphics.
- `PlacementCarousel`: Skiper coverflow-style outcomes carousel.
- Graphic pathway images from `public/images/pathways/*.svg`.

## Useful Old Selectors / Components

- Component code: `git show HEAD:src/App.tsx`
- Styling: `git show HEAD:src/styles.css`
- Key selectors: `.hero`, `.dot-field`, `.blob-cursor`, `.case-file`, `.proof-board`, `.proof-tile`, `.trust-strip`, `.particle-card`, `.pathway-files`, `.hover-expand-shell`, `.placement-carousel-shell`

## Integration Direction

The current v2 site is cleaner and more modular, but flatter. Best next pass is to port the old atmosphere into v2 rather than revert wholesale:

- Add `DotField` back into `EdgeHero`.
- Replace the current warm blurred blobs with the old blue/magenta/gold blended light system.
- Make the hero founder card feel more like the old stacked `case-file`.
- Reintroduce pathway graphic stacking in `EdgeProcess` or `EdgeMethodStack`.
- Make `EdgeProof` more mosaic-like instead of evenly carded.
