import { ProductsNode, RenderTree } from '@/types/products'

export const convertToRenderTree = (node: ProductsNode): RenderTree => {
  return {
    id: node.id.toString(),
    name: node.name,
    children: node.children?.map(convertToRenderTree)
  }
}
