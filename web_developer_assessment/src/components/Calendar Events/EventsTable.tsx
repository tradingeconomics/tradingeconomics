import SectionHeader from "@/components/shared/SectionHeader";
import { key } from "@/utils/keys";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type CalendarEvent = {
  Country: string;
  Event: string;
  Date: string;
  Importance: number;
  Actual: number | string | null;
  Forecast: number | string | null;
  Previous: number | string | null;
  Currency?: string;
};

const EventsTable = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<CalendarEvent[]>({
    queryKey: ["events"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://api.tradingeconomics.com/calendar`,
          {
            params: { c: key },
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            timeout: 10000, // 10 second timeout
          }
        );
        return response.data;
      } catch (err) {
        console.error("API Error:", err);
        throw new Error("Failed to connect to Trading Economics API");
      }
    },
    retry: 1, // Will retry once if the first attempt fails
    staleTime: 1000 * 60 * 5, // 5 minute cache
  });

  const getImportanceBadge = (importance: number) => {
    const importanceMap = {
      1: { class: "bg-red-100 text-red-800", text: "High" },
      2: { class: "bg-yellow-100 text-yellow-800", text: "Medium" },
      3: { class: "bg-green-100 text-green-800", text: "Low" },
    };

    const { class: className, text } =
      importanceMap[importance as keyof typeof importanceMap] ||
      importanceMap[3];

    return (
      <span className={`px-2 py-1 rounded-full text-xs ${className}`}>
        {text}
      </span>
    );
  };

  return (
    <div className="p-4">
      <SectionHeader title="Calendar Events" />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          <span className="ml-2">Loading events...</span>
        </div>
      ) : isError ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading data
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error?.message || "Unknown error occurred"}</p>
                <button
                  onClick={() => refetch()}
                  className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No calendar events available</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Importance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Forecast
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Previous
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((event, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {event.Country}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                    <div className="truncate">{event.Event}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(event.Date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getImportanceBadge(event.Importance)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.Actual ?? "-"}
                    {event.Currency && ` ${event.Currency}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.Forecast ?? "-"}
                    {event.Currency && ` ${event.Currency}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.Previous ?? "-"}
                    {event.Currency && ` ${event.Currency}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EventsTable;
