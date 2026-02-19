import { LOOKUP_API } from "@/app/APIs";
import { BaseResponse } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface SahulatBazarLocation {
  id: number;
  name: string;
  personName: string;
  designation: string;
  phoneNumber: string;
  divisionId: number;
  districtId: number;
  tehsilId: number;
  latitude: number;
  longitude: number;
  type: number;
  recommended: boolean;
  remarks: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

type SahulatBazarLocationResponse = BaseResponse<SahulatBazarLocation[]>;

const useSahulatBazarLocations = (tehsilId: number) =>
  useQuery<SahulatBazarLocation[]>({
    queryKey: ["dastarKhwanLocations", tehsilId],
    queryFn: async () => {
      const res = await axios.get<SahulatBazarLocationResponse>(
        `${LOOKUP_API}/SahulatBazar-locations/${tehsilId}`,
      );

      return res?.data?.data;
    },
    staleTime: 60 * 1000,
    enabled: !!tehsilId, //Do not let the query run with an invalid ID.
    retry: 3,
  });

export default useSahulatBazarLocations;
