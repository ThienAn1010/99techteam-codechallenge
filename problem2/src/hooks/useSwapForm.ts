import { useState, useCallback, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

interface Token {
    currency: string;
    price: number;
    date: string;
}

const fetchTokens = async (): Promise<Token[]> => {
    const response = await fetch("https://interview.switcheo.com/prices.json");
    const data: Token[] = await response.json();
    return data.filter((token) => token.price);
};

export function useSwapForm() {
    const { data: allTokens = [] } = useQuery<Token[]>({
        queryKey: ["tokens"],
        queryFn: fetchTokens,
    });

    const tokens = useMemo(() => {
        const uniqueTokens = allTokens.reduce((acc, current) => {
            const x = acc.find((item) => item.currency === current.currency);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc.map((item) =>
                    item.currency === current.currency &&
                    new Date(current.date) > new Date(item.date)
                        ? current
                        : item
                );
            }
        }, [] as Token[]);

        return uniqueTokens.sort((a, b) =>
            a.currency.localeCompare(b.currency)
        );
    }, [allTokens]);

    const [fromToken, setFromToken] = useState<string>("");
    const [toToken, setToToken] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [estimatedReceiveAmount, setEstimatedReceiveAmount] =
        useState<string>("0");
    const [error, setError] = useState<string>("");

    const getExchangeRate = useCallback(
        (from: string, to: string): number => {
            const fromPrice =
                tokens.find((t) => t.currency === from)?.price || 0;
            const toPrice = tokens.find((t) => t.currency === to)?.price || 0;
            return fromPrice && toPrice ? toPrice / fromPrice : 0;
        },
        [tokens]
    );

    useEffect(() => {
        if (fromToken && toToken && amount) {
            const rate = getExchangeRate(fromToken, toToken);
            setEstimatedReceiveAmount((parseFloat(amount) * rate).toFixed(6));
        } else {
            setEstimatedReceiveAmount("0");
        }
    }, [fromToken, toToken, amount, getExchangeRate]);

    const handleSwap = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (!amount || !fromToken || !toToken) {
                setError("Please fill in all fields.");
                return;
            }
            if (fromToken === toToken) {
                setError("Please select different currencies to swap.");
                return;
            }
            setError("");
            alert(
                `Swap ${amount} ${fromToken} for ${estimatedReceiveAmount} ${toToken}`
            );
        },
        [amount, fromToken, toToken, estimatedReceiveAmount]
    );

    return {
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
    };
}
