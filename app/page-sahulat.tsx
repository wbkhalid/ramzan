import { cookies } from "next/headers";
import Morning from "./components/Home/Morning";

export default async function Home() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  return <>{userId && <Morning userId={userId} />} </>;
}
