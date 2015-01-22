function Slider(container, nav) {
    this.container = container;
    this.nav = nav.show();

    this.images = this.container.find('img');
    this.imgCount = this.images.length;

    this.imgLngt = this.images[0].width;
    this.current = 0;
}

Slider.prototype.transition = function(coords) { // coords to manaully override the settings
    this.container.animate({
        'margin-left': -( coords || this.current * this.imgLngt)
    });
};

Slider.prototype.setCurrent = function( dir ) {
    var pos = this.current;

    pos += ( ~~( dir === 'next' ) || -1 );
    this.current = ( pos < 0 ) ? this.imgsLen - 1 : pos % this.imgsLen;

    return pos;
};

(function() {
    var slider = new Slider( $('div.slider ul') , $('#slider-nav') );

    slider.nav.show().find('button').on('click', function() {
        slider.setCurrent( $(this).data('dir') );
        slider.transition();
    });

}());