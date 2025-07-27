export function getRecommendedDestinations(countries, tourismType, numberOfPeople) {
  const filteredByTourism = countries.filter((country) =>
    country.typesOfTourism.includes(tourismType)
  );

  let chosenCountries = [...filteredByTourism];

  if (filteredByTourism.length === 3) {
    // Exatamente 3 países com o tipo de turismo
    return mapCountriesToDestinations(filteredByTourism);
  } else if (filteredByTourism.length > 3) {
    // Mais de 3 -> escolher 3 aleatórios
    const randomCountries = getRandomItems(filteredByTourism, 3);
    return mapCountriesToDestinations(randomCountries);
  } else {
    // Menos de 3 -> completar com países que suportem o número de pessoas indicado
    console.log("Número de pessoas requisitado:", numberOfPeople);
    console.log("Todos os países com numberOfPeople >= ao pedido:");
    countries.forEach(c => {
      console.log(`${c.name}: ${c.numberOfPeople}`);
    });
    const remainingCountries = countries.filter(
      (c) => !chosenCountries.includes(c) && c.numberOfPeople == numberOfPeople
    );

    for (let country of remainingCountries) {
      if (chosenCountries.length >= 3) break;
      chosenCountries.push(country);
    }

    // Se ainda faltar, completa com aleatórios sem repetir
    if (chosenCountries.length < 3) {
      const filler = getRandomItems(
        countries.filter((c) => !chosenCountries.includes(c)),
        3 - chosenCountries.length
      );
      chosenCountries = [...chosenCountries, ...filler];
    }

    return mapCountriesToDestinations(chosenCountries);
  }
}

// Função auxiliar que associa país + cidade aleatória
function mapCountriesToDestinations(countryList) {
  return countryList.map((country) => {
    const city =
      country.cities.length > 1
        ? getRandomItems(country.cities, 1)[0]
        : country.cities[0];
    return {
      country,
      city,
    };
  });
}

// Função para escolher N itens aleatórios de um array
function getRandomItems(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}