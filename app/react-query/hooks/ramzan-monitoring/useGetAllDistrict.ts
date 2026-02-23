import { DISTRICTS_API } from "@/app/APIs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface District {
  id: number;
  divisionId: number;
  name: string;
  urduName: string;
  shortName: string | null;
}

const useGetAllDistricts = () =>
  useQuery<District[]>({
    queryKey: ["Districts"],
    queryFn: async () => {
      const { data } = await axios.get<District[]>(DISTRICTS_API);
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

export default useGetAllDistricts;
