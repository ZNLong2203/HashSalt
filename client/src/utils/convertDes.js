const formatDescription = (description) => {
    if (!description) return '';

    const paragraphs = description.split(/\n|\. /).filter(p => p.trim().length > 0);

    return paragraphs.map((p, index) => `<p key=${index}>${p.trim()}.</p>`).join('');
  };

export default formatDescription;