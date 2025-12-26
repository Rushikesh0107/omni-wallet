import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import BeneficiarySearch from "./beneficiary-search";

const TransactionTools = () => {
  return (
    <div className="flex md:flex-row flex-col justify-between p-5">
      <div className="flex flex-row gap-2">
        <Link href="/add-beneficiary">
          <Button variant={"outline"}>Add Beneficiary</Button>
        </Link>
        <Link href="/transactions">
          <Button variant={"outline"}>Transactions</Button>
        </Link>
      </div>

      <div className="mt-5 md:mt-0">
        <BeneficiarySearch />
      </div>
    </div>
  );
};

export default TransactionTools;
