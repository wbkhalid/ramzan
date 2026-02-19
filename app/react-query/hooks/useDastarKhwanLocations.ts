import { LOOKUP_API } from "@/app/APIs";
import { BaseResponse } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface DastarKhwanLocation {
  id: number;
  name: string;
  description: string;
  divisionId: number;
  districtId: number;
  tehsilId: number;
  latitude: number;
  longitude: number;
  observationsByFST: string;
  recommended: boolean;
  remarks: string;
  assignedTo: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

type DastarKhwanLocationResponse = BaseResponse<DastarKhwanLocation[]>;

const useDastarKhwanLocations = (tehsilId: number) =>
  useQuery<DastarKhwanLocation[]>({
    queryKey: ["dastarKhwanLocations", tehsilId],
    queryFn: async () => {
      const res = await axios.get<DastarKhwanLocationResponse>(
        `${LOOKUP_API}/dastarkhaan-locations/${tehsilId}`,
      );

      return res?.data?.data;
    },
    staleTime: 60 * 1000,
    enabled: !!tehsilId && tehsilId > 0,
    retry: 3,
  });

export default useDastarKhwanLocations;
