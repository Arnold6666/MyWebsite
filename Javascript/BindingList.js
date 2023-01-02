class BindingList {
  constructor(_element){
    this.element = _element;
    this.textList = []
  }

  static createListItem(text){
    const li = document.createElement("li");
    li.textContent = text;
    return li;
  }

  update(){

    while(this.element.firstChild){
      this.element.removeChild(this.element.firstChild);
    }
    
    for(const text of this.textList){
      console.log(text);
      this.element.appendChild(BindingList.createListItem(text));
    }
  }

  add(text){
    this.textList.push(text);
    this.update();
  }

  remove(index){
    this.textList.splice(index,1);
    this.update();
  }
}