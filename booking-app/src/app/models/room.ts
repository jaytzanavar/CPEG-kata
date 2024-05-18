export interface Room {
    id: string;
    name?: string;
    todayAvailabilities: number
    bookedHours?: Array<any>
    availableHours?: Array<any>
}