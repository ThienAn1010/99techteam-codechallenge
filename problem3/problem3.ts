/*
Inefficiencies and anti-patterns:
    - The 'blockchain' parameter in 'getPriority' is typed as 'any'. This reduces type safety and can lead to potential runtime errors.
    - 'getPriority' is called multiple times in the 'useMemo' hook. This is inefficient and could be optimized by calculating priorities once for each unique blockchain.
    - The condition 'lhsPriority > -99' should be 'balancePriority > -99' and the logic seems to be inverted
    - The sort function does not handle the case when priorities are equal. This could cause inconsistent ordering of items with the same priority.
    - The 'useMemo' hook depends on 'prices' but 'prices' is not used within the function. This could cause unnecessary recalculations when prices change.
    - 'FormattedWalletBalance' is used in the map function for 'sortedBalances' but it should be 'WalletBalance'. This inconsistency can lead to confusion and potential type errors.
    - The 'useWalletBalances' and 'usePrices' hooks are called on every render, potentially causing unnecessary re-renders if their values change frequently.
    - The '...rest' spread in the return statement can lead to unintended props being passed to the div, potentially causing conflicts or unexpected behavior.
    - The 'sortedBalances' useMemo hook contains a complex filter and sort operation that could be optimized for better performance.
    - The 'children' prop is destructured but never used in the component.
    - Using 'index' as key

Suggestions for improvement:
- Use proper TypeScript typing for all parameters and variables.
- Optimize the getPriority function, possibly by using a lookup object instead of a switch statement.
- Simplify and correct the logic in the filter function.
- Implement a stable sort function that handles equal priorities.
- Combine the formattedBalances and rows operations into a single efficient mapping.
- Remove unused dependencies from useMemo hooks.
- Ensure consistent use of interfaces and types throughout the component.
- Use unique and stable identifiers as React keys instead of array indices.
- Consider memoizing the results of useWalletBalances and usePrices if they're expensive operations.
- Avoid prop spreading in the return statement to prevent unintended prop passing.
- Optimize the filtering and sorting operations, possibly by using more efficient data structures or algorithms.
- Remove unused variables and props to keep the code clean and efficient.
*/

// Refactored code
import React, { useMemo } from "react";
import { useWalletBalances, usePrices } from "./hooks"; // Assuming these hooks are defined in a separate file
import { BoxProps } from "your-ui-library"; // Assuming BoxProps comes from a UI library
import WalletRow from "./WalletRow"; // Assuming WalletRow is a component defined in a separate file
import classes from "./WalletPage.module.css"; // Assuming the CSS module is imported

interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
}

type WalletPageProps = BoxProps;

const blockchainPriorities: Record<string, number> = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
};

const WalletPage = ({ children, ...rest }: WalletPageProps) => {
    const balances = useWalletBalances();
    const prices = usePrices();

    const sortedAndFormattedBalances = useMemo(() => {
        return balances
            .filter(
                (balance) =>
                    balance.amount > 0 &&
                    blockchainPriorities[balance.blockchain] !== undefined
            )
            .sort(
                (a, b) =>
                    (blockchainPriorities[b.blockchain] || 0) -
                    (blockchainPriorities[a.blockchain] || 0)
            )
            .map(
                (balance): FormattedWalletBalance => ({
                    ...balance,
                    formatted: balance.amount.toFixed(),
                })
            );
    }, [balances]);

    const rows = useMemo(() => {
        return sortedAndFormattedBalances.map((balance) => {
            const usdValue = prices[balance.currency] * balance.amount;
            return (
                <WalletRow
                    className={classes.row}
                    key={balance.currency}
                    amount={balance.amount}
                    usdValue={usdValue}
                    formattedAmount={balance.formatted}
                />
            );
        });
    }, [sortedAndFormattedBalances, prices]);

    return <div {...rest}>{rows}</div>;
};

export default WalletPage;
