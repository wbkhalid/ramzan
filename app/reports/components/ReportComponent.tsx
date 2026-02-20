"use client";

import { Dialog, Button, Flex, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import apiClient from "@/app/services/api-client";
import { toast } from "react-toastify";
import DashboardView from "./DashboardView";
import { DashboardResponse } from "../page"; // adjust path if needed

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
      return;
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

  return (
    <>
      {/* Header */}
      <div className="bg-white border rounded-lg p-4 mb-6">
        <Flex justify="between" align="center">
          <Text weight="bold">Daily Daster Khwan Statistics</Text>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
              <Button variant="soft">Select Date</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
              <p className="text-center font-bold text-lg mb-3">Select Date</p>

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
        </Flex>
      </div>

      {/* Simple Table */}
      {dashboardData && <DashboardView data={dashboardData} />}
    </>
  );
};

export default ReportComponent;
