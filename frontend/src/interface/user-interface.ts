export interface IUser {
  username: string;
  password: string;
  email: string;
}


export interface IUserLogin {
   email: string;
   password: string;
 }


 export interface IUserUpdate {
  username: string;
  email: string;
 }

 export interface IUserPassword {
  password: string;
  newPassword: string;
 }