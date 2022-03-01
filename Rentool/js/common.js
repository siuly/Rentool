// Header components
const headerScript = document.createElement('script');
headerScript.setAttribute('src', `/js/components/RentoolHeader.js`);
headerScript.setAttribute('type', 'module');
document.head.appendChild(headerScript);

// Footer components
const footerScript = document.createElement('script');
footerScript.setAttribute('src', `/js/components/RentoolFooter.js`);
footerScript.setAttribute('type', 'module');
document.head.appendChild(footerScript);