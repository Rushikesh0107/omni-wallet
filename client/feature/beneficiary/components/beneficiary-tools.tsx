import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

const TransactionTools = () => {
  return (
    <div className="flex md:flex-row flex-col justify-between p-5">
      <div className="flex flex-row gap-2">
        <Link href="/add-beneficiary">
          <Button variant={"outline"}>Add Beneficiary</Button>
        </Link>
      </div>

      <div className="mt-5 md:mt-0">
        <InputGroup className="bg-white">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
};

export default TransactionTools;
