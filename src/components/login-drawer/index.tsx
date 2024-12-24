import { Drawer } from "vaul";
import { Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export function LoginDrawer({ children }: { children: React.ReactNode }) {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Title>Login Drawer</Drawer.Title>
        <Drawer.Description>Login Drawer</Drawer.Description>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="h-fit fixed bottom-0 left-0 right-0 outline-none bg-white text-black">
          <div className="flex-1 rounded-t-[10px] bg-white p-4 pb-32">
            <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300"></div>
            <div className="mx-auto max-w-md">
              <div>
                <h2 id="radix-:R6odaH1:" className="mb-2 text-xl font-medium">
                  Welcome to Kindle Lyrics
                </h2>
                <p className="mb-6 text-base text-zinc-600">
                  Sign in for unlimited access, ability to save your pdfs, and
                  more!
                </p>

                <Link href={"sign-in"}>
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
                </Link>

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
