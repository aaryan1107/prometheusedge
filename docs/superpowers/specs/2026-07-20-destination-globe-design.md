# Destination Globe Interaction Redesign

Date: 2026-07-20
Repository: `aaryan1107/prometheusedge`
Scope: `EdgeCountries` destination experience and shared Cobe globe behavior

## Objective

Turn the destination globe from a decorative, semi-random rotating object into a predictable international-study journey visualisation.

The interaction must always communicate one simple story:

**India -> selected study destination -> destination universities**

India is the permanent origin. The selected country is the target. The route, globe orientation, active destination state, and university reveal must all agree geographically.

## Current implementation findings

The current behavior is inconsistent for several concrete reasons:

1. `EdgeCountries.tsx` defines the route origin as `Noida` and renders copy such as `Start in Noida` and `Noida to USA`. This is too locally specific and does not match the desired brand story.
2. The `<Globe>` component is rendered with `key={country.code}`, so every destination selection destroys and remounts the entire globe. The new globe starts from its default `phi: 0`, which makes transitions look like resets rather than travel between destinations.
3. `cobe-globe.tsx` combines three competing rotation systems in the same render loop:
   - continuous automatic `phi += speed` rotation;
   - easing `phiOffsetRef` back toward the selected focus longitude;
   - user drag/inertia offsets.
   This means the selected destination is not a stable camera state.
4. After a drag is released, `phiOffsetRef` is continuously eased back toward `focusPhiRef`. The globe therefore appears to snap or drift back instead of preserving natural manual exploration.
5. The target focus is derived directly from the destination longitude without a separate camera target/configuration. A geographic endpoint and the best visual camera framing are not always the same thing.
6. Routes and markers appear immediately. There is no staged origin -> route travel -> destination arrival sequence.
7. University information is displayed in a separate static card/list and logo loop, rather than feeling visually connected to arrival at the selected point on the globe.
8. The desktop destination `<select>` duplicates the visible destination button grid.

## Chosen approach

Use a controlled state-machine-style globe experience while keeping Cobe as the globe renderer.

The globe remains draggable, but programmatic destination transitions explicitly override passive rotation and inertia. The globe is not remounted when a country changes.

The interaction phases are:

1. `idle`
2. `departing`
3. `travelling`
4. `arrived`
5. `exploring`

The implementation does not need a heavy state-machine dependency; these phases can be represented with local React state/refs and a small transition controller.

## Destination configuration

Create one central destination configuration as the single source of truth.

Each destination contains:

- `code`
- `name`
- `label`
- `flag`
- `location: [lat, lng]` for the actual geographic destination marker/route endpoint
- `camera: { phi, theta }` or equivalent camera target for intentional final framing
- `colleges`
- optional university logo/icon asset references already available in the repository

Create a permanent India origin configuration using a neutral national origin point rather than Noida branding.

The UI copy and route label must say `India -> Destination`, never `Noida -> Destination`.

The India destination button remains supported. When India itself is selected, the route should collapse gracefully into an India-focused state rather than drawing a meaningless India-to-India arc.

## Interaction design

### Destination selection

When a user clicks a destination button:

1. Mark the button active immediately.
2. Cancel active drag inertia and pause idle auto-rotation.
3. Fade/clear university overlays from the previous destination.
4. Establish India as the visible route origin.
5. Begin the animated route from India toward the destination.
6. Rotate the globe through a smooth, shortest-path interpolation toward the destination's explicit camera target.
7. Emphasize the destination endpoint as the route completes.
8. Settle and hold the globe on the selected destination.
9. Reveal only the universities for that destination using small, tasteful logo/icon pop-outs associated visually with the target region.

The complete transition should usually finish in approximately 1.5-2.5 seconds, with route drawing and globe rotation overlapping.

### Route animation

The route must visually grow from India to the selected destination rather than appear fully drawn instantly.

If the current Cobe arc API cannot expose progressive drawing directly, implement the travel effect using one of these stable methods, in preference order:

1. Animate a moving route-head/marker and progressively increase an interpolated route endpoint from India toward the target.
2. Render a staged arc plus moving highlight that clearly communicates forward travel.
3. Use a lightweight HTML/SVG overlay only if Cobe cannot produce a clean progressive route.

Do not introduce another animation dependency solely for the route.

### Camera behavior

Separate geographic destination coordinates from visual camera framing.

A destination's map marker must use real geographic coordinates, but the final camera orientation should come from an explicit per-destination camera target.

Programmatic transitions must:

- cancel existing inertia;
- pause passive rotation;
- interpolate from the globe's current orientation to the selected camera target using the shortest angular path;
- settle without overshooting;
- hold after arrival.

The globe should never finish centered on an unrelated ocean or continent.

### Manual dragging

Dragging remains supported.

Idle before any destination transition:
- optional extremely slow auto-rotation is acceptable.

While dragging:
- pause auto-rotation;
- follow pointer movement naturally.

On release:
- apply modest inertia;
- decay inertia naturally;
- do not automatically pull the globe back to a previous focus target.

After a destination has arrived:
- keep the destination selected;
- allow the user to drag and explore;
- enter an `exploring` state;
- do not restart the route unless the user explicitly clicks a destination button again.

When another destination is clicked, the controlled transition takes priority over exploration and inertia.

## University pop-outs

University content should become part of the destination-arrival experience.

Sequence:

1. Previous destination university overlays fade out.
2. Route and globe travel begin.
3. Destination arrives.
4. Destination marker activates.
5. Small university logo/icon elements pop into view.

Only the selected destination's universities are visible.

Preferred implementation:

- HTML overlays positioned around the globe container, visually anchored to the destination side of the globe.
- Use the existing university assets/data already present in the repository when available.
- Keep the current detailed university card/list if useful, but make the pop-outs the immediate arrival feedback.
- Do not force complex raster logos into the WebGL canvas when HTML overlays are more stable.

The pop-outs should feel like a premium editorial reveal, not map pins.

On mobile, reduce simultaneous pop-outs and keep all overlays inside the viewport.

## Destination controls

The visible destination buttons are the primary controls.

On desktop, remove the redundant destination `<select>` if it provides no unique value.

On smaller screens, retain or reintroduce a compact select only if the full button grid becomes unwieldy. The desktop experience should not show two controls that perform the same action.

The active destination must have a clear visual state.

## Globe API refactor

Refactor `cobe-globe.tsx` so that the parent can control destination transitions without remounting the globe.

The component should expose a coherent controlled API, for example through props such as:

- target camera orientation/location
- transition token or destination id
- transition duration
- auto-rotate enabled/disabled
- route progress or route animation state
- arrival callback if needed

Exact naming may follow existing project conventions.

Core requirement: destination changes update the existing globe instance rather than recreating it.

Keep a single requestAnimationFrame loop owned by the globe component.

## Reduced motion

Respect `prefers-reduced-motion`.

For reduced motion:

- skip prolonged globe travel;
- quickly orient to the target;
- render the route in its final state;
- reveal university information with minimal opacity transitions;
- retain full geographic correctness and selected-destination state.

## Mobile and performance

- Keep a single globe animation loop.
- Avoid competing React animation loops.
- Reuse Cobe's update mechanism.
- Do not recreate/destroy the WebGL globe on every destination selection.
- Cancel timers/animation transitions correctly.
- Avoid layout thrashing.
- Keep touch drag usable.
- Validate Safari/iOS behavior.
- Simplify university pop-outs on narrow screens.

## Visual integration

The globe section should eventually follow the approved Edge Way blue/gold brand system, but this task's primary scope is interaction correctness.

Route and destination emphasis should use the refined royal-blue / warm-gold visual language where theme tokens are already available. Avoid unrelated broad redesign work.

## Acceptance criteria

For every supported destination:

- The destination button becomes active.
- The origin is India, not Noida.
- Route begins at India.
- Route ends at the correct geographic destination.
- Globe rotates predictably toward the destination.
- Final camera framing clearly shows the correct country/region.
- No arbitrary reset/remount is visible.
- Auto-rotation does not move the destination away immediately after arrival.
- Previous university pop-outs disappear.
- Correct destination university pop-outs appear after arrival.
- Manual drag works after arrival.
- Drag release does not snap back aggressively.
- Clicking another destination overrides inertia and starts the new controlled journey.
- Reduced-motion behavior remains geographically correct.

Specific framing checks:

- USA -> North America / USA clearly visible
- Canada -> Canada / North America clearly visible
- UK -> British Isles / Western Europe clearly visible
- UAE -> Gulf / Middle East clearly visible
- Hong Kong -> southern China / East Asia clearly visible
- Singapore -> Southeast Asia clearly visible
- Australia -> Australia clearly visible
- New Zealand -> New Zealand region clearly visible
- Europe -> configured European target clearly visible
- India -> India clearly visible with no meaningless self-route

## Verification

After implementation:

1. Run the TypeScript/build command.
2. Test every destination button manually.
3. Verify transitions after manual dragging.
4. Verify repeated clicks and rapid destination switching.
5. Verify desktop and mobile layouts.
6. Verify reduced-motion behavior.
7. Check for requestAnimationFrame, listener, timer, or WebGL cleanup regressions.
8. Report modified files and the root causes fixed.
