import { Children, cloneElement, isValidElement, ReactNode, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalText } from '../../pages/UserPage/userPage';
import { useAppDispatch } from '../../redux/hooks';
import { setOpenUserPage } from '../../redux/pageUserSlice';

type ModalPropsType = {
  children: JSX.Element;
  buttonText: string;
  title: string;
  mode?: string;
  onConfirm?: () => Promise<void>;
};

const Modal = ({ children, buttonText, title, mode, onConfirm }: ModalPropsType) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onConfirm?.();
    setOpen(false);
    if (title === ModalText.DELETE_USER) {
      dispatch(setOpenUserPage(false));
    }
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant={mode === 'confirm' ? 'contained' : 'outlined'}
        size="small"
        startIcon={mode === 'confirm' && <DeleteIcon />}
      >
        {buttonText}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {title}
          {mode !== 'confirm' && (
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Close />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent>
          {Children.map<ReactNode, ReactNode>(children, (child) => {
            return isValidElement(child)
              ? cloneElement(child, {
                  ...child.props,
                  onClose: handleClose,
                })
              : null;
          })}
        </DialogContent>
        {mode === 'confirm' && (
          <DialogActions>
            <Button autoFocus onClick={handleConfirm}>
              Delete
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default Modal;
