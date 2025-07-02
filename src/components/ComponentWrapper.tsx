// ComponentWrapper.tsx
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { ComponentData } from "../models/models";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface ComponentWrapperProps {
  component: ComponentData;
  index: number;
  parentId: string | null;
  onSelect: () => void;
  onDrop: (item: any, parentId: string) => void;
  onMove: (draggedId: string, targetId: string) => void;
  onMoveToIndex: (draggedId: string, parentId: string | null, index: number) => void;
  onDelete: (componentId: string) => void;
  children?: React.ReactNode;
}

const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  component,
  index,
  parentId,
  onSelect,
  onDrop,
  onMoveToIndex,
  onDelete,
  children,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "COMPONENT",
    item: { id: component.id, index, parentId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "COMPONENT",
    hover(item: any, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      const dragParentId = item.parentId;
      // Only move if not the same index and same parent
      if (dragIndex === hoverIndex && parentId === dragParentId) return;
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the item's height
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      // Move the item
      onMoveToIndex(item.id, parentId, hoverIndex);
      item.index = hoverIndex;
      item.parentId = parentId;
    },
  });

  drag(drop(ref));

  // Ensure children is always an array
  const childrenArray = React.Children.toArray(children);

  // Drop zone at the end of the container for new elements or moving existing ones to the end
  const EndDropZone: React.FC = () => {
    const [{ isOver, canDrop }, drop] = useDrop({
      accept: "COMPONENT",
      canDrop: (item: any) => {
        // Only allow drop if this is a container and not dropping into itself or its descendants
        if (!component.isContainer) return false;
        if (item.id === component.id) return false;
        let isDescendant = false;
        function checkDescendants(c: ComponentData) {
          if (c.children.some(child => child.id === item.id)) {
            isDescendant = true;
          } else {
            c.children.forEach(child => checkDescendants(child));
          }
        }
        checkDescendants(component);
        return !isDescendant;
      },
      drop: (item: any) => {
        if (item.id) {
          // Move existing component to the end
          onMoveToIndex(item.id, component.id, childrenArray.length);
        } else {
          // Add new component from palette
          onDrop(item, component.id);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    });
    return (
      <Box
        ref={drop}
        sx={{
          height: 24,
          backgroundColor: isOver && canDrop ? 'primary.light' : 'transparent',
          transition: 'background 0.2s',
          my: 1,
          borderRadius: 1,
          cursor: canDrop ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isOver && canDrop ? 'Drop here' : ''}
      </Box>
    );
  };

  return (
    <Box
      ref={ref}
      component={Paper}
      elevation={2}
      sx={{
        position: "relative",
        margin: 1,
        padding: 1,
        cursor: "move",
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: "background.paper",
        border: "2px solid transparent",
        borderColor: "primary.main",
        minHeight: component.isContainer ? "100px" : "auto",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
        <Box sx={{ fontWeight: "bold" }}>{component.name}</Box>
        <IconButton
          size="small"
          aria-label="delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(component.id);
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
      {component.isContainer && (
        <Box
          sx={{
            paddingLeft: 2,
            minHeight: "50px",
            border: "1px dashed",
            borderColor: "text.secondary",
            borderRadius: 1,
          }}
        >
          {childrenArray}
          <EndDropZone />
        </Box>
      )}
    </Box>
  );
};

export default ComponentWrapper;
