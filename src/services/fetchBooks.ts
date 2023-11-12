const fetchBooks = async ({ queryKey }) => {
  const apiRes = await fetch("http://localhost:5000/api/Books");

  if (!apiRes.ok) {
    throw new Error(`books fetch is not ok!`);
  }

  return apiRes.json();
};

export default fetchBooks;
