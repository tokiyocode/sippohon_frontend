import _ from "lodash";

class SippohonProvider {
    constructor(options) {
        this.onSearch = options.onSearch;
    } 
    

    async search({ query }) {
        this.onSearch(query);

        return [];
    } 
}

export default SippohonProvider;