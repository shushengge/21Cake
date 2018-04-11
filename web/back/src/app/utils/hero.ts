export class Hero{
    id: number;
    heroName: string;
    age?: number = 18;
}

//在ES6的类概念中，就是实例访问或修改类里面的私有属性
// class Student{
//     private name: string = 'Tom';
//     public age: number = 18;

//     get getName(){
//         return this.name;
//     }

//     set setName(_n){
//         if(_n != 'DK'){
//             this.name = _n;
//         }
//     }

// }