interface ComponentFactory {
  createButton(): Button;
}

class IOSComponentFactory implements ComponentFactory {
  createButton() {
    return new IOSButton();
  }
}

class AndroidComponentFactory implements ComponentFactory {
  createButton() {
    return new AndroidButton();
  }
}

interface Button {
  onClick(): void;
}

class IOSButton implements Button {
  onClick() {
    console.log("IOS button click");
  }
}

class AndroidButton implements Button {
  onClick() {
    console.log("Android button click");
  }
}

class Page {
  factory: ComponentFactory;

  constructor() {
    // this.factory = new IOSComponentFactory();
    this.factory = new AndroidComponentFactory();
  }

  render() {
    const button = this.factory.createButton();
    button.onClick();
  }
}
