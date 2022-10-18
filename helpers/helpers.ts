export function getRandomName(): string {
  return (Math.random() + 1).toString(32).substring(2);
}

export function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
let random_amount = getRandomBetween(1000, 3000);
