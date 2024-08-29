import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

export default function RootLayout() {
  return <main>
    <Navbar />
    <Outlet />
  </main>
}