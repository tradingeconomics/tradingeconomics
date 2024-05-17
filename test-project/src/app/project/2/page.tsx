"use client";
import Link from "next/link";

import axios from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

import { useEffect, useState } from "react";

import LineChartForCountry from "@/components/LineChart";
import LineChartForCountryComparison from "@/components/ChartTwoCountries";
import { ArrowRight, HomeIcon, Loader2Icon } from "lucide-react";
import LineChartProjectTwo from "@/components/LineChart5-2";
import LineChartForCountryIndicatorPair from "@/components/LineChart5-2";

interface IndicatorData {
  Country: string;
  Category: string;
  Title: string;
  LatestValueDate: string;
  LatestValue: number;
  Source: string;
  SourceURL: string;
  Unit: string;
  URL: string;
  CategoryGroup: string;
  Adjustment: string;
  Frequency: string;
  HistoricalDataSymbol: string;
  CreateDate: string;
  FirstValueDate: string;
  PreviousValue: number;
  PreviousValueDate: string;
}
const formSchema = z.object({
  country: z
    .string({
      required_error: "Please select a country to display.",
    })
    .min(1, { message: "Please select a country to display." }),
  indicator: z
    .string({
      required_error: "Please select an Indicator .",
    })
    .min(1, { message: "Please select an indicator." }),
});
export default function ProjectTwo() {
  const [indicators, setIndicators] = useState<IndicatorData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const [data, setData] = useState(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      indicator: "",
    },
  });
  const country = form.watch("country");
  async function onSubmit(input: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      
      const url = `https://api.tradingeconomics.com/historical/country/${input.country}/indicator/${input.indicator}/2015-01-01/2023-12-31?c=bdc47ca7d4134d0:s9ec8qqlsd8rp9t`
  
      const res = await axios
        .get(
         url.replace(' ', '%20')
        )
        .catch(() => {
          setIsLoading(false);
          toast({
            title: "Something went wrong while fetching the data",
            variant: "destructive",
          });
        });
      if (res) {
        setData(res.data);
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{`{country : ${input.country}, indicator: ${input.indicator}}`}</code>
            </pre>
          ),
        });
      } else {
        toast({
          title: "something went wrong ",
        });
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const getIndicators = useEffect(() => {
    const fetchData = async () => {
      try {
        if (!country) return null;

        const response = await axios.get(
          `https://api.tradingeconomics.com/country/${country}?c=bdc47ca7d4134d0:s9ec8qqlsd8rp9t`
        );

        setIndicators(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [country]);
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">
            5.2 - Plotting charts after choosing a country - indicator pair.
          </h1>
        </div>

        <Card className="bg-muted">
          <CardHeader>
            <CardTitle>Select both Country and indicator </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-6 sm:grid-cols-3"
              >
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="grid gap-3">
                      <FormLabel>First country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Mexico">Mexico</SelectItem>
                          <SelectItem value="New Zealand">
                            New Zealand
                          </SelectItem>
                          <SelectItem value="Sweden">Sweden</SelectItem>
                          <SelectItem value="Thailand">Thailand</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="indicator"
                  render={({ field }) => (
                    <FormItem className="grid gap-3">
                      <FormLabel>Indicator</FormLabel>
                      <Select
                        onValueChange={
                          field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger disabled={country === ""}>
                            <SelectValue placeholder="Select an indicator" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {indicators.map((item) => (
                            <SelectItem key={item.Title} value={item.Category}>
                              {item.Title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
        
                  <Button disabled={isLoading} type="submit" size={"sm"} className="mt-8  px-10">
                    Plot a chart
                    {isLoading ? (
                  <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="ml-2 h-4 w-4" />
                )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {data ? (
          <div className="flex flex-col  items-center justify-center gap-10 rounded-lg border border-dashed shadow-sm p-20 ">
          

     
     
            <LineChartForCountryIndicatorPair
              country={form.getValues("country")}
              rawData={data}
            />
     
          </div>
        ) : (
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-20"
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                Graph will be diplayed here
              </h3>
              <p className="text-sm text-muted-foreground">
                select both countries and click compare to show graph
              </p>
            </div>
          </div>
        )}

        <div className="mb-32 grid text-center place-self-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <a
            href="/project/1"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"

            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              5.1{"  "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              A website that compares two countries or two indicators.
            </p>
          </a>

          <Link
            href="/project/2"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
             
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              5.2{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none text-muted-foreground text-sm">
                // You're here
              </span>
             
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Plotting charts after choosing a country - indicator pair.
            </p>
          </Link>

          <a
            href="/project/3"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
             
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              5.3{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
              
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Build a web page with a table that displays information.
            </p>
          </a>

          <a
            href="/"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              <span className=" inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                <HomeIcon size={'23'} className="mr-2"/>
              </span>
              Home{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
              Go back to Home
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}
