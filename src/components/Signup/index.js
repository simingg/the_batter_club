import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUserStart } from "./../../redux/User/user.actions";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";
import AuthWrapper from "./../AuthWrapper";

import "./styles.scss";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr,
});

const Signup = (props) => {
  const { currentUser, userErr } = useSelector(mapState);
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errs, setErrs] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (currentUser) {
      reset();
      props.history.push("/");
    }
  }, [currentUser]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrs(userErr);
    }
  }, [userErr]);

  const reset = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrs("");
    setPhoneNumber("");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(
      signUpUserStart({
        displayName,
        email,
        password,
        confirmPassword,
        phoneNumber,
      })
    );
  };

  const configAuthWrapper = {
    headline: "Registration",
  };
  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errs.length > 0 && (
          <ul>
            {errs.map((err, index) => {
              return <li key={index}>{err}</li>;
            })}
          </ul>
        )}

        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full name"
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <FormInput
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            type="text"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
          />
          <FormInput
            type="text"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FormInput
            type="text"
            value={phoneNumber}
            placeholder="Phone Number(Used for contact only)"
            handleChange={(e) => setPhoneNumber(e.target.value)}
          />

          <Button type="submit">Register</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(Signup);
