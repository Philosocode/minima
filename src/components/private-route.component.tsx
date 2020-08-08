import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "hooks/use-auth.hook";

export const PrivateRoute = ({component, ...rest}: any) => {
  const user = useAuth();

  const routeComponent = (props: any) => (
      user
          ? React.createElement(component, props)
          : <Redirect to={{pathname: '/login'}}/>
  );
  return <Route {...rest} render={routeComponent}/>;
};