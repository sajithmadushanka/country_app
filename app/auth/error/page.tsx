import { Suspense } from "react";
import Error from "./Error";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Error />
    </Suspense>
  );
}
