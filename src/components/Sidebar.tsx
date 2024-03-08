import * as React from 'react'
import Box from '@mui/material/Box'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { TreeView, TreeItem } from '@mui/x-tree-view'
import { Products, RenderTree } from '@/types/products'
import { buildProductsTree } from '@/utils/buildProductsTree'
import { convertToRenderTree } from '@/utils/treeUtils'

interface SidebarProps {
  data: Products[]
  onNodeSelect: (nodeId: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ data, onNodeSelect }) => {
  const treeData = buildProductsTree(data).map(convertToRenderTree)
  console.log('Tree data:', treeData)

  const renderTree = (nodes: RenderTree) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onClick={() => onNodeSelect(nodes.id)}>
      {Array.isArray(nodes.children) ? nodes.children.map(renderTree) : null}
    </TreeItem>
  )

  return (
    <Box sx={{ minHeight: 110, flexGrow: 1, maxWidth: 300, background: '#EEEEEE' }}>
      <TreeView
        aria-label='rich object'
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {treeData.map(renderTree)}
      </TreeView>
    </Box>
  )
}
