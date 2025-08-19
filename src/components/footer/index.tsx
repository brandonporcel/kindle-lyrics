import React from "react";
import AppLink from "../ui/link";

function Footer() {
  return (
    <div className="border-grid border-t md:px-8 py-4">
      <div className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
        Built by{" "}
        <AppLink
          text="brandonporcel"
          href={"https://linkedin.com/in/brandonporcel"}
        />
        . The source code is available on{" "}
        <AppLink
          text="GitHub"
          href={"https://github.com/brandonporcel/kindle-lyrics"}
        />
        .
      </div>
    </div>
  );
}

export default Footer;
