const auth = async ({ queryKey }) => {
  const data = queryKey[1];

  console.log(data)

  const apiRes = await fetch("http://localhost:5000/api/Authorization", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "shalkar.koshenayev@gmail.com",
      password: "123456",
    }),
  });

  if (!apiRes.ok) {
    throw new Error(`books fetch is not ok!`);
  }

  return apiRes.json();
};

export default auth;
