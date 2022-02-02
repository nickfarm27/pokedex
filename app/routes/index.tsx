import React from "react";
import { ActionFunction } from "remix";
import { searchPokemon } from "~/actions/searchPokemon";
import NavBar from "~/components/NavBar";

export const action: ActionFunction = searchPokemon

export default function Index() {
  return (
    <>
      <NavBar />
    </>
  );
}
