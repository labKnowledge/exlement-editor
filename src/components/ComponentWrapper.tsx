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
  onSelect: () => void;
  onDrop: (item: any, parentId: string) => void;
  onMove: (draggedId: string, targetId: string) => void;
  onMoveToIndex: (draggedId: string, parentId: string, index: number) => void;
  onDelete: (componentId: string) => void;
  children?: React.ReactNode;
}

const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  component,
  onSelect,
  onDrop,
  onMove,
  onMoveToIndex,
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

  // Helper for drop zones between children
  const DropZone: React.FC<{ index: number }> = ({ index }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
      accept: "COMPONENT",
      drop: (item: any) => {
        if (item.id) {
          onMoveToIndex(item.id, component.id, index);
        } else {
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
          height: 12,
          backgroundColor: isOver && canDrop ? 'primary.light' : 'transparent',
          transition: 'background 0.2s',
          my: 0.5,
          borderRadius: 1,
          cursor: 'pointer',
        }}
      />
    );
  };

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
          {/* Render drop zones and children */}
          {React.Children.map(children, (child, idx) => [
            <DropZone key={`dz-${idx}`} index={idx} />,
            child
          ])}
          {/* Drop zone after last child */}
          <DropZone key={`dz-end`} index={React.Children.count(children)} />
        </Box>
      )}
    </Box>
  );
};

export default ComponentWrapper;
