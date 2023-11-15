import { fireEvent, render, createRef, screen } from "@testing-library/react";
import GameEditor from './GameEditor';
import { BrowserRouter as Router } from 'react-router-dom';

describe('GameEditor component', () => {
  const mockGameData = {
    eventKey: 'WSOC',
    opponent: 'Opponent Team',
    date: '2023-11-15',
    time: '7:00 p.m.',
    location: 'Stadium',
    point: '3',
  };

  it('renders GameEditor component with validation messages', async () => {
    render(
        <Router>
        <GameEditor id="1" game={mockGameData} />
      </Router>);

    // Update input fields with invalid values
    const inputEventKey = screen.getByLabelText("Event Key", { exact: false });
    await fireEvent.change(inputEventKey, { target: { value: 'InvalidKey' } });

    const inputDate = screen.getByLabelText("Date", { exact: false });
    await fireEvent.change(inputDate, { target: { value: 'InvalidDate' } });

    const inputTime = screen.getByLabelText("time", { exact: false });
    await fireEvent.change(inputTime, { target: { value: 'InvalidTime' } });

    const inputPoints = screen.getByLabelText("Points", { exact: false });
    await fireEvent.change(inputPoints, { target: { value: 'InvalidPoints' } });

    // Check if validation messages are displayed
    assert.equal(screen.getByText('must be one of the following event keys: WSOC, MSOC, WVB, FB, FHOCKEY, WFENC, MSWIM, MBB, or WBB').textContent, 'must be one of the following event keys: WSOC, MSOC, WVB, FB, FHOCKEY, WFENC, MSWIM, MBB, or WBB');
    assert.equal(screen.getByText('must be in the form of YYYY-MM-DD, e.g., 2023-10-16').textContent, 'must be in the form of YYYY-MM-DD, e.g., 2023-10-16');
    assert.equal(screen.getByText('must follow the structure #:## a.m. (or p.m.), e.g., 7:00 p.m.').textContent, 'must follow the structure #:## a.m. (or p.m.), e.g., 7:00 p.m.');
    assert.equal(screen.getByText('must be a number').textContent, 'must be a number');
    assert.isTrue(screen.getByText('Submit').disabled);
  });
});