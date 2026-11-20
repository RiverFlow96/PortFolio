# Featured project image framing

## Goal

Make the FreeMarket preview in the Hero readable by showing the full screenshot instead of cropping its sides and darkening its lower content.

## Design

- Keep the existing featured project and its source image.
- Replace the 320×320 square image frame with a responsive wide frame matching the screenshot's 1905×919 ratio (about 2.07:1), capped to the available Hero column width.
- Render the image with `object-fit: contain` so the entire screenshot remains visible at different viewport widths.
- Remove the full-frame dark gradient overlay. Keep the separate floating “Proyecto destacado” label.
- Leave the image hidden below the current desktop breakpoint, matching existing Hero behavior.

## Acceptance criteria

- The complete FreeMarket screenshot is visible without horizontal cropping.
- Text and controls in the screenshot are not darkened by an overlay.
- The preview fits the Hero's right column at desktop sizes without horizontal overflow.
- The project title badge remains legible and visually attached to the preview.

## Scope

Change only the featured image frame in `frontend/src/sections/Hero.tsx`. Do not alter the source asset, project cards, project data, or the Hero's mobile visibility behavior.

## Verification

Review the rendered Hero at desktop width and confirm the full preview is visible. No automated test changes are required for this CSS-only adjustment.
