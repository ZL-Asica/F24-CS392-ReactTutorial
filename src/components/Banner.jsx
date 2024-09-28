import React from "react";
import  { signInWithGoogle, signOut, useAuthState } from "../utilities/firebase";

const SignInButton = () => {
  return (
    <button className="btn btn-outline-primary" onClick={signInWithGoogle}>
      Sign In
    </button>
  );
};

const SignOutButton = (user) => {
  return (
    <div>
      <span className="text-light">{user.displayName}</span>
      <button className="btn btn-outline-danger" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

const AuthButtons = () => {
  const [user] = useAuthState();
  return user ? <SignOutButton/> : <SignInButton />;
};

const Banner = ({ title }) => {
  return (
    <div className="banner mb-3">
      <h1>{title}</h1>
      <div className="login-section">
        <AuthButtons />
      </div>
    </div>
  );
};

export default Banner;

