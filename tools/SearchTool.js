export class SearchTool {
    constructor(name) {
      this.name = name;
    }
  
    search(query) {
      throw new Error(`${this.name} has not implemented the search method.`);
    }
  }


