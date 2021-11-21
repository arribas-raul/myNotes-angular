
export class User{

     constructor(
          public name: string,
          public surname: string,
          public email: string,
          public role: 'ADMIN' | 'USER',
          public password?: String,
          public img?: string,
          public google?: boolean,
          public id?: number
     ) {}
     
     get imgUrl(){
          return this.img;
          /* if(this.img){
               if(this.google){
                    return this.img;

               }else{
                    return `${base_url}/upload/users/${this.img}`;
               }
          
          }else{
               return `${base_url}/upload/users/no-image`;
          } */
     }
}