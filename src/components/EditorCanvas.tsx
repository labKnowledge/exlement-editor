import React from "react";
import { useDrop } from "react-dnd";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ComponentWrapper from "./ComponentWrapper";
import { ComponentData } from "../models/models";

interface EditorCanvasProps {
  components: ComponentData[];
  onDrop: (item: any, parentId: string | null) => void;
  onSelectComponent: (component: ComponentData) => void;
  onMoveComponent: (draggedId: string, targetId: string | null) => void;
  onDeleteComponent: (componentID: string) => void
}

const EditorCanvas: React.FC<EditorCanvasProps> = ({
  components,
  onDrop,
  onSelectComponent,
  onMoveComponent,
  onDeleteComponent,
}) => {
    
  const [, drop] = useDrop(() => ({
    accept: "COMPONENT",
    drop: (item: any, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      if (item.id) {
        // This is an existing component being moved
        onMoveComponent(item.id, null);
      } else {
        // This is a new component being added
        onDrop(item, null);
      }
    },
  }));

  const renderComponent = (component: ComponentData) => (
    <ComponentWrapper
      key={component.id}
      component={component}
      onSelect={() => onSelectComponent(component)}
      onDrop={onDrop}
      onMove={onMoveComponent}
      onDelete={onDeleteComponent}
    >
      {component.children.map((childId) => {
        const childComponent = components.find((c) => c.id === childId.id);
        return childComponent ? renderComponent(childComponent) : null;
      })}
    </ComponentWrapper>
  );

  return (
    <Box
      ref={drop}
      component={Paper}
      elevation={3}
      sx={{
        flexGrow: 1,
        m: 1,
        p: 2,
        position: "relative",
        overflow: "auto",
        minHeight: "300px",
      }}
    >
      {/* {components.filter((c) => c.parent === null).map(renderComponent)} */}
      {components
        .filter((c) => c.parent === null)
        .map((c) => renderComponent(c))}
    </Box>
  );
};

export default EditorCanvas;
