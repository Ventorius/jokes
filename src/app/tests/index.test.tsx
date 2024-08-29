import React from "react";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { SearchBox } from "../../components/search-box";
import { useRouter } from "next/navigation";
import { JokeResponse } from "@/data-layer/fetch-jokes";

import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockJokes: JokeResponse = {
  results: [
    { id: "1", joke: "Test joke 1" },
    { id: "2", joke: "Test joke 2" },
  ],
  current_page: 1,
  limit: 10,
  next_page: 2,
  previous_page: 1,
};

describe("SearchBox", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it("renders correctly", () => {
    render(<SearchBox jokes={mockJokes} setSelectedJoke={jest.fn()} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("updates input value when text is entered", () => {
    render(<SearchBox jokes={mockJokes} setSelectedJoke={jest.fn()} />);
    const input = screen.getByRole("textbox");

    act(() => {
      fireEvent.change(input, { target: { value: "test joke" } });
    });

    expect(input).toHaveValue("test joke");
  });

  it("closes dropdown when clicking outside", async () => {
    render(<SearchBox jokes={mockJokes} setSelectedJoke={jest.fn()} />);

    act(() => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "Test joke" },
      });
    });

    // Wait for the debounce delay
    await new Promise((resolve) => setTimeout(resolve, 350));

    expect(screen.getByText("Test joke 1")).toBeInTheDocument();

    act(() => {
      fireEvent.mouseDown(document.body);
    });

    expect(screen.queryByText("Test joke 1")).not.toBeInTheDocument();
  });

  it("closes dropdown when pressing Escape key", async () => {
    render(<SearchBox jokes={mockJokes} setSelectedJoke={jest.fn()} />);

    act(() => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "test" },
      });
    });

    // Wait for the debounce delay
    await new Promise((resolve) => setTimeout(resolve, 350));

    expect(screen.getByText("Test joke 1")).toBeInTheDocument();

    act(() => {
      fireEvent.keyDown(screen.getByRole("textbox"), {
        key: "Escape",
        code: "Escape",
      });
    });

    // Ensure dropdown is closed
    expect(screen.queryByText("Test joke 1")).not.toBeInTheDocument();
  });
});
