export const genericReducer = <T>(
  state: T,
  action: Partial<T>
): T => {
  return {
    ...state,
    ...action,
  };
};
