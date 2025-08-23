"use client";

import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { LoginDrawer } from "../login-drawer";
import type { SearchSuggestion } from "@/types";

interface SelectedResultProps {
  data: SearchSuggestion;
  userInfo?: any | undefined;
  handleGenerateClick: () => void;
}

function SelectedResult(props: SelectedResultProps) {
  const { data, handleGenerateClick } = props;

  return (
    <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl shadow-2xl py-6 px-6 m-auto transition-all duration-300 hover:bg-gray-900/70 hover:border-gray-700/50 group">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <Image
            width={96}
            height={96}
            className="w-24 h-24 rounded-2xl shadow-xl border-2 border-gray-700/50 group-hover:scale-105 transition-transform"
            src={data.img.medium || "/placeholder.svg"}
            alt={`${data.album} cover`}
          />
          <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl -z-10 scale-110" />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full">
            {data.type}
          </span>
          <h3 className="text-xl font-semibold text-white leading-tight">
            {data.album}
          </h3>
          <p className="text-gray-400 font-medium">{data.artist}</p>
        </div>
      </div>

      <div className="mt-6">
        <SignedOut>
          <LoginDrawer>
            <button className="w-full flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25 focus:ring-2 focus:ring-blue-500/50 focus:outline-none">
              Get lyrics
            </button>
          </LoginDrawer>
        </SignedOut>

        <SignedIn>
          <button
            onClick={() => handleGenerateClick()}
            className="w-full flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
          >
            Get lyrics
          </button>
        </SignedIn>
      </div>
    </div>
  );
}

export default SelectedResult;
