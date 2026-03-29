/**
 * Helper formatter functions for Formula 1 Calendar Dates
 */

export const getDayName = (dateStr: string | Date | null) => {
  if (!dateStr) return 'TBC';
  const date = new Date(dateStr);
  return date.toLocaleDateString('es', { weekday: 'long' });
};

export const getDayNumber = (dateStr: string | Date | null) => {
  if (!dateStr) return '--';
  const date = new Date(dateStr);
  return date.toLocaleDateString('es', { day: '2-digit' });
};

export const getMonthName = (dateStr: string | Date | null) => {
  if (!dateStr) return '---';
  const date = new Date(dateStr);
  // 'short' usually returns abbreviated months like "mar.", "abr." - removing the suffix point.
  return date.toLocaleDateString('es', { month: 'short' }).replace('.', ''); 
};

export const getTime = (dateStr: string | Date | null) => {
  if (!dateStr) return 'TBC';
  const date = new Date(dateStr);
  // Example result: "15:00"
  return date.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit', hour12: false });
};
