
type TMonth = { name: string, short: string }

const months: TMonth[] = [
    { name: 'January', short: 'Jan' },
    { name: 'February', short: 'Feb' },
    { name: 'March', short: 'Mar' },
    { name: 'April', short: 'Apr' },
    { name: 'May', short: 'May' },
    { name: 'June', short: 'Jun' },
    { name: 'July', short: 'Jul' },
    { name: 'August', short: 'Aug' },
    { name: 'September', short: 'Sep' },
    { name: 'October', short: 'Oct' },
    { name: 'November', short: 'Nov' },
    { name: 'December', short: 'Dec' }
];


export const formatDistance = ( date: Date | string, now: Date | string  = new Date() ) => {
    if( typeof date === 'string' ) date = new Date(date);
    if( typeof now === 'string' ) now = new Date(now);

    const seconds = Math.abs( Math.floor( ( now.getTime() - date.getTime() ) / 1000 ) );

    if( now.getFullYear() !== date.getFullYear() ) 
        return `${months[date.getMonth()].short} ${date.getFullYear()}`; // different year

    if( seconds < 60 )  return `${seconds}s`; // seconds < 1 minute
    if( seconds < 3600 )  return `${Math.floor(seconds / 60)}m`; // seconds < 1 hour
    if( seconds < 86400 )  return `${Math.floor(seconds / 3600)}d`; // seconds < 1 day
    return `${months[date.getMonth()].short} ${date.getDate()}`; // seconds > 1 day
}

export const formatJoined = ( date: Date | string ) => {
    if( typeof date === 'string' ) date = new Date(date);

    return `${months[date.getMonth()].name} ${date.getFullYear()}`;
}