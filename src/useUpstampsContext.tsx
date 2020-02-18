import { useContext } from "react";
import { UpStampsContext } from "./Context";

const useUpStampsContext = () => {
  const context = useContext(UpStampsContext);
  if (context === undefined) {
    throw new Error("UpStampsContext must be used with UpStampsProvider!");
  }
  return context;
};

export default useUpStampsContext;
