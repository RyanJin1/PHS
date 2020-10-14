

//获取书名
function getBookNames(myData) {
    let res=[];
    for (let i = 1; i < myData.length; i++) {
        res.push(myData[i][0]);
    }
    return res;
}

//将药方按年代排序
function DynastySort(data,ages,AGE,index) {
    let res=new Array();
    let map=new Map();
    for (let i = 0; i < AGE.length; i++) {
        map.set(AGE[i],new Array());
    }
    for (let i = 0; i < ages.length; i++) {
        let list=map.get(ages[i]);
        list.push(data[i+index]);
        map.set(ages[i],list);
    }
    if(index==1)
        res.push(data[0]);
    map.forEach(function(value,key){
        for (let i = 0; i < value.length; i++) {
            res.push(value[i])
        }
    });
    return res;
}

//处理横坐标名字重复问题
function repeatBookHandler(myData) {
    let map=new Map();
    for (let i = 1; i < myData.length; i++) {
        if(!map.has(myData[i][0])){
            map.set(myData[i][0],1);
        }else{
            let ext=map.get(myData[i][0]);
            let org=myData[i][0];
            myData[i][0]=myData[i][0]+String(ext);
            map.set(org,ext+1);
        }
    }
}

//获取成分名
function getName(myData){
    let x=[];
    for (let i = 1; i < myData[0].length; i++) {
        x.push(myData[0][i]);
    }
    return x;
}
//获取成分含量
function getValue(myData){
    let x=[];
    for (let i = 1; i < myData.length; i++) {
        let y=[];
        for (let j = 1; j < myData[i].length ; j++) {
            y.push(myData[i][j]);
        }
        x.push(y);
    }
    return x;
}
//获取成分衍化表数据
function getCompChartData(name,myData){
    let index=0;
    for (let i = 0; i < myData[0].length ; i++) {
        if(myData[0][i]===name){
            index=i;
            break;
        }
    }
    if(index==0)
        return false;
    let res=[];
    let x=[];
    for (let i = 0; i < myData.length; i++) {
        x.push(myData[i][0]);
    }
    res.push(x);
    let y=[];
    for (let i = 0; i < myData.length; i++) {
        y.push(myData[i][index]);
    }
    res.push(y);
    console.log(res);
    return res;
}

function getContentData(i,itemName,itemValue){
    let chartData=[];
    for (let j = 0; j < itemName.length ; j++) {
        let itemData={
            name:itemName[j],
            value:itemValue[i][j]==0?null:itemValue[i][j]
        }
        chartData.push(itemData);
    }
    return chartData;
}
function getSeries(data) {
    let series=[];
    let l=data[0].length;
    for (let i = 1; i < l; i++) {
        let item={
            name:data[0][i],
            type: 'scatter',
            // smooth: true,
            encode:{
                x:'book',
                y:data[0][i]
            },
            symbolSize:8,
            animationEasing: 'quadraticOut',
            animationDuration: 2000
        }
        series.push(item);
    }
    // let f=data[1][0];
    // let pie={
    //     type: 'pie',
    //     id: 'pie',
    //     radius: '20%',
    //     center: ['85%', '35%'],
    //     label: {
    //         formatter: '{b}: {@1} ({d}%)'
    //     },
    //     encode: {
    //         itemName: 0,
    //         value: 2,
    //         tooltip: data[1][0]
    //     },
    //     seriesLayoutBy: 'row'
    // }
    // series.push(pie);
    return series;
}
//Graph Node
function getGraphNode(itemName,itemValue,index) {
    let res=[];
    for (let i = 0; i < itemName.length; i++) {
        let item={
            name:itemName[i],
            value:0,
            symbol:'circle',
            symbolSize: 50,
        };
        res.push(item);
    }
    if(index==0)
        return res;
    for (let i = 0; i < index; i++) {
        for (let j = 0; j < res.length; j++) {
            if(itemValue[i][j]!=itemValue[i+1][j])
                res[j].value++;
        }
    }
    return res;
}


// //Radar indicator Data
// function getIndicator(myData){
//     let res=[];
//
//     for (let i = 1; i < myData[0].length; i++) {
//         res.push({
//             text:myData[0][i],
//             max:150
//         });
//     }
//     return res;
// }
let triggerAction = function(action, selected,myChart) {
    legend = [];

    for ( name in selected) {
        if (selected.hasOwnProperty(name)) {
            legend.push({name: name});
        }
    }

    myChart.dispatchAction({
        type: action,
        batch: legend
    });
};

let isFirstUnSelect = function(selected) {

    let unSelectedCount = 0;
    for ( name in selected) {
        if (!selected.hasOwnProperty(name)) {
            continue;
        }

        if (selected[name] == false) {
            ++unSelectedCount;
        }
    }
    return unSelectedCount==1;
};

let isAllUnSelected = function(selected) {
    let selectedCount = 0;
    for ( name in selected) {
        if (!selected.hasOwnProperty(name)) {
            continue;
        }

        // 所有 selected Object 里面 true 代表 selected， false 代表 unselected
        if (selected[name] == true) {
            ++selectedCount;
        }
    }
    return selectedCount==0;
};
let showCompCharts = function(data,compChart){
    $(".main_center").stop().slideDown();
    compChart.resize();
    let option={
        baseOption: {
            tooltip: {},
            legend: {},
            toolbox: {
                feature: {
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                }
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    interval: 0,
                    rotate: 45
                }
            },
            yAxis: {
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                }
            },
            grid: {
                bottom: '30%'
            },
            dataset: {
                source: data
            },
            series: {
                name: data[1][0],
                type: 'bar',
                seriesLayoutBy: 'row',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#2378f7'},
                                {offset: 0.7, color: '#2378f7'},
                                {offset: 1, color: '#83bff6'}
                            ]
                        )
                    }
                },
                //柱状图上显示数据
                label: {
                    show: "true",
                    position: "top",
                    color: "#ccc",
                    fontWeight: "bolder",

                },
                markPoint: {
                    label: {
                        color: '#fff'
                    },
                    data: [
                        {type: 'max', name: '最大值'},
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }
        },
        media:[{
            query:{
                maxWidth:960
            },
            option:{
                xAxis: {
                    axisLabel: {
                        fontSize:6
                    }
                },
                label:{
                    fontSize: 6
                }
            }
        },
            {
                query:{
                    minWidth:960
                },
                option:{
                    xAxis: {
                        axisLabel: {
                            fontSize: 12
                        }
                    },
                    label:{
                        fontSize: 12
                    }
                }
            }
        ]
    };
    compChart.setOption(option);
}

function getMax(data){
    let max=data[0].value;
    for (let i = 1; i < data.length; i++) {
        if(data[i].value>max)
            max=data[i].value;
    }
    return max;
}
function getMaxData(myData){
    let max=myData[1][1];
    for (let i = 1; i < myData.length ; i++) {
        for (let j = 1; j < myData[i].length ; j++) {
            max=myData[i][j]>max?myData[i][j]:max;
        }
    }
    return max;
}
function getHeatMapData(bookName,itemName,itemValue) {
    let data=[];
    for (let i = 0; i < itemValue.length; i++) {
        for (let j = 0; j < itemName.length; j++) {
            let dataItem=new Array();
            if(itemValue[i][j]==0){
                 dataItem=[itemName[j],bookName[i],'-'];
            }
            else{
                 dataItem=[itemName[j],bookName[i],itemValue[i][j]]
            }

            data.push(dataItem);
        }
    }
    return data;
}
function getContentChangeInfoInChart(lastNodes,currentNodes){
    let varies=[];
    for(let cn of currentNodes){
        let flag=0;
        let vary=cn.name+' ';
        let dv=cn.value;
        for(let ln of lastNodes){
            if(cn.name==ln.name){
                dv=cn.value-ln.value;
                flag=1;
                break;
            }
        }
        if(dv>0)
            vary+='+'+dv+'g';
        else if(dv==0)
            vary+='=';
        else
            vary+='-'+Math.abs(dv)+'g';
        if(flag==0)
            vary+='(新增)';
        varies.push(vary);
    }
    return varies;
}
function getContentDeduct(itemName,itemValue,index){
    let res=[];
    for (let i = 0; i < itemName.length ; i++) {
        if(index!=0){
            if(itemValue[index][i]==0&&itemValue[index-1][i]!=0)
                res.push(itemName[i]);
        }

    }
    return res;
}

function getPreTreeData(itemName,itemValue,ages,bookName,AGE) {
    let map=new Map();
    let dynasty=ages;
    for (let i = 0; i < AGE.length; i++) {
        map.set(AGE[i],new Array());
    }
    for (let i = 0; i < dynasty.length-1; i++) {
        for (let j = 0; j < dynasty.length-1-i; j++) {
            let l=AGE.indexOf(dynasty[j]);
            let r=AGE.indexOf(dynasty[j+1]);
            if(l>r)
                swap(dynasty,j,j+1);
        }
    }
    console.log(dynasty);
    console.log(bookName);
    for (let i = 0; i < dynasty.length; i++) {
        let pres=[];
        for (let j = 0; j < itemName.length; j++) {
            if(itemValue[i][j]!=0)
                pres.push(itemName[j]);
        }
        let el=map.get(dynasty[i]);
        let node={
            name:bookName[i],
            children:[]
        };
        let item={
          node:node,
          prescription:pres
        };
       el.push(item);
       map.set(dynasty[i],el);
    }
    return map;
}

function getTreeData(itemName,itemValue,ages,bookName,AGE,presName) {
    let res={
        ages:[],
        data:[]
    };
    let order=new Array();
    let preData=getPreTreeData(itemName,itemValue,ages,bookName,AGE);
    preData.forEach(function(value,key){
        if(value.length==0)
            return true;
        order.push(key);
    });
    for (let i = order.length-1; i >0 ; i--) {
        let late=preData.get(order[i]);
        let early=preData.get(order[i-1]);
        for (let j = 0; j < late.length; j++) {
            let lPres=late[j].prescription;
            let maxSimilarity=0;
            let mostSimilar=0;
            for (let k = 0; k < early.length; k++) {
                let curSimilarity=getSetSimilarity(lPres,early[k].prescription);
                if(curSimilarity>maxSimilarity)
                    maxSimilarity=curSimilarity;
                    mostSimilar=k;
            }
            preData.get(order[i-1])[mostSimilar].node.children.push(late[j].node);
        }

    }
    let root={
        name:presName,
        children:[],
        label:{
            fontStyle:'italic',
            fontSize:14
        }
    }
    let firstOrder=preData.get(order[0]);
    for (let i = 0; i < firstOrder.length; i++) {
        root.children.push(firstOrder[i].node);
    }
    res.ages=order;
    res.data=root;
    return res;
}

function getSetSimilarity(arr1,arr2) {
    let intersection = arr1.filter(function (val) {
        return arr2.indexOf(val) > -1
    });
    let union = arr1.concat(arr2.filter(function (val) {
        return !(arr1.indexOf(val) > -1) }
        )
    )
    // Jaccard coefficient：
    let s=intersection.length/union.length;
    return s;

}

function isNewContent(itemName,itemValue,content,current) {
    let count=0;
    let index=-1;
    for (let i = 0; i < itemName.length; i++) {
        if(itemName[i]==content)
            index=i;
    }
    for (let i = 0; i < current; i++) {
        if(itemValue[i][index]>0)
            count++;
    }
    if(count==0)
        return true;
    else
        return false;
}

function contentInfoHandler(itemName,itemValue,current) {
    let infos=[];
    for (let i = 0; i < itemName.length; i++) {
        if(itemValue[current][i]==0)
            continue;
        let info=itemName[i]+itemValue[current][i]+'g';
        infos.push(info);
    }
    return infos;
}

function insertStr(str,tar,n,m){
    let x=''
    let s=str.split('')
    if(s.length==0) return
    for(let i=n;i<s.length;i+=m){
        s[i]+=tar
    }

    x=s.join("")
    return x
}

function getComponentFrequency(itemName,itemValue) {
    let res=[];
    for (let i = 0; i < itemName.length; i++) {
        let item={
            name:itemName[i],
            value:0
        }
        res.push(item);
    }
    for (let i = 0; i < itemName.length; i++) {
        for (let j = 0; j < itemValue.length; j++) {
            if(itemValue[j][i]!=0){
                res[i].value+=1;
            }
        }
    }
    return res;
}
function getGraphData(itemName,itemValue,bookName,indication) {
    let content=new Array();
    let res={
        data:[],
        indications:[],
        nodes:[],
        links:[]
    };
    for (let i = 0; i < itemValue.length; i++) {
        let contentItem=new Array();
        for (let j = 0; j < itemValue[i].length; j++) {
            if(itemValue[i][j]!=0){
                contentItem.push(itemName[j]);
            }
        }
        content.push(contentItem);
    }
    let dataList=new Array();
    let indications=new Array();
    for (let i = 0; i < content.length; i++) {
        let indItem=new Array();
        if(dataList.length==0){
            dataList.push(content[i]);
            indItem.push({
                bookName:bookName[i],
                indication:indication[i]
            });
            indications.push(indItem);
        }else{
            let flag=-1;
            dataList.forEach(function (v,index) {
                if(arrayEqual(v,content[i])){
                    flag=index;
                }
            });
            if(flag<0){
                dataList.push(content[i]);
                indItem.push({
                    bookName:bookName[i],
                    indication:indication[i]
                });
                indications.push(indItem);
            }else{
                indications[flag].push({
                    bookName:bookName[i],
                    indication:indication[i]
                });
            }
        }
    }
    res.data=dataList;
    res.indications=indications;
    res.nodes=getNodes(dataList);
    quickSort(dataList);
    res.links=getLinks(dataList);
    return res;
}

function getNodes(dataList) {
    let res=new Array();
    for (let i = 0; i < dataList.length; i++) {
        let item={
            name:dataList[i].join(' '),
            value:dataList[i].length,
            symbol:'circle',
            symbolSize:Math.sqrt(dataList[i].length)*15,
            itemStyle:{
                color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [{
                        offset: 0, color: '#38ef7d' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#11998e' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                },
            }
        }
        res.push(item);
    }
    return res;
}
function getLinks(dataList) {
    let res=[];
    let hasLinked=[];
    for (let i = 0; i<dataList.length; i++) {
        let maxSimilarity=0;
        let mostSimilar=0;
        for (let j = 0; j<dataList.length; j++) {
            if(j==i)
                continue;
            let curSimilarity=getSetSimilarity(dataList[i],dataList[j]);
            if(curSimilarity>maxSimilarity){
                maxSimilarity=curSimilarity;
                mostSimilar=j;

            }
        }
        let item={
            source:dataList[i].join(' '),
            target:dataList[mostSimilar].join(' ')
        }
        res.push(item);
    }
    return res;
}
function arrayEqual(arr1,arr2){
    if(arr1.length==arr2.length){
        return arr1.every(v=>arr2.includes(v));
    }else{
        return false;
    }
}
function isSubSet(sub,sup) {
    if(sup.length<=sub.length)
        return false;
    else{
        return sub.every(v=>sup.includes(v))
    }
}

function newLine(num,arr) {
    let res=new Array();
    for (let i = 0; i < arr.length; i++) {
       res.push(insertStr(arr[i],"\n",num,num));
    }
    return res;
}
function quickSort(arr, left, right) {
    /*
     * len为数组的长度;
     * left为需要数组中参与排序的起始点；right为数组中参与排序的终止点;
     * left如果有传数字那么就为left，没有传参则为0；
     * right如果有传参那么就为right，没有传参则为len-1;
     * 有传参可能会部分排序可能不会排序，没传参默认排序整个数组;
     * partitionIndex为分组界限;
     */
    var len = arr.length,
        partitionIndex,
        left = typeof left !== 'number' ? 0 : left,
        right = typeof right !== 'number' ? len - 1 : right;

    // 如果需要排序的起始索引小于终止索引则执行排序;递归的终止条件；
    if (left < right) {

        // partition的返回值作为partitionIndex来分隔数组；
        // 索引partitionIndex左边的元素均小于arr[partitionIndex]；
        // 右边的元素均大于arr[partitionIndex]；
        partitionIndex = partition(arr, left, right);

// 数组中小于arr[partitionIndex]的部分(索引left到partitionIndex-1)再次使用quickSort排序；
        quickSort(arr, left, partitionIndex - 1);

// 数组中大于arr[partitionIndex]的部分(索引partitionIndex+1到right)再次使用quickSort排序；
        quickSort(arr, partitionIndex + 1, right);
    }
    // 递归执行直到不满足left<right;返回本身；
    return arr;
}

function partition(arr, left, right) {
    /*
     * 这部分是具体实现排序的部分；
     * 将left赋值给pivot，作为参照物，因为left在最左边，只需要从左到右比较一遍即可判断整个数组；
     * index索引是arr中待交换位置；
     */
    var pivot = left,
        index = pivot + 1;
    // for循环从参照物arr[pivot]下一个元素arr[pivot+1]开始一直比较到子数组结束arr[right]；
    for (var i = index; i <= right; i++) {

        // 循环中如果有任何小于参照物的，就将他交换到index的位置，然后index向右移动到下一个位置；
        if (arr[i].length < arr[pivot].length) {
            swap(arr, i, index);
            index++;
        }
    }
    /*
     * 因为每次都是交换完后index移动到下一个位置，所以在循环结束时，index仍为待交换的位置；
     * 此时索引pivot+1到index-1的元素都小于参照物arr[pivot]；
     */

    // 交换pivot和index-1索引的值之后index-1索引左边全都是小于arr[index-1]的元素；
    swap(arr, pivot, index - 1);

    // 返回index-1作为拆分子数组的分界线；
    return index - 1;
}
/*
 * 普通的交换，将a[i]和a[j]的数值交换；
 */
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}