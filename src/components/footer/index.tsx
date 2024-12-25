import React from "react";

function Footer() {
  return (
    <div className="border-grid border-t md:px-8 py-4">
      <div className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
        Built by{" "}
        <a
          href={"https://linkedin.com/in/brandonporcel"}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          brandonporcel
        </a>
        . The source code is available on{" "}
        <a
          href={"https://github.com/brandonporcel/kindle-lyrics"}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          GitHub
        </a>
        .
      </div>
    </div>
  );
}

export default Footer;
