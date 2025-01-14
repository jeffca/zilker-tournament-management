import React, { Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import FaceIcon from '@mui/icons-material/Face';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ArticleIcon from '@mui/icons-material/Article';
import GroupsIcon from '@mui/icons-material/Groups';
import PaidIcon from '@mui/icons-material/Paid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import { Page } from 'types/page';
import { useStyles } from 'components/SideMenu/styles';

enum MenuItem {
  Play = 'Play',
  Profile = 'Profile',
  Tournaments = 'Tournaments',
  Rules = 'Rules',
  Community = 'Community',
  Stats = 'Stats',
  Donate = 'Donate'
}

interface SideMenuProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SideMenu = ({ open, setOpen }: SideMenuProps): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const menuItems = [
    MenuItem.Play,
    MenuItem.Tournaments,
    MenuItem.Profile,
    MenuItem.Community,
    MenuItem.Rules,
    MenuItem.Stats,
    MenuItem.Donate
  ];

  const generateMenuList = (list: string[]): JSX.Element => {
    const getIcon = (text: string): JSX.Element => {
      switch (text) {
        case MenuItem.Profile:
          return <FaceIcon />;
        case MenuItem.Tournaments:
          return <ArticleIcon />;
        case MenuItem.Rules:
          return <MenuBookIcon />;
        case MenuItem.Community:
          return <GroupsIcon />;
        case MenuItem.Donate:
          return <PaidIcon />;
        case MenuItem.Stats:
          return <TrendingUpIcon />;
        case MenuItem.Play:
        default:
          return <SportsEsportsIcon />;
      }
    };

    const getDestination = (text: string): string => {
      switch (text) {
        case MenuItem.Tournaments:
          return Page.Tournaments;
        case MenuItem.Rules:
          return Page.Rules;
        case MenuItem.Community:
          return Page.Community;
        case MenuItem.Donate:
          return Page.Donate;
        case MenuItem.Stats:
          return Page.Stats;
        case MenuItem.Play:
          return Page.Tournament.replace(':tournamentId', '');
        case MenuItem.Profile:
        default:
          return Page.Profile;
      }
    };

    return (
      <List>
        {list.map((text) => (
          <div key={text}>
            <ListItem
              button
              onClick={(): void =>
                history.push(getDestination(text) + history.location.search)
              }
            >
              <div className={classes.listItem}>
                <ListItemIcon sx={{ color: '#3878ff' }}>
                  {getIcon(text)}
                </ListItemIcon>
                <ListItemText primary={text} />
              </div>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    );
  };

  return (
    <SwipeableDrawer
      anchor={'left'}
      open={open}
      onClose={(): void => setOpen(false)}
      onOpen={(): void => setOpen(true)}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={(): void => setOpen(false)}
        onKeyDown={(): void => setOpen(false)}
      >
        {generateMenuList(menuItems)}
      </Box>
    </SwipeableDrawer>
  );
};

export default SideMenu;
