"use client";

import { Dialog, Button, Flex, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import apiClient from "@/app/services/api-client";
import { toast } from "react-toastify";
import DashboardView from "./DashboardView";
import { DashboardResponse } from "../page";
import * as XLSX from "xlsx";

const ReportComponent = () => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(
    null,
  );

  const handleApply = async () => {
    if (!selectedDate) {
      toast.error("Please select date");
      return [];
    }

    try {
      setLoading(true);

      const response = await apiClient.get(
        `/api/AdminDashboard/dashboard-summary?date=${selectedDate}`,
      );

      if (response?.data?.responseCode === 200) {
        setDashboardData(response.data.data);
        setOpen(false);
        toast.success("Report loaded successfully");
      }
    } catch (error) {
      toast.error("Failed to fetch report");
    } finally {
      setLoading(false);
    }
  };

  const getFormattedExportData = () => {
    if (!dashboardData?.items || dashboardData?.items.length === 0) {
      toast.warning("No data to export");
      return [];
    }

    return dashboardData?.items.map((item, index) => ({
      "Sr #": index + 1,
      Name: item?.dastarkhawanName,
      Division: item?.divisionName || "-",
      District: item?.districtName,
      Tehsil: item?.tehsilName || "-",
      Latitude: item.latitude || "-",
      Longitude: item.longitude || "-",
      "Serve Capacity": item.serveCapacity || "-",
      "philanthropist Name": item.philanthropistName || "-",
      "Monitoring Status": item.monitoringStatus || "-",
      "Step 1 : Setup": item.step1Done ? "Completed" : "Not Completed",
      "Step 2 : Food": item.step2Done ? "Completed" : "Not Completed",
      "Step 3 : Feed back": item.step3Done ? "Completed" : "Not Completed",
      "Number of Served": item.numberServed || "-",
      "Inspection Incharge Name": item.inspectionInchargeName || "-",
      "DC Focal Person Name": item.dcFocalPersonName || "-",
    }));
  };

  const handleExportExcel = () => {
    const formattedData = getFormattedExportData();
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, `${selectedDate} Report.xlsx`);
  };

  return (
    <>
      {/* Header */}
      <div className="bg-white border rounded-lg p-4 mb-6">
        <Flex justify="between" align="center">
          <Text weight="bold">Daily Daster Khwan Statistics</Text>

          <div className="flex gap-1 items-center">
            <div
              className="border rounded-lg p-1  cursor-pointer text-sm"
              onClick={handleExportExcel}
            >
              Export Data
            </div>
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger>
                <Button variant="soft">Select Date</Button>
              </Dialog.Trigger>

              <Dialog.Content maxWidth="450px">
                <p className="text-center font-bold text-lg mb-3">
                  Select Date
                </p>

                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border p-2 rounded w-full"
                />

                <Button
                  onClick={handleApply}
                  disabled={loading}
                  className="w-full! mt-4! bg-green-500! cursor-pointer!"
                >
                  {loading ? "Loading..." : "Apply"}
                </Button>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        </Flex>
      </div>

      {dashboardData && <DashboardView data={dashboardData} />}
    </>
  );
};

export default ReportComponent;
