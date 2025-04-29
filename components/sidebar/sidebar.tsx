import Image from "next/image";
import { SidebarRoutes } from "./sidebar-routes";

const Sidebar = () => {
  return (
    <nav className="relative hidden w-80 lg:block">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/"
          alt="Sidebar Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      {/* Full Sidebar Black Overlay */}
      <div className="absolute inset-0 z-10 bg-white opacity-50" />

      {/* Sidebar Content */}
      <div className="relative z-20 h-screen overflow-y-auto border-r">
        <div className="px-3 py-2">
          <div className="mt-24 flex w-full flex-col">
            <SidebarRoutes />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
