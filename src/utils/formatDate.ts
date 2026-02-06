export const formatDate = (dateStr: string | number) => {
    const dateObj = new Date(dateStr);
    const formattedDate = dateObj.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).replace(',', '');
    return formattedDate
};