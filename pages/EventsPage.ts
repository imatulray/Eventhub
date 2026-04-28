import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { IEventsPage } from './interfaces/EventsPage.types';


export class EventsPage extends BasePage implements IEventsPage {
  readonly page: Page;
  readonly eventsLink: Locator;
  readonly addNewEventBtn: Locator;
  /*----------------Add Event Form Locators-------------------*/
  readonly eventTitleName:  Locator;
  readonly eventDescription: Locator;
  readonly eventCategory: Locator;
  readonly eventDateAndTime: Locator;
  readonly eventCity: Locator;
  readonly eventVenue: Locator;
  readonly eventPrice: Locator;
  readonly eventSeats: Locator;
  readonly eventImageURL: Locator;
  readonly addEventBtn: Locator;
  readonly eventCreatedMessage: Locator;
  readonly searchEvent: Locator;
  readonly allCategories: Locator;
  readonly allCities: Locator;
  readonly ticketPlusBtn: Locator;
  readonly ticketMinusBtn: Locator;
  readonly fullNameInput: Locator;
  readonly customerEmailInput: Locator;
  readonly phoneInput: Locator;
  readonly confirmBookingBtn: Locator;
  readonly bookingConfirmationHeading: Locator;


  constructor(page: Page){
    super(page);
    this.page = page;
    this.eventsLink = page.getByTestId("nav-events");
    this.addNewEventBtn = page.getByRole('button', { name: 'Add New Event' });
    
    /*----------------Add Event Form Locators-------------------*/
    this.eventTitleName = page.getByTestId('event-title-input');
    this.eventDescription = page.getByPlaceholder('Describe the event…');
    this.eventCategory = page.locator('#category');
    this.eventDateAndTime = page.getByLabel('Event Date & Time*');
    this.eventCity = page.locator('#city');
    this.eventVenue = page.getByRole('textbox', { name: 'Venue*' });
    this.eventPrice = page.getByRole('spinbutton', { name: 'Price ($)' });
    this.eventSeats = page.getByRole('spinbutton', { name: 'Total Seats*' });
    this.eventImageURL = page.getByRole('textbox', { name: 'Image URL (optional)' });
    this.addEventBtn = page.getByRole('button', { name: 'Add Event' });
    this.eventCreatedMessage = page.getByText('Event created!');
    this.searchEvent = page.getByRole('textbox', { name: 'Search events, venues…' });
    this.allCategories = page.getByRole('combobox').first();
    this.allCities = page.getByRole('combobox').last();
    this.ticketPlusBtn = page.getByRole('button', { name: '+' }).first();
    this.ticketMinusBtn = page.getByRole('button', { name: '−' }).first();
    this.fullNameInput = page.getByRole('textbox', { name: 'Full Name*' });
    this.customerEmailInput = page.getByTestId('customer-email');
    this.phoneInput = page.getByRole('textbox', { name: 'Phone Number*' });
    this.confirmBookingBtn = page.getByRole('button', { name: 'Confirm Booking' });
    this.bookingConfirmationHeading = page.getByRole('heading', { name: /Booking Confirmed/i });
}

async createEvent(){
    await this.eventTitleName.fill('Playwright Conference');
    const eventName = await this.eventTitleName.inputValue();
    await this.eventDescription.fill('Join us for a day of learning and networking at the Playwright Conference!');
    await this.eventCategory.selectOption('Conference');
    await this.eventDateAndTime.fill('2026-12-15T09:00');
    await this.eventCity.fill('New York');
    await this.eventVenue.fill('Javits Center');
    await this.eventPrice.fill('199');
    await this.eventSeats.fill('500');
    await this.eventImageURL.fill('https://example.com/playwright-conference.jpg');
    await this.addEventBtn.click();
    return eventName;

}

async goToEventsPage(){
  await this.eventsLink.click();
}

async clickAddNewEvent(){
  await this.addNewEventBtn.click();
}

async searchEvents(keyword: string){
  await this.searchEvent.fill(keyword);
}

async selectCategory(category: string){
  await this.allCategories.selectOption(category);
}

async selectCity(city: string){
  await this.allCities.selectOption(city);
}

async bookEvent({ tickets = 1, fullName, email, phone }: { tickets?: number; fullName: string; email: string; phone: string; }){
  // ensure page is loaded and booking form inputs are visible
  await this.page.waitForLoadState('networkidle');

  // adjust tickets (default on page is 1)
  if (tickets > 1) {
    for (let i = 1; i < tickets; i++) {
      await this.ticketPlusBtn.click();
    }
  }

  // wait for inputs to be visible before interacting
  await this.fullNameInput.waitFor({ state: 'visible', timeout: 15000 });
  await this.fullNameInput.fill(fullName);

  // try test id first (some snapshots show customer-email test id), fall back to labelled input
  try {
    await this.customerEmailInput.waitFor({ state: 'visible', timeout: 3000 });
    await this.customerEmailInput.fill(email);
  } catch (err) {
    await this.page.getByRole('textbox', { name: 'Email*' }).fill(email);
  }

  await this.phoneInput.fill(phone);
  await this.confirmBookingBtn.click();

  await this.bookingConfirmationHeading.waitFor({ state: 'visible', timeout: 10000 });
  return this.bookingConfirmationHeading;
}







}