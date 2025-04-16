import React from "react";
import { useSearchParams } from "react-router-dom";

export function Chat() {
  const [search] = useSearchParams();
  return <div>{search.get('userfriend')}</div>;
}
