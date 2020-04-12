import { useEffect, useState } from "react";
//Context
import useUpstampsContext from "../Contexts/useUpstampsContext";
//Utils
import { apiUrl } from "../Utils/constants";

interface IState {
  loading: boolean;
  error: boolean;
  show: boolean;
  variant: string;
}

export const useABTest = (name: string) => {
  const context = useUpstampsContext();
  const [state, setState] = useState<IState>({
    loading: true,
    error: false,
    show: false,
    variant: "A"
  });
  const { clientId, projectKey, envKey } = context.state.params;
  const url = `${apiUrl}/${clientId}/${projectKey}/${envKey}/testing`;
  const variantTypes = ["A", "B"];

  useEffect(() => {
    const onFetch = async () => {
      try {
        //Response with the all the A/B Tests
        const response = await fetch(url);
        const { ABTesting } = await response.json();

        const result = ABTesting.filter((item: any) => item.name === name);
        const show = result.length > 0;
        const randomVariant = Math.floor(Math.random() * variantTypes.length);

        setState((prevState: IState) => {
          return {
            ...prevState,
            show,
            variant: variantTypes[randomVariant],
            loading: false
          };
        });
      } catch (e) {
        setState((prevState: IState) => {
          return { ...prevState, error: true, loading: false };
        });
      }
    };
    onFetch();
  }, [name, context.state.params]);

  const onEmitter = async () => {
    try {
      const post_body = {
        name,
        varA: state.variant === "A" ? 1 : 0,
        varB: state.variant === "B" ? 1 : 0
      };

      const response = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: JSON.stringify(post_body)
      });

      return await response.json();
    } catch (e) {
      return e;
    }
  };

  return {
    show: state.show,
    error: state.error,
    loading: state.loading,
    variant: state.variant,
    emitter: onEmitter
  } as IState | { emitter: () => {} };
};
