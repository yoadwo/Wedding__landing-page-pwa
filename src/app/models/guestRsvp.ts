export interface guestRsvp {
    inviteCode: string;
    attending: number;
    status: rsvp;
}

export enum rsvp{
    yes = 1,
    maybe = 0,
    no = -1
}