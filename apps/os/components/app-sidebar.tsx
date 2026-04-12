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
import { CodeIcon, GamepadIcon, LayersIcon, MessageSquareIcon, MusicIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

const data = {
  navMain: [
    {
      icon: GamepadIcon,
      title: "Games",
      url: "/games",
    },
    {
      icon: MessageSquareIcon,
      title: "Posts",
      url: "/posts",
    },
    {
      icon: CodeIcon,
      title: "Code",
      url: "/code",
    },
    {
      icon: MusicIcon,
      title: "Music",
      url: "/music",
    },
    {
      icon: LayersIcon,
      title: "Stack",
      url: "/stack",
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
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="size-4" />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
