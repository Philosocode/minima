import React, { FC, Dispatch, SetStateAction } from "react";

import { ChannelTab } from "pages/channel.page";

interface IProps {
  currentTab: ChannelTab;
  tabNames: ChannelTab[];
  setCurrentTab: Dispatch<SetStateAction<ChannelTab>>;
}

export const ChannelTabs: FC<IProps> = ({ currentTab, tabNames, setCurrentTab }) => {
  return (
    <div className="c-channel-tab__container">
      {
        tabNames.map(tabName => (
          <h3 
            key={tabName}
            className={`c-channel-tab__heading ${currentTab === tabName && "c-channel-tab__heading--selected"}`}
            onClick={() => setCurrentTab(tabName)}
          >
            {tabName}
          </h3>
        ))
      }
    </div>
  )
}