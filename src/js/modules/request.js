const request =  ({url, data, options = {}}) =>{
  const key = "b79f9492-9e9f-4a4b-81ba-12700a39115e";
  return fetch(url, {
    method: "GET",
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify(data)
  })
}

export default request