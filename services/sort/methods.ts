import { Comparer } from "./comparers";

export interface ISort<T> {
    sort ( items: T[], comp: Comparer<T> ): T[];
}


export class BubbleSort<T> implements ISort<T> {
    
    comparer: Comparer<T>;

    constructor(
        comp: Comparer<T>
    ){
        this.comparer = comp;
    }

    public sort (items: T[]) {
        const len = items.length;
        const copy = [...items];

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


export class MergeSort<T> implements ISort<T> {
    
    comparer: Comparer<T>;

    constructor(
        comp: Comparer<T>
    ){
        this.comparer = comp;
    }

    public sort (items: T[]) {
        const len = items.length - 1;
        const copy = [...items];
        return this.MergeSort(copy, 0, len);
    }

    private MergeSort(items: T[], l: number, r: number): T[] {
        if( l === r )
            return [items[l]];
        
        const middle = Math.floor((l + r) / 2);
        const left =  this.MergeSort( items, l, middle );
        const right = this.MergeSort( items, middle + 1, r );
    
        return this.Merge(left, right);
    }

    private Merge(left: T[], right: T[]): T[] {
        const result: T[] = []
        let l = 0, r = 0;
        while( l < left.length || r < right.length ) {
            if( l === left.length ) result.push(right[r ++]);
            else if( r === right.length ) result.push(left[l ++]);
            else result.push( this.comparer.comp(left[l], right[r]) >= 0 ? left[l ++] : right[r ++] );
        }
        
        return result;
    }
} 