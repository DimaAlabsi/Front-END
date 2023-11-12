import Head from "next/head";
import TaskForm from "../components/Form/TaskForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dynamic task - Home</title>
      </Head>
      <div className="grid items-center justify-center min-h-screen py-2 px-[4vw]">
        <TaskForm  />
      </div>
    </>
  );
}


