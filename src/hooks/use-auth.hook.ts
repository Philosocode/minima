import { useSelector } from "react-redux";
import { selectUserId } from "redux/auth";

export const useAuth = () => {
  /**
   * Hook for getting the current user ID in Firebase
   */
  return useSelector(selectUserId);
}