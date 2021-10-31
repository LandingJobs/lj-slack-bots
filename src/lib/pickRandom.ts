const pickRandom = <T>(arr: T[], count = 3) => {
  const picked: T[] = [];

  while (picked.length < count) {
    const item = arr[Math.floor(Math.random() * arr.length)];
    if (picked.includes(item)) continue;
    else picked.push(item);
  }
};

export default pickRandom;
