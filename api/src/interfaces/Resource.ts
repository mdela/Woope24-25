export interface Resource {
    event_id: number;
    user_id: number;
    title: string;
    description: string;
    link: string,
    category: string,
    endTime: Date;
    is_active: boolean;
}