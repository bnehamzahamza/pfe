import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthDmg from "./AuthDmg";


export const ProtectedRouteDmg =({
    component: Component,
    ...rest
  }) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (AuthDmg.isAuthenticated()) {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/login-dmg",
                  state: {
                    from: props.location
                  }
                }}
              />
            );
          }
        }}
      />
      );
    };