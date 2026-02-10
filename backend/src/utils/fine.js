exports.calculateFine = (borrow) => {
  if (borrow.returnedAt) return 0;

  const now = new Date();
  if (now <= borrow.dueDate) return 0;

  const diffMs = now - borrow.dueDate;
  const daysOverdue = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return daysOverdue * 10; // ₹10 per day
};
