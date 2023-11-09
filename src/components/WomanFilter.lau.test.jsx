import { describe, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import GamesList from "./GamesList";

// ... your mockGames and test code ...


// Define your test games including both male and female event keys
const mockGames = {
  "game-1": { eventKey: "WSOC", /* ...other properties */ },
  "game-2": { eventKey: "MSOC", /* ...other properties */ },
  // ... more games
};

// Mock the hooks using vitest
vi.mock("../utilities/firebase", () => ({
    useDbData: vi.fn(() => [{ "games-attended": ["game-1"] }, false, null]),
    useDbUpdate: vi.fn(() => [vi.fn(), { loading: false, error: null }]), // Mock `useDbUpdate` here
    // ... any other methods you need to mock
  }));
  
  vi.mock("../utilities/profile", () => ({
    useProfile: vi.fn(() => [{ user: { uid: 'user-id-123' } }, false, null]),
  }));

// ...rest of your test code...

describe('GamesList Component', () => {
  it('should show only female games when "Women" is selected', async () => {
    // Now you don't need to wait for the "Loading.." text to disappear
    // because your hooks are mocked to return data immediately
    render(<GamesList games={mockGames} />);

    // Interact with the gender dropdown to apply the "Women" filter
    fireEvent.click(screen.getByText(/Gender/i)); // Open the gender dropdown
    fireEvent.click(screen.getByTestId('women-dropdown-item'));


    // Check if the displayed games are filtered correctly
    const displayedGames = screen.getAllByTestId("game-card");
    displayedGames.forEach(gameCard => {
      expect(gameCard.textContent).toMatch(/Women's Soccer/); // Assuming your GameCard component displays the eventKey
    });

    // Verify no male games are displayed
    const maleGames = screen.queryByText(/Men's Soccer/);
    expect(maleGames).not.toBeInTheDocument();
  });
});
