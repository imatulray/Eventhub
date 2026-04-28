import { test, expect } from '../../utils/fixtures';
import 'dotenv/config';

const VALID_EMAIL    = process.env.LOGIN_EMAIL    as string;
const VALID_PASSWORD = process.env.LOGIN_PASSWORD as string;

test.describe('Events Page', () => {
    
test("Event Page Test", async({loginPage, eventsPage}) => {
        await loginPage.login(VALID_EMAIL,VALID_PASSWORD);
        await eventsPage.goToEventsPage();
        await eventsPage.clickAddNewEvent();
        const eventName = await eventsPage.createEvent();
        await expect(eventsPage.eventCreatedMessage).toBeVisible();
        await eventsPage.goToEventsPage();
        await eventsPage.searchEvents(eventName);
        await expect(eventsPage.page.getByRole('heading', { name: eventName, level: 3 })).toBeVisible();
    })


test('Search Events - Enter keyword in search box -> Verify filtered results', async ({ loginPage, eventsPage }) => {
        await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
        await eventsPage.goToEventsPage();

        const keyword = 'Playwright';
        await eventsPage.searchEvents(keyword);

        // Expect at least one matching event heading contains the keyword
        await expect(eventsPage.page.getByRole('heading', { name: /Playwright/i, level: 3 })).toBeVisible();
    })

test('Filter by Category - Conference -> Verify events filtered', async ({ loginPage, eventsPage }) => {
        await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
        await eventsPage.goToEventsPage();

        const category = ['Conference','Concert','Sports'];
        for (const cat of category) {
        await eventsPage.selectCategory(cat);
        await eventsPage.page.waitForLoadState('domcontentloaded');

        // If there are matching articles, ensure one is visible; otherwise confirm the category selection applied
        const resultsCount = await eventsPage.page.getByTestId('event-card').count();
        if (resultsCount > 0) {
            await expect(eventsPage.page.getByTestId('event-card').first()).toBeVisible();
        } else {
            await expect(eventsPage.allCategories).toHaveValue(cat);
        }
    }
    })

test('Filter by City - validate multiple cities', async ({ loginPage, eventsPage }) => {
        await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
        await eventsPage.goToEventsPage();

        const cities = ['Mumbai', 'Hyderabad'];
        for (const city of cities) {
            await eventsPage.selectCity(city);
            await eventsPage.page.waitForLoadState('networkidle');

            const resultsCount = await eventsPage.page.locator('article', { hasText: city }).count();
            if (resultsCount > 0) {
                await expect(eventsPage.page.locator('article', { hasText: city }).first()).toBeVisible();
            } else {
                await expect(eventsPage.allCities).toHaveValue(city);
            }
        }
    })

test('Book an Event — Click Book Now → Verify booking confirmation', async ({ loginPage, eventsPage }) => {
        await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
        // Navigate directly to a known event details page for booking
        await eventsPage.page.goto('https://eventhub.rahulshettyacademy.com/events/1');

        const confirmation = await eventsPage.bookEvent({
            tickets: 1,
            fullName: 'Test User',
            email: VALID_EMAIL,
            phone: '+919876543210'
        });

        await expect(confirmation).toBeVisible();
        // verify key booking details are shown
        await expect(eventsPage.page.getByText('Booking Ref')).toBeVisible();
        await expect(eventsPage.page.getByText('Test User')).toBeVisible();
    })
});