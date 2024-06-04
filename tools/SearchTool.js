export class SearchTool {
    constructor(name) {
      this.name = name;
    }
  
    search(query) {
      throw new Error(`${this.name} has not implemented the search method.`);
    }
  }


  /**
   * Represents a Search Tool Summary.
   * @typedef {Object} Summary
   * @property {string} toolName - The name of the tool that was run
   * @property {string} results - the textual summary of the search tool used
   */
