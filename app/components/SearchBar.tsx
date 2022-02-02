import { useEffect, useRef, useState } from "react";
import { Form, Link, useActionData, useSubmit, useTransition } from "remix";

function capitalizeName(name: string) {
    return name
        .split("-")
        .map((str) => str.charAt(0).toUpperCase() + str.substring(1))
        .join(" ");
}

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState("");
    const [focus, setFocus] = useState(false);
    const data = useActionData();
    const submit = useSubmit();
    const transition = useTransition();
    const formRef = useRef(null);

    useEffect(() => {
        const search = setTimeout(() => {
            if (focus) {
                submit(formRef.current, { replace: true });
            }
        }, 1000);

        return () => {
            clearTimeout(search);
        };
    }, [searchValue]);

    function searchChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value);
    }

    function enableFocus() {
        setFocus(true);
    }

    //? https://stackoverflow.com/questions/32553158/detect-click-outside-react-component - Niyaz, 48 upvotes
    function disableFocus(e: React.FocusEvent<HTMLFormElement>) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setFocus(false);
        }
    }

    return (
        <Form
            className="relative w-96 mr-0"
            method="post"
            autoComplete="off"
            spellCheck="false"
            ref={formRef}
            onFocus={enableFocus}
            onBlur={disableFocus}
        >
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </div>
            <input
                type="text"
                name="search-bar"
                id="search-bar"
                className="block p-2 pl-10 w-full font-normal text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                value={searchValue}
                onChange={searchChangeHandler}
            />
            {focus && searchValue !== "" && (
                <div
                    className={`absolute mt-2 right-0 left-0 z-10 text-base font-medium list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 max-h-[60vh] overflow-y-auto`}
                >
                    {transition.state === "submitting" ? (
                        <ul className="py-1">
                            <div className="text-center py-3">
                                <svg
                                    role="status"
                                    className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                            </div>
                        </ul>
                    ) : data?.pokemons?.length ? (
                        <ul className="py-1">
                            {data?.pokemons?.map(
                                (pokemon: { id: number; name: string }) => (
                                    <li key={pokemon.id}>
                                        <Link
                                            to={`/pokemons/${pokemon.id}`}
                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        >
                                            {capitalizeName(pokemon.name)}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    ) : null}
                </div>
            )}
        </Form>
    );
}
