"use client";

import { CardPreview } from "@/components/common/card-preview";
import { useGetUser } from "@/queries/user.query";

const InstrumentList = () => {
  const { data: user, isLoading, error } = useGetUser();

  const cardInstruments = user?.cardInstruments;

  return (
    <div className="p-5">
      <div className="">
        <h2 className="text-base font-bold">Card Instruments</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-2 mt-5">
            {cardInstruments?.map((instrument) => (
                <CardPreview key={instrument.id} {...instrument} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default InstrumentList;
