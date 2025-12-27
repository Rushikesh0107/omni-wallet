"use client"

import { useGetTransactions } from "@/queries/transaction.query"
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux"
import { useEffect } from "react"
import { setTransactions } from "@/store/slice/transaction.slice"
import { CreditCard, ArrowUpRight, History } from "lucide-react";
import { format } from "date-fns";

const TransactionList = () => {
    const { data, isLoading } = useGetTransactions()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (data) {
            dispatch(setTransactions(data))
        }
    }, [data, dispatch])

    const transactions = useAppSelector((state) => state.transaction.filteredTransactions)

    const getInitials = (name: string) => {
        return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    };

    const maskCard = (num: string) => `•••• ${num.slice(-4)}`;

    return (
        <div className="w-full mx-auto md:p-6">
            <div className="space-y-3">
                {isLoading && (
                    <div className="text-center py-10 text-slate-500 animate-pulse">
                        <History className="h-8 w-8 mx-auto mb-2 opacity-20" />
                        <p>Fetching transactions...</p>
                    </div>
                )}

                {!isLoading && transactions?.map((tx) => (
                    <div 
                        key={tx.id} 
                        className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/5 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            {/* Avatar Icon Style */}
                            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 font-semibold text-sm border border-blue-100">
                                {getInitials(tx.beneficiary.name)}
                            </div>

                            {/* Main Info */}
                            <div>
                                <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                                    {tx.beneficiary.name}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <span className="flex items-center gap-1 uppercase tracking-wider text-[10px] font-bold bg-slate-100 px-1.5 py-0.5 rounded">
                                        {tx.cardInstrument ? tx.cardInstrument.cardType : 'UPI'}
                                    </span>
                                    <span>{tx.cardInstrument ? maskCard(tx.cardInstrument.cardNumber) : 'Direct Transfer'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Amount and Date */}
                        <div className="text-right">
                            <div className="flex items-center justify-end gap-1 text-slate-900 font-bold">
                                <span>₹{Number(tx.amount).toLocaleString()}</span>
                                <ArrowUpRight className="h-3 w-3 text-red-500" />
                            </div>
                            <p className="text-xs text-slate-400">
                                {format(new Date(tx.createdAt), "dd MMM, yyyy")}
                            </p>
                        </div>
                    </div>
                ))}

                {!isLoading && transactions?.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                        <History className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">No transaction history found.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TransactionList