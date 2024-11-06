[IO Charts](../../charts)

# Add Nav to US EPA build samples

Start a virtual environment:

	python3 -m venv env
	source env/bin/activate
On Windows the second command is: `.\env\Scripts\activate`

Fork and clone these 3 repos: [localsite, io, useeio-widgets](/localsite/start/steps/)

Run in the root of your website to add localsite.js navigation to US EPA samples.

	python io/scripts/add-nav/add_nav_wrapper.py useeio-widgets/build

TO DO: Dhananjay is making updates so the script updates all the .html files in the build folder.

Also apply the following around the content within the body tag:

	<div class="content contentpadding">
	</div>

View [resulting navigation](/useeio-widgets/build/)