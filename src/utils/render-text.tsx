const renderText = (data: string | string[]) => {
  if (typeof data === 'string') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((el, i) => {
      if (el.startsWith('https://')) {
        return (
          <a
            className="modal-objectif__subtitle--link leading-8 hover:underline"
            key={i}
            href={el}
            target="_blank"
            rel="noreferrer noopener"
          >
            {el}
          </a>
        );
      }
      return (
        <p className="leading-5" key={el}>
          {el}
        </p>
      );
    });
  }

  return data;
};

export default renderText;
