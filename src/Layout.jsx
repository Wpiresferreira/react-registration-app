import { Outlet, Link } from "react-router-dom";
import Top from "./components/Top";

const Layout = () => {
  return (
    <>
      <Top></Top>
      <Outlet />
    </>
  );
};

export default Layout;
