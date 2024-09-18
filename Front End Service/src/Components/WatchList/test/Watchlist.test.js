import React from "react";
import { render, screen } from "@testing-library/react";
import Watchlist from "../Watchlist";

test("renders the word 'Watchlist'", () => {
  render(
      <Watchlist />
  );
  const watchlistText = screen.getByText("Watchlist");
  expect(watchlistText).toBeInTheDocument();
});
