import Image from "next/image";

const UpiPreview = ({ qrcode, upiId }: { qrcode: string; upiId: string }) => {
  return (
    <div className="max-w-xs mx-auto p-6 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col items-center group hover:shadow-blue-100 transition-all duration-300">
      <div className="relative w-48 h-48 p-2 bg-white rounded-xl border-2 border-dashed border-gray-200 group-hover:border-blue-400 transition-colors">
        <Image
          src={qrcode}
          alt={upiId}
          fill
          className="object-contain p-2"
          unoptimized
        />
      </div>
      
      <div className="mt-6 text-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
          UPI Payment
        </span>
        <h3 className="mt-3 text-lg font-bold text-gray-800 break-all px-4">
          {upiId}
        </h3>
        <p className="mt-1 text-xs text-gray-400 font-medium">
          Scan to pay securely
        </p>
      </div>
    </div>
  );
};

export default UpiPreview;
