import ReportComponent from "./components/ReportComponent";

export interface DashboardSummary {
  date: string;
  totalDastarkhawan: number;
  monitored: number;
  notMonitored: number;
  fullyMonitored: number;
  partiallyMonitored: number;
  step0Completed: number;
  step1Completed: number;
  step2Completed: number;
  step3Completed: number;
  totalCapacity: number;
  totalPeopleServed: number;
}

export interface DashboardItem {
  dastarkhawanId: number;
  dastarkhawanName: string;
  divisionId: number;
  divisionName: string;
  districtId: number;
  districtName: string;
  tehsilId: number;
  tehsilName: string;
  latitude: number;
  longitude: number;
  serveCapacity: number;
  philanthropistName: string;
  monitoringId: number | null;
  hasMonitoring: boolean;
  monitoringStatus: string;
  step0Done: boolean;
  step1Done: boolean;
  step2Done: boolean;
  step3Done: boolean;
  step1SubmittedAt: string | null;
  step2SubmittedAt: string | null;
  step3SubmittedAt: string | null;
  inspectionInchargeName: string | null;
  dcFocalPersonName: string | null;
  numberServed: number | null;
}

export interface DashboardResponse {
  summary: DashboardSummary;
  totalFilteredCount: number;
  items: DashboardItem[];
}

const page = () => {
  return (
    <div>
      <ReportComponent />
    </div>
  );
};

export default page;
