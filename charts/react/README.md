[IO Charts](../)
# Build USEEIO-Widgets locally (React)

You can skip building locally since [io/build](../../build/) already contains a built instance. [Learn more](../)

Use these step if you are editing the USEEIO React Widgets locally. 

If you are collaborating through model.earth on updates, fork and clone [modelearth/useeio-widgets](https://github.com/modelearth/useeio-widgets/), otherwise fork [usepa/useeio-widgets](https://github.com/USEPA/useeio-widgets/).

<!--
<span style="background:red; padding:3px; color:#fff">NOTE:</span> The code in the useeio-widgets repo currently causes a runaway processor in the browser when used with the "localsite" repo. To avoid, the "localsite/build" folder contains the recent code from [Recent build 2](https://thetisiboth.github.io/useeio-widget-builds/).
-->

#### Node and Node Version Manager (NVM)

You'll need a current version of [Node.js](https://nodejs.org) installed. View our [node and python install notes](/io/coders/python/)

The io/build folder contains the [fixed versions](https://github.com/USEPA/useeio-widgets/issues/98) of useeio.js and useeio-widgets.

## Quick Steps

Run these in the useeio-widgets folder rather than the parent webroot. [from wiki](https://github.com/USEPA/useeio-widgets/wiki/Build)
npm ci (clean install) is similar to `npm install`, but doesn't modify the package-lock.json.

	npm ci

Copy json files from [io repo](https://github.com/ModelEarth/io/tree/main/build/api) and place in useeio-widgets/build/api. (More info below)  
Or copy from [OpenFootprint/impacts](https://github.com/ModelEarth/OpenFootprint/tree/main/impacts/2020)

Then start a new terminal, also in the useeio-widgets folder and run: (Takes 30 seconds)

	npm run build

	npm run server
	
View at: [http://localhost:8080](http://localhost:8080)

Optionally run this command in your webroot (the folder containing useeio-widgets):

	python -m http.server 8887

Then these should work too:

[http://localhost:8887/localsite](http://localhost:8887/localsite)
[http://localhost:8887/useeio-widgets/build](http://localhost:8887/useeio-widgets/build)

Detailed steps...

## Open Terminal or VS Code

#### Right-click on useeio-widgets folder and open a terminal    

Choose "New Terminal at Folder" on a Mac. &nbsp; [Sublime Text](https://www.sublimetext.com/) is a nice simple code editor.

#### Or open with VS Code: 

You can open the folder from VS Code.  Shortcut for opening VS Code: Open a command prompt in the repo folder and type `code .` or `code `  This may be necessary if your build does not run when opening with File > Open in VS Code.

You may need to [Configure your VS Code Editor](https://code.visualstudio.com/docs/setup/setup-overview) so running `code .` launches the editor.

Avoid running `code .`  in the parent (webroot) folder containing your repo(s) or your VS Code editor may not allow you to run subsequent commands inside its terminal.

To open a command shell window within VS Code by typing (Ctrl + \` backtick) or go to the "View > Terminal". 

Learn more in the VS Code [Node.js Tutorial](https://code.visualstudio.com/docs/nodejs/nodejs-tutorial).

## Install Node.js node_modules  

The following will add a node_modules folder containing javascript source libraries (dependencies) that will be used to output code for the widgets.  `npm ci` is an alternative to `npm install` which avoids modifying the package.lock.json file. [Learn more](https://stackoverflow.com/questions/48524417/should-the-package-lock-json-file-be-added-to-gitignore)

	npm ci

<!--
npm ci
Use `npm ci` instead of `npm install` to avoid updating package-lock.json. [Why? npm ci](https://stackoverflow.com/questions/48524417/should-the-package-lock-json-file-be-added-to-gitignore)
-->

<!--
OLD - Did not occur with React update from EPA when running in March 2024
You can ignore errors (about 11), including "Error: `gyp` failed with exit code: 1".  
If you receive a "high severity vulnerabilities" warning, run the following as advised:  
	npm audit fix
-->


## Run Server

Start a server pointed directly into your useeio-widgets folder. Then open the default port (8080) at http://localhost:8080 in your browser to see the widgets.  Your command window will become inoperable since it is running a server.  Open a new command window (by clicking plus) to issue further commands.  

```
npm run server
```

Then view the site at [http://localhost:8080](http://localhost:8080)

Note that the standard "npm run dev" doesn't seem to launch a server. It runs webpack.config.js and might be used initially for apexcharts.

#### Optionally view in your Webroot - via port 8887

You can also view in your webroot with other repos if you use our [server setup cmd](../../../localsite/start/steps)  
[http://localhost:8887/useeio-widgets/build](http://localhost:8887/useeio-widgets/build)  



## Manually add JSON files for API

**Important:** Copy the io/build/api files into your useeio-widgets/build/api folder.

The JSON files have been pre-generated for you using the JSON dump cmd in the [useeio.js repo](https://github.com/modelearth/useeio.js/). The JSON dump cmd requires requesting an API key from the US EPA, but you won't need to if you've copied the io/build/api folder.

Data for all 50 states - You can also develop with [USEEIO data from all 50 states](https://github.com/ModelEarth/OpenFootprint/tree/main/impacts/2020).  
Changes to the data structure may require modifying the widget React code.

## Run npm build to view your edits

The build takes about 30 second to run.
And use the up-arrow to run the build again after making a change.

```
npm run build
```

This will create or update the `build` folder and a `lib` sub-folder containing small JavaScript libraries used by the USEEIO widgets.  

The "build" folder contains [example HTML files](../../build/) demonstrating usage of the widgets. It uses a json copy of the API placed in build/api.

<!--
Note: After building, remove   a { color: #555; } in widget.css.

To Do: Surround all USEEIO widgets with a class called .ioWidget and update widget.css to limit to .ioWidget.
-->




<!--
This no longer occurs
<span style="background:red; padding:3px; color:#fff">NOTE:</span> We recommend avoiding running the following build command. The code in the useeio-widgets repo currently causes a runaway processor in the browser when used with the "localsite" repo. To avoid, the "localsite/build" folder contains the recent code from [Recent build 2](https://thetisiboth.github.io/useeio-widget-builds/).
-->

<!--
No longer necessary
We switched from recent node-v20.10.0 to older 12.22.6 to avoid this error:
error:0308010C:digital envelope routines::unsupported

nvm install 12.22.6
nvm use 12.22.6
-->

<br>
<h1>API Key (not needed)</h1>
You won't need to run the API since the API is already output as [json files](https://github.com/ModelEarth/io/tree/main/build/api).  
The US EPA API requires an API key which we store in a [private Google Doc](https://docs.google.com/document/d/1FsIATg3XS-ZlyrNabZBIR9mdhSTWv22-yp0ZCyF80rg/edit?pli=1) to generate the json files annually.<br>

<!--
You can skip this step. We've already populated the **io/build/api folder** for you.

The generated .json files output from the USEEIO API load faster and you can work locally on an airplane.

There is also a staging instance of the [USEEIO API](https://github.com/USEPA/USEEIO_API). However this server is often shutdown and will return a 404 error at <a href="https://smmtool.app.cloud.gov/" target="_blank">endpoint overview</a>. Every 90 days the staging server requires a reboot. You can email the [contact person](https://github.com/USEPA/USEEIO_API/wiki/People#Contact) to restart.

Again, you don't need to run this since we're using a json instance of the API.

This one include 5 state files and will soon include all 50.

	npm run download -- --endpoint https://smmtool.app.cloud.gov/api

Running the above mirrors API data into the static json files in the `build/api` folder. 

You may optionally [request the key](https://github.com/USEPA/USEEIO_API/wiki/Use-the-API) to the production API to run the following (Interns may use the key in our Google Doc).


As of March 2024, this one does not yet contain any state folders, nor the GHG folder.
```
npm run download -- --endpoint https://api.edap-cluster.com/useeio/api --apikey [Add API key here]
```
Replace USEEIOv2.0.1-411 in the "io" repo if a newer version is generated.

Learn more about [using the USEEIO API](https://github.com/USEPA/USEEIO_API/wiki/Use-the-API)
-->
<br>

**Data for all 50 states**
You can develop with [USEEIO data from all 50 states](https://github.com/ModelEarth/OpenFootprint/tree/main/impacts/2020).   
Changes to the data structure may require modifying the chart React code.

