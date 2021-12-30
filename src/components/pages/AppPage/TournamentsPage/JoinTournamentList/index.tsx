import React, { useContext } from 'react';
import moment from 'moment';

import { Box, Card, Chip, Typography } from '@mui/material/';
import Bold from 'components/Bold';
import JoinTournamentButton from 'components/buttons/JoinTournamentButton';
import ViewTournamentButton from 'components/buttons/ViewTournamentButton';

import { Role, Tournament, TournamentStatus } from 'types/types';
import AddTournamentButton from 'components/buttons/AddTournamentButton';
import { UserContext } from 'context/userContext';

interface JoinTournamentListProps {
  label: string;
  tournaments: Tournament[];
  withCreateButton?: boolean;
}

const JoinTournamentList = ({
  label,
  tournaments,
  withCreateButton
}: JoinTournamentListProps): JSX.Element => {
  const me = useContext(UserContext);
  const isAdmin = me?.role === Role.Admin;

  return (
    <Box mb={3}>
      <Typography variant={'h6'}>{label}</Typography>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            width: '8px',
            height: '30vh',
            background: '#fafafa',
            right: '0px',
            border: '1px solid',
            borderColor: '#eaeaea'
          }}
        />
      </Box>
      <Box
        sx={{
          background: '#f3f3f3',
          height: '30vh',
          overflow: 'auto',
          borderTop: '2px solid',
          borderBottom: '2px solid',
          borderColor: '#e5e5e5'
        }}
        p={1}
      >
        {isAdmin && withCreateButton && <AddTournamentButton />}

        {tournaments.map((tournament, index) => {
          const amParticipant = tournament.players.includes(me?._id || '');

          return (
            <Card
              key={index}
              sx={{
                padding: '4px 8px',
                marginBottom: `${
                  index !== tournaments.length - 1 ? '12px' : ''
                }`,
                marginRight: '8px'
              }}
            >
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Box>
                  <Typography variant={'body1'} component={'span'}>
                    <Bold>{tournament.name}</Bold>
                  </Typography>
                  <Typography variant={'body2'}>
                    {moment(tournament.date).format('ll')}
                  </Typography>
                </Box>

                {amParticipant && (
                  <Chip
                    label={`${
                      tournament.status === TournamentStatus.Active
                        ? 'Joined'
                        : 'Played'
                    }`}
                  />
                )}

                <Box display={'flex'}>
                  <ViewTournamentButton tournamentId={tournament._id} />
                  {!amParticipant &&
                    tournament.status === TournamentStatus.Active && (
                      <JoinTournamentButton tournamentId={tournament._id} />
                    )}
                </Box>
              </Box>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default JoinTournamentList;