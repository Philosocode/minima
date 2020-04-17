import React, { FC } from "react";
import axios from "axios";
import { withRouter, RouteComponentProps } from "react-router-dom";

const _VideoPage: FC<RouteComponentProps> = () => { 
  // State

  // Functions
  return (
    <h1>Video Page</h1>
  );
};

export const VideoPage = withRouter(_VideoPage);