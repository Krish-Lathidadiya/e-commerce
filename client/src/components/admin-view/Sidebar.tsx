import {
  ChartNoAxesCombined,
  LayoutDashboard,
  ListOrdered,
  ShoppingBasket,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const MenuItems = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");
  return (
    <div>
      {adminSidebarMenuItems.map((menu) => (
        <div
          key={menu.id}
          className={`${
            active === menu.id ? "bg-gray-100 font-medium" : "text-gray-700"
          } flex items-center gap-2 py-2 px-4 hover:bg-gray-100  cursor-pointer`}
          onClick={() => {
            setActive(menu.id)
            navigate(menu.path);
          }}
        >
          {menu.icon}
          <p>{menu.label}</p>
        </div>
      ))}
    </div>
  );
};

function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      {/*  toggle side bar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side={"left"} className="w-64 ">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b mb-5">
              <SheetTitle className="flex gap-2 mt-5 mb-3 ml-2">
                <ChartNoAxesCombined size={30} />
                <span className="font-bold text-2xl">Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems />
          </div>
        </SheetContent>
      </Sheet>
      {/* static sidebar for large screen */}
      <aside className="hidden lg:flex flex-col h-full w-64  border-r p-6 ">
        {/* header */}
        <Link
          to={"/admin/dashboard"}
          className="inline-flex mt-5 mb-5 ml-3 gap-2 hover:cursor-pointer hover:text-gray-500 border-b pb-3"
        >
          <ChartNoAxesCombined size={30} />
          <span className="font-bold text-2xl">Admin Panel</span>
        </Link>
        {/* Menu items */}
        <div className="">
          <MenuItems />
        </div>
      </aside>
    </>
  );
}
export default Sidebar;

export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket size={20} />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ListOrdered size={20} />,
  },
];
