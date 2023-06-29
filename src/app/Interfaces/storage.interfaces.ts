export interface SettingsInterface {
    title: string,
    language: string,
    dateformat: string,
    timezone: string
}

export interface TodoInterface {
    id: number,
    name: string,
    priority: number,
    notice: string,
    done: boolean,
    date: number
}

export interface ListInterface {
    id: number,
    title: string,
    todos: TodoInterface[]
}

export interface StorageInterface {
    settings: SettingsInterface,
    lists: ListInterface[],
}