import { useState } from "react";

export default function useOnline() {
  const [online, setOnline] = useState(true);
  window.addEventListener("online", () => {
    setOnline(true);
  });
  window.addEventListener("offline", () => {
    setOnline(false);
  });
  return online;
}
