import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40vh",
  },
};

export default function CircularIndeterminate() {
  return (
    <Box sx={styles.container}>
      <CircularProgress />
    </Box>
  );
}
