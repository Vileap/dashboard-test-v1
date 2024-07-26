import * as React from "react";
import Layout from "@/components/Layout/Layout";
import Dashboard from "@/view/Dashboard";

export default function Home() {
  const [queryParams, setQueryParams] = React.useState();

  return (
    <Layout title="Home | Dashobard">
      <Dashboard />
    </Layout>
  );
}
