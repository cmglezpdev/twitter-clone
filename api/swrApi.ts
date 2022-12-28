
// @ts-ignore
export const fetcher  = (...args) => fetch(...args).then(res => res.json());

export const swrConfig = {
    fetcher
}