import React from 'react';
import { useSubscription } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';

import Player from 'components/Player';
import MatchResultSelect from 'components/MatchResultSelect';

import ChessBoard from 'svg/chessBoard.svg';

import { useStyles } from 'components/pages/AppPage/TournamentPage/MatchPage/styles';
import { Box, Divider, Typography } from '@mui/material';
import { MatchWithUserInfo, Tournament } from 'types/types';
import { MATCH_UPDATED } from 'graphql/subscriptions/subscriptions';
import TournamentHeader from '../../../../MainHeader/TournamentHeader';

interface MatchPageProps {
  match: MatchWithUserInfo;
  tournament: Nullable<Tournament>;
}

const MatchPage = ({ match, tournament }: MatchPageProps): JSX.Element => {
  const shortWindow = useMediaQuery({ query: '(max-height: 590px)' });
  const classes = useStyles();

  const { data: updatedMatchData } = useSubscription<{
    matchUpdated: Nullable<Partial<MatchWithUserInfo>>;
  }>(MATCH_UPDATED, {
    variables: { matchIds: [match._id] }
  });

  const whitePlayer = match.white;
  const blackPlayer = match.black;
  const mergedMatch = {
    ...match,
    ...(updatedMatchData?.matchUpdated || {})
  };

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'100%'}
    >
      <TournamentHeader tournament={tournament} />
      {!whitePlayer || !blackPlayer || !mergedMatch ? (
        <div>
          <Typography>You don’t have an opponent for this round.</Typography>
          <Typography>
            You’ll have to wait until the next round... 😑
          </Typography>
        </div>
      ) : (
        <Box sx={{ width: '100%' }} pt={2}>
          <Player
            player={blackPlayer}
            ratingBefore={mergedMatch.blackRating}
            ratingAfter={mergedMatch.newBlackRating}
            hideAvatar={shortWindow}
          />

          <Box display={'flex'} justifyContent={'center'} mb={2}>
            <div
              style={{
                position: 'relative',
                border: '5px solid rgb(191 191 191)',
                borderRadius: '8px'
              }}
            >
              <div className={classes.boardNumber}>
                <Typography variant="h6">{`#${mergedMatch.boardNumber}`}</Typography>
              </div>
              <img
                src={ChessBoard}
                width={150}
                height={150}
                alt={'Chess board'}
              />
            </div>
          </Box>

          <Player
            player={whitePlayer}
            ratingBefore={mergedMatch.whiteRating}
            ratingAfter={mergedMatch.newWhiteRating}
            hideAvatar={shortWindow}
          />

          <Divider />

          <MatchResultSelect match={mergedMatch} />
        </Box>
      )}
    </Box>
  );
};

export default MatchPage;
