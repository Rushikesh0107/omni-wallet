import { Button } from "@/components/ui/button";
import Link from "next/link";

const AddInstrumentsButtons = () => {

    return (
    <div className="flex pt-5 w-full justify-center md:gap-5 gap-2">
      <Link href="/add-instrument?type=credit-card" prefetch={true}>
        <Button variant="outline" className="bg-primary text-primary-foreground">
          Add Credit Card
        </Button>
      </Link>

      <Link href="/add-instrument?type=debit-card" prefetch={true}>
        <Button variant="outline" className="bg-primary text-primary-foreground">
          Add Debit Card
        </Button>
      </Link>

      <Link href="/add-instrument?type=upi" prefetch={true}>
        <Button variant="outline" className="bg-primary text-primary-foreground">
          Add UPI
        </Button>
      </Link>
    </div>
  );
};

export default AddInstrumentsButtons;
