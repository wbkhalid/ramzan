import { SAHULAT_BAZAR_DASHBOARD_API } from "@/app/APIs";
import { BaseResponse } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface SahulatBazarAssignedLocation {
  id: number;
  name: string;
  personName: string;
  phoneNumber: string;
  designation: string;
  divisionId: number;
  divisionName: string;
  districtId: number;
  districtName: string;
  tehsilId: number;
  tehsilName: string;
  latitude: number;
  longitude: number;
  recommended: boolean;
  remarks: string;
  isActive: boolean;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  pictures: string[];
}

type SahulatBazarAssignedLocationResponse = BaseResponse<
  SahulatBazarAssignedLocation[]
>;

const useAssignedLocations = (userId: string) =>
  useQuery<SahulatBazarAssignedLocation[]>({
    queryKey: ["sahulatBazarAssignedLocations", userId],
    queryFn: async () => {
      const res = await axios.get<SahulatBazarAssignedLocationResponse>(
        `${SAHULAT_BAZAR_DASHBOARD_API}/assigned-locations`,
        {
          params: { userId },
        },
      );

      return res?.data.data;
    },
    staleTime: 60 * 1000,
    enabled: !!userId, //Do not let the query run with an invalid ID.
  });

export default useAssignedLocations;
