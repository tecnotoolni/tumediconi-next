import Image from "next/image";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
return(
    <>
    <main className="h-full flex flex-col bg-primary-50 mx-auto p-4 w-full">
      <span className="bg-gradient-to-b from-white to-primary-50 h-64 absolute top-0 left-0 w-full z-0"></span>
      
      <header className="flex justify-center mt-8 mb-16">
          <Image className="z-10" alt="logo" width={256} height={64} src="/logos/light.svg" />
      </header>

      <section className="z-0 p-4 max-w-[1536px] w-full mx-auto">
        {children}
      </section>
    </main>
    </>
)
}