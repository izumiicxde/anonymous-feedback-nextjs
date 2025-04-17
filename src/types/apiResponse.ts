import { IMessage } from "@/models/user.model";

export interface IApiResponse {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
    messages?: Array<IMessage>;
}
