"use client";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { useAppDispatch } from "@/hooks/use-redux";
import { useEffect, useState } from "react";
import { filterTransactions } from "@/store/slice/transaction.slice";

const TransactionSearch = () => {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(filterTransactions(query));
  }, [query, dispatch]);

  return (
    <div className="w-full max-w-sm">
      <InputGroup className="bg-white border-slate-200 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all rounded-lg overflow-hidden">
        <InputGroupInput
          placeholder="Search transactions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-none focus:ring-0 text-sm"
        />
        <InputGroupAddon className="bg-transparent border-none pr-3 text-slate-400">
          <SearchIcon size={18} />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default TransactionSearch;