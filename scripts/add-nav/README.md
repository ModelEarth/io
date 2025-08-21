[IO Charts](../../charts)

# Add localsite nav to US EPA build pages

Start a virtual environment:

	python3 -m venv env
	source env/bin/activate
On Windows the second command is: `.\env\Scripts\activate`

Clone extra repos (trade, io, etc) into our [webroot](/webroot/) with the Industry command.

Run in the root of your website to add localsite.js navigation to US EPA samples.

	python io/scripts/add-nav/add_nav_wrapper.py useeio-widgets/build

Applies the following around the content within the body tag:

	<div class="content contentpadding">
	</div>

Developed by Dhananjay, fall 2024.

View [resulting navigation](/useeio-widgets/build/)