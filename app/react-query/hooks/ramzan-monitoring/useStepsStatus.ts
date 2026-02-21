import { Daily_Monitoring_API } from "@/app/APIs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface StepsStatus {
  dastarkhawanId: number;
  date: string;
  dailyMonitoringId: number | null;
  step0Completed: boolean;
  step1Completed: boolean;
  step2Completed: boolean;
  step3Completed: boolean;
}

interface StepsStatusResponse {
  responseCode: number;
  responseMessage: string;
  data: StepsStatus;
}

const useStepsStatus = (dastarkhawanId: number, date: string) =>
  useQuery<StepsStatus>({
    queryKey: ["StepsStatus", dastarkhawanId, date],
    queryFn: async () => {
      const { data } = await axios.get<StepsStatusResponse>(
        `${Daily_Monitoring_API}/steps-status`,
        {
          params: { dastarkhawanId, date },
        },
      );
      return data.data;
    },
    staleTime: 60 * 1000,
  });

export default useStepsStatus;
