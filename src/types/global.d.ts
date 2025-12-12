export {};

declare global {
  type State<T> = [T, (nextVal: T) => any];
}
