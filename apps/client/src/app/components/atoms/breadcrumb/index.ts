import { Breadcrumb, Type } from './breadcrumb.interface'
import { Project } from '~types/db/client/projects'
import { Tree } from '~types/db/client/project/trees'

export * from './breadcrumb.interface'

const PROJECTS: Breadcrumb = { label: 'プロジェクト一覧', url: 'projects' }
const PROJECT = (project: Project) => ({ label: project.name, url: `projects/${project.id}` })
const TREES: Breadcrumb = { label: 'ツリー一覧', url: 'trees' }
const TREE = (project: Project, tree: Tree) => ({ label: tree.name, url: `trees/${project.id}/${tree.id}` })

export const getBreadcrumb = (type: Type, project?: Project | null, tree?: Tree | null):  Breadcrumb[] => {
  const breadcrumbs: Breadcrumb[] = [PROJECTS]
  switch (type) {
    case 'projects':
      break
    case 'project':
      if (project) {
        breadcrumbs.push(PROJECT(project))
      }
      break
    case 'trees':
      if (project) {
        breadcrumbs.push(PROJECT(project))
      }
      breadcrumbs.push(TREES)
      break
    case 'tree':
      if (project) {
        breadcrumbs.push(PROJECT(project))
      }
      breadcrumbs.push(TREES)
      if (project && tree) {
        breadcrumbs.push(TREE(project, tree))
      }
  }
  return breadcrumbs
}
