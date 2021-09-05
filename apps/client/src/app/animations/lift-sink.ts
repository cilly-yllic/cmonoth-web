import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations'

// Component transition animations
export const LiftInSinkOut: AnimationTriggerMetadata = trigger('liftInSinkOutAnimation', [
  state(
    '*',
    style({
      opacity: 1,
    })
  ),

  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate(
      1000,
      style({
        opacity: 1,
      })
    ),
  ]),

  transition(':leave', [
    style({
      opacity: 1,
    }),
    animate(
      1000,
      style({
        opacity: 0,
      })
    ),
  ]),
])
