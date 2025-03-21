const csvData1 = `
Title, Restaurant, Phone number, address
Mother India Roti, +14169018311, 2542 St Clair Ave W, York ON, M6N 1L7
Leela Indian Food Bar(Dundas), +14167697777, 3108 Dundas St W, Toronto ON, M6P 2A1
Durbar Indian Cuisine, +14167624441, 2469 Bloor St W, Toronto ON, M6S 1P7
Bukhara Grill, +14165515199,2241a Bloor St W, Toronto ON, M6S 1N7
Bawara|Indian Restaurant&Hakka Cuisine, +14165322323, 1570 Bloor St W, Toronto ON, M6P 1A4
Dil se Indian Bar & Restaurant, +14165346344, 335 Roncesvalles Ave, Toronto ON, M6R 2M8
Dosa Mahal 9, +16473418553, 9 Roncesvalles Ave, Toronto ON, M6R 2K2
Himalayan Kitchen(Momo2Go), +14165364138, 1526 Queen St W, Toronto ON, M6R 1A4
Ali's West Indian Roti Shop, +14165327701, 1446 Queen St W, Toronto ON, M6K 1M2
`;

const csvData2 = `
Title, Churches, Phone Number, address
West Toronto Baptist Church, +14167695237, 3049 Dundas St W, Toronto ON, M6P 1Z5
Runnymede Campus Runnymede United Church, +14167676729, 
St. Cecilia's Catholic Church, +14167698163,
Morningside - High Park Presbyterian Church, +14167664765,
Keele Street Christian Church, +14167678911,
Church of St. Martin-in-the-fields Toronto, +14167677491,
St Joan of Arc Church, +14167621026,
Hillsong Church - Toronto, +16473722882,
Westminster Chapel at High Park, None,
St. Vincent de Paul Catholic Church, +14165357646
`;

function parseCSV(csv) {
    const lines = csv.trim().split("\n");
    const headers = lines[0].split(",");
    return lines.slice(1).map(line => {
        const values = line.split(",");
        return {
            name : values[0].trim(),
            phone : values[1].trim(),
            address : values.slice(2).join(",").trim()
        };
    });
}


function generateRestaurantList() {
    const restaurants = parseCSV(csvData1);
    const churches = parseCSV(csvData2);



    const restaurantContainer = document.getElementById("restaurant-list");
    const churchesContainer = document.getElementById("church-list");

    const restaurantHeader = document.createElement("h1");
    restaurantHeader.textContent = "Restaurant List";
    restaurantContainer.appendChild(restaurantHeader);

    restaurants.forEach(restaurant => {
        const listItem = document.createElement("li");
        const nameLink = document.createElement("a");
        const googleMapURL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`;
        nameLink.href = googleMapURL;
        nameLink.target = "_blank";
        nameLink.textContent = restaurant.name;
        nameLink.style.marginRight = "10px";

        const phoneLink = document.createElement("a");
        phoneLink.href = `tel:${restaurant.phone}`;
        phoneLink.textContent = "Phone number";


        listItem.appendChild(nameLink);
        listItem.appendChild(document.createTextNode(" | "));
        listItem.appendChild(phoneLink);

        restaurantContainer.appendChild(listItem);
    });

    const churchHeader = document.createElement("h1");
    churchHeader.textContent ="Churches";
    churchesContainer.appendChild(churchHeader);

    churches.forEach(church => {
        const listItem = document.createElement("li");
        const nameLink = document.createElement("a");
        const googleMapURL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(church.address)}`;
        nameLink.href = googleMapURL;
        nameLink.target = "_blank";
        nameLink.textContent = church.name;
        nameLink.style.marginRight = "10px";

        const phoneLink = document.createElement("a");
        phoneLink.href = `tel:${church.phone}`;
        phoneLink.textContent = "Phone number";


        listItem.appendChild(nameLink);
        listItem.appendChild(document.createTextNode(" | "));
        listItem.appendChild(phoneLink);

        churchesContainer.appendChild(listItem);
    });
}

window.onload = generateRestaurantList;