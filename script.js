class handleBar{
  #isPressed;
  constructor(){
    window.addEventListener('mousedown',(e)=>{
      /*emtpy the body inline styles , just in case youre shifting from touch devices
      to click devices then you have to remove the cursor:default; style*/
      document.querySelector('body').style = '';
      this.#isPressed = true;
      this.#moveBar(e.clientX);
    });
    window.addEventListener('mousemove',(e)=>{
      if(this.#isPressed){
        this.#moveBar(e.clientX);
      }
    });
    window.addEventListener('mouseup',()=>{
      this.#isPressed = false;
    });

    //mobile screens
    window.addEventListener('touchstart',(e)=>{
      this.#isPressed = true;
      this.#moveBar(e.touches[0].clientX);   
    });
    window.addEventListener('touchend',()=>{
      this.#isPressed = false;
    });
    window.addEventListener('touchmove',(e)=>{
      if(this.#isPressed){
        this.#moveBar(e.touches[0].clientX);
      }
    });

    window.addEventListener('resize',()=>{    
      const bodyStyles = getComputedStyle(document.body);
      const leftValue = Number(bodyStyles.getPropertyValue('--left-value').replace('px',''));
      const isTouchDevice = navigator.maxTouchPoints > 0;
      if(leftValue  > (window.innerWidth - 10)){
        document.querySelector('body').style = `--left-value:${(window.innerWidth - 10) + 'px'}; ${isTouchDevice ? 'cursor:default;' : ''}`;
      };
    });
  };

  #moveBar(leftCoordinate){
    const isTouchDevice = navigator.maxTouchPoints > 0;
    //if the bar left value is out of screen then adjust it properly
    const leftValue = ((leftCoordinate - 5) < 0 ?  0 : (leftCoordinate - 5)  > (window.innerWidth - 10) ?  window.innerWidth - 10: (leftCoordinate - 5)) + 'px';
    document.querySelector('body').style = `--left-value:${leftValue}; ${isTouchDevice ? 'cursor:default;' : ''}`;
  };
};

new handleBar();
