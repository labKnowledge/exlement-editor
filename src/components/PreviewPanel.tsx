// components/PreviewPanel.tsx
import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ComponentData } from "../models/models";
import { IconButton } from "@mui/material";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import RefreshIcon from "@material-ui/icons/Refresh";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

interface PreviewPanelProps {
  components: ComponentData[];
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ components }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    updatePreview();
  }, [components]);

  const updatePreview = () => {
    if (iframeRef.current) {
      const iframeDoc = iframeRef.current.contentDocument;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(generatePreviewHTML());
        iframeDoc.close();
      }
    }
  };

  const generatePreviewHTML = () => {
    const renderComponent = (component: ComponentData): string => {
      const props = Object.entries(component.props)
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ");

      const childrenHTML = component.children
        .map((childId) => {
          const childComponent = components.find((c) => c.id === childId.id);
          return childComponent ? renderComponent(childComponent) : "";
        })
        .join("");

      return `<${component.type} ${props}>${childrenHTML}</${component.type}>`;
    };

    const content = components
      .filter((c) => c.parent === null)
      .map(renderComponent)
      .join("");

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Exlement Preview</title>
        <link rel="stylesheet" href="https://unpkg.com/exlement@1.1.1/assets/css/exlement.css">
        <script src="https://unpkg.com/exlement@1.1.1/exlement.js"></script>
        <script src="https://unpkg.com/exlement@1.1.1/tx-exlement.js"></script>
      </head>
      <body>
        ${content}
         <script>
        // This is a placeholder for the API key. In a real application, you would need to securely manage this key.
        window.EXLEMENT_CONFIG = {
            OPENAI_API_KEY: 'your-api-key-here'
        };
    </script>
      </body>
      </html>
    `;
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        width: "100%",
        m: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f1f3f4",
          borderBottom: "1px solid #dadce0",
          padding: "4px 8px",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
          <IconButton size="small" sx={{ color: "#5f6368" }}>
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: "#5f6368" }}>
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: "#5f6368" }}>
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 50,
            padding: "4px 8px",
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "#5f6368", ml: 1 }}>
            Exlement Preview
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          position: "relative",
          minHeight: "300px",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <iframe
          ref={iframeRef}
          title="Exlement Preview"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </Box>
    </Box>
  );
};

export default PreviewPanel;
