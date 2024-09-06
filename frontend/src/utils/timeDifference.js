const getTimeDifference = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const timeDiff = Math.abs(now - createdDate);

    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (hoursDiff < 2) {
        return 'Posted Just Now';
    } else if (daysDiff === 0) {
        return 'Today';
    } else if (daysDiff === 1) {
        return '1 day ago';
    } else if (daysDiff <= 6) {
        return `${daysDiff} days ago`;
    } else if (daysDiff <= 30) {
        return 'Last week';
    } else {
        return 'Last month';
    }
};

export default getTimeDifference;