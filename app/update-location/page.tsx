import { ScrollArea } from "@radix-ui/themes";
import { cookies } from "next/headers";
import Image from "next/image";
import { DISTRICT_API, DIVISION_API, LOOKUP_API } from "../APIs";
import Header from "../login/components/Header";
import { District, Division, safeFetch, TehsilLookupResponse } from "../types";
import Form from "./components/Form";
import FormWrapper from "./components/Wrapper";

const UpdateLocationPage = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const divisionId = cookieStore.get("divisionId")?.value;
  const districtId = cookieStore.get("districtId")?.value;

  const [divisionResponse, districtResponse, tehsilLookupResponse] =
    await Promise.all([
      safeFetch<Division>(
        `${process.env.BACKEND_URL}${DIVISION_API}/${divisionId}`,
      ),
      safeFetch<District>(
        `${process.env.BACKEND_URL}${DISTRICT_API}/${districtId}`,
      ),
      safeFetch<TehsilLookupResponse>(
        `${process.env.BACKEND_URL}${LOOKUP_API}/tehsils/${districtId}`,
      ),
    ]);

  return (
    <div>
      <Header />

      <div className="fixed right-0 bottom-0 -z-10">
        <Image
          src="/images/maryam-nawaz.png"
          alt="maryam-nawaz"
          width={596}
          height={818} // intrinsic ratio preserved
          className="w-[22vw] sm:w-[15vw] md:w-[30vw] lg:w-[15vw] xl:w-[34vw] 2xl:w-[27vw] h-auto drop-shadow-[0_20px_25px_rgba(255,255,255,.6)]"
        />
      </div>
      {/* content */}
      <FormWrapper>
        <ScrollArea
          type="auto"
          scrollbars="vertical"
          style={{ height: "65vh" }}
        >
          {divisionResponse.data &&
            districtResponse.data &&
            tehsilLookupResponse.data?.data &&
            userId && (
              <Form
                divisionResponse={divisionResponse.data}
                districtResponse={districtResponse.data}
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
