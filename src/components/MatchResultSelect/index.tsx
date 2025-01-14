import React, { ChangeEvent, useContext } from 'react';

import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import Spinner from 'components/Spinner';

import { useMutation } from '@apollo/client';
import { UPDATE_MATCH } from 'graphql/mutations/mutations';
import { onError } from 'graphql/errorHandler';

import { useStyles } from 'components/MatchResultSelect/styles';
import { MatchResult, MatchWithUserInfo } from 'types/types';
import { WebsocketContext } from 'context/websocketContext';

interface MatchResultSelectProps {
  match: MatchWithUserInfo;
}

const MatchResultSelect = ({ match }: MatchResultSelectProps): JSX.Element => {
  const { isOnline } = useContext(WebsocketContext);
  const classes = useStyles();

  const [updateMatch, { loading }] = useMutation(UPDATE_MATCH, {
    onError
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    void updateMatch({
      variables: { matchId: match._id, payload: { result: e.target.value } }
    });
  };

  return (
    <Box mt={0.5}>
      <Typography variant={'h5'} align={'center'}>
        Match result
      </Typography>

      <Box
        display={'flex'}
        justifyContent={'center'}
        sx={{ height: '84px', width: '100%' }}
      >
        {loading ? (
          <Box mt={5} width={'220px'}>
            <Spinner linear />
          </Box>
        ) : (
          <>
            <FormControl component="fieldset">
              <RadioGroup
                name="controlled-radio-buttons-group"
                onChange={onChange}
                value={match.result}
                row
              >
                <Box className={classes.container}>
                  <FormControlLabel
                    disabled={!isOnline}
                    control={<Radio />}
                    label={`${match.white?.firstName} won`}
                    value={MatchResult.WhiteWon}
                  />
                  <div className={classes.matchColor}>white</div>
                </Box>
                <Box className={classes.container}>
                  <FormControlLabel
                    disabled={!isOnline}
                    control={<Radio />}
                    label={`${match.black?.firstName} won`}
                    value={MatchResult.BlackWon}
                  />
                  <div className={classes.matchColor}>black</div>
                </Box>
              </RadioGroup>
              <RadioGroup
                name="controlled-radio-buttons-group"
                onChange={onChange}
                value={match.result}
                row
              >
                <FormControlLabel
                  disabled={!isOnline}
                  control={<Radio />}
                  label="Draw"
                  value={MatchResult.Draw}
                />
                <FormControlLabel
                  disabled={!isOnline}
                  control={<Radio />}
                  label="Did not start"
                  value={MatchResult.DidNotStart}
                />
              </RadioGroup>
            </FormControl>
          </>
        )}
      </Box>
    </Box>
  );
};

export default MatchResultSelect;
