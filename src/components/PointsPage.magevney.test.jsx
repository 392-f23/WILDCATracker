import { it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useDbData, useDbUpdate, useAuthState } from "../utilities/firebase";
import { useProfile } from "../utilities/profile";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import PointsPage from "./PointsPage";

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

describe("Test chart displays properly", () => {
    it("Test that chart is not visible when it is toggled off", () => {
        // Mock Firebase
        vi.mock('../utilities/firebase');
        useAuthState.mockReturnValue([{ displayName: "Test User" }]);
        useDbUpdate.mockReturnValue([null, null]);
        useDbData.mockImplementation((path) => {
          if (path == "/events/") return [mockSchedule.events, ""];
          if (path == "/admins/") return [mockSchedule.admins, ""];
          if (path == "/users/") return [mockSchedule.users, ""];
          if (path == "/users/hfejefefkeklefn")
            return [mockSchedule.users.hfejefefkeklefn, ""];
        });
        vi.mock("../utilities/profile");
        useProfile.mockReturnValue([
          { user: { uid: "hfejefefkeklefn" }, isAdmin: false },
        ]);
        render(<BrowserRouter><PointsPage /> </BrowserRouter>);
        const chart = screen.queryByTestId("chart");
        expect(chart).toBeNull();
    });
    it("Test that chart is visible when it is toggled on", () => {
        // Mock Firebase
        vi.mock('../utilities/firebase');
        useAuthState.mockReturnValue([{ displayName: "Test User" }]);
        useDbUpdate.mockReturnValue([null, null]);
        useDbData.mockImplementation((path) => {
          if (path == "/events/") return [mockSchedule.events, ""];
          if (path == "/admins/") return [mockSchedule.admins, ""];
          if (path == "/users/") return [mockSchedule.users, ""];
          if (path == "/users/hfejefefkeklefn")
            return [mockSchedule.users.hfejefefkeklefn, ""];
        });
        vi.mock("../utilities/profile");
        useProfile.mockReturnValue([
          { user: { uid: "hfejefefkeklefn" }, isAdmin: false },
        ]);
        const { getByTestId } = render(<BrowserRouter><PointsPage /> </BrowserRouter>);

        const button = getByTestId('toggle-chart-button');
        fireEvent.click(button);
        const chart = getByTestId('chart');
        expect(chart).to.exist;
    });

});