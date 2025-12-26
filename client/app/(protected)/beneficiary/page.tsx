import {BeneficiaryTools} from "@/feature/beneficiary";
import BeneficiaryList from "@/feature/beneficiary/components/beneficiary-list";

const page = () => {
    return (
        <div>
            <BeneficiaryTools />

            <div className="h-0.5 w-full bg-gray-300"/>

            <BeneficiaryList />
            
        </div>
    )
}

export default page