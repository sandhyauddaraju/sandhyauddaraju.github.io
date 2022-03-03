var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


	var w = 500;
	var h = 300;
	var padding = 40;

var parseTime1 = d3.time.format("%d-%e").parse;
//var parseTime = d3.time.format("%d-%b").parse;  //d3.time.format("%d-%b").parse;
var parseTime = d3.time.format("%d-%b").parse; //%B %d
			//For converting Dates to strings
var formatTime = d3.time.format("%b %e").parse;

var rowConverterDate = function(d) {
        return {
            date: parseTime(d.date),
            deaths: parseInt(d.deaths)
        };
    }

var rowConverterLocation = function(d){
        return{
            x: parseFloat(d.x),        
            y: parseFloat(d.y),
            age: parseInt(d.age),
            gender: parseInt(d.gender)
        };
    }
    
//var NumberOfDeathsByDate = [];
var deathLocationCoordinatesTimeLine = [];
var NumberOfDeathsByDate, xScale, yScale; 

d3.csv("https://sandhyauddaraju.github.io/deathdays.csv", rowConverterDate, function(deathDays){
    d3.csv("https://sandhyauddaraju.github.io/deaths_age_sex.csv", rowConverterLocation, function(deathlocationcsv){
      
        NumberOfDeathsByDate = deathDays       
        for(var i=0; i< deathlocationcsv.length;i++)
        {
            deathLocationCoordinatesTimeLine.push([deathlocationcsv[i].x,deathlocationcsv[i].y,deathlocationcsv[i].age,deathlocationcsv[i].gender]);
        }
       // console.log(deathLocationCoordinates);

        var startDate = d3.min(NumberOfDeathsByDate, function(d) { return d.date; });
        var endDate = d3.max(NumberOfDeathsByDate, function(d) { return d.date; });

        xScale = d3.time.scale()
        .domain([
            d3.time.day.offset(startDate, -2), //startDate, -1 
            d3.time.day.offset(endDate, 2)	 //endDate, 1
        ])
        .range([padding, w - padding]);
      
        //  .domain([
      //       d3.min(NumberOfDeathsByDate, function(d) { return d.date; }),
      //       d3.max(NumberOfDeathsByDate, function(d) { return d.date; })
      //   ])
       

      //xScale = d3.scale.linear()
      //.domain([
      //  d3.min(NumberOfDeathsByDate, function(d) { return d.date; }),
      //  d3.max(NumberOfDeathsByDate, function(d) { return d.date; })	 
      //])
      //.range([padding, w - padding]);

        yScale = d3.scale.linear()
        .domain([
             d3.min(NumberOfDeathsByDate, function(d) { return d.deaths; }), //console.log( d.deaths);
             d3.max(NumberOfDeathsByDate, function(d) { return d.deaths; }) //console.log( d.deaths);
         ])
        .range([h - padding, padding]);

       
        xAxis = d3.svg.axis().scale(xScale)
                                 // .tickFormat(formatTime) 
                                  .orient("bottom")
                                  .ticks(NumberOfDeathsByDate.length-20)
                                  .tickFormat(d3.time.format("%b %d"));                                

				//Define Y axis
		yAxis = d3.svg.axis().scale(yScale)
							 .orient("left")
							 .ticks(10);

        var timeLineXsclDeathLocation = d3.scale.linear()
                             .domain([d3.min(deathLocationCoordinatesTimeLine, function(d) {return d[0];}), d3.max(deathLocationCoordinatesTimeLine, function(d) {return d[1];})]) //use just the x part
                             .range([margin.left, width + margin.left]);
                         
        var timeLinYsclDeathLocation = d3.scale.linear()
                             .domain([d3.min(deathLocationCoordinatesTimeLine, function(d) {return d[0];}), d3.max(deathLocationCoordinatesTimeLine, function(d) {return d[1];})]) // use just the y part
                             .range([height + margin.top, margin.top]); 
        //var dataXrange = d3.extent(NumberOfDeathsByDate, function(d) { return d.month; });

       // xScale = d3.scale.time()
       // .domain([
       // d3.min(NumberOfDeathsByDate, function(d) {console.log("In x-scale" + d[0]); return d[0]; }),
       // d3.max(NumberOfDeathsByDate, function(d) {console.log("In x-scale" + d[0]);  return d[0]; })
       // ])
        //.range([100, width]);


      //  yScale = d3.scale.linear()
      //  .domain([0, d3.max(NumberOfDeathsByDate, function(d) { return d[1]; })])
      //  .range([height, 0]);

    var svg = d3.select("body")
        .select("#chart-area1")
            .append("svg")
            .attr("width", 500) //+ 
            .attr("height", 350)
            //.style("position","top");
            //.style("display","inline-block");           


       // svg.append("g")
       //     .attr("transform", "translate(50,50)")
       //     .call(xAxis);


    svg.selectAll("text")
 				   .data(NumberOfDeathsByDate)
 				   .enter()
 				   .append("text")
 				  // .text(function(d) {
 				  // 		return formatTime(d.date);
 				  // })
 				   .attr("x", function(d) {
 				   		return xScale(d.date) + 4;
 				   })
 				   .attr("y", function(d) {
 				   		return yScale(d.deaths) + 4;
 				   })
 				   .attr("font-family", "sans-serif")
 				   .attr("font-size", "11px")
 				   .attr("fill", "#bbb");


                    var line = d3.svg.line()
                    .x(function(d) {  return xScale(d.date); }) //console.log(d.date);
                    .y(function(d) { return yScale(d.deaths); });
        //
                svg.append("path")
                    .datum(NumberOfDeathsByDate)
                    .attr("class", "line")
                    .attr("d", line)
                    .style("fill", "none")
                    .style("stroke", "black")
                    .style("stroke-width", 0.5);
        
        
                svg.selectAll("circle")
                           .data(NumberOfDeathsByDate)
                           .enter()
                           .append("circle")
                           .attr("cx", function(d) {
                                   return xScale(d.date);
                           })
                           .attr("cy", function(d) {
                                   return yScale(d.deaths);
                           })
                           .attr("r", 2)
                           .style("fill", "black")
                           //.append("title")
                           //. text(function(d){    
            
                            //return d.deaths;
                           // });
                           .on("mouseover", function(d) {
                                // Use D3 to select element, change color and size
                                d3.select(this).attr({
                                    fill: "black",
                                    r: 2 * 2
                                });

                           // console.log(d3.mouse(this));
                            var mouseCoordinates =  d3.mouse(this);
                             //calculate the no. deaths till that point.
                            var count = GetCountOfDeaths(d.date,d);
                            deathLocations = loadDeathLocationsBasedOnCount(count);

                           // var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
                           // var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;
                            //Update the tooltip position and value
                            d3.select("#tooltip")
                            //.style("left", mouseCoordinates[0] + "px")
                            //.style("top",  mouseCoordinates[1] + "px")
                            .style("position","absolute")
                            .style("left", Math.max(0, d3.event.pageX - 150) + "px") 
                            .style("top",  (d3.event.pageY + 20) + "px")//	yPosition
                            //.select("#value")
                            .text(function(){
                                //var dt = dateFormat(d.date);
                                var dt = d.date.toLocaleDateString('en-US', { month: 'short' }) + "-" + d.date.getDate();
                                var txt = "Death count on "+ dt +" :"+d.deaths  + "     ,    Total Count till " + dt + " :"+count;
                                return txt;});
                            d3.select("#tooltip").classed("hidden", false)

                           
                          //  console.log(d.date,d);
                            updateMap(deathLocations);
                           // d3.selectAll('#pieChart')
                           // .remove();
                           // console.log(deathLocations);
                           // updatePieChart(false,deathLocations);
                            

                           })
                            .on("mouseout", function() {
                                d3.select(this).attr({
                                    fill: "black",
                                    r: 2
                                });
                                d3.select("#tooltip").classed("hidden", true); 
                               // updateMap(deathLocationCoordinatesTimeLine);
                               // d3.selectAll('#pieChart')
                               // .remove();
                               // updatePieChart(false,null);  
                            });



       svg.append("text")
                            .attr("class", "x label")
                            .attr("text-anchor", "middle")
                            .attr("x", 250)//450
                            .attr("y", 320)
                            .text("Date")
                            .style("font-size", "10px")
                            .style("text-decoration","bold") ;

      var gXAxis =  svg.append("g")
       .attr("class", "axis")
       .attr("transform", "translate(0," + (h - padding) + ")")
       .call(xAxis);

       gXAxis.selectAll("text")
		.style("text-anchor", "end")
		.attr("dx", "-.8em")
		.attr("dy", ".15em")
		.attr("transform", "rotate(-90)");

        svg.append("g")
        .style("transform", `translate(${50}px,${15}px)`)
        .append("text")
        .attr("class", "title")
        .attr("x", width / 8)
        .attr("y", margin.top/4)
        .attr("text-anchor", "middle")
        .text("Deaths By Day (Aug 19-Sep 29)")
        .style("font-size", "12px")
        .style("text-decoration", "underline");

      

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    //.attr("y", 0)
    //.attr("x",200)
    .attr("dy", ".75em")
    .attr("transform", "translate(0," + ( padding+100) + ") rotate(-90)")//"translate(0," + ( padding+100) + ")  rotate(-90)"
    .text("Number of deaths")
    .style("font-size", "10px")
    .attr("font-weight",function(d,i) {return 500;})
    

    svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

  

    var GetCountOfDeaths = function(date) {
          
      //  console.log("In GetCountOfDeaths.")
        var count = 0;
       // console.log("date" + date);
        //console.log("d  "+d);
        for(var i=0; i < NumberOfDeathsByDate.length;i++)
        {          
            if(NumberOfDeathsByDate[i].date.getTime() <= date.getTime())
            {           
            count = count + NumberOfDeathsByDate[i].deaths;            
            }
        }
        return count;

    }

    var loadDeathLocationsBasedOnCount = function(countOfDeaths){    
        var deathLocationsBasedOnGraph=[];
       
        for(var i=0;i<countOfDeaths;i++)
        {        
        deathLocationsBasedOnGraph.push([deathlocationcsv[i].x,deathlocationcsv[i].y,deathlocationcsv[i].age,deathlocationcsv[i].gender]);
        }
        return deathLocationsBasedOnGraph;
    }


    var updateMap = function(deathLocations){

       // console.log("In update map")
       d3.selectAll('#GenderGroup')
       .remove();
        d3.selectAll('#ageGroup')
        .remove();

        d3.select("#svgMap").select("#mapId").append("g")
        .attr("id","ageGroup")
        .selectAll("circle")
        .data(deathLocations)
        .enter()
        .append("circle")
        .attr("r", 2)
        .attr("cx", function(d){ return (d[0] * 20)}) //console.log(d.x); 
        .attr("cy", function(d){  return (d[1]* 20)}) //console.log(d.y);
        .style("fill", function(d)
         {           
            switch(d[2])
            {                       
                case 0:                  
                    return colorScaleAge(mapAgeCategory[1]);
                    break;
                case 1: 
                    return colorScaleAge(mapAgeCategory[2]);
                    break;
                case 2:
                    return colorScaleAge(mapAgeCategory[3]);
                    break;
                case 3: 
                    return colorScaleAge(mapAgeCategory[4]);
                    break;
                case 4:
                    return colorScaleAge(mapAgeCategory[5]);
                    break;
                case 5: 
                    return colorScaleAge(mapAgeCategory[6]);
                    break;
                default:
                    break;
            }
    
         }
        )
        .on("mouseover", function(d) {
            d3.select(this).attr({            
                r: 1.5 * 2
            });
            toolTipOnMouseOver(d);
          // 
            d3.select("#tooltip").classed("hidden", false);
        })
        .on("mouseout", function() {
            d3.select(this).attr({            
                r: 1.5
            });
            d3.select("#tooltip").classed("hidden", true);    
        }); 
    
        d3.selectAll("#maplegend1").remove();
        createLegend(deathLocations,mapAgeCategory,mapAgeLegendColors,2);



    }

    var toolTipOnMouseOver = function(d) {

      //  var xPosition = xsclDeathLocation(d[0] ) ;
      //  var yPosition = ysclDeathLocation(d[1] ) ;
      //console.log(d[3]);
        var age;
        var gender;
        //console.log(d[3]);    
            if(d[3] == 0)
            {
                gender = "Male";
            }
            else{
                gender = "Female";
            }
            switch(d[2])
            {           
                case 0:              
                    age="0-10";
                    break;
                case 1: 
                    age="11-20";
                    break;
                case 2:
                    age="21-40";
                    break;
                case 3: 
                    age="41-60";
                    break;
                case 4:
                    age="61-80";
                    break;
                case 5: 
                    age="> 80";
                    break;
                default:
                    break;
            }
      //  var mouseCoordinates =  d3.mouse(this);
        d3.select("#tooltip")
        //.style("left", mouseCoordinates[0] + "px")
        //.style("top",  mouseCoordinates[1] + "px")
        .style("postion",  "absolute")
        .style("left", Math.max(0, d3.event.pageX - 150) + "px") 
        .style("top",  (d3.event.pageY + 20) + "px")//	yPosition
        //.style("left", xPosition + "px") 
        //.style("top",  yPosition + "px")//	yPosition					
       // .select("#value")
        .text(function(d){        
            var tooltipText = "Age:"+ age + "\n" + "Gender:"+gender;
            //console.log(tooltipText);
            return tooltipText;

         //   d3.select("#tooltip").classed("hidden", false)

            
    })};
})});
