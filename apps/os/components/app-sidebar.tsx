"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@haydenbleasel/design-system/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "/",
    },
  ],
};

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const pathname = usePathname();

  return (
    <Sidebar {...props} className="*:bg-transparent border-none">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <h1 className="text-base font-medium">OS1</h1>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="h-full flex flex-col items-center justify-center">
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupContent>
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.url}>
                  <a href={item.url}>{item.title}</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
