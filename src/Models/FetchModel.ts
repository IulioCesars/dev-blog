export interface FetchModel<T> 
{
    IsLoading: boolean
    Source?: T;
}

export function CreateFetchModel<T>(source: T, isLoading: boolean = false): FetchModel<T>
{
    return {
        IsLoading: isLoading,
        Source: source
    }
}