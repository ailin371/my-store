import { selectIsSomeQueryPending } from "../../app/apiSelectors"
import { useAppSelector } from "../../app/store"
import SpinnerWithBackdrop from "../view/SpinnerWithBackdrop";

const ConnectedGlobalSpinner = () => {
    const isSomeQueryPending = useAppSelector(selectIsSomeQueryPending);

    return <SpinnerWithBackdrop open={isSomeQueryPending} />;
};

export default ConnectedGlobalSpinner;