export function timeAgo(inputDate: Date | string | number): string {
  const now = new Date();
  const pastDate = new Date(inputDate);

  if (isNaN(pastDate.getTime())) {
    throw new Error("Invalid date input");
  }

  const differenceInMs = now.getTime() - pastDate.getTime();

  const minutesAgo = Math.floor(differenceInMs / (1000 * 60));
  const hoursAgo = Math.floor(differenceInMs / (1000 * 60 * 60));
  const daysAgo = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  const yearsAgo = Math.floor(differenceInMs / (1000 * 60 * 60 * 24 * 365));

  if (yearsAgo >= 1) {
    return `${yearsAgo} year${yearsAgo === 1 ? "" : "s"} ago`;
  } else if (daysAgo >= 1) {
    return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
  } else if (hoursAgo >= 1) {
    return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  } else if (minutesAgo >= 1) {
    return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
  } else {
    return `just now`;
  }
}
