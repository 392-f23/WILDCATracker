import { describe, expect, it, vi } from "vitest";
import { useDbData, useAuthState, useDbUpdate } from "../utilities/firebase";
import { useProfile } from "../utilities/profile";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";

vi.mock("../utilities/firebase");
vi.mock("../utilities/profile");

const RB = {
  events: {
    "2023-09-01-WVB-IllinoisState": {
      date: 1693544400000,
      eventKey: "WVB",
      imgURL:
        "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/nusports.com/images/logos/Illinois_State.png",
      location: "Welsh-Ryan Arena",
      locationURL: "https://nusports.com/facilities/welsh-ryan-arena/12",
      opponent: "Illinois State",
      point: 4,
      time: " 5 p.m. CT",
    },
    "2023-08-31-WSOC-BostonUniversity": {
      date: 1693699200000,
      eventKey: "WSOC",
      imgURL:
        "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/nusports.com/images/logos/Boston-U.png",
      location: "Lanny and Sharon Martin Stadium (Soccer/Lacrosse)",
      locationURL:
        "https://nusports.com/facilities/lanny-and-sharon-martin-stadium-soccer-lacrosse-/5",
      opponent: "Boston University",
      point: 10,
      time: " 7 p.m. CT",
    },
    "2023-11-01-MBB-McKendree(Exhibition)": {
      date: 1698814800000,
      eventKey: "MBB",
      imgURL:
        "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/nusports.com/images/logos/McKendree.png",
      location: "Welsh-Ryan Arena",
      locationURL: "https://nusports.com/facilities/welsh-ryan-arena/12",
      opponent: "McKendree (Exhibition)",
      point: 3,
      time: " 8 p.m. CT",
    },
    "2023-11-02-WBB-Lewis(Exhibition)": {
      date: 1698901200000,
      eventKey: "WBB",
      imgURL:
        "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/nusports.com/images/logos/Lewis_2023.png",
      location: "Welsh-Ryan Arena",
      locationURL: "https://nusports.com/facilities/welsh-ryan-arena/12",
      opponent: "Lewis (Exhibition)",
      point: 5,
      time: " TBA",
    },
  },
  users: {
    hfejefefkeklefn: {
      displayName: "Test User",
      email: "tester@u.northwestern.edu",
      photoURL:
        "https://lh3.googleusercontent.com/a/ACg8ocJHA367jsm-sV5pY67f_Q3rxnt74sHAOBSP8zeGxEHq=s96-c",
      points: 0,
      "games-attended": ["2023-08-31-WSOC-BostonUniversity"],
    },
  },
  admins: {
    hfehefhkhefkjefh: true,
  },
};

const rb_emulator_get = (path) => {
  if (/events/.test(path)) return [RB.events, null];
  if (/users/.test(path)) return [RB.users.hfejefefkeklefn, null];
  if (/admins/.test(path)) return [RB.admins.hfehefhkhefkjefh, null];
};

describe("Sport Type Filtering", () => {
  describe("When Basketball is selected", () => {
    it("Only displays events that contains Basketball", async () => {
      useDbData.mockImplementation((path) => rb_emulator_get(path));
      useAuthState.mockReturnValue([RB.users.hfejefefkeklefn]);
      useProfile.mockReturnValue([
        { user: { uid: "hfejefefkeklefn" }, isAdmin: false },
      ]);
      useDbUpdate.mockReturnValue([null, null]);
      const user = userEvent.setup();
      const app = render(<App />);

      // Click on the 'Sport' filter button
      const sportFilterButton = screen.getByText(/Sport/i);
      expect(sportFilterButton).toBeInTheDocument();
      user.click(sportFilterButton);

      // Select the Basketball option
      const basketballOption = await screen.findByRole("button", {
        name: /Basketball/i,
      });
      expect(basketballOption).toBeInTheDocument();
      await user.click(basketballOption);

      // Selects CSS classes named card-title
      const cardTitlesOnDisplay = app.container.querySelectorAll(".card-title");

      // Assert card titles contain Basketball
      Array.from(cardTitlesOnDisplay).forEach((node) =>
        //expect(node.textContent).toContain("Voleyball") //-- TESTED results in an assertion error as expected
        expect(node.textContent).toContain("Basketball")
      );
    });
  });
});
