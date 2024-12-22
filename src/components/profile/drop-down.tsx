import { LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function DropDown({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
          <a
            href="https://github.com/brandonporcel"
            target="_blank"
            rel="noopener"
          >
            <DropdownMenuItem>
              <span>GitHub</span>
            </DropdownMenuItem>
          </a>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <a href="/api/auth/signout">
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </a>
        <DropdownMenuSeparator />
        <a href="/signin">
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign In</span>
          </DropdownMenuItem>
        </a>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDown;
