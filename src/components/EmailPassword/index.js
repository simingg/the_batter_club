import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { withRouter, useHistory } from "react-router-dom";
import {
  resetPasswordStart,
  resetUserState,
} from "./../../redux/User/user.actions";
import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr,
});

const EmailPassword = (props) => {
  const { userErr, resetPasswordSuccess } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [errs, setErrs] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      props.history.push("/login");
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrs(userErr);
    }
  }, [userErr]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));
  };

  const configAuthWrapper = {
    headline: "Email Password",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errs.length > 0 && (
          <ul>
            {errs.map((e, index) => {
              return <li key={index}>{e}</li>;
            })}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit">Email Password</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);
