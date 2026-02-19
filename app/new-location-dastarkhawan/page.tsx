import { cookies } from "next/headers";
import { LOOKUP_API } from "../APIs";
import { BaseResponse, safeFetch } from "../types";
import Form from "./components/Form";
import FormWrapper from "./components/Wrapper";
import { ScrollArea } from "@radix-ui/themes";

export interface TehsilLookup {
  id: number;
  districtId: number;
  name: string;
  urduName: string;
  shortName: string;
}

type TehsilLookupResponse = BaseResponse<TehsilLookup[]>;

export interface DistrictLookup {
  id: number;
  divisionId: number;
  name: string;
  urduName: string;
  shortName: string;
}

type DistrictLookupResponse = BaseResponse<DistrictLookup[]>;

const UpdateLocationPage = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const divisionId = cookieStore.get("divisionId")?.value;
  const districtId = cookieStore.get("districtId")?.value;

  const [
    districtLookupResponse,
    tehsilLookupResponse,
    // commodityDashboard,
    // hatcheryAnalyticsData,
  ] = await Promise.all([
    safeFetch<DistrictLookupResponse>(
      `${process.env.BACKEND_URL}${LOOKUP_API}/districts/${divisionId}`,
    ),
    safeFetch<TehsilLookupResponse>(
      `${process.env.BACKEND_URL}${LOOKUP_API}/tehsils/${districtId}`,
    ),
    // safeFetch<CommodityDashboard>(
    //   `${process.env.BACKEND_URL}${COMMODITY_DASHBOARD_API}?commodityId=${productId}`,
    //   `commodity-dashboard-${productId}`,
    // ),
    // safeFetch<HatcheryAnalytics>(
    //   `${process.env.BACKEND_URL}${POULTRY_DASHBOARD_API}/Hatchery_Analytics`,
    // ),
  ]);

  const logedInUserDistrict = districtLookupResponse.data?.data.find(
    (d) => d.id === Number(districtId),
  );

  return (
    <div>
      {/* content */}
      <FormWrapper>
        <ScrollArea
          type="auto"
          scrollbars="vertical"
          style={{ height: "77vh" }}
        >
          {logedInUserDistrict && tehsilLookupResponse.data?.data && userId && (
            <Form
              districtData={logedInUserDistrict}
              tehsilsData={tehsilLookupResponse.data.data}
              userId={userId}
            />
          )}
        </ScrollArea>
      </FormWrapper>
    </div>
  );
};

export default UpdateLocationPage;
