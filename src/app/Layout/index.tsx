import { FC } from "react";
import { ComponentWithChildren } from "../../common/types";

type AppLayoutProps = ComponentWithChildren;

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div
      className="App p-4 d-flex align-items-center"
      style={{ minHeight: "100vh" }}
    >
      {children}
    </div>
  );
};

export default AppLayout;
