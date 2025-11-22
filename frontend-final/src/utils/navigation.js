// Navigation utility to avoid circular dependencies
export const navigateTo = (url) => {
    history.pushState(null, null, url);
    // Import router dynamically to avoid circular dependency
    import('../router.js').then(module => {
        module.router();
    });
};