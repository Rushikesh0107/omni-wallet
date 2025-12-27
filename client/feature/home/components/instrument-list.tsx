"use client";

import { CardPreview } from "@/components/common/card-preview";
import UpiPreview from "@/components/common/upi-preview";
import { useGetUser } from "@/queries/user.query";
  
const InstrumentList = () => {
  const { data: user } = useGetUser();

  const cardInstruments = user?.cardInstruments;
  const upiInstruments = user?.upiInstruments;

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
      <div className="mt-6">
        <h2 className="text-base font-bold">UPI Instruments</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-2 mt-5">
            {upiInstruments?.map((instrument) => (
                <UpiPreview key={instrument.id} qrcode={instrument.qrCode} upiId={instrument.upiId} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default InstrumentList;
