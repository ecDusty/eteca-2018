# GROOPIES CLIENT SIDE APP
Groopie social event web application


## Folder Layout

As you can see there is just the 1 folder within this repository:

  * _src_: Contains the source code the your web app. Basically the easy to read and edit version of the app.

When you have gulp up & running and are testing/ distributing your site, you'll see 2 more folders being created during this process:
  * _test_: This is the folder which will hold the code that is still under testing.
  * _dist_: This is the distribution code of my site. All the code here is just the minified versions of the source code.


## Creating Distribution Ready Code From Your Source Code

Compile the easy to read source code to ready to use HTML, CSS, and JS files.


### Getting started up with Gulp.

As Erin develops on a Windows machine, these instructions are for windows users using Git's Bach command line, but for the most part I believe they should work on Mac's as well, as PowerShell isn't used.

1. Install npm on your machine
  * The simplest way of doing this is installing [Node JS][1], found at the provided link.

2. Install Gulp Globally - _using command line_
  * Make sure to include the '-g' flag. This tells npm to install it globally.
    ```sh
    $ npm install gulp -g
    ```

3. Run npm install program - _using command line_
  * As you have already downloaded my project, you have my **package.json** file, which has a list of all the dependencies and dev-dependencies needed for the project. By running 'npm install', your tell npm to run it's 'install' package on all the dependencies & dev-dependencies located within the package.json file.
  * This is quicker than installing each gulp package required seperately
    * _Make sure your are in the repository folder before you start the npm install process_
    ```sh
    $ npm install
    ```
      * Small side note, gulp-eslint doesn't always install correctly. You may have to install it a second time to make sure.
        ```sh
        $npm install gulp-eslint
        ```

4. Start testing your website
  * Just run gulp. This will create the test version of your site within the created 'dev' folder and start a local server.
    ```sh
    $ gulp
    ```

  a. Run your local server for testing
  * Using 'gulp serve:dev' you can launch the website. **Serve** will watch to see if any changes are made to the source files, create the dev version of those files, than update the browser for you.
    ```sh
    $ gulp serve:dev
    ```
  * Should you like to make any changes to the site and make it your own, just start editing the files within the 'src' folder, **Serve** will handle the rest.

5. Run your Production ready Site
  * You're finished editing the site to your liking, give it one last test and run the 'serve:dist' task. This will export you project to the 'dist' folder while also creating the smallest version of each file.
    ```sh
    $ gulp serve:dist
    ```

6. Export your production ready project
  * This will fill your 'dist' folder with your production ready code, then zip up both the 'src' & 'dist' folders. Giving you one file to send off.
    ```sh
    $ gulp export
    ```


### Credit

1) The work of asynchronysly loading outside scourced scripts originally came from [JavaScript.info][2]'s website. Showing how to combine promises with the act of loading scripts.

2) Loading Animation from [LOADING.IO][3]


### Sources

[1]: https://nodejs.org/en/
[2]: https://javascript.info/callbacks
[3]: https://loading.io/css/


### To Do List

* Add full application description