import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PointsPage from "./PointsPage";
import { useProfile } from "../utilities/profile";


// Mocking the modules used in the PointsPage component
vi.mock("../utilities/firebase", () => ({
  useDbData: vi.fn(() => [[], null]),
}));

vi.mock("../utilities/profile");
        useProfile.mockReturnValue([
          { user: { uid: "hfejefefkeklefn" }, isAdmin: false },
        ]);

describe("PointsPage Component", () => {
  test("renders loading state when profile is still loading", () => {
    render(<PointsPage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders loading state when data is still loading", () => {
    render(<PointsPage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders PointsPage component with data", async () => {
    vi.mock("../utilities/firebase", () => ({
      useDbData: vi.fn(() => [
        [{ "games-attended": ["gameId1", "gameId2"] }, null],
        { gameId1: { date: "2023-11-15", point: 10 }, gameId2: { date: "2023-11-14", point: 15 } },
      ]),
    }));

    vi.mock("../utilities/profile");
        useProfile.mockReturnValue([
          { user: { uid: "hfejefefkeklefn" }, isAdmin: false },
        ]);

    render(<PointsPage />);

    // Assert that PointsPage renders without errors
    await waitFor(() => {
      expect(screen.getByTestId("total-points").textContent).toBe("25 Points");
      expect(screen.getByTestId("chart")).toBeInTheDocument();
      expect(screen.getByTestId("toggle-chart-button")).toBeInTheDocument();
      expect(screen.getByLabelText("Toggle Chart")).toBeInTheDocument();
    });
  });

  test("toggles chart visibility when the 'Toggle Chart' button is clicked", async () => {
    vi.mock("../utilities/firebase", () => ({
      useDbData: vi.fn(() => [
        [{ "games-attended": ["gameId1", "gameId2"] }, null],
        { gameId1: { date: "2023-11-15", point: 10 }, gameId2: { date: "2023-11-14", point: 15 } },
      ]),
    }));

    vi.mock("../utilities/profile", () => ({
      useProfile: vi.fn(() => [
        { user: { uid: "userId" } },
        false,
        null,
      ]),
    }));

    render(<PointsPage />);

    // Assert that chart is initially visible
    await waitFor(() => {
      expect(screen.getByTestId("chart")).toBeVisible();
    });

    // Simulate a click on the 'Toggle Chart' button
    fireEvent.click(screen.getByTestId("toggle-chart-button"));

    // Assert that chart is now hidden
    await waitFor(() => {
      expect(screen.getByTestId("chart")).not.toBeVisible();
    });
  });

  // Add more test cases as needed
});
