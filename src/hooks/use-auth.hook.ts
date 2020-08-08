import { useSelector } from "react-redux";
import { selectUserId } from "redux/auth";

export const useAuth = () => {
  return useSelector(selectUserId);
}