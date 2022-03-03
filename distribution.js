var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


	var w = 500;
	var h = 300;
	var padding = 40;
    var subtract = 300;

var parseTime1 = d3.time.format("%d-%e").parse;    
var parseTime = d3.time.format("%d-%b").parse; //%B %d                
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

var GenderCategory = ["Female","Male"];
var GenderColors = ["#756bb1","#9bae38"];
var AgeCategory = ["Age:0-10","Age:11-20","Age:21-40","Age:41-60","Age:61-80","Age:> 80"];
var NumberOfDeathsByDate;
var deathCoordinates = [];
var objAgeMaleFemale = [];
var totalMaleCount;
var totalFemaleCount;

class AgeMaleFemale {
    constructor(ageGrp, maleCount,femaleCount) {
      this.ageGrp = ageGrp;
      this.maleCount = maleCount;
      this.femaleCount = femaleCount;
    }
  }

var getGroupedInfo = function(deathLocationCoordinates)
{
    GroupedInfo = [];
    CountByGender = [];
    countM0 = 0;countM1 = 0;countM2 = 0;countM3 = 0;countM4 = 0;countM5 = 0;
    countF0 = 0;countF1 = 0;countF2 = 0;countF3 = 0;countF4 = 0;countF5 = 0;
   // var len = deathLocationCoordinates.length;
   // console.log("length "+ len)
   //console.log(deathLocationCoordinates);
    for(var i=0; i< deathLocationCoordinates.length;i++)
    {
        
       // console.log("in loop  "+deathLocationCoordinates[i])
       // console.log(deathLocationCoordinates[i][2])
        switch(deathLocationCoordinates[i][2])
        {  
            case 0:  
                        
                    age="0-10";
                    //console.log(deathLocationCoordinates[i].gender);
                    if(deathLocationCoordinates[i][3] == 0)
                    {
                        gender = "Male";
                        countM0 = countM0 + 1;
                      //  console.log(i+"  0-10-" +deathLocationCoordinates[i][2] + "-male "+deathLocationCoordinates[i][3] +"male0-"+countM0 );
                    }
                    else{
                        gender = "Female";
                        countF0 = countF0 + 1;
                        //console.log(i+"  0-10-" +deathLocationCoordinates[i][2]+ "-female "+deathLocationCoordinates[i][3] +"female0-"+countF0);
                    }
                  //  console.log("in 0-10"+ countM0 + " "+ countF0);
                    break;
                case 1: 
                    age="11-20";
                    if(deathLocationCoordinates[i][3] == 0)
                    {
                        gender = "Male";
                        countM1 = countM1 + 1;
                        //console.log("11-20-" +deathLocationCoordinates[i][2] + "-male "+deathLocationCoordinates[i][3] +"male1-"+countM1 );
                    }
                    else{
                        gender = "Female";
                        countF1 = countF1 + 1;
                        //console.log("11-20-" +deathLocationCoordinates[i][2] + "-female "+deathLocationCoordinates[i][3] +"female1-"+countF1 );
                    }
                    break;
                case 2:
                    age="21-40";
                    if(deathLocationCoordinates[i][3] == 0)
                    {
                        gender = "Male";
                        countM2 = countM2 + 1;
                       // console.log("21-40-" +deathLocationCoordinates[i][2] + "-male "+deathLocationCoordinates[i][3] +"male2-"+countM2 );
                    }
                    else{
                        gender = "Female";
                        countF2 = countF2 + 1;
                       // console.log("21-40-" +deathLocationCoordinates[i][2] + "-female "+deathLocationCoordinates[i][3] +"female2-"+countM2 );
                    }
                    break;
                case 3: 
                    age="41-60";
                    if(deathLocationCoordinates[i][3] == 0)
                    {
                        gender = "Male";
                        countM3 = countM3 + 1;
                       // console.log("41-60-" +deathLocationCoordinates[i][2] + "-male "+deathLocationCoordinates[i][3] +"male3-"+countM3 );
                    }
                    else{
                        gender = "Female";
                        countF3 = countF3 + 1;
                       // console.log("41-60-" +deathLocationCoordinates[i][2] + "-female "+deathLocationCoordinates[i][3] +"female3-"+countM3 );
                    }
                    break;
                case 4:
                    age="61-80";
                    if(deathLocationCoordinates[i][3] == 0)
                    {
                        gender = "Male";
                        countM4 = countM4 + 1;
                      //  console.log("61-80-" +deathLocationCoordinates[i][2] + "-male "+deathLocationCoordinates[i][3] +"male4-"+countM4 );
                    }
                    else{
                        gender = "Female";
                        countF4 = countF4 + 1;
                      //  console.log("61-80-" +deathLocationCoordinates[i][2] + "-female "+deathLocationCoordinates[i][3] +"female4-"+countF4 );
                    }
                    break;
                case 5: 
                    age="> 80";
                    if(deathLocationCoordinates[i][3] == 0)
                    {
                        gender = "Male";
                        countM5 = countM5 + 1;
                      //  console.log("> 80-" +deathLocationCoordinates[i][2] + "-male "+deathLocationCoordinates[i][3] +"male5-"+countM5 );
                    }
                    else{
                        gender = "Female";
                        countF5 = countF5 + 1;
                      //  console.log("> 80-" +deathLocationCoordinates[i][2] + "-female "+deathLocationCoordinates[i][3] +"female5-"+countF5 );
                    }
                    break;
                default:
                    break;            
        }
    }
//console.log("count age0-10:"+countM0+" "+countF0)
 totalMaleCount = countM0+countM1+countM2+countM3+countM4+countM5;
 totalFemaleCount = countF0+countF1+countF2+countF3+countF4+countF5;
   if(countM0 != 0 && countF0 != 0 )
   {
       var ageGrp1 = new AgeMaleFemale("0-10",countM0,countF0);
       GroupedInfo.push(ageGrp1);
   }
   if(countM1 != 0 && countF1 != 0 )
   {
       var ageGrp2 =new AgeMaleFemale("11-20",countM1,countF1);
       GroupedInfo.push(ageGrp2);
   }
   if(countM2 != 0 && countF2 != 0 )
   {
       var ageGrp3 =new AgeMaleFemale("21-40",countM2,countF2);
       GroupedInfo.push(ageGrp3);
   }
   if(countM3 != 0 && countF3 != 0 )
   {
       var ageGrp4 =new AgeMaleFemale("41-60",countM3,countF3);
       GroupedInfo.push(ageGrp4);
   }
   if(countM4 != 0 && countF4 != 0 )
   {
       var ageGrp5 =new AgeMaleFemale("61-80",countM4,countF4);
       GroupedInfo.push(ageGrp5);
   }
   if(countM5 != 0 && countF5 != 0 )
   {
       var ageGrp6 =new AgeMaleFemale(">80",countM5,countF5);
       GroupedInfo.push(ageGrp6);
   }

   return GroupedInfo;
}

var GetTotalCountOfDeaths = function() {             
      var count = 0;    
      for(var i=0; i < NumberOfDeathsByDate.length;i++)
      {           
          count = count + NumberOfDeathsByDate[i].deaths; 
      }
      return count;
  }

d3.csv("https://sandhyauddaraju.github.io/deathdays.csv", rowConverterDate, function(deathDays){
    d3.csv("https://sandhyauddaraju.github.io/deaths_age_sex.csv", rowConverterLocation, function(deathlocationcsv){

    //deathLocationCoordinates = deathlocationcsv;
   


    for(var i=0; i< deathlocationcsv.length;i++)
    {
        deathCoordinates.push([deathlocationcsv[i].x,deathlocationcsv[i].y,deathlocationcsv[i].age,deathlocationcsv[i].gender]);
    }

  // deathCoordinates = deathLocationCoordinates;
    NumberOfDeathsByDate = deathDays;      
    groupInfo =  getGroupedInfo(deathCoordinates);
    totalCount = GetTotalCountOfDeaths();
   // console.log(groupInfo);
   // console.log(totalCount);

    //var color = d3.scale.ordinal()
     //   .range(["#756bb1","#9bae38"]);    
    
    

var x0 = d3.scale.ordinal()
      .rangeRoundBands([0, 400], .1);
  
  var x1 = d3.scale.ordinal();
  
  var y = d3.scale.linear()
  .range([height, 0]);
  //.range([h - padding, padding]);
  
  var color = d3.scale.ordinal()
      .range(["#756bb1","#9bae38"]);
  var colorLegend = d3.scale.ordinal()
      .range(["#756bb1","#9bae38"]);
  
  var xAxis = d3.svg.axis()
      .scale(x0)
      .orient("bottom");
  
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");
      //.ticks(6);
      //.tickFormat(d3.format(".2s"));
  

//var svg = d3.select("body")
 //     .select("#chart-area2")
 //         .append("svg")
 //         .attr("width", 500) //+ 
 //         .attr("height", 650)          
  var svg = d3.select("body")
  .select("#chart-area3")
  .append("svg")
   .attr("width", 500)
   .attr("height", 500)
   //.attr("overflow" ,"visible")
   //.style("position","bottom")
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + 0   + ")")
   ;
   //.style("display","inline-block");

      var groups = d3.map(groupInfo, function(d){ return(d.ageGrp)}).keys();
    

      var gendergroups =  d3.keys(groupInfo[0]).filter(function(key) { return key !== "ageGrp"; });
  
      groupInfo.forEach(function(d) {
          d.gender = gendergroups.map(function(name) { return {name: name, value: +d[name]}; });
        });
   
     
        x0.domain(groupInfo.map(function(d) { return d.ageGrp; }));
        x1.domain(gendergroups).rangeRoundBands([0, x0.rangeBand()]);
       // y.domain([0, d3.max(groupInfo, function(d) { return d3.max(d.gender, function(d) { return d.value; }); })])
       y.domain([
        0,
        d3.max(groupInfo, function(d) { return d3.max(d.gender, function(d) { return d.value; }); })])
        // d3.max(groupInfo, function(d) { return d3.max(d.gender, function(d) { return d.value; }); })])
         //.range([h - padding, padding]);
        // .range([0,200]);
      
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")") //height subtract
            .call(xAxis);

     svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "middle")
            .attr("x", 200)//450
            .attr("y", 460)
            .text("Age")
            .style("font-size", "10px")
            .style("text-decoration","bold")
            .attr("font-weight",function(d,i) {return 500;}) ;

    svg.append("g")
            .style("transform", `translate(${50}px,${10}px)`)
            .append("text")
            .attr("class", "title")
            .attr("x", width / 8)
            .attr("y", margin.top/4)
            .attr("text-anchor", "middle")
            .text("Age & Gender Distribution")
            .style("font-size", "12px")
            .style("text-decoration", "underline");
      
        svg.append("g")
            .attr("class", "y axis")
            //.attr("transform", "translate("  + ",100)")
           // .attr("transform", "translate(0," + 100 + ")") //160
            //.attr("transform", "translate(" + padding + ",0)")
            .call(yAxis)
         svg.append("text")
         .attr("transform", "translate(0," + ( 10) + "),rotate(-90)")
            //.attr("transform", "rotate(-90)")
            .attr("x", 0)
            .attr("y", 4)
            .attr("dy", ".75em")
            .style("text-anchor", "end")
            .text("Deaths")
            .style("font-size", "10px")
            .attr("font-weight",function(d,i) {return 500;});
      
        var ageGrp = svg.selectAll(".ageGrps")
            .data(groupInfo)
          .enter().append("g")
            .attr("class", "g")
            .attr("transform", function(d) { return "translate(" + x0(d.ageGrp) + ",0)"; });
      
        ageGrp.selectAll("rect")
            .data(function(d) { return d.gender; })
          .enter().append("rect")
           // .attr("width", x1.rangeBand())
           .attr("width", x1.rangeBand())
            .attr("x", function(d) { return x1(d.name); })
            .attr("y", function(d) { return  y(d.value); })
            .attr("height", function(d) { return height - y(d.value); })
            //.attr("height", function(d) { console.log(d.value + " --"+ y(d.value));  return y(d.value); })
            .style("fill", function(d) { return color(d.name); })
            .append("title")
             . text(function(d){ 
                    return d.value;
                });          


        var legend = svg.selectAll(".legend")
            .data(GenderCategory.slice().reverse())
          .enter().append("g")
            .attr("class", "legend")
            //.style("transform", `translate(${50}px,${15}px)`)
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
      
        legend.append("rect")
        .attr("x", 440)
        .attr("y", 15)
           // .attr("x", 420-18)
           // .attr("y", 20)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", colorLegend);
      
        legend.append("text")
        .attr("x", 440)
        .attr("y", 20)
          //  .attr("x", 460)
          //  .attr("y", 30)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d; });
 
      
 

})});
