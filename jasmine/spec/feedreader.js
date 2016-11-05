/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         //run loop through all feed entries to see whether it has a not empty url
        it('has a URL defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            })
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         //run loop through all feed entries to see whether it has a not empty name
        it('has a name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        });
    });


    /* TODO: Write a new test suite named "The menu" */

    //define the second test suite about the slide-menu
    describe('The menu', function() {


        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         //define menuHidden to see does body has 'menu-hidden' class or not
        var menuHidden = $('body').hasClass('menu-hidden');

        //check if menu is hidden by default
        it('menu element is hidden by default', function() {
            expect(menuHidden).toEqual(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

         //check if the menu will toggle when clicked




        it('the menu changes visibility when the menu ic clicked', function() {

            //define menuIcon to get the menu icon element
            var menuIcon = $('.menu-icon-link');

            //click the icon to check the menu is not hidden or not
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(false);

            //click the icon to check the menu is hidden or not
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */

    //the third test suit to check if there is at least one item in the .feed container
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         //wait until loadFeed is done
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        //check if there is at least 1 item within the .feed container
        it('there is at least 1 item within the .feed container', function() {
            var feedEntryNumber = $('.entry').length;
            expect(feedEntryNumber).toBeGreaterThan(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection"*/

    //the fourth test suite to check whether a new feed is loaded by the loadFeed function
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         //two variables representing the content before and after invoking the loadFeed function
        var initialFeed;
        var changedFeed;

        //define initialFeed
        beforeEach(function(done) {
            loadFeed(1, function() {
                initialFeed = $('.feed').html();
                loadFeed(2, function() {
                    done();
                });
            });
        });

        //afterEach to reload initialFeed
        afterEach(function() {
            loadFeed(0);
        });

        //check to see if the content actually changes
        it('the content actually changes by the loadFeed function', function() {
            expect(initialFeed).toBeDefined()
            changedFeed = $('.feed').html();
            expect(changedFeed).toBeDefined()
            expect(changedFeed).not.toEqual(initialFeed);
        });
    });

}());
