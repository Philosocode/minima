import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserId } from "redux/auth";

export const PrivateRoute: FC<{
  component: FC;
  path?: string;
  exact?: boolean;
}> = (props) => {
  const user = useSelector(selectUserId);

  if (!user) return <Redirect to="/login" />;
  return <Route path={props.path} exact={props.exact} component={props.component} />;
};
