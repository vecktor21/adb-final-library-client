const fetchCart = async ({ queryKey }) => {
  const id: string = queryKey[1];

  const apiRes = await fetch("http://localhost:5000/api/Carts/" + id);

  if (!apiRes.ok) {
    throw new Error(`user ${id} is not ok!`);
  }

  return apiRes.json();
};

export default fetchCart;
