
// structure returned by getEntries
interface mod {
    m:string;
    w: number[];
    e: number;
}

declare module modCheckData {
    // substitute sort code if required
    function  replaceSort(sort:number):number;  
    // get set of entries to use
    function  getEntries(sort:number):mod[];  
}