let age = ['春秋战国','秦','汉','晋','南北朝','隋','唐','五代十国','宋','辽','西夏','金','元','明','清','民国','现代'];
function getVisualData(presName) {
    let res = null;
    $.ajax({
        url:"/visualData/"+presName,
        type:"GET",
        async:false,
        success:function(data){
            res = data
        }
    });
    return res;
}
//basic option
function setGraphOption(data) {
    let sortedData = data.sort(sortDataByAge);
    let timeLineData = setTimeLineData(sortedData);
    let categories = timeLineData.map(a => {
        return {
            name : a
        }
    })
    let option = {
        baseOption : {
            title : {
                text : 'The Graph of TCM Formulae',
                subtext : 'by Yichao Jin',
                top : 'bottom',
                left : 'right',
            },
            tooltip : {

            },
            legend: {
                type : 'plain',
                left : 'left',
                top : 'top',
                orient : 'vertical',
                itemGap : 10,
                data : categories.map(function (a) {
                    return a.name;
                })
            },
            // visualMap : {
            //     type : 'piecewise',
            //     categories : timeLineData,
            //     orient : 'vertical',
            //     inverse : true,
            //     align : 'left',
            //     dimension : 4,
            //     inRange : {
            //         color : 'red',
            //         opacity : {
            //
            //         }
            //     }
            //
            //
            // },
            timeline : {
                show : true,
                type : 'slider',
                axisType : 'category',
                currentIndex : 0,
                autoPlay : false,
                rewind : false,
                loop : true,
                playInterval : 2000,
                realtime : true,
                controlPosition : 'right',
                left : 'center',
                top : 'bottom',
                orient : 'horizontal',
                inverse : false,
                lineStyle : {
                    show : true,
                },
                label : {
                    position : 'bottom',
                    show : true,
                    color: '#999',
                    interval : 1
                },
                lineStyle: {
                    color: '#555'
                },
                checkpointStyle: {
                    color: '#bbb',
                    borderColor: '#777',
                    borderWidth: 2
                },
                emphasis: {
                    label: {
                        color: '#fff'
                    },
                    controlStyle: {
                        color: '#aaa',
                        borderColor: '#aaa'
                    }
                },
                data: []
            },
            color : ['#569AE2',
                    '#60ACFC',
                    '#7FBCFC',
                    '#9ECBFC',
                    '#238FD1',
                    '#27A1EA',
                    '#51B2ED',
                    '#7DC6F2',
                    '#33A0D2',
                    '#39B3EA',
                    '#5FC0ED',
                    '#88D1F2',
                    '#2FB0D2',
                    '#35C5EA',
                    '#5CCEED',
                    '#84DAF1'],
            backgroundColor : '#ffffff',
            series : setGraph(sortedData,categories)
        },
        options : setGraphData(sortedData,timeLineData)

    }

    option.baseOption.timeline.data = timeLineData;
    return option;


}
//set of timeline
function setTimeLineData(data) {
    let res = new Array();
    data.forEach(val => {
        if(res.indexOf(val.age) == -1)
            res.push(val.age);
    });
    console.log(res);
    return res;

}

function sortDataByAge(x,y) {
    return age.indexOf(x.age)-age.indexOf(y.age);
}

//set series
function setGraph(data,categories) {
    let series = {
        type: 'graph',
        id : 'graphOfPres',
        name : 'graphOfPres',
        coordinateSystem : null,
        hoverAnimation : true,
        legendHoverLink : true,
        layout : 'force',
        force : {
            repulsion: 100,
            edgeLength : [80,360],
        },
        roam : true,
        draggable : false,
        cursor : 'pointer',
        focusNodeAdjacency : true,
        symbolScale : function (value) {
            return value*5.5
        },
        itemStyle : {
            borderColor : '#fff',
            borderWidth : 1,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            // color : function (params) {
            //     return 'rgba(255,35,67,'+age.indexOf(data[params.dataIndex].age)/16+')';
            // },
            opacity : 0.8
        },
        lineStyle: {
            color : 'source',
            curveness : 0.3
        },
        label : {
            show : true,
            formatter : '{b}',
        },
        edgeLabel : {
            show : false,
        },
        categories : categories,
        emphasis: {
            lineStyle: {
                width: 5
            },
        },
        animationDuration:3000
    }

    return series;
}

function setGraphData(data,timeLineData) {
    let options = new Array();
    for (let i = 0; i < timeLineData.length; i++) {
        let option = {
            series: {
                data : [],
                links : [],
            }
        }
        for(let val of data){
            if(age.indexOf(val.age)>age.indexOf(timeLineData[i]))
                break;
            option.series.data.push({
                name : val.bookName,
                value : val.hc.length,
                symbolSize : val.hc.length*8,
                category : timeLineData.indexOf(val.age),
                emphasis: {
                    lineStyle: {
                        width: 3
                    },
                },

            })
        }
        let optionLength = option.series.data.length;
        for (let j = 0; j < optionLength; j++) {
            for (let k = j + 1; k < optionLength; k++) {
                let similarity = getSetSimilarity(data[j].hc,data[k].hc)
                if(similarity != 0){
                    option.series.links.push({
                        source : option.series.data[j].name,
                        target : option.series.data[k].name,
                        value : similarity
                    });
                }
            }
        }

        options.push(option)
    }
    return options;

}

function getSetSimilarity(arr1,arr2) {
    let a1 = arr1.map(obj => obj.plantName);
    let a2 = arr2.map(obj => obj.plantName);
    let a2set = new Set(a2);
    let intersection = Array.from(new Set(a1.filter(v => a2set.has(v))))
    let union = Array.from(new Set(a1.concat(a2)))
    // Jaccard coefficient：
    let s=((intersection.length/union.length)*100).toFixed(2);
    return s;

}