import { TransactionList, TransactionTools } from "@/feature/transaction";

const page = () => {
  return (
    <div>
      <TransactionTools />

      <div className="h-0.5 w-full bg-gray-200" />

      <div className="p-5">
        <TransactionList />
      </div>
    </div>
  );
};

export default page;
