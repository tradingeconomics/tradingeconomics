import { AppSideBar } from "@/components/shared/AppSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <SidebarProvider>
      <AppSideBar />
      <main>
        <SidebarTrigger />
        <Outlet /> {/* This renders the matched route */}
      </main>
    </SidebarProvider>
  );
}
