import { LoaderFunction, useLoaderData } from "remix";
import NavBar from "~/components/NavBar";

export const loader: LoaderFunction = async ({ params }) => {
    return params.id;
};

export default function Pokemon() {
    const id = useLoaderData();
    return (
        <>
            <NavBar />
            Pokemon Id: {id}
        </>
    );
}
