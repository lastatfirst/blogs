import Navbar from "@/app/blog/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to vt.</h1>
        <p className="text-xl mb-8">
          This is your homepage, styled like your blogs page—but without any blog data.
        </p>
      </main>
     
    </>
  );
} 