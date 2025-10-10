import { useContext } from "react";
// Update the import path if the file is located elsewhere, for example:
// Update the import path if the file is located elsewhere, for example:
// import { AppStoreContext } from "../ui/app-store-provider";
import { AppStoreContext } from "../lib/app-store";

export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error("useAppStore must be used within AppStoreProvider");
  return ctx;
}
