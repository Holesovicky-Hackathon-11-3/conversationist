

export enum Role {
    User = "user",
    System = "system",
    Assistant = "assistant"
}

export type Message = {
    role: Role;
    content: string;
}

export interface Conversation {
    messages: Message[];
}

