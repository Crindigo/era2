/*
 * Backend
 *
 * All work for updating state happens in a background thread, with state changes being pushed to the UI.
 * The UI's responsibility is sending events to the worker, and updating UI based on the current state.
 *
 * Technically we can have the UI subscribe to only one city at a time. Though ideally, the worker should still
 * only send patches instead of the full city's state. Looks like that's why immer was installed, for patch
 * generation on state updates?
 */


onmessage = function (ev) {
  const d = ev.data;

  console.log('onmessage', d);
  if ( d.id ) {
    // send response for requests with an id
    postMessage({ id: d.id, response: {} });
  }

  //setTimeout(() => {
  //    postMessage({ id: d.id, response: "you sent " + d.api + " with id " + d.id });
  //}, 100);
};