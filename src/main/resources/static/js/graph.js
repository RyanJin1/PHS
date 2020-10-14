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

function processData(data) {
    let nodes = []
    let links = []
    data.sort((a,b) => {
        return age.indexOf(a.age)-age.indexOf(b.age);
    });
    nodes = data.map( (d,i) => {
        d.id = i;
        return d;
    });
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            let similarity = getSetSimilarity(nodes[i].hc,nodes[j].hc)
            if(similarity == 0)
                continue;
            links.push({
                source : i,
                target : j,
                similarity : similarity
            });
        }
    }
    nodes.forEach( node => {
        let relateTmp = [];
        links.forEach( l => {
            if(l.source == node.id)
                relateTmp.push(l.target)
            if(l.target == node.id)
                relateTmp.push(l.source)
        });
        let relatedNodes = Array.from(new Set(relateTmp));
        node.relatedNodes = relatedNodes;

    })
    let proData = {
        nodes : nodes,
        links : links,
    }

    console.log(proData);
    return proData;
}
function renderLegend(){
    legend = svg.selectAll('.legend').data(allAges)
        .join('g')
        .attr('class','legend')
        .attr('transform',function (d, i) {
            return 'translate(30,'+(30 + i * 25)+')';
        });
    legend.append('rect')
        .data(allAges)
        .style('fill', d => {
            if(filteredAges.indexOf(d) != -1)
                return color(d)
            else
                return '#cccccc'
        })
        .attr('width', 30)
        .attr('height', 20)
        .attr('x', 0)
        .attr('y', 0)
        .on('mouseover',function (e,a) {
            if(filteredAges.indexOf(a) !== -1){
                d3.select(this).attr('width',36)
                    .attr('height',24)
                d3.selectAll('.pres_node').attr('r',function (n) {
                    if(a == n.age){
                        return n.hc.length*Math.sqrt(8);
                    }else{
                        return n.hc.length*Math.sqrt(5);
                    }
                })
            }
        })
        .on('mouseout',function (e,a) {
            if(filteredAges.indexOf(a) !== -1){
                d3.select(this).attr('width',30)
                    .attr('height',20)
                d3.selectAll('.pres_node').attr('r',n => n.hc.length*Math.sqrt(5))
            }
        });

    legend.append('text')
        .data(allAges)
        .attr('class','legend_text')
        .attr('x',55)
        .attr('y',9)
        .attr('dy','.5em')
        .style('text-anchor','middle')
        .text( d => d);

}

function setZoom() {
    let zoomed = function({transform}){
        g.attr('transform', transform);
    }

    zoom = d3.zoom()
        .extent([[0,0],[innerWidth,innerHeight]])
        .scaleExtent([1,8])
        .on('zoom',zoomed)
// svg层绑定zoom事件，同时释放zoom双击事件
    svg.call(zoom)
}

const nodeMouseOver = function (e, d, $this) {
    if(d3.select($this).attr('stroke') !== 'red')
        d3.select($this).attr('stroke', 'black').attr('stroke-width',1)
    d3.selectAll('.pres_link').attr('opacity',l => {
        if(l.source == d || l.target == d)
            return 1
        else
            return 0.08
    });
    if(updateNodes.length > 15){
        d3.selectAll('.pres_text').attr('display', t => {
            if(d.relatedNodes.indexOf(t.id) != -1||d.id == t.id)
                return 'inline';
        })
    }
}

const nodeMouseOut = function (d , $this){
    if(d3.select($this).attr('stroke') !== 'red')
        d3.select($this).attr('stroke', 'none')
    d3.selectAll('.pres_link').attr('opacity', 0.2);
    if(updateNodes.length > 15){
        d3.selectAll('.pres_text').attr('display', 'none')
    }
}
function render() {

    setZoom()
    textScale = d3.scaleLinear()
        .domain([d3.min(nodes, d => d.hc.length),d3.max(nodes, d => d.hc.length)])
        .range([0.5,1.5]);


    lines = g.selectAll('.pres_link').data(updateLinks).enter().append('line')
        .attr('class','pres_link')
        .attr('stroke','black')
        .attr('stroke-width',.5)
        .attr('opacity',0.2)



    circles = g.selectAll('.pres_node').data(updateNodes).enter().append('circle')
        .attr('class','pres_node')
        .attr('r', d => d.hc.length*Math.sqrt(5))
        .attr('fill',fill)
        .attr('cursor','pointer')
        .on('mouseover',function(e,d) {nodeMouseOver(e,d,this)})
        .on('mouseout', function(d) {nodeMouseOut(d,this)} )
        .on('click',function (e,d) { circleClick(d,this)});




    texts = g.selectAll('.pres_text').data(updateNodes).enter().append('text')
        .attr('class','pres_text')
        .attr('fill','black')
        .attr('text-anchor','middle')
        .attr('display',function () {
            if(updateNodes.length > 15)
                return 'none'
            else
                return 'inline'
        })
        .attr('dy',d => {
            return 1.8*d.hc.length*Math.sqrt(5);
        })
        .attr('font-size', d => {
            return textScale(d.hc.length) + 'em'
        })
        .text(d => {
            return d.bookName;
        })


    renderLegend()

}
function renderUpdate() {
    circles.remove();
    lines.remove();
    texts.remove();
    legend.remove();

    simulation.stop();
    render()
    simulation.restart();

}



function ticked(){
    lines
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
    circles
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
    texts
        .attr('x', d => d.x)
        .attr('y', d => d.y)
}

function setSimulation(){
    simulation = d3.forceSimulation(nodes)
        .force('manyBody', d3.forceManyBody().strength(-30))
        .force('center', d3.forceCenter(width / 2 - 50, height / 2 - 50))
        .force("link", d3.forceLink(links).strength(0.1).distance( d => {
            return Math.log(1/d.similarity+1)*200;
        }))
        //.alphaTarget(0.1)
        .on('tick', ticked);
}




let getSetSimilarity = function getSetSimilarity(arr1,arr2) {
    let a1 = arr1.map( c => c.plantName);
    let a2 = arr2.map( c => c.plantName)
    let intersection = a1.filter(function (val) {
        return a2.indexOf(val) > -1
    });
    let union = a1.concat(a2.filter(function (val) {
            return !(a1.indexOf(val) > -1) }
        )
    )
    // Jaccard coefficient：
    let s = (intersection.length/union.length).toFixed(2);
    return s;

}

function setColor(arr,colorType){
    let t = 0.2
    let scheme = []
    let step = (1 - t)/arr.length
    arr.forEach( a => {
        scheme.push(colorType(t));
        t += step
    })
    return scheme;

}
class DetailVis{
    static instanceNum = 0;
    static instance;
    static pieSvg;
    static barSvg;
    static pieWidth;
    static pieHeight;
    static barWidth;
    static barHeight;
    static barMargin;
    static barInnerWidth;
    static barInnerHeight;
    static colorScale;
    pie;//set of pie
    pieArc; //set of pie’s arc
    xScale;//map of x
    yScale;//map of y
    xAxis;
    yAxis;
    xAxisGroup;
    yAxisGroup;
    pie_g;
    bar_g;
    data;
    static getInstance(data){
        if(DetailVis.instanceNum == 0){
            DetailVis.instance = new DetailVis(data);
            this.instanceNum++;
        }
        return DetailVis.instance;
    }
    constructor(data) {
        DetailVis.pieSvg = d3.selectAll('.comp_pie');
        DetailVis.barSvg = d3.selectAll('.comp_bar');
        DetailVis.pieWidth = +DetailVis.pieSvg.attr('width');
        DetailVis.pieHeight = +DetailVis.pieSvg.attr('height');
        DetailVis.barWidth = +DetailVis.barSvg.attr('width');
        DetailVis.barHeight = +DetailVis.barSvg.attr('height');
        DetailVis.barMargin = {top : 20 , left : 50, bottom : 80, right : 20};
        DetailVis.barInnerWidth = DetailVis.barWidth - DetailVis.barMargin.left - DetailVis.barMargin.right;
        DetailVis.barInnerHeight = DetailVis.barHeight - DetailVis.barMargin.top - DetailVis.barMargin.bottom;
        this.data = data;
        this.data.sort((a,b) => b.content - a.content);
        DetailVis.colorScale = d3.scaleOrdinal(setColor(this.data,d3.interpolateBlues).reverse());

    }
    renderDetailInit(){
        let $this = this;
        this.removeAll();
        this.pg = DetailVis.pieSvg.append('g')
            .attr('class','pie_g')
            .attr('transform','translate('+DetailVis.pieWidth/2+','+DetailVis.pieHeight/2+')');
        this.bg = DetailVis.barSvg.append('g')
            .attr('class','bar_g')
            .attr('transform','translate('+DetailVis.barMargin.left+','+DetailVis.barMargin.top+')');
        this.xScale = d3.scaleBand()
            .domain(this.data.map(d => d.plantName))
            .range([0,DetailVis.barInnerWidth])
            .padding(0.2)
        this.yScale = d3.scaleLinear()
            .domain([0,d3.max(this.data, d => d.content)].reverse())
            .range([0,DetailVis.barInnerHeight])
            .nice()
        this.xAxis = d3.axisBottom(this.xScale).tickPadding(10);
        this.yAxis = d3.axisLeft(this.yScale);


        this.xAxisGroup = this.bg.append('g').call(this.xAxis).attr('transform','translate(0,'+DetailVis.barInnerHeight+')');
        this.xAxisGroup.selectAll('text').attr('dy',function (d , i) {
            if($this.data.length >= 12){
                if( i % 2 == 0)
                    return '.5em'
                else
                    return '1.75em'
            }
            else{
                return 0
            }

        });
        this.yAxisGroup = this.bg.append('g').call(this.yAxis)

        this.xAxisGroup.append('text')
            .attr('fill','#333333')
            .attr('font-size','1.5em')
            .attr('text-anchor','middle')
            .attr('x', DetailVis.barInnerWidth/2)
            .attr('y', 30)
            .attr('dy', function () {
                if($this.data.length >= 12)
                    return '2em'
                else
                    return '.5em'
            })
            .text('药味')


        this.yAxisGroup.append('text')
            .attr('fill','#333333')
            .attr('font-size','1.5em')
            .attr('transform','rotate(-90)')
            .attr('text-anchor','middle')
            .attr('x', -DetailVis.barInnerHeight / 2)
            .attr('y', '-2.5em')
            .text('含量(g)')
    }

    renderBarChart(){
        this.bg.selectAll('.comp_bar').data(this.data).enter().append('rect')
            .attr('x', d => this.xScale(d.plantName))
            .attr('y', d => this.yScale(d.content))
            .attr('fill' , d => DetailVis.colorScale(d.plantName))
            .attr('width', d => this.xScale.bandwidth())
            .attr('height', d => DetailVis.barInnerHeight-this.yScale(d.content))
    }

    renderPieChart(){
        this.pieArc = d3.arc()
            .innerRadius(0)
            .outerRadius(110);
        const labelRadius = 85;
        const arcLabels = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
        this.pie = d3.pie()
            .value( d => d.content);
        this.pg.selectAll('.comp_arc').data(this.pie(this.data), d => d.data.plantName).enter().append('path')
            .attr('fill', d => DetailVis.colorScale(d.data.plantName))
            .attr('d',this.pieArc)
        this.pg.selectAll('.comp_text').data(this.pie(this.data), d => d.data.plantName).enter().append('text')
            .attr('transform', (d) => {
                const x = (d.endAngle + d.startAngle) / 2 * 180 / Math.PI;
                return 'translate('+ arcLabels.centroid(d) + ') rotate(' +(90 + x) +
                    ') rotate('+(x < 180 ? 180 : 0)+')';
            })
            .attr('font-family', 'sans-serif')
            .attr('font-size',d => {
                if(d.endAngle - d.startAngle <= 0.5)
                    return 10;
                else
                    return 12;
            })
            .attr('text-anchor','middle')
            .attr('fill', d => {
                let color = d3.rgb(DetailVis.colorScale(d.data.plantName));
                if(d3.hsl(color).l >= 0.5)
                    return 'black';
                else
                    return 'white';
            })
            .call(text => text.append('tspan')
                .attr('y', 5)
                .text(d => d.data.plantName));



    }

    removeAll(){
        d3.selectAll('.pie_g').remove();
        d3.selectAll('.bar_g').remove();

    }


}

//get data of clicked circle
function circleClick(d,$this) {
    $('.detail_info').remove();
    let vis = DetailVis.getInstance(d.hc);
    if(d3.select($this).attr('stroke') == 'red'){
        d3.select($this).attr('stroke','none')
        vis.removeAll();
    }else{
        d3.selectAll('.pres_node').attr('stroke','none')
        d3.select($this).attr('stroke','red')
            .attr('stroke-width', 2)
        vis.renderDetailInit();
        vis.renderBarChart();
        vis.renderPieChart();
        $('.detail_box').append('<ul class="detail_info">' +
            '<li><span>出处:</span>'+d.bookName+'</li>' +
            '<li><span>朝代:</span>'+d.age+'</li>' +
            '<li><span>组成:</span>'+concatComponents(d.hc)+'</li>' +
            '<li><span>功效:</span>'+(d.effects == null ? '暂无此数据' : d.effects)+'</li>' +
            '<li><span>用法:</span>'+(d.useWay == null ? '暂无此数据' : d.useWay)+'</li>' +
            '<li><span>主治:</span>'+(d.indication == null ? '暂无此数据' : d.indication) +'</li>' +
            '</ul>')
    }

}

//parallel render
class ParallelVis{

    static instanceNum = 0;
    static instance;
    static svg;
    static g;
    static width;
    static height;
    static innerHeight;
    static innerWidth;
    static margin;
    filterRatio = 0.05;
    paths;
    axises;
    dimensions;
    filteredDims;
    yScales;
    xScale;
    data;

    static getInstance(data){
        if(ParallelVis.instanceNum == 0){
            ParallelVis.instance = new ParallelVis(data);
            this.instanceNum++;
        }
        return ParallelVis.instance;
    }

    constructor(data) {
        ParallelVis.svg = d3.select('#parallel_module');
        ParallelVis.width = ParallelVis.svg.attr('width');
        ParallelVis.height = ParallelVis.svg.attr('height');
        ParallelVis.margin = { left : 60 , bottom : 60 , right : 60 , top : 60}
        ParallelVis.innerHeight = ParallelVis.height - ParallelVis.margin.top - ParallelVis.margin.bottom;
        ParallelVis.innerWidth = ParallelVis.width - ParallelVis.margin.left - ParallelVis.margin.right;
        ParallelVis.g = ParallelVis.svg.append('g').attr('transform','translate('+ParallelVis.margin.left+','+ParallelVis.margin.top+')');
        let set = [];
        for(let d of data){
            d.hc.map(c => {
                set.push(c.plantName);
            })
        }
        this.data = data;
        this.dimensions = Array.from(new Set(set));


    }
    getContent(d , p){
        for( let c of d.hc){
            if(c.plantName == p){
                return c.content;
            }
        }
        return 0;
    }

    getMaxContent(){
        return d3.max(this.data.map(d => d3.max(d.hc, c => {
                if(this.filteredDims.indexOf(c.plantName) < 0)
                    return 0;
                else
                    return c.content;
            })),m => m);
    }

    setData(data){
        this.data = data;
    }

    filterDimension(data){
        let compSum = this.data.reduce(function (total,d) {
            return total+d.hc.length;
        },0);
        let ratio = this.dimensions.map(d => {
            let count = 0;
            for ( let datum of data){
                for (let c of datum.hc){
                    if(c.plantName == d)
                        count++;
                }
            }
            return count/compSum;
        });
        this.dimensions.sort((a,b) => {
            return ratio[this.dimensions.indexOf(b)]-ratio[this.dimensions.indexOf(a)];
        })
        ratio.sort((a,b) => b - a);
        let filteredDims = this.dimensions.filter((d,i) => {
            if(ratio[i] <= this.filterRatio)
                return false;
            return true;
        })
        return filteredDims;
    }

    setPath(d, $this){
        return d3.line()(
            $this.filteredDims.map(function (p) {
                return [$this.xScale(p),$this.yScales[p](Math.log($this.getContent(d,p)+1))]
                }
            )
        )
    }

    removeAll(){
        d3.selectAll('.para_paths').remove();
        d3.selectAll('.para_axises').remove();
    }

    render(){

        this.removeAll();
        this.filteredDims = this.filterDimension(this.data);
        this.yScales = {}
        let max_content = this.getMaxContent(this.data);
        for (let i in this.filteredDims){
            let name = this.filteredDims[i];
            this.yScales[name] = d3.scaleLinear()
                .domain([0 , Math.log(max_content)])
                .range([ParallelVis.innerHeight, 0])
        }
        this.xScale = d3.scalePoint()
            .range([0, ParallelVis.innerWidth])
            .padding(1)
            .domain(this.filteredDims);

        let $this = this;
        ParallelVis.g.append('text')
            .attr('class','title')
            .attr('font-size','2em')
            .attr('stroke','black')
            .text('药味')
            .attr('text-anchor','middle')
            .attr('x',ParallelVis.innerWidth/2)
            .attr('y',-38);
        ParallelVis.g.append('text')
            .attr('class','title')
            .attr('font-size','2em')
            .attr('stroke','black')
            .text('药量(对数)/g')
            .attr('transform','rotate(-90)')
            .attr('text-anchor','middle')
            .attr('x',-ParallelVis.innerHeight/2)
            .attr('y',0)
        this.paths = ParallelVis.g.selectAll('.para_paths').data(this.data).enter().append('path')
            .attr('class','para_paths')
            .attr('stroke','#3de1ad')
            .attr('stroke-width', 1)
            .attr('fill','none')
            .attr('cursor','pointer')
            .attr('opacity', 0.5)
            .attr('d', d => {
                return this.setPath(d,$this)
            })
            .on('mouseover', function (d) {
                d3.select(this).attr('stroke-width', 3)
                    .attr('opacity',.8)
            })
            .on('mouseout', function (d) {
            d3.select(this).attr('stroke-width', 1)
                .attr('opacity',.5)
            });
        this.axises = ParallelVis.g.selectAll('.para_axises').data(this.filteredDims).enter().append('g')
            .attr('class','para_axises')
            .attr('transform',function (d) {
                return 'translate('+$this.xScale(d)+')';
            })
            .each(function (d) {
                d3.select(this).call(d3.axisLeft().scale($this.yScales[d]));
            })
            //append axis title
            .append('text')
            .attr('text-anchor','middle')
            .attr('y', -9)
            .text(d => d)
            .attr('fill', 'black')

    }
}



