# Angular + Tabletop.js Cambridge Class
#### _Lovingly taught by one [@misterburton](http://www.twitter.com/misterburton)_

Prerequisite software installs:

* [Sublime Text 2](http://www.sublimetext.com/)
* [Yeoman, Bower & Grunt](http://yeoman.io/learning/index.html)

## Setup

### Install Yeoman's Angular Generator

```
sudo npm install -g generator-angular
```

Angular Generator Reference [on Github](https://github.com/yeoman/generator-angular#route)

### Scaffolding our Angular app with Yeoman

* Create a folder called `angular-cambridge-class`
* Open Terminal
* `cd` into your newly created folder
* type `sudo yo angular` and choose 'yes' to all the defaults (except the SASS version of Bootstrap, we'll not be using that one)
* open the `angular-cambridge-class` folder in sublime

You should see the following folder structure in your sidebar. Expand the `app` folder to reveal its contents:

![Angular Generator Folder Structure](http://i.imgur.com/tevDgNu.png)

All of the folders beneath `app`, we never have to open.

Open a new tab in terminal with ⌘ + t (shoutout to alex fuzzywobble) and type `grunt serve` to lauch our newly scaffolded angular app. You should now see a site composed of a few standard Bootstrap UI components.

Leave the `grunt serve` tab running in terminal — it will live reload our site with every change we make to our code — and return to our original tab.

### Understanding WTF is going on in all these files

In the `scripts` folder, open the `app.js` file. You should see the following:

```
angular
  .module('angularCambridgeClassApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
```

Let's dissect the m'f'er to figure out what's going on. Stuff like:

```
'ngAnimate',
'ngCookies',
```

These are dependencies that enable particular functionality in our Angular app. Specifically, these are the default dependencies our Yeoman angular generator installs. We'll be adding a few more of these as we go.

Moving on down to the `.config` function, specifically, this syntax:

```
.when('/about', {
  templateUrl: 'views/about.html',
  controller: 'AboutCtrl'
})
```

_**translation:**_ when `/about` is appended to the URL, load `views/about.html` into our main view div in the `index.html` file (`<div ng-view=""></div>`). Further, the .js controller for this view is called `AboutCtrl` (which you will find in `scripts/controllers/about.js`).

In the `about.js` file, you'll immediately notice the corresponding `AboutCtrl` syntax:

```
angular.module('angularCambridgeClassApp')
  .controller('AboutCtrl'…
```

Finally, toward the bottom of the `index.html` file, you'll see that we're importing the `about.js` controller such that it is available when the view is loaded:

```
<script src="scripts/controllers/about.js"></script>
```

#### To Recap:

Our app's pages — or routes — have three major requirements:

* The route name (`/about`), path to the view file (`views/about.html`) and a reference to its associated controller (`AboutCtrl`) in `app.js`
* The controller JavaScript file in the `controllers` folder, in our case, `about.js`
* And that the controller is imported (`<script…/about.js`) in the main `index.html` file

## Housekeeping

Time to get rid of all that we don't need. Specifically, the default bootstrap UI code and the 'about' view we'll not be using.

In the `index.html` file, remove all HTML code in the body, leaving only the `ng-view` div. The only remaining HTML between the opening & closing `body` tags should be the following line:

```
<div ng-view=""></div>
```

Delete the `about.html` and `about.js` files and references to each in our `index.html` and `app.js` files. Further, delete all the HTML in the `main.html` file.

## Creating New Routes with Yeoman's Angular Generator

We're going to create two new routes: 'Work' & 'Play.'

Running a single `angular:route` generator command from our terminal will:

1. generate the route's controller .js file in `scripts/controllers`
2. generate its view .html file in `views`
3. add the route to our .config funciton in `app.js` 
4. link the controller .js file in our `index.html` file.

To create our 'work' and 'play' views, simply run the following two commands, one after the other:

```
yo angular:route work
```
and

```
yo angular:route play
```

If you now take a look in the `index.html` and `app.js` files, you'll see references to our new views and controllers. Further, in the `controllers` and `views` folders, you'll find our corresponding new files, as well.

***

_Now would be a good time to add some CSS. This workshop doesn't cover CSS, so simply replace the contents of `views/main.scss` with those of the following file:_

[CSS for Workshop](https://raw.githubusercontent.com/misterburton/daverast/master/app/styles/main.scss)

TODO: new raw scss link

***

## Adding Navigation

We'll need a nav in our `index.html` file so we can switch between these new routes. Copy/paste the following code above our `ng-view` div in `index.html`:

```
<!-- horizontal desktop nav -->
<div id="desktopNav">
  <div class="container" id="desktopNavContainer">
    <div class="col-xs-12 col-md-8 col-md-offset-2">
      <ul id="desktopNavList">
        <li><a ng-href="#/">Home</a></li>
        <li><a ng-href="#/work">Work</a></li>
        <li><a ng-href="#/play">Play</a></li>
      </ul>
    </div>
  </div>
</div><!-- ./horizontal desktop nav -->
```

With your browser still pointing to `http://localhost:9000/`, you should now see a navbar with three items. Clicking each of these will load our simple views. Also, notice that we're using `ng-href` in lieu of our usual `href`.

## Animating Transitions Between Views

We'll be using the excellent GSAP to animate our transitions. To install this into our project, type the following into the terminal:

```
bower search gsap
```

You'll notice 'gsap' is one of our options. To simulataneously install and save to our `bower.json` file, run the following command:

```
bower install gsap --save
```

One last grunt command is required to _wire up these new dependencies_ in our `index.html` file:

```
grunt wiredep
```

Let's add a quick class name for reference to our `ng-view` div in `index.html`.

```
<div ng-view="" class="page"></div>
```

Moving back to our `app.js` file, we're going to make a small change to more easily reference our angular app in code. take the folling line:

```
angular
  .module('angularCambridgeClassApp'…
```

and modify it to instead read:

```
var app = angular.module('angularCambridgeClassApp'…
```

we'll now break out the `config` function, making things a touch cleaner & easier to read:

```
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/work', {
      templateUrl: 'views/work.html',
      controller: 'WorkCtrl'
    })
    .when('/play', {
      templateUrl: 'views/play.html',
      controller: 'PlayCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
```

_Note: this change can also be made in the controller .js files, like so:_

```
app.controller('MainCtrl', function($scope) {
  // code for main.html view
});
```

Angular's `ngAnimate` dependency gives you quite a lot of control, right out of the box. To add animation to our routes, in `app.js`, we can use the following syntax, taken directly from the [ngAnimate page](https://docs.angularjs.org/api/ngAnimate) in the Angular docs:

```
app.animation('.page', function() {
  return {
    enter: function(element, done) {
      // animate in
    },
    leave: function(element, done) {
      // animate out
    }
  };
});
```

You'll notice a reference to the `.page` class we added to our `ng-view` div. This will apply both our `enter` and `leave` functions to every route.

Filling out our `enter` and `leave` functions with some TweenMax syntax from GSAP, and we now have simple transitions between views:

```
app.animation('.page', function() {
  return {
    enter: function(element, done) {
      // set page 20 px south in alpha 0
      TweenMax.to(element, 0, {
        autoAlpha: 0,
        y: 20,
        overwrite: false
      });
      // fade in & bring to y:0
      TweenMax.to(element, 0.5, {
        autoAlpha: 1,
        y: 0,
        delay: .25,
        overwrite: false
      });
    },
    leave: function(element, done) {
      TweenMax.to(element, 0.75, {
        autoAlpha: 0,
        y: 20,
        overwrite: false,
        display: 'none',
        onComplete: removeElement
      });
      function removeElement() {
        element.remove();
        element = null;
      }
    }
  };
});
```

Checking out our app in the browser, you'll see that our transitions are working, but they're rather jumpy and odd. The easy fix for this is to contain each view file's content w/in an absolutely positioned `.wrapper`. Our view files should now look like this:

```
<div class="wrapper">
  
  <p>This is the main view.</p>

</div>
```

Now, head back to the browser and check out out transitions. No jankiness, only [superfly tnt](https://www.youtube.com/watch?v=ZAmwnD-Sv3c#t=28) remains.

_We'll not cover more complex transitions in this workshop. However, for future reference, individual element `enter` and `leave` animations would be placed in the `controller` function, as seen below:_

```
app.controller('MainCtrl', function($scope) {
  
  // individual elements' `enter` animations go here

  $scope.$on('$locationChangeStart', function(event) {
    // individual elements' `leave` animations go here
  });

});
```

With the transitions now wired up, let's horizontally align each of our pages w/ the nav by wrapping each page's content in a Bootstrap column, like this:

```
<div class="wrapper">
  
  <div class="container">

    <div class="col-xs-12 col-md-8 col-md-offset-2">

      <p>This is the main view.</p>

    </div><!-- ./col -->

  </div><!-- ./container -->

</div><!-- ./wrapper -->
```

## Adding Third Party Awesomeness

When adding new functionality to your app, always perform a quick google search to see if someone has already solved for your issue using Angular methodologies before defaulting to he comforts of previously held, jQuery et al. techniques.

### Mobile Menu via Angular Snap.js

[Angular Snap.js](http://angular-js.in/angular-snap/) makes adding a mobile, 'hamburger' menu ridiculously easy. To add it to our project, type the following in terminal:

```
bower install angular-snap --save
```
then, run:

```
grunt wiredep
```

Per the above linked Angular site, in the `.module` function in our `app.js` file, we need to add `snap` to our list of dependencies, like so:

```
…
'ngSanitize',
'ngTouch',
'snap'
```

We then need to wrap all of our existing content in `index.html` into a `snap-content` directive, like this:

```
<snap-content>
  <!-- our existing HTML goes in  here -->
</snap-content>
```

Then — outside of the `snap-content` element — we use `snap-drawer` elements to wrap a mobile menu (I've created one for us to save on time, and styled it via ` id="flyoutMenu"`):

```
<!-- mobile flyout menu -->
<snap-drawer id="flyoutMenu">
  <ul>
    <li><a ng-href="#/" snap-toggle="left">Home</a></li>
    <li><a ng-href="#/work" snap-toggle="left">Work</a></li>
    <li><a ng-href="#/play" snap-toggle="left">Play</a></li>
  </ul>
</snap-drawer><!-- ./mobile flyout menu -->
```

Finally, we add the hamburger menu w/in our `snap-content` element, like this:

```
<snap-dragger>
  <button snap-toggle="left" id="toggleSnapButton">&#9776;</button>
</snap-dragger>
```

While everything is working perfectly, our `snap-content` element has no background color, so you can see the mobile menu behind it. Simply add the following `id` to the `snap-content` element (which is already granted a background color in our .scss file):

```
<snap-content id="mainContentWrapper">
```

I've pre-made a header for our site. Just below the `snap-dragger` element, add the following HTML:

```
<!-- header & title -->
<header>

  <div class="container" id="titleContainer">
    <div class="col-xs-12 col-md-8 col-md-offset-2">
      <a ng-href="#/">
        <h2 id="siteTitle">Zanzabar McFait</h2>
        <h4 id="siteSubtitle">Industry Professionale</h4>
      </a>
    </div>
  </div><!-- ./titleContainer -->

</header><!-- ./header & title -->
```
With very little effort beyond some copy/pasting, we now have a mobile, hamburgesa menu.

***

### Google Spreadsheet as a Database w/ angular-tabletop

[Angular-Tabletop](https://github.com/times/angular-tabletop) is an Angular-specific implementation of the awesome [tabletop.js](https://github.com/jsoma/tabletop).

To install, run the following command in the terminal:

```
bower install angular-tabletop --save
```

Followed by:

```
grunt wiredep
```

In the module function in our `app.js` file, just below our new 'snap' dependency, add the following:

```
…
'snap',
'Tabletop'
```
Below, in our `.config` function, we add a reference to `TabletopProvider`, like this:

```
app.config(function($routeProvider, TabletopProvider)
```

Within the .config function, we setup Tabletop like by adding:

```
app.config(function($routeProvider, TabletopProvider) {

  // tabletop setup...
  TabletopProvider.setTabletopOptions({
    key: 'https://docs.google.com/spreadsheets/d/1140e2--UGqVbTlSMnVZ3oNLrcLEpnvsnCMbIaI8PlS8/pubhtml',
  });
```

I've pre-made a Google Spreadsheet — [available here](https://docs.google.com/spreadsheets/d/1140e2--UGqVbTlSMnVZ3oNLrcLEpnvsnCMbIaI8PlS8/pubhtml) — from which we'll pull our data. The above `key` is taken from its URL.

To feed the Tabletop data into our routes, we add a `resolve` key, like this:

```
.when('/', {
  templateUrl: 'views/main.html',
  controller: 'MainCtrl',
  resolve: {
    tabletopData: 'Tabletop'
  }
})
```

Finally, in our `main.js` file, we pass in our Tabletop dependency via the `controller` function, like this…

```
app.controller('MainCtrl', function($scope, tabletopData) { … }
```

… and access the data w/in the `controller` function, like this:

```
$scope.data = tabletopData;
console.log($scope.data);
```

You should see the following output in your console:

![console](http://i.imgur.com/H0WmNbA.png)

Add the following line w/in the `controller` function in `main.js`:

```
$scope.jsonData = $scope.data[0].Sheet1.elements;
```

This creates a variable, `jsonData`, within which our Google Spreadsheet data is stored. Prepending `$scope` to a variable name makes it available to the view.

## Using Angular's ng-repeat directive to populate the view with our spreadsheet data

Add the following line to our `main.html` file:

```
<div ng-repeat="data in jsonData"></div>
```

This line creates a new div for each item in our jsonData array.

Now, accessing any of our data for display in the view is as simple as:

```
<div ng-repeat="data in jsonData">
  <h1>{{data.name}}</h1>
</div>
```

Filling out our page w/ all of the data from the Google Spreadsheet:

```
<div class="wrapper">
  
  <div class="container">

    <div class="col-xs-12 col-md-8 col-md-offset-2">

      <p>This is the main view.</p>

      <div ng-repeat="data in jsonData" id='{{$index}}'>
        <h1>{{data.name}}</h1>
        <h3>{{data.occupation}}</h3>
        <p>
          <a href="{{data.url}}" target="_blank">Wikipedia Page</a>
        </p>

        <img ng-src="{{ data.image }}"/>

        <div class="divider"></div>

      </div>

    </div><!-- ./col -->

  </div><!-- ./container -->

</div><!-- ./wrapper -->
```

## Making a reusable footer for each view

First, we'll use the angular generator's `view` command to create a `footer.html` view in our `views` folder:

```
yo angular:view footer
```

Replace the HTML in our new `footer.html` file with the following:

```
<div class="footer">
   <div class="container">
      <div class="col-xs-12 col-md-8 col-md-offset-2 footerCopy">
          All Content &copy; Zanzabar Mcfait
      </div>
   </div>
</div>
```

Back in our main.html file, we'll use angular's `ng-include` directive to insert the footer just after the closing `</div><!-- ./container -->` div:

```
<div ng-include="'views/footer.html'"></div>
```

## An ugly — albeit necessary – hackity hack

Per the tabletop.js site, [Google Spreadsheets can sometimes be slow [or] overwhelmed](https://github.com/jsoma/tabletop#cachingproxying-google-spreadsheets). A fix for this? Simply check to see if our page has loaded and, if not, reload the page to initiate a new call to our spreadsheet:

```
// make sure our data has loaded, otherwise … it's time for a reeeeeeeeeload!!!
TweenMax.delayedCall(1.5, dataLoadCheck);
function dataLoadCheck() {
  if ($('body').find('.page') == []) {
    window.location.reload();
  }
}
```

It's ugly as sin, yes. But I can assure you, it works.

## Final notes

### Moar pages via moar sheets

Populating data to the other pages of our app is as simple as creating new sheets in the Google spreadsheet. For instance, we would simply create `Sheet 2` for the `work` view and reference its data in the `work.js` controller function via the following:

```
app.controller('WorkCtrl', function($scope, tabletopData) {

  $scope.data = tabletopData;
  $scope.jsonData = $scope.data[0].Sheet1.elements;
  …
```

_Note: you can, of course, change the names of the sheets from Google's default 'Sheet,' 'Sheet 2,' etc._

### Modularity

We've covered modularity in HTML via our various `view` files and JavaScript via our `controllers`. For CSS, using SASS' `@import` functionality allows multiple developers to break out view-specific styles into their own SCSS files. For example, the opening lines of your `main.scss` file might look like this:

```
…
@import "compass";
@import "MainStyles.scss";
@import "WorkStyles.scss";
@import "PlayStyles.scss";
…
```

### Build & Publish

When all is said & done, the following `grunt` command minifies all of your code, optimizes images, etc., and places them into a new, `dist` folder for publishing:

```
grunt build
```

That's all, folks.

