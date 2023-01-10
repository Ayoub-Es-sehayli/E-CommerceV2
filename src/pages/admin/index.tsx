import Head from "next/head";
import { AdminLayout, NextPageWithLayout } from "../../components/layouts";

const DashboardPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <div>
        <header>
          <h1>Dashboard</h1>
        </header>
      </div>
    </>
  );
};

DashboardPage.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};
export default DashboardPage;
