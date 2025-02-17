import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CurrencySwapForm from "./CurrencySwapForm";

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-screen bg-gradient-to-br from-blue-300 to-purple-300 flex items-center justify-center p-4">
                <div className="w-full mx-auto max-w-lg p-4">
                    <CurrencySwapForm />
                </div>
            </div>
        </QueryClientProvider>
    );
}
