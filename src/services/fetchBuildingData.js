export async function loadData(buildings) {
    return await fetch(
        `https://cchvf3mkzi.execute-api.eu-west-1.amazonaws.com/dev/build`,
        {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
        body: JSON.stringify(buildings)
        }
    )
    .then(response => response.json())
    .catch(e => console.log(e));
}