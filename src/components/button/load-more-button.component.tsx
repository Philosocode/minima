import React, { FC } from "react";

import { Button } from "./button.component";
import { Loader } from "components/loader/loader.component";

interface IProps {
  isLoading: boolean;
  hasMoreItems: boolean;
  loadItems: Function;
}
export const LoadMoreButton: FC<IProps> = ({ isLoading, hasMoreItems, loadItems }) => {
  if (isLoading) return <Loader position="center-horizontal" />;
  if (!hasMoreItems) return null;
  return <Button centered onClick={loadItems}>LOAD MORE</Button>;
}