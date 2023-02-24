import { Box, Grid } from "@mui/material";
import { FunctionComponent } from "react";

const pageLimits = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
];

export const MoviesList: FunctionComponent = () => {

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'start', mb: 4 }}>
        {/*<Search onSearch={onSearch}></Search>*/}
      </Box>

      <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}>
        {/*{content}*/}
        {/*{deletedUsers}*/}
      </Grid>

    </Box>
  );
}
