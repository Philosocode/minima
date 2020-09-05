import React, { FC } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { ChannelTab } from "pages/channel.page";

interface IProps {
  currentTab: ChannelTab;
  tabNames: ChannelTab[];
}

export const ChannelTabs: FC<IProps> = ({ currentTab, tabNames }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="c-tab__list">
      {tabNames.map((tabName) => (
        <h3
          key={tabName}
          className={`c-tab__heading ${currentTab === tabName && "is-selected"}`}
          onClick={() => history.replace(`${location.pathname}?tab=${tabName}`)}
        >
          {tabName}
        </h3>
      ))}
    </div>
  );
};