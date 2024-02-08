import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <div className="layout">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
