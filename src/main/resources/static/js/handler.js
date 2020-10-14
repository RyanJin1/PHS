const AGE_FILTER = 0;
const IND_FILTER = 1;
const COMP_FILTER = 2;
const SIM_FILTER = 3;

//control the show of tip
const handleFilterTip = function () {
    $('#filter_tip').mouseover(() => {
        $('#tip_content').css('display','block')
    });
    $('#filter_tip').mouseout(() => {
        $('#tip_content').css('display','none')
    });
}

const updateData = function (filters) {
    let filteredNodes,filteredLinks;
    if(filters[COMP_FILTER] != '')
        filters[COMP_FILTER] = filters[COMP_FILTER].split(/[,，]/);
    filteredNodes = nodes.filter( n => {
        return allAges.indexOf(n.age) >= allAges.indexOf(filters[AGE_FILTER])
    });
    filteredNodes = filteredNodes.filter( n => {
        return (n.indication == null ? '' : n.indication).indexOf(filters[IND_FILTER]) !== -1
    });
    if(filters[COMP_FILTER] instanceof Array){
        filteredNodes = filteredNodes.filter( n => {
            let comp = n.hc.map( c => c.plantName)
            for(let f of filters[COMP_FILTER]) {
                if(comp.indexOf(f) == -1)
                    return false;
            }
            return true;
        });
    }

    if(filter_function == 0){
        let fl = filters[SIM_FILTER] == '' ? 0 : Number(filters[SIM_FILTER]);
        filteredLinks = links.filter( l => l.similarity >= fl)
        filteredLinks = filteredLinks.filter( l => {
            let nodeIds = filteredNodes.map( n => n.id);
            return nodeIds.indexOf(l.source.id) !== -1 && nodeIds.indexOf(l.target.id) !== -1;
        })
        updateNodes = filteredNodes;
        filteredAges = Array.from(new Set(filteredNodes.map( n => {
            return n.age;
        }))).reverse();
        updateLinks = filteredLinks;
    }else{
        let fl = filters[SIM_FILTER] == '' ? paraVis.filterRatio : Number(filters[SIM_FILTER]);
        updateNodes = filteredNodes;
        paraVis.setData(updateNodes);
        paraVis.filterRatio = fl;
    }


}

const filterHandler = function () {
    let age = $('#age_filter_input').val();
    let indication = $('#ind_filter_input').val();
    let component = $('#comp_filter_input').val();
    let similarity = $('#link_filter_input').val();

    let filters = [age,indication,component,similarity];

    let err = filterValidator(filters);

    if(err == ''){
        updateData(filters);
        if(filter_function == 0)
            renderUpdate();
        else
            paraVis.render();
    }else{
        alert(err);
    }

}


const filterValidator = function (filters) {

    let err = '';
    filters.forEach( (f,i) => {
        switch (i) {
            case AGE_FILTER :{
                if(allAges.indexOf(f.trim()) < 0 && f.trim() != ''){
                    err = err + ((err == '')?'':';')+'请参考图例输入正确的朝代名称！'
                }

                break;
            }
            case IND_FILTER :{
                break;
            }
            case COMP_FILTER :{
                break;
            }
            case SIM_FILTER :{
                let num = null;
                const re = /^\d+(?=\.{0,1}\d+$|$)/;
                if(f.trim() != ''){
                    if(!re.test(f.trim()))
                        err = err + ((err == '')?'':';')+'请确保您输入的是数字或小数！'
                    else{
                        num = Number(f.trim());
                        if(num > 1)
                            err = err + ((err == '')?'':';')+'请确保您输入的是0~1之间的数字！';
                    }
                }
                break;
            }
            default:
                break;
        }
    });
    return err

}

const setInputEmpty = function () {
    $('#age_filter_input').val('');
    $('#ind_filter_input').val('');
    $('#comp_filter_input').val('');
    $('#link_filter_input').val('');
}

const resetFilter = function () {
    updateNodes = nodes;
    updateLinks = links;
    filteredAges = allAges;

    setInputEmpty();

    if(filter_function == 0)
        renderUpdate();
    else{
        paraVis.setData(updateNodes)
        paraVis.filterRatio = 0.05
        paraVis.render();
    }


}

function toggleViewHandler($this){
    if(!$this.hasClass('active')){
        $this.children('.active_img').css('display','inline-block');
        $this.children('.inactive_img').css('display','none');
        $this.addClass('active')
        const otherButton = $this.siblings('.toggle_button').removeClass('active')
        otherButton.children('.active_img').css('display','none');
        otherButton.children('.inactive_img').css('display','inline-block');
        if($this.is('#graph_button')){
            filter_function = 0;
            viewToggleAnimation($('#graph_module'))
            $('#link_filter').find('label').html('similarity:')
        }
        else if($this.is('#parallel_button')){
            filter_function = 1;
            if(ParallelVis.instanceNum == 0){
                let data = updateNodes;
                paraVis = ParallelVis.getInstance(data);
                console.log("change");
                paraVis.render();
            }
            viewToggleAnimation($('#parallel_module'))
            $('#link_filter').find('label').html('frequency:')
        }
        setInputEmpty()
    }

}