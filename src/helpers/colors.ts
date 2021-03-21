export const colors = {
    green1: "#306f30",
    green2: "#30af30",
    green3: "#30ff30",
    blue: "#3030ff"
}

export const stackBarColors = (index:number) => {
    return `rgba(${index*30<250?index*30:250}, 120,130,1)`
}