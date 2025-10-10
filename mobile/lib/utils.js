export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
