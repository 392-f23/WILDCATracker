import { it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { useDbData, useDbUpdate, useAuthState } from "../utilities/firebase";
import { useProfile } from "../utilities/profile";
import React, { useContext } from "react";

const mockSchedule = 
	{
		"admins": {
			"hfehefhkhefkjefh": true
		},
		"events": {
		  "2023-08-31-WSOC-BostonUniversity": {
			"date": 1693699200000,
			"eventKey": "WSOC",
			"imgURL": "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/nusports.com/images/logos/Boston-U.png",
			"location": "Lanny and Sharon Martin Stadium (Soccer/Lacrosse)",
			"locationURL": "https://nusports.com/facilities/lanny-and-sharon-martin-stadium-soccer-lacrosse-/5",
			"opponent": "Boston University",
			"point": 10,
			"time": " 7 p.m. CT"
		  }
		},
		"users": {	  
		  "hfejefefkeklefn": {
			"displayName": "Test User",
			"email": "tester@u.northwestern.edu",
			"photoURL": "https://lh3.googleusercontent.com/a/ACg8ocJHA367jsm-sV5pY67f_Q3rxnt74sHAOBSP8zeGxEHq=s96-c",
			"points": 0,
			"games-attended": ["2023-08-31-WSOC-BostonUniversity"]
		  }
		}
  };

describe("Signed In User Page Access", () => {
	it("Test that only signed in users can access the events/points pages", () => {
		vi.mock('../utilities/firebase');
		useAuthState.mockReturnValue([{ displayName: 'Test User' }])
		useDbUpdate.mockReturnValue([null, null]);
		useDbData.mockImplementation((path) => {
			if (path == "/events/") return [mockSchedule.events, ""]
			if (path == "/admins/") return [mockSchedule.admins, ""]
			if (path == "/users/") return [mockSchedule.users, ""]
			if (path == "/users/hfejefefkeklefn") return [mockSchedule.users.hfejefefkeklefn, ""]
		})
		vi.mock('../utilities/profile');
		useProfile.mockReturnValue([{ user: {uid: "hfejefefkeklefn"}, isAdmin: false}]);
		render(<App />);
		expect(screen.getByText(/Boston University/)).toBeDefined();
		fireEvent.click(screen.getByText("Games"));
		expect(screen.getByText(/Boston University/)).toBeDefined();
		fireEvent.click(screen.getByText("Points"));
		expect(screen.getByText(/Toggle Chart/)).toBeDefined();
	});

	it("Test that not signed in users cannot access the events/points pages", () => {
		vi.mock('../utilities/firebase');
		useAuthState.mockReturnValue([null])
		useDbUpdate.mockReturnValue([null, null]);
		useDbData.mockImplementation((path) => {
			if (path == "/events/") return [mockSchedule.events, ""]
			if (path == "/admins/") return [mockSchedule.admins, ""]
			if (path == "/users/") return [mockSchedule.users, ""]
		})
		vi.mock('../utilities/profile');
		useProfile.mockReturnValue([{ user: null, isAdmin: false}]);
		render(<App />);
		expect(() => screen.getByText(/Boston University/)).toThrow();
		expect(screen.getByText(/Sign In/)).toBeDefined();
	});
});
