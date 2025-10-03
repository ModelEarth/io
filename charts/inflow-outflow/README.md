[Embeddable Input-Output Widgets](../)

**Links for testing**
These call config.join(ioGrid) whenever the state hash value changes.

- [Maine](#state=ME)  
- [Georgia](#state=GA)  
- [Entire US](#)  

**Code update needed:** Update [React in useeio-widgets](https://github.com/modelearth/useeio-widgets/) to avoid zero $0 dollar values when [a state is viewed (Maine)](#state=ME).  
The existing React code only supports the US model: [US inflow-outflow](./)

Compare with examples that work in [useeio.js javascript](/profile/footprint/).
Compare [US](/profile/footprint/sector_scopes.html) and [Maine](/profile/footprint/sector_scopes.html#state=ME)

Another issue: The state remains in the URL in the current page,  
but you have to hit reload after [changing it (Georgia)](#state=GA) to refresh the center column.
