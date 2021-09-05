import { Component, Input, HostListener, Output, EventEmitter } from '@angular/core'

type Type = 'right' | 'left' | 'top' | 'bottom'

interface Size {
  x?: number
  y?: number
}

interface Style {
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
  'text-align'?: string
}

type Move = Size

@Component({
  selector: 'app-a-area-mover',
  templateUrl: './area-mover.component.html',
  styleUrls: ['./area-mover.component.scss'],
})
export class AreaMoverComponent {
  @Output() moved: EventEmitter<Move> = new EventEmitter<Move>()

  // TODO right以外のタイプは修正の必要あり
  style: Style | '' = ''
  @Input() set type(type: Type) {
    switch (type) {
      case 'right':
        this.style = { top: '50%', 'text-align': 'left' }
        break
      case 'left':
        this.style = { top: '50%', 'text-align': 'right' }
        break
      case 'top':
        this.style = { left: '50%', top: 0 }
        break
      case 'bottom':
        this.style = { left: '50%', bottom: 0 }
        break
      default:
        break
    }
  }
  _size: Size = { x: 0, y: 0 }
  @Input()
  set size(size: Size) {
    this._size = { x: 0, y: 0, ...size }
  }
  get size(): Size {
    return this._size
  }

  holding = false
  move: Move = { x: 0, y: 0 }

  constructor() {}

  onHold(e: Event, hold: boolean): void {
    e.stopPropagation()
    this.holding = hold
    this.move = this.size
  }

  @HostListener('document:mousemove', ['$event'])
  onHostMousemove(e: MouseEvent) {
    if (!this.holding) {
      return
    }
    if (!e.buttons) {
      this.onHold(e, false)
      return
    }
    if (!this.move.x) {
      this.move.x = 0
    }
    if (!this.move.y) {
      this.move.y = 0
    }
    this.move.x -= e.movementX
    this.move.y -= e.movementY
    this.moved.emit(this.move)
    return false
  }
}
