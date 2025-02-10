// app/components/IndicatorsSection.tsx
"use client";
import { useState } from "react";
import { utils, writeFile } from "xlsx";
import { format, startOfWeek, startOfMonth, endOfWeek, endOfMonth } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TrendingUp, DollarSign, Users, Percent } from "lucide-react";

interface IndicatorsSectionProps {
    selectedCountries: string[];
    setSelectedCountries: (countries: string[]) => void;
    selectedIndicators: string[];
    setSelectedIndicators: (indicators: string[]) => void;
    data: any;
    setData: (data: any) => void;
    dateFrom: string;
    setDateFrom: (date: string) => void;
    dateTo: string;
    setDateTo: (date: string) => void;
    loading: boolean;
    error: string | null;
    allCountries: string[];
    allIndicators: string[];
  apiKey: string;
}

const IndicatorsSection: React.FC<IndicatorsSectionProps> = ({
    selectedCountries,
    setSelectedCountries,
    selectedIndicators,
    setSelectedIndicators,
    data,
    setData,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    loading,
    error,
    allCountries,
    allIndicators,
  apiKey,
}) => {

  const handleDownload = () => {
    if (!data) return;
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "indicators");
    writeFile(wb, "indicators.xlsx");
  };

  const getIconForIndicator = (indicator: string) => {
    switch (indicator.toLowerCase()) {
      case "gdp":
        return <TrendingUp className="h-4 w-4 text-muted-foreground" />;
      case "population":
        return <Users className="h-4 w-4 text-muted-foreground" />;
      case "unemployment":
        return <Users className="h-4 w-4 text-muted-foreground" />;
      case "inflation":
        return <Percent className="h-4 w-4 text-muted-foreground" />;
      default:
        return <DollarSign className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <Card className="p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="countries" className="block text-sm font-medium text-muted-foreground mb-2">
              Select Countries
            </label>
            <Select
            defaultValue="all"
              value={selectedCountries.join(",")}
              onValueChange={(value) => setSelectedCountries(value.split(","))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="all" value={allCountries.join(",")}> All Countries </SelectItem>
                {allCountries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="indicators" className="block text-sm font-medium text-muted-foreground mb-2">
              Select Indicators
            </label>
            <Select
            defaultValue="all"
              value={selectedIndicators.join(",")}
              onValueChange={(value) => setSelectedIndicators(value.split(","))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select indicators" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="all" value={allIndicators.join(",")}> All Indicators </SelectItem>
                {allIndicators.map((indicator) => (
                  <SelectItem key={indicator} value={indicator}>
                    {indicator}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="from" className="block text-sm font-medium text-muted-foreground mb-2">
              Date from
            </label>
            <Input type="date" id="from" onChange={(e) => setDateFrom(e.target.value)} value={dateFrom} />
          </div>
          <div>
            <label htmlFor="to" className="block text-sm font-medium text-muted-foreground mb-2">
              Date to
            </label>
            <Input type="date" id="to" onChange={(e) => setDateTo(e.target.value)} value={dateTo} />
          </div>
        </div>
      </Card>
      {error && <div className="text-red-500">{error}</div>}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        data &&
        data.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {selectedIndicators.slice(0, 4).map((indicator, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {indicator.charAt(0).toUpperCase() + indicator.slice(1)}
                    </CardTitle>
                    {getIconForIndicator(indicator)}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">
                      {data
                        .find((item: any) => item.Category.toLowerCase() === indicator.toLowerCase())
                        ?.Value.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {data.find((item: any) => item.Category.toLowerCase() === indicator.toLowerCase())?.Country}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-secondary">Indicators Data</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Country</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.Country}</TableCell>
                      <TableCell>{item.Category}</TableCell>
                      <TableCell className="text-primary">{item.Value.toLocaleString()}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(item.DateTime).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button onClick={handleDownload} className="mt-4">
                Download Data
              </Button>
            </Card>
          </>
        )
      )}
    </div>
  );
};

export default IndicatorsSection;