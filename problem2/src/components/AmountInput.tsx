import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AmountInputProps {
    value: string;
    onChange: (value: string) => void;
    label: string;
    placeholder?: string;
    disabled?: boolean;
}

export function AmountInput({
    value,
    onChange,
    label,
    placeholder = "0.00",
    disabled = false,
}: AmountInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={label}>{label}</Label>
            <Input
                type="number"
                id={label}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
    );
}
