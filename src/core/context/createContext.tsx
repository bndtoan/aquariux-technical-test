import React from 'react';

type ExtendOfValueType = Record<string, any>;
type ExtendOfActionsType = Record<string, (...agr: any[]) => void>;
type ExtendOfCustomActionsType = Record<string, (...agr: any[]) => void>;

type ActionType<I extends ExtendOfValueType, A extends ExtendOfActionsType> = () => {
  [K in keyof A]: (state: I, ...payload: Parameters<A[K]>) => I;
};
type CustomActionType<A, CA> = (method: A) => CA;
type ResetAction = { reset: () => void };

type ContextReducerType<I extends ExtendOfValueType, A extends ExtendOfActionsType> = (
  state: I,
  action: { type: keyof A; payload: Parameters<A[keyof A]> }
) => I;

export default function createContext<
  I extends ExtendOfValueType,
  A extends ExtendOfActionsType,
  CA extends ExtendOfCustomActionsType = {}
>(defaultValue: I, actions: ActionType<I, A>, customActions?: CustomActionType<A, CA>) {
  // @ts-ignore
  const Context = React.createContext<I & A & CA & ResetAction>(defaultValue);
  const mainActions = { ...actions(), reset: () => defaultValue };
  const contextReducer: ContextReducerType<I, A & ResetAction> = (state, action) =>
    mainActions[action.type](state, ...action.payload);

  function CreateContextValue() {
    const [value, dispatch] = React.useReducer(contextReducer, defaultValue);
    const actionList = React.useMemo(() => {
      const dispatchActions = Object.keys(mainActions).reduce(
        (obj, actionKey) => ({
          ...obj,
          [actionKey]: (...payload: any) => {
            dispatch?.({ type: actionKey, payload });
          },
        }),
        {}
      ) as A;
      const dispatchCustomActions = customActions ? (customActions(dispatchActions) as CA) : {};
      return { ...dispatchActions, ...dispatchCustomActions } as A & CA & ResetAction;
    }, []);
    return React.useMemo(() => ({ ...value, ...actionList }), [value]);
  }

  function useContext() {
    return React.useContext(Context);
  }

  return {
    useContext,
    createContextValue: CreateContextValue,
    Provider: Context.Provider,
  };
}
