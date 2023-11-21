import { describe, expect, it, vi } from "vitest";
import { useDbData, useAuthState, useDbUpdate } from "../utilities/firebase";
import { useProfile } from "../utilities/profile";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

vi.mock("../utilities/firebase");
vi.mock("../utilities/profile");

const RD = {
	admins: {
		hfehefhkhefkjefh: true,
	},
	events: {
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
		testtesttesttest: {
			displayName: "Test User 2",
			email: "tester2@u.northwestern.edu",
			photoURL:
				"https://lh3.googleusercontent.com/a/ACg8ocJHA367jsm-sV5pY67f_Q3rxnt74sHAOBSP8zeGxEHq=s96-c",
			points: 0,
			"games-attended": ["2023-08-31-WSOC-BostonUniversity"],
		},
	},
};

const mockUseDbData = (path, isAdmin) => {
	if (/events/.test(path)) return [RD.events, null];
	if (/users/.test(path))
		return [
			isAdmin ? RD.users.hfejefefkeklefn : RD.users.testtesttesttest,
			null,
		];
	if (/admins/.test(path))
		return [
			isAdmin ? RD.admins.hfehefhkhefkjefh : RD.admins.testtesttesttest,
			null,
		];
};

describe("Games Card", () => {
	describe("When a admin user that has stored data in the database logs in", () => {
		it("Edit button should be displayed in the game card", async () => {
			const isAdmin = true;
			useDbData.mockImplementation((path) => mockUseDbData(path, isAdmin));
			useAuthState.mockReturnValue([RD.users.hfejefefkeklefn]);
			useProfile.mockReturnValue([
				{ user: { uid: "hfejefefkeklefn" }, isAdmin: isAdmin },
			]);
			useDbUpdate.mockReturnValue([null, null]);
			render(<App />);
			const adminEditButton = screen.getAllByTestId("admin-edit-button");
			expect(adminEditButton).toBeDefined();
		});
	});
});

describe("Games Card", () => {
	describe("When a non-admin user that has stored data in the database logs in", () => {
		it("Edit button should not be displayed in the game card", async () => {
			const isAdmin = false;
			useDbData.mockImplementation((path) => mockUseDbData(path, isAdmin));
			useAuthState.mockReturnValue([RD.users.testtesttesttest]);
			useProfile.mockReturnValue([
				{ user: { uid: "testtesttesttest" }, isAdmin: false },
			]);
			useDbUpdate.mockReturnValue([null, null]);
			render(<App />);
			const adminEditButton = screen.queryByTestId("admin-edit-button");
			expect(adminEditButton).toBeNull();
		});
	});
});
