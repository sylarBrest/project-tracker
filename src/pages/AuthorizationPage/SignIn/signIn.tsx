import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { InputPassword, InputLogin, LinkAuthorization } from '../InputsForm';
import { useAppDispatch } from 'redux/hooks';
import { useSignInMutation } from 'services';
import { setAuthorized } from 'redux/authorizedSlice';

import { AuthInfoType, UserSignUpType } from 'types';

import styles from '../authorization.module.scss';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpType>({
    mode: 'onBlur',
  });

  const [errorLogIn, setErrorLogIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signIn] = useSignInMutation();

  const onSubmit = async (dataLogin: AuthInfoType) => {
    await signIn(dataLogin)
      .unwrap()
      .then((data) => {
        localStorage.setItem('pma_token', data.token);
        localStorage.setItem('LoginUser', dataLogin.login);
        dispatch(setAuthorized(true));
        setErrorLogIn(false);
        navigate('/');
      })
      .catch(() => {
        setErrorLogIn(true);
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <h2>Log In</h2>
        {errorLogIn && <span className={styles.formError}>Authorization error!</span>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLogin errors={errors.login} register={register} />
          <InputPassword
            errors={errors.password}
            register={register}
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            showPassword={showPassword}
          />
          <Button className={styles.formButton} variant="contained" type="submit">
            Log In
          </Button>
          <LinkAuthorization linkNames="sign-up" />
        </form>
      </div>
    </div>
  );
};
export default SignIn;
