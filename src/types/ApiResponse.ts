

interface Message extends Document{
    content:string;
    createdAt:Date;
}

export interface ApiResponse{
    success:boolean;
    message:string;
    isAcceptingMessages?:boolean
    messages?:Array<Message>
}
