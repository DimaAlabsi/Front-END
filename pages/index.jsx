import Head from "next/head";
import TaskForm from "../components/Form/TaskForm";

export default function Home({ users }) {
  // console.log(users,'usersData')
  return (
    <>
      <Head>
        <title>Dynamic task - Home</title>
      </Head>
      <div className="grid items-center justify-center min-h-screen py-2 px-[4vw]">
        <TaskForm usersData={users} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    return {
      props: {
        users,
      },
      revalidate: false,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      props: {
        users: [],
      },
    };
  }
}
