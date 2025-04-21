import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type marketProps = {
  Country: string;
  Group: string;
  Symbol: string;
  Ticker: string;
  CloseDate: string;
};

const MarketCard = ({
  Symbol,
  Country,
  CloseDate,
  Group,
  Ticker,
}: marketProps) => {
  if (!Symbol) return null;

  return (
    <Card className="hover:shadow-lg transition duration-200 w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold truncate">
          {Group} - {Country}
        </CardTitle>
        <CardDescription>Symbol - {Symbol}</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="ml-1 text-sm text-muted-foreground">
          Ticker -{Ticker}
        </span>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500">Close Date: {CloseDate}</p>
      </CardFooter>
    </Card>
  );
};

export default MarketCard;
