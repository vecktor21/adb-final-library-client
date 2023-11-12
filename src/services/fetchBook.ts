const fetchBook = async ({ queryKey }) => {
  const id: string = queryKey[1];

  const apiRes = await fetch("http://localhost:5000/api/Books/" + id);

  if (!apiRes.ok) {
    throw new Error(`book ${id} is not ok!`);
  }

  return apiRes.json();
};

export default fetchBook;
