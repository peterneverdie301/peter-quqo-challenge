import { Products, ProductsNode } from '@/types/products'

export const buildProductsTree = (areas: Products[]): ProductsNode[] => {
  const nodeMap = new Map<number, ProductsNode>()

  areas.forEach(area => {
    nodeMap.set(area.id, { ...area, children: [] })
  })

  areas.forEach(area => {
    if (area.warehouse_id !== null) {
      const parent = nodeMap.get(area.warehouse_id)
      const child = nodeMap.get(area.id)

      if (parent && child) {
        parent.children = parent.children || []
        parent.children.push(child)
      }
    }
  })

  const findAllChildren = (parentId: any, areas: any[]) => {
    let children: any[] = []
    areas.forEach(area => {
      if (area.parentId === parentId) {
        children.push(area, ...findAllChildren(area.id, areas))
      }
    })
    return children
  }

  return Array.from(nodeMap.values()).filter(node => node.warehouse_id === null)
}
