"use client";
import { ReactLenis } from "lenis/react";

function LenisWrapper() {
  return (
    <ReactLenis
      root
      options={{
        smoothWheel: true,
        lerp: 0.14,
      }}
    />
  );
}

export default LenisWrapper;
