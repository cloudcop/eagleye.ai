import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAuditLog } from "@/context/AuditLogContext";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { ArrowUpDown } from "lucide-react";

// Assuming AuditLogEntry is defined in your context or types
interface AuditLogEntry {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}

type SortKey = keyof AuditLogEntry;

const AuditLog = () => {
  const { logs } = useAuditLog();
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "ascending" | "descending";
  } | null>({ key: "timestamp", direction: "descending" });

  const uniqueUsers = [...new Set(logs.map((log) => log.user))];

  const filteredLogs = useMemo(() => logs.filter((log) => {
    const userMatch = userFilter === "all" || log.user === userFilter;
    const searchTermMatch =
      searchTerm === "" ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    return userMatch && searchTermMatch;
  }), [logs, userFilter, searchTerm]);

  const sortedLogs = useMemo(() => {
    let sortableItems = [...filteredLogs];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredLogs, sortConfig]);

  const paginatedLogs = useMemo(() => {
    const startIndex = (page - 1) * perPage;
    return sortedLogs.slice(startIndex, startIndex + perPage);
  }, [sortedLogs, page, perPage]);

  const requestSort = (key: SortKey) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    setPage(1);
  };

  const getSortIndicator = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortConfig.direction === "ascending" ? " 🔼" : " 🔽";
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setUserFilter("all");
    setPage(1);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setPage(1);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Audit Log</h1>
      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Input
              placeholder="Search actions or details..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              className="w-full sm:w-auto sm:flex-grow"
            />
            <Select value={userFilter} onValueChange={(value) => { setUserFilter(value); setPage(1); }}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                {uniqueUsers.map((user) => (
                  <SelectItem key={user} value={user}>
                    {user}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleClearFilters} className="w-full sm:w-auto">
              Clear Filters
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button variant="ghost" onClick={() => requestSort("timestamp")}>
                      Timestamp
                      {getSortIndicator("timestamp")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => requestSort("user")}>
                      User
                      {getSortIndicator("user")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => requestSort("action")}>
                      Action
                      {getSortIndicator("action")}
                    </Button>
                  </TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLogs.length > 0 ? (
                  paginatedLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.details}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No log entries match the current filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <DataTablePagination
            count={sortedLogs.length}
            page={page}
            perPage={perPage}
            onPageChange={setPage}
            onPerPageChange={handlePerPageChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLog;