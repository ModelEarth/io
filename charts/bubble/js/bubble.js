/*
  Impact Bubble Chart
  allData contains industries and 24+ impact indicator value for each.
  A subset is highlighted.
*/

//TODO: Check if called in the script
var iBubble = iBubble || (function(){
    var _args = {}; // private

    return {
        init : function(Args) {
            _args = Args;
            // some other initialising
        },
        helloWorld : function() {
            alert('Hello World! -' + _args[0]);
        },
        priorHash : function() {
          return ({}); // initially empty
            //return (getHash()); // Includes hiddenhash. Resides in localsite/localsite.js
        },

    };
}());

// `hashChangeEvent` event reside in multiple widgets. 
// Called by goHash +-++localsite.js
let dataObject1={};
var element = document.querySelector('#industry-list');
clickCount=-1
colors=['rgb(198,60,65)','rgb(21,192,191)','rgb(155,89,182)','rgb(52,152,219)','rgb(46,204,113)','rgb(241,196,15)','rgb(230,126,34)','rgb(52,73,94)','rgb(192,57,43)','rgb(22,160,133)']
//the selected bubbles sect_list starter
sect_list=[]

//state,county drop down, for Nazanin's reference
//dropdown population code
/*
drop_down_list();
$("#state").change(drop_down_list);
$(window).load(drop_down_list);
// Drop down code from: https://www.bitrepository.com/dynamic-dependant-dropdown-list-us-states-counties.html
function drop_down_list(){
  var state = $('#state').val();
  if (state == 'AK' || state == 'DC') // Alaska and District Columbia have no counties{
    $('#county_drop_down').hide();
    $('#no_county_drop_down').show();
  } else {
    $('#loading_county_drop_down').show(); // Show the Loading...
    $('#county_drop_down').hide(); // Hide the drop down
    $('#no_county_drop_down').hide(); // Hide the "no counties" message (if it's the case)
    $.getScript("js/states/"+ state.toLowerCase() +".js", function(){
      populate(document.form.county);

      $('#loading_county_drop_down').hide(); // Hide the Loading...
      $('#county_drop_down').show(); // Show the drop down
    });
  }
}

d3.selectAll("#county").on("change",function(){
  console.log("county changed")
    updateHash({"naics":d3.select("#county").node().value});
})*/


par={}
//attribute mutation observer instead of using hash
/*
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type == "attributes") {
      par.naics=document.getElementById('industry-list').getAttribute('data-naics').slice(0,10)
      console.log("parrrr"+par.naics)
      if (document.getElementById("mySelect").checked){
          midFunc(params.x,params.y,params.z,par,"region");
          document.querySelector('#sector-list').setAttribute('area', 'GAUSEEIO');
      } else {
          midFunc(params.x,params.y,params.z,par,"all");
          document.querySelector('#sector-list').setAttribute('area', 'USEEIO');
      }
    }
  });
});
*/

// Uncaught TypeError: Failed to execute 'observe' on 'MutationObserver': parameter 1 is not of type 'Node'.
//observer.observe(element, {
//  attributes: true //configure it to listen to attribute changes
//});


let priorHash_bubble = {};
//refreshBubbleWidget();

// Listen for custom hashChangeEvent from localsite.js
document.addEventListener('hashChangeEvent', function (elem) {
  console.log("Custom hashChangeEvent detected");
  refreshBubbleWidget();
}, false);

// ALSO listen for native browser hashchange event (for manual URL changes)
window.addEventListener('hashchange', function() {
  console.log("Native hashchange event detected - hash is now:", window.location.hash);
  refreshBubbleWidget();
}, false);

console.log("Bubble.js: Event listeners registered for hashchange");

document.addEventListener('hiddenhashChangeEvent', function (elem) {
  //alert("refreshBubbleWidget 2")
  //refreshBubbleWidget();
}, false);


function refreshBubbleWidget() {
  /*
  gets hash using the getHash function
  displays bubble chart using displayImpactBubbles function
  based on conditions from hash
  */
    let hash = getHash(); // Includes hiddenhash
    //params = loadParams(location.search,location.hash); // Also used by loadIndustryData()

    //alert("refreshBubbleWidget() naics: " + hash.naics);

    /*
    // GET US

        geo_list[0]=params.geo
    if (geo_list[1]){
      lastgeo=geo_list[1]
      currgeo=geo_list[0]
      if (typeof lastgeo!='undefined'){
        if (lastgeo.includes(",")){
            lastgeo=lastgeo.split(",")
            lastgeo=(lastgeo[0].split("US")[1]).slice(0,2)
        } else {
            lastgeo=(lastgeo.split("US")[1]).slice(0,2)
        }
      }
      if (typeof currgeo!='undefined'){
        if (currgeo.includes(",")){
          currgeo=currgeo.split(",")
          currgeo=(currgeo[0].split("US")[1]).slice(0,2)
        } else {
          currgeo=(currgeo.split("US")[1]).slice(0,2)
        }
      }
    } else {
      lastgeo=[]
      currgeo=geo_list[0]
      if (typeof currgeo!='undefined'){
        if (currgeo.includes(",")){
          currgeo=currgeo.split(",")
          currgeo=(currgeo[0].split("US")[1]).slice(0,2)
        } else {
          currgeo=(currgeo.split("US")[1]).slice(0,2)
        }
      }
    }
    */

    // If state changed, reload indicators first, then display bubbles
    if (priorHash_bubble.state != hash.state) {
        console.log("State changed from", priorHash_bubble.state, "to", hash.state, "- reloading indicators");
        loadIndicatorDropdowns(hash.state, function() {
          displayImpactBubbles(1);
        });
    } else if (priorHash_bubble.geo != hash.geo) {
        displayImpactBubbles(1);
    } else if (priorHash_bubble.naics != hash.naics) {
        displayImpactBubbles(1);
    } else if (priorHash_bubble.x != hash.x || priorHash_bubble.y != hash.y || priorHash_bubble.z != hash.z) {
        displayImpactBubbles(1);
    } else {
      //alert("bubble change")
      // No state, so there won't be red bubbles showing top industries.
      //displayImpactBubbles(1);
    }

    priorHash_bubble = getHash();
}

// Function to refresh the upper-right info panel after state/indicator changes
function refreshInfoPanel() {
  // Only refresh if a bubble is currently selected
  if (sect_list.length === 0) {
    return; // No bubble selected, nothing to refresh
  }

  const selectedSectorCode = sect_list[0];
  console.log("Refreshing info panel for selected sector:", selectedSectorCode);

  // Wait for allData to be available after state change
  waitForVariable('allData', function() {
    // Find the selected sector in the updated allData
    const selectedSector = allData.find(d => {
      const code = (d.code || d.industry_code || "").toUpperCase();
      return code === selectedSectorCode;
    });

    if (!selectedSector) {
      console.log("Selected sector not found in new state data, hiding info panel");
      $("#bubble-click-info").hide();
      $("#impactTextIntro").show();
      sect_list = [];
      return;
    }

    // Get current x, y, z values from dropdowns
    const x = dropdownX.val() || "WATR";
    const y = dropdownY.val() || "GHG";
    const z = dropdownZ.val() || "JOBS";

    // Calculate display values
    const xVal = selectedSector[x] || 0;
    const yVal = selectedSector[y] || 0;
    const zVal = selectedSector[z] || 0;

    const zDisplay = (z === "JOBS" && selectedSector.JOBS_actual !== undefined)
      ? formatWithCommas(selectedSector.JOBS_actual) + " jobs"
      : smartFormat(zVal);

    // Update the info panel with new values
    $("#bubble-click-info").html('<h4>' + selectedSector.name + '</h4>' +
      '<strong>' + z + ':</strong> ' + zDisplay + '<br/>' +
      '<strong>' + y + ':</strong> ' + smartFormat(yVal) + '<br/>' +
      '<strong>' + x + ':</strong> ' + smartFormat(xVal));
    $("#bubble-click-info").show();

    console.log("Info panel refreshed with updated values");
  });
}

// Function to get model name based on state parameter
function getModelName(stateCode) {
  if (!stateCode) {
    return "USEEIOv2.0.1-411"; // Default to national model
  }
  // Convert state code to model name (e.g., IL -> ILEEIOv1.0-s-20)
  return stateCode.toUpperCase() + "EEIOv1.0-s-20";
}

// Function to load top industries for a state and set them in hash for red bubble highlighting
// Follows the pattern used in localsite/info/#state=IL
function loadTopIndustriesForState(stateCode, callback) {
  if (!stateCode) {
    if (callback) callback([]);
    return;
  }
  
  // State ID mapping (same as naics.js)
  const stateIDs = {AL:1,AK:2,AZ:4,AR:5,CA:6,CO:8,CT:9,DE:10,FL:12,GA:13,HI:15,ID:16,IL:17,IN:18,IA:19,KS:20,KY:21,LA:22,ME:23,MD:24,MA:25,MI:26,MN:27,MS:28,MO:29,MT:30,NE:31,NV:32,NH:33,NJ:34,NM:35,NY:36,NC:37,ND:38,OH:39,OK:40,OR:41,PA:42,RI:44,SC:45,SD:46,TN:47,TX:48,UT:49,VT:50,VA:51,WA:53,WV:54,WI:55,WY:56};
  
  const stateUpper = stateCode.toUpperCase();
  const stateFips = stateIDs[stateUpper];
  
  if (!stateFips) {
    console.log("Unknown state code:", stateCode);
    if (callback) callback([]);
    return;
  }
  
  // Load top 20 NAICS codes for the state from community-data
  // This follows the same data source as localsite/info
  // Path: industries/naics/US/country/US-census-naics6-2021.csv (national data with state FIPS filtering)
  const dataUrl = "https://raw.githubusercontent.com/ModelEarth/community-data/master/industries/naics/US/country/US-census-naics6-2021.csv";
  
  d3.csv(dataUrl).then(function(data) {
    console.log("Loaded census data, checking columns:", Object.keys(data[0] || {}));
    console.log("Looking for state FIPS:", stateFips, "Padded:", String(stateFips).padStart(2, '0'));
    
    // Filter data for the specific state FIPS - columns are: Fips, Naics, Establishments, Employees, Payroll
    const stateData = data.filter(d => {
      const fipsValue = d.Fips || d.fips || d.FIPS || d.state_fips || d.STATE_FIPS;
      return fipsValue === String(stateFips).padStart(2, '0') || fipsValue === String(stateFips);
    });
    
    console.log("Filtered to", stateData.length, "rows for state", stateUpper);
    
    if (stateData.length === 0) {
      console.log("No data found for state FIPS:", stateFips, "- trying without filtering");
      // Fallback: just use top 20 from all data (better than nothing)
      const sorted = data.sort((a, b) => (parseFloat(b.Employees) || parseFloat(b.Payroll) || 0) - (parseFloat(a.Employees) || parseFloat(a.Payroll) || 0));
      const topNaics = sorted.slice(0, 20).map(d => d.Naics || d.naics || d.NAICS).filter(Boolean);
      console.log("Using top 20 industries from national data:", topNaics.slice(0, 5), "...");
      if (callback) callback(topNaics);
      return;
    }
    
    // Sort by employment (Employees column) and take top 20
    const sorted = stateData.sort((a, b) => (parseFloat(b.Employees) || parseFloat(b.Payroll) || 0) - (parseFloat(a.Employees) || parseFloat(a.Payroll) || 0));
    const topNaics = sorted.slice(0, 20).map(d => d.Naics || d.naics || d.NAICS).filter(Boolean);
    
    console.log("Loaded top 20 industries for " + stateUpper + " (FIPS " + stateFips + "):", topNaics.slice(0, 5), "...");
    
    if (callback) callback(topNaics);
  }).catch(error => {
    console.log("Could not load state industries from community-data:", error);
    if (callback) callback([]);
  });
}

let indicators = new Set();
let dropdownX = $("#graph-picklist-x");
let dropdownY = $("#graph-picklist-y");
let dropdownZ = $("#graph-picklist-z");
let currentModelName = null; // Track the currently loaded model

/**
 * Maps NAICS codes to v2 USEEIO sector codes
 * v2 sectors use codes like "111CA", "311FT" where first 3-6 digits match NAICS
 * 
 * @param {Array} naicsCodes - Array of 6-digit NAICS codes
 * @param {Array} sectorData - Array of sector objects with 'code' property
 * @returns {Array} - Array of matching v2 sector codes
 */
function mapNaicsToV2Sectors(naicsCodes, sectorData) {
  const sectorCodes = new Set();
  
  naicsCodes.forEach(naicsCode => {
    if (!naicsCode) return;
    
    // Try matching with 3, 4, 5, or 6 digit prefixes
    const naicsStr = String(naicsCode);
    
    // Find sectors that start with this NAICS code (or vice versa)
    sectorData.forEach(sector => {
      const sectorCode = sector.code;
      
      // Extract numeric part from sector code (e.g., "111CA" -> "111")
      const sectorNumeric = sectorCode.match(/^\d+/);
      if (sectorNumeric) {
        const sectorPrefix = sectorNumeric[0];
        
        // Check if NAICS starts with sector prefix or vice versa
        if (naicsStr.startsWith(sectorPrefix) || sectorPrefix.startsWith(naicsStr.substring(0, 3))) {
          sectorCodes.add(sectorCode);
        }
      }
    });
  });
  
  return Array.from(sectorCodes);
}

/**
 * Loads indicator dropdowns for a specific state model
 * This function is called both on initial load and when state changes
 */
function loadIndicatorDropdowns(state, callback) {
  let {x, y, z} = getHash();
  
  // Set default indicator codes if not provided in hash
  // Using indicators confirmed to exist in v2 state models

  if (!x) x = "WATR"; // Freshwater withdrawals (default X-axis) 
  if (!y) y = "GHG";  // Greenhouse Gases (default Y-axis)
  if (!z) z = "JOBS"; // Jobs (default bubble size)
  
  console.log("loadIndicatorDropdowns - Using indicators - x:", x, "y:", y, "z:", z);
  
  const modelName = getModelName(state);
  
  // Skip reloading if same model (optimization)
  if (modelName === currentModelName && dropdownX.children().length > 0) {
    console.log("Indicators already loaded for model:", modelName);
    if (callback) callback();
    return;
  }
  
  currentModelName = modelName;
  // Fetch directly from useeio-json repository
  const endpoint = 'https://raw.githubusercontent.com/ModelEarth/useeio-json/main/models/2020';
  const indicatorsUrl = endpoint + "/" + modelName + "/indicators.json";

  console.log("Loading indicators from model: " + modelName);

  // Store current selections before rebuilding
  const currentX = dropdownX.val() || x;
  const currentY = dropdownY.val() || y;
  const currentZ = dropdownZ.val() || z;

  fetch(indicatorsUrl)
    .then(response => response.json())
    .then(data => {
      // Build options in memory first to avoid flicker
      const optionsX = [];
      const optionsY = [];
      const optionsZ = [];
      const newIndicators = new Set();

      data.forEach(d => {
        // Filter out indicators with incomplete data (HCAN, HNCN had issues in older versions)
        // Keeping GHG now since we have v2 data with complete values
        if (d.code != "HCAN" && d.code != "HNCN" && d.code != "CRHW" && d.code != "CCDD") {
          optionsX.push($("<option></option>").attr("value", d.code).text(d.name));
          optionsY.push($("<option></option>").attr("value", d.code).text(d.name));
          optionsZ.push($("<option></option>").attr("value", d.code).text(d.name));
          newIndicators.add(d.code);
        }
      });

      // Now update dropdowns all at once (reduces flicker)
      dropdownX.empty().append(optionsX);
      dropdownY.empty().append(optionsY);
      dropdownZ.empty().append(optionsZ);
      indicators.clear();
      newIndicators.forEach(ind => indicators.add(ind));

      // Set dropdown values to match the hash (or defaults if not in hash)
      console.log("Attempting to set dropdowns to - X:", x, "Y:", y, "Z:", z);
      console.log("Available indicator options:", Array.from(indicators));

      dropdownX.val(x);
      dropdownY.val(y);
      dropdownZ.val(z);
      
      console.log("Dropdown values after setting - X:", dropdownX.val(), "Y:", dropdownY.val(), "Z:", dropdownZ.val());
      
      // Verify the dropdowns have the selected options and fallback to first available if invalid
      if (!dropdownX.val()) {
        console.warn("WARNING: X-axis dropdown value is empty! Tried to set:", x, "- Falling back to WATR");
        dropdownX.val("WATR");
      }
      if (!dropdownY.val()) {
        console.warn("WARNING: Y-axis dropdown value is empty! Tried to set:", y, "- Falling back to GHG");
        dropdownY.val("GHG");
      }
      if (!dropdownZ.val()) {
        console.warn("WARNING: Z-axis dropdown value is empty! Tried to set:", z, "- Falling back to JOBS");
        dropdownZ.val("JOBS");
      }
      
      if (callback) callback();
    })
    .catch(error => {
      console.error("Error loading indicators:", error);
      if (callback) callback();
    });
}

/** Main entry point to load the bubble chart. Loads refreshBubbleWidget() */
$(document).ready(function () {
  let {state} = getHash();
  console.log("Document ready - initial state:", state);
  
  // Load indicators and then refresh bubble widget
  loadIndicatorDropdowns(state, refreshBubbleWidget);
});

//initialising variables for bubble chart
var parentId = "#graph-wrapper";
var animDuration = 1200;
var margin = {top: 40, right: 50, bottom: 68, left: 95};
var width = 1000 - margin.left - margin.right
var height = 450 - margin.top - margin.bottom;
var xScale, yScale, zScale, line;
var myTickFormat, xAxis, yAxis;
var rolloverDiv;
var bubbleSvg, bubbleGradient;

function getDimensions(x,y,z, callback) {
  var returnX=[];
  var returnY=[];
  var returnZ=[];
  var returnPairs = [];
  waitForVariable('allData', function() {
    if (allData) {
      allData.forEach(function(d){
        var pair = {x: d[x], y: d[y], z: d[z], ...d}; // CUSTOM, appended year for chart, the rest for popup
        returnPairs.push(pair);
        returnX.push(d[x]);
        returnY.push(d[y]);
        returnZ.push(d[z]);
      });
      console.log("getDimensions in io/charts/bubble/js/bubble.js returns x,y,z");
      //console.log(allData);
      //return {x:returnX,y:returnY,z:returnZ,pairs:returnPairs};
      callback({x:returnX,y:returnY,z:returnZ,pairs:returnPairs});
    } else {
      console.log("ERROR: Bubble.js allData undefined.");
    }
  });
}

//TODO: Check if the function is required
function updateTitle(x,y,z) {
  return; // Not currently adding extra title

  var unitx, unity, unitz;
  console.log("updateTitle " + x + " " + y + " " + z);
  //let params = loadParams(location.search,location.hash);
  d3.json("/io/build/api/USEEIOv2.0.1-411/indicators.json").then(function(consdata){
    console.log("attempt");
    var filteredData = consdata.filter(function(d) {
      if (d["id"]==x) {
        unitx=d["unit"]
      }
      if (d["id"]==y) {
        unity=d["unit"]
      }
      if (d["id"]==z) {
        unitz=d["unit"]
      }
    })
    $(document).ready(function () { 
      if (dataObject1.stateshown==13){
        document.getElementById("bubble-graph-title").innerHTML = "Comparison of 3 indicators for Georgia Industries - X: " + hash.x + " &nbsp;Y: " + hash.y + " &nbsp;Z: " + hash.z;
      } else {
        document.getElementById("bubble-graph-title").innerHTML = "US Industries"
      }
      //$("#impactText").html(z + "<br>" + y + "<br>" + x);
      //$("#impactText2").html(z + "<br>" + y + "<br>" + x); // Using jquery avoid error if element is not in page.
      document.getElementById("unit-x").innerHTML = unitx;
      document.getElementById("unit-y").innerHTML = unity;
      document.getElementById("unit-z").innerHTML = unitz;
    });
  })
}


// returns slope, intercept and r-square of the line
//Pulled from http://bl.ocks.org/benvandyke/8459843
function leastSquares(xSeries, ySeries) {
  var reduceSumFunc = function(prev, cur) { return prev + cur; };
  
  var xBar = xSeries.reduce(reduceSumFunc) * 1.0 / xSeries.length;
  var yBar = ySeries.reduce(reduceSumFunc) * 1.0 / ySeries.length;

  var ssXX = xSeries.map(function(d) { return Math.pow(d - xBar, 2); })
    .reduce(reduceSumFunc);
  
  var ssYY = ySeries.map(function(d) { return Math.pow(d - yBar, 2); })
    .reduce(reduceSumFunc);
    
  var ssXY = xSeries.map(function(d, i) { return (d - xBar) * (ySeries[i] - yBar); })
    .reduce(reduceSumFunc);
    
  var slope = ssXY / ssXX;
  var intercept = yBar - (xBar * slope);
  var rSquare = Math.pow(ssXY, 2) / (ssXX * ssYY);
  
  return [slope, intercept, rSquare];
}

//http://snipplr.com/view/37687/random-number-float-generator/
function randomFloatBetween(minValue,maxValue,precision){
    if (typeof(precision) == 'undefined'){
        precision = 2;
    }
    return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue).toFixed(precision));
}

// Smart formatting function for small values
function smartFormat(value) {
  if (Math.abs(value) < 0.01) {
    return value.toFixed(6); // Show 6 decimals for very small values
  } else if (Math.abs(value) < 0.1) {
    return value.toFixed(4); // Show 4 decimals for small values
  } else if (Math.abs(value) < 1) {
    return value.toFixed(3); // Show 3 decimals for values < 1
  } else {
    return value.toFixed(2); // Show 2 decimals for larger values
  }
}

// Helper function to format large numbers with commas (for actual job counts)
function formatWithCommas(value) {
  if (value === null || value === undefined || isNaN(value)) return "N/A";

  // Round to whole number for job counts
  const rounded = Math.round(value);

  // Add commas as thousands separators
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//"draw" the line with many points respecting the calculated bubble-graph-equation
function calculateLineData(leastSquares,xRange,iterations){
  var returnData = [];
  for(var i=0; i<iterations; i++){
    var randomX = randomFloatBetween(xRange[0],xRange[1]);
    returnData.push({
      xVal:randomX,
      yVal: (randomX*leastSquares[0])+leastSquares[1]
    });
  }
  return returnData;
}

$(document).on("click", "#mySelect", function(event) {
//document.getElementById("mySelect").onchange = function() { // "mySelect" comes from info-template, which might not be loaded into DOM yet.
  $("#mySelect").toggle(this.checked);
  let hash = getHash();
  toggleBubbleHighlights(hash);
});

// Called from localsite naics.js
function toggleBubbleHighlights(hash) {
  //alert("toggleBubbleHighlights")
  // Get x, y, z from dropdowns, or use defaults if dropdowns not populated yet
  let xVal = dropdownX.val() || hash.x || "WATR";
  let yVal = dropdownY.val() || hash.y || "GHG";
  let zVal = dropdownZ.val() || hash.z || "JOBS";
  
  if (document.getElementById("mySelect").checked){
    console.log("mySelect checked");
    // Show for region
    midFunc(xVal, yVal, zVal, hash, "region")
    //document.querySelector('#sector-list').setAttribute('area', 'GAUSEEIO');
  } else {
    console.log("mySelect unchecked");
    // Show for all
    midFunc(xVal, yVal, zVal, hash, "all")
    //document.querySelector('#sector-list').setAttribute('area', 'USEEIO');
  }
}


var allData;
let geo_list={};
counter=0;

function displayImpactBubbles(attempts) {
  /*
  Function to display the bubble chart
  */
  if (typeof customD3loaded !== 'undefined') {
    //if (typeof customD3loaded === 'undefined') {
    //  console.log("BUGBUG: D3 not yet available"); // Could loop again if/when this occurs
    //}
    console.log("displayImpactBubbles - io repo");
    
    if (typeof bubbleGradient === 'undefined') {
      // Avoid calling declarations twise. Loading other twice so rollover works.

      xScale = d3.scaleLog()
        .range([0,width])
        .clamp(true);

      yScale = d3.scaleLog()
        .range([height, 0])
        .clamp(true);

      zScale = d3.scalePow()
        .exponent(0.2)
          .range([2,40]);

      line = d3.line();

      //Formating the Ticks on Axes
      myTickFormat = function (d) {//Logic to reduce big numbers
        var f = d3.format(".1f");
        var limits = [1000000000, 1000000, 1000];
        var shorteners = ['B','M','K'];
        if (d>=1000){
          for(var i in limits) {
            if (d > limits[i]) {
              d=(d/limits[i]).toFixed(2) + shorteners[i];
              break;
            }
          }
        }else if (d>=0.000001 && d<1000){
          d=parseFloat((d).toFixed(7).toString())
        } else {
          for(j=-6;j>=-24;j--){
            if (d>=Math.pow(10,j-1) && d<Math.pow(10,j)){
              d=(d*Math.pow(10,1-j)).toFixed(1)+"*10^-"+(1-j)
            }
          }
          
        }
        return d;
      };

      xAxis = d3.axisBottom()
        .scale(xScale)
        .tickSize(-height)
        .tickPadding(8)
        .ticks(8,myTickFormat);

      yAxis = d3.axisLeft()
        .scale(yScale)
        .tickSize(-width)
        .tickPadding(8)
        .ticks(5,myTickFormat);

      // For rollover popup
      rolloverDiv = d3.select(parentId).append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      bubbleSvg = d3.select(parentId).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id","svg-parent")
        .append("g")
        .attr("id","graph-plane")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      bubbleSvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height) + ")")
        .call(xAxis.ticks(8,myTickFormat))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)").style("text-anchor", "start");

      bubbleSvg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate("  +0+ ",0)")
        .call(yAxis.ticks(5,myTickFormat));

      bubbleSvg.append("path")
        .attr("class","trendline")
        .attr("stroke-width", 1)
        .style("stroke","steelblue")
        .style("fill","none");

      bubbleGradient = bubbleSvg.append("svg:defs")
        .append("svg:radialGradient")
        .attr("id", "gradient")
        .attr("cx", "50%")    //The x-center of the gradient
        .attr("cy", "50%")    //The y-center of the gradient
        .attr("r", "50%")  //The radius of the gradient
        .attr("spreadMethod", "pad");

      bubbleGradient.append("svg:stop")
        .attr("offset", "0%")
        .attr("stop-color", "#F6BDC0")
        .attr("stop-opacity", 1);

      bubbleGradient.append("svg:stop")
        .attr("offset", "100%")
        .attr("stop-color", "red")
        .attr("stop-opacity", 1);

    }


    let hash = getHash();

    // Determine which model to use based on state parameter
    const modelName = getModelName(hash.state);
    
    // Fetch directly from useeio-json repository following pattern in profile/footprint/js/config.js
    const endpoint = 'https://raw.githubusercontent.com/ModelEarth/useeio-json/main/models/2020';
    const apiBase = endpoint + "/" + modelName;
    
    console.log("Bubble.js Loading v2 model: " + modelName + " from GitHub");
    
    // Load sectors and matrix data from JSON API
    // Also load D matrix and q vector for calculating actual job quantities
    Promise.all([
      fetch(apiBase + "/sectors.json").then(r => r.json()),
      fetch(apiBase + "/matrix/N.json").then(r => r.json()),
      fetch(apiBase + "/indicators.json").then(r => r.json()),
      fetch(apiBase + "/matrix/D.json").then(r => r.json()),
      fetch(apiBase + "/matrix/q.json").then(r => r.json())
    ]).then(([sectors, matrixN, indicatorsData, matrixD, vectorQ]) => {
      
      console.log("Loaded " + sectors.length + " sectors from " + modelName);
      
      // Build allData array from sectors and matrix
      // Filter to only show state-specific sectors (not RoUS) if state is specified
      const filteredSectors = hash.state 
        ? sectors.filter(s => s.location === 'US-' + hash.state.toUpperCase())
        : sectors;
      
      console.log("Displaying " + filteredSectors.length + " sectors (filtered by location)");
      
      // Find JOBS indicator index for special handling
      const jobsIndicatorIndex = indicatorsData.findIndex(ind => ind.code === 'JOBS');

      allData = filteredSectors.map((sector, idx) => {
        const sectorData = {
          id: sector.id,
          code: sector.code,
          name: sector.name,
          location: sector.location,
          index: sector.index
        };

        // Add indicator values from matrix N
        indicatorsData.forEach(indicator => {
          const indicatorIndex = indicatorsData.findIndex(ind => ind.code === indicator.code);
          if (indicatorIndex !== -1 && matrixN && matrixN[indicatorIndex]) {
            sectorData[indicator.code] = matrixN[indicatorIndex][sector.index] || 0;
          }
        });

        // Calculate actual JOBS quantity: jobs = q[sector] × D[JOBS][sector]
        // This gives us actual job count instead of jobs-per-dollar
        if (jobsIndicatorIndex !== -1 && matrixD && vectorQ &&
            matrixD[jobsIndicatorIndex] && vectorQ[sector.index]) {
          const jobCoefficient = matrixD[jobsIndicatorIndex][sector.index] || 0;
          const output = vectorQ[sector.index][0] || 0; // q is array of arrays [[value1], [value2], ...]
          const actualJobs = output * jobCoefficient;

          // Store both the coefficient (for bubble size) and actual count (for display)
          sectorData['JOBS_actual'] = actualJobs;
          sectorData['JOBS_coefficient'] = jobCoefficient;
        }

        return sectorData;
      });
      
      console.log("Built allData with " + allData.length + " sectors");
      console.log("First sector sample:", allData[0]);
      console.log("Indicators available:", indicatorsData.map(i => i.code).slice(0, 5));
      
      // Load top industries for state to enable red bubble highlighting
      // Only if state is specified and naics not already in hash
      if (hash.state && !hash.naics) {
        loadTopIndustriesForState(hash.state, function(topNaics) {
          if (topNaics && topNaics.length > 0) {
            // Map NAICS codes to v2 sector codes for highlighting
            const topSectorCodes = mapNaicsToV2Sectors(topNaics, allData);
            if (topSectorCodes.length > 0) {
              hiddenhash.topSectors = topSectorCodes; // Store sector codes for highlighting
              console.log("Mapped " + topNaics.length + " NAICS to " + topSectorCodes.length + " v2 sectors:", topSectorCodes.slice(0, 5));
            }
          }
          applyToBubbleHTML(hash, 1);
        });
    } else {
        applyToBubbleHTML(hash, 1);
      }
      
    }).catch(error => {
      console.error("Error loading bubble chart data:", error);
      console.log("Attempted to load from: " + apiBase);
    });

  } else if (attempts<100) { // Wait 10th of a second and try again.
    setTimeout( function() {
      consoleLog("try displayImpactBubbles again")
      displayImpactBubbles(attempts+1);
    }, 100 );
  } else {
    consoleLog("ERROR: displayImpactBubbles exceeded 100 attempts.");
  }
};

function applyToBubbleHTML(hash,attempts) {

  console.log("wait for #bubble-graph-id");
  waitForElm('#bubble-graph-id').then((elm) => {

    //if ($('#bubble-graph-id').length > 0) {

      console.log("#bubble-graph-id found. Attempts: " + attempts)
      if(hash.state) {
        $('#bubble-graph-id').show();
      } else {
        // We are probably missing a list of all the naics when there is no state.
        // Prior to changes in localsite/js/naics.html, we were able to load a bubble chart with no red bubbles highlighted.
        // Swithcing to 73 sectors next.
      }
      
      // Dropdown values are already set in $(document).ready(), don't override them here
      // This prevents the dropdowns from being reset when data loads
      console.log("displayImpactBubbles - dropdown values:", dropdownX.val(), dropdownY.val(), dropdownZ.val());
      
      // Trigger chart update after data loads (needed for state changes)
      console.log("Calling toggleBubbleHighlights to redraw chart");
      toggleBubbleHighlights(hash);

      // Refresh info panel after chart redraws (for state changes)
      setTimeout(function() {
        refreshInfoPanel();
      }, 200); // Small delay to ensure chart rendering completes

      d3.selectAll(".graph-picklist").on("change",function(){
        // Update hash and trigger hashChange event. Resides in localsite.js
        goHash({ "x": dropdownX.val(), "y": dropdownY.val(), "z": dropdownZ.val()});

        // Refresh info panel when indicators change
        setTimeout(function() {
          refreshInfoPanel();
        }, 200);
        //updateChart(d3.select("#graph-picklist-x").node().value,
        ///  d3.select("#graph-picklist-y").node().value,
        //  d3.select("#graph-picklist-z").node().value);
      }) 

    /*
    } else if (attempts <= 100) {

      //alert("Bubble HTML #bubble-graph-id not available yet.");
      setTimeout( function() {
        consoleLog("try applyToBubbleHTML again")
        applyToBubbleHTML(hash,attempts+1);
      }, 20 );

    } else {
      consoleLog("applyToBubbleHTML failed");
      consoleLog("applyToBubbleHTML failed. Attempts: " + attempts);
    }
    */
    

  });

}


//not used here
/*
var ordinalDomain = ["1-100m", "100-500m", "500m-1km", "1-5km", "5-10km", "Over 10km"];
var ordinal = d3.scaleOrdinal() // Becomes scaleOrdinal in v4
  .domain(ordinalDomain)
  .range(["blue","#7479BC","#BDE7AE","#ECF809","orange","magenta"]); // Not in use here, from wind/js/regression.js
*/

function midFunc(x,y,z,hash,boundry) {
  /*
  Inputs:
    x,y,z: parameters for the x, y & z axis of the bubble chart (z axis is the radius of the bubbles)
    hash: data hash fetched from getHash function
    boundry: string input for boundry
  Action:
    checks hash.naics
    parses hash.naics into a list
    creates useeioList & useeiodetail from naics list
    updates the bubble chart
  */
  console.log("midFunc boundry: " + boundry);
  //let hash = getHash(); // includes hiddenhash

  if (hash.naics) {
    $(".switch-text").show();
  } else {
    $(".switch-text").hide();
  }
  //alert("hash.x " + hash.x + " midFunc hiddenhash.naics in bubble.js: " + hiddenhash.naics);
  //alert("iBubble.priorHash.x " + iBubble.priorHash.x);

  // TEMP! Remove this line.
  //hash.naics = "541512,622110,551114,541330,541611,621111,541511,541712,522110,722511,517110,561320,541110,441110,541513,445110,518210,511210,541211,541519,722513";

  // BUG - This prevented toggle - Moved to hashchange above
  //if (hash.naics != iBubble.priorHash.naics || hash.x != iBubble.priorHash.x || hash.y != iBubble.priorHash.y || hash.z != iBubble.priorHash.z) {
    console.log("midFunc hash.naics change in bubble.js from getHash(): " + hash.naics);
    if (hash.naics) {
      naicsList = hash.naics.split(",");
      useeioList = [];
      useeiodetail = [];
      // TO DO: Add a path root here
      d3.csv("/io/charts/bubble/data/Crosswalk_MasterCrosswalk.csv").then( function(consdata) {
        var filteredData = consdata.filter(function(d) {
          for(i=0;i<naicsList.length;i++){
            if (d["2012_NAICS_Code"]==naicsList[i]) {
                useeioList.push(d["USEEIO1_Code"])
                useeiodetail.push(d["USEEIO1_Commodity"])
            }
          }
        })
        updateChart(x,y,z,useeioList,boundry);
      })
    } else {
      updateChart(x,y,z,[],boundry);
    }
  //}
  iBubble.priorHash = jQuery.extend(true, {}, hash); // Make a detached copy of hash object
}

function updateChart(x,y,z,useeioList,boundry) {
  /*
  Inputs:
    x,y,z: parameters for the x, y & z axis of the bubble chart (z axis is the radius of the bubbles)
    useeioList: List created from parsed hash.naics in the midFunc function
    boundry: string input for boundry
  Action:
    Assigns x, y, z to parameters if they are not already defined
    Does several checks to determine chart details 
    (many checks result in hard coded colors & css properties which may vary depending on the situation)
    (currently the hard coded colors are consistent on all runs --> this might change need to keep a lookout fot this)
    updates the bubble chart
  */
  consoleLog("updateChart " + x + " hiddenhash.naics in bubble.js: " + hiddenhash.naics);
  waitForVariable('allData', function() {
    //alert("Got allData in updateChart: " + allData);
    console.log("Got allData in updateChart...");
    console.log(allData); // 301 Industries
    if (!(x && y && z)) { // Same as above
      x = 'ENRG';
      y = 'WATR';
      z = 'JOBS';
    }

    //Fetch data
    //var records = getDimensions(x,y,z);
    updateTitle(x,y,z);
    x1=x;
    y1=y;
    z1=z;
    boundry1=boundry;
    useeioList1=useeioList;

    //if (records) {
    //waitForVariable('records', function() {
    getDimensions(x,y,z, function(records) {
      //console.log("ERROR bubble.js no records ");
      //return;
      
      (records.y).sort(function(a,b){return a-b});
      var l = (records.y).length;
      var low = Math.round(l * 0.010);
      var high = l - low;
      records.y = (records.y).slice(low,high);

      (records.x).sort(function(a,b){return a-b});
      var l = (records.x).length;
      var low = Math.round(l * 0.010);
      var high = l - low;
      records.x = (records.x).slice(low,high);
      
      yScale.domain(d3.extent(records.y));
      xScale.domain(d3.extent(records.x));
      zScale.domain(d3.extent(records.z));
      //re-assign data (or assign new data)
      

      var selectedCircles = d3.select("#graph-plane")
        .selectAll(".circles")
        .data(records.pairs)
        .attr('pointer-events', 'auto');

      //give a transition on the existing elements
      //set css styles based on data & select conditions
      selectedCircles
        .transition().duration(animDuration)
        .attr("transform",function(d){return "translate("+xScale(d.x)+","+yScale(d.y)+")";})
        .attr("r",function(d){
          return zScale(d.z)+2
        })
        .style('fill', function (d) { 
          if (boundry1=="region"){
            // Check if this sector is in the top industries list (v2 uses sector codes)
            const topSectors = hiddenhash.topSectors || [];
            const sectorCode = d.code || d.industry_code;
            if (useeioList1.length>0 || topSectors.length>0){
              if (d3.select(this).attr("class")=="circles" || d3.select(this).attr("class")==null){
                if (useeioList1.includes(d.code) || topSectors.includes(sectorCode)) {
                  return "url(#gradient)";
                } else {
                  return "#aaa";
                }
              } else { return colors[d3.select(this).attr("class").split("circles selected")[1]]}
            } else {
              if (d3.select(this).attr("class")=="circles" || d3.select(this).attr("class")==null){
                  //return "#303030";
                  return "#aaa";
              } else { return colors[d3.select(this).attr("class").split("circles selected")[1]]}
            }
          } else {
            if (d3.select(this).attr("class")=="circles" || d3.select(this).attr("class")==null){
              //return "url(#gradient)";
              return "#ccc";
            } else {
              //return colors[d3.select(this).attr("class").split("circles selected")[1]]
              return "#ccc";
            }
          }
        })
        .style("stroke","black")
        .attr("stroke-width", function (d) { 
          if (d3.select(this).attr("class")=="circles" || d3.select(this).attr("class")==null){
            return 1;
          } else {return 6}
        })
        .attr("stroke-opacity", function (d) { 
          if (d3.select(this).attr("class")=="circles" || d3.select(this).attr("class")==null){
            return 0.7;
          } else {
              return 1;
          }
        })
        .style("fill-opacity" , function (d) { 
          if (d3.select(this).attr("class")=="circles" || d3.select(this).attr("class")==null){
            return 0.5;
          } else {
              return 1;
          }
        })
      
        //Append any new elements and transition them as well
        // BUGBUG - load occurs initially, but none of the following until the second time called.
        selectedCircles.enter()
        .append("circle")
        .style('fill', function (d) { 
          if (boundry1=="region"){
            // Check if this sector is in the top industries list (v2 uses sector codes)
            const topSectors = hiddenhash.topSectors || [];
            const sectorCode = d.code || d.industry_code;
            if (useeioList1.length>0 || topSectors.length>0){
              if (d3.select(this).attr("class")=="circles" || d3.select(this).attr("class")==null){
                if (useeioList1.includes( d.industry_code) || topSectors.includes(sectorCode)) {
                  return "url(#gradient)";
                } else {
                  return "#aaa";
                }
              } else {return colors[d3.select(this).attr("class").split("circles selected")[1]]}
            } else {
              if (d3.select(this).attr("class")=="circles" || d3.select(this).attr("class")==null){
                return "#303030";
              } else {
                return colors[d3.select(this).attr("class").split("circles selected")[1]];
              }
            }
          } else {
            if (d3.select(this).attr("class")=="circles" || d3.select(this).attr("class")==null){
              return "url(#gradient)";
            } else {
              return colors[d3.select(this).attr("class").split("circles selected")[1]];
            }
          }
        })
        .attr("stroke-width", function (d) { 
          if (d3.select(this).attr("class")=="circles" || d3.select(this).attr("class")==null){
            return 1;
          } else {
            return 6;
          }
        })
        .attr("stroke-opacity", function (d) { 
          if (d3.select(this).attr("class")=="circles" || d3.select(this).attr("class")==null){
            return 0.7;
          } else {
            return 1;
          }
        })
        .style("fill-opacity" , function (d) { 
          if (d3.select(this).attr("class")=="circles" || d3.select(this).attr("class")==null){
            return 0.5;
          } else {
            return 1;
          }
        })
        .on("mouseover", function(d) {
          //alert("mouse")
          if (d3.select(this).attr("class")=="circles" || d3.select(this).attr("class")==null){
            d3.select(this)
            .transition()
            .style("fill-opacity",1)
            .attr('stroke-width', 4)
            .attr("stroke-opacity", 1)
          }
          rolloverDiv.transition()
            .duration(200)
            .style("opacity", .9);

          // For JOBS indicator, show actual job count instead of coefficient
          const zDisplay = (z1 === "JOBS" && d.JOBS_actual !== undefined)
            ? formatWithCommas(d.JOBS_actual) + " jobs"
            : smartFormat(d.z);

          rolloverDiv.html('<span style="color: black" >'+"<b style='font-size:1.3em'>" + d.name + "</b><br/><b> " +x1+":</b> "+smartFormat(d.x)+ "<br/><b> " +y1+":</b> "+ smartFormat(d.y) + "<br/><b>" +z1+":</b> "+ zDisplay +'</span >')
            .style("left", (d3.event.pageX + 6) + "px")
            .style("top", (d3.event.pageY + 6) + "px");                     
        })
        .on("click", function(d,i) {
          // Single-selection mode: deselect previous bubble without redrawing ALL bubbles
          d3.selectAll(".circles.selected")
            .classed("selected", false)
            .attr("data-selected-stroke", null)  // Clear the saved stroke color
            .transition()
            .duration(200)
            .style("fill-opacity", 0.5)
            .style("stroke-width", "1px")  // Use .style() to override CSS
            .style("stroke-opacity", 0.7)
            .style("stroke", "black");  // Reset to black with .style()

          // Select the clicked bubble (keep original fill color with subtle highlight)
          d3.select(this)
            .classed("selected", true)
            .attr("data-selected-stroke", "#333")  // Store the stroke color we want
            .style("fill-opacity", 1)
            .style("stroke-width", "3px")  // Use .style() to override CSS
            .style("stroke-opacity", 1)
            .style("stroke", "#333");  // Use .style() to override CSS

          // Display info in upper right corner (replace, not append)
          $("#impactTextIntro").hide();

          // For JOBS indicator, show actual job count instead of coefficient
          const zClickDisplay = (z1 === "JOBS" && d.JOBS_actual !== undefined)
            ? formatWithCommas(d.JOBS_actual) + " jobs"
            : smartFormat(d.z);

          // Build info display with Z-axis (bubble size) first, then Y, then X
          $("#bubble-click-info").html('<h4>' + d.name + '</h4>' +
            '<strong>' + z1 + ':</strong> ' + zClickDisplay + '<br/>' +
            '<strong>' + y1 + ':</strong> ' + smartFormat(d.y) + '<br/>' +
            '<strong>' + x1 + ':</strong> ' + smartFormat(d.x));
          $("#bubble-click-info").show();
          $("#impact-chart").show();
          create_bar(d,x,y,z,x1,y1,z1);

          // Fix: use d.code with safety check (v2 uses 'code', not 'industry_code')
          const sectorCode = d.code || d.industry_code;
          if (sectorCode) {
            sect_list = [sectorCode.toUpperCase()]; // Replace array, not append (single selection)
          }
          console.log("Selected sector: " + sect_list);
          //document.querySelector('#sector-list').setAttribute('sector', sect_list);
        })
        .on("mouseout", function(d) {
          if (d3.select(this).attr("class")=="circles" || d3.select(this).attr("class")==null){
            d3.select(this)
            .transition()
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.7)
            .style("fill-opacity" , 0.5)
          } 
          rolloverDiv.transition()
            .duration(500)
            .style("opacity", 0);
                          
        })

        .attr("class","circles")
        .attr("r",function(d){
          return zScale(d.z)+2
        })
        .style("stroke", function() {
          // Preserve stroke color for selected bubbles using stored attribute
          const savedStroke = d3.select(this).attr("data-selected-stroke");
          return savedStroke ? savedStroke : "black";
        })
        .attr("stroke-opacity", function() {
          // Preserve stroke opacity for selected bubbles
          return d3.select(this).classed("selected") ? 1 : 0.7;
        })
        .style("fill-opacity", function() {
          // Preserve fill opacity for selected bubbles
          return d3.select(this).classed("selected") ? 1 : 0.5;
        })
        .transition().duration(animDuration)
        .attr("transform",function(d){return "translate("+xScale(d.x)+","+yScale(d.y)+")";});

        //Remove any dom elements which are no longer data bound
        selectedCircles.exit().remove();
                    
        //Update Axes
        d3.select(parentId).select(".x.axis").transition().duration(animDuration).call(xAxis.ticks(8,myTickFormat))
          .selectAll("text").attr("y", 0)
          .attr("x", 9)
          .attr("dy", ".35em")
          .attr("transform", "rotate(90)").style("text-anchor", "start");
        d3.select(parentId).select(".y.axis").transition().duration(animDuration).call(yAxis.ticks(5,myTickFormat));

      }); // End waitForVariable('records')
    }); // End waitForVariable('allData')
  } // End updateChart()

  //create the custom vertical 3 line barchart
  //TODO: check if the bar chart is disabled in the website
  function create_bar(d,x,y,z,x1,y1,z1){
    d3.select("#selected_bar").remove();
    var svg3 = d3.select("#barchart")
      .append("svg")
      .attr("width", width)
      .attr("height", 380)
      .attr("class", "bar-chart")
      .attr('id', 'selected_bar');
    maxim=Math.max(d.x,d.y,d.z)      
    var rect_scale = d3.scaleLinear().range([300,0]).domain([maxim,0]);
    var axis_scale = d3.scaleLinear().range([300,0]).domain([0,maxim]);
    var other_scale = d3.scaleBand().range([0, 300]).domain([x1,y1,z1]);
    var chart_2 = svg3.append('g').attr('class', 'y axis')
      .attr('transform', 'translate(325, 60)').call(d3.axisLeft(axis_scale));

    chart_2.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,300)').call(d3.axisBottom(other_scale));

    chart_2.append("text")
      .attr('class', 'label')
      .attr("transform", "translate(150, 350)")
      .text("Attr").attr("fill", "black").style("font-size", "25px");

    chart_2.append("text")
      .attr('class', 'title')
      .style('text-anchor','middle')
      .attr('transform', 'translate(130,-30)')
      .text( d.name)
      .attr("fill", "black").style("font-size", "20px");

    svg3.append("rect").attr("y", 360 - rect_scale(d.x)).attr("x", 355)
      .attr("width", 50).attr("height", rect_scale(d.x)).attr("fill", "red");

    svg3.append("rect").attr("y", 360 - rect_scale(d.y)).attr("x", 450)
      .attr("width", 50).attr("height", rect_scale(d.y)).attr("fill", "green");

    svg3.append("rect").attr("y", 360 - rect_scale(d.z)).attr("x", 550)
      .attr("width", 50).attr("height", rect_scale(d.z)).attr("fill", "blue");

}

//TODO: check if implemented anywhere
function clearBubbleSelection(){
  // Clear selection with transition (matches click behavior)
  d3.selectAll(".circles.selected")
    .classed("selected", false)
    .attr("data-selected-stroke", null)  // Clear the saved stroke color
    .transition()
    .duration(200)
    .style("fill-opacity", 0.5)
    .style("stroke-width", "1px")  // Use .style() to override CSS
    .style("stroke-opacity", 0.7)
    .style("stroke", "#000");  // Reset to default black stroke with .style()

  // Hide info display
  $("#bubble-click-info").hide();
  $("#impactTextIntro").show();
  $("#impact-chart").hide();

  // Clear sector list
  selected_sector = [];
  sect_list = [];
  clickCount = -1;

  // Clear bar chart
  d3.select("#selected_bar").remove();
  $("#impactText").html("");

    //impactchart clear
    d3.select("#imp").remove();
    var svg3 = d3.select("#impact-chart")
      .append("div")
      .attr('id', 'imp');
    var config = useeio.urlConfig();
      var modelID = config.get().model || selected_model;
      var model = useeio.model({
        endpoint: './api',
        model: modelID,
        asJsonFiles: true,
      });
      var impactChart = useeio.impactChart({
        model: model,
        selector: '#imp',
        columns: 3,
        width: 800,
        height: 300,
      });
      impactChart.update({
        sectors: [selected_sector],      
      });
}

// INIT
/*
if (hiddenhash.naics) { // Set in naics.js
    console.log("bubble chart init. hiddenhash.naics value: " + hiddenhash.naics);
    $(document).ready(function(){
      alert("hiddenhash.naics " + hiddenhash.naics)
       displayImpactBubbles(1); // Resides in bubble.js
    });
}
*/