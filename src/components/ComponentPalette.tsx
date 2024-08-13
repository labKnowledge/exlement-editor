// ComponentPalette.tsx
import React from "react";
import { useDrag } from "react-dnd";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { componentGroups } from "../exlementTypes/componentTypes";

// Import icons for component groups
import WebIcon from "@mui/icons-material/Web";
import LayoutIcon from "@mui/icons-material/ViewQuilt";
import AiIcon from "@mui/icons-material/Psychology";
import TransformIcon from "@mui/icons-material/Transform";

// Import icons for individual components
import PageIcon from "@mui/icons-material/Description";
import HeaderIcon from "@mui/icons-material/ViewHeadline";
import FooterIcon from "@mui/icons-material/ViewAgenda";
import ContentIcon from "@mui/icons-material/TextFields";
import ImageContentIcon from "@mui/icons-material/Image";
import ProductInfoIcon from "@mui/icons-material/InfoOutlined";
import TeamIcon from "@mui/icons-material/Group";
import TestimonialIcon from "@mui/icons-material/FormatQuote";
import HeadingIcon from "@mui/icons-material/Title";
import ContainerIcon from "@mui/icons-material/Inbox";
import ColumnIcon from "@mui/icons-material/ViewColumn";
import LayoutComponentIcon from "@mui/icons-material/Dashboard";
import CardLayoutIcon from "@mui/icons-material/ViewModule";
import CardIcon from "@mui/icons-material/CreditCard";
import TabsIcon from "@mui/icons-material/Tab";
import NavMenuIcon from "@mui/icons-material/Menu";
import GalleryIcon from "@mui/icons-material/Collections";
import ProofreaderIcon from "@mui/icons-material/Spellcheck";
import ContentGeneratorIcon from "@mui/icons-material/AutoFixHigh";
import ChatIcon from "@mui/icons-material/Chat";
import CodeEditorIcon from "@mui/icons-material/Code";
import TranslatorIcon from "@mui/icons-material/Translate";
import GeneratorIcon from "@mui/icons-material/AutoAwesome";
import SpeechToTextIcon from "@mui/icons-material/RecordVoiceOver";
import ImageCaptionerIcon from "@mui/icons-material/ImageSearch";
import VoiceAssistantIcon from "@mui/icons-material/Assistant";


const componentIcons: { [key: string]: React.ElementType } = {
  "page-base": PageIcon,
  "page-top": HeaderIcon,
  "page-bottom": FooterIcon,
  "page-content": ContentIcon,
  "page-image-content": ImageContentIcon,
  "page-product-info": ProductInfoIcon,
  "page-team": TeamIcon,
  "page-testimonial": TestimonialIcon,
  "page-heading": HeadingIcon,
  "page-container": ContainerIcon,
  "page-column": ColumnIcon,
  "page-layout": LayoutComponentIcon,
  "page-card-layout": CardLayoutIcon,
  "page-card": CardIcon,
  "page-tabs": TabsIcon,
  "page-nav-menu": NavMenuIcon,
  "page-image-gallery": GalleryIcon,
  "page-proofreader": ProofreaderIcon,
  "page-content-generator": ContentGeneratorIcon,
  "page-chat": ChatIcon,
  "page-ai-code-editor": CodeEditorIcon,
  "page-translator": TranslatorIcon,
  "page-tx-generator": GeneratorIcon,
  "page-tx-speech-to-text": SpeechToTextIcon,
  "page-tx-image-captioner": ImageCaptionerIcon,
  "page-tx-chat": ChatIcon,
  "page-txonn-chat": ChatIcon,
  "page-voice-ai-assistant": VoiceAssistantIcon,
};

const groupIcons: { [key: string]: React.ElementType } = {
  Basic: WebIcon,
  Layout: LayoutIcon,
  AI: AiIcon,
  "Transformers (TX)": TransformIcon,
};

const ComponentPalette: React.FC = () => {
  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        width: "100%",
        m: 1,
        p: 2,
        overflow: "auto",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Components
      </Typography>
      {componentGroups.map((group) => (
        <Accordion key={group.name}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {React.createElement(groupIcons[group.name] || WebIcon, {
                sx: { mr: 1 },
              })}
              <Typography>{group.name}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {group.components.map((component) => (
                <DraggableComponent key={component.type} {...component} />
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

const DraggableComponent: React.FC<{
  type: string;
  name: string;
  isContainer: boolean;
}> = ({ type, name, isContainer }) => {
  const [, drag] = useDrag(() => ({
    type: "COMPONENT",
    item: { type, name, isContainer },
  }));

  const Icon = componentIcons[type] || WebIcon;

  return (
    <ListItem
      ref={drag}
      button
      sx={{
        cursor: "move",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
};

export default ComponentPalette;
