import { getUser } from "../auth";
import { navigateTo } from '../utils/navigation';

export const renderPage = (pageDefinition, isPrivate) => {
    console.log('renderPage called with:', pageDefinition, 'isPrivate:', isPrivate);
    
    const user = getUser();
    if (isPrivate && !user) {
        console.log('Redirecting to login - page is private and user not logged in');
        navigateTo('/login');
        return;
    }
    
    const pageContent = document.querySelector('#page-content');
    console.log('Page content element:', pageContent);
    
    if (pageContent) {
        console.log('Rendering component...');
        // Correctly call the .component() function from the object
        const html = pageDefinition.component();
        console.log('Component HTML:', html.substring(0, 100) + '...');
        pageContent.innerHTML = html; 
        
        // Correctly call the .init() function if it exists
        if (pageDefinition.init) {
            console.log('Calling component init function...');
            pageDefinition.init();
        }
        console.log('Page rendered successfully');
    } else {
        console.error("Fatal Error: #page-content container not found in DOM.");
    }
};

