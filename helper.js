/**
 * This will register event
 * @param {object} element 
 * @param {string} type 
 * @param {function} action 
 */
function register_event(element, type, action) {
    element.addEventListener(type, action);
}