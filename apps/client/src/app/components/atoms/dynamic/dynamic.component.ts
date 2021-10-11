import { Component, Input, ViewChild, ComponentFactoryResolver, ComponentRef, EventEmitter, Output } from '@angular/core'

import { DynamicDirective } from './dynamic.directive'
import * as DynamicInterface from './dynamic.interface'
import { DynamicClass } from './dynamic.class'

@Component({
  selector: 'app-a-dynamic',
  templateUrl: './dynamic.component.html',
})
export class DynamicComponent {
  _component!: DynamicClass
  @Input() set component(component: DynamicClass) {
    if (!component) {
      return
    }
    this._component = component
    this.__init()
  }
  get component(): DynamicClass {
    return this._component
  }

  @Input() set data(data: any) {
    if (!this.componentRef) {
      return
    }
    this.__update(data)
  }
  @ViewChild(DynamicDirective, { static: true }) directive!: DynamicDirective

  @Output() selected: EventEmitter<any> = new EventEmitter<any>()
  @Output() destroy: EventEmitter<never> = new EventEmitter<never>()

  componentRef!: ComponentRef<DynamicClass> | undefined

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  private __init(): void {
    this.directive.viewContainerRef.clear()
    this.componentRef = this.directive.viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(this.component.component)
    )
    this.componentRef.instance.offset = this.component.offset

    this.__update(this.component.data)
    this.__event()
  }

  private __update(data: DynamicInterface.Data): void {
    if (!this.componentRef) {
      return
    }
    this.componentRef.instance.data = data
  }

  private __event(): void {
    if (!this.componentRef) {
      return
    }

    if (!!this.componentRef.instance.selected) {
      this.componentRef.instance.selected.subscribe((event: any) => {
        this.selected.emit(event)
      })
    }

    if (!!this.componentRef.instance.destroy) {
      this.componentRef.instance.destroy.subscribe(() => {
        this.destroy.emit()
      })
    }
  }

  public onDestroy(): void {
    if (!this.componentRef) {
      return
    }
    this.componentRef.destroy()
    this.componentRef = undefined
  }

}
