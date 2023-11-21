import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PointsPage from "./PointsPage";

const mockPastGames = {
  "game-1": { date: "2022-01-01", point: "10" },
  "game-2": { date: "2022-02-01", point: "20" },
};
const mockFutureGames = {
  "game-3": { date: "2024-01-01", point: "30" },
  "game-4": { date: "2024-02-01", point: "40" },
};
const mockData = { ...mockPastGames, ...mockFutureGames };

vi.mock("../utilities/firebase", () => ({
  useDbData: vi.fn(() => [mockData, false, null]),
}));
vi.mock("../utilities/profile", () => ({
  useProfile: vi.fn(() => [{ user: { uid: "user-id-123" } }, false, null]),
}));

describe("PointsPage Component", () => {
  it("should show no future games when there are none", async () => {
    vi.mock("../utilities/firebase", () => ({
      useDbData: vi.fn(() => [{ ...mockPastGames }, false, null]),
    }));
    render(<PointsPage />);

    fireEvent.click(screen.getByText(/Upcoming/i));

    expect(screen.queryByTestId("game-card")).not.toBeInTheDocument();
  });

  it("should correctly display future games when they exist", async () => {
    render(<PointsPage />);

    fireEvent.click(screen.getByText(/Upcoming/i));

    const futureGameCards = screen.getAllByTestId("game-card");
    expect(futureGameCards).toHaveLength(2);
    futureGameCards.forEach((card) => {
      expect(card).toHaveTextContent(/2024/);
    });
  });
});
