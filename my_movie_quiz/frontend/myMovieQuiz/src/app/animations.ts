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

export const flyingTool = trigger('flyingTool', [
  transition(':enter', [
    animate('1s ease-out', keyframes([
      style({ transform: 'translateX(-100%)', opacity: '0', offset: 0 }),
      style({ transform: 'translateX(10%)', opacity: '1', offset: 0.8 }),
      style({ transform: 'translateX(0%)', opacity: '1', offset: 1.0 })
    ]))
  ]),
  transition(':leave', [
    animate('600ms ease-in', keyframes([
      style({ transform: 'translateX(-10%)', opacity: '1', offset: 0.3 }),
      style({ transform: 'translateX(100%)', opacity: '0', offset: 1.0 })
    ]))
  ])
])

export const cardChange = trigger('cardChange', [
  transition((fromState: string, toState: string) => toState != fromState, [
    animate(100, style({ transform: 'rotate(0.2deg)' })),
    animate(100, style({ transform: 'rotate(0deg)' })),
    animate(100, style({ transform: 'rotate(-0.2deg)' })),
    animate(100, style({ transform: 'rotate(0deg)' })),
    animate(100, style({ transform: 'rotate(0.2deg)' })),
    animate(100, style({ transform: 'rotate(0deg)' }))
  ])
])

export const toolChange = trigger('toolChange', [
  transition((fromState: string, toState: string) => toState != fromState, [
    animate(100, style({ transform: 'rotate(1deg)' })),
    animate(100, style({ transform: 'rotate(0deg)' })),
    animate(100, style({ transform: 'rotate(-1deg)' })),
    animate(100, style({ transform: 'rotate(0deg)' })),
    animate(100, style({ transform: 'rotate(1deg)' })),
    animate(100, style({ transform: 'rotate(0deg)' }))
  ])
])
