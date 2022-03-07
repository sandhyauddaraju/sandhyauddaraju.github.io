var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


	var w = 500;
	var h = 300;
	var padding = 40;

    var parseTime = d3.time.format("%d-%b").parse; //%B %d                
    var formatTime = d3.time.format("%b %e").parse;
    var deathCoordinatesInPie = [];
    
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

    class AgeMaleFemaleCount {
            constructor(ageGrp, totalMaleFemaleCount, percentage) {
              this.ageGrp = ageGrp;
              this.totalMaleFemaleCount = totalMaleFemaleCount;
              this.percentage =  percentage;         
            }
          }
    
    class MaleFemaleCounts{
        constructor(count, gender, percentage)
        {


            this.count = count;
            this.gender = gender;
            this.percentage = percentage;
           // this.maleCount = maleCount;
           // this.femaleCount = femaleCount;
        }
    }

    var createDataSetForPieChart = function(basedOnGender, groupInfoPie)
    {
        var dataSet = [];
        var agem0f0, agem1f1, agem2f2, agem3f3, agem4f4, agem5f5;
        if(basedOnGender)
        {
            var objGenderCounts = new  MaleFemaleCounts(totalMaleCount,"Male",((totalMaleCount/totalCount)*100).toFixed(2));
            var objGenderCounts1 = new  MaleFemaleCounts(totalFemaleCount,"Female",((totalFemaleCount/totalCount)*100).toFixed(2));            
            dataSet.push(objGenderCounts);
            dataSet.push(objGenderCounts1);
           // dataSet.push(totalMaleCount);    
           // dataSet.push(totalFemaleCount);                    
        }
        else // based on age group.
        {            
                for(var i=0; i < groupInfoPie.length; i++)
                { 
                    switch(i)
                    { 
                        case 0:
                            agem0f0 = groupInfoPie[i].maleCount + groupInfoPie[i].femaleCount;
                            //objAgeMaleFemaleCount = new AgeMaleFemaleCount('0-10',agem0f0);
                            objAgeMaleFemaleCount = new AgeMaleFemaleCount('0-10',agem0f0,((agem0f0/totalCount)*100).toFixed(2));
                            dataSet.push(objAgeMaleFemaleCount);
                            break;
                        case 1:
                            agem1f1 = groupInfoPie[i].maleCount + groupInfoPie[i].femaleCount;
                            //objAgeMaleFemaleCount = new AgeMaleFemaleCount('11-20',agem1f1);
                            objAgeMaleFemaleCount = new AgeMaleFemaleCount('11-20',agem1f1,((agem1f1/totalCount)*100).toFixed(2));
                            dataSet.push(objAgeMaleFemaleCount);                         
                            break;
                        case 2:
                            agem2f2 = groupInfoPie[i].maleCount + groupInfoPie[i].femaleCount;
                            //objAgeMaleFemaleCount = new AgeMaleFemaleCount('21-40',agem2f2);
                            objAgeMaleFemaleCount = new AgeMaleFemaleCount('21-40',agem2f2,((agem2f2/totalCount)*100).toFixed(2));
                            dataSet.push(objAgeMaleFemaleCount);                            
                            break;
                        case 3:
                            agem3f3 = groupInfoPie[i].maleCount + groupInfoPie[i].femaleCount;
                            //objAgeMaleFemaleCount = new AgeMaleFemaleCount('41-60',agem3f3);
                            objAgeMaleFemaleCount = new AgeMaleFemaleCount('41-60',agem3f3,((agem3f3/totalCount)*100).toFixed(2));
                            dataSet.push(objAgeMaleFemaleCount);                           
                            break;
                        case 4:
                            agem4f4 = groupInfoPie[i].maleCount + groupInfoPie[i].femaleCount;
                            //objAgeMaleFemaleCount = new AgeMaleFemaleCount('61-80',agem4f4);
                            objAgeMaleFemaleCount = new AgeMaleFemaleCount('61-80',agem4f4,((agem4f4/totalCount)*100).toFixed(2));
                            dataSet.push(objAgeMaleFemaleCount);                         
                            break;
                        case 5:
                            agem5f5 = groupInfoPie[i].maleCount + groupInfoPie[i].femaleCount;
                            //objAgeMaleFemaleCount = new AgeMaleFemaleCount('>80',agem5f5);
                            objAgeMaleFemaleCount = new AgeMaleFemaleCount('>80',agem5f5,((agem5f5/totalCount)*100).toFixed(2));
                            dataSet.push(objAgeMaleFemaleCount);;                            
                            break;
                        default:
                            break;
                    }
                }
        }
    //    console.log(dataSet);
        return dataSet;       
    }

    var getGroupedInfoForPie = function(deathLocationCoordinates)
    {
        GroupedInfo = [];
        CountByGender = [];
        countM0 = 0;countM1 = 0;countM2 = 0;countM3 = 0;countM4 = 0;countM5 = 0;
        countF0 = 0;countF1 = 0;countF2 = 0;countF3 = 0;countF4 = 0;countF5 = 0;
       // var len = deathLocationCoordinates.length;
       // console.log("length "+ len)
       // console.log(deathLocationCoordinates);
        for(var i=0; i< deathLocationCoordinates.length;i++)
        {
            
           // console.log("in loop  "+deathLocationCoordinates[i])
           // console.log(deathLocationCoordinates[i][2])
            switch(deathLocationCoordinates[i][2])
            {  
                case 0:  
                            
                        age="0-10";
                      //  console.log("in 0")
                        //console.log(deathLocationCoordinates[i].gender);
                      //  console.log(deathLocationCoordinates[i][3]);
                        if(deathLocationCoordinates[i][3] == 0)
                        {
                            gender = "Male";
                            countM0 = countM0 + 1;
                           // console.log("In male" )
                          //  console.log(i+"  0-10-" +deathLocationCoordinates[i][2] + "-male "+deathLocationCoordinates[i][3] +"male0-"+countM0 );
                        }
                        else{
                            gender = "Female";
                           // console.log("In female" )
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
       if(countM0 != 0 || countF0 != 0 )
       {
           
           var ageGrp1 = new AgeMaleFemale("0-10",countM0,countF0);
           GroupedInfo.push(ageGrp1);
         //  console.log(ageGrp1);
       }
       if(countM1 != 0 || countF1 != 0 )
       {
           var ageGrp2 =new AgeMaleFemale("11-20",countM1,countF1);
           GroupedInfo.push(ageGrp2);
       }
       if(countM2 != 0 || countF2 != 0 )
       {
           var ageGrp3 =new AgeMaleFemale("21-40",countM2,countF2);
           GroupedInfo.push(ageGrp3);
       }
       if(countM3 != 0 || countF3 != 0 )
       {
           var ageGrp4 =new AgeMaleFemale("41-60",countM3,countF3);
           GroupedInfo.push(ageGrp4);
       }
       if(countM4 != 0 || countF4 != 0 )
       {
           var ageGrp5 =new AgeMaleFemale("61-80",countM4,countF4);
           GroupedInfo.push(ageGrp5);
       }
       if(countM5 != 0 || countF5 != 0 )
       {
           var ageGrp6 =new AgeMaleFemale(">80",countM5,countF5);
           GroupedInfo.push(ageGrp6);
       }
    
       return GroupedInfo;
    }

    var totalCount;
        d3.csv("https://sandhyauddaraju.github.io/deathdays.csv", rowConverterDate, function(deathDays){
            d3.csv("https://sandhyauddaraju.github.io/deaths_age_sex.csv", rowConverterLocation, function(deathlocationcsv){            

            for(var i=0; i< deathlocationcsv.length;i++)
            {
                deathCoordinatesInPie.push([deathlocationcsv[i].x,deathlocationcsv[i].y,deathlocationcsv[i].age,deathlocationcsv[i].gender]);
            }
               
            NumberOfDeathsByDate = deathDays;      
            var groupInfoPie =  getGroupedInfoForPie(deathCoordinatesInPie);
            totalCount = GetTotalCountOfDeaths(); 
            
          //  console.log(totalCount);
            
            //console.log(NumberOfDeathsByDate);
            //console.log(groupInfo); 
            //console.log(totalFemaleCount);
            //console.log(totalMaleCount);

            getDataSetForAgeGrp = createDataSetForPieChart(false, groupInfoPie);
            dataset = getDataSetForAgeGrp;
            //console.log( "getDataSetForAgeGrp-"+getDataSetForAgeGrp);
            //total = totalMaleCount  + totalFemaleCount;
            //var dataset = [];
            //for(var i=0; i<getDataSetForAgeGrp.length;i++)
            //{
            //   temp = (getDataSetForAgeGrp[i].totalMaleFemaleCount/total)*100;
            //   dataset.push(temp);
            //}
           

                //Width and height
			var w = 200;
			var h = 200;

			

			var outerRadius = w / 2;
			var innerRadius = 0;
			var arc = d3.svg.arc()
						.innerRadius(innerRadius)
						.outerRadius(outerRadius);
			
			var pie = d3.layout.pie()
                        .value(function(d){ return d.percentage});
			
			//Easy colors accessible via a 10-step ordinal scale
			//var color = d3.scale.ordinal(d3.schemeCategory10);

			var color = d3.scale.ordinal()
    					.range(["#fec44f","#fc9272","#2b8cbe","#fff7bc","#efedf5","#7fcdbb"]);
                        

			//Create SVG element
			var svg = d3.select("body")
                        .select("#chart-area2")
						.append("svg")
						.attr("width", 400)
						.attr("height", 400)
                        .attr("id","pieChart");
                       // .style("position","center");
			
            //console.log(dataset);
			//Set up groups
			var arcs = svg.selectAll("g.arc")
						  .data(pie(dataset))
						  .enter()
						  .append("g")
						  .attr("class", "arc")
						  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
                          

            svg.append("g")
                .style("transform", `translate(${0}px,${200}px)`)
                .append("text")
                .attr("class", "title")
                .attr("x", 20)
                .attr("y", margin.top/4)
                .attr("text-anchor", "left")
                .text("Total Percentage Of Deaths By Age Group")
                .style("font-size", "12px")
                .style("text-decoration", "underline");
			
			//Draw arc paths
			arcs.append("path")
			    .attr("fill", function(d, i) {
			    	return color(i);
			    })
			    .attr("d", arc);
			
			//Labels
			arcs.append("text")
			    .attr("transform", function(d) {
			    	return "translate(" + arc.centroid(d) + ")";
			    })
			    .attr("text-anchor", "middle")
                .style("font-size", "10px")
			    .text(function(d) {
			    	return d.value + "%";
			    })
                .on("mouseover", function(d,i) {
                    d3.select("#tooltip")                   
                    .style("position","absolute")
                    .style("left", Math.max(0, d3.event.pageX - 150) + "px") 
                    .style("top",  (d3.event.pageY + 20) + "px")//	yPosition
                    //.select("#value")
                    .text(function(){
                        var txt = "Death Count :"+ dataset[i].totalMaleFemaleCount  + ", Age Group :" + dataset[i].ageGrp;
                        return txt;});
                    d3.select("#tooltip").classed("hidden", false)
                })
                .on("mouseout", function(){
                    d3.select("#tooltip").classed("hidden", true)
                });
    })});


var updatePieChart = function(basedOnGender,updatedDeathCoordinates){
    //console.log("In update function");
    //console.log(updatedDeathCoordinates);
    d3.csv("https://sandhyauddaraju.github.io/deathdays.csv", rowConverterDate, function(deathDays){
        d3.csv("https://sandhyauddaraju.github.io/deaths_age_sex.csv", rowConverterLocation, function(deathlocationcsv){
          
        console.log(updatedDeathCoordinates);
        var updateGroupInfo;
        if(updatedDeathCoordinates != null)
        {
            updateGroupInfo =  getGroupedInfoForPie(updatedDeathCoordinates);
            console.log("updateGroupInfo1:" + updateGroupInfo);
        }
        else{
            console.log(updatedDeathCoordinates);
            updateGroupInfo =  getGroupedInfoForPie(deathCoordinatesInPie);
            console.log("updateGroupInfo2:" + updateGroupInfo);
        }

        NumberOfDeathsByDate = deathDays;      
       // groupInfo =  getGroupedInfo(deathCoordinates);
        totalCount = GetTotalCountOfDeaths();
        
        //console.log(NumberOfDeathsByDate);
        //console.log(groupInfo); 
        //console.log(totalFemaleCount);
        //console.log(totalMaleCount);

        getDataSetForAgeGrp = createDataSetForPieChart(basedOnGender, updateGroupInfo);

            //Width and height
        var w = 200;
        var h = 200;

        var dataset = getDataSetForAgeGrp;

        var outerRadius = w / 2;
        var innerRadius = 0;
        var arc = d3.svg.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius);
        
        //var pie = d3.layout.pie()
        //            .value(function(d){ return d.totalMaleFemaleCount});
        
        //Easy colors accessible via a 10-step ordinal scale
        //var color = d3.scale.ordinal(d3.schemeCategory10);
        var color;
        var pie;
        if(basedOnGender)
        {
             color = d3.scale.ordinal()
            .range(["#756bb1","#9bae38"]);

             pie = d3.layout.pie()
            .value(function(d){ return d.percentage});
        }
        else
        {
             color = d3.scale.ordinal()
            .range(["#fec44f","#fc9272","#2b8cbe","#fff7bc","#efedf5","#7fcdbb"]);

             pie = d3.layout.pie()
            .value(function(d){ return d.percentage});
        }

       

        //Create SVG element
        var svg = d3.select("body")
                    .select("#chart-area2")
                    .append("svg")
                    .attr("width", 400)
                    .attr("height", 400)
                    .attr("id","pieChart");
                   // .style("position","center");
        
        //console.log(dataset);
        //Set up groups
        var arcs = svg.selectAll("g.arc")
                      .data(pie(dataset))
                      .enter()
                      .append("g")
                      .attr("class", "arc")
                      .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
                      
        if(basedOnGender)
        {
        svg.append("g")
            .style("transform", `translate(${0}px,${200}px)`)
            .append("text")
            .attr("class", "title")
            .attr("x", 20)
            .attr("y", margin.top/4)
            .attr("text-anchor", "left")
            .text("Total Percentage Of Deaths By Gender")
            .style("font-size", "12px")
            .style("text-decoration", "underline");
        }
        else{
            svg.append("g")
            .style("transform", `translate(${0}px,${200}px)`)
            .append("text")
            .attr("class", "title")
            .attr("x", 20)
            .attr("y", margin.top/4)
            .attr("text-anchor", "left")
            .text("Total Percentage Of Deaths By Age Group")
            .style("font-size", "12px")
            .style("text-decoration", "underline");
        }
        
        //Draw arc paths
        arcs.append("path")
            .attr("fill", function(d, i) {
                return color(i);
            })
            .attr("d", arc);
        
        //Labels
        arcs.append("text")
            .attr("transform", function(d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .style("font-size", "11px")
            .text(function(d) {
                return d.value+"%";
            })
            .on("mouseover", function(d,i) {
                d3.select("#tooltip")                   
                .style("position","absolute")
                .style("left", Math.max(0, d3.event.pageX - 150) + "px") 
                .style("top",  (d3.event.pageY + 20) + "px")//	yPosition
                //.select("#value")
                .text(function(){
                    if(basedOnGender)
                    {
                        var txt = "Death Count :"+ dataset[i].count  + ",              Gender :" + dataset[i].gender;
                        return txt;                      
                    }
                    else{
                        var txt = "Death Count :"+ dataset[i].totalMaleFemaleCount  + ",          Age Group :" + dataset[i].ageGrp;
                        return txt;                      
                    }
                   
                });
                d3.select("#tooltip").classed("hidden", false)
            })
            .on("mouseout", function(){
                d3.select("#tooltip").classed("hidden", true)
            });;
})});
};
