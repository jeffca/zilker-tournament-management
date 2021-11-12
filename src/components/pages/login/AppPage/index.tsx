import React, { useState } from 'react';
import { Role, User } from 'types/types';
import { Route } from 'react-router-dom';

import { Pages } from 'types/pages';
import { useStyles } from 'components/pages/login/AppPage/styles';

import Button from '@mui/material/Button';
import SideMenu from 'components/SideMenu';
import PlayPage from 'components/pages/app/PlayPage';
import TournamentPage from 'components/pages/app/TournamentPage';

interface AppPageProps {
  me: User;
}

const AppPage = ({ me }: AppPageProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const isAdmin = me.role === Role.admin;

  return (
    <div className={classes.root}>
      <div className={classes.openMenu}>
        <Button onClick={(): void => setOpen(true)}>Menu</Button>
      </div>
      <SideMenu open={open} setOpen={setOpen} isAdmin={isAdmin} />
      <Route
        path={Pages.play}
        render={(): JSX.Element => <PlayPage me={me} />}
      />
      <Route path={Pages.profile} />
      <Route path={Pages.players} />
      <Route
        path={Pages.tournaments}
        render={(): JSX.Element => <TournamentPage isAdmin={isAdmin} />}
      />
    </div>
  );
};

export default AppPage;