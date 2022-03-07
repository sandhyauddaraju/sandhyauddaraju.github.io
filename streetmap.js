var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  /*  age 0-10      0
    11-20     1
    21-40     2
    41-60     3
    61-80     4
    > 80      5

male 0, Female 1 */


 var rowConverter = function(d) {
        return {        
            x: parseFloat(d.x),        
            y: parseFloat(d.y)
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




var mapCoordinates = [];
var pumpCoordinates = [];
var deathLocationCoordinates = [];
var colorScaleAge;
//var toolTipOnMouseOver;
//var mapLegendCategory = ["Pump","Male","Female","Age:0-10","Age:11-20","Age:21-40","Age:41-60","Age:61-80","Age:> 80"];
//var mapLegendColors = ["violet","olive","blue","yellow"];#998ec3 #d95f0e
//var mapLegendColors = ["#932063","#756bb1","#9bae38","#fec44f","#fc9272","#2b8cbe","#fff7bc","#efedf5","#7fcdbb"]; //,"#756bb1  #bcbddc"

var mapGenderCategory = ["Pump","Male","Female","Work House","Brewery"];
var mapGenderLegendColors = ["#932063","#756bb1","#9bae38","violet","blue"];

var mapAgeCategory = ["Pump","Age:0-10","Age:11-20","Age:21-40","Age:41-60","Age:61-80","Age:> 80","Work House","Brewery"];
var mapAgeLegendColors = ["#932063","#fec44f","#fc9272","#2b8cbe","#fff7bc","#efedf5","#7fcdbb","violet","blue"];

d3.json("https://sandhyauddaraju.github.io/streets.json", function(json){   
//});
d3.csv("https://sandhyauddaraju.github.io/deaths_age_sex.csv", rowConverterLocation, function(deathlocationcsv){ 
d3.csv("https://sandhyauddaraju.github.io/pumps.csv", rowConverter, function(pumpscsv) {
//});
  //rowConverter,

//});  //rowConverterLocation, 


for(var i=0; i< json.length;i++)
{                  
    mapCoordinates.push(json[i]);                        
}
for(var i=0; i< pumpscsv.length;i++)
{
    // pumpCoordinates.push(pumpscsv[i]);
    pumpCoordinates.push([pumpscsv[i].x,pumpscsv[i].y]);

    //console.log(pumpCoordinates[i].x);
}

for(var i=0; i< deathlocationcsv.length;i++)
{
    deathLocationCoordinates.push([deathlocationcsv[i].x,deathlocationcsv[i].y,deathlocationcsv[i].age,deathlocationcsv[i].gender]);
}


 
//console.log(mapCoordinates);
//console.log(pumpCoordinates);
//console.log(deathLocationCoordinates);


var xsclmap = d3.scale.linear()
    .domain([d3.min(json, function(d) {return d.x;}), d3.max(json, function(d) {return d.x;})]) //use just the x part
    .range([margin.left, width + margin.left])

var ysclmap = d3.scale.linear()
    .domain([d3.min(json, function(d) {return d.y;}), d3.max(json, function(d) {return d.y;})]) // use just the y part
    .range([height + margin.top, margin.top]) 

//var xAxis = d3.svg.axis.scale(xsclmap).orient("bottom")
//var yAxis = d3.svg.axis.scale(ysclmap).orient("right");//d3.axis.right(ysclmap)




 
var xscl = d3.scale.linear()
    .domain([d3.min(pumpCoordinates, function(d) {return d[0];}), d3.max(pumpCoordinates, function(d) {return d[1];})]) //use just the x part
    .range([margin.left, width + margin.left]);

var yscl = d3.scale.linear()
    .domain([d3.min(pumpCoordinates, function(d) {return d[0];}), d3.max(pumpCoordinates, function(d) {return d[1];})]) // use just the y part
    .range([height + margin.top, margin.top]); 
    
var xsclDeathLocation = d3.scale.linear()
    .domain([d3.min(deathLocationCoordinates, function(d) {return d[0];}), d3.max(deathLocationCoordinates, function(d) {return d[1];})]) //use just the x part
    .range([margin.left, width + margin.left]);

var ysclDeathLocation = d3.scale.linear()
    .domain([d3.min(deathLocationCoordinates, function(d) {return d[0];}), d3.max(deathLocationCoordinates, function(d) {return d[1];})]) // use just the y part
    .range([height + margin.top, margin.top]); 

colorScaleAge = d3.scale.ordinal()
    .domain(mapAgeCategory)
    .range(mapAgeLegendColors);
var colorScaleGender = d3.scale.ordinal()
    .domain(mapGenderCategory)
    .range(mapGenderLegendColors);

createLegend = function(deathLocationCoordinates, mapCategory, mapColor,id){

        var mapLegend = svgLegend.append("g")
        .attr("id","maplegend"+id)
         .attr("transform","translate("+ ( 10) +","+ ( height - 400)+")"); //390            
      
         mapLegend.selectAll("text")
         .data(mapCategory)
         .enter()
         .append("text")
           .attr("x",  function(d,i){ 
               if(id == 2) //Age
               {
               return  10+ i*60;
               }
               else //gender
               {
                return  10+ i*80;
               }
        })
           .attr("y",function(d,i){
           if(id == 2)
           {
           return margin.top + 2;
           }
           else{
            return margin.top + 2;
           }}) // 100 is where the first dot appears. 25 is the distance between dots
           .style("fill", "black")
           .text(function(d){ return d})
           .attr("text-anchor", "right")
           .style("alignment-baseline", "middle")
           .style("font-size","10")
           .style("font","arial");
    
        mapLegend.selectAll("dots")
            .data(mapColor)
            .enter()
             .append("circle")
              .attr("cx", function(d,i){
                  if(id == 2){
                return  20 + i*60;
              }
              else{
                  return 20 + i*80;;
              }
            })
              .attr("cy", function(d,i)
              {
                if(id == 2){
                    margin.top +15;
                }
                else{
                    margin.top +15; 
                }
              })// 100 is where the first dot appears. 25 is the distance between dots
              .attr("r", 7)
              .style("fill", function(d){ 
              
              if(id == 1)
              {
                  return colorScaleGender(d);
              }
              else{
                  return colorScaleAge(d);
              }
            });
    
           
           
    } ; 


var svgLegend = d3.select("body")
    .select("#chart-area")
        .append("svg")
        .attr("width", 600) //+ width + margin.left + margin.right
        .attr("height", 70 )
        .attr("id","svgMapLegend")


var svg = d3.select("body")
.select("#chart-area")
    .append("svg")
    .attr("width", 600) //+ width + margin.left + margin.right
    .attr("height", 450 )//+ margin.top + margin.bottom
    .attr("id","svgMap")
   // .style("position","top")

var svgContainer = d3.select("#svgMap");   
    const g = svg.append("g")
    .attr("id","mapGrp")
    //.attr("transform",`translate(${0},${margin.top})`)
    
    //.call(d3.behavior.zoom().on("zoom", function () {
    //    svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
    //  }))

var zoom = d3.behavior.zoom()
    .on("zoom",function() {
      // Using d3 mouse events, dynamically update translation and scale.
      svgContainer.select("#mapGrp").attr("transform","translate("+ 
          d3.event.translate.join(",")+")scale("+d3.event.scale+")");
  });
  
svgContainer.call(zoom);


var lineSegment = d3.svg.line()
.x(function(d,i) {  return  d.x * 20; }) //console.log(d.x);return  d.x * 25;}
.y(function(d,i) { return height - d.y * 20; } ) //console.log(d.y);
.interpolate("linear");

map = g
.append("g")
.attr("id","mapId")
.selectAll("line")
    .data(json)
    .enter()
    .append("path")
    .attr("class", "line") 
    .attr("id","lineMap")   
    .style("fill", "none")
    .style("stroke", "black")
    .style("stroke-width", 0.3)
    .attr("d", lineSegment)
     //.call(d3.behavior.zoom().on("zoom", function () {
     //   svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
     // }));

//svg.select("#mapId")
//     .append("text")
//     .attr("x", 45)
//     .attr("y", 300)
//     .attr("text-anchor", "middle")  
//     .style("font-size", "7px") 
//     .text("BROAD STREET")
//     .attr("transform", "rotate(-60)");

svg.select("#mapId")
.append("text")
.attr("x", 120)
.attr("y", 280)
.attr("text-anchor", "middle")  
.style("font-size", "7px") 
.text("BROAD STREET")
.attr("transform", "rotate(-30)");
//.attr("tranform",'translate(10,80)rotate(-35 * 90)');  

svg.select("#mapId")
//.selectAll("text")
.append("text")
.attr("x", 230)
.attr("y", 80)
.attr("text-anchor", "middle")  
.style("font-size", "7px") 
.text("OXFORD STREET")
.attr("transform","rotate(0)")

svg.select("#mapId")
//.selectAll("text")
.append("text")
.attr("x", 250)
.attr("y", 320)
.attr("text-anchor", "middle")  
.style("font-size", "7px") 
.text("RECENTS QUADRANT")
.attr("transform","rotate(0)")

svg.select("#mapId")
//.selectAll("text")
.append("text")
.attr("x", -300)
.attr("y", 40)
.attr("text-anchor", "middle")  
.style("font-size", "7px") 
.text("RECENT STREET")
.attr("transform","rotate(-120)")

svg.select("#mapId")
//.selectAll("text")
.append("text")
.attr("x", 50)
.attr("y", 390)
.attr("text-anchor", "middle")  
.style("font-size", "7px") 
.text("BREWER STREET")
.attr("transform","rotate(-40)")
//.attr("transform",'translate(10,80)rotate(-35)')
//.attr("transform", "rotate(45)") //.attr('transform', 'rotate(45 ' + xValue + ' ' + yValue + ')')
//.attr("transform", "rotate("+ 90*360 +")");
//.attr("tranform","rotate(45 -10 10)");  

rectGrp = svg.select("#mapId")
.append("g")
.append("rect")
.attr("width", 15)
.attr("height", 10)
.attr("x",210)
.attr("y",150)
.attr("fill", function(d){
             return colorScaleAge("Work House");
            });


rectGrp = svg.select("#mapId")
            .append("g")
            .append("rect")
            .attr("width", 10)
            .attr("height", 7)
            .attr("x",273)
            .attr("y",178)
            .attr("fill", function(d){
                         return colorScaleAge("Brewery");
                        })
            .attr("transform","rotate(0)");


svg.select("#mapId")
.selectAll("circle")
    .data(pumpCoordinates)
    .enter()
    .append("circle")  
    .attr("r", 3)
    .attr("cx", function(d){ return (d[0] * 20)}) //console.log(d.x); 
    .attr("cy", function(d){ return height -(d[1] * 20)}) //console.log(d.y);
    .attr("fill", function(d){
     return colorScaleAge("Pump");
    });




//
//svg.select("#mapId")      
//        .append("circle")  
//        .attr("r", 3)
//        .attr("cx", function(d){ return 200;}) //console.log(d.x); 
//        .attr("cy", function(d){ return height - 180;}) //console.log(d.y);
//        .attr("fill", function(d){
//         return colorScaleAge("Work House");
//        });   
//
//svg.select("#mapId")      
//        .append("circle")  
//        .attr("r", 3)
//        .attr("cx", function(d){ return 280;}) //console.log(d.x); 
//        .attr("cy", function(d){ return height - 201;}) //console.log(d.y);
//        .attr("fill", function(d){
//         return colorScaleAge("Brewery");
//        });   
//
var ageGrpCircles =svg.select("#mapId").append("g")
.attr("id","ageGroup")
.selectAll("circle")
.data(deathLocationCoordinates)
.enter()
.append("circle")
.attr("r", 1.5)
.attr("cx", function(d){ return (d[0] * 20)}) //console.log(d.x); 
.attr("cy", function(d){  return height - (d[1]* 20)}) //console.log(d.y);
.style("fill", function(d)
 { 
    //var mapAgeCategory = ["Age:0-10","Age:11-20","Age:21-40","Age:41-60","Age:61-80","Age:> 80"];
     switch(d[2])
    { 
      //  "Age:0-10","Age:11-20","Age:21-40","Age:41-60","Age:61-80","Age:> 80"];          
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
})
.on("mouseover", function(d) {
    d3.select(this).attr({            
        r: 1.5 * 2
    });
    toolTipOnMouseOver(d);
   // toolTipOnMouseOverTest(d);
  // 
    d3.select("#tooltip").classed("hidden", false);
})
.on("mouseout", function() {
    d3.select(this).attr({            
        r: 1.5
    });
    d3.select("#tooltip").classed("hidden", true);    
})
.call(function(d){ 
    // d3.selectAll("#maplegend").remove();
    createLegend(deathLocationCoordinates,mapAgeCategory,mapAgeLegendColors,2);
    }) ;


//changeColorAgeGrp = ageGrpCircles.nodes();
d3.select("#updateBtnGender").on("click", function(){   
    d3.selectAll('#ageGroup')
    .remove();
    
    svg.select("#mapId").append("g")
    .attr("id","GenderGroup")
    .selectAll("circle")
    .data(deathLocationCoordinates)
    .enter()
    .append("circle")
    .attr("r", 1.5)
    .attr("cx", function(d){ return (d[0] * 20)}) //console.log(d.x); 
    .attr("cy", function(d){  return height - (d[1]* 20)}) //console.log(d.y);
    .style("fill", function(d)
     {
         //mapGenderCategory
            if(d[3] == 0)
        {            
           return colorScaleGender(mapGenderCategory[1]);            
        } 
        else 
        {           
            return colorScaleGender(mapGenderCategory[2]);             
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
 d3.selectAll("#maplegend2").remove();
 createLegend(deathLocationCoordinates,mapGenderCategory,mapGenderLegendColors,1);

 console.log("before pie chart removal");
 d3.selectAll('#pieChart')
 .remove();
 updatePieChart(true,null);
 console.log("after pie chart update");

})
//
d3.select("#updateBtnAge").on("click", function(){   
    d3.selectAll('#GenderGroup')
    .remove();
    
    svg.select("#mapId").append("g")
    .attr("id","ageGroup")
    .selectAll("circle")
    .data(deathLocationCoordinates)
    .enter()
    .append("circle")
    .attr("r", 1.5)
    .attr("cx", function(d){ return (d[0] * 20)}) //console.log(d.x); 
    .attr("cy", function(d){  return height - (d[1]* 20)}) //console.log(d.y);
    .style("fill", function(d)
     {
        //var mapAgeCategory = ["Pump","Age:0-10","Age:11-20","Age:21-40","Age:41-60","Age:61-80","Age:> 80"];
        //var mapAgeLegendColors = ["#932063","#fec44f","#fc9272","#2b8cbe","#fff7bc","#efedf5","#7fcdbb"];
        switch(d[2])
        { 
          //  "Age:0-10","Age:11-20","Age:21-40","Age:41-60","Age:61-80","Age:> 80"];          
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
    createLegend(deathLocationCoordinates,mapAgeCategory,mapAgeLegendColors,2);

   //console.log("before pie chart removal");
 d3.selectAll('#pieChart')
 .remove();
 updatePieChart(false,null);
 //console.log("after pie chart update");
   
})

d3.select("#resetBtnAge").on("click", function(){   
    d3.selectAll('#GenderGroup')
    .remove();
    
    svg.select("#mapId").append("g")
    .attr("id","ageGroup")
    .selectAll("circle")
    .data(deathLocationCoordinates)
    .enter()
    .append("circle")
    .attr("r", 1.5)
    .attr("cx", function(d){ return (d[0] * 20)}) //console.log(d.x); 
    .attr("cy", function(d){  return height - (d[1]* 20)}) //console.log(d.y);
    .style("fill", function(d)
     {
        //var mapAgeCategory = ["Pump","Age:0-10","Age:11-20","Age:21-40","Age:41-60","Age:61-80","Age:> 80"];
        //var mapAgeLegendColors = ["#932063","#fec44f","#fc9272","#2b8cbe","#fff7bc","#efedf5","#7fcdbb"];
        switch(d[2])
        { 
          //  "Age:0-10","Age:11-20","Age:21-40","Age:41-60","Age:61-80","Age:> 80"];          
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
    createLegend(deathLocationCoordinates,mapAgeCategory,mapAgeLegendColors,2);

   //console.log("before pie chart removal");
 d3.selectAll('#pieChart')
 .remove();
 updatePieChart(false,null);
 //console.log("after pie chart update");
   
})



var toolTipOnMouseOver = function(d) {

    var xPosition = xsclDeathLocation(d[0] ) ;
    var yPosition = ysclDeathLocation(d[1] ) ;
    var age;
    var gender;
    console.log("toolTipOnMouseOver - "+d[3]);    
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

        console.log("Age:"+ age + "\n" + "Gender:"+gender);
    
    d3.select("#tooltip")
    .style("postion",  "absolute")
    .style("left", Math.max(0, d3.event.pageX - 150) + "px") 
    .style("top",  (d3.event.pageY + 20) + "px")//	yPosition	
    //.style("left", xPosition + "px") 
    //.style("top",  yPosition + "px")//	yPosition					
    .select("#value")
    .text(function(d){    
        console.log(d);   
        var tooltipText = "Age:"+ age + "\n" + "Gender:"+gender;
        console.log(tooltipText);
        return tooltipText;

})
d3.select("#tooltip").classed("hidden", false);

};
  
})})});
