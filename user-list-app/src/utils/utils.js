export default function formatDate(dateString) {
    let date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}