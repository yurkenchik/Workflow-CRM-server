
export class SearchFieldOptionsDto<T> {
    readonly field: keyof T;
    readonly value: T[keyof T];
}