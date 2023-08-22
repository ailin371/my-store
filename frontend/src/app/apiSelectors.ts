import { RootState } from "./store";

export const selectIsSomeQueryPending = (state: RootState) => Object.values(state.api.queries).some(query => query?.status === 'pending');
