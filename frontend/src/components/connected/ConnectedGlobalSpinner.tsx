import { selectIsSomeMutationPending, selectIsSomeQueryPending } from "../../app/apiSelectors"
import { useAppSelector } from "../../app/store"
import SpinnerWithBackdrop from "../view/SpinnerWithBackdrop";

const ConnectedGlobalSpinner = () => {
    const isSomeQueryPending = useAppSelector(selectIsSomeQueryPending);
    const isSomeMutationPending = useAppSelector(selectIsSomeMutationPending);

    return <SpinnerWithBackdrop open={isSomeQueryPending || isSomeMutationPending} />;
};

export default ConnectedGlobalSpinner;