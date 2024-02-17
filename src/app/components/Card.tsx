"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {};
const Card = (props: Props) => {
  const { status, data: session } = useSession();
  const router = useRouter();
  console.log("STATUS", status);

  if (status !== "loading" && status !== "authenticated") {
    router.push("/login");
  }

  //   Fetch user data here and see if "college" attribute exists. If it doesn't push to onboard

  return <div>{status}</div>;
};
export default Card;
