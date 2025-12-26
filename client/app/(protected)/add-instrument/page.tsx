"use client"

import { Render } from "@/components/render";
import { useSearchParams } from "next/navigation";
import { CardForm, UPIForm } from "@/feature/instrument";

const AddInstrument = () => {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    return (
        <div className="flex items-center justify-center h-screen p-4 md:p-0">
            <Render if={type === "credit-card" || type === "debit-card"}>
                {type &&<CardForm type={type}/>}
            </Render>
            <Render if={type === "upi"}>
                {type && <UPIForm />}
            </Render>
        </div>
    )
}

export default AddInstrument