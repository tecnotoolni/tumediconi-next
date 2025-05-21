"use client";
import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { TbCalendarClock, TbHeartHandshake, TbUserCircle } from "react-icons/tb";
import { IconType } from "react-icons";
import routes from "@/sources/routes";
import Avatar from "@/components/common/ui/Avatar";
import { UseAuthStore } from "@/store/useAuthStore";
import { UserRole } from "@/types/User";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = UseAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) return;

    const isAdmin = user.role === UserRole.admin;
    const isDoctorWithoutProfile =
      user.role === UserRole.doctor && !user.doctor;
    const isPatientWithoutProfile =
      user.role === UserRole.patient && !user.patient;

    if (!isAdmin && (isDoctorWithoutProfile || isPatientWithoutProfile)) {
      redirect(routes.authentication.finish);
    }
  }, [user]);

  const menus = [
    {
      name: "Servicios",
      slug: "services",
      icon: TbHeartHandshake,
    },
    {
      name: "Pacientes",
      slug: "patients",
      icon: TbUserCircle,
    },
    {
      name: "Citas Programadas",
      slug: "appointments",
      icon: TbCalendarClock,
    },
  ];

  return (
    <main className="flex flex-col gap-4 size-full max-w-screen-xl mx-auto p-8">
      <section className="flex flex-col gap-4 flex-1 border border-cool-gray-200 rounded-2xl p-8 overflow-scroll">
        {children}
      </section>
      <nav className="flex justify-between gap-4">
        <div className="flex flex-1 gap-4 items-center">
          {menus.map((menu, index) => {
            const href = `${routes.dashboard}/${menu.slug}`;
            const isActive = pathname.startsWith(href);
            return (
              <NavigationItem
                key={index}
                icon={menu.icon}
                name={menu.name}
                href={href}
                active={isActive}
              />
            );
          })}
        </div>
        <Avatar
          url={routes.api.base + user?.avatar?.fileUrl}
          className="h-16"
        />
      </nav>
    </main>
  );
}

interface NavigationItemProps {
  active?: boolean;
  name: string;
  icon: IconType;
  href: string;
}

const NavigationItem = ({
  name,
  icon: Icon,
  href,
  active,
}: NavigationItemProps) => {
  return (
    <Link
      href={href}
      className={`${
        active
          ? "bg-primary-700 hover:bg-primary-600 text-white hover:bg-shades-200"
          : "hover:bg-cool-gray-50 bg-white text-primary-800"
      }  border border-cool-gray-100 active:scale-95 rounded-2xl transition-all flex justify-center items-center text-shades-200 h-16 p-4`}
      aria-label={name}
    >
      <Icon className="text-[32px]" />
      <span className="font-medium text-shades-200 text-xl">{name}</span>
    </Link>
  );
};
