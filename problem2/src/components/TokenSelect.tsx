import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Token {
    currency: string;
    price: number;
    date: string;
}

interface TokenSelectProps {
    tokens: Token[];
    value: string;
    onChange: (value: string) => void;
    label: string;
}

export function TokenSelect({
    tokens,
    value,
    onChange,
    label,
}: TokenSelectProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={label}>{label}</Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger id={label}>
                    <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                    {tokens.map((token) => (
                        <SelectItem key={token.currency} value={token.currency}>
                            <div className="flex items-center">
                                <img
                                    src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`}
                                    alt={token.currency}
                                    className="w-5 h-5 mr-2"
                                    onError={(e) => {
                                        (
                                            e.target as HTMLImageElement
                                        ).style.display = "none";
                                    }}
                                />
                                {token.currency}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
