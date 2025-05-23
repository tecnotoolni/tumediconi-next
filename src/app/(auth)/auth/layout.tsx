export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col gap-4 size-full max-w-screen-xl mx-auto p-8">
        {children}
    </main>
  );
}
