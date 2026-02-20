"use client";

import { DashboardResponse } from "../page"; // adjust path

const DashboardView = ({ data }: { data: DashboardResponse }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="p-4 font-bold border-b grid grid-cols-5 gap-3">
        <p>Total Dastarkhawan: {data.summary.totalDastarkhawan}</p>
        <p>Monitored: {data.summary.monitored}</p>
        <p>Not Monitored: {data.summary.notMonitored}</p>
        <p>Fully Monitored: {data.summary.fullyMonitored}</p>
        <p>Partially Monitored: {data.summary.partiallyMonitored}</p>
      </div>
      <div className="p-4 font-bold border-b grid grid-cols-6 gap-3 text-xs">
        <p>Profile Completed: {data.summary.step0Completed}</p>
        <p>Step 1 : Setup {data.summary.step1Completed}</p>
        <p>Step 2 : Food {data.summary.step2Completed}</p>
        <p>Step 3 : Feed back {data.summary.step3Completed}</p>
        <p>Total Capacity: {data.summary.totalCapacity}</p>
        <p>Total People Served: {data.summary.totalPeopleServed}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Division</th>
              <th className="border p-2">District</th>
              <th className="border p-2">Tehsil</th>
              <th className="border p-2">Capacity</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.items.map((item) => (
              <tr key={item.dastarkhawanId} className="hover:bg-gray-50">
                <td className="border p-2">{item.dastarkhawanName}</td>
                <td className="border p-2">{item.divisionName}</td>
                <td className="border p-2">{item.districtName}</td>
                <td className="border p-2">{item.tehsilName}</td>
                <td className="border p-2">{item.serveCapacity}</td>
                <td className="border p-2">{item.monitoringStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardView;
