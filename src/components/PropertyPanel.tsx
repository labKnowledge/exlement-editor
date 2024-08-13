// components/PropertyPanel.tsx
import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ComponentData } from "../models/models";
import { componentGroups } from "../exlementTypes/componentTypes";

interface PropertyPanelProps {
  component: ComponentData | null;
  onUpdateComponent: (updatedComponent: ComponentData) => void;
  position: string;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({
  component,
  onUpdateComponent,
  position
}) => {
  if (!component) {
    return (
      <Box
        component={Paper}
        elevation={3}
        sx={{
          width: position==="right" ?  250 : "100%",
          m: 1,
          p: 2,
          overflow: "auto",
        }}
      >
        <Typography variant="body1">No component selected</Typography>
      </Box>
    );
  }

  const componentType = componentGroups.reduce((acc: any, group) => {
    const found = group.components.find((c) => c.type === component.type);
    return found ? found : acc;
  }, null);

  const handleChange = (name: string, value: any) => {
    console.log("Property change:", name, value);

    component.props[name] = value;
    onUpdateComponent({
      ...component,
      props: {
        ...component.props
      },
    });
  };

  const renderPropertyField = (key: string, value: any) => {
    if (typeof value === "boolean") {
      return (
        <FormControlLabel
          control={
            <Switch
              checked={value}
              onChange={(e) => handleChange(key, e.target.checked)}
              name={key}
            />
          }
          label={key}
        />
      );
    } else if (key === "theme") {
      return (
        <FormControl fullWidth margin="normal">
          <InputLabel id={`${key}-label`}>{key}</InputLabel>
          <Select
            labelId={`${key}-label`}
            name={key}
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select>
        </FormControl>
      );
    } else if (key === "ai-type") {
      return (
        <FormControl fullWidth margin="normal">
          <InputLabel id={`${key}-label`}>{key}</InputLabel>
          <Select
            labelId={`${key}-label`}
            name={key}
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
          >
            <MenuItem value="openai">OpenAI</MenuItem>
            <MenuItem value="ollama">Ollama</MenuItem>
          </Select>
        </FormControl>
      );
    } else {
      return (
        <TextField
          key={key}
          fullWidth
          margin="normal"
          name={key}
          label={key}
          value={value as string}
          onChange={(e) => handleChange(key, e.target.value)}
        />
      );
    }
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        width: position === "right" ? 250 : "100%",
        m: 1,
        p: 2,
        overflow: "auto",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Properties: {component.name}
      </Typography>
      {componentType &&
        Object.entries(componentType.props).map(([key, defaultValue]) =>
          renderPropertyField(key, component.props[key] ?? defaultValue)
        )}
    </Box>
  );
};

export default PropertyPanel;
