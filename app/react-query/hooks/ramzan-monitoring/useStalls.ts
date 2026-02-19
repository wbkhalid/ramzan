import { STALL_API } from "@/app/APIs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Stall {
  id: number;
  name: string;
  isActive: boolean;
}

const useStalls = () =>
  useQuery<Stall[]>({
    queryKey: ["stalls"],
    queryFn: () => axios.get(STALL_API).then((res) => res.data),
    staleTime: 60 * 1000, // 60s
  });

export default useStalls;
