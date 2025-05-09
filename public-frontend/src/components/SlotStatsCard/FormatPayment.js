const formatPayment = (payment) => {
  const num = Number(payment) || 0;

  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + "K";
  }

  return num.toFixed(2);
};

export default formatPayment;
