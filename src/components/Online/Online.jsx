import useOnline from "../../hooks/useOnline.jsx";

export default function Online({ children }) {
  let isOnline = useOnline();
  if (isOnline) return children;
}
