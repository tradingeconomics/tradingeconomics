import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { type Country, useCountry } from "@/hooks/useCountry";

const countries = {
  mexico: "🇲🇽 Mexico",
  "new-zealand": "🇳🇿 New Zealand",
  sweden: "🇸🇪 Sweden",
  thailand: "🇹🇭 Thailand",
};

export default function SelectCountry() {
  const { country, handleCountry } = useCountry();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-primary text-primary hover:text-primary hover:border-primary border gap-2"
        >
          {countries[country]}
          <ChevronDown className="w-4 h-4"></ChevronDown>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(countries).map(([key, value]) => (
          <DropdownMenuItem
            key={key}
            onSelect={() => handleCountry(key as Country)}
          >
            {value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
