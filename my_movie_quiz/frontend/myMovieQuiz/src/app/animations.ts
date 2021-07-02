import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

export const slidingTool = trigger('slidingTool', [
  transition((fromState: string, toState: string) => toState != fromState, [
    animate("2s ease-in-out", keyframes([
      style({ transform: "translateX(0)", offset: 0 }),
      style({ transform: "translateX(394px)", offset: 0.5 }),
      style({ transform: "translateX(0)", offset: 1 })
    ]))
  ])
])

export const vanish = trigger('vanish', [
  state('true', style({ border: '2px solid rgba(95, 158, 160, 1)' })),
  state('false', style({ border: '2px solid rgba(95, 158, 160, 0)' })),
  transition('false => true', animate('1s', ))
])