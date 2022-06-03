class Element{
  createElement(elemType, className, text, id){
    const element = document.createElement(elemType);
    if(text) {
      element.textContent = text;
    }
    element.classList.add(...className);
    if(id){
      element.id = id;
    }
    return element
  }
}

export default Element