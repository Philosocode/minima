import React, { FC, useEffect } from "react";

interface IProps {
  percentage: number;
}

// FROM: https://medium.com/swlh/creating-a-progress-bar-in-react-181501bc22f1
export const ProgressBar: FC<IProps> = ({ percentage }) => { 
  useEffect(() => {
    document.documentElement.style.setProperty("--progress-bar-percentage", `${percentage}%`);
  }, [percentage]);

  return (
    <div className="c-progress-bar__container">
      <div className="c-progress-bar"></div>
    </div>
  )
 };