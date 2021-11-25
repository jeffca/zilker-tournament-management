import React, { useState } from 'react';

import SideMenu from 'components/SideMenu';
import MainHeader from 'components/MainHeader';
import MainContent from 'components/MainContent';

import { useStyles } from 'components/pages/AppPage/styles';
import { Box, Divider } from '@mui/material/';

const AppPage = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SideMenu open={open} setOpen={setOpen} />
      <MainHeader setOpen={setOpen} />

      <Box py={1}>
        <Divider />
      </Box>

      <MainContent />
    </div>
  );
};

export default AppPage;