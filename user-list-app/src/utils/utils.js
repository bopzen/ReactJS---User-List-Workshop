export function formatDate(dateString) {
    let date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}

export function showWeekday(dateString) {
    let date = new Date(dateString);
    const options = {
        weekday: 'long'
    };
    return date.toLocaleDateString('en-US', options);
}