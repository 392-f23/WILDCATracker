import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for matchers like toBeInTheDocument
import userEvent from "@testing-library/user-event"; // for simulating user interactions
import GamesList from "./GamesList";

// Mock the useDbData and useProfile functions
jest.mock("../utilities/firebase", () => ({
  useDbData: jest.fn(),
}));

jest.mock("../utilities/profile", () => ({
  useProfile: jest.fn(),
}));

// Define a mock user and games data
const mockUser = {
  "games-attended": ["game1", "game2"],
  user: {
    uid: "user123",
  },
};

const mockGames = {
  game1: {
    id: "game1",
    name: "Football Game",
    sport: "Football",
    gender: "Men",
    date: "2023-11-17",
  },
  game2: {
    id: "game2",
    name: "Volleyball Game",
    sport: "Volleyball",
    gender: "Women",
    date: "2023-11-18",
  },
};

describe("GamesList Component", () => {
  beforeEach(() => {
    // Mock the useProfile function to return the mock user
    jest
      .spyOn(require("../utilities/profile"), "useProfile")
      .mockReturnValue([mockUser, false, null]);

    // Mock the useDbData function to return the mock user data
    jest
      .spyOn(require("../utilities/firebase"), "useDbData")
      .mockReturnValue([mockUser, null]);
  });

  it("renders the component with the default filters", () => {
    render(<GamesList games={mockGames} />);

    // Ensure the component renders without errors
    expect(screen.getByText("Loading..")).toBeInTheDocument();
  });

  it("renders the component with the updated filters", () => {
    render(<GamesList games={mockGames} />);

    // Wait for the component to finish loading
    expect(screen.getByText("Loading..")).toBeInTheDocument();

    // Select filter options
    const sportFilterDropdown = screen.getByText("Sport");
    userEvent.click(sportFilterDropdown);
    const footballOption = screen.getByText("Football");
    userEvent.click(footballOption);

    const genderFilterDropdown = screen.getByText("Gender");
    userEvent.click(genderFilterDropdown);
    const menOption = screen.getByText("Men");
    userEvent.click(menOption);

    const timeFilterDropdown = screen.getByText("Time");
    userEvent.click(timeFilterDropdown);
    const todayOption = screen.getByText("Today");
    userEvent.click(todayOption);

    // Check if the selected filters are applied
    expect(screen.getByText("Football Game")).toBeInTheDocument();
    expect(screen.queryByText("Volleyball Game")).not.toBeInTheDocument();
  });
});
