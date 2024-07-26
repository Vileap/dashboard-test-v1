import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Layout as AntdLayout, Menu } from "antd";
import { HomeOutlined, ProfileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import Routes from "@/constants/routes";

type MenuItem = Required<MenuProps>["items"][number];

const { Sider } = AntdLayout;

const items: MenuItem[] = [
  {
    key: Routes.HOME,
    icon: <HomeOutlined />,
    label: <Link href={Routes.HOME}>Home</Link>,
  },
];

const rootSubmenuKeys = ["content"];

function SiderComponent() {
  const router = useRouter();
  const [openKeys, setOpenKeys] = React.useState([
    router.pathname.split("/")[1],
  ]);

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      width={240}
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        items={items}
        selectedKeys={[Routes.rootMenuKeys[router.pathname]]}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      />
    </Sider>
  );
}

export default SiderComponent;
