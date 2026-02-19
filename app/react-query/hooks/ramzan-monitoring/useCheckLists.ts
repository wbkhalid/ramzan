import { CHECK_LIST_API, COMMODITY_API } from "@/app/APIs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface CheckList {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
  answerType: number;
}

const useCheckLists = () =>
  useQuery<CheckList[]>({
    queryKey: ["CheckList"],
    queryFn: () => axios.get(CHECK_LIST_API).then((res) => res.data),
    staleTime: 60 * 1000, // 60s
  });

export default useCheckLists;
