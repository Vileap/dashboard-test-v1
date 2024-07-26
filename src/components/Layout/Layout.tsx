import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import {
  Layout as AntdLayout,
  ConfigProvider,
  Skeleton,
  theme as AntdTheme,
} from "antd";

import theme from "@/styles/theme/themeconfig";

const { Header, Content, Footer } = AntdLayout;

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Sider = dynamic(() => import("./Sider"), {
  ssr: false,
});

const Layout = ({ children, title }: LayoutProps) => {
  const router = useRouter();
  const [transitioning, setTransitioning] = React.useState(false);
  // const [isDarkMode, setIsDarkMode] = React.useState(false);

  // const onEnableMode = () => {
  //   setIsDarkMode(!isDarkMode);
  // };

  const {
    token: { colorBgContainer, borderRadiusSM },
  } = AntdTheme.useToken();

  const Loading = <Skeleton active key={Math.random()} />;

  React.useEffect(() => {
    // 👇 this handler will create a transition effect between route changes,
    // so that it doesn't automatically display the next screen.
    const handler = () => {
      setTransitioning(true);

      setTimeout(() => {
        setTransitioning(false);
      }, 280);
    };
    router.events.on("routeChangeComplete", handler);
    return () => {
      router.events.off("routeChangeComplete", handler);
    };
  }, [router.events]);

  return (
    <ConfigProvider theme={theme}>
      <AntdLayout>
        <Head>
          <title>{title}</title>
        </Head>
        <Sider />

        <AntdLayout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "18px 12px 0" }}>
            <div
              style={{
                padding: 12,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusSM,
              }}
            >
              {transitioning ? Loading : <div>{children}</div>}
            </div>
          </Content>

          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Vileap Vong
          </Footer>
        </AntdLayout>
      </AntdLayout>
    </ConfigProvider>
  );
};

export default Layout;
