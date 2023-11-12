import { describe, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import GamesList from "./GamesList";

const mockGames = {
  "game-1": { eventKey: "WSOC" },
  "game-2": { eventKey: "MSOC" }
};

vi.mock("../utilities/firebase", () => ({
    useDbData: vi.fn(() => [{ "games-attended": ["game-1"] }, false, null]),
    useDbUpdate: vi.fn(() => [vi.fn(), { loading: false, error: null }]), 
  }));
  
  vi.mock("../utilities/profile", () => ({
    useProfile: vi.fn(() => [{ user: { uid: 'user-id-123' } }, false, null]),
  }));


describe('GamesList Component', () => {
  it('should show only female games when "Women" is selected', async () => {
    render(<GamesList games={mockGames} />);

    fireEvent.click(screen.getByText(/Gender/i)); 
    fireEvent.click(screen.getByTestId('women-dropdown-item'));

    const displayedGames = screen.getAllByTestId("game-card");
    displayedGames.forEach(gameCard => {
      expect(gameCard.textContent).toMatch(/Women's Soccer/); 
    });

    const maleGames = screen.queryByText(/Men's Soccer/);
    expect(maleGames).not.toBeInTheDocument();
  });
});
