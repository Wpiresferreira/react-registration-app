import { Outlet} from "react-router-dom";
import Top from "./components/Top";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <main className="grid grid-rows-[auto_1fr_auto] min-h-[100vh]">
      <Top></Top>
      <Outlet />
      <Footer></Footer>
    </main>
  );
};

export default Layout;
