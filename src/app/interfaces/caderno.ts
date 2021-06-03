export interface Caderno {
    id?: string,
    cadernoNome?: string,
    createdAt?: number,
    paginas?: Array<Array<number>>,
    userId?: string
}
