function concatComponents(components){
    let res = '';
    components.forEach((c,i) => {
        res += c.plantName + c.content + '克' + ( i == components.length - 1 ? '' : '；');
    })
    return res;
}