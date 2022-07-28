import { FC } from "react";
import { ComponentWithChildren } from "../../common/types";

type AppLayoutProps = ComponentWithChildren;

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div
      className="App p-4 d-flex align-items-end gap-4"
      style={{ minHeight: "100vh" }}
    >
      {children}
    </div>
  );
};

export default AppLayout;
