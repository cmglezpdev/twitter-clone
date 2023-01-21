import { ITweet } from '../../interfaces/tweet';
import { IUser } from '../../interfaces/user';


export interface Comparer<T> {
    comp: (a: T, b: T) => number;
}

export class PinTweetComparer implements Comparer<ITweet> {
    user: IUser;

    constructor( user: IUser ){
        this.user = user;
    }

    comp(a: ITweet, b: ITweet) {
        return this._comp(a, b, this.user);
    }

    _comp ( a: ITweet, b: ITweet, user: IUser ) {
        if( user.pined === a._id ) return 1;
        if( user.pined === b._id ) return -1;
        if( new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime() ) return -1;
        if( new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ) return 1;
        return 0;
    }
}

export class TweetFeedComparer implements Comparer<ITweet> {
    comp(a: ITweet, b: ITweet) {
        if( new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime() ) return -1;
        if( new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ) return 1;
        return 0;
    }
}