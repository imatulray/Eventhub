import { Locator } from '@playwright/test';

export interface IEventsPage {
  goToEventsPage(): Promise<void>;
  searchEvents(keyword: string): Promise<void>;
  selectCategory(category: string): Promise<void>;
  selectCity(city: string): Promise<void>;
  clickAddNewEvent(): Promise<void>;
  bookEvent(options: { tickets?: number; fullName: string; email: string; phone: string; }): Promise<Locator>;
}