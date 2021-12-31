import React, { useEffect, useState } from 'react';
import { uniq } from 'lodash';
import { useQuery } from '@apollo/client';

import { Box } from '@mui/material/';
import Spinner from 'components/Spinner';
import TournamentRounds from 'components/pages/AppPage/TournamentPage/ViewTournamentPage/TournamentRounds';
import TournamentPlayers from 'components/pages/AppPage/TournamentPage/ViewTournamentPage/TournamentPlayers';
import TournamentDetails from 'components/pages/AppPage/TournamentPage/ViewTournamentPage/TournamentDetails';

import { GET_USERS } from 'graphql/queries/queries';
import { Tournament, User } from 'types/types';

interface ViewTournamentPageProps {
  tournament: Nullable<Tournament>;
}

const ViewTournamentPage = ({
  tournament
}: ViewTournamentPageProps): JSX.Element => {
  const [selectedRound, setSelectedRound] = useState<Nullable<string>>(null);

  const standings = tournament?.standings || [];
  const players = tournament?.players || [];
  const userIds = uniq([
    ...standings.map((standing) => standing.userId),
    ...players
  ]);

  useEffect(() => {
    if (tournament?.rounds.length) {
      setSelectedRound(tournament.rounds[tournament.rounds.length - 1]._id);
    }
  }, [tournament]);

  const { data: usersData, loading } = useQuery<{
    getUsers: Nullable<User[]>;
  }>(GET_USERS, { variables: { userIds }, fetchPolicy: 'cache-and-network' });

  const users = usersData?.getUsers;

  // todo
  // active tournament toggle
  // footer?
  // leave tournament button

  return (
    <Box sx={{ height: '100%', maxWidth: '360px', width: '100%' }} mx={'auto'}>
      {loading && !users ? (
        <Spinner />
      ) : (
        tournament &&
        users && (
          <>
            <TournamentDetails tournament={tournament} />
            <TournamentRounds
              users={users}
              tournament={tournament}
              selectedRound={selectedRound}
              setSelectedRound={setSelectedRound}
            />
            <TournamentPlayers users={users} tournament={tournament} />
            <Box mt={6}>ㅤ</Box> {/*// give some space at the bottom*/}
          </>
        )
      )}
    </Box>
  );
};

export default ViewTournamentPage;
