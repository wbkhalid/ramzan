"use client";

import { DashboardResponse } from "../page"; // adjust path

const DashboardView = ({ data }: { data: DashboardResponse }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">District</th>
              <th className="border p-2">Tehsil</th>
              <th className="border p-2">Latitude</th>
              <th className="border p-2">Longitude</th>
              <th className="border p-2">Serve Capacity</th>
              <th className="border p-2">Philanthropist Name</th>
              <th className="border p-2">Monitoring Status</th>
              <th className="border p-2">Step 1 : Setup</th>
              <th className="border p-2">Step 2 : Food</th>
              <th className="border p-2">Step 3 : Feed back</th>
              <th className="border p-2">Number of Served</th>
              <th className="border p-2">Inspection Incharge Name</th>
              <th className="border p-2">Inspection Incharge Phone #</th>
              <th className="border p-2">DC Focal Person Name</th>
              <th className="border p-2">DC Focal Person Phone #</th>
              <th className="border p-2">Menu Items</th>
            </tr>
          </thead>

          <tbody>
            {data.items.map((item) => (
              <tr key={item.dastarkhawanId} className="hover:bg-gray-50">
                <td className="border p-2">{item.dastarkhawanName}</td>
                {/* <td className="border p-2">{item.divisionName}</td> */}
                <td className="border p-2">{item.districtName}</td>
                <td className="border p-2">{item.tehsilName}</td>
                <td className="border p-2">{item.latitude}</td>
                <td className="border p-2">{item.longitude}</td>
                <td className="border p-2">{item.serveCapacity}</td>
                <td className="border p-2">{item.philanthropistName}</td>
                <td className="border p-2">{item.monitoringStatus}</td>
                <td className="border p-2">
                  {item.step0Done ? "Completed" : "Not Completed"}
                </td>
                <td className="border p-2">
                  {item.step1Done ? "Completed" : "Not Completed"}
                </td>
                <td className="border p-2">
                  {item.step2Done ? "Completed" : "Not Completed"}
                </td>
                <td className="border p-2">{item.numberServed}</td>
                <td className="border p-2">{item.inspectionInchargeName}</td>
                <td className="border p-2">{item.inspectionInchargePhone}</td>
                <td className="border p-2">{item.dcFocalPersonName}</td>
                <td className="border p-2">{item.dcFocalPersonPhone}</td>

                <td className="border p-2">
                  {item?.menuItems?.map((menuItem, index) => (
                    <div key={index}>{`${menuItem},`}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardView;
