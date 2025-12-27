import {BeneficiaryTools} from "@/feature/beneficiary";
import BeneficiaryList from "@/feature/beneficiary/components/beneficiary-list";

const page = () => {
    return (
        <div>
            <BeneficiaryTools />
            <BeneficiaryList />
        </div>
    )
}

export default page