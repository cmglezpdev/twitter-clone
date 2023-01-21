import { Comparer } from "./comparers";

export interface ISort<T> {
    sort: ( items: T[], comp: Comparer<T> ) => T[];
}


export class BubbleSort<T> implements ISort<T> {
    
    comparer: Comparer<T>;

    constructor(
        comp: Comparer<T>
    ){
        this.comparer = comp;
    }

    sort (items: T[]) {
        const len = items.length;
        const copy = [...items];

        // TODO: FIX PROBLEM WITH THE REFERENCE
        for( let i = 0; i < len - 1; i ++ ) {
            for(let j = i + 1; j < len; j ++) {
                if( this.comparer.comp(copy[i], copy[j]) < 0 ) {
                    [copy[i], copy[j]] = [copy[j], copy[i]]
                }
            }
        }
        
        return copy;
    }
}


