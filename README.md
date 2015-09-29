SEO Checker
============

This tool enables the user check their website for key indicators of good SEO. Google provides best practices for websites to ensure they are ranking well in Google Searches. This can be found here:

 This tool checks your webiste for the following:

1. Global backlinks using the SEOMoz API

2. Valid status codes for all href tags located on your website

3. 404 pages are displayed and linked

4. User can create a login (or not)

5. User's websites are only visible by logged in user (coming soon)



Technologies used:
------------------
The app is built using Express, MongoDB for the database and structured schema creation facilitated by Mongoose. I used the Moz API for backlink count and Cheerio to scrape the websites. I also had to use a library called CryptJS for the api call. The app is styled with Bootstrap.


Thoughts on this project:
--------------------------
1. It took a while to figure out how to build the api call which met all the necessary requirements from MOZ. There was minimal documentation. I also had to learn how to use encryption.

2. While Cheerio was simple to pick up- it looks just like jquery, the results of the scrape varied (sometimes a lot) from website to website, so it required careful exception handling.

3. the next version of this app will include a check for Meta tags  to see if they match keywords selected by user as well as a check to ensure a description exists in the header.

4. I'm extremely excited about refactoring my code  (and building out the project more). If you're reading this and have any opinions, please don't hesitate to share.

