import {user} from './user.model';
export class club{
    constructor(private name:string,
                private location:any,
                private state:string,
                private city:string,
                private users:user[],
                private events:any[],
                private announcements:any[]){}
}