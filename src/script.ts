import { useEffect, useState } from "react";

const loadedScript: {
  src?: string;
} = {};

type StateType = {
  loaded: boolean;
  error: boolean;
};

const checkoutJs =
  "https://checkout.business.mypatricia.co/build/v1/index.min.js";

export default function useScript() {
  const [state, setState] = useState<StateType>({
    loaded: false,
    error: false,
  });

  useEffect(() => {
    const scriptTag = document.getElementById("patricia_business");
    const scriptSrc = scriptTag && scriptTag.getAttribute("src");

    if (scriptSrc) {
      return setState({
        loaded: true,
        error: false,
      });
    }

    loadedScript.src = checkoutJs;

    const script = document.createElement("script");
    script.id = "patricia_business";
    script.src = checkoutJs;
    script.async = true;

    const onScriptLoad = () => {
      setState({
        loaded: true,
        error: false,
      });
    };

    const onScriptError = () => {
      delete loadedScript.src;
      setState({
        loaded: true,
        error: true,
      });
    };

    script.addEventListener("load", onScriptLoad);
    script.addEventListener("complete", onScriptLoad);
    script.addEventListener("error", onScriptError);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", onScriptLoad);
      script.removeEventListener("complete", onScriptLoad);
      script.removeEventListener("error", onScriptError);
    };
  }, []);

  return [state.loaded, state.error];
}
