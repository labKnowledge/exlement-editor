// components/ExportModal.tsx
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ComponentData } from "../models/models";

interface ExportModalProps {
  open: boolean;
  components: ComponentData[];
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({
  open,
  components,
  onClose,
}) => {
  const generateHTML = () => {
    const renderComponent = (
      component: ComponentData,
      indentLevel: number
    ): string => {
      const indent = "  ".repeat(indentLevel);
      const props = Object.entries(component.props)
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ");

      const childComponents = component.children
        .map((childId) => components.find((c) => c.id === childId.id))
        .filter((c): c is ComponentData => c !== undefined);

      if (childComponents.length === 0) {
        // For components without children, still use opening and closing tags
        return `${indent}<${component.type} ${props}></${component.type}>`;
      } else {
        // For components with children, render with opening and closing tags
        const childrenHTML = childComponents
          .map((child) => renderComponent(child, indentLevel + 1))
          .join("\n");

        return `${indent}<${component.type} ${props}>\n${childrenHTML}\n${indent}</${component.type}>`;
      }
    };

    const rootComponents = components.filter((c) => c.parent === null);
    const content = rootComponents.map((c) => renderComponent(c, 2)).join("\n");

    return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Exported Exlement Page</title>
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
</html>`.trim();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Exported HTML</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          multiline
          rows={20}
          variant="outlined"
          value={generateHTML()}
          InputProps={{
            readOnly: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(generateHTML());
          }}
          color="primary"
        >
          Copy to Clipboard
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExportModal;
