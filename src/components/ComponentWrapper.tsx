// ComponentWrapper.tsx
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { ComponentData } from "../models/models";

interface ComponentWrapperProps {
  component: ComponentData;
  onSelect: () => void;
  onDrop: (item: any, parentId: string) => void;
  onMove: (draggedId: string, targetId: string) => void;
  onDelete: (componentId: string) => void;
  children?: React.ReactNode;
}

const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  component,
  onSelect,
  onDrop,
  onMove,
  onDelete,
  children,
}) => {
  
    
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "COMPONENT",
      item: {
        id: component.id,
        type: component.type,
        isContainer: component.isContainer,
        children: component.children,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "COMPONENT",
    canDrop: () => component.isContainer,
    drop: (item: any, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      if (item.id) {
        onMove(item.id, component.id);
      } else {
        onDrop(item, component.id);
      }
      return { id: component.id };
    },
    end: (_item: any, monitor: any) => {
      const dropResult = monitor.getDropResult();
      if (!dropResult && isDragging) {
        // The component was dragged outside of any drop target
        onDelete(component.id);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
      canDrop: !!monitor.canDrop(),
    }),
  }));


  

  return (
    <Box
      ref={(node: any) => drag(drop(node))}
      component={Paper}
      elevation={2}
      sx={{
        position: "relative",
        margin: 1,
        padding: 1,
        cursor: "move",
        opacity: isDragging ? 0.5 : 1,
        backgroundColor:
          isOver && canDrop ? "action.hover" : "background.paper",
        border: isOver && canDrop ? "2px dashed" : "2px solid transparent",
        borderColor: "primary.main",
        minHeight: component.isContainer ? "100px" : "auto",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <Box sx={{ fontWeight: "bold", marginBottom: 1 }}>{component.name}</Box>
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
          {children}
        </Box>
      )}
    </Box>
  );
};

export default ComponentWrapper;
