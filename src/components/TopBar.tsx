// TopBar.tsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PaletteIcon from "@mui/icons-material/Palette";
import SettingsIcon from "@mui/icons-material/Settings";
import PreviewIcon from "@mui/icons-material/Preview";
import Box from "@mui/material/Box";

interface TopBarProps {
  onExport: () => void;
  showPreviewPanel: boolean;
  showPropertyPanel: boolean;
  showComponentPalette: boolean;
  propertyPanelPosition: "right" | "bottom";
  onTogglePanel: (panel: "preview" | "property" | "palette") => void;
  onTogglePropertyPanelPosition: () => void;
}

const TopBar: React.FC<TopBarProps> = ({
  onExport,
  showPreviewPanel,
  showPropertyPanel,
  showComponentPalette,
  propertyPanelPosition,
  onTogglePanel,
  onTogglePropertyPanelPosition,
}) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Exlement Visual Editor
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mr: 2 }}>
          <Tooltip title="Toggle Preview Panel">
            <IconButton
              color="inherit"
              onClick={() => onTogglePanel("preview")}
            >
              {showPreviewPanel ? <PreviewIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Toggle Property Panel">
            <IconButton
              color="inherit"
              onClick={() => onTogglePanel("property")}
            >
              {showPropertyPanel ? <SettingsIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Toggle Component Palette">
            <IconButton
              color="inherit"
              onClick={() => onTogglePanel("palette")}
            >
              {showComponentPalette ? <PaletteIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Toggle Property Panel Position">
            <IconButton color="inherit" onClick={onTogglePropertyPanelPosition}>
              <CompareArrowsIcon
                sx={{
                  transform:
                    propertyPanelPosition === "right"
                      ? "rotate(90deg)"
                      : "none",
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
        <Button color="inherit" variant="outlined" onClick={onExport}>
          Export HTML
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
