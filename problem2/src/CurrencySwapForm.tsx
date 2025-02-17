import { useSwapForm } from "./hooks/useSwapForm";
import { TokenSelect } from "./components/TokenSelect";
import { AmountInput } from "./components/AmountInput";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CurrencySwapForm() {
    const {
        tokens,
        fromToken,
        setFromToken,
        toToken,
        setToToken,
        amount,
        setAmount,
        estimatedReceiveAmount,
        error,
        handleSwap,
    } = useSwapForm();

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Currency Swap</CardTitle>
                <CardDescription>Convert your crypto assets</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSwap} className="space-y-4">
                    <div className="space-y-2">
                        <TokenSelect
                            tokens={tokens}
                            value={fromToken}
                            onChange={setFromToken}
                            label="From"
                        />
                        <AmountInput
                            value={amount}
                            onChange={setAmount}
                            label="Amount to send"
                        />
                    </div>
                    <div className="space-y-2">
                        <TokenSelect
                            tokens={tokens}
                            value={toToken}
                            onChange={setToToken}
                            label="To"
                        />
                        <div className="p-2 bg-gray-100 rounded-md ">
                            <p className="text-sm font-medium">
                                You will receive approximately:
                            </p>
                            <p className="text-lg font-bold">
                                {estimatedReceiveAmount} {toToken}
                            </p>
                        </div>
                    </div>
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
