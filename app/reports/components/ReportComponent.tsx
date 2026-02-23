"use client";

import { Dialog, Button, Flex, Text } from "@radix-ui/themes";
import React, { useState, useEffect } from "react";
import apiClient from "@/app/services/api-client";
import { toast } from "react-toastify";
import DashboardView from "./DashboardView";
import { DashboardResponse } from "../page";
import * as XLSX from "xlsx";
import Cookies from "js-cookie";
import CustomSelect from "@/app/components/Form/CustomSelect";
import useGetAllDistricts from "@/app/react-query/hooks/ramzan-monitoring/useGetAllDistrict";
import { usePathname } from "next/navigation";

const ReportComponent = () => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(
    null,
  );
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    "All" | "NotFullyMonitored" | "FullyMonitored"
  >("All");
  const tehsilId = Cookies.get("tehsilId")
    ? Number(Cookies.get("tehsilId"))
    : null;
  const { data: districts } = useGetAllDistricts();
  const fetchDashboardData = async (
    date: string,
    status: string = "All",
    tehsilId?: number | null,
    districtId?: number | null,
  ) => {
    if (!date) return;

    try {
      setLoading(true);

      const response = await apiClient.get(
        `/api/AdminDashboard/dashboard-summary?date=${date}${
          tehsilId ? `&tehsilId=${tehsilId}` : ""
        }${districtId ? `&districtId=${districtId}` : ""}${
          status !== "All" ? `&status=${status}` : ""
        }`,
      );

      if (response?.data?.responseCode === 200) {
        setDashboardData(response.data.data);
        toast.success("Report loaded successfully");
      }
    } catch (error) {
      toast.error("Failed to fetch report");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!selectedDate) {
      toast.error("Please select date");
      return;
    }

    fetchDashboardData(selectedDate, statusFilter, tehsilId, selectedDistrict);

    setOpen(false);
  };

  useEffect(() => {
    if (selectedDate) {
      fetchDashboardData(
        selectedDate,
        statusFilter,
        tehsilId,
        selectedDistrict,
      );
    }
  }, [statusFilter, tehsilId, selectedDistrict]);

  const districtOptions =
    districts?.map((district) => ({
      label: district.name,
      value: district.id.toString(),
    })) || [];

  const getFormattedExportData = () => {
    if (!dashboardData?.items || dashboardData?.items.length === 0) {
      toast.warning("No data to export");
      return [];
    }

    return dashboardData.items.map((item, index) => ({
      "Sr #": index + 1,
      Name: item?.dastarkhawanName,
      District: item?.districtName,
      Tehsil: item?.tehsilName || "-",
      Latitude: item.latitude || "-",
      Longitude: item.longitude || "-",
      "Serve Capacity": item.serveCapacity || "-",
      "Philanthropist Name": item.philanthropistName || "-",
      "Monitoring Status": item.monitoringStatus || "-",
      "Step 1 : Setup": item.step1Done ? "Completed" : "Not Completed",
      "Step 2 : Food": item.step2Done ? "Completed" : "Not Completed",
      "Step 3 : Feed back": item.step3Done ? "Completed" : "Not Completed",
      "Number of Served": item.numberServed || "-",
      "Inspection Incharge Name": item.inspectionInchargeName || "-",
      "Inspection Incharge Phone #": item.inspectionInchargePhone || "-",
      "DC Focal Person Name": item.dcFocalPersonName || "-",
      "DC Focal Person Phone #": item.dcFocalPersonPhone || "-",
      "Menu Items": item?.menuItems?.join(", ") || "-",
    }));
  };

  const handleExportExcel = () => {
    const formattedData = getFormattedExportData();
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, `${selectedDate || "Report"}.xlsx`);
  };

  return (
    <>
      {/* Header */}
      <div className="bg-white border rounded-lg p-4 mb-2">
        <Flex gap="1" justify="between" className="flex-col md:flex-row ">
          <Text weight="bold">Daily Dastarkhwan Statistics</Text>

          <div className="flex gap-2 items-center w-full md:w-auto">
            <Button
              className="border rounded-lg p-1 cursor-pointer text-sm flex-1! md:flex-none! bg-(--green-9)!"
              onClick={handleExportExcel}
            >
              Export Data
            </Button>

            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger>
                <Button variant="soft" className="flex-1! md:flex-none! ">
                  Select Date
                </Button>
              </Dialog.Trigger>

              <Dialog.Content className="max-w-110!">
                <p className="text-center font-bold text-lg mb-3 ">
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
                  className="w-full! mt-4! bg-(--green-9)! cursor-pointer!"
                >
                  {loading ? "Loading..." : "Apply"}
                </Button>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        </Flex>

        {selectedDate && (
          <div className="mt-4 flex gap-4 items-center">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="status"
                value="All"
                checked={statusFilter === "All"}
                onChange={() => setStatusFilter("All")}
              />
              <Text>All</Text>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="status"
                value="NotFullyMonitored"
                checked={statusFilter === "NotFullyMonitored"}
                onChange={() => setStatusFilter("NotFullyMonitored")}
              />
              <Text>Not Monitored</Text>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="status"
                value="FullyMonitored"
                checked={statusFilter === "FullyMonitored"}
                onChange={() => setStatusFilter("FullyMonitored")}
              />
              <Text>Fully Monitored</Text>
            </label>
          </div>
        )}
      </div>

      {pathName === "/reports" && dashboardData && (
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm md:text-base font-bold">Report Data</p>
          <CustomSelect
            options={districtOptions}
            placeholder="Select District"
            value={
              districtOptions.find(
                (opt) => opt.value === selectedDistrict?.toString(),
              ) || null
            }
            onChangeSingle={(option) =>
              setSelectedDistrict(option ? Number(option.value) : null)
            }
            isClearable
          />
        </div>
      )}
      {/* Summary */}
      {dashboardData && (
        <div className="bg-white border rounded-lg overflow-hidden mb-2!">
          <div className="p-4 font-bold border-b grid grid-cols-2 md:grid-cols-3 gap-1 lg:gap-3 ">
            <p className="text-sm md:text-base">
              Total Dastarkhwan: {dashboardData.summary.totalDastarkhawan}
            </p>
            <p className="text-sm md:text-base">
              Not Monitored:{" "}
              {dashboardData.summary.notMonitored +
                dashboardData?.summary?.partiallyMonitored}
            </p>
            <p className="text-sm md:text-base">
              Monitored: {dashboardData.summary.fullyMonitored}
            </p>
          </div>
          <div className="p-4 font-bold border-b grid grid-cols-2 lg:grid-cols-6 gap-3 text-xs">
            <p>Profile Completed: {dashboardData.summary.step0Completed}</p>
            <p>Step 1 : Setup {dashboardData.summary.step1Completed}</p>
            <p>Step 2 : Food {dashboardData.summary.step2Completed}</p>
            <p>Step 3 : Feed back {dashboardData.summary.step3Completed}</p>
            <p>Total Capacity: {dashboardData.summary.totalCapacity}</p>
            <p>
              Total People Served: {dashboardData.summary.totalPeopleServed}
            </p>
          </div>
        </div>
      )}

      {dashboardData && <DashboardView data={dashboardData} />}
    </>
  );
};

export default ReportComponent;
