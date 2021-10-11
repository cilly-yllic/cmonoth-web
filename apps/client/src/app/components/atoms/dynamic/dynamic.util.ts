import { DynamicClass } from './dynamic.class'

export const getComponent = (component: DynamicClass) => new DynamicClass(component.component, component.data, component.offset)

export const getComponents = (components: DynamicClass[]) => components.map((component) => getComponent(component))
