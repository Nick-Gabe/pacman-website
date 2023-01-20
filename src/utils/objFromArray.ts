export const objFromArray = <T>(array: T[]) => {
  return array.reduce((acc: any, cur) => {
    const curIsArray = Array.isArray(cur);

    if(curIsArray) {
      acc[cur[0]] = cur[1]
    } else {
      Object.assign(acc, cur)
    }

    return acc;
  }, {})
}
