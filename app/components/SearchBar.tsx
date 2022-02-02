import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useSubmit } from "remix";

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState("");
    const [focus, setFocus] = useState(false);
    const data = useActionData()
    const submit = useSubmit()
    const formRef = useRef(null)

    useEffect(() => {
        const search = setTimeout(() => {
            if (focus) {
                submit(formRef.current)
            }
        }, 1000);

        return () => {
            clearTimeout(search);
        };
    }, [searchValue, focus]);

    function searchChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value);
    }

    function toggleFocus() {
        setFocus((prevState) => !prevState);
    }

    return (
        <Form className="relative w-96 mr-0" method="post" autoComplete="off" ref={formRef}>
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
                onFocus={toggleFocus}
                onBlur={toggleFocus}
            />
            <div className="absolute right-0"><p>{data ? data.message : "Waiting..."}</p></div>
        </Form>
    );
}
