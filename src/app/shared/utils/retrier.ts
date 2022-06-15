import { pause } from './pause';

export async function* retrier({ attempts = Infinity, delay = 100 }) {
  for (let i = 0; i < attempts; i++) {
    yield i;
    await pause(delay * i);
  }
}
