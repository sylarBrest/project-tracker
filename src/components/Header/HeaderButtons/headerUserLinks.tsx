import { Link } from 'react-router-dom';

export const HeaderUserLinks = () => {
  return (
    <>
      <li>
        <Link to="sign-in">Sign in</Link>
      </li>
      <li>
        <Link to="sign-up">Sign up</Link>
      </li>
    </>
  );
};