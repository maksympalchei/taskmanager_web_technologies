import React from 'react';
import { mount } from 'cypress/react18';
import CustomCalendar from '..//Calendar/Calendar';

describe('CustomCalendar Component', () => {
  beforeEach(() => {
    mount(<CustomCalendar />);
  });

  it('renders correctly and displays the current date', () => {
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    cy.contains(today).should('exist');
  });

  it('updates the displayed date when a new date is selected', () => {
    cy.get('.react-calendar__tile').first().click();
    const selectedDate = new Date();
    selectedDate.setDate(selectedDate.getDate() + 1);
    const displayedDate = selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    cy.get('.react-calendar__tile').contains(selectedDate.getDate()).click();
    cy.contains(displayedDate).should('exist');
  });
});
