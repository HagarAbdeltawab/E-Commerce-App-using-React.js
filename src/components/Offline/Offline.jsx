import useOnline from "../../hooks/useOnline.jsx";

export default function Offline({ children }) {
  const isOnline = useOnline();
  if (!isOnline) return children;
}
