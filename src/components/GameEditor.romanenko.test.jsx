import { it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import GameEditor from "./GameEditor";
import { useDbData, useDbUpdate, useAuthState } from "../utilities/firebase";
import { useProfile } from "../utilities/profile";
import { BrowserRouter} from "react-router-dom";

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
			"location": "Lanny and Sharon Martin Stadium",
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

describe("Form Validation Displays Intended Warning Messages", () => {
	it("Test Various Inputs", async () => {
		render(<BrowserRouter><GameEditor id={"2023-08-31-WSOC-BostonUniversity"} game ={mockSchedule.events['2023-08-31-WSOC-BostonUniversity']} /> </BrowserRouter>);
	    
        // Check Each Field Exists
        expect(screen.getByText(/Event Key/)).toBeDefined();
        expect(screen.getByText(/Opponent/)).toBeDefined();
        expect(screen.getByText(/Date/)).toBeDefined();
        expect(screen.getByText(/Time/)).toBeDefined();
        expect(screen.getByText(/Location/)).toBeDefined();
        expect(screen.getByText(/Points/)).toBeDefined();

        // Check Data Fields are Populated
        expect(() => screen.getByText(/must be one of the following event keys: WSOC, MSOC, WVB, FB, FHOCKEY, WFENC, MSWIM, MBB, or WBB/)).toThrow();
        expect(() => screen.getByText(/must be in the form of YYYY-MM-DD, e.g., 2023-10-16/)).toThrow();
        expect(() => screen.getByText(/must follow the structure #:## a.m. (or p.m.), e.g., 7:00 p.m./)).toThrow();
        expect(() => screen.getByText(/must be a number/)).toThrow();
        

        // Points
        // Change Value - number - no validation message
        const input = screen.getByLabelText('points', {exact:false})
        fireEvent.change(input, {target: {value: '3'}})
        expect(input.value).toBe('3')
        expect(() => screen.getByText(/must be a number/)).toThrow();

        //  Change Value - letter - Validation message
        fireEvent.change(input, {target: {value: 'a'}})
        expect(screen.getByText(/must be a number/)).toBeDefined();

        //  Change Value - empty string - Validation message
        fireEvent.change(input, {target: {value: ''}})
        expect(screen.getByText(/must be a number/)).toBeDefined();


        // EventKey
        // Change Value - MBB - no validation message
        const input1 = screen.getByLabelText("Event Key", {exact:false})
        fireEvent.change(input1, {target: {value: 'MBB'}})
        expect(input1.value).toBe('MBB')
        expect(() => screen.getByText(/must be one of the following event keys: WSOC, MSOC, WVB, FB, FHOCKEY, WFENC, MSWIM, MBB, or WBB/)).toThrow();

        //  Change Value - MB - Validation message
        fireEvent.change(input1, {target: {value: 'MB'}})
        expect(screen.getByText(/must be one of the following event keys: WSOC, MSOC, WVB, FB, FHOCKEY, WFENC, MSWIM, MBB, or WBB/)).toBeDefined();

        //  Change Value - empty string - Validation message
        fireEvent.change(input1, {target: {value: ''}})
        expect(screen.getByText(/must be one of the following event keys: WSOC, MSOC, WVB, FB, FHOCKEY, WFENC, MSWIM, MBB, or WBB/)).toBeDefined();
        

        // Date
        // Change Value - 2023-10-16 - no validation message
        const input2 = screen.getByLabelText("date", {exact:false})
        fireEvent.change(input2, {target: {value: '2023-10-16'}})
        expect(input2.value).toBe('2023-10-16')
        expect(() => screen.getByText(/must be in the form of YYYY-MM-DD, e.g., 2023-10-16/)).toThrow();

        //  Change Value - 10-16-2023 - Validation message
        fireEvent.change(input2, {target: {value: '10-16-2023'}});
        expect(screen.getByText(/must be in the form of YYYY-MM-DD, e.g., 2023-10-16/)).toBeDefined();


        // Date
        // Change Value - 7:00 p.m. - no validation message
        const input3 = screen.getByLabelText("time", {exact:false})
        fireEvent.change(input3, {target: {value: '7:00 p.m.'}})
        expect(input3.value).toBe('7:00 p.m.')
        expect(() => screen.getByText(/must follow the structure/)).toThrow();

        fireEvent.change(input3, {target: {value: '7 pm'}})
        expect(screen.getByText(/must follow the structure/)).toBeDefined();


	});
});