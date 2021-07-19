import { createHasuraClient } from "../../libs/hasuraClient";
import { GetServerSideProps } from "next";
import { VFC } from "react";

export const getServerSideProps: GetServerSideProps = async () => {
  const hasuraClient = createHasuraClient()
  const res = await hasuraClient.listScenarios({ email: 'aiji42@gmail.com' })
  console.log(res)

  return {
    props: {}
  }
}

const Admin: VFC = () => {
  return null
}

export default Admin