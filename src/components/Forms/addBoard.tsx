import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppSelector } from 'redux/hooks';

import { Button, TextField } from '@mui/material';
import { Toast } from 'components';

import { useCreateBoardMutation } from 'services';
import { BoardParamsType, ErrorResponse } from 'types';

import './addBoard.scss';

type AddBoardType = {
  onClose?: () => void;
};

const AddBoard = ({ onClose }: AddBoardType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardParamsType>();

  const [addBoard, { error }] = useCreateBoardMutation();
  const userId = useAppSelector((state) => state.auth.user.id) as string;

  const onSubmit: SubmitHandler<Pick<BoardParamsType, 'title' | 'description'>> = async (data) => {
    await addBoard({ ...data, owner: userId, users: [] }).unwrap();
    onClose?.();
  };

  return (
    <form className="add-board-form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label="Board title"
        fullWidth
        {...register('title', {
          required: {
            value: true,
            message: 'Title cannot be empty',
          },
        })}
      />
      {errors.title && <span>{errors.title.message}</span>}
      <TextField
        margin="dense"
        id="description"
        label="Board description"
        multiline
        rows={3}
        fullWidth
        {...register('description', {
          required: {
            value: true,
            message: 'Description cannot be empty',
          },
        })}
      />
      {errors.description && <span>{errors.description.message}</span>}
      <Button variant="contained" type="submit">
        Add
      </Button>
      {error && <Toast message={(error as ErrorResponse).data.message} />}
    </form>
  );
};

export default AddBoard;
