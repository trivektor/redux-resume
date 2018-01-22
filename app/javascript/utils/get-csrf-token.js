const getCSRFToken = () => {
  return document.getElementsByName('csrf-token')[0].getAttribute('content');
};

export default getCSRFToken;
