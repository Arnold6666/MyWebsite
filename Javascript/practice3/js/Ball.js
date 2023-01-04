class Ball {
  constructor(_element, _mouseX = 0, _mouseY = 0, _ballX = 0, _ballY = 0, _diameter){
    this.element = _element;
    this.mouseX = _mouseX;
    this.mouseY = _mouseY;
    this.ballX = _ballX;
    this.ballY = _ballY;
    this.diameter = _diameter;
    this.strength = 0.1;
    this.drag = .3;
  }

  static getCssValue(element, cssName){
    const root_style = getComputedStyle(element);
    return root_style.getPropertyValue(cssName);
  }

  static convertToBall(x, d){
    x = x - d / 2;
    return x;
  }

  delayMotion() { 
    
    let distance_x = this.mouseX - this.ballX;
    distance_x *= this.strength;

    let distance_y= this.mouseY - this.ballY;
    distance_y *= this.strength;
    
    this.ballY += distance_y;
    this.ballX += distance_x;

    let pos_x = Ball.convertToBall(this.ballX, this.diameter);
    let pos_y = Ball.convertToBall(this.ballY, this.diameter);

    this.element.style.transform = `translate(${pos_x}px,${pos_y}px)`; //parseFloat轉為浮點數

    for(const halo of halos){
      let factor = Ball.getCssValue(halo, "--factor");
      let scaler = distance_x + distance_y;
      halo.style.transform = `scale(${factor * scaler * this.drag})`;
    }

    requestAnimationFrame(this.delayMotion.bind(this));
  }
}
