
/*
This function is a test to receive a json from my backend
*/
export async function fetchTestData() {
  const response = await fetch("http://localhost:8080/api")
  if (!response.ok) throw new Error("Network response was not ok")
  return await response.json()
}