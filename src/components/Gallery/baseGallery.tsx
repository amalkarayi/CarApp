import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

interface GalleryProps<T> {
  title: string;
  description?: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  isLoading: boolean;
  error: any;
  emptyMessage?: string;
}

const BaseGallery = <T,>({
  title,
  description,
  items,
  renderItem,
  isLoading,
  error,
  emptyMessage="Nothing here!"
}: GalleryProps<T>) => {
  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">An error occurred while fetching cars.</Alert>;
  }

  return (
    <Box
      sx={{
        backgroundColor: "rgba(245, 225, 220, 0.4)",
        padding: 2,
        borderRadius: 1,
        textAlign: "left",
      }}
    >
      <Box mb={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" color="textSecondary">
            {description}
          </Typography>
        )}
      </Box>
      {
        (items.length === 0)? <Alert severity="info">{emptyMessage}</Alert>:
        <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            {renderItem(item)}
          </Grid>
        ))}
      </Grid>
      }

    </Box>
  );
};

export default BaseGallery;
