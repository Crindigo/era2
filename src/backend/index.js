/*
 * Backend
 *
 * All work for updating state happens in a background thread, with state changes being pushed to the UI.
 * The UI's responsibility is sending events to the worker, and updating UI based on the current state.
 *
 * Technically we can have the UI subscribe to only one city at a time. Though ideally, the worker should still
 * only send patches instead of the full city's state.
 */


onmessage = function (ev) {
    const d = ev.data;

    if ( d.id ) {
        // send response for requests with an id
        postMessage({ id: d.id, response: {} });
    }

    // console log here somehow prints twice, but it's only getting the message once.
    //console.log('onmessage', d);
    //setTimeout(() => {
    //    postMessage({ id: d.id, response: "you sent " + d.api + " with id " + d.id });
    //}, 100);
};