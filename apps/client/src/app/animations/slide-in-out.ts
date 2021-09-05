import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations'

// Component transition animations
export const LeftToDown: AnimationTriggerMetadata = trigger('leftToDownAnimation', [
  state(
    '*',
    style({
      opacity: 1,
      transform: 'translateX(0)',
    })
  ),
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateX(-100%)',
    }),
    animate('0.2s ease-in'),
  ]),
  transition(':leave', [
    animate(
      '0.5s ease-out',
      style({
        opacity: 0,
        transform: 'translateY(100%)',
      })
    ),
  ]),
])

export const LeftToRight: AnimationTriggerMetadata = trigger('leftToRightAnimation', [
  state(
    '*',
    style({
      opacity: 1,
      transform: 'translateX(0)',
    })
  ),
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateX(-100%)',
    }),
    animate('0.2s ease-in'),
  ]),
  transition(':leave', [
    animate(
      '0.5s ease-out',
      style({
        opacity: 0,
        transform: 'translateX(100%)',
      })
    ),
  ]),
])

export const RightToLeft: AnimationTriggerMetadata = trigger('rightToLeftAnimation', [
  state(
    '*',
    style({
      opacity: 1,
      transform: 'translateX(0)',
    })
  ),
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateX(100%)',
    }),
    animate('0.5s ease-in'),
  ]),
  transition(':leave', [
    animate(
      '0.5s ease-out',
      style({
        opacity: 0,
        transform: 'translateX(100%)',
      })
    ),
  ]),
])

export const RightToDown: AnimationTriggerMetadata = trigger('rightToDownAnimation', [
  state(
    '*',
    style({
      opacity: 1,
      transform: 'translateX(0)',
    })
  ),
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateX(100%)',
    }),
    animate('0.2s ease-in'),
  ]),
  transition(':leave', [
    animate(
      '0.5s ease-out',
      style({
        opacity: 0,
        transform: 'translateY(100%)',
      })
    ),
  ]),
])
