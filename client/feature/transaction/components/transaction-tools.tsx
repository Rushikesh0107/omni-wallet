import { Button } from "@/components/ui/button"
import Link from "next/link"
import TransactionSearch from "./transaction-search"

const TransactionTools = () => {
    return (
        <div className="flex md:flex-row flex-col justify-between p-5">
            <div className="flex flex-row gap-2">
                <Link href="/pay-now">
                    <Button>
                        Pay now
                    </Button>
                </Link>
            </div>
            <div className="mt-5 md:mt-0">
                <TransactionSearch />
            </div>
        </div>
    )
}

export default TransactionTools