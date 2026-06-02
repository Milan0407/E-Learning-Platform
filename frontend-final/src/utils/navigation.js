// Navigation utility to avoid circular dependencies
export const navigateTo = (url) => {
    history.pushState(null, null, url);
    window.dispatchEvent(new CustomEvent('app:navigate'));
};