import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import SelectCountry from "@/components/select-country";
import { useTheme } from "@/hooks/useTheme";

export default function Header() {
  const { handleTheme } = useTheme();

  return (
    <header className="w-full flex flex-shrink-0 h-14 sticky bg-background mx-auto z-10 items-center top-0 max-w-5xl">
      <div className="text-xl font-bold flex-1 truncate text-primary">
        <h1>Trading Economics Task</h1>
      </div>
      <div className="flex items-center gap-4">
        <SelectCountry />

        <div className="flex items-center gap-2 flex-shrink-0">
          <Switch id="toggleTheme" onClick={handleTheme} />
          <Label htmlFor="toggleTheme" className="sr-only">
            Toggle Theme
          </Label>
        </div>
      </div>
    </header>
  );
}
