## Background
[USEEIO Javascript Reports (useeio.js)](/useeio.js/footprint) - Same javascript used in [React](../../io/charts) widgets (but faster to use without 30 second React build time.)

[Our state model data](https://github.com/ModelEarth/OpenFootprint/tree/main/impacts/2020) uses the US Environmentally-Extended Input Output (USEEIO) model of goods and services with Bureau of Labor Statistics (BLS) [data](https://model.earth/data-pipeline/). The data is freely available to use by industry, academia, nonprofits, and government agencies.  <!--In 2019, -->The US EPA awarded a [Regional Sustainability and Environmental Sciences Research Program (RESES)](https://www.epa.gov/research/regional-sustainability-and-environmental-sciences-research-program-reses) grant <!--(Community-driven Application Development Using USEEIO Models) to support EPA and the Georgia Center of Innovation for Energy --> to work with local communities in Georgia to build open-source interfaces for the model. The tools developed are now broadly available to other organizations, states and countries.  

IN PROGRESS: [Our USSEEIO to DuckDB Python](https://github.com/ModelEarth/OpenFootprint/tree/main/impacts/useeio/python) (by Satya) generates state DuckDB files. We pull international [DuckDB files](/OpenFootprint/prep/sql/duckdb/) and Supabase SQL from the Exiobase API. See [python by Satyabrat](https://gist.github.com/Satyabrat35/c8324f4efa26d1e82cb48e18eced35cd) using [create-database-useeio.yaml](https://github.com/ModelEarth/OpenFootprint/blob/main/impacts/useeio/create-database-useeio.yaml) with [US 2020](https://github.com/ModelEarth/OpenFootprint/tree/main/impacts/2020/USEEIOv2.0.1-411) data. 

Note that our our [International trade flow pull](/OpenFootprint/trade/) might avoid using create-database yaml since we're using Pymrio to pull from Exiobase directly.

View US data in [Supply Chain Inflow-Outflow](../../localsite/info/)  
[Lifecyle Tools Overview](../../community/tools/)<!--
[Webinar Video](https://youtu.be/GRJSvyUx0t4) 
and [slide presentation](https://smartcities.ipat.gatech.edu/sites/default/files/Smarter_Together_Webinar_Industry-Comparison-Tools_10-15-2020.pdf) --> 
<!--Learn about [USEEIO](/community/about/useeio/)  
Learn about [the USEEIO API](api/)-->

We're working toward pushing impact data into Google Data Commons using easy-to-understand table naming conventions. More [moonshots](/community/projects/).

## Timeline

- Spring 2020: [Developed app concepts](../../io/projects/), [on-boarded communities](../../io/communities/)
- Summer 2020: [Modeling and component development](../../localsite/info/)
- Fall 2020: [Develop prototype applications](../../apps/)
- Spring 2021: [Electric Vehicle Ecosystem](../../community/projects/mobility/), [Coastal Recycling](../../apps/coastal/)<!-- Activated Carbon Feedstocks -->
- Summer 2021: [Machine Learning for Industry Imputation](../../localsite/info/data/)
- Fall 2021: [Sustainable Communities Web Challenge](../../community/challenge/)
- Spring 2022: [Environmental Impact Profiles](../../io/template/)
- Fall 2022: [B2B Recycling Directory](../../localsite/map/#show=recyclers&state=GA)
- Winter 2023: Updates to [Data Pipeline for Counties](https://model.earth/data-pipeline/)
- Spring 2024: Additions to [Community Data for Timelines](https://model.earth/community-data/)
- Summer 2024: Exiobase [International Trade SQL tables](https://model.earth/OpenFootprint/trade/)
- Fall 2024: Feed Player, RealityStream [Active Projects](https://model.earth/projects/)
<br>

[USEEIO Versions](https://www.epa.gov/land-research/us-environmentally-extended-input-output-useeio-technical-content) - [Volunteer Projects](../../io/projects/) - [Starter Samples](../../localsite/start/)  


<!--
What inspired you to start your project?
Our project, Model.earth, was inspired by the need to address environmental challenges by extending existing industry data with environmental impact indicators to help inspire technology adoption that fits the unique attributes of each community - state, county and zip (territory and postal code). We’ve been motivated by the need for open footprint data on industries and their products to help promote sustainable material management, better built environments, pollution reduction, land and water conservation, and new infrastructure projects focused on biodiversity.

How did you discover DemocracyLab?
We discovered DemocracyLab online while collaborating with other open source developers. DemocracyLab connects tech enthusiasts, data scientists, and front-end developers with projects that drive positive change in society. The ethos of community-driven innovation resonated with our vision for Model.earth.

What motivated you to create a project on the platform?
The active community and collaborative spirit of DemocracyLab motivated us to use the platform as the primary recruiting tool for our coding projects. We saw it as an opportunity to share our work with talented, likeminded programmers interested in contributing their skills to the development of sustainability focused apps.

About your experience with DemocracyLab:
Our experience with DemocracyLab has been enriching and rewarding. The project setup and volunteer recruitment process were seamless thanks to the user-friendly interface and great support in Slack. We’ve recruited a dedicated and growing team of volunteers through the platform who have collectively contributed hundreds of hours to our project.

What was the project setup and volunteer recruitment process like?
The project setup on DemocracyLab was straightforward, allowing us to showcase our initiatives and attract skilled volunteers. The recruitment process involved posting project descriptions that promoted our vision to attract like-minded programmers passionate about thinking globally and acting locally.

How many volunteers have you recruited through the platform, how many hours have they contributed and how did they help your organization?
We’ve recruited over 30 volunteers through DemocracyLab who have collectively contributed over 200 hours to our project. Their efforts have been instrumental in advancing Model.earth by developing new features, analyzing data, and enhancing the platform’s capabilities for comprehensive environmental modeling using a wide range of visualization tools and services, including Apache eCharts, Streamlit Python, OpenAi and the Google Data Commons API.

What other platform features or events by DemocracyLab have you found most helpful?
DemocracyLab’s diverse range of platform features, such as skill-based matching, project management tools, and their community forums in Slack, have been invaluable in fostering collaboration and streamlining project workflows. The coding events and skill-building opportunities offered by DemocracyLab have enriched our volunteers’ experiences and contributed to their growth.

Is there any other example of DemocracyLab’s impact on your project that you want to share with us?
DemocracyLab’s impact on our project goes beyond volunteer recruitment. The platform facilitates meaningful connections, knowledge sharing, and problem-solving within the open source code community. This collaborative ecosystem has enabled us to expand our use of Machine Learning AI via Random Forests and Neural Networks for community forecasting that helps identify “At Risk” communities where innovations can reap the greater returns.

With Model.earth, policymakers, conservationists, and decision-makers can input parameters to predict the consequences of local investments on the environment. Model.earth offers insights into sustainable practices and products that make a difference. Our goal is to foster a better understanding of local business and job opportunity patterns while helping people make informed decisions with the power of AI and robust impact data, Model.earth is emerging as an important part of the decision making toolkit in a world where environmental challenges are solved through collaboration and informed perspectives using hundreds of factors that unfold around us all on a very local level.
-->