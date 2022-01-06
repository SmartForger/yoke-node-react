import { useCallback, useMemo, useState } from "react"
import account from "../services/account";

export const useUser = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const user = useMemo(() => account.getUser(), [refreshTrigger]);

  const refreshUser = useCallback(async () => {
    await account.refreshUser();
    setRefreshTrigger(trigger => !trigger);
  }, [])

  return {
    user,
    refreshUser,
  }
}
