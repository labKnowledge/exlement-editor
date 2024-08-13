import React from "react";
import { Grid, Typography, Box } from "@mui/material";

const SimpleLayout: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box p={2}>
          <Typography variant="h4" gutterBottom>
            Left Side Text
          </Typography>
          <Typography variant="body1">
            This is some sample text that appears on the left side of the
            layout. You can add more content here as needed.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          p={2}
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Typography variant="h6">Placeholder for Image</Typography>
          {/* Replace the Typography above with your actual image component */}
          {/* For example: <img src="your-image-url.jpg" alt="Description" style={{ maxWidth: '100%', height: 'auto' }} /> */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default SimpleLayout;
