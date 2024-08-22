const convertTime = (createdAt) => {
    const date = new Date(createdAt);
  
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
  
    return date.toLocaleString(undefined, options);
  };
  
export default convertTime;