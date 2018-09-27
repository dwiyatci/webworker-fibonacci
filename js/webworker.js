/**
 * Created by glenn on 27.09.18.
 */

self.onmessage = (event) => { // listen for messages from the main thread
  console.log('Worker received event from main thread..');
  const { x } = event.data;
  self.postMessage(fib(x));
};

function fib(n) {
  if (n < 2) {
    return n;
  }

  return fib(n - 1) + fib(n - 2);
}
