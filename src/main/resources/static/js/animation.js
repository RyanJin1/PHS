function viewToggleAnimation($this) {
    $this.siblings('.visual_module').stop().animate({
        width : 0,
        height : 0
    }, 500 , 'linear' , function () {
        $(this).css('display','none')
        $this.stop().show( 500 ,'linear',function () {
            $this.stop().animate({
                width : '100%',
                height : '100%'
            },500)
        });
    });
}