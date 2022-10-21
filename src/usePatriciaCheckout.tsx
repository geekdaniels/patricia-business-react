import { useEffect } from "react";
import useScript from "./script";
import { PatriciaCheckoutProps, Config } from "./types";

declare global {
  interface Window {
    Patricia: PatriciaCheckoutProps;
  }
}

const usePatriciaCheckout = () => {
  const [loaded, error] = useScript();

  useEffect(() => {
    if (error) throw new Error("Unable to load checkout");
  }, [error]);

  const startCheckout = (props: Config) => {
    if (error) throw new Error("Unable to load checkout");
    if (loaded) {
      window.Patricia && window.Patricia.initialize(props);
    }
  };

  return startCheckout;
};

export default usePatriciaCheckout;
