type CardPreviewProps = {
  bankName?: string;
  cardNumber?: string;
  fullName?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
};

const formatCardNumber = (num?: string) => {
  if (!num) return "•••• •••• •••• ••••";
  return num.replace(/(.{4})/g, "$1 ").trim();
};

export const CardPreview = ({
  bankName,
  cardNumber,
  fullName,
  expiryMonth,
  expiryYear,
  cvv,
}: CardPreviewProps) => {
  return (
    <div className="w-full max-w-sm h-52 rounded-2xl p-5 text-white bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl relative">
      <div className="text-sm opacity-80">{bankName || "Bank Name"}</div>

      <div className="mt-6 text-lg tracking-widest font-mono">
        {formatCardNumber(cardNumber)}
      </div>

      <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
        <div>
          <div className="text-xs opacity-70">Card Holder</div>
          <div className="uppercase text-sm">
            {fullName || "FULL NAME"}
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs opacity-70">Expiry</div>
          <div className="text-sm">
            {(expiryMonth || "MM")}/{(expiryYear || "YY")}
          </div>
        </div>
      </div>

      <div className="absolute top-5 right-5 text-xs opacity-60">
        CVV: {cvv ? "•••" : "•••"}
      </div>
    </div>
  );
};
