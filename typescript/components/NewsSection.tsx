// app/components/NewsSection.tsx
"use client";
import { useState } from "react";
import { format, startOfWeek, startOfMonth, endOfWeek, endOfMonth } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NewsSectionProps {
    news: any;
    setNews: (news: any) => void;
    newsDateFrom: string;
    setNewsDateFrom: (date: string) => void;
    newsDateTo: string;
    setNewsDateTo: (date: string) => void;
    loading: boolean;
    selectedCountries: string[];
    error: string | null;
    apiKey: string;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    itemsPerPage: number
}

const NewsSection: React.FC<NewsSectionProps> = ({
    news,
    setNews,
    newsDateFrom,
    setNewsDateFrom,
    newsDateTo,
    setNewsDateTo,
    loading,
    selectedCountries,
    error,
    apiKey,
    currentPage,
    setCurrentPage,
  itemsPerPage
}) => {
  const [selectedRange, setSelectedRange] = useState<string>("today");
  const handleDateRangeChange = (range: string) => {
    setSelectedRange(range)
    const today = new Date()
    let fromDate = today
    let toDate = today

    switch (range) {
      case "today":
        fromDate = today
        toDate = today
        break
      case "thisWeek":
        fromDate = startOfWeek(today, { weekStartsOn: 1 })
        toDate = endOfWeek(today, { weekStartsOn: 1 })
        break
      case "thisMonth":
        fromDate = startOfMonth(today)
        toDate = endOfMonth(today)
        break
      default:
        break
    }
      setNewsDateFrom(format(fromDate, "yyyy-MM-dd"))
      setNewsDateTo(format(toDate, "yyyy-MM-dd"))
  }
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedNews = news ? news.slice(startIndex, startIndex + itemsPerPage) : [];
  return (
      <Card className="w-1/3 p-6 m-8">
          <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-primary">Latest News</h3>
              <Select value={selectedRange} onValueChange={handleDateRangeChange}>
                  <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="thisWeek">This Week</SelectItem>
                      <SelectItem value="thisMonth">This Month</SelectItem>
                  </SelectContent>
              </Select>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          {loading ? (
              <div className="text-center">Loading...</div>
          ) : (
              news &&
              news.length > 0 && (
                  <>
                      <ul className="space-y-4">
                          {selectedNews.map((newsItem: any, index: number) => (
                              <li key={index} className="border-b pb-2">
                                  <a
                                      href={newsItem.url}
                                      target="_blank"
                                      className="text-primary hover:underline"
                                      rel="noopener noreferrer"
                                  >
                                      {newsItem.title}
                                  </a>
                                  <p className="text-sm text-muted-foreground">{newsItem.description}</p>
                              </li>
                          ))}
                      </ul>
                      <div className="flex justify-between mt-4">
                          <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} variant="outline">
                              Previous
                          </Button>
                          <Button
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={startIndex + itemsPerPage >= news.length}
                              variant="outline"
                          >
                              Next
                          </Button>
                      </div>
                  </>
              )
          )}
      </Card>
  );
};

export default NewsSection;