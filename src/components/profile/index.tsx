import React from "react";
import DropDown from "./drop-down";
import Image from "next/image";

export default function Profile() {
  return (
    <>
      <DropDown>
        <a className="group relative inline-flex flex-shrink-0 items-center justify-center truncate transition duration-200 ease-out disabled:pointer-events-auto disabled:opacity-50 shadow ring-1 ring-gray-200 hover:bg-gray-200 dark:ring-gray-600 dark:hover:bg-gray-800 h-9 sm:h-8 sm:text-sm rounded-lg font-medium input-focus-ring select-none p-1 sm:p-1">
          <span className="relative flex shrink-0 overflow-hidden rounded-md h-7 w-7 sm:h-6 sm:w-6">
            <Image
              width={84}
              height={84}
              className="aspect-square h-full w-full"
              alt="Profile Picture"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Googleplex_HQ_%28cropped%29.jpg/640px-Googleplex_HQ_%28cropped%29.jpg"
            />
          </span>
        </a>
      </DropDown>
    </>
  );
}
