/* eslint-disable @typescript-eslint/no-explicit-any */
// App.tsx
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import { componentGroups } from "./exlementTypes/componentTypes";
import EditorCanvas from "./components/EditorCanvas";
import ComponentPalette from "./components/ComponentPalette";
import PropertyPanel from "./components/PropertyPanel";
import TopBar from "./components/TopBar";
import ExportModal from "./components/ExportModal.tsx";
import { ComponentData } from "./models/models.ts";
import PreviewPanel from "./components/PreviewPanel.tsx";
import "./Split.css";
import Split from "react-split";

// Create a theme instance. This is currently empty but can be customized.
const theme = createTheme({
  // Customize your theme here
});

const App: React.FC = () => {
  // State for managing the list of components in the editor
  const [components, setComponents] = useState<ComponentData[]>([]);
  // State for tracking the currently selected component
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentData | null>(null);
  // State for controlling the visibility of the export modal
  const [showExportModal, setShowExportModal] = useState(false);
  const [showPreviewPanel, setShowPreviewPanel] = useState(true);
  const [showPropertyPanel, setShowPropertyPanel] = useState(true);
  const [showComponentPalette, setShowComponentPalette] = useState(true);
  const [propertyPanelPosition, setPropertyPanelPosition] = useState<
    "right" | "bottom"
  >("bottom");

  // Handler for dropping new components into the editor
  const handleDrop = (item: any, parentId: string | null) => {
    const componentType = componentGroups.reduce((acc: any, group) => {
      const found = group.components.find((c) => c.type === item.type);
      return found ? found : acc;
    }, null);

    if (!componentType) {
      console.error(`Component type ${item.type} not found`);
      return;
    }

    const newComponent: ComponentData = {
      id: Date.now().toString(),
      type: item.type,
      name: item.name,
      children: [],
      props: { ...componentType.props },
      parent: parentId,
      isContainer: item.isContainer,
    };

    setComponents((prevComponents) => {
      // Add the new component to the array
      let updatedComponents = [...prevComponents, newComponent];

      // If there's a parent, update its children array
      if (parentId) {
        updatedComponents = updatedComponents.map((component) => {
          if (component.id === parentId) {
            return {
              ...component,
              children: [...component.children, newComponent],
            };
          }
          return component;
        });
      }

      return updatedComponents;
    });
  };

  const handleDeleteComponent = (componentId: string) => {
    setComponents((prevComponents) =>
      prevComponents.filter((component) => component.id !== componentId)
    );
  };
  // Handler for moving components within the editor
  const handleMoveComponent = (draggedId: string, targetId: string | null) => {
    setComponents((prevComponents) => {
      // Find the dragged component and its current parent
      const draggedComponent = prevComponents.find((c) => c.id === draggedId);
      if (!draggedComponent) return prevComponents;

      const oldParent = prevComponents.find((c) =>
        c.children.some((child) => child.id === draggedId)
      );

      // Helper function to recursively update the component tree
      const updateComponentTree = (
        components: ComponentData[]
      ): ComponentData[] => {
        return components.map((component) => {
          if (component.id === draggedId) {
            // Update the dragged component's parent
            return { ...component, parent: targetId };
          } else if (component.id === targetId) {
            // Add draggedComponent to the new parent's children
            return {
              ...component,
              children: [...component.children, draggedComponent],
            };
          } else if (component.id === oldParent?.id) {
            // Remove draggedComponent from the old parent's children
            return {
              ...component,
              children: component.children.filter(
                (child) => child.id !== draggedId
              ),
            };
          } else if (component.children.length > 0) {
            // Recursively update children
            return {
              ...component,
              children: updateComponentTree(component.children),
            };
          }
          return component;
        });
      };

      // Start the recursive update from the root level
      let updatedComponents = updateComponentTree(prevComponents);

      // If the target is null (dropping to the root level), move the component to the root
      if (targetId === null) {
        updatedComponents = updatedComponents.filter((c) => c.id !== draggedId);
        updatedComponents.push({ ...draggedComponent, parent: null });
      }

      return updatedComponents;
    });
  };

  // Handler for updating component properties
  const handleUpdateComponent = (updatedComponent: ComponentData) => {
    setComponents((prevComponents) =>
      prevComponents.map((c) =>
        c.id === updatedComponent.id ? updatedComponent : c
      )
    );
  };

  // Handler for showing the export modal
  const handleExport = () => {
    setShowExportModal(true);
  };

  const togglePanel = (panel: "preview" | "property" | "palette") => {
    switch (panel) {
      case "preview":
        setShowPreviewPanel(!showPreviewPanel);
        break;
      case "property":
        setShowPropertyPanel(!showPropertyPanel);
        break;
      case "palette":
        setShowComponentPalette(!showComponentPalette);
        break;
    }
  };

  const togglePropertyPanelPosition = () => {
    setPropertyPanelPosition((prevPosition) =>
      prevPosition === "right" ? "bottom" : "right"
    );
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={HTML5Backend}>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
          <TopBar
            onExport={handleExport}
            showPreviewPanel={showPreviewPanel}
            showPropertyPanel={showPropertyPanel}
            showComponentPalette={showComponentPalette}
            propertyPanelPosition={propertyPanelPosition}
            onTogglePanel={togglePanel}
            onTogglePropertyPanelPosition={togglePropertyPanelPosition}
          />
          <Box sx={{ flexGrow: 1, display: "flex", overflow: "hidden" }}>
            <Split
              sizes={showComponentPalette ? [20, 80] : [0, 100]}
              minSize={[showComponentPalette ? 50 : 0, 0]}
              expandToMin={false}
              gutterSize={10}
              gutterAlign="center"
              snapOffset={30}
              dragInterval={1}
              direction="horizontal"
              cursor="col-resize"
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              {showComponentPalette ? (
                <Box
                  sx={{
                    display: "flex",
                    flex: 1,
                    overflow: "auto",
                    height: "100%",
                    width: "100%"
                  }}
                >
                  <ComponentPalette />
                </Box>
              ) : (
                <Box />
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Split
                  sizes={showPreviewPanel ? [70, 30] : [100, 0]}
                  minSize={showPreviewPanel ? 200 : 0}
                  expandToMin={false}
                  gutterSize={10}
                  gutterAlign="center"
                  snapOffset={30}
                  dragInterval={1}
                  direction="horizontal"
                  cursor="col-resize"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <Split
                      sizes={
                        showPropertyPanel && propertyPanelPosition === "bottom"
                          ? [70, 30]
                          : [100, 0]
                      }
                      minSize={showPropertyPanel ? 100 : 0}
                      expandToMin={false}
                      gutterSize={10}
                      gutterAlign="center"
                      snapOffset={30}
                      dragInterval={1}
                      direction="vertical"
                      cursor="row-resize"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          overflow: "auto",
                          width: "100%",
                        }}
                      >
                        <EditorCanvas
                          components={components}
                          onDrop={handleDrop}
                          onSelectComponent={setSelectedComponent}
                          onMoveComponent={handleMoveComponent}
                          onDeleteComponent={handleDeleteComponent}
                        />
                      </Box>
                      {showPropertyPanel &&
                        propertyPanelPosition === "bottom" && (
                          <Box
                            sx={{
                              overflow: "auto",
                              width: "100%",
                              display: "flex",
                              flex: 1,
                            }}
                          >
                            <PropertyPanel
                              component={selectedComponent}
                              onUpdateComponent={handleUpdateComponent}
                              position={propertyPanelPosition}
                            />
                          </Box>
                        )}
                    </Split>
                  </Box>
                  {showPreviewPanel && (
                    <Box
                      sx={{
                        display: "flex",
                        flex: 1,
                        overflow: "auto",
                        height: "100%",
                      }}
                    >
                      <PreviewPanel components={components} />
                    </Box>
                  )}
                </Split>
              </Box>
            </Split>
            {showPropertyPanel && propertyPanelPosition === "right" && (
              <Box
                sx={{
                  width: 250,
                  overflow: "auto",
                  borderLeft: "1px solid #ccc",
                }}
              >
                <PropertyPanel
                  component={selectedComponent}
                  onUpdateComponent={handleUpdateComponent}
                  position={propertyPanelPosition}
                />
              </Box>
            )}
          </Box>
          <ExportModal
            open={showExportModal}
            components={components}
            onClose={() => setShowExportModal(false)}
          />
        </Box>
      </DndProvider>
    </ThemeProvider>
  );
};

export default App;