/*
Inefficiencies and anti-patterns:
    - The 'blockchain' parameter in 'getPriority' is typed as Any
    - 'getPriority' is called multiple times in the 'useMemo' hook
    - The condition 'lhsPriority > -99' should be 'balancePriority > -99' and the logic is inverted
    - The sort function does not handle the case when priorities are equal
    - The code maps over 'sortedBalances' twice
    - The 'useMemo' hook depends on 'prices' but 'prices' is not used within the function
    - 'FormattedWalletBalance' is used in the map function for 'sortedBalances' but it should be 'WalletBalance'
    - Using 'index' as key 
*/

// Refactored code
