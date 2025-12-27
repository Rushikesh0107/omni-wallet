"use client"

import { useGetBeneficiary } from "@/queries/beneficiary.query";
import { Beneficiary } from "@/types/beneficiary";
import { User } from "lucide-react"; // Assuming you use lucide-react
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { setBeneficiaries } from "@/store/slice/beneficiary.silce";
import { useEffect } from "react";

const BeneficiaryList = () => {
    const { data, isLoading } = useGetBeneficiary();
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if (data) {
            dispatch(setBeneficiaries(data));
        }
    }, [data, dispatch]);

    const beneficiaries = useAppSelector((state) => state.beneficiary.filteredBeneficiaries);

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="w-full mx-auto p-6">
            {/* <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Beneficiaries</h1>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    + Add New
                </button>
            </div> */}

            <div className="space-y-3">
                {isLoading && (
                    <div className="text-center py-10 text-slate-500">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="h-10 w-10 bg-slate-200 rounded-full mb-2"></div>
                            <div className="h-4 w-32 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                )}

                {!isLoading && beneficiaries?.map((beneficiary: Beneficiary) => (
                    <div 
                        key={beneficiary.id} 
                        className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/5 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 font-semibold text-sm border border-blue-100">
                                {getInitials(beneficiary.name)}
                            </div>

                            {/* Info */}
                            <div>
                                <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                                    {beneficiary.name}
                                </h3>
                                <div className="flex items-center gap-3 text-sm text-slate-500">
                                    <span className="flex items-center gap-1">
                                        {beneficiary.phoneNumber}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Menu */}
                        {/* <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                            <MoreVertical className="h-5 w-5" />
                        </button> */}
                    </div>
                ))}

                {!isLoading && beneficiaries?.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                        <User className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">No beneficiaries found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BeneficiaryList;