import { Button } from "../ui/button";
import { LogOut, Menu } from "lucide-react";

function Header({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="py-2 px-1">
      <div className="flex justify-between">
        <div>
          <Button className="lg:hidden flex " onClick={() => setOpen(!open)}>
            <Menu />
          </Button>
        </div>
        <div>
          <Button>
            <LogOut />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
