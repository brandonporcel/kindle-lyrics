import { Drawer } from "vaul";
import { Mail } from "lucide-react";
import { Button } from "../ui/button";

export function LoginDrawer({ children }: { children: React.ReactNode }) {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-40 mt-24 flex min-h-[50%] flex-col rounded-t-[10px] bg-zinc-100 outline-none">
          <div className="flex-1 rounded-t-[10px] bg-white p-4">
            <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300"></div>
            <div className="mx-auto max-w-md">
              <div>
                <h2 id="radix-:R6odaH1:" className="mb-2 text-xl font-medium">
                  Welcome to lyrics kindle
                </h2>
                <p className="mb-6 text-base text-zinc-600">
                  Sign in for unlimited access, ability to save your pdfs, and
                  more!
                </p>

                <form
                  action="/api/auth/signin"
                  method="post"
                  className="flex items-center justify-center sm:justify-start"
                >
                  <Button
                    className="w-full"
                    type="submit"
                    value="google"
                    name="provider"
                    variant={"secondary"}
                  >
                    <Mail className="mr-2 h-4" />
                    Login with Google
                  </Button>
                </form>

                <p className="mt-3 text-center text-xs text-gray-400 sm:text-left">
                  By continuing you agree to our{" "}
                  <a
                    className="text-gray-500 hover:text-gray-900 underline underline-offset-2 transition-colors duration-200 ease-out"
                    target="_blank"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    className="text-gray-500 hover:text-gray-900 underline underline-offset-2 transition-colors duration-200 ease-out"
                    target="_blank"
                  >
                    Terms of Use
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
