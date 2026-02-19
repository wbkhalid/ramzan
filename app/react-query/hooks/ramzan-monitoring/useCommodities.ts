import { COMMODITY_API } from "@/app/APIs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Commodity {
  id: number;
  name: string;
  unit: string;
  marketRate: number;
  bazarRate: number;
  isActive: boolean;
}

const useCommodities = () =>
  useQuery<Commodity[]>({
    queryKey: ["Commodities"],
    queryFn: () => axios.get(COMMODITY_API).then((res) => res.data),
    staleTime: 60 * 1000, // 60s
  });

export default useCommodities;
