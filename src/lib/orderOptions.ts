type OrderOptions =
  | "latest"
  | "alphabet"
  | "trending"
  | "rating"
  | "views"
  | "new-manga"
  | "relevance";

export const orderOptions: OrderOptions[] = [
  "relevance",
  "latest",
  "alphabet",
  "trending",
  "rating",
  "views",
  "new-manga",
];

export const orderOptionsWithLabel: { option: OrderOptions; label: string }[] =
  orderOptions.map((option) => {
    if (option === "alphabet") return { label: "A-Z", option };
    else if (option === "views") return { label: "Most Views", option };
    else if (option === "new-manga") return { label: "New", option };
    return { label: option[0].toUpperCase() + option.slice(1), option };
  });
