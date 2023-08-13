// base - product.find()

// big-Q   /api/v1/product?search=coder&page=2&category=shortsleeves&rating=4&price[lte]=999&price[gte]=199&limit=5

class whereClause{
    constructor(base, bigQ){
        this.base = base;
        this.bigQ = bigQ;
    }

    search(){

        const searchword = this.bigQ.search ? {
            name : {
                $regex: this.bigQ.search,  
                $options: 'i' 
            }
        } : {}; 

        this.base = this.base.find({...searchword});
        return this;
    }

    // filtering rest values except page, limit, search
    filter(){
        const copyQ = {...this.bigQ};

        delete copyQ["search"];
        delete copyQ["page"];
        delete copyQ["limit"];

        // converting bigQ into string => copyQ
        let stringOfcopyQ = JSON.stringify(copyQ);

        stringOfcopyQ = stringOfcopyQ.replace(/\b{gte|lte|gt|lt}\b/g, (m) => `$${m}`);

        const jsonOfCopyQ = JSON.parse(stringOfcopyQ);
        this.base = this.base.find(jsonOfCopyQ);

        return this;
    }

    // for page we oly want to add limit and skip
    // resultperPage gives how many products we want to show per page 
    pager(resultPerPage){
        let currentPage = 1;

        if(this.bigQ.page){
            currentPage = this.bigQ.page;
        }
        const skipVal = resultPerPage * (currentPage - 1);

        this.base = this.base.limit(resultPerPage).skip(skipVal);
        return this;
    }
}

module.exports = whereClause;