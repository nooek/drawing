const list = [
  {
    name: "robso",
    idade: 20
  },
  {
    name: "rodolfo",
    idade: 30
  }
]

const aaa = (param, string) => {
  return list.filter(each => each[param] === string)
}

console.log(aaa("idade", 20))