/**
 * Created by glenn on 27.09.18.
 */

$(() => {
  const n = 42;

  doFibonacci(n, false);
  _.delay(() => doFibonacci(n, true), 1000);

  ////////////

  function doFibonacci(x, webworkerUsed) {
    const containerSelector = `.${webworkerUsed ? '' : 'no-'}webworker-fibo`;
    const $container = $(containerSelector);

    const $input = $container.find('.input');
    const $output = $container.find('.output');
    const $apolloMessage = $container.find('.apollo-message');

    $input.html(x);

    if (webworkerUsed) {
      const worker = new Worker('js/webworker.js'); // create our worker
      worker.postMessage({ x }); // post a message to our worker

      worker.onmessage = event => { // listen for events from the worker
        const y = event.data;
        $output.html(y);
      };

    } else {
      const y = fib(x);
      $output.html(y);
    }

    $apolloMessage.toggle(250);
  }
});

function fib(n) {
  if (n < 2) {
    return n;
  }

  return fib(n - 1) + fib(n - 2);
}
