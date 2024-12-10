import AppHeader from "@/components/app-header";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppHeader />
      <div className="px-4 md:px-6 mt-10 mb-4">{children}</div>
    </>
  );
}
