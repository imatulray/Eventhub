
import { EventsPage } from '../../pages/EventsPage';
import { loginTest as test } from '../../utils/fixtures';
import 'dotenv/config';

test.describe('Events Page', () => {
    let eventsPage: EventsPage;


    test("Event Page Test", async({loginPage, page}) => {
        eventsPage = new EventsPage(page);






    })



});