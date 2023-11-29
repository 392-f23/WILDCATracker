import { describe, expect, it, vi } from "vitest";
import { useDbData, useAuthState, useDbUpdate } from "../utilities/firebase";
import { useProfile } from "../utilities/profile";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";

vi.mock("../utilities/firebase");
vi.mock("../utilities/profile");

const RD = {
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
		"2024-01-05-WBB-OhioState": {
			date: 1704434400000,
			eventKey: "WBB",
			imgURL:
				"https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/nusports.com/images/logos/ohio_state_logo.png",
			location: "Welsh-Ryan Arena",
			locationURL: "https://nusports.com/facilities/welsh-ryan-arena/12",
			opponent: "Ohio State",
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
	if (/events/.test(path)) return [RD.events, null];
	if (/users/.test(path)) return [RD.users.hfejefefkeklefn, null];
	if (/admins/.test(path)) return [RD.admins.hfehefhkhefkjefh, null];
};

describe("Time Filtering", () => {
	describe("When Future is selected", () => {
		it("Only displays events that upcoming", async () => {
			useDbData.mockImplementation((path) => rb_emulator_get(path));
			useAuthState.mockReturnValue([RD.users.hfejefefkeklefn]);
			useProfile.mockReturnValue([
				{ user: { uid: "hfejefefkeklefn" }, isAdmin: false },
			]);
			useDbUpdate.mockReturnValue([null, null]);
			const user = userEvent.setup();
			const app = render(<App />);

			const timeFilterButton = screen.getByText(/Time/i);
			expect(timeFilterButton).toBeInTheDocument();
			user.click(timeFilterButton);

			const futureOption = await screen.findByRole("button", {
				name: /Future/i,
			});
			expect(futureOption).toBeInTheDocument();
			await user.click(futureOption);

			const allTimeStrs = screen.getAllByTestId("event-time-str");
			expect(allTimeStrs).toHaveLength(1);
		});
	});
});