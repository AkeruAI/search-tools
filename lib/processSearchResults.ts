// Define types for the input data structure
export type SearchResult = {
  title: string;
  url: string;
  description: string;
  profile: {
    name: string;
    long_name: string;
  };
  age: string;
  extra_snippets: string[];
  page_age?: string;
  article?: {
    date?: string;
  };
};

// Define a type for the output data structure
export type ProcessedResult = {
  title: string;
  source: string;
  url: string;
  date: string;
  summary: string;
  keyPoints: string[];
};

// Define a type for configuration options
export type ProcessingOptions = {
  maxResults?: number;
  minSnippets?: number;
};

// Function to check if a date is valid
function isValidDate(date: Date): boolean {
  return !isNaN(date.getTime());
}

// Function to parse a date string
function parseDate(dateString: string): Date | null {
  // Try parsing as ISO date
  let date = new Date(dateString);
  if (isValidDate(date)) return date;

  // Try parsing common formats
  const formats = [
    /(\d{4})-(\d{2})-(\d{2})/, // YYYY-MM-DD
    /(\d{2})\/(\d{2})\/(\d{4})/, // MM/DD/YYYY
    /(\w+)\s(\d{1,2}),\s(\d{4})/, // Month DD, YYYY
  ];

  for (const format of formats) {
    const match = dateString.match(format);
    if (match) {
      const [_, year, month, day] = match;
      date = new Date(+year, +month - 1, +day);
      if (isValidDate(date)) return date;
    }
  }

  // If all parsing attempts fail, return null
  return null;
}

// Function to extract the most reliable date from a SearchResult
function extractReliableDate(result: SearchResult): Date {
  const dateCandidates = [
    result.page_age,
    result.age,
    result.article?.date,
  ].filter(Boolean);

  for (const dateString of dateCandidates) {
    const parsedDate = parseDate(dateString!);
    if (parsedDate) return parsedDate;
  }

  // If all parsing attempts fail, return current date
  return new Date();
}

// Main function to process the search results
export function processSearchResults(
  searchResults: SearchResult[],
  options: ProcessingOptions = {}
): ProcessedResult[] {
  const { maxResults = 10, minSnippets = 2 } = options;

  // Remove duplicates
  const uniqueResults = searchResults.reduce((unique, item) => {
    return unique.find((u) => u.url === item.url) ? unique : [...unique, item];
  }, [] as SearchResult[]);

  // Map and sort results
  const mappedResults = uniqueResults
    .map((result) => ({
      title: result.title,
      source: result.profile.name,
      url: result.url,
      date: extractReliableDate(result).toISOString().split("T")[0], // YYYY-MM-DD format
      summary: result.description,
      keyPoints: result.extra_snippets.slice(0, minSnippets),
      sortDate: extractReliableDate(result),
    }))
    .sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());

  // Return top results
  return mappedResults
    .slice(0, maxResults)
    .map(({ sortDate, ...rest }) => rest);
}
