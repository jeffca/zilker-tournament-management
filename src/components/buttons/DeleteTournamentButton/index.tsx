import React from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { UPDATE_TOURNAMENT } from '../../../graphql/mutations/mutations';
import { GET_TOURNAMENTS } from '../../../graphql/queries/queries';
import { onError } from '../../../graphql/errorHandler';

type DeletePlayerButtonProps = {
  _id: string;
};

const DeletePlayerButton = ({ _id }: DeletePlayerButtonProps): JSX.Element => {
  const [updateTournament, { loading }] = useMutation(UPDATE_TOURNAMENT, {
    refetchQueries: [GET_TOURNAMENTS],
    onError
  });

  return (
    <Popconfirm
      title="Are you sure?"
      onConfirm={(): void => {
        updateTournament({
          variables: { tournamentId: _id, payload: { isDeleted: true } }
        });
      }}
    >
      <Button
        type="primary"
        shape="circle"
        icon={<DeleteOutlined />}
        loading={loading}
      />
    </Popconfirm>
  );
};

export default DeletePlayerButton;
