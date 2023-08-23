import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import { RootState } from "./store";

export const selectIsSomeQueryPending = (state: RootState) => Object.values(state.api.queries).some(query => query?.status === QueryStatus.pending);
export const selectIsSomeMutationPending = (state: RootState) => Object.values(state.api.mutations).some((mutation) => mutation?.status === QueryStatus.pending);
