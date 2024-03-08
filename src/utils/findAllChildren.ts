export const findAllChildren = (warehouse_id: any, areas: any[]) => {
  let children: any[] = []
  areas.forEach(area => {
    if (area.warehouse_id === warehouse_id) {
      children.push(area, ...findAllChildren(area.id, areas))
    }
  })
  return children
}
