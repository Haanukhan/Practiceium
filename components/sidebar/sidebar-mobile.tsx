import { Menu } from "lucide-react";
import { SidebarRoutes } from "./sidebar-routes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const SidebarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 transition hover:opacity-75 lg:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <div className="h-screen space-y-4 bg-white py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 border-b-2 p-2 px-4 text-lg font-semibold tracking-tight text-primary">
              Overview
            </h2>
            <div className="space-y-1">
              <SidebarRoutes />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
