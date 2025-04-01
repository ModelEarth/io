# Embeddable Input-Output Widgets
<div class="floatright">
<img src="../img/logo/epa.png" style="width:100%; max-width:200px; margin-left:30px">
</div>

[Our Local Industry Evaluator](../../localsite/info/) contains the JQuery, Leaflet and React widgets below. 

[Our new State Impact javascript reports work with all 50 states](/useeio.js/footprint)

[The React useeio-widgets matrix code](https://github.com/modelearth/useeio-widgets/) runs json for 50 states: [inflow-outflow/#state=ME](inflow-outflow/#state=ME)


<!-- 
Check out more [App Samples](../../io/) and [get started creating a site](https://model.earth/localsite/start/).  
Add a page to the [apps repo](../../apps/)
-->

<!--
OLD NOTE:

1. Duplicate USEEIOv1.2 to USEEIO for existing script in non-React widgets.  
2. Duplicate USEEIOv1.2 to GAUSEEIO since GA data currently only resides on the staging server.  

Manually copy the GAUSEEIO to a new folder called USEEIOv1.2 for Inflow-Outflow Chart  
-->

<!--
## Environmentally-Extended <span style="white-space:nowrap">Input-Output Model</span>

In RStudio
Tools > Install Packages > devtools

OR

install.packages(‘devtools’)          
library(devtools)

Rstudio has devtools intalled already, so maybe just library(devtools) to call in the package
-->

[The JSON API](https://github.com/ModelEarth/io/tree/main/build/api) used here is generated from the [USEEIO API](https://github.com/USEPA/USEEIO_API) which uses the [USEEIOR](https://github.com/USEPA/USEEIOR) pipeline. 

<!--
It's not necessary to interact with the USEEIO API directy.
Upcoming data for all states resides at [profile/impacts](/profile/impacts).
-->


<!--(It replaces the use of [IOMB](https://github.com/USEPA/USEEIO_API/wiki/Build))-->

<!--
Here are [old model files](https://www.dropbox.com/sh/af48m0jsusgr3jg/AACzBSJwujR6LU0jZBhAzys6a?dl=0) for testing. (Better to use the newer data in the [static JSON files](https://github.com/modelearth/io/tree/main/build/api)) - [Build locally](../../charts/#build)
-->

[How to Build USEEIO-Widgets locally (React)](react)

## JQuery Widgets 

- [USEEIO 50 State Javascript](/useeio.js/footprint/) - Upcoming, get involved coding  
- [NAICS Industry List](../../localsite/info/#state=ME) and [Stand-alone](../../localsite/info/naics/) - JQuery
- [Impact Bubble Chart](bubble/) - D3 and JQuery  
- [Sankey Chart](sankey/) - D3 with Python prep  
- [Chord Chart](chord/) - Upcoming, get involved coding  

<!--
If your local widgets reference the "useeio" folder, they may need to be updated occasionally as parameters change. For stability, point your local widgets at one of the [numbered backups](https://model.earth/eeio/build.2020.002) or copy the useeio folder into your project.


([old version](https://model.earth/eeio/build.2020.001), [pre-React](https://model.earth/eeio/build.2020.003) and [new version](useeio)) 
-->

## Embedable Leaflet Map Widgets

- [Simple embedded map sample](/localsite/info/embed.html#state=NY) - Leaflet and JQuery
- [Farm Fresh Produce Map (from CSV files on GitHub)](../../localsite/map/#show=farmfresh) - Leaflet and JQuery

## React Widgets

The React widgets extend the [USEEIO Javascript (useeio.js)](/useeio.js/footprint) where you can edit javascript reports directly.

[View documentation and functions](https://msrocka.github.io/useeio-widget-builds/apidoc/) generated using [TypeDoc](https://typedoc.org/).  
The React widgets in the [io repo](https://github.com/modelearth/io/) originate from the EPA's [USEEIO-widgets repo](https://github.com/USEPA/useeio-widgets/).   
Note: EPA downgraded reactjs from ^18.2.0 to ^17.0.2 to solve compability issue with MAC. (Jan 2024)

[The build folder](../build) is copied from useeio-widgets into the [io repo](https://github.com/modelearth/io/) to provide a static copy of the API's json files.  
We run our [add-nav python script](../scripts/add-nav) to append localsite.js state navigation onto the build folder samples.  
The io repo includes additional code for integrating widgets.

- [Inflow-Outflow Chart](inflow-outflow/#set=prosperity&indicators=VADD,JOBS) - [Tires](inflow-outflow/#sectors=326210&set=prosperity&indicators=JOBS,VADD) - (<a href="../build/iochart.html#indicators=ENRG,GHG,VADD&sectors=113000,327310,327400,333613,335912,336111,562111,562212">Widget only</a>)<!-- &page=1&count=10 --><!-- [imfast.io](https://useeiowidgets.imfast.io/iochart.html#sectors=322130,325520,327910,541200)-->  
- [Sector List - Mosaic](../build/sector_list.html?view=mosaic&count=50)  
- [Sector List - Mosaic with hash](../build/sector_list.html?view=mosaic&count=50#state=GA)  <!--Hash was getting removed by useeio-widgets.js prior to removal of line. -->
- [Sector List - Mosaic Limit Sectors](../build/sector_list.html?naics=333613,335912,336111&view=mosaic&count=50) - Broken. TODO: State models (introduced in 2024) need to be updated for NAICS. 
- [Sector List - Display Values](../build/sector_list.html?view=mosaic&showvalues=true)  
- [Sector List - Two positive indicators](../build/sector_list.html#view=mosaic&view_indicators=JOBS,VADD&showvalues=true) <!-- Changed ? back to # now that hash works again. -->
- [Industry Impact Bars with Configuration](../build/impact_chart_config.html)    
<!--
- [Sector List IO - Tire manufacturing (older version)](../build/iotables.html#sectors=326210&page=5)  
-->

<!--[Developer build (thetisiboth)](https://thetisiboth.github.io/useeio-widget-builds/)  -->
<!-- ([Recent build 1](https://msrocka.github.io/useeio-widget-builds/)) --> 

[How to Build USEEIO-Widgets locally (React)](react)

## React TO DOs

Also see our [useeio.js fork for Javascript TO DOs](/useeio.js/footprint/#reports)

### TO DO (PRIORITY): Retain #hash values in EPA widgets

[In our model.earth useeio-widgets fork](https://github.com/modelEarth/useeio-widgets), comment-out the process that removes URL hash values.  
Modify React to prevent the built [useeio-widgets](/io/charts/react/) code from removing state=ME from this URL:  
[http://localhost:8887/io/build/sector_list.html?view=mosaic#state=ME](http://localhost:8887/io/build/sector_list.html?view=mosaic#state=ME)  
We'll submit an issue to the EPA parent useeio-widgets repo.

### TO DO: Widget fix for EPA state model v1.0

Data no longer loads in  widgets. View by appending [beta=true](http://localhost:8887/io/charts/inflow-outflow/#set=prosperity&indicators=VADD,JOBS&state=GA&beta=true)  
Issue may be related to change to 73 sectors.  
Posted in Github as [State model v1.0 not supported by widgets](https://github.com/USEPA/useeio-widgets/issues/98)

### TO DO: Activate checkboxes to sort using multiple impact columns

Mock up (except we'll avoid the lines around the boxes and columns):

<a href="inflow-outflow/img/mockup-checkboxes.png"><img src="inflow-outflow/img/mockup-checkboxes.png" style="width:100%"></a><br>


Previously only the URL hash supported multiple impact sorting for the [sector-list (411 total)](/io/build/sector_list.html?view=mosaic&count=411) in  useeio-widgets ([localhost link](http://localhost:8887/useeio-widgets/build/sector_list.html?view=mosaic#indicators=ACID,GHG,HRSP)).

[Checkbox dev](https://github.com/ModelEarth/useeio-widgets/blob/master/src/widgets/sector-list/sector-list.tsx) (see history) for the Sector List in useeio-widgets at 
src -> widgets -> sector-list -> [sector-list.tsx](https://github.com/ModelEarth/useeio-widgets/commits/master/src/widgets/sector-list/sector-list.tsx)

[Build our fork of the useeio-widgets repo](https://github.com/modelearth/useeio-widgets) locally to work on the new checkboxes.

**New Features (in the latest modelearth/useeio-widgets build)**

High impact first sorts are now indicated by downward arrows.

Checkboxes now indicate which columns are the current filters, allowing for multiple columns to be selected using a URL like this:

http://localhost:8887/useeio-widgets/build/sector_list.html?view=mosaic#indicators=ACID,GHG,HRSP

BUG: The link above should not encode the commas when loading the page.
BUG: Sometimes the arrows appear using the link above, but not always.

**TO DO** - Coordinate with Loren to check which Pallavi implemented.

1.) Move the checkbox directly above the column (Then they won't have a 315 degree pivot.)

2.) Put the arrow inside the same a href tag as the title. (Then you won't need to add an action on the arrow itself.)

3.) Remove the underline on the title with:

	indicator a:hover{
	    text-decoration: none !important;
	}

4.) When unchecking, retain the other selected columns.

5.) When checking a box, show the highest level at the top with the first click. (The arrow will appear point up.)

6.) Adjust the angle of the arrow to point straight up and down. Wild guess:

	MuiSvgIcon-root {
		transform: translate(0px, 0px) rotate(-315deg);
	}

7.) Avoid encoding the commas in the URL #indicators=ACID,GHG,HRSP value. Figure out why the arrows are not always visible when refreshing.

8.) The new sortable checkboxes will allow impactful Jobs Supported (JOB) and Value-Added (VADD) positives to be compared with "low" impacts for other indicators. When the arrows point upward, populate a "low" hash value like this:

	#indicators=JOBS,VADD&low=ACID,GHG

The above would indicate: Lots of Jobs and Value Added, with low levels of negative impacts from Acid Rain and Green House Gases.

9.) Increase the maximum count to 411 so all the industries can be viewed.

<br>

### TO DO: Add display of totals as default, toggle than per-dollar

Total Amounts will be displayed with a toggle to Per-Dollar Spent.

Add total amounts to the [Inflow-Outflow Chart](/io/charts/inflow-outflow/#set=prosperity&indicators=VADD,JOBS) and show total amounts by default. See [total amounts examples](/localsite/info/data/totals/) and our display of easy to read totals using [commodity data procesed with python](/data-pipeline/research/economy/).  Update values displayed when the hash value changes from vtype=total to vtype=perdollar and back. Use the formatCellEasy() function in localsite.js or the python version formatCell() in the data-pipeline repo.

<!--
Reminder for Loren
TO DO: build/api/USEEIOv2.0 can be deleted.
It was replaced by USEEIOv2.0.1-411
-->

<hr><br>


# How to Host Widgets locally

The [localsite repo](../../localsite/) contains maps, navigation and data visualization charts.  

You can set parameters in the URL or javascript to control the display of the widgets.  [View examples in the apps repo](../../apps/).

The [io folder](https://github.com/modelearth/io/) contains a built copy of the "[build](../build)" folder and json API from [useeio-widgets](https://github.com/usepa/useeio-widgets), plus extra JQuery widgets.
<br>

1.) Create a folder for your webroot at Documents/Web or wherever you prefer.
2.) Start a local web server by right clicking your web folder and open a terminal command prompt.  Paste the following and hit return to run. This terminal will be locked from further commands since it is running your local server.

	python -m http.server 8887

3.) Open a new terminal and pull down these repos from Github. Hit return to run.

	git clone https://github.com/ModelEarth/localsite localsite &&  
	git clone https://github.com/ModelEarth/io io

You can install additional model.earth repos with our [install cmd](/localsite/start/steps)

If you'll be contributing changes, fork first the repo you're editing and clone from your fork. [Turn on GitHub Pages](/localsite/start/steps/#github-pages) so we can review your changes.

Run the following occasionally to refresh your local clones, or pull in Github Desktop:

	cd localsite && git pull https://github.com/ModelEarth/localsite main &&  
	cd ../io && git pull https://github.com/ModelEarth/io main

4.) View and update content locally at [http://localhost:8887/io/charts](http://localhost:8887/io/charts) and [http://localhost:8887/localsite/info](http://localhost:8887/localsite/info#state=ME)
<br>


# FAQs

### Why are some values in the demand vector $0 (blank)?

In some cases there is no final demand for the respective commodity and the production of that commodity is only driven by intermediate industry transactions (note that there are different demand vectors in the model and that the selected demand can be controlled via the configuration attributes). 


### How is code formatting enforced?

The `.editorconfig` file contains the formatting settings. Modern editors have plugins for checking EditorConfig settings. This maintains consistency so we can see in the diffs what changed. There is also a ESLint configuration in the project for other settings like semicolon rules, etc.

## Contribute Updates

To work with us on USEEIO React widget updates, fork the [model.earth fork of useeio-widgets](https://github.com/modelearth/useeio-widgets/) and [build locally](react)

Edit the React files that reside in useeio-widgets/src.
Files in useeio-widgets/build are overwritten when you run the build.

<!-- Fanyi says LiveReload didn't provide refresh
Build when editing - [Amplify React App](../../aws/amplify/) uses `npm start` to build on-the-fly.  
Another option: [LiveReload](https://www.logicbig.com/tutorials/misc/typescript/project-auto-refresh-with-live-reload.html) might refresh your browser as you edit.  
Install using the [Extension Marketplace](https://code.visualstudio.com/docs/editor/extension-gallery)  (Please update our documentation, not yet confirmed). 
-->

[Python Samples](../../community/resources/useeio) and [Contributing using RStudio](../naics).

<!--
From the following:
https://stackoverflow.com/questions/18428374/commands-not-found-on-zsh

1. Use a good text editor like VS Code and open your .zshrc file (should be in your home directory. 

Command+Shift+H
Command+Shift+Dot

if you don't see it, be sure to right-click in the file folder when opening and choose option to 'show hidden files').

2. find where it states: export PATH=a-bunch-of-paths-separated-by-colons:

3. insert this at the end of the line, before the end-quote: :$HOME/.local/bin

-->


[Active Projects](/projects/) and [How to Build USEEIO-Widgets locally](react)
