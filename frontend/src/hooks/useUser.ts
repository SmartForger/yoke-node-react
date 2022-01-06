import { useMemo } from "react"
import account from "../services/account";

export const useUser = () => {
  return useMemo(() => account.getUser(), []);
}
