import { cookies } from "next/headers";
import Evening from "./components/Evening";
import EveningOld from "./components/EveningOld";

const EveningPage = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  return (
    <>
      {userId && <Evening userId={userId} />}
      {/* {userId && <EveningOld userId={userId} />} */}
    </>
  );
};

export default EveningPage;
