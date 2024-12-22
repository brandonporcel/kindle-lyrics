import Image from "next/image";
import { LoginDrawer } from "../login-drawer";
// import { MyDrawer } from "./MyDrawer";

interface SelectedResultProps {
  data: any;
  userInfo?: any | undefined;
  handleGenerateClick: (selection: any) => void;
}

function SelectedResult(props: SelectedResultProps) {
  const { data, handleGenerateClick } = props;
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 py-4 m-auto">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <Image
          width={84}
          height={84}
          className="w-24 h-24 mb-3 rounded-full shadow-lg md:mb-0 md:mr-4"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Googleplex_HQ_%28cropped%29.jpg/640px-Googleplex_HQ_%28cropped%29.jpg"
          alt="Bonnie image"
        />
        <div className="text-center md:text-left">
          <span className="capitalize bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            {data.type}
          </span>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {data.result.primary_artist.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {data.result.title}
          </span>
        </div>
      </div>
      <div className="flex mt-4 md:mt-2 w-full px-8">
        <LoginDrawer>
          <button
            onClick={() => handleGenerateClick(data)}
            className="w-full items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Generate
          </button>
        </LoginDrawer>
      </div>
    </div>
  );
}

export default SelectedResult;
