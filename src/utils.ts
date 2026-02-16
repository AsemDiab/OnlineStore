export function deleteFromArray<T>(key:T,array:T[]):void{
let index = array.indexOf(key, 0);

if (index > -1) {
  array.splice(index, 1);
}
}