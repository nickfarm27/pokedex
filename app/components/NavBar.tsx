import { Link } from "remix";
import SearchBar from "./SearchBar";

export default function NavBar() {
    return (
        <nav className="bg-white border-gray-200 border-b-2 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
            <div className="container flex justify-between items-center mx-auto">
                <div className="flex w-1/3">
                    <Link
                        to="/"
                        className="flex w-1/3 self-center text-lg font-semibold whitespace-nowrap dark:text-white ml-4"
                    >
                        Pokedex
                    </Link>
                </div>
                <div className="flex w-1/3 justify-center">
                    <SearchBar />
                </div>
                <div className="w-1/3"></div>
            </div>
        </nav>
    );
}
