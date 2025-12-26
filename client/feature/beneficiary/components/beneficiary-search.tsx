"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/hooks/use-redux";
import { useEffect, useState } from "react";
import { filterBeneficiaries } from "@/store/slice/beneficiary.silce";

const BeneficiarySearch = () => {
const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Simply trigger the filter reducer
    dispatch(filterBeneficiaries(searchQuery));
  }, [searchQuery, dispatch]);

  return (
    <div>
      <InputGroup className="bg-white">
        <InputGroupInput
          placeholder="Search..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default BeneficiarySearch;
