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
  readonly searchEvent: Locator;
  readonly allCategories: Locator;
  readonly allCities: Locator;


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
    this.eventImageURL = page.getByTestId('Event Image URL');
    this.addEventBtn = page.getByRole('button', { name: 'Add Event' });
    this.searchEvent = page.getByRole('textbox', { name: 'Search events, venues…' });
    this.allCategories = page.getByRole('combobox').first();
    this.allCities = page.getByRole('combobox').last();
}

async createEvent(){
    await this.eventTitleName.fill('Playwright Conference');
    await this.eventDescription.fill('Join us for a day of learning and networking at the Playwright Conference!');
    await this.eventCategory.selectOption('Conference');
    await this.eventDateAndTime.fill('2024-12-15T09:00');
    await this.eventCity.selectOption('New York');
    await this.eventVenue.fill('Javits Center');
    await this.eventPrice.fill('199');
    await this.eventSeats.fill('500');
    await this.eventImageURL.fill('https://example.com/playwright-conference.jpg');
    await this.addEventBtn.click();

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





}